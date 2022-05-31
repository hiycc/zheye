<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input type="text" :rules="emailRules"/>
    </div>
    <div class="mb-3">
      <label class="form-label">密码</label>
      <validate-input type="password" :rules="pwdRules" v-model="pwd1"/>
    </div>
    <div class="mb-3">
      <label class="form-label">确认密码</label>
      <validate-input type="password" :rules="validPwdRules" :validValue="pwd1" v-model="pwd2"/>
    </div>
    <template #submit >
      <span class="btn btn-danger" >注册</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const onSubmitForm = (result: boolean) => {
      console.log('result', result)
      if (result) {
        store.commit('login')
        router.push('/')
      }
    }
    const pwd1 = ref('')
    const pwd2 = ref('')

    return {
      emailRules,
      validPwdRules,
      onSubmitForm,
      pwdRules,
      pwd1,
      pwd2
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
