<template>
  <div>
    <!-- 表单部分 -->
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
      <FormItem>
        <Row>
          <Col span="6">
          <FormItem prop="start_datetime">
            开始时间 &nbsp; <DatePicker type="datetime" placeholder="Select date" v-model="formValidate.start_datetime"></DatePicker>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem prop="end_datetime">
            结束时间 &nbsp; <DatePicker type="datetime" placeholder="Select date" v-model="formValidate.end_datetime"></DatePicker>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">Male</Radio>
              <Radio label="female">Female</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="6">
          <FormItem prop="LV1">
            LV1 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input style="width: 200px" type="text" placeholder="Select date" v-model="formValidate.LV1" />
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem prop="LV2">
            LV2 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Input style="width: 200px" type="text" placeholder="Select date" v-model="formValidate.LV2" />
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="12">
          <FormItem prop="desc">
            选填字段 &nbsp; <Input style="width:200px" v-model="formValidate.desc" type="text" placeholder="Enter 8个数字"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <!-- 表格部分 -->
    <div class="download_table">
      <Table border :columns="columns8" :data="data7" size="small" ref="table"></Table>
      <Page :total="dataCount" :page-size="pageSize" show-elevator show-total class="paging" @on-change="init_changepage"></Page>
    </div>
    <!-- 手风琴列表展示 -->
    <div class="accordion_table">
      <Collapse v-model="value2" accordion>
        <Panel name="1">
          4个饼状图
          <div slot="content">
            <div class="first">
              <div id="first_item1" class="first_item">1</div>
              <div id="first_item2" class="first_item">2</div>
              <div id="first_item3" class="first_item">3</div>
              <div id="first_item4" class="first_item">4</div>
            </div>
          </div>
        </Panel>
        <Panel name="2">
          2个饼状图
          <div slot="content">
            <div class="second">
              <div class="second_item">1</div>
              <div class="second_item">2</div>
            </div>
          </div>
        </Panel>
        <Panel name="3">
          1个条形图
          <div slot="content">
            <div id="third_item" class="third"></div>
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>
<script>
export default {
  name: 'option3',
  props: ['parentToChildLoginName'],
  data () {
    return {
      // 表单部分
      formValidate: {
        LV1: '',
        LV2: '',
        gender: '',
        interest: [],
        start_datetime: '',
        end_datetime: ''
      },

      // 表单校验部分
      ruleValidate: {
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        // start_datetime: [
        //   { required: true, type: 'datetime', message: 'Please select the start_datetime', trigger: 'change' }
        // ]
        // end_datetime: [
        //   { required: true, type: 'datetime', message: 'Please select time', trigger: 'change' }
        // ]
        desc: [
          { required: true, message: '请输入8个数字', trigger: 'blur' },
          { type: 'string', message: '只能填8个数字', trigger: 'blur' }
        ]
      },
      // 手风琴效果
      value2: '1',
      ajaxHistoryData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 4,
      // 点击下载次数
      download_count: 0,
      columns8: [
        {
          'title': 'Name',
          'key': 'name'
          // 'fixed': 'left',
          // 'width': 300
        },
        {
          'title': 'Show',
          'key': 'show',
          'width': 120,
          'sortable': true,
          filters: [
            {
              label: 'Greater than 4000',
              value: 1
            },
            {
              label: 'Less than 4000',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.show > 4000
            } else if (value === 2) {
              return row.show < 4000
            }
          }
        },
        {
          'title': 'Weak',
          'key': 'weak',
          'width': 90,
          'sortable': true
        },
        {
          'title': 'stay',
          'key': 'stay'
          // 'width': 400
        },
        {
          'title': 'action',
          'key': 'action',
          // 'width': 300,
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
                    this.download_count++
                    console.log(params.index)
                    this.$refs.table.exportCsv({
                      filename: 'The original data'
                    })
                    console.log('下载次数', this.download_count)
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }

              }, '下载次数:' + this.download_count)

            ])
          }
        }

      ],
      data7: [
        {
          'name': 'Name1',
          'fav': 0,
          'show': 7302,
          'weak': 5627,
          'signin': 1563,
          'click': 4254,
          'active': 1438,
          'day7': 274,
          'day30': 285,
          'tomorrow': 1727,
          'day': 558,
          'week': 4440,
          'month': 5610
        },
        {
          'name': 'Name2',
          'fav': 0,
          'show': 4720,
          'weak': 4086,
          'signin': 3792,
          'click': 8690,
          'active': 8470,
          'day7': 8172,
          'day30': 5197,
          'tomorrow': 1684,
          'day': 2593,
          'week': 2507,
          'month': 1537
        },
        {
          'name': 'Name3',
          'fav': 0,
          'show': 7181,
          'weak': 8007,
          'signin': 8477,
          'click': 1879,
          'active': 16,
          'day7': 2249,
          'day30': 3450,
          'tomorrow': 377,
          'day': 1561,
          'week': 3219,
          'month': 1588
        },
        {
          'name': 'Name4',
          'fav': 0,
          'show': 9911,
          'weak': 8976,
          'signin': 8807,
          'click': 8050,
          'active': 7668,
          'day7': 1547,
          'day30': 2357,
          'tomorrow': 7278,
          'day': 5309,
          'week': 1655,
          'month': 9043
        },
        {
          'name': 'Name5',
          'fav': 0,
          'show': 934,
          'weak': 1394,
          'signin': 6463,
          'click': 5278,
          'active': 9256,
          'day7': 209,
          'day30': 3563,
          'tomorrow': 8285,
          'day': 1230,
          'week': 4840,
          'month': 9908
        },
        {
          'name': 'Name6',
          'fav': 0,
          'show': 6856,
          'weak': 1608,
          'signin': 457,
          'click': 4949,
          'active': 2909,
          'day7': 4525,
          'day30': 6171,
          'tomorrow': 1920,
          'day': 1966,
          'week': 904,
          'month': 6851
        },
        {
          'name': 'Name7',
          'fav': 0,
          'show': 5107,
          'weak': 6407,
          'signin': 4166,
          'click': 7970,
          'active': 1002,
          'day7': 8701,
          'day30': 9040,
          'tomorrow': 7632,
          'day': 4061,
          'week': 4359,
          'month': 3676
        },
        {
          'name': 'Name8',
          'fav': 0,
          'show': 862,
          'weak': 6520,
          'signin': 6696,
          'click': 3209,
          'active': 6801,
          'day7': 6364,
          'day30': 6850,
          'tomorrow': 9408,
          'day': 2481,
          'week': 1479,
          'month': 2346
        },
        {
          'name': 'Name9',
          'fav': 0,
          'show': 567,
          'weak': 5859,
          'signin': 128,
          'click': 6593,
          'active': 1971,
          'day7': 7596,
          'day30': 3546,
          'tomorrow': 6641,
          'day': 1611,
          'week': 5534,
          'month': 3190
        },
        {
          'name': 'Name10',
          'fav': 0,
          'show': 3651,
          'weak': 1819,
          'signin': 4595,
          'click': 7499,
          'active': 7405,
          'day7': 8710,
          'day30': 5518,
          'tomorrow': 428,
          'day': 9768,
          'week': 2864,
          'month': 5811
        }
      ]
    }
  },
  methods: {

    // 表单提交按钮与重置
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formValidate.interest, this.formValidate.gender, this.formValidate.LV1, this.formValidate.LV2, this.parentToChildLoginName)
          this.$Message.success('success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    // 获取历史记录信息
    handleListApproveHistory () {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data7
      this.dataCount = this.data7.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data7.length < this.pageSize) {
        this.data7 = this.ajaxHistoryData
      } else {
        this.data7 = this.ajaxHistoryData.slice(0, this.pageSize)
      }
    },
    init_changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.data7 = this.ajaxHistoryData.slice(_start, _end)
    },
    // echarts
    first_item1_echarts () {
      // 基于准备好的dom，初始化echarts实例
      let firstItem1Echart = this.$echarts.init(document.getElementById('first_item1'))
      // 绘制图表
      firstItem1Echart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },
    first_item2_echarts () {
      // 基于准备好的dom，初始化echarts实例
      let firstItem2Echart = this.$echarts.init(document.getElementById('first_item2'))
      // 绘制图表
      firstItem2Echart.setOption({
        backgroundColor: '#2c343c',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 274, name: '联盟广告'},
              {value: 235, name: '视频广告'},
              {value: 400, name: '搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }
        ]
      })
    },
    third_item_echarts () {
      // app.title = '多 Y 轴示例'

      let colors = ['#5793f3', '#d14a61', '#675bba']
      // 基于准备好的dom，初始化echarts实例
      let thirdItemEchart = this.$echarts.init(document.getElementById('third_item'))
      // 绘制图表
      thirdItemEchart.setOption({
        color: colors,

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '蒸发量',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      })
    }
  },
  created () {
    this.handleListApproveHistory()
  },
  mounted () {
    this.first_item1_echarts()
    this.first_item2_echarts()
    this.third_item_echarts()
  }
}
</script>

<style >
.download_table{
  height: 270px;
  /* background: #ccc; */
}

.accordion_table{
   height: 320px;
}
  .paging{
      float:right;
      margin-top:10px;
  }
  /* 手风琴部分 */
  .first .first_item{
    height: 200px;
    /* width: 23%; */
    width: 260px;
    background: pink;

  }
 .first,.second{
    display: flex;
    justify-content: space-around;
  }
  .second .second_item{
    height: 200px;
    /* width: 45%; */
     width: 500px;
    background: pink;
  }
  .third{
    height: 200px;
    width: 900px;
    background: pink;
  }

</style>
