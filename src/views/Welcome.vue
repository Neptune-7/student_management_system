<template>
  <div>
    <h1>Welcome</h1>
    <p>这是一个使用 Vue+Element-UI 搭建的 SPA 单页面应用.</p>
    <span>技术栈: </span>
    <el-tag>Vue</el-tag>
    <el-tag type="success">Element-UI</el-tag>
    <el-tag type="info">Less</el-tag>
    <el-tag type="warning">Vue-Router</el-tag>
    <el-tag type="danger">Axios</el-tag>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
div {
  text-align: center;
}
h1 {
  font-size: 50px;
  font-weight: 300;
  line-height: 1.2;
}
.el-tag {
  margin: 0 5px;
}
</style>
