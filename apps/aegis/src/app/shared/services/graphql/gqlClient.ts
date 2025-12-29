import { GraphQLClient } from 'graphql-request';

const endpoint = `${window.location.origin}/graphql`;
export const gqlClient = new GraphQLClient(endpoint);
