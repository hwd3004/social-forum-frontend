<script lang="ts">
  let signup;

  const handleSubmit = (event: Event) => {
    console.trace("sign up");
  };
</script>

<div>
  <h1>sign up</h1>

  <form on:submit|preventDefault={handleSubmit} autocomplete="off">
    <input type="text" name="username" placeholder="username" />
    <input type="password" name="password" placeholder="password" />
    <input type="email" name="email" placeholder="email" />
    <button>submit</button>
  </form>
</div>
