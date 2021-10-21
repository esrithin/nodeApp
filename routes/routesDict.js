import { getUser, getUserData } from "../action/users/getters";
import { createUser, listUsers } from "../action/users/processors";

const version1 = "v1";
const METHODS = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};

export const dict = {
  v1: [
    {
      name: "list user",
      path: `/${version1}/users`,
      action: listUsers,
      method: METHODS.GET,
      payloadName: "user",
    },
    {
      name: "create user",
      path: `/${version1}/user`,
      action: createUser,
      method: METHODS.POST,
      payloadName: "user",
    },
    {
      name: "get user",
      path: `/${version1}/user`,
      action: getUserData,
      method: METHODS.GET,
      payloadName: "where",
    },
  ],
};
