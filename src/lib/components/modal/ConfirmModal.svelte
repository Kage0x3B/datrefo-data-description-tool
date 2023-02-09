<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let promptMessage = '';
    let affirmativeText = '';
    let cancelText = '';
    let callback: (value: boolean) => void;

    export function open(_promptMessage: string, _affirmativeText = 'Yes', _cancelText = 'No'): Promise<boolean> {
        promptMessage = _promptMessage;
        affirmativeText = _affirmativeText;
        cancelText = _cancelText;
        isOpen = true;

        return new Promise<boolean>((resolve) => {
            callback = resolve;
        });
    }

    export function close() {
        isOpen = false;
    }

    function submitModal(value: boolean) {
        callback(value);

        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">{promptMessage}</h1>
    <div class="modal-action">
        <Button on:click={() => submitModal(false)} btnStyle="ghost">{cancelText}</Button>
        <Button on:click={() => submitModal(true)} color="primary">{affirmativeText}</Button>
    </div>
</Modal>
