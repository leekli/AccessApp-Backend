require("dotenv/config");

module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    instance: {},
    autoStart: false,
  },
  mongoURLEnvName: process.env.DB_CONNECTION_TEST,
};
