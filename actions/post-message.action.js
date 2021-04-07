/**
 * post-message action
 */
export default {
  key: "chatroom/message",
  bind: { scope: "chatroom/room/${id}" },
  description: "One of the member post a message in this room",
  schema: {
    properties: {
      id: { type: "string" },
      user: { type: "string" },
      message: { type: "string" },
    },
    required: ["user", "id", "message"],
  },
  permissions: [{ if: ({ state, actor }) => state.members.find(m => m.username === actor), hint: "not-member" }],
  reducers: [
    async function message({ data }, state, { helpers }) {
      state.messages.unshift({
        id: helpers.idGen(),
        ...data,
        ts: new Date(),
        reactions: [],
      });
    },
  ],
};
