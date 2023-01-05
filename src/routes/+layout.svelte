<script lang="ts">
  import { setClient } from "svelte-apollo";
  import client from "@lib/apollo";
  import { gql, type ApolloQueryResult } from "@apollo/client/core";
  import { query, type ReadableQuery } from "svelte-apollo";
  import type AllUsers from "@lib/interfaces/users/allUsers.interface";

  setClient(client);
</script>

<div>
  <nav>
    <a href="/">Home</a>
    <a href="/signup">Sign Up</a>
    <a href="/fetch1">fetch 1</a>
    <a href="/fetch2">fetch 2</a>
  </nav>
</div>

<slot />
