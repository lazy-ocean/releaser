import axios from "axios";
import { ENDPOINTS } from "../utils/getData";

const requestClientCredentials = async (): Promise<string | undefined> => {
  const auth_token = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    "utf-8"
  ).toString("base64");

  try {
    const token_url = ENDPOINTS.REQUEST_TOKEN;
    let body = new URLSearchParams();
    body.append("grant_type", "client_credentials");

    const response = await axios.post(token_url, body, {
      headers: {
        Authorization: `Basic ${auth_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

export default requestClientCredentials;
