export default {
  id: "room",
  properties: {
    id: { type: "string" },
    owner: { type: "string" },
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
