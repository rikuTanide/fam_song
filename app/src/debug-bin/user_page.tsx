import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { UserPageProps } from "../types/props";
import { renderUserPage, UserPageComponent } from "../ssr/user_page";

function main() {
  const props: UserPageProps = {
    userID: "1",
    userName: "@isyumi_net",
    userScreenName: "弩.net",
    voteSongs: [
      {
        songID: "1",
        songName: "TSUNAMI",
        artistID: "1",
        artistName: "サザンオールスターズ",
      },
      {
        songID: "2",
        songName: "アゲハ蝶",
        artistID: "2",
        artistName: "ポルノグラフィティ",
      },
    ],
  };
  const html = renderUserPage(props);
  process.stdout.write(html);
}

main();
