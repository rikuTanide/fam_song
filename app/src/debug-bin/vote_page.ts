import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../ssr/top_page";
import { TopPageProps, UserPageProps, VotePageProps } from "../types/props";
import { UserPageComponent } from "../ssr/user_page";
import { renderVotePage, VotePageComponent } from "../ssr/vote_page";

function main() {
  const props: VotePageProps = {
    userName: "@isyumi_net",
    artistID: "1",
    artistName: "サザンオールスターズ",
    songID: "1",
    songName: "TSUNAMI",
    userID: "1",
    share: {url: ""},
  };
  const html = renderVotePage(props);
  process.stdout.write(html);
}

main();
