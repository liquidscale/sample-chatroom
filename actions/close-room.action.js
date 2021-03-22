/**
 * The owner or administrator of the room is closing it. The scope will be finalized.
 */
export default {
  key: "chatroom/close",
  bind: { scope: "lqs:chatroom" },
  description: "Terminate a chatroom and finalize the associated scope",
  schema: {
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  permissions: [{ if: ({ data }) => this.rooms.find(r => r.id === data.id).owner === data.actor.username, allow: ["*"] }],
  reducers: [
    async function closeRoom({ data }, state, { scope }) {
      // remove the reference we keep on the room scope
      const target = state.rooms.remove(r => r.name === data.name);

      // destroy the target scope, freeing the cluster as we don't need this scope anymore
      scope.finalize(target);
    },
  ],
};
