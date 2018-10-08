<template>
  <div class="hello">
    <div class="init_table">
      <Button to="/page">to_page_分页案例</Button>
      <Button to="/yuxuan">to_雨萱姐_的页面</Button>
      <!-- 初始化下拉选择框 -->
      <Select v-model="model_select" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <!-- 初始化表格使用的搜索框 -->
      <!--  <Input v-model="value_search"  @on-enter="search_data" style="width: 400px">
       <Select v-model="select_search" slot="prepend" style="width: 120px">
        <Option value="id">序列号</Option>
        <Option value="server_num">服务组件简称</Option>
        <Option value="server_state">服务状态</Option>
        <Option value="component_type">所属组件平台</Option>
        <Option value="component_num">服务组件名称</Option>
        <Option value="component_num">组件安全节点</Option>
      </Select>
      <Button slot="append" icon="ios-search"></Button>
      /*elslint-disable*/
      </Input> -->
    </div>
    <!-- 初始化表格*****带分页功能 -->
    <Table class="init_table" border :no-filtered-data-text="kong" :data="tableData_init" :columns="tableColumns_init" stripe></Table>
    <div class="init_table" style="margin: 20px auto;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-elevator show-total class="paging" @on-change="init_changepage"></Page>
      </div>
    </div>
    <!-- 查看模态框 -->
    <Modal class="check_modal" v-model="modalCheck" title="查看数据模态框">
      <div>
        <Button type="primary" @click="open_add_modal = true">添加</Button>
        <Modal v-model="open_add_modal" title="添加数据" @on-ok="add_ok" @on-cancel="add_cancel">
          <Input v-model="add_server_path" clearable style="width:350px;">
          <span slot="prepend">服务路径</span>
          </Input>

          <Input v-model="add_view_path" clearable style="width:350px;margin-top:20px;">
          <span slot="prepend">视图路径</span>
          </Input>

        </Modal>
        <Button @click="check_del_checked">删除选中</Button>
      </div>
      <Table @on-select="check_select_one" ref="selection" class="init_table" border :no-filtered-data-text="kong" :columns="columns_table" :data="data_table"></Table>
      <Page :total="check_dataCount" :page-size="check_pageSize" show-elevator show-total class="check_paging" @on-change="check_changepage"></Page>
    </Modal>
    <!-- 修改模态框 -->
    <Modal :styles="{top: '20px',width:'600px'}" v-model="modalFix" title="修改数据模态框" @on-ok="fix_ok" @on-cancel="fix_cancel">
      <table>
        <thead>
          <tr>
            <th style="width:60px">编号</th>
            <th style="width:270px">视图路径</th>
            <th style="width:270px">服务器路径</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {{fix_id}}</td>
            <td>
              <!-- <input type="text" v-model="fix_view_path">  -->
              <Input v-model="fix_view_path" style="width: 260px" />
            </td>
            <td>
              <!-- <input type="text" v-model="fix_server_path"> -->
              <Input v-model="fix_server_path" style="width: 260px" />
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 添加模态框
      open_add_modal: false,
      // 初始化表格的搜索框
      value_search: '',
      select_search: 'id',
      // 详情页中复选框中的id数组
      check_ids: [],
      // 初始化的分页的信息
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 8,

      // 查看模态框中的分页
      check_ajaxHistoryData: [],
      // 初始化信息总条数
      check_dataCount: 0,
      // 每页显示多少条
      check_pageSize: 6,
      // 查看数据模态框中的添加部分
      add_view_path: '',
      add_server_path: '',
      // 查询结果为空时，的提示信息
      kong: '暂无您所查询的结果，请重新查询',
      // 修改模态框中的数据
      fix_id: '',
      fix_view_path: '',
      fix_server_path: '',
      // 初始化表格的数据
      tableData_init: [],
      tableColumns_init: [
        {
          title: '序列号',
          key: 'id',
          sortable: true,
          width: 90
        },
        {
          title: '服务组件简称',
          key: 'server_num',
          render: (h, params) => {
            return h('div', 'A05' + Math.floor(Math.random() * 100))
          },
          filters: [
            {
              label: '大于AL0466',
              value: 1
            },
            {
              label: '小于AL0433',
              value: 2
            },
            {
              label: '大于于AL0433,大于AL0466',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.server_num > 'AL0466'
            } else if (value === 2) {
              return row.server_num < 'AL0433'
            } else {
              return row.server_num
            }
          }

        },
        {
          title: '服务状态',
          key: 'server_state',
          render: (h, params) => {
            const row = params.row
            const color = row.server_state === 1 ? 'blue' : row.server_state === 2 ? 'green' : 'red'
            const text = row.server_state === 1 ? '不可用' : row.server_state === 2 ? '可用' : '不可用'
            return h('Tag', {
              props: {
                type: 'dot',
                color: color
              }
            }, text)
          }
        },
        {
          title: '所属组件平台',
          key: 'component_type',
          // width: 50
          filters: [
            {
              label: 'Greater than P5',
              value: 1
            },
            {
              label: 'Less than P5',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.component_type > 'P5'
            } else if (value === 2) {
              return row.component_type < 'P5'
            }
          }
        },
        {
          title: '服务组件名称',
          key: 'component_num',
          sortable: true
          // render: (h, params) => {
          //   return h('div', '外部客户同意认证' + params.row.time)
          // }
        },
        {
          title: '组件安全节点号',
          key: 'component_num'
          // render: (h, params) => {
          //   return h('div', '1008' + Math.floor(Math.random() * 1000))
          // }
        },
        {
          title: '操作',
          key: 'check_detail',
          width: 70,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modalCheck = true
                    console.log(params.index, params)
                  }
                }
              }, '查看')

            ])
          }
        }
      ],
      // 查看模态框
      modalCheck: false,

      // 修改模态框
      modalFix: false,
      // 下拉选择框的数据
      cityList: [
        {
          value: '系统1',
          label: '系统1'
        },
        {
          value: '系统2',
          label: '系统2'
        },
        {
          value: '系统3',
          label: '系统3'
        },
        {
          value: '系统4',
          label: '系统4'
        }

      ],
      model_select: '',

      // 查询详情的表格数据
      columns_table: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id',
          sortable: true,
          width: 80
        },
        {
          title: '视图路径',
          key: 'view_path'
          // width: 220
        },
        {
          title: '服务器路径',
          key: 'server_path'
          // width: 220
        },
        {
          title: '操作',
          key: 'id',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    // 显示修改模态框
                    this.modalFix = true
                    // 将原有内容传递给修改弹出层的input中
                    this.fix_id = params.row.id
                    this.fix_view_path = params.row.view_path
                    this.fix_server_path = params.row.server_path
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click () {
                    alert('确定要删除id等于' + params.row.id + '的这一条信息吗？')
                    axios.delete('http://localhost:3000/init/' + params.row.id)
                      .then(res => {
                        console.log(res)
                        if (res.status === 200) {
                          console.log('后台数据库删除成功***页面中被删除的数据还没有被移除，是个bug')
                          // 初始化表格函数，重新渲染页面数据*****出现问题
                          // let delIndex = this.data_table.findIndex(item => item.id === params.row.id)
                          // if (delIndex >= 0) {
                          //   this.data_table.splice(delIndex, 1)
                          // }
                        }
                      })
                    // alert(123)
                    // console.log(this.data_table)//不能读取
                    // this.data_table.splice(params.row.id, 1)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data_table: []
    }
  },
  created () {
    this.initData()
    this.initManage()
  },
  methods: {
    // 查看数据中的添加***操作
    add_ok () {
      // 当添加框中的内容为空时，阻止发送请求
      if (this.add_view_path === '' || this.add_server_path === '') {
        this.$Message.info('请填写数据****')
        return false
      }
      let newData = {view_path: this.add_view_path, server_path: this.add_server_path}
      axios.post('http://localhost:3000/init', newData).then((res) => {
        console.log(res)
        // 清空输入框中的内容
        this.add_view_path = this.add_server_path = ''
        // 重新更新页面数据
        this.initData()
        // 修改成功的提示信息
        this.$Message.info('数据添加成功')
      })
    },
    add_cancel () {
      this.$Message.info('取消添加数据')
    },
    // 初始化页面的搜索框***无效
    search_data () {
      // alert(123)
      console.log(this.value_search, this.select_search)
      // 发送请求，返回对应数据到表格中
      // axios.get('http://localhost:3000/manage?' + name + '=' + this.value_search)
      // axios.get('http://localhost:3000/manage?id=5')
      // axios.get('http://localhost:3000/manage?component_type=P4')
      axios.get('http://localhost:3000/manage?' + this.select_search + '=' + this.value_search)
        .then(res => {
          // console.log(res.data)
          this.tableData_init = res.data
        })
    },
    // 详情中的表格数据
    async initData () {
      const {data} = await axios.get('http://localhost:3000/init')
      // console.log(data)
      this.data_table = data
      // 分页中***保存取到的所有数据
      this.check_ajaxHistoryData = this.data_table
      this.check_dataCount = this.data_table.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data_table.length < this.check_pageSize) {
        this.data_table = this.check_ajaxHistoryData
      } else {
        this.data_table = this.check_ajaxHistoryData.slice(0, this.check_pageSize)
      }
    },
    // 详情页中的全选与全部选
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    check_select_one (selection, row) {
      // console.log('点击选复选框时触发', selection, row, row.id)
      this.check_ids.push(row.id)
      console.log(this.check_ids)
    },
    // 删除选中
    check_del_checked () {
      this.$Message.info('请添加您要删除的id')
    },
    // 修改模态框中的确定与取消事件
    fix_ok () {
      // 新修改的数据发给后台
      let todata = {id: this.fix_id, view_path: this.fix_view_path, server_path: this.fix_server_path}
      axios.put('http://localhost:3000/init/' + this.fix_id, todata).then((res) => { console.log(res) })
      // 发送给后台，重新显示到页面中id不变
      this.data_table.findIndex(item => {
        if (item.id === this.fix_id) {
          item.view_path = this.fix_view_path
          item.server_path = this.fix_server_path
        }
      })
      // 修改成功的提示信息
      this.$Message.info('fix_Clicked ok****修改成功')
    },
    fix_cancel () {
      this.$Message.info('fix_Clicked cancel****取消删除')
    },
    async initManage () {
      const {data} = await axios.get('http://localhost:3000/manage')
      console.log(data)
      this.tableData_init = data
      // 分页中***保存取到的所有数据
      this.ajaxHistoryData = this.tableData_init
      this.dataCount = this.tableData_init.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.tableData_init.length < this.pageSize) {
        this.tableData_init = this.ajaxHistoryData
      } else {
        this.tableData_init = this.ajaxHistoryData.slice(0, this.pageSize)
      }
    },
    init_changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.tableData_init = this.ajaxHistoryData.slice(_start, _end)
    },
    check_changepage (index) {
      let _start = (index - 1) * this.check_pageSize
      let _end = index * this.check_pageSize
      this.data_table = this.check_ajaxHistoryData.slice(_start, _end)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
 .paging{
      float:right;
      margin-top:10px;
  }
.init_table {
  width: 900px;
  margin: 10px auto;
}
  /* 查看模态框的 */
.check_modal{
  width: 1000px;
}
.check_modal .ivu-modal{
    width: 940px !important;
  }
  .check_modal .ivu-modal-footer{
   display: none;
  }
</style>
