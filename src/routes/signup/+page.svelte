<script lang="ts">
  import type User from "@lib/interfaces/users/users.interface";
  import { gql } from "@apollo/client/core";
  import { mutation } from "svelte-apollo";

  const mutationCreateAccount = gql`
    mutation CreateAccount($username: String!, $password: String!, $email: String!) {
      createAccount(username: $username, password: $password, email: $email) {
        success
        message
      }
    }
  `;

  let user: User;

  const signup = mutation(mutationCreateAccount);

  const handleSubmit = async (event: Event) => {
    try {
      await signup({ variables: { ...user } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    user = {
      ...user,
      [name]: value,
    };

    console.log(user);
  };
</script>

<div>
  <h1>sign up</h1>

  <form on:submit|preventDefault={handleSubmit} autocomplete="off">
    <input on:change={handleChange} type="text" name="username" placeholder="username" />
    <input on:change={handleChange} type="password" name="password" placeholder="password" />
    <input on:change={handleChange} type="text" name="email" placeholder="email" />
    <!-- <input type="submit" /> -->
    <button>submit</button>
  </form>
</div>
