<style scoped>
.layout{
  height: 100vh;
  /* height: 100%; */
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
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover{
  color: #2d8cf0;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="horizontal_active_name">
          <div class="layout-logo">
            <Button to="/yuxuan">to_雨萱姐_的页面</Button>
          </div>
          <div class="layout-nav">
            <MenuItem name="item.title" v-for="(item,index) in menuList" :key='index' @click="horizontal_menu_handle">
            <Icon :type="item.icon"></Icon>
            {{item.title}}
            </MenuItem>
            <!-- <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
            </MenuItem>
            <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
            </MenuItem> -->
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '480px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu style="height:100%;" active-name="1-2" theme="light" width="auto" :open-names="['1']">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                  </template>
                  <MenuItem name="1-1">Option 1</MenuItem>
                  <MenuItem name="1-2">Option 2</MenuItem>
                  <MenuItem name="1-3">Option 3</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    Item 3
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '480px', background: '#fff'}">
              Content
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      horizontal_active_name: 'title_1',
      menuList: [
        {title: 'title_1',
          icon: 'ios-navigate',
          title_active: false,
          chile_title: [
            {sub_title: 'sub_title_1_1', sub_title_active: false},
            {sub_title: 'sub_title_1_2', sub_title_active: false},
            {sub_title: 'sub_title_1_3', sub_title_active: false}
          ]
        },
        {title: 'title_2',
          icon: 'ios-keypad',
          title_active: false,
          chile_title: [
            {sub_title: 'sub_title_2_1', sub_title_active: false},
            {sub_title: 'sub_title_2_2', sub_title_active: false},
            {sub_title: 'sub_title_2_3', sub_title_active: false}
          ]
        },
        {title: 'title_3',
          icon: 'ios-analytics',
          title_active: false,
          chile_title: [
            {sub_title: 'sub_title_3_1', sub_title_active: false},
            {sub_title: 'sub_title_3_2', sub_title_active: false},
            {sub_title: 'sub_title_3_3', sub_title_active: false}
          ]
        }
      ]
    }
  },
  watch: {

  },
  methods: {
    horizontal_menu_handle () {
      alert(123)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
