/**
 * post-message action
 */
export default {
  key: "chatroom/clear-all",
  bind: { scope: "chatroom/room/${id}" },
  description: "Room owner may delete all messages in the room or all message from one user",
  schema: {
    properties: {
      id: { type: "string" },
      user: { type: "string" },
    },
    required: ["id"],
  },
  permissions: [{ if: ({ state, actor }) => state.owner === actor, hint: "not-owner" }],
  reducers: [
    async function clearMessages({ data }, state, { console }) {
      console.log("clearing all messages for room", data.id);
      if (data.user) {
        state.messages = state.messages.filter(m => m.user !== data.user);
      } else {
        state.messages = [];
      }
    },
  ],
};
