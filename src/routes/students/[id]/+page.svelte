
<script lang="ts">
	import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const student = $derived(data.students[0]);
</script>
<div>
  <p>di na ta ma paranoid, atua ning page ang naas qr code</p>
  {#if student}
    <h1>{student.name}</h1>
    <p>{student.id}</p>
    <p><i>{student.img}</i></p>
    
  {:else}
    <p>no such student</p>
  {/if}
</div>
