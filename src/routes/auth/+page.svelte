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

<form 
  method="POST"  
  style="background-color: red;" 
  action="/"

  {#if form?.success}
    <p>form submitted</p>
  {/if}

  {#if form?.missing}
    <p>form missing contents</p>
  {/if}

  {#if form?.repeated}
    <p>id repeated</p>
  {/if}

    <label>
      name: 
      <input bind:value={qr_name} name="name" type="text" />
    </label>
    <label>
      id: 
      <input bind:value={qr_id} name="id" type="text" />
    </label>
    <button>Submit</button>
  </form>

