/**
 * WARNING:
 * This is a dummy server for locally testing Web UI code in production.
 * This server is not meant for use in production environments.
 */

import { createServer } from 'http';
import * as express from 'express';
import { PATHS, DEV_PORT } from './settings';

const app = express();

app.use(express.static(PATHS.output));
app.get('*', ({}, res) => res.sendFile(PATHS.index.output));

createServer(app).listen(DEV_PORT, () => {
  console.log(`Server is running on port ${DEV_PORT}...`);
});
