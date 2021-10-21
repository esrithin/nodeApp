import { en } from "../../languages/en";
import { vars } from "../../variables/vars";
import { Error } from "../../helpers/errManagement";
import userModel from "../../models/user";

export const addUser = async ({ payload }) => {
    try {
      const documentation = {
        description: `Function to add user.`,
        reqPayloadFields: ["insertObj"],
        reqDataFields: [],
      };
      documentation.reqPayloadFields.forEach((field) => {
        if (!payload[field])
          throw new GlobalError(
            en.MESSAGES.PAYLOAD_FIELD_MISSING.replace("#FIELD#", field),
            vars.STATUS.BAD_REQUEST
          );
      });
      const { insertObj } = payload;
      return await userModel.create(insertObj);
    } catch (err) {
      console.log("err in addCourse -----------", err);
      throw new GlobalError(err.message ? err.message : err, err.statusCode);
    }
  };