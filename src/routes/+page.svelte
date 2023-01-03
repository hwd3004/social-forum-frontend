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
