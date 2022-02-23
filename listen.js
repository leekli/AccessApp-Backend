// listen.js - Function which sets up the port for the server to listen on

const app = require("./app.js");
require("./db/connection.js");

// process.env.NODE_ENV = "development";
console.log(process.env.NODE_ENV);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Now listening to port:", port);
});
