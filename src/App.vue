<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
    <form action="">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <input type="email" class="form-control" v-model="emailRef.val" @blur="validateEmail" id="exampleInputEmail1">
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
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'Lewis'
}

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
    GlobalHeader
  },
  setup () {
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
      validateEmail
    }
  }
})
</script>

<style>

</style>
