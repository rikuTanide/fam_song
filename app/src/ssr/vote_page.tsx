import * as React from "react";
import { VotePageProps } from "../types/props";
import { Breadcrumb, Card, Jumbotron } from "react-bootstrap";
import { renderToStaticMarkup } from "react-dom/server";
import { ShareComponent } from "../web/artist_tab_component";
import { TrackingTagComponent } from "./artist_page";

export function renderVotePage(props: VotePageProps): string {
  return renderToStaticMarkup(<VotePageComponent {...props} />);
}
export const VotePageComponent: React.FunctionComponent<VotePageProps> = (
  props
) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
      <script
        src="https://kit.fontawesome.com/6b7991403e.js"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="/mypage/bootstrap-social.css" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@isyumi_net" />
      <meta property="og:url" content={props.ogUrl} />
      <meta property="og:title" content="あのアーティストの代表曲は？" />
      <meta property="og:description" content={props.ogTitle} />
      <meta property="og:image" content={props.ogICatch} />
      <title>代表曲は？</title>
    </head>
    <body>
      <Jumbotron className="m-3">
        <h1>代表曲は？</h1>
        <p className="lead">あなたが思うアーティストの代表曲を教えてください</p>
        <hr className="my-4" />
        <p>{props.userName}さんとは気が合いそうかな？</p>
        <a className="btn btn-primary btn-lg" href="/mypage">
          投票する
        </a>
      </Jumbotron>

      <Breadcrumb className="m-3">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/artists/${props.artistID}`}>
          {props.artistName}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href={`/artists/${props.artistID}/songs/${props.songID}`}
        >
          {props.songName}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`/users/${props.userID}`}>
          {props.userName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="m-3">
        <Card.Header>
          <Card.Subtitle>
            <a className="text-dark" href={`/users/${props.userID}`}>
              {props.userName}さんは
            </a>
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <a className="text-dark" href={`/artists/${props.artistID}`}>
              {props.artistName}
            </a>
            の代表曲は
            <a
              className="text-dark"
              href={`/artists/${props.artistID}/songs/${props.songID}`}
            >
              {props.songName}
            </a>
          </Card.Title>
        </Card.Body>
        <Card.Footer>と主張しています。</Card.Footer>
      </Card>
      <ShareComponent {...props.share} />
      <TrackingTagComponent />
    </body>
  </html>
);
