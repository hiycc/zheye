<template>
  <form class="validate-form-container" action="">
    <slot name="default"></slot>
    <div>
      <slot name="submit" :handleClickSubmit="submitForm">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
type Events = {
  formItemCreated: ValidateFunc
}
export const emitter = mitt<Events>()
export default defineComponent({
  name: 'ValidateForm',
  emit: ['form-submit'],
  setup (props, context) {
    let funcArr:ValidateFunc[] = []
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    emitter.on('formItemCreated', callback)
    onUnmounted(() => {
      emitter.off('formItemCreated', callback)
      funcArr = []
    })
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    return {
      submitForm
    }
  }
})
</script>
