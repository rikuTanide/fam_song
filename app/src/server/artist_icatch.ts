import {SongProps} from "../types/props";

const nodeHtmlToImage = require("node-html-to-image");

function mapSongHtmls(songs: SongProps[]): string {
  return songs.map(s => `
<div class="list-group-item">
<a class="text-dark" href="#">
${s.name}
</a>
<span class="badge badge-danger">
${s.voteCount}票
</span>
</div>

`).join();
}

export async function createArtistICatch(
  artistName: string,
  songs: SongProps[],
): Promise<Buffer> {
  const songHtmls = mapSongHtmls(songs);
  const res = (await nodeHtmlToImage({
    quality: 100,
    type: "png",
    html: `<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP" rel="stylesheet">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body style="width:700px; height: 500px;font-family: "Noto Sans JP;">
<div style="width:700px; height: 500px" class="bg-primary d-flex align-items-center">

<div class="card mx-auto" style="width: 600px;">
  <div class="card-header">
    <div class="card-title h5">
      <strong>${artistName}</strong>といえば
    </div>
  </div>
  <div class="card-body">
    <div class="list-group">
${songHtmls}
    </div>
  </div>
</div>

</body>
</html>`,
  })) as Buffer;
  return res;
}
