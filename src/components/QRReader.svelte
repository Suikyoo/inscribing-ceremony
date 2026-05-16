<script lang="ts">
	import jsQR from "jsqr";
	import type { ActionData } from "../routes/$types";

  const {form = $bindable()}: {form: ActionData} = $props();

  
  let video: HTMLVideoElement;
  let stream: MediaStream | null = null;
  let raf: number | null = null;

  let qr_name = $state("");
  let qr_id = $state("");
  let attempts = $state(0);

  let htmlForm: HTMLFormElement;

  async function startCamera() {
    stopCamera();
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    if (!video) throw new Error("Video null")
    video.srcObject = stream;
    await video.play();
    tick();
  }

function stopCamera() {
  if (raf) cancelAnimationFrame(raf);
  if (stream) stream.getTracks().forEach(t => t.stop());
  stream = null;
  if (!video) throw new Error("Video null")
  video.srcObject = null;
}

function tick() {
  attempts += 1;
  if (!video) throw new Error("Video null")
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    const w = video.videoWidth, h = video.videoHeight;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx?.drawImage(video, 0, 0, w, h);
    const img = ctx?.getImageData(0, 0, w, h);
    if (!img) throw new Error("Undefined image")
    const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });

    if (code) {
      const [temp_name, temp_id, ..._] = code.data.split(";")
      qr_name = temp_name; 
      qr_id = temp_id;
      setTimeout(async() => htmlForm.submit(), 1000);


    }
  }
  raf = requestAnimationFrame(tick);
}

  const start = () => startCamera().catch(err => alert('Camera error: ' + err.message))
  const stop = () => stopCamera
</script>

  <video bind:this={video} autoplay playsinline></video>
  <button onclick={start}>Start</button>
  <button onclick={stop}>Stop</button>

<div>
  <form method="POST"  style="background-color: red;" bind:this={htmlForm}>

  {#if form?.success}
    <p>form submitted</p>
  {/if}

  {#if form?.missing}
    <p>form missing contents</p>
  {/if}

  {#if form?.repeated}
    <p>id already registered</p>
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
</div>
