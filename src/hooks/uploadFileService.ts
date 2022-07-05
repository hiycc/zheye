import axios, { AxiosError } from 'axios'

class UploadFilesService {
  upload (file: any, onUploadProgress: (event: any)=>void) {
    //  FormData 是一种可将数据编译成键值对的数据结构
    const formData = new FormData()
    formData.append('file', file)
    return axios.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      //  axios进度条事件，用来监测上传进度
      onUploadProgress
    })
  }

  getFiles () {
    return axios.get('/files')
  }
}
export default new UploadFilesService()
