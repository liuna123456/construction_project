<template>
  <div class="example-multiple">
    <Button to="/">跳转到登录页面</Button>
    <Button to="/yuxuan">to_雨萱姐_的页面</Button>
    <Button to="/export_excel">导入xls文件_的页面</Button>
    <h2>文件上传测试版</h2>
    <ul>
      <li v-for="file in files" :key='file'>{{file.name}} - Error: {{file.error}}, Success: {{file.success}}</li>
    </ul>
    <!-- <file-upload ref="upload" v-model="files" post-action="http://localhost:3000/law" put-action="/put.method" @input-file="inputFile" @input-filter="inputFilter"> -->
    <file-upload :multiple="true" @input="updatetValue" :data="{access_token: 'access_token'}" :headers="{'X-Token-CSRF': 'code'}" ref="upload" v-model="files" post-action="http://localhost:3000/law" @input-file="inputFile" @input-filter="inputFilter">
      <Button>上传文件test</Button>
    </file-upload>
    <Button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">开始上传test</Button>
    <Button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = true">停止上传</Button>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
export default {
  components: {
    FileUpload
  },

  data () {
    return {
      files: []
    }
  },
  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    inputFile: function (newFile, oldFile) {
      // 获取文件信息
      console.log('newFile11==inputFile', newFile, 'oldFile22==inputFile', oldFile)
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    inputFilter: function (newFile, oldFile, prevent) {
      // 获取文件信息
      console.log('newFile11==inputFilter', newFile, 'oldFile22==inputFilter', oldFile, 'prevent33==inputFilter', prevent)
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    updatetValue () {
      console.log('我是文件标签里面的点击事件')
    }
  }
}
</script>
