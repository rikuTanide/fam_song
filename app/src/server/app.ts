import * as express from "express";
import * as admin from "firebase-admin";
import fetch from "node-fetch";
import { Data } from "../types/data";
import { cleansing } from "../functions";
import { toTopPageProps } from "../mapping/to_props";
import { renderToStaticMarkup } from "react-dom/server";

admin.initializeApp();

export function server(): express.Application {
  const app = express();
  app.get("/", index);
  app.get("/aaa", index);
  return app;
}

async function fetchData(): Promise<Data> {
  const jsonRes = await fetch("https://fam-song.firebaseio.com/data");
  return cleansing(await jsonRes.json());
}

async function index(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const props = toTopPageProps(data);
  const html = renderToStaticMarkup();
  res.write(JSON.stringify(val.val()));
  res.end();
}
