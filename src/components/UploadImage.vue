<template>
  <div>
    <div class="row">
      <div class="col-8">
        <label class="btn btn-default p-0">
          <input type="file" accept="image/*" ref="fileRef" @change="selectImage($event)">
        </label>
        <div>1:{{previewImage}}</div>
      </div>
      <div class="col-4">
        <button
          class="btn btn-success btn-sm float-right"
          :disabled="!currentImage"
          @click="uploadImage"
        >上传</button>
      </div>
    </div>
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
  </div>
  <div v-if="previewImage">
    <div>
      <img class="preview my-3" :src="previewImage" alt=""/>
    </div>
  </div>
  <div v-if="message" class="alert alert-secondary" role="alert">{{ message }}</div>
  <div class="card mt-3">
    <div class="card-header">图片列表</div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(image, index) in imageInfos"
        :key="index"
      >
        <a :href="image.url">{{ image.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import uploadFileService from '@/hooks/uploadFileService'
import { defineComponent, reactive, ref, onMounted } from 'vue'

interface imageInfo {
  url: string,
  name: string
}
export default defineComponent({
  name: 'UploadImage',
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
  setup (props) {
    // const selectedFiles =
    let currentImage: File | undefined
    const previewImage = ref('')
    const progress = ref(0)
    const message = ref('')
    let imageInfos = reactive<imageInfo[]>([])
    // const fileRef = ref()
    const selectImage = (e:any) => {
      currentImage = e.target.files.item(0)
      previewImage.value = URL.createObjectURL(currentImage!)
      // console.log(previewImage)
      progress.value = 0
      message.value = ''
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
    onMounted(() => {
      uploadFileService.getFiles().then(response => {
        imageInfos = response.data
      })
    })
    return {
      selectImage,
      uploadImage,
      imageInfos,
      progress,
      previewImage,
      currentImage
      // fileRef
    }
  }
})
</script>
