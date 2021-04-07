export default provide(({ scope }) => {
  const room = scope("chatroom/room/${id}", { autoCreate: false });

  room.schema("room");

  // Will be called when scope is initialized
  room.initializer(async function (state, { scope }) {
    state.messages = [];
    state.system = scope.parent();
  });

  room.finalizer(async function (state, { scope }) {
    scope.unsubscribe(state.system);
  });

  room.publication("default", {
    selector: "$",
    options: {
      projection: ["-messages"],
    },
  });

  room.publication("full", {
    selector: "$",
  });

  return room;
});
