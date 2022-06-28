<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">文章标题：</label>
      <validate-input type="text" :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" />
      <div id="emailHelp" v-if="titleRef.error" class="form-text">{{titleRef.message}}</div>
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
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { PostProps } from '../store/module/Posts'
import { titleRules, contentRules } from '../hooks/InputRules'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const columnId = parseInt(route.params.columnId[0])
    const router = useRouter()
    const titleVal = ref('')
    const contentVal = ref('')
    const titleRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onSubmitForm = (result: boolean) => {
      if (result) {
        if (columnId) {
          const newPost:PostProps = {
            postId: undefined,
            userId: store.state.user.id,
            title: titleVal.value,
            content: contentVal.value,
            createdAt: undefined,
            columnId
          }
          store.dispatch('createPost', newPost).then((result) => {
            console.log(result)
          })
          console.log('create post successfully!')
          router.push({ name: 'detail', params: { id: columnId } })
        }
      }
    }
    const validateEmail = () => {
      if (titleRef.val.trim() === '') {
        titleRef.error = true
        titleRef.message = 'should not be empty'
      }
    }
    return {
      titleRef,
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
