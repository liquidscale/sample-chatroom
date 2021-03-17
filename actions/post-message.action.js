/**
 * post-message action
 */
export const joinRoom = {
  key: "chatroom/message",
  bind: { scope: "chatroom:room:$id" }, // dynamic bind using action payload field `name`
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
    async function message({ data }, state) {
      state.messages.push({
        ...data,
        ts: new Date(),
        reations: [],
      });
    },
  ],
};
