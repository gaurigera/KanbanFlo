import Cookie from "js-cookie"

export type Tokens = {
  accessToken: string;
};

export default function saveUserTokens(credentials: Tokens) {
  Cookie.set("user", credentials.accessToken);
}