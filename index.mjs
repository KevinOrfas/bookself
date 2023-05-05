import { server } from './src/server.mjs';

const app = {};

app.init = () => {
  console.log('HERE');
  server.init();
};

// app.init();
