import { group } from "@liquidscale/scope";

const room = group("chatroom:room");

// transports
// gateway
// store
// schema
// supported actions

// publications

// store (type, snapshot threshold)

// Configure an initializer to configure the initial state of this scope. data is the action payload
room.initializer(async function (initialState, { data }) {
  initialState.members = [];
  initialState.messages = [];
  initialState.name = data.name;
});
