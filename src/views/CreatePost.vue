<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">文章标题：</label>
      <validate-input type="text" :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" />
      <div id="emailHelp" v-if="emailRef.error" class="form-text">{{emailRef.message}}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">文章详细：</label>
      <validate-input rows="10" tag="textarea" type="text" v-model="contentVal" :rules="contentRules" placeholder="请输入文章详细" />
    </div>
    <template v-slot:submit="slotProps">
      <span @click="slotProps.handleClickSubmit" class="btn btn-danger">发布</span>
    </template>
  </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { GlobalDataProps, PostProps } from '../store'

const titleRules: RulesProp = [
  { type: 'required', message: '文章标题不能为空' }
]

const contentRules: RulesProp = [
  { type: 'required', message: '文章不能为空' }
]

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const titleVal = ref('')
    const contentVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost:PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            createAt: new Date().toLocaleString(),
            columnId
          }
          store.commit('createPost', newPost)
          console.log('create post successfully!')
          router.push({ name: 'detail', params: { id: columnId } })
        }
      }
    }
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'should not be empty'
      }
    }
    return {
      emailRef,
      validateEmail,
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onSubmitForm
    }
  }
})
</script>
