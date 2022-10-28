const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 5050;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
