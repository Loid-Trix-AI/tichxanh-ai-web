// @ts-ignore - dist/server/server.js is a generated file
import server from '../dist/server/server.js';

export const config = {
  runtime: 'edge',
};

export default function (request: Request) {
  return server.fetch(request, {}, {});
}
