<script lang="ts">
	import { onMount } from "svelte";
	import QRReader from "../../components/QRReader.svelte";
  import type { PageProps } from "./$types";
  import { connect } from "$lib/websockets";
	import { invalidate } from "$app/navigation";
	import type { ActionResult } from "@sveltejs/kit";
	import { applyAction } from "$app/forms";

  const { data, form }: PageProps = $props();
  
  let socket: WebSocket;

  onMount(() => {
    socket = connect(() => invalidate("app:reload"))
    return () => socket.close();
    })

  const afterSubmit = async ({result}: {result: ActionResult}) => {
    console.log("result: ", result)
    if (result.type == "success") {
      socket.send(result.data?.id || "-1");
      }
    await applyAction(result);
    }
</script>





<div>
  {#each data.students as student}
    <div style="background-color: red;">
      
      <p>{student.name}</p>
      <p>{student.id}</p>
      <img src={`/student-imgs/${student.id}`} alt="student">
    </div>
  {/each}

  <QRReader {form} {afterSubmit} />
</div>
