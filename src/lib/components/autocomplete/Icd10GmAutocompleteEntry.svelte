<script lang="ts">
    import Fuse from 'fuse.js';

    export let entry: Fuse.FuseResult<{ c: string; d: string }>;
    export let submitValue: (value: string) => void;
    export let isLast: boolean;
</script>

<li
    class="{!isLast ? 'border-b' : ''} px-4 py-2 flex flex-col cursor-pointer hover:bg-base-200 active:bg-base-300 select-none"
    on:click={() => submitValue(entry.item.c)}
>
    <span class="font-bold">{entry.item.c}</span>
    <span class="text-base-content/80">{entry.item.d}</span>
</li>
