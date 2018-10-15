#  需要提前了解的知识点
1. [npm 入门](http://www.cnblogs.com/kelsen/p/4947859.html)
2. [npm 提高](http://www.nodeclass.com/articles/810142)
```
需要了解的知识点
package.json 文件相关配置选项
npm 本地安装、全局安装、本地开发安装等区别及相关命令
npm script 脚步的基本编写能力
 ```

3. [webpack配置，官方文档**查看指南部分](https://webpack.js.org/)

```
webpack 的基本配置
了解 webpack 常用的 loader： less-loader、sass-loader、 vue-loader、style-loader、css-loader、eslint-loader、babel-loader 等
熟悉 Webpack 的 webpack-dev-server 的基本配置和使用，会配置热更新
```

4. [阮一峰es6语法大全](http://es6.ruanyifeng.com/)

```
需要学习的知识点
es6 的模块机制
各种最新语法糖，简写、geter、setter、箭头函数
类、继承的心机制 ...
```

# Vue 脚手架工具：vue-cli构建实战项目

1. vue-cli安装

```
# 安装vue-cli。  安装之前首先确保你已经安装好了nodejs 而且打开命令行
$ npm install -g vue-cli
# 校验一下是否安装成功
$ vue -V
***注意版本问题
```

2. 使用vue-cli初始化项目

```
$ vue init <template-name> <project-name>
```

3.  安装和开发控制台的命令：

```
# 如果已经安装，请省略
$ npm install -g vue-cli

# 初始化一个webpack全功能包的vue项目，请您把my-project换成你自己的项目名。
$ vue init webpack my-project

# 用命令行进入当前项目目录
$ cd my-project

# npm安装所有的依赖的包
$ npm install

# 运行测试的首页
$ npm run dev
```

### 综合实例开发记录

```
$ vue init webpack ttl                        # => 安装webpack模板的项目 ttl（项目名可以随便取）

  A newer version of vue-cli is available.

  latest:    2.6.0
  installed: 2.5.1

  This will install Vue 2.x version of template.

  For Vue 1.x use: vue init webpack#1.0 ttl

? Project name mydemovue                        # => 项目名称
? Project description A Vue.js project          # => 项目描述
? Author malun <1573511441@qq.com>               # => 作者
? Vue build standalone                          # => 是否支持单文件组件
? Use ESLint to lint your code? Yes             # => 是否支持ESLint代码校验
? Pick an ESLint preset Standard                # => 校验的标准是什么？
? Setup unit tests with Karma + Mocha? Yes      # => 是否使用单元测试
? Setup e2e tests with Nightwatch? Yes          # => 是否使用e2e测试

   vue-cli · Generated "ttl".

   To get started:

     cd ttl
     npm install
     npm run dev

   Documentation can be found at https://vuejs-templates.github.io/webpack
```

+  通过上面一系列的命令后，我们就会创建一个 webpack 配置好的项目包。目录结构如下：

```
ttl
|--.babelrc           #=> babel的配置文件，主要用于转换es6等最新的js语法。
|--.editorconfig      #=> 编辑器配置
|--.eslintignore      #=> eslint的忽略校验的配置文件
|--.eslintrc.js       #=> eslint的配置校验js是否规范的配置文件
|--.gitignore         #=> 设置git忽略的管理的文件
|--README.md          #=> readme说明文件
|--build/             #=> 自动构建存放的文件地方
|--config/            #=> 当前开发、测试等配置的文件，需要懂点nodejs了啊。
|--index.html         #=> 项目的主入口的模板
|--package.json       #=> npm的配置文件
|--src/               #=> 源码目录
|--static/            #=> 静态资源存放的目录
|--test/              #=> 测试相关目录
```

1. 初始化依赖包

```
$ cd ttl              #=> 进入上面创建好的项目目录
$ npm install         #=> 安装所有的依赖包。  安装过程可能非常长，网络也可能有问题，请耐心等待。

# 安装完成后，可以直接运行测试,如果自动打开浏览器，并跳转到http://localhost:8080/ 说明一切都ok了。
$ npm run dev
```

2. 安装vue-router组件

```
$ npm i -S vue-router
```

3. 到项目的 /src/components/ 目录下创建三个组件文件。

3.1  首页组件

```
<template>
  <div class="home">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: 'home',     // 组件可以有自己的名字。
  data () {         // 组件的data必须是函数
    return {
      msg: '这里是Home视图'
    }
  }
}
</script>

<style scoped>
h3 {
  background-color: #82c;
}
</style>
```

3.2  用户首页组件

```
<template>
  <div>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {    // es6的模块导出定义语法，此模块导出默认的对象
  name: 'user',     // 组件可以有自己的名字。
  data () {         // 组件的data必须是函数
    return {
      msg: '这里是User视图'
    }
  }
}
</script>

<style scoped>
h3 {
  background-color: red;
}
</style>
```

3.3  产品组件


```
<template>
  <div class="product">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: 'product',     // 组件可以有自己的名字。
  data () {         // 组件的data必须是函数
    return {
      msg: '这里是Home视图'
    }
  }
}
</script>

<style scoped>
h3 {
  background-color: green;
}
</style>
```


4.  项目的目录结构为：


```
ttl
|-- src
|--|-- Hello.vue
|--|-- Home.vue
|--|-- Product.vue
|--|-- User.vue
```

5.  创建 router 对象及配置路由

5.1   在src目录下创建approuter.js文件。 然后添加如下代码：


```
import VueRouter from 'vue-router'; // 导入路由模块
import Home from './components/Home.vue'; // 导入Home组件
import User from './components/User.vue';
import Product from './components/Product.vue';

export default new VueRouter({
  // 定义路由规则对象
  routes: [
    { path: '/home', component: Home },
    { path: '/user/:id', component: User },
    { path: '/product/:id', component: Product }
  ]
});
```


6.  修改 main.js 文件 找到src/目录下的 main.js 文件， 共修改 4 处，添加路由引用、添加路由规则对象导入、启用路由、将路由键入到 Vue 中。
修改此文件为：


```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'; // +++1、导入路由组件
import router from './approuter'; // +++2、导入我们自己写的路由配置文件

// +++ 3、使用路由组件
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router // +++4、添加路由对象
});
```


7.  在 app.vue 中添加路由导航


```
<template>
  <div id="app">
    <nav class="top-menu">
      <ul >
        <li v-for="item in menuList">
          <router-link :to="item.url">{{ item.name }}</router-link>
        </li>
      </ul>
    </nav>
    <hr>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      menuList: [
        { name: '首页', url: '/home' },
        { name: '用户', url: '/user/19' },
        { name: '产品', url: '/product/20' }
      ]
    }
  }
}
</script>

<style>
#app {

}
.top-menu ul, .top-menu li {
  list-style: none;
}
.top-menu {
  overflow: hidden;
}
.top-menu li {
  float: left;
  width: 100px;
}
</style>
```


8. [vue的各种指令官网最详细](https://cn.vuejs.org/v2/guide/)
