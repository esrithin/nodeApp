import { dict } from "./routesDict";
import { vars } from "../variables/vars";
import { Error } from "./../helpers/errManagement";
const createPayloadObject = async (req, res, route) => {
  let payload = { currentUserInfo: {} };
  payload.req = req;
  payload.res = res;
  if (route.method == vars.METHODS.GET) {
    let params = req.params ? req.params : {},
      query = req.query ? req.query : {};
    payload[route.payloadName] = Object.assign(query, params);
  } else if (route.method == vars.METHODS.POST) {
    payload[route.payloadName] = req.body;
  } else if (route.method == vars.METHODS.PUT) {
    payload[route.payloadName] = req.body;
  } else if (route.method == vars.METHODS.DELETE) {
    payload[route.payloadName] = req.body;
  }

  if (payload[route.payloadName].limit)
    payload.limit = parseInt(payload[route.payloadName].limit);
  if (payload[route.payloadName].offset)
    payload.offset = parseInt(payload[route.payloadName].offset);
  if (payload[route.payloadName].nopaging)
    payload.nopaging = parseInt(payload[route.payloadName].nopaging);
  return Promise.resolve(payload);
};


export default (app) => {
  dict.v1.forEach((route) => {
    app[route.method](route.path, async (req, res) => {
      try {
        let payload = await createPayloadObject(req, res, route);
        let response = await route.action({ payload });
        if (response && response.code) {
          if (!isNaN(response.code))
            res.status(response.code).send({ message: response.message });
          else
            res
              .status(vars.STATUS.INTERNAL_SERVER_ERROR)
              .send({ message: response.message });
        } else {
          res.send(response);
        }
      } catch (err) {
        res
          .status(
            err.code && !isNaN(err.code)
              ? err.code
              : vars.STATUS.INTERNAL_SERVER_ERROR
          )
          .send({ message: err.message ? err.message : err });
      }
    });
  });
};
