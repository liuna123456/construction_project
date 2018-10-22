<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
      <span class="expand-key">Job: </span>
      <span class="expand-value">{{ row.job }}工作</span>
      </Col>
      <Col span="6">
      <span class="expand-key">Interest: </span>
      <span class="expand-value">{{ row.interest }}兴趣</span>
      </Col>
      <Col span="6">
      <span class="expand-key">Birthday: </span>
      <span class="expand-value">{{ row.birthday }}生日</span>
      </Col>
      <Col span="6">
      <Button type="primary" @click="fix_sys_com">修改</Button>
      <Button type="primary" @click="del_sys_com">删除</Button>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">Favorite book: </span>
      <span class="expand-value">《{{ row.book }}》</span>
      </Col>
      <Col span="6">
      <span class="expand-key">Favorite movie: </span>
      <span class="expand-value">{{ row.movie }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">Favorite music: </span>
      <span class="expand-value">{{ row.music }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">Birthday: </span>
      <span class="expand-value">{{ row.birthday }}生日</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  methods: {
    fix_sys_com () {
      alert('我是修改数据的')
    },
    del_sys_com () {
      alert('我是删除数据的')
    }
  }
}
</script>
