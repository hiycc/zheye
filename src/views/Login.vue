<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input type="text" :rules="emailRules" v-model="emailVal"/>
      <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input type="password" :rules="pwdRules" />
    </div>
    <template #submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const emailRules: RulesProp = [
  { type: 'required', message: '电子邮件不能为空' },
  { type: 'email', message: '请输入正确的邮件格式' }
]
const pwdRules: RulesProp = [
  { type: 'required', message: '' }
]

export default defineComponent({
  name: 'App',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const onSubmitForm = (result: boolean) => {
      console.log('result', result)
    }
    const emailVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })

    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'should not be empty'
      }
    }
    return {
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      onSubmitForm,
      pwdRules
    }
  }
})
</script>
