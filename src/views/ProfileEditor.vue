<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <span class="fs-2 bi bi-gear me-2"></span>
      <span class="fs-4">个人资料修改</span>
    </div>
    <div class="mb-3">
      <!-- <label class="form-label">用户名</label> -->
      <validate-input type="text" :rules="userRules" v-model="usernameVal" :labelValue="'用户名'"/>
      <!-- <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div> -->
    </div>
    <div class="mb-3">
      <!-- <label class="form-label">邮箱地址</label> -->
      <validate-input type="text" :rules="emailRules" v-model="emailVal" :labelValue="'邮箱地址'"/>
      <!-- <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div> -->
    </div>
    <template v-slot:submit="slotProps" >
       <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input v-on:keyup.enter="slotProps.handleClickSubmit" type="password" :rules="pwdRules" v-model="prePWDVal" :Error="pwdError"/>
      </div>
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">登陆</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { emailRules, userRules, pwdRules } from '../hooks/InputRules'

export default defineComponent({
  name: 'ProfileEditor',
  setup(props) {
    const emailVal = ref('')
    const usernameVal = ref('')
    const prePWDVal = ref('')
    const PWDVal = ref('')
    return {
      emailRules, userRules, pwdRules,
      emailVal, usernameVal, prePWDVal, PWDVal
    }
  }
})
</script>
