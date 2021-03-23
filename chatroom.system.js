export default provide(({ system }) => {
  console.log("initializing system scope");

  const chatroom = system("lqs:chatroom");

  chatroom.store("main"); // per scope, but all spawned scopes will default to this

  // we can configure a JSON schema to help us validate state after reducers have executed
  chatroom.schema({
    properties: {
      name: { type: "string" },
      version: { type: "string" },
      rooms: { type: "array", items: { $ref: "chatroom:room" } },
      users: { type: "array", items: { type: "subscription", $ref: "lqs:security", target: "default", selector: "$.users" } },
    },
    required: ["name", "version", "rooms", "users"],
  });

  // Will be called when system scope is initialized
  chatroom.initializer(async function (state, { scope, config, schema }) {
    console.log("initializing system scope state");

    // Use the schema details to generate our security subscription. This will connect to the security scope and mount only users
    state.users = scope.subscribe(schema.getField("users"));
    // Initialize default state
    state.name = config.get("system.name") || "lqs";
    state.version = config.get("system.version") || "1.0";
    state.rooms = [];
  });

  chatroom.finalizer(async function (state, { scope }) {
    console.log("finalize system scope");
    scope.unsubscribe(state.users);
    // terminate all rooms scopes
    state.rooms.map(room => scope.terminate(room));
  });

  return chatroom;
});
