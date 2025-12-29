import { createClient } from 'graphql-ws';

// export const wsClient = createClient({
//   url: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/graphql`,
//   // connectionParams: { authToken: localStorage.getItem('token') }
// });

const getWsUrl = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.host; // e.g. localhost:5173
  // If your API is on the same host but different path, use this:
  return `${protocol}//${host}/graphql`;

  // IF your API is on a different port (e.g. 4000), use:
  // return `ws://localhost:4000/graphql`;
};

export const wsClient = createClient({
  url: getWsUrl(),
  lazy: true, // Connects only when first subscription starts
  retryAttempts: Infinity,
  // connectionParams: { authToken: localStorage.getItem('token') }
});
