import { Error } from "../../helpers/errManagement";
import { en } from "../../languages/en";
import { vars } from "../../variables/vars";
import { listAllUsers, getUserData } from "./getters";
import { addUser } from "./setters";

export const listUsers = async ({ payload }) => {
  try {
    const { user } = payload;
    return await listAllUsers({ payload: user });
  } catch (err) {
    return new Error(err.message ? err.message : err, err.code);
  }
};
export const getUser = async ({ payload }) => {
  try {
    const documentation = {
      description: `Function to get user data`,
      reqPayloadFields: ["user"],
      reqDataFields: ["user_id"],
    };

    documentation.reqPayloadFields.forEach((field) => {
      if (!payload[field])
        throw new Error(
          en.MESSAGES.PAYLOAD_FIELD_MISSING.replace("#FIELD#", field),
          vars.STATUS.BAD_REQUEST
        );
    });

    const { user } = payload;

    documentation.reqDataFields.forEach((field) => {
      if (!user[field] || user[field] === null)
        throw new Error(
          en.MESSAGES.DATA_FIELD_MISSING.replace("#FIELD#", field),
          vars.STATUS.BAD_REQUEST
        );
    });
    d;
    const conditions = { where: { user_id: user.user_id } };
    return await getUserData({ payload: { conditions } });
  } catch (err) {
    return new Error(err.message ? err.message : err, err.code);
  }
};

export const createUser = async ({ payload }) => {
  try {
    const documentation = {
      description: `Function to create user data`,
      reqPayloadFields: ["user"],
      reqDataFields: ["email", "first_name"],
      optionalPayloadFields: [
        "last_name",
        "phone_number",
        "introduction",
        "experience",
        "achievements",
      ],
    };

    documentation.reqPayloadFields.forEach((field) => {
      if (!payload[field])
        throw new Error(
          en.MESSAGES.PAYLOAD_FIELD_MISSING.replace("#FIELD#", field),
          vars.STATUS.BAD_REQUEST
        );
    });

    const { user } = payload;
    const insertObj = {};

    documentation.reqDataFields.forEach((field) => {
      if (!user[field] || user[field] === null)
        throw new Error(
          en.MESSAGES.DATA_FIELD_MISSING.replace("#FIELD#", field),
          vars.STATUS.BAD_REQUEST
        );
      else insertObj[field] = user[field];
    });
    documentation.optionalPayloadFields.forEach((field) => {
      if (user[field] && user[field] !== null) insertObj[field] = user[field];
      if (user[field] === "") insertObj[field] = null;
    });
    const conditions = { where: { email: user.email } };

    const userExist = await getUserData({
      payload: { conditions },
    });
    if (userExist) throw new Error("User already exist!", 403);
    return await addUser({ payload: { insertObj } });
  } catch (err) {
    throw new Error(err.message ? err.message : err, err.code);
  }
};
