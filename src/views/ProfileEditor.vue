<template>
  <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <span class="fs-2 bi bi-gear me-2"></span>
      <span class="fs-4">个人资料修改</span>
    </div>
    <div class="mb-3">
      <validate-input type="text" :rules="userRules" v-model="usernameVal" :labelValue="'用户名'" />
    </div>
    <div class="mb-3">
      <validate-input type="text" :rules="emailRules" v-model="emailVal" :labelValue="'邮箱地址'"/>
    </div>
    <div class="mb-3">
      <validate-input type="password" :rules="pwdRules" v-model="prePWDVal" :labelValue="'密码'"/>
    </div>
    <template v-slot:submit="slotProps" >
      <div class="mb-3">
        <validate-input
        v-on:keyup.enter="slotProps.handleClickSubmit"
        type="password"
        :rules="pwdRules"
        v-model="PWDVal"
        :Error="pwdError"
        :labelValue="'新密码'"/>
      </div>
      <span class="btn btn-danger" @click="slotProps.handleClickSubmit">登陆</span>
    </template>
  </validate-form>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { emailRules, userRules, pwdRules } from '../hooks/InputRules'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
export default defineComponent({
  name: 'ProfileEditor',
  components: {
    ValidateForm, ValidateInput
  },
  setup () {
    const store = useStore()
    const userId = store.state.user.id
    const emailVal = ref('')
    const usernameVal = ref('')
    const prePWDVal = ref('')
    const PWDVal = ref('')
    const pwdError = ref('')
    const onSubmitForm = () => {
      //  提交修改的逻辑
    }
    onMounted(() => {
      // 初始化数据
      store.dispatch('getUser', userId).then((result) => {
        emailVal.value = result.email
        usernameVal.value = result.username
      })
    })
    return {
      emailRules, userRules, pwdRules,
      emailVal, usernameVal, prePWDVal, PWDVal, pwdError,
      onSubmitForm
    }
  }
})
</script>
