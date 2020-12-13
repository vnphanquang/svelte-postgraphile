import { ApolloClient, DefaultOptions } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';
import ClientConfig from '@config/client';

const defaultLinkOptions = {
  // You should use an absolute URL here
  uri: `${ClientConfig.api.url}${ClientConfig.api.routes.graphql}`,
  fetch,
  credentials: 'same-origin',
};

const link = createHttpLink(defaultLinkOptions);

// Cache implementation
const cache = new InMemoryCache();

// Default options (cache & error policies)
const defaultOptions: DefaultOptions = {};

// Create an Apollo client and pass it to all child components
// (uses svelte's built-in context)
const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions,
});
export default apolloClient;
