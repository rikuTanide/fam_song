import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../ssr/top_page";
import { ArtistPageProps, SongPageProps, TopPageProps } from "../types/props";
import { ArtistPageComponent } from "../ssr/artist_page";
import { imgUrl } from "../web/my_page_top";
import { SongPageComponent } from "../ssr/song_page";

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
        twitterScreenName: "弩.net",
        img: imgUrl,
      },
      {
        userID: "1",
        twitterName: "@isyumi_net",
        twitterScreenName: "弩.net",
        img: imgUrl,
      },
      {
        userID: "1",
        twitterName: "@isyumi_net",
        twitterScreenName: "弩.net",
        img: imgUrl,
      },
    ],
  };
  const html = renderToStaticMarkup(<SongPageComponent {...props} />);
  process.stdout.write(html);
}

main();
