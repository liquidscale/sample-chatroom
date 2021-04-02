/**
 * Member of a room publish a react to a specific message
 */
export default {
  key: "chatroom/reaction",
  bind: { scope: "chatroom/room/${id}" }, // dynamic bind using action payload field `name`
  description: "Member of a room publish a react to a specific message",
  schema: {
    properties: {
      id: { type: "string" },
      user: { type: "string" },
      messageId: { type: "string" },
      reaction: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["like", "dislike", "abuse", "love"] },
          user: { type: "string" },
          ts: { type: "string", format: "date-time" },
        },
      },
    },
    required: ["user", "id", "message"],
  },
  permissions: [{ if: ({ actor }) => this.members.find(m => m.username === actor.username), allow: ["*"], hint: "not-member" }],
  reducers: [
    async function reaction({ data }, state) {
      // find target message (messageId)
      // add or replace user reaction ()
    },
  ],
};
