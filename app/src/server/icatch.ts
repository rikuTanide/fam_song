const nodeHtmlToImage = require("node-html-to-image");

export async function createICache(
  userName: string,
  artistName: string,
  songName: string
): Promise<Buffer> {
  const res = (await nodeHtmlToImage({
    quality: 100,
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
<div class="card-subtitle h6">
<a class="text-dark" href="/">
${userName}さんが
</a>
</div>
</div>
<div class="card-body">
<div class="card-title h5">
<a class="text-dark" href="/">
<h1>${artistName}</h1>
</a>
の代表曲は
<a class="text-dark" href="/">
<h1>${songName}</h1>
</a>
</div>
</div>
<div class="card-footer">
と主張しています。
</div>
</div>
</div>

</body>
</html>`,
  })) as Buffer;
  return res;
}
