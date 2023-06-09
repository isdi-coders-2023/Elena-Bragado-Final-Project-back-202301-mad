import { app } from './app.js';
import createDebug from 'debug';
import http from 'http';
import { dbConnect } from './db/db.connect.js';

const debug = createDebug('HOME:index');
const PORT = process.env.PORT || 4500;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('listening', () => {
  debug('Listening in http://localhost:' + PORT);
});
