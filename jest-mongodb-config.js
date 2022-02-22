module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    instance: {},
    autoStart: false,
  },
  mongoURLEnvName:
    "mongodb+srv://dbUser:dbUserPassword@accessapp-db.7pae7.mongodb.net/AccessApp-DB-Test?retryWrites=true&w=majority",
};
