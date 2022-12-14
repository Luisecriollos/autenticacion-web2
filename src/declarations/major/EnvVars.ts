/* eslint-disable node/no-process-env */

export default {
  nodeEnv: process.env.NODE_ENV ?? "",
  port: process.env.PORT ?? 0,
  cookieProps: {
    key: "Web-2-APP",
    secret: process.env.COOKIE_SECRET ?? "",
    options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? "",
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? "",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  database: {
    user: process.env.DB_USER ?? "",
    password: process.env.DB_PASSWORD ?? "",
    host: process.env.DB_HOST ?? "",
    dbName: process.env.DB_NAME ?? "",
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? "",
    exp: process.env.COOKIE_EXP ?? "", // exp at the same time as the cookie
  },
} as const;
