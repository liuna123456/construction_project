<template>
  <div>
    <h2>系统与组件的对应关系</h2>
    <Button to="/page">to_page_分页案例</Button>
    <Button to="/sys_com">刘娜_sys_com</Button>
    <Button to="/layout">to_layout_页面布局</Button>
    <Button to="/">跳转到登录页面</Button>
    <Button to="/yuxuan">to_雨萱姐_的页面</Button>
    <Button to="/test">to_测试_的页面</Button>
    登录的名字:{{name}}******
    登录的密码:{{password}}
    <div style="margin:10px;">可搜索</div>
    <Row>
      <Col span="12" style="padding-right:10px">
      <Select v-model="model11" filterable>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
      <Col span="12">
      <Select v-model="model12" filterable multiple>
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      </Col>
    </Row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model11: '',
      model12: []
    }
  }
}
</script>
