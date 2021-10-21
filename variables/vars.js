import dotenv from "dotenv";
dotenv.config();
export const vars = {
  STATUS: {
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },
  AUTHENTICATION_PARAM: "authorization",
  VERSION: "v1",
  TOKEN: process.env.TOKEN,
  JWT: {
    INVALID_EXPIRED: "Invalid or expired Token",
    MISSING_TOKEN: "Missing Token",
  },
  METHODS: {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
  },
};
