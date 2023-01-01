<script lang="ts">
  // https://www.apollographql.com/docs/react/api/link/apollo-link-context
  import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, type GraphQLRequest } from "@apollo/client";
  import { setContext } from "@apollo/client/link/context";
  import { onError } from "@apollo/client/link/error";
  import { setClient } from "svelte-apollo";

  const httpLink = new HttpLink({
    uri: "http://localhost:4000/api/graphql",
  });

  const authLink = setContext((_operation: GraphQLRequest, prevContext) => {
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
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
