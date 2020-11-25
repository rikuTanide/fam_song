import * as React from "react";
import { renderTopPage } from "../ssr/top_page";
import { TopPageProps } from "../types/props";

function main() {
  const props: TopPageProps = {
    artists: [
      {
        artistID: "1",
        name: "サザンオールスターズ",
        songRanking: [
          { songID: "1", name: "TSUNAMI", voteCount: 5 },
          { songID: "2", name: "エロティカセブン", voteCount: 10 },
          { songID: "3", name: "波乗りシンドバット", voteCount: 15 },
        ],
      },
      {
        artistID: "2",
        name: "ポルノグラフィティ",
        songRanking: [
          { songID: "1", name: "アゲハ蝶", voteCount: 5 },
          { songID: "2", name: "メリッサ", voteCount: 15 },
          { songID: "3", name: "MUGEN", voteCount: 25 },
        ],
      },
    ],
  };
  const html = renderTopPage(props);
  process.stdout.write(html);
}

main();
