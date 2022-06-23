<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input type="text" :rules="emailRules" v-model="emailVal"/>
      <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input type="password" :rules="pwdRules" v-model="pwdVal" :Error="pwdError"/>
    </div>
    <template v-slot:submit="slotProps" >
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">登陆</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const emailRules: RulesProp = [
  { type: 'required', message: '电子邮件不能为空' },
  { type: 'email', message: '请输入正确的邮件格式' }
]
const pwdRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const pwdError = ref('')
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const user = {
          email: emailVal.value,
          password: pwdVal.value
        }
        store.dispatch('login', user).then((result) => {
          if (result.status !== 200) {
            pwdError.value = '密码错误'
          } else {
            console.log(result.data)
            window.localStorage.setItem('token', result.data.token)
            router.push('/')
          }
        })
      }
    }
    const emailVal = ref('')
    const pwdVal = ref('')
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
      pwdVal,
      validateEmail,
      emailRules,
      pwdError,
      emailVal,
      onSubmitForm,
      pwdRules
    }
  }
})
</script>
<style>
  /* .router-link-active {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  } */
</style>
