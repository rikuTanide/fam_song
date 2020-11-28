import * as express from "express";
import { createICache } from "../server/icatch";
import {createArtistICatch} from "../server/artist_icatch";

const app = express();
app.get("/", async (req, res) => {
  const img = await createArtistICatch("Mr.Children", [
    {songID: "", name : "Tomorrow never knows", voteCount: 19},
    {songID: "", name : "しるし", voteCount: 9},
    {songID: "", name : "名もなき詩", voteCount: 9},
  ]);
  res.write(img);
  res.end();
});

app.listen(9000);
