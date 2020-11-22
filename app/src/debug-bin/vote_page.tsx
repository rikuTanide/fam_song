import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TopPageComponent } from "../ssr/top_page";
import {TopPageProps, UserPageProps, VotePageProps} from "../types/props";
import { UserPageComponent } from "../ssr/user_page";
import {VotePageComponent} from "../ssr/vote_page";

function main() {
  const props: VotePageProps = {
    userName: "@isyumi_net",
    userScreenName: "弩.net",
    artistID: "1",
    artistName: "サザンオールスターズ",
    songID: "1",
    songName: "TSUNAMI",
    userID: "1",
  };
  const html = renderToStaticMarkup(<VotePageComponent {...props} />);
  process.stdout.write(html);
}

main();
