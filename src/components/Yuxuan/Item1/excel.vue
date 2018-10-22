<template>
  <div>
    <h2>excel表格导入</h2>
    <div>
      <Button @click="handleDownload">下载excel表格</Button>
    </div>
    <!-- 表格部分 -->
    <div class="excel_table">
      <Table border :columns="columns_excel" :data="data_excel" size="small" ref="table_excel"></Table>
      <!-- <Page :total="dataCount" :page-size="pageSize" show-elevator show-total class="paging" @on-change="init_changepage"></Page> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'excel',
  data () {
    return {

      columns_excel: [
        {
          title: '序号',
          key: 'serNum'
        },
        {
          title: '选择',
          key: 'choose',
          align: 'center',
          render: (h, params) => {
            if (params.row.status !== '1' && params.row.status !== '2') {
              return h('div', [
                h('checkbox', {
                  props: {
                    type: 'selection'
                  },
                  on: {
                    'input': (val) => {
                      console.log(val)
                    }
                  }
                })
              ])
            } else {
              return h('span', {
                style: {
                  color: '#587dde',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    // this.$router.push({name: '', query: { id: params.row.id }})
                  }
                }
              }, '查看订单')
            }
          }
        }
      ],
      data_excel: []// 数据内容
    }
  },
  methods: {
    // 导出表格函数
    handleDownload () {
      this.downloadLoading = true
      // require.ensure([], () => {
      //   const {export_json_to_excel} = require('src/vendor/Export2Excel')
      //   const tHeader = this.util_cutValue(this.columns1, 'title')
      //   const filterVal = this.util_cutValue(this.columns1, 'key')
      //   const list = this.tableData1
      //   const data = this.formatJson(filterVal, list)
      //   export_json_to_excel(tHeader, data, '列表excel')
      //   this.downloadLoading = false
      // })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 截取value值
    utils_cutValue (target, name) {
      let arr = []
      for (let i = 0; i < target.length; i++) {
        arr.push(target[i][name])
      }
      return arr
    }

  },
  created () {

  },
  mounted () {

  }
}
</script>

<style>
.excel_table{
  margin: 20px auto;
  width: 900px;
  padding: 10px;
  border:1px solid #ccc;
  border-radius: 10px;
}
</style>
