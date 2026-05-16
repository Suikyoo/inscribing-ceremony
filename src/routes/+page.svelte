
<script lang="ts">
	import QRReader from "../components/QRReader.svelte";
  import type { PageProps } from "./$types";

  const { data, form }: PageProps = $props();

  
</script>


<div>
  {#each data.students as student}
    <div>
      <p>{student.name}</p>
      <p>{student.id}</p>
    </div>
  {/each}

  <QRReader {form} />
</div>
