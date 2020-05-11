<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column type="index" label="序号" width="200" align="center"></el-table-column>
    <el-table-column prop="name" label="商户名称" align="center"> </el-table-column>
    <el-table-column prop="address" label="联系人" align="center">
    </el-table-column>
    <el-table-column prop="address" label="手机号" align="center">
    </el-table-column>
    <el-table-column prop="status" label="状态" align="center">
      <el-switch
        v-model="info.row.status"
        :active-value="0"
        :inactive-value="1"
        slot-scope="info"
        @change="changeState(info.row.id)"
      ></el-switch>
    </el-table-column>
    <el-table-column prop="address" label="操作" align="center">
      <template slot-scope="info">
        <el-button size="mini" style="background-color:#0e9692;color:#fff"
          >修改</el-button
        >
        <el-button size="mini" type="danger" @click="del(info.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    // 删除用户
    del(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改用户状态的方法
    changeState(uid) {
      const data = {
        token: window.sessionStorage.getItem('token'),
        id: uid
      }
      this.$http.post('/user_status', JSON.stringify(data)).then(res => {
        if (res.status !== 200) {
          return this.$message.error('修改状态失败')
        }
        this.$message.success('修改状态成功')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
