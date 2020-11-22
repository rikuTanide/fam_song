import * as express from "express";
import fetch from "node-fetch";
import { Data } from "../types/data";
import { cleansing } from "../functions";
import {
  toArtistPageProps,
  toSongPageProps,
  toTopPageProps,
  toUserPageProps,
  toVotePageProps,
} from "../mapping/to_props";
import { renderTopPage } from "../ssr/top_page";
import { renderArtistPage } from "../ssr/artist_page";
import { renderSongPage } from "../ssr/song_page";
import { renderUserPage } from "../ssr/user_page";
import { renderVotePage } from "../ssr/vote_page";

export function server(): express.Application {
  const app = express();
  app.get("/", index);
  app.get("/artists/:artist_id", artistPage);
  app.get("/artists/:artist_id/songs/:song_id", songPage);
  app.get("/users/:user_id", userPage);
  app.get("/votes/users/:user_id/artists/:artist_id", votePage);
  return app;
}

async function fetchData(): Promise<Data> {
  const jsonRes = await fetch("https://fam-song.firebaseio.com/data.json");
  return cleansing(await jsonRes.json());
}

async function index(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const props = toTopPageProps(data);
  const html = renderTopPage(props);
  res.write(html);
  res.end();
}

async function artistPage(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const artistID = req.params["artist_id"];
  const props = toArtistPageProps(data, artistID);
  const html = renderArtistPage(props);
  res.write(html);
  res.end();
}

async function songPage(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const artistID = req.params["artist_id"];
  const songID = req.params["song_id"];
  const props = toSongPageProps(data, artistID, songID);
  const html = renderSongPage(props);
  res.write(html);
  res.end();
}

async function userPage(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const userID = req.params["user_id"];
  const props = toUserPageProps(data, userID);
  const html = renderUserPage(props);
  res.write(html);
  res.end();
}

async function votePage(req: express.Request, res: express.Response) {
  const data = await fetchData();
  const userID = req.params["user_id"];
  const artistID = req.params["artist_id"];
  const props = toVotePageProps(data, artistID, userID);
  const html = renderVotePage(props);
  res.write(html);
  res.end();
}
