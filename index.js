const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const port = 3010;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});
