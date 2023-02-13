<script lang="ts">
    import ThemeSwitcher from '$lib/daisyUiComponents/ThemeSwitcher.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor.js';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey.js';
    import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
</script>

<div class="navbar bg-neutral text-neutral-content p-0 min-h-6">
    <div class="flex-1">
        <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost font-normal normal-case">Datei</label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-1 p-2 shadow-sm bg-neutral rounded-box w-52">
                <li>
                    <a class="px-2 py-2" on:click={() => editor.showModal('createDocument')}>Neue Resource Datei...</a>
                </li>
                <li>
                    <a class="px-2 py-2" on:click={() => editor.openTab('excludePatientConditions')}>Ausschlusskriterien bearbeiten</a>
                </li>
                <li class="menu-title mt-2">
                    <span class="pl-2 !text-neutral-content/60 uppercase">Projekt</span>
                </li>
                <li><a class="px-2 py-2 pointer-events-none text-neutral-content/80">Neues Projekt...</a></li>
                <li><a class="px-2 py-2 pointer-events-none text-neutral-content/80">Speichern</a></li>
                <li>
                    <a class="px-2 py-2" on:click={() => editor.showModal('export')}>DaTreFo Forschungsdaten Beschreibung exportieren...</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <LocaleSwitcher />
            <ThemeSwitcher />
        </ul>
    </div>
</div>
