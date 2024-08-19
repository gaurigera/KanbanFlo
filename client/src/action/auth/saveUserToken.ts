import Cookie from "js-cookie"

export type Tokens = {
  accessToken: string;
};

export default function saveUserTokens(credentials: Tokens) {
  // Convert the 'credentials' object to a JSON string
  // const data = JSON.stringify(credentials);

  // Set a cookie named 'user' with the JSON stringified 'credentials' data
  Cookie.set("user", credentials.accessToken);
}