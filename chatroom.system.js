export default provide(({ system }) => {
  const chatroom = system("lqs/chatroom");

  chatroom.store("main"); // per scope, but all spawned scopes will default to this

  // we can configure a JSON schema to help us validate state after reducers have executed
  chatroom.schema({
    properties: {
      name: { type: "string" },
      version: { type: "string" },
      rooms: { type: "array", items: { $subscription: "chatroom:room" } },
      users: { type: "array", items: { $subscription: { scope: "lqs/security", publication: "default", selector: "$.users" } } },
    },
    required: ["name", "version", "rooms", "users"],
  });

  // Will be called when system scope is initialized
  chatroom.initializer(async function chatroomSystemSetup(state, { scope, config, schema, Collection }) {
    // Use the schema details to generate our security subscription. This will connect to the security scope and mount only users
    state.users = scope.mount(scope.subscribe(schema.getField("users")), { mountpoint: "users" });

    // Initialize default state
    state.name = config.get("system.name", "LQS");
    state.version = config.get("system.version", "1.0");

    // We use an LQS collection here. This will behave like a normal array, but if elements are subscriptions, it will
    // produce their cached values or retrieve a fresh value if no caching is allowed. In this use-case, room scopes will
    // be pushed by the openRoom action. Each room will be tracked through a subscription behind the scene.
    state.rooms = scope.mount(Collection(), { mountpoint: "rooms" });
  });

  chatroom.finalizer(async function (state, { scope }) {
    scope.unsubscribe(state.users);
    // terminate all rooms scopes
    state.rooms.map(room => scope.terminate(room));
  });

  // apply a constraints the produced scope state (like in queries or for actions). This is enforced by LQS
  // on all queries and actions, actions will never see unallowed rooms
  chatroom.constraint({ selector: "$.rooms" }, function (state, { actor }) {
    state.rooms = state.rooms.filter(room => room.visibility === "public" || !!room.members.find(m => m.username === actor));
  });

  return chatroom;
});
