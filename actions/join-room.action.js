/**
 * join-room action
 */
export default {
  key: "chatroom/join",
  bind: { scope: "chatroom:room:$id" }, // dynamic bind using action payload field `name`
  description: "Allow a user to ask to join a room",
  schema: {
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      color: { type: "string" },
      nickname: { type: "string" },
    },
    required: ["username", "id"],
  },
  permissions: [{ if: ({ actor }) => this.members.find(m => m.username === actor.username), deny: ["*"], hint: "already-member" }],
  reducers: [
    async function join({ data }, state) {
      state.users.push({ ...data, joinedAt: new Date() });
    },
  ],
};
