<script async script lang="ts">
  import { setClient } from "svelte-apollo";
  import client from "@lib/apollo";
  import { gql, type ApolloQueryResult } from "@apollo/client/core";
  import { query, type ReadableQuery } from "svelte-apollo";
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

  const { result } = query(queryAllUsers);

  let promise = init();

  async function init() {
    const queryResult = result() as Promise<ApolloQueryResult<AllUsers>>;

    return await queryResult;
  }
</script>

<div>
  {#await promise}
    Loading...
  {:then { data: { allUsers } }}
    {#each allUsers as user}
      <div>
        <p>{user.id}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <hr />
      </div>
    {/each}
  {:catch error}
    {error}
  {/await}
</div>
