import * as React from "react";
import { SongPageProps } from "../types/props";
import { imgUrl } from "../web/my_page_top";
import { renderSongPage } from "../ssr/song_page";

function main() {
  const props: SongPageProps = {
    artistID: "1",
    artistName: "サザンオールスターズ",
    songID: "1",
    songName: "TSUNAMI",
    voteUsers: [
      {
        userID: "1",
        twitterName: "@isyumi_net",
        img: imgUrl,
      },
      {
        userID: "1",
        twitterName: "@isyumi_net",
        img: imgUrl,
      },
      {
        userID: "1",
        twitterName: "@isyumi_net",
        img: imgUrl,
      },
    ],
  };
  const html = renderSongPage(props);
  process.stdout.write(html);
}

main();
