import * as express from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

export function server(): express.Application {
  const app = express();
  app.get("/", index);
  app.get("/aaa", index);
  return app;
}

async function index(req: express.Request, res: express.Response) {
  const val = await admin.database().ref("data").once("value");
  res.write(JSON.stringify(val.val()));
  res.end();
}
