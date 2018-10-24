<template>
  <div>
    <Button to="/sys_com">刘娜_sys_com</Button>
    <Button to="/layout">to_layout_页面布局</Button>
    <Button to="/">跳转到登录页面</Button>
    <Button to="/yuxuan">to_雨萱姐_的页面</Button>
    <h2>支持多文件上传测试3</h2>
    <Upload multiple :before-upload="handleUpload" action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
    </Upload>
    <div v-if="file !== null">Upload file: {{ file.name }} <Button @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>

    <h2>拖拽上传 </h2>
    <Upload :data='{hh:"我是长传文件是的参数"}' :on-format-error="handleFormatError_drag" :on-success="handleSuccess_drag" with-credentials :headers="{'X-Token-CSRF': 'codexxx'}" class="drag_upload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>

  </div>
</template>
<script>
export default {
  data () {
    return {
      file: null,
      loadingStatus: false
    }
  },
  methods: {
    handleUpload (file) {
      console.log(file)
      this.file = file
      return false
    },
    upload () {
      this.loadingStatus = true
      setTimeout(() => {
        this.file = null
        this.loadingStatus = false
        this.$Message.success('Success')
      }, 1500)
    },

    // 拖拽的上传文件
    handleSuccess_drag (res, file) {
      console.log('handleSuccess_drag', res, file)
    },
    handleFormatError_drag (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select access里面的.'
      })
    }

  },
  mounted () {}
}
</script>

<style>
.drag_upload{
  width: 800px;
  margin: 20px auto;
}
</style>
