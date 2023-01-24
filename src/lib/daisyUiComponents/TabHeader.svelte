<script lang="ts">
    import { setContext } from 'svelte';

    setContext('tabHeader', true);
</script>

<div class="tabs w-full mb-3">
    <slot />
</div>
