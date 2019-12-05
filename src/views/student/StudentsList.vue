<template>
  <div ref="main" :class="pagesize ===30? '':'main'">
    <el-card>
      <el-row>
        <el-col :span="3">
          <h1>学生列表</h1>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="studentSearch" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="goCreateForm">创建学生</el-button>
        </el-col>
      </el-row>
      <el-table :data="currentStudentList" size="small" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.Enrollments" style="width: 100%">
              <el-table-column prop="Id" label="Id" width="360"></el-table-column>
              <el-table-column prop="CourseId" label="课程名" width="360"></el-table-column>
              <el-table-column prop="Grade" label="成绩">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.Grade === 0" type="success">A</el-tag>
                  <el-tag v-if="scope.row.Grade === 1">B</el-tag>
                  <el-tag v-if="scope.row.Grade === 2" type="warning">C</el-tag>
                  <el-tag v-if="scope.row.Grade === 3" type="danger">D</el-tag>
                  <el-tag v-if=" scope.row.Grade===4" type="info">E</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template> </el-table-column>
        <el-table-column prop="Id" label="学生ID" width="350">
        </el-table-column>
        <el-table-column prop="Name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="StudentType" label="学生类型" min-width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.StudentType === 0">Junior</el-tag>
            <el-tag v-if="scope.row.StudentType === 1" type="danger">Senior</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="EnrollmentDate" label="入学日期" min-width="150"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteStudentById(scope.row.Id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[5,10,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="studentTotal">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      studentsList: [],
      // 当前的页数
      pagenum: 1,
      // 当前每页显示的条数
      pagesize: 5,
      // 要搜索的学生
      studentSearch: ''
    }
  },
  created () {
    this.getStudentsInfo()
  },
  methods: {
    async getStudentsInfo () {
      const res = await this.$http.get('/Students/Index')
      console.log(res)

      if (res.status !== 200) this.$notify.error({ title: '获取数据失败', message: '请刷新后重试' })
      this.$notify.success({ title: '获取学生数据成功' })
      this.studentsList = res.data
    },
    // 监听 pagesize 每页的条数的改变
    handleSizeChange (newsize) {
      this.pagesize = newsize
    },

    // 监听 pagenum 当前页码的改变
    handleCurrentChange (newpage) {
      this.pagenum = newpage
    },
    goCreateForm () {
      this.$router.push('/CreateStudent')
    }
  },
  computed: {
    currentStudentList () {
      let newStudents = this.studentsList.slice(
        (this.pagenum - 1) * this.pagesize,
        this.pagenum * this.pagesize
      )

      // 处理入学时间数据, 展示不需要太高的精度
      for (var i = 0; i < newStudents.length; i++) {
        newStudents[i].EnrollmentDate = newStudents[i].EnrollmentDate.split(
          '.'
        )[0]
      }

      return newStudents
    },
    // 学生数据总条数
    studentTotal () {
      return this.studentsList.length
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
.el-table {
  margin: 15px auto;
}
.el-card {
  width: 75%;
  margin: 0 auto;
}
</style>
