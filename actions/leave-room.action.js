/**
 * Leave a room
 */
export default {
  key: "chatroom/leave",
  bind: { scope: "chatroom/room/${id}" },
  description: "the calling actor wants to leave the room",
  schema: {
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  permissions: [{ if: ({ state, actor }) => state.members.find(m => m.username === actor), hint: "not-member" }],
  reducers: [
    async function leave({ actor }, state) {
      state.members = state.members.filter(m => m.username !== actor);
    },
  ],
};
