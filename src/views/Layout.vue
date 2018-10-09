<template>
  <div class="HolyGrail">
    <header>
      <router-link to="/helloworld">table_crud</router-link>
    </header>
    <div class="HolyGrail-body">
      <main class="HolyGrail-content">...</main>
      <nav class="HolyGrail-nav">...</nav>
      <aside class="HolyGrail-ads">...</aside>
    </div>
    <footer>...</footer>
  </div>
</template>

<style>
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header,
footer {
  flex: 1;
  background: #ccc;
}

.HolyGrail-body {
  display: flex;
  flex: 4;
  background: pink;
}

.HolyGrail-content {
  flex: 1;
  background: blanchedalmond;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 12em;
  background: beige;
}

.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
</style>
