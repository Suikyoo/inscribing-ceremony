<script lang="ts">
	import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { connect } from "$lib/websockets";
	import { invalidate } from "$app/navigation";

  const { data }: PageProps = $props();
  
  let socket: WebSocket;

  onMount(() => {
    socket = connect(() => invalidate("app:reload"))
    return () => socket.close();
    })

</script>

<div>
  {#each data.students as student}
    <div style="background-color: red;">
      
      <p>{student.name}</p>
      <p>{student.id}</p>
      <img src={`/student-imgs/${student.id}`} alt="student">
    </div>
  {/each}

</div>
