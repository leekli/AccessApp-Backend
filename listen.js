// listen.js - Function which sets up the port for the server to listen on

const app = require("./app.js");

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Now listening to port:", PORT);
});
