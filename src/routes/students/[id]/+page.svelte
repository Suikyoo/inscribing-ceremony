
<script lang="ts">
	import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const student = $derived(data.students[0]);
</script>
<div>
  {#if student}
    <h1>{student.name}</h1>
    <p>{student.id}</p>
    <p><i>{student.description}</i></p>
    
  {:else}
    <p>no such student</p>
  {/if}
</div>
