<template>
  <div>
    alsdkfj4444
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
