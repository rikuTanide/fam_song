import { Request, Response } from "../types/request_type";
import { Artist, Song, User, Vote } from "../types/data";
import { Models } from "../types/model";
import {
  PATH_ARTISTS,
  PATH_SONG_NAME,
  PATH_SONGS,
  PATH_USERS,
  PATH_VOTE,
} from "../values";

export interface FirebaseService {
  set(path: string, value: any): void;
  push(path: string, value: any): string;
  remove(path: string): void;
}

export function update(
  fs: FirebaseService,
  models: Models,
  request: Request,
  requestID: string
): Response {
  const method = request.method;
  const path = request.path;
  const payload = request.payload;
  const userID = request.userID;

  if (method == "PUT" && path == PATH_USERS) {
    return putUser(fs, models, requestID, userID, payload as User);
  } else if (method == "POST" && path == PATH_ARTISTS) {
    return postArtist(fs, models, requestID, payload as Artist);
  } else if (method == "POST" && path == PATH_SONGS) {
    const artistID = request.params.artistID;
    return postSong(fs, models, requestID, artistID, payload as Song);
  } else if (method == "PUT" && path == PATH_SONG_NAME) {
    const artistID = request.params.artistID;
    const songID = request.params.songID;
    return putSongName(
      fs,
      models,
      requestID,
      artistID,
      songID,
      payload as string
    );
  } else if (method == "PUT" && path == PATH_VOTE) {
    const artistID = request.params.artistID;
    return putVote(fs, models, requestID, userID, artistID, payload as Vote);
  } else if (method == "DELETE" && path == PATH_VOTE) {
    const artistID = request.params.artistID;
    return deleteVote(fs, models, requestID, userID, artistID);
  } else {
    throw new Error("nai");
  }
}

function putVote(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  userID: string,
  artistID: string,
  vote: Vote
): Response {
  fs.set(`/data/votes/${userID}/${artistID}`, vote);
  return {
    requestID: requestID,
    result: null,
  };
}

function deleteVote(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  userID: string,
  artistID: string
): Response {
  fs.remove(`/data/votes/${userID}/${artistID}`);
  return {
    requestID: requestID,
    result: null,
  };
}

function postSong(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  artistID: string,
  song: Song
): Response {
  const songID = fs.push(`/data/songs/${artistID}`, song);
  return {
    requestID: requestID,
    result: songID,
  };
}

function putSongName(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  artistID: string,
  songID: string,
  name: string
): Response {
  fs.set(`/data/songs/${artistID}/${songID}/name`, name);
  return {
    requestID: requestID,
    result: null,
  };
}

function putUser(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  userID: string,
  user: User
): Response {
  fs.set(`/data/users/${userID}`, user);
  return {
    requestID: requestID,
    result: null,
  };
}

function postArtist(
  fs: FirebaseService,
  models: Models,
  requestID: string,
  artist: Artist
): Response {
  const artistID = fs.push("/data/artists", artist);
  return {
    requestID: requestID,
    result: artistID,
  };
}
