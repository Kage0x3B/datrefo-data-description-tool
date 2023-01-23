<script lang="ts">
    import { setContext } from 'svelte';

    setContext('tabHeader', true);
</script>

<div class="tabs w-full border-b-gray-100">
    <slot />
</div>
