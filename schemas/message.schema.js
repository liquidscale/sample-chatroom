export default {
  id: "message",
  properties: {
    content: { type: "string" },
    ts: { type: "string", format: "datetime" },
    user: { type: "string" },
    reactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", enum: ["like", "dislike", "abuse", "love"] },
          ts: { type: "string", format: "datetime" },
          user: { type: "string" },
        },
      },
    },
  },
  required: ["content", "user", "ts", "id"],
};
