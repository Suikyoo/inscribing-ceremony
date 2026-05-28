<script lang="ts">
	import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { connect } from "$lib/websockets";
	import { invalidate } from "$app/navigation";
	import { flip } from "svelte/animate";

  const { data }: PageProps = $props();
  
  let socket: WebSocket;

  let container: HTMLDivElement;

  onMount(() => {
    socket = connect(() => invalidate("app:reload"))
    return () => socket.close();
    })

  $effect(() => {
    if (!data.students.length) return
    container.scrollTo({top: container.scrollHeight});
  });

</script>

<div bind:this={container}>
  {#each data.students as student, index (student.id)}
    <div style="background-color: red;" animate:flip={{duration: 1000, delay: 500}}>
      
      <p>{student.name}</p>
      <p>{student.id}</p>
      <img src={`/student-imgs/${student.id}`} alt="student">
    </div>
  {/each}

</div>
