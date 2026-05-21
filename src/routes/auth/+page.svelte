<script lang="ts">
  import type { PageProps } from "./$types";

  const { form }: PageProps = $props();
  
  </script>

<form 
  method="POST"  
  style="background-color: red;" 
>
  {#if form?.fail}
    <p>wrong username or password</p>
  {/if}

  {#if form?.missing}
    <p>form missing contents</p>
  {/if}

    <label>
      name: 
      <input name="username" type="text" />
    </label>

    <label>
      id: 
      <input name="password" type="password" />
    </label>

    <button>Submit</button>

  </form>

