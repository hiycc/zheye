<template>
  <div class="create-post-page">
    <div class="mb-3"><span class="fs-2 bi bi-house me-2"></span><span class="fs-4">新建专栏</span></div>
    <validate-form @form-submit="onSubmitForm">
    <div id="columnImg"></div>
    <upload-image v-on:getURL="updateURL"/>
    <div class="mb-3">
      <validate-input type="text" :rules="titleRules" v-model="titleVal" :labelValue="'专栏标题'" :Error="titleRef.message"/>
      <!-- <div id="titleHelp" v-if="titleRef.error" class="form-text">{{titleRef.message}}</div> -->
    </div>
    <div class="mb-3">
      <validate-input rows="10" tag="textarea" type="text" v-model="descriptionVal" :labelValue="'专栏描述（可选）'" />
    </div>
    <template v-slot:submit="slotProps">
      <span @click="slotProps.handleClickSubmit" class="btn btn-danger">新建</span>
    </template>
  </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput from '../components/ValidateInput.vue'
import { titleRules } from '../hooks/InputRules'
import ValidateForm from '../components/ValidateForm.vue'
import { ColumnProps } from '../store/module/Columns'
import UploadImage from '../components/UploadImage.vue'

export default defineComponent({
  name: 'CreateColumn',
  components: {
    ValidateInput,
    ValidateForm,
    UploadImage
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const titleVal = ref('')
    const avatarVal = ref('')
    const descriptionVal = ref('')
    const titleRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const updateURL = (url: string) => {
      avatarVal.value = url
    }
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const { id } = store.state.user
        if (id) {
          const newColumn: ColumnProps = {
            userId: id,
            title: titleVal.value,
            description: descriptionVal.value,
            avatar: avatarVal.value
          }
          //  提交创建Column
          store.dispatch('createColumn', newColumn).then((result) => {
            if (result.status === 201) {
              console.log(result)
              const columnId = result.data.data.columnId
              console.log('columnId: ' + columnId)
              //  传入coulumnId参数跳转到Column详细页
              router.push({ name: 'detail', params: { columnId } })
            }
          })
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
      titleVal,
      descriptionVal,
      onSubmitForm,
      updateURL
    }
  }
})
</script>
