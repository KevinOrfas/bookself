import { server } from './src/server.mjs';

const app = {};

app.init = () => {
  server.init();
};

app.init();
