<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-5"><span class="fs-1 bi bi-door-open me-2"></span><span class="fs-4">注册</span></div>
    <div class="mb-3 row">
      <!-- <span class="fs-2 bi bi-person me-2 col-auto"></span> -->
      <validate-input class="col px-0" type="text" :rules="userRules" v-model="userVal" :labelValue="'用户名'"/>
    </div>
    <div class="mb-3 row">
      <!-- <span class="fs-2 bi bi-envelope me-2 col-auto"></span> -->
      <validate-input
        class="col px-0"
        ref="email"
        type="text"
        :rules="emailRules"
        v-model="emailVal"
        :Error="emailError"
        :labelValue="'邮箱地址'"/>
    </div>
    <div class="mb-3 row">
      <!-- <span class="fs-2 bi bi-lock me-2 col-auto"></span> -->
      <validate-input
        class="col px-0"
        type="password"
        :rules="pwdRules"
        v-model="pwd1Val"
        :labelValue="'密码'"/>
    </div>
    <template v-slot:submit="slotProps">
      <div class="mb-3 row">
        <!-- <span class="fs-2 bi bi-shield-lock me-2 col-auto"></span> -->
        <validate-input
          class="col px-0"
          v-on:keyup.enter="slotProps.handleClickSubmit"
          type="password" :rules="validPwdRules"
          :validValue="pwd1Val"
          v-model="pwd2Val"
          :labelValue="'确认密码'"/>
      </div>
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">注册</span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '../components/ValidateInput.vue'
import { emailRules, pwdRules, userRules, validPwdRules } from '../hooks/InputRules'
import ValidateForm from '../components/ValidateForm.vue'

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
      emailRules, userRules, validPwdRules, pwdRules,
      emailVal, userVal, pwd1Val, pwd2Val,
      emailError,
      onSubmitForm
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
