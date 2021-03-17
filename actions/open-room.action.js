/**
 * open-room action
 */
export const openRoom = {
  key: "chatroom/open",
  bind: { scope: "lqs:chatroom" },
  description: "Create a new chatroom. This will spawn a new room scope in our cluster",
  schema: {
    properties: {
      id: { type: "string" },
      owner: { type: "string" },
    },
    required: ["owner", "id"],
  },
  permissions: [{ if: ({ actor }) => this.users.find(m => m.username === actor.username), allow: ["*"], hint: "no-system-access" }],
  reducers: [
    async function openRoom({ data }, state, { scope }) {
      state.rooms.push(scope.spawn("chatroom:room:$id", data));
    },
  ],
};
