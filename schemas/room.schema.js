export const room = {
  type: "object",
  properties: {
    id: { type: "string" },
    owner: { type: "string" },
    openedAt: { type: "string", format: "date-time" },
    inviteCode: { type: "string" },
    members: {
      type: "array",
      items: {
        type: "object",
        properties: {
          username: { type: "string" },
          color: { type: "string" },
          nickname: { type: "string" },
        },
      },
    },
    messages: {
      type: "array",
      items: {
        $ref: "message",
      },
    },
  },
  required: ["id", "owner", "members", "messages"],
};
