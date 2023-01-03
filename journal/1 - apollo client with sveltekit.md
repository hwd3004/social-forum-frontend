npm i @apollo/client

npm i svelte-apollo

/src/lib/apollo.ts

```ts
// https://www.apollographql.com/docs/react/integrations/integrations/#svelte
import { ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { browser } from "$app/environment";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/api/graphql",
});

const authLink = setContext((_operation, prevContext) => {
  let token;
  if (browser) {
    token = localStorage.getItem("token") || null;
  }

  console.trace("_operation", _operation);
  console.trace("prevContext", prevContext);

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
      console.trace(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.trace(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
```

src/routes/+page.svelte

```svelte
<script lang="ts">
  import { setClient } from "svelte-apollo";
  import client from "@lib/apollo";
  import { gql } from "@apollo/client/core";
  import { query, type ReadableQuery } from "svelte-apollo";

  setClient(client);

  const ALL_USERS = gql`
    query Query {
      allUsers {
        id
        username
        password
        email
        image
        createdAt
        role
      }
    }
  `;

  const allUsers = query(ALL_USERS);

  console.trace(allUsers);
</script>

{#if $allUsers.loading}
  Loading...
{:else}
  <!-- {console.trace($allUsers)} -->
  {#each $allUsers.data.allUsers as users}
    <div>
      <p>{users.id}</p>
      <p>{users.username}</p>
      <hr />
    </div>
  {/each}
{/if}
```
