import { VotePageProps } from "../types/props";
import { renderVotePage } from "../ssr/vote_page";

function main() {
  const props: VotePageProps = {
    userName: "@isyumi_net",
    artistID: "1",
    artistName: "サザンオールスターズ",
    songID: "1",
    songName: "TSUNAMI",
    userID: "1",
    share: { url: "" },
  };
  const html = renderVotePage(props);
  process.stdout.write(html);
}

main();
