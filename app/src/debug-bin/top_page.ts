import * as React from "react";
import { renderTopPage } from "../ssr/top_page";
import { TopPageProps } from "../types/props";

function main() {
  const props: TopPageProps = {
    artists: [
      {
        artistID: "1",
        name: "サザンオールスターズ",
        topSongID: "1",
        topSongName: "TSUNAMI",
        count: 23,
      },
      {
        artistID: "2",
        name: "ポルノグラフィティ",
        topSongID: "2",
        topSongName: "アゲハ蝶",
        count: 123,
      },
    ],
  };
  const html = renderTopPage(props);
  process.stdout.write(html);
}

main();
