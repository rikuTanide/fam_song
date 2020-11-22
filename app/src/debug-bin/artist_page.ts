import * as React from "react";
import { ArtistPageProps } from "../types/props";
import { renderArtistPage } from "../ssr/artist_page";

function main() {
  const props: ArtistPageProps = {
    artistID: "1",
    name: "サザンオールスターズ",
    songs: [
      { songID: "1", name: "TSUNAMI", voteCount: 5 },
      { songID: "2", name: "エロティカセブン", voteCount: 10 },
      { songID: "3", name: "波乗りシンドバット", voteCount: 15 },
    ],
  };
  const html = renderArtistPage(props);
  process.stdout.write(html);
}

main();
