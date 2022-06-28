<template>
  <div class="form-floating validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      id="floatingInput"
      class="form-control px-3"
      :class="{'is-invalid': inputRef.error}"
      v-bind="$attrs"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
    >
    <textarea
      v-else
      class="form-control"
      id="floatingInput"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      v-bind="$attrs"
      @input="updateValue"
      @blur="validateInput"
    />
    <label for="floatingInput">{{labelValue}}</label>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { emitter } from './ValidateForm.vue'
import { RulesProp } from '../hooks/InputRules'
//  各规则对应的正则
const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
const userReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/
const pwdReg = /^[a-zA-Z0-9]{6,12}$/
export type TagType = 'input' | 'textarea'
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    Error: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    },
    validValue: String,
    labelValue: String
  },
  setup (props, context) {
    const store = useStore()
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          inputRef.message = rule.message
          let passed = true
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'valid':
              passed = (inputRef.val === props.validValue)
              break
            case 'user':
              passed = userReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('formItemCreated', validateInput)
    })
    watch(() => props.Error, (error, prevError) => {
      if (error) {
        inputRef.error = true
        inputRef.message = error
      }
    })
    watch(() => props.modelValue, (value, prevValue) => {
      if (value !== prevValue) {
        inputRef.val = value!
      }
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
