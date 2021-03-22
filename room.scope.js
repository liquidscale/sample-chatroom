export default provide(({ scope }) => {
  const room = scope("chatroom:room:$id");

  room.schema("room");

  // Will be called when system scope is initialized
  room.initializer(async function (state, { scope, data }) {
    state.members = [];
    state.messages = [];
    state.id = data.id;
    state.system = scope.parent();
  });

  room.finalizer(async function (state, { scope }) {
    scope.unsubscribe(state.system);
  });

  return room;
});
