<template>
  <Form ref="formInline" class="form_login" :model="formInline" :rules="ruleInline" inline>
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
      <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
          this.$router.push({ path: 'helloWorld', query: { Id: 123, user: this.formInline.user, password: this.formInline.password } })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style>
 /* this.$router.push({ path: 'helloWorld', params: { Id: 123 } }) */
.form_login{
  width: 800px;
  margin: 20px auto;
  text-align: center;
  padding: 50px;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 1px 1px 20px #eee;
}
</style>
