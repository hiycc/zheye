<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">用户名</label>
      <validate-input type="text" :rules="userRules" v-model="userVal"/>
    </div>
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input type="text" :rules="emailRules" v-model="emailVal" :emailError="emailError"/>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input type="password" :rules="pwdRules" v-model="pwd1Val"/>
    </div>
    <div class="mb-3">
      <label class="form-label">确认密码</label>
      <validate-input type="password" :rules="validPwdRules" :validValue="pwd1Val" v-model="pwd2Val"/>
    </div>
    <template v-slot:submit="slotProps">
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">注册</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { AxiosError } from 'axios'

//  定义规则类型和错误时返回的信息
const userRules: RulesProp = [
  { type: 'required', message: '用户名不能为空' },
  { type: 'user', message: '请输入正确的用户名格式（6-12字符，不含有特殊符号）' }
]
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮件不能为空' },
  { type: 'existed', message: '电子邮件已存在' },
  { type: 'email', message: '请输入正确的邮件格式' }
]
const pwdRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]
const validPwdRules: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  { type: 'valid', message: '两次密码不一致' }
]

export default defineComponent({
  name: 'Register',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    //  点击注册按钮的逻辑
    const onSubmitForm = (result: boolean) => {
      console.log('result', result)
      if (result) {
        const user = {
          username: userVal.value,
          email: emailVal.value,
          password: pwd1Val.value
        }
        emailError.value = ''
        store.dispatch('addUser', user).then((result) => {
          if (result.status !== 200) {
            emailError.value = '邮箱已被注册'
            console.log(result)
          } else {
            router.push('/')
          }
        })
      }
    }
    const emailError = ref('')
    const userVal = ref('')
    const emailVal = ref('')
    const pwd1Val = ref('')
    const pwd2Val = ref('')

    return {
      emailRules,
      emailVal,
      emailError,
      userRules,
      validPwdRules,
      onSubmitForm,
      pwdRules,
      userVal,
      pwd1Val,
      pwd2Val
    }
  }
})
</script>
<style>
  .router-link-active {
    text-decoration: none;
  }
  a {
    text-decoration: none;
  }
</style>
