import * as express from "express";
import { createICache } from "../server/icatch";

const app = express();
app.get("/", async (req, res) => {
  const img = await createICache("谷出 陸", "長渕剛", "乾杯");
  res.write(img);
  res.end();
});

app.listen(9000);
