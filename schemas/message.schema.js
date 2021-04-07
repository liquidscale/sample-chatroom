export const message = {
  type: "object",
  properties: {
    id: { type: "string" },
    message: { type: "string" },
    ts: { type: "string", format: "date-time" },
    user: { type: "string" },
    reactions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["like", "dislike", "abuse", "love"] },
          ts: { type: "string", format: "date-time" },
          user: { type: "string" },
        },
        required: ["content", "user", "ts"],
      },
    },
  },
};
