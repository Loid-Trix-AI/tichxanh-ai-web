import server from '../dist/server/server.js';

export const config = {
  runtime: 'edge',
};

export default function (request: Request) {
  return server.fetch(request, {}, {});
}
