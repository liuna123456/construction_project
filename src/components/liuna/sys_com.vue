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
    <div style="margin:10px;"></div>
    <Table class="sys_com_table" :columns="sys_com_columns" :data="sys_com_data"></Table>
  </div>
</template>

<script>
import expandRow from './table_expand.vue'
// import axios from 'axios'
export default {
  components: { expandRow },
  data () {
    return {
      sys_com_columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '系统名字',
          key: 'name'
        },
        {
          title: '组件名称',
          key: 'age',
          render: (h, params) => {
            return h('Dropdown', {
              style: {
                marginLeft: '5px'
              },
              on: {
                'on-click': (value) => {
                  console.log(value)
                }
              }
            }, [
              h('div', {
                class: {
                  member_operate_div: true
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  }
                }, [
                  h('span', '更多'),
                  h('Icon', {
                    props: {
                      type: 'arrow-down-b'
                    },
                    style: {
                      marginLeft: '5px'
                    }
                  })
                ])
              ]),
              h('DropdownMenu', {
                slot: 'list'
              }, [
                h('DropdownItem', {
                  props: {
                    name: 'edit'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      display: 'inline-block',
                      width: '76px'
                    },
                    on: {
                      click: () => {
                        this.openEditUserDialog(params.row, params.index)
                      }
                    }
                  }, '编辑')
                ])
              ])
            ])
          }
        },
        {
          title: '备用列',
          key: 'address',
          render: (h, params) => {
            return h('Select', [
              h('Option', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  // marginRight: '5px',
                  width: '200px'
                },
                on: {
                  click: () => {
                    alert(1256)
                  }
                }
              }, '下拉内容1')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
          render: (h, params) => {
            // return h('div', {
            //   props: {
            //     row: params.row
            //   }
            // })
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.show(params.index)
                    this.$Notice.success({
                      title: '我是来说明页面操作的',
                      desc: 'The desc will hide when you set render.',
                      top: 80,
                      duration: 2,
                      render: h => {
                        return h('span', [
                          'This is created by ',
                          h('a', 'render'),
                          ' function'
                        ])
                      }
                    })
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Message.warning({
                      content: '我是提示的内容'
                      // onClose: () => { alert(123) },
                      // closable: true,
                      // render: h => {
                      //   return h('span', [
                      //     'This i的释放你的愤怒的公牛s created by ',
                      //     h('a', 'render'),
                      //     ' function'
                      //   ])
                      // }
                    })
                    // this.remove(params.index)
                  }
                }
              }, '测试')

            ])
          }
        }
      ],
      sys_com_data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          job: 'Data engineer',
          interest: 'badminton',
          birthday: '1991-05-14',
          book: 'Steve Jobs',
          movie: 'The Prestige',
          music: 'I Cry'
        },
        {
          name: 'Jim Green',
          age: 25,
          address: 'London No. 1 Lake Park',
          job: 'Data Scientist',
          interest: 'volleyball',
          birthday: '1989-03-18',
          book: 'My Struggle',
          movie: 'Roman Holiday',
          music: 'My Heart Will Go On'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          job: 'Data Product Manager',
          interest: 'tennis',
          birthday: '1992-01-31',
          book: 'Win',
          movie: 'Jobs',
          music: 'Don’t Cry'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          job: 'Data Analyst',
          interest: 'snooker',
          birthday: '1988-7-25',
          book: 'A Dream in Red Mansions',
          movie: 'A Chinese Ghost Story',
          music: 'actor'
        }
      ]
    }
  }
}
</script>

<style>
.sys_com_table{
  width: 900px;
  margin: 10px auto;
}
</style>
