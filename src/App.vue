<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
    <form action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" v-model="emailVal"/>
        {{emailVal}}
        <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
     <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'Lewis'
}
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮件不能为空' },
  { type: 'email', message: '请输入正确的邮件格式' }
]

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/xiumao.jpg'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/xiumao.jpg'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/xiumao.jpg'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://luxiwong-photo.oss-cn-guangzhou.aliyuncs.com/xiumao.jpg'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailVal = ref('luxi')
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
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal
    }
  }
})
</script>

<style>

</style>
