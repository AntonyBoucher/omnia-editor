<script>
  import { createEventDispatcher } from "svelte";
  import { hasFocus, isActive } from "../stores";
  import { editable, contenteditable } from '../helpers';

  export let index;
  export let data;
  export let placeholder;
  export let focus = false;

  const dispatch = createEventDispatcher();

  let element;

  $: {
    if (element) {
      element.contentEditable = $isActive;
    }
  }

  editable.on("focus", (elem) => {
    if (elem === element) {
      focus = true;
      hasFocus.set(true);
    }
  });

  editable.on("blur", (elem) => {
    if (elem === element) {
      focus = false;
      hasFocus.set(false);
    }
  });

  editable.on("change", (elem) => {
    if (elem === element) {
      dispatch("change", { index, content: editable.getContent(elem) });
    }
  });
</script>

<style>
  .omnia-code {
    display: inline-block;
    width: -webkit-fill-available;
    outline: 0;
    transition: opacity 0.1s linear;
    text-align: left;
  }
  .omnia-code-blur {
    opacity: 0.4;
  }
  .omnia-code:empty:not(:focus):before {
    content: attr(placeholder);
    color: grey;
    font-style: italic;
    pointer-events: none;
  }
</style>

<code
  id={`omnia-code-${index}`}
  data-index={index}
  data-type="code"
  class:omnia-code-blur={!focus && $hasFocus}
  class="omnia-block omnia-code"
  use:contenteditable
  contenteditable="true"
  bind:innerHTML={data.text}
  bind:this={element}
  {placeholder} />
