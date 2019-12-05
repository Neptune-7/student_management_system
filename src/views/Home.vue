<template>
  <div class="home">
    <el-container direction="vertical" style="height:100%">
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#343a40">
          <el-menu-item class="index_s" index="/" @click="goView(0)">学生管理系统</el-menu-item>
          <el-menu-item index="/StudentList" @click="goView(1)">学生管理</el-menu-item>
          <el-menu-item index="2" @click="goView(2)">课程管理</el-menu-item>
          <el-menu-item index="3">选课管理</el-menu-item>
          <el-menu-item index="4">其他功能</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 路由占位符  匹配到Home子路由的组件在这里显示 -->
        <router-view></router-view>
      </el-main>
      <el-footer>&copy; 2019 - 学生管理系统 - <a href="javascript:;">Privacy</a></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    goView (url) {
      switch (url) {
        case 0: this.$router.push('/')
          break
        case 1: this.$router.push('/Students')
      }
    }
  }
}
</script>
<style lang="less" scoped>
html,
body,
.home,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
.el-header {
  background: #fff;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
  width: 100%;
  padding-right: 15%;
  padding-left: 15%;
  margin-right: auto;
  margin-left: auto;
}
.el-footer {
  width: 100%;
  padding-right: 15%;
  padding-left: 15%;
  border-top: 1px solid #ccc;
  // text-align: center;
  line-height: 350%;
  color: #6c757d;
  a {
    text-decoration: none;
    color: #007bff;
  }
  a:hover {
    color: #0056b3;
    text-decoration: underline;
  }
}
.index_s {
  font-size: 15px;
  font-weight: 600;
}
</style>
