import { Error } from "../../helpers/errManagement";
import userModel from "../../models/user";
export const listAllUsers = async ({ payload }) => {
  try {
    const conditions = { attributes: ["first_name", "email"] };
    return await userModel.findAndCountAll(conditions);
  } catch (err) {
    return new Error(err.message ? err.message : err, err.code);
  }
};

export const getUserData = async ({ payload }) => {
  try {
    const { conditions } = payload;
    console.log("conditions",conditions)
    return await userModel.findOne(conditions);
  } catch (err) {
    return new Error(err.message ? err.message : err, err.code);
  }
};
