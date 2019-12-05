<template>
  <div>
    <el-card>
      <el-row>
        <el-col>
          <span class="create_title">添加学生</span>
        </el-col>
      </el-row>
      <el-form :model="studentForm" :rules="studentFormRules" ref="studentFormRef" label-width="80px">
        <el-form-item label="学生名称" prop="name">
          <el-input v-model="studentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学生类型" prop="type">
          <el-select v-model="studentForm.type" placeholder="请选择学生类型">
            <el-option label="Junior" value="0"></el-option>
            <el-option label="Senior" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="studentForm.date1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="studentForm.date2" style="width: 100%;" value-format="HH:mm:ss"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createStudent">添加</el-button>
          <el-button @click="backStudentList"><i class="el-icon-arrow-left left-back"></i> 上一页</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      studentForm: {
        name: '',
        type: '',
        date1: '',
        date2: ''
      },
      // 添加学生表单验证规则对象
      studentFormRules: {
        name: [
          {
            required: true,
            message: '请输入学生名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 45,
            message: '长度在 2 到 45 个字符',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择学生类型',
            trigger: 'change'
          }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          },
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          },
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    backStudentList () {
      this.$router.push('/Students')
    },
    createStudent () {
      this.$refs.studentFormRef.validate(async flag => {
        if (!flag) {
          this.$notify.error({ title: '请检查输入信息' })
        } else {
          this.studentForm.EnrollmentDate = this.studentForm.date1 + 'T' + this.studentForm.date2
          console.log(this.studentForm)

          let res = await this.$http.post('/Students/Create', `Name=${this.studentForm.name}&StudentType=${this.studentForm.type}&EnrollmentDate=${this.studentForm.EnrollmentDate}`)

          if (res.status === 200 && res.data.length > 0) {
            this.$notify.success({ title: '添加成功' })
            this.$router.push('/Students')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  width: 70%;
  margin: 0 auto;
  margin-top: 5%;
}
.el-row {
  margin: 10px 0;
}
.create_title {
  font-size: 26px;
  font-weight: 600;
}
.left-back {
  margin-left: -10px;
}
.el-form {
  width: 70%;
  margin: 15px 0;
}
.line {
  text-align: center;
}
</style>
