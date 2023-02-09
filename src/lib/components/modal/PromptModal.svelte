<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import Input from '$lib/daisyUiComponents/Input.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let promptMessage = '';
    let saveMessage = '';
    let cancelMessage = '';
    let value = '';
    let callback: (value: string) => void;

    export function open(
        _promptMessage: string,
        defaultValue = '',
        _saveMessage = 'Übernehmen',
        _cancelMessage = 'Abbrechen'
    ): Promise<string | false> {
        promptMessage = _promptMessage;
        value = defaultValue;
        saveMessage = _saveMessage;
        cancelMessage = _cancelMessage;
        isOpen = true;

        return new Promise<string | false>((resolve) => {
            callback = resolve;
        });
    }

    export function close() {
        isOpen = false;
    }

    function submitModal(save: boolean) {
        if (!value) {
            return;
        }

        callback(save ? value : false);

        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">{promptMessage}</h1>
    <Input type="text" inputStyle="bordered" class="w-full" bind:value />
    <div class="modal-action">
        <Button on:click={() => submitModal(false)} btnStyle="ghost">{cancelMessage}</Button>
        <Button on:click={() => submitModal(true)} color="primary" disabled={!value}>{saveMessage}</Button>
    </div>
</Modal>
