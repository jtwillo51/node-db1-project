const server = require("./api/server.js");

const accountsRouter = require("./api/accounts-router")
server.use(accountsRouter)

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
