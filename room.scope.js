export default provide(({ scope }) => {
  const room = scope("chatroom/room/${id}");

  room.schema({
    type: "object",
    properties: {
      id: { type: "string" },
      owner: { type: "string" },
      openedAt: { type: "string", format: "date-time" },
      inviteCode: { type: "string" },
      members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            username: { type: "string" },
            color: { type: "string" },
            nickname: { type: "string" },
          },
        },
      },
      messages: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            message: { type: "string" },
            ts: { type: "string", format: "date-time" },
            user: { type: "string" },
            reactions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["like", "dislike", "abuse", "love"] },
                  ts: { type: "string", format: "date-time" },
                  user: { type: "string" },
                },
                required: ["content", "user", "ts"],
              },
            },
          },
        },
      },
    },
    required: ["id", "owner", "members", "messages"],
  });

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
