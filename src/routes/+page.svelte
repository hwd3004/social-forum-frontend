<script lang="ts">
  import { gql } from "@apollo/client/core";
  import { setClient, query, type ReadableQuery } from "svelte-apollo";

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

  interface User {
    id: string;
  }

  const allUsers: ReadableQuery<User> = query(ALL_USERS);

  console.log(allUsers);
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $allUsers.loading}
  Loading...
{:else}
  {console.log($allUsers)}
  {#each $allUsers.data.allUsers as users}
    {users.id}
  {/each}
{/if}
