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
  permissions: [{ if: ({ actor }) => this.members.find(m => m.username === actor.username), allow: ["*"], hint: "not-member" }],
  reducers: [
    async function message({ data }, state, { helpers }) {
      state.messages.push({
        id: helpers.idGen(),
        ...data,
        ts: new Date(),
        reactions: [],
      });
    },
  ],
};
