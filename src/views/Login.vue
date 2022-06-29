<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3"><span class="fs-2 bi bi-house me-2"></span><span class="fs-4">登录</span></div>
    <div class="mb-3">
      <!-- <label class="form-label">邮箱地址</label> -->
      <validate-input
        type="text"
        :rules="emailRules"
        v-model="emailVal"
        :Error="emailError"
        :labelValue="'邮箱地址'"/>
      <!-- <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div> -->
    </div>
    <template v-slot:submit="slotProps" >
       <div class="mb-3">
        <!-- <label class="form-label">密码</label> -->
        <validate-input
          v-on:keyup.enter="slotProps.handleClickSubmit"
          type="password"
          :rules="pwdRules"
          v-model="pwdVal"
          :Error="pwdError"
          :labelValue="'密码'"/>
      </div>
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">登陆</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '../components/ValidateInput.vue'
import { emailRules, pwdRules } from '../hooks/InputRules'
import ValidateForm from '../components/ValidateForm.vue'

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
    const emailError = ref('')
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const user = {
          email: emailVal.value,
          password: pwdVal.value
        }
        store.dispatch('login', user).then((result) => {
          console.log(result)
          if (result.status === 200) {
            window.localStorage.setItem('token', result.data.token)
            router.push('/')
          } else if (result.status === 400) {
            if (result.data.message === '邮箱不存在') {
              emailError.value = '邮箱不存在'
            } else {
              pwdError.value = '密码错误'
            }
          } else {
            console.log(result.status)
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
      pwdRules, emailRules,
      emailRef,
      pwdVal, emailVal,
      pwdError, emailError,
      onSubmitForm, validateEmail
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
