<template>
  <div>
    <div>option1</div>
    <blockquote>
      <Button type="info" size="large" @click="back">返回上一步</Button>
      <Button type="success" size="large" class="bth" @click="determine">确定</Button>
    </blockquote>
    <div style="overflow: hidden">
      <Table border :columns="columns" :data="data" @on-select="selectItem" @on-select-cancel="cancelItem" @on-select-all="selectItemAll" @on-selection-change="selectChange"></Table>
      <div style="float: right;margin:1% 0">
        <Page :total="11" show-total @on-change="changePage"></Page>
      </div>
    </div>
    <del-checked></del-checked>
  </div>
</template>

<script>
import delChecked from '@/components/test/del_checked'
export default{
  data () {
    return {
      selectDataStore: [], // 建一个数据仓库
      currentPage: 1,
      columns: [
        {
          title: 'Name',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
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
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    back () {
      console.log(456)
    },
    changePage (val) { // 翻页事件，返回改变后的页码
      this.currentPage = val
    },
    selectItem (selection, row) {
      this.selectDataStore.push(row)
    },
    cancelItem (selection, row) {
      this.selectDataStore.forEach((item, index) => {
        if (item.regNo === row.regNo) { // 这里我数据中regNo是唯一的，所以拿来做判断条件
          this.selectDataStore.splice(index, 1)
        }
      })
    },
    selectItemAll (selection) {
      this.selectDataStore = this.selectDataStore.concat(selection)
    },
    selectChange (selection) {
      if (!selection.length) {
        let arr1 = this.selectDataStore
        let arr2 = this.data
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            if (arr1[i].regNo === arr2[j].regNo) {
              this.selectDataStore.splice(i, 1)
            }
          }
        }
      }
    },
    determine () {
      // 这时this.selectDataStore已经是拿到的全部数据
    }
  },
  components: {delChecked}
}

</script>
