import express from "express";
import config from "config";
import v1 from "./routes/v1";
import cors from "cors";
import bodyParser from "body-parser"
const app = express();
app.use(cors());
app.use(bodyParser.json())

const port = config.port;
app.get("/", (_, res) => {
  res.status(200).send({ status: "ok" });
});
const processApplication = async () => {
  v1(app);
  app.use((err, res) => {
    console.log("err", err);
    res.status(err.status || 500);
    res.json({
      message: err.Error || "Unknown error",
    });
  });
  if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      console.log(`App Started on port ${port}`);
    });
  }
};

processApplication().then();
app.get("/*", (_, res) => {
  res.status(404).send({ message: "Api not found" });
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
export default app;
