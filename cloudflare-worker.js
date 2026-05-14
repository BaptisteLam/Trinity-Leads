import { handleRequest } from './server-cloudflare.js';

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};
