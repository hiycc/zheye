<template>
  <div class="mb-3">
    <!-- <label for="inputImg" class="btn btn-primary p-0">
    </label> -->
    </div>
    <div class="previewImg mb-3 img-thumbnail" id="previewImg" @click="handleClick">
      <div v-if="!previewImage" class="img_alt d-inline-flex flex-column align-content-end flex-wrap">
        <div>添加专栏图片</div>
        <div class="bi bi-plus-circle-dotted"></div>
      </div>
      <img v-if="previewImage" class="preview img-fluid" :src="previewImage" alt=""/>
    </div>
    <!-- <div class="input-group">
      <input class="form-control" type="file" accept="image/*" ref="fileRef" @change="selectImage($event)">
      <button class="btn btn-outline-secondary" type="button">上传</button>
    </div> -->
    <!-- <div class="row">
      <div class="col-8">
      </div>
      <div class="col-4">
        <button
          class="btn btn-success btn-sm float-right"
          :disabled="!currentImage"
          @click="uploadImage"
        >上传</button>
      </div>
    </div> -->
    <div v-if="currentImage" class="progress">
      <div
        class="progress-bar progress-bar-info"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%'}"
      >{{ progress }}%</div>
    </div>
  <div v-if="message" class="alert alert-secondary" role="alert">{{ message }}</div>
</template>
<script lang="ts">
import uploadFileService from '@/hooks/uploadFileService'
import { emit } from 'process'
import { defineComponent, reactive, ref, onMounted } from 'vue'
interface imageInfo {
  url: string,
  name: string
}
export default defineComponent({
  name: 'UploadImage',
  emits: ['getURL'],
  data () {
    return {
      selectedFiles: undefined,
      progressInfos: [],
      message: '',
      fileInfos: []
    }
  },
  methods: {
  },
  setup (props, context) {
    // const selectedFiles =
    let currentImage: Buffer | undefined
    const previewImage = ref('')
    const progress = ref(0)
    const message = ref('')
    let imageInfos = reactive<imageInfo[]>([])
    // const fileRef = ref()
    const handleClick = async () => {
      const result: any = await window.showOpenFilePicker({
        types: [{
          description: 'Images',
          accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp']
          }
        }],
        multiple: false
      })
      // progress.value = 0
      // message.value = ''
      console.log(result[0])
      const fileData = await result[0].getFile()
      const arrayBuffer = await fileData.arrayBuffer()
      previewImage.value = URL.createObjectURL(new Blob([arrayBuffer]))

      // currentImage = Buffer.from(arrayBuffer)
      progress.value = 0
      uploadFileService.upload(fileData, (event) => {
        //  计算图片上传进度
        progress.value = Math.round((100 * event.loaded) / event.total)
      })
        .then((response) => {
          console.log(response.data)
          message.value = response.data.message
          context.emit('getURL', response.data.data.url)
        })
        .catch((err) => {
          progress.value = 0
          message.value = 'Counld not upload the image! ' + err
          currentImage = undefined
        })
    }

    const uploadImage = () => {
      progress.value = 0
      uploadFileService.upload(currentImage, (event) => {
        //  计算图片上传进度
        progress.value = Math.round((100 * event.loaded) / event.total)
      })
        .then((response) => {
          message.value = response.data.message
          return uploadFileService.getFiles()
        })
        .then((images) => {
          // imageInfos 是一个{name, url} 的数组
          imageInfos = images.data
        })
        .catch((err) => {
          progress.value = 0
          message.value = 'Counld not upload the image! ' + err
          currentImage = undefined
        })
    }
    return {
      uploadImage,
      imageInfos,
      progress,
      previewImage,
      currentImage,
      handleClick
      // fileRef
    }
  }
})
</script>
<style>
  .previewImg{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    background-color: #ccc;
    border: #f3f3f3 1px;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 20px;
  }
</style>
