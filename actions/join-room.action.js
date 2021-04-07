/**
 * join-room action
 */
export default {
  key: "chatroom/join",
  bind: { scope: "chatroom/room/${id}" },
  description: "Allow a user to ask to join a room",
  schema: {
    properties: {
      id: { type: "string" },
      inviteCode: { type: "string" },
      username: { type: "string" },
      color: { type: "string" },
      nickname: { type: "string" },
    },
    required: ["username", "id"],
  },
  permissions: [
    {
      if: ({ state, data }) => {
        if (state.visibility === "private") {
          return data.inviteCode === state.inviteCode;
        } else {
          return true;
        }
      },
      hint: "invalid-invite-code",
    },
  ],
  reducers: [
    async function joinRoom({ data }, state) {
      // if already a member, just continue silently to the room
      const already = state.members.find(m => m.username === data.username);
      if (!already) {
        state.members.push({ ...data, joinedAt: new Date() });
      }
    },
  ],
};
