import * as React from "react";
import { UserPageProps } from "../types/props";
import { Breadcrumb, Card, Jumbotron } from "react-bootstrap";
import { renderToStaticMarkup } from "react-dom/server";

export function renderUserPage(props: UserPageProps): string {
  return renderToStaticMarkup(<UserPageComponent {...props} />);
}
export const UserPageComponent: React.FunctionComponent<UserPageProps> = (
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
        <Breadcrumb.Item href={`/users/${props.userID}`}>
          {props.userName}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card className="m-3">
        <Card.Header>
          <Card.Title>
            <img src={props.userImg} width={30} />
            {props.userName}さんの投票
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {props.voteSongs.map((s) => (
            <Card key={s.artistID} className="mb-2">
              <Card.Header>
                <a className="text-dark" href={`/artists/${s.artistID}`}>
                  {s.artistName}
                </a>
              </Card.Header>
              <Card.Body>
                <a
                  className="text-dark"
                  href={`/votes/users/${props.userID}/artists/${s.artistID}`}
                >
                  {s.songName}
                </a>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </body>
  </html>
);
