import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../ssr/top_page";
import { ArtistPageProps, TopPageProps } from "../types/props";
import {ArtistPageComponent} from "../ssr/artist_page";

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
  const html = renderToStaticMarkup(<ArtistPageComponent {...props} />);
  process.stdout.write(html);
}

main();
