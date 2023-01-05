<script async script lang="ts">
  import { setClient } from "svelte-apollo";
  import client from "@lib/apollo";
  import { gql, type ApolloQueryResult } from "@apollo/client/core";
  import { query, type ReadableQuery, restore, subscribe } from "svelte-apollo";
  import type AllUsers from "@lib/interfaces/users/allUsers.interface";

  const queryAllUsers = gql`
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

  const allUsers = subscribe(queryAllUsers);
  console.log("allUsers", allUsers);
  console.log("$allUsers", $allUsers);
</script>

<div>
  {#if $allUsers?.loading}
    Loading...
    {console.log($allUsers)}
  {:else if $allUsers?.error}
    <p>{$allUsers?.error?.message}</p>
  {:else}
    {console.log(typeof $allUsers)}
    {console.log(typeof $allUsers?.data)}
    {#each $allUsers?.data?.allUsers as user}
      <div>
        <p>{user.id}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <hr />
    {/each}
  {/if}
</div>
