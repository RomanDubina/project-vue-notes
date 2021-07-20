<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            Вы действительно хотите продолжить?
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button btn-ok" @click="$emit('continue')"></button>
            <button class="modal-default-button btn-not" @click="$emit('cancel')"></button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>
