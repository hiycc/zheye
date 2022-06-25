<template>
  <div class="create-post-page">
    <h4>新建专栏</h4>
    <validate-form @form-submit="onSubmitForm">
    <div class="mb-3">
      <label class="form-label">专栏标题：</label>
      <validate-input type="text" :rules="titleRules" v-model="titleVal" placeholder="请输入专栏标题" />
      <div id="titleHelp" v-if="titleRef.error" class="form-text">{{titleRef.message}}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">专栏描述：</label>
      <validate-input rows="10" tag="textarea" type="text" v-model="descriptionVal" placeholder="请输入专栏描述（可选）" />
    </div>
    <!-- <upload-image /> -->
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
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { ColumnProps } from '../store/module/Columns'
// import UploadImage from '../components/UploadImage.vue'
const titleRules: RulesProp = [
  { type: 'required', message: '专栏标题不能为空' }
]

export default defineComponent({
  name: 'CreateColumn',
  components: {
    ValidateInput,
    ValidateForm
    // UploadImage
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const titleVal = ref('')
    const descriptionVal = ref('')
    const titleRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onSubmitForm = (result: boolean) => {
      if (result) {
        const { id } = store.state.user
        if (id) {
          const newColumn: ColumnProps = {
            userId: id,
            title: titleVal.value,
            description: descriptionVal.value
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
      onSubmitForm
    }
  }
})
</script>
