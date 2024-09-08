exports.constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

exports.ROLES = {
  Admin: "ADMIN",
  Edit: "EDITOR",
  Comment: "COMMENTOR",
  View: "VIEWER",
};

exports.PRIORITY = {
  Low: "LOW",
  Medium: "MEDIUM",
  High: "HIGH",
};

exports.THEMES = {
  purple: "purple",
  yellow: "yellow",
  blue: "blue",
};

exports.REFRESH_TOKEN_OPTION = {
  sameSite: "None",
  secure: true,
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};

exports.REFRESH_TOKEN_COOKIE = "tkn"