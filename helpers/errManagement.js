import { vars } from "../variables/vars";

export const Error = (message, code) => {
  return {
    message: message,
    code: code || vars.STATUS.NOT_FOUND,
  };
};