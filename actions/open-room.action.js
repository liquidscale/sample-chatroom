/**
 * open-room action
 */
export default {
  key: "chatroom/open",
  bind: { scope: "lqs/chatroom" },
  description: "Create a new chatroom. This will spawn a new room scope in our cluster",
  schema: {
    properties: {
      id: { type: "string" },
      description: { type: "string" },
      visibility: { type: "string", enum: ["public", "private"], default: "public" },
      inviteCode: { type: "string" },
      owner: { type: "string" },
    },
    required: ["owner", "id"],
  },
  permissions: [{ if: ({ actor }) => this.users.find(m => m.username === actor.username), allow: ["*"], hint: "no-system-access" }],
  reducers: [
    async function openRoom({ data }, state, { helpers, scope }) {
      // initialize room
      data.openedAt = new Date();
      data.members = [{ username: data.owner }];
      if (data.visibility === "private") {
        data.inviteCode = helpers.idGen();
      }

      // Launch room scope and keep a reference to it in our rooms collection
      state.rooms.push(await scope.spawn("chatroom/room/${id}", data));
    },
  ],
};
