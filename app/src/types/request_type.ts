export interface Request {
  method: "POST" | "PUT" | "DELETE";
  path: string;
  params: any;
  payload: any;
}

export interface Response {
  requestID: string;
  result: any;
}
