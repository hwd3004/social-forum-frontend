import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from "@apollo/client/core";

// https://www.apollographql.com/docs/react/api/link/apollo-link-context
// import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { setClient } from "svelte-apollo";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/api/graphql",
});

const authLink = setContext((_operation, prevContext) => {
  const token = localStorage.getItem("token");

  console.log("_operation", _operation);
  console.log("prevContext", prevContext);

  const { headers } = prevContext;

  return {
    headers: {
      ...headers,
      token,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((message, locations, path) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

setClient(client);
