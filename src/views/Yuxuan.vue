<template>

  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <div style="color:#fff">{{login_name}}</div>
          </div>
          <div class="layout-nav">

            <menu-item :name="item.name" :to="item.href" v-for="(item,index) in itemList" :key="index">
              <Icon :type="item.icon"></Icon>
              {{item.title}}
            </menu-item>
            <!-- <menu-item name="2" to="/yuxuan/item2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </menu-item>
            <menu-item name="3" to="/yuxuan/item3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </menu-item>
            <menu-item name="4" to="/yuxuan/item4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </menu-item> -->
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
          <BreadcrumbItem to="/helloWorld">返回表格crud页面</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '480px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu :active-name="kk" theme="light" width="auto" :open-names="['1']">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                  </template>
                  <menu-item name="11" to="/yuxuan/item1/option1">Option 1</menu-item>
                  <menu-item name="12" to="/yuxuan/item1/option2">Option 2</menu-item>
                  <menu-item name="13" to="/yuxuan/item1/option3">Option 3</menu-item>
                   <menu-item name="14" to="/yuxuan/item1/option4">Option 4</menu-item>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                  </template>
                  <menu-item name="2-1">Option 1</menu-item>
                  <menu-item name="2-2">Option 2</menu-item>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                  </template>
                  <menu-item name="3-1">Option 1</menu-item>
                  <menu-item name="3-2">Option 2</menu-item>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '400px', background: '#fff'}">
              <router-view :parentToChildLoginName='login_name'></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>

</template>

<script>
export default {
  name: 'Yuxuan',
  data () {
    return {
      kk: '12',
      login_name: '登录名字',
      itemList: [
        {name: '1', href: '/yuxuan/item1', icon: 'ios-navigate', title: 'Item 1'},
        {name: '2', href: '/yuxuan/item2', icon: 'ios-keypad', title: 'Item 2'},
        {name: '3', href: '/yuxuan/item3', icon: 'ios-analytics', title: 'Item 3'},
        {name: '4', href: '/yuxuan/item4', icon: 'ios-paper', title: 'Item 4'}
      ],
      menuitemList: [
        {name: '11', href: '/yuxuan/item1/option1', icon: 'ios-navigate', title: 'Item 1'},
        {name: '12', href: '/yuxuan/item2/option2', icon: 'ios-keypad', title: 'Item 2'},
        {name: '13', href: '/yuxuan/item3/option3', icon: 'ios-analytics', title: 'Item 3'}
        // {name: '14', href: '/yuxuan/item4/option4', icon: 'ios-paper', title: 'Item 4'}
      ],
      mentlist: [
        {

        }
      ]
    }
  },
  created () {
    // 获取localstorage中的名字和密码
    let getLogin = JSON.parse(localStorage.getItem('login'))
    this.login_name = getLogin.name
    // this.password = getLogin.password
  },
  mounted () {
    let aa = this.$route.path
    // console.log('dsafg', this.$route.path)
    console.log(aa)
  }
  // watch: {
  //   '$route': () => {
  //     console.log('dsafg', this.$route.path)
  //   }
  // }
}
</script>

<style scoped>
 /* 去掉默认样式 */

.ivu-menu {
  height: 100%;
}
.ivu-table-overflowX{
    overflow-x: hidden ;
  }
  .ivu-layout.ivu-layout-has-sider>.ivu-layout-content{
    overflow-x: none;
  }
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #5b6270;
    border-radius: 3px;
    float: left;
     position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
