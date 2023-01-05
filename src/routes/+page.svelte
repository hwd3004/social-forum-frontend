<script async script lang="ts">
  import { setClient } from "svelte-apollo";
  import client from "@lib/apollo";
  import { gql, type ApolloQueryResult } from "@apollo/client/core";
  import { query, type ReadableQuery } from "svelte-apollo";
  import type AllUsers from "@lib/interfaces/users/allUsers.interface";

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

  // let $allUsers: Result<User

  /**
   * way 1
   */
  // const allUsers = query(ALL_USERS) as ReadableQuery<[User]>;
  // console.log("allUsers", allUsers);
  // // console.log("$allUsers", $allUsers);

  /**
   * way 2
   */
  const { result } = query(ALL_USERS);

  // let res: Promise<ApolloQueryResult<[User]>>;
  // let res = init();

  // const init = async () => {
  //   const r1 = result() as Promise<ApolloQueryResult<[User]>>;
  //   const r2 = await r1;
  //   return r2;
  // };

  // init();

  let promise = init();

  async function init() {
    const queryResult = result() as Promise<ApolloQueryResult<AllUsers>>;
    // const queryResult = result() as Promise<ApolloQueryResult<Data<[User]>>>;

    return await queryResult;
  }
</script>

<!-- way 1 -->
<!-- <div>
  {#if $allUsers?.loading}
    Loading...
    {console.log($allUsers)}
  {:else if $allUsers?.error}
    <p>{$allUsers?.error?.message}</p>
  {:else}
    {console.log(typeof $allUsers)}
    {console.log(typeof $allUsers?.data)}
    {#each $allUsers?.data?.allUsers as users}
      <div>
        <p>{users.id}</p>
        <p>{users.username}</p>
        <hr />
      </div>
    {/each}
  {/if}
</div> -->

<!-- way 2 -->
<div>
  {#await promise}
    Loading...
  {:then { data: { allUsers } }}
    {#each allUsers as user}
      <p>{user.id}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
    {/each}
  {:catch error}
    {error}
  {/await}
</div>
