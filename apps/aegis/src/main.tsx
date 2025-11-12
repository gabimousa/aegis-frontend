import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { createClient } from 'graphql-ws';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import { ApolloLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import './translation/i18n';

const httpLink = new HttpLink({ uri: '/graphql' });
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
      window.location.host
    }/graphql`,
  })
);

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => {
      const def = getMainDefinition(operation.query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    wsLink,
    httpLink
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
