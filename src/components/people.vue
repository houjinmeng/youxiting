<template>
  <div>
    <el-button type="primary" @click.stop="dialogVisibleadd = true"
      >添加账号</el-button
    >
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @row-click="xiangqing"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="登录名" align="center">
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="role" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="address" label="所属单位" align="center">
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
          <el-button size="mini" style="background-color:#0e9692;color:#fff" @click.stop="dialogVisibleedit=true"
            >修改</el-button
          >
          <el-button size="mini" type="danger" @click.stop="del(info.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 商户详情弹框 -->
    <el-dialog title="账号详情" :visible.sync="dialogVisible" width="30%">
      <div>登录名名:张三</div>
      <div>姓名:李四</div>
      <div>联系电话:158689865564</div>
      <div>角色:店长</div>
      <div>管理范围:旺角广场店</div>
      <div>状态:启用</div>
      <div>邮箱:@487945454.qq.com</div>
      <div>最后登录时间:2020/05/13</div>
    </el-dialog>
    <!-- 添加商户弹框 -->
    <el-dialog title="添加账号" :visible.sync="dialogVisibleadd" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="登录名">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.region" placeholder="请选择角色" style="width:50%">
            <el-option label="店长" value="shanghai"></el-option>
            <el-option label="服务员" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="管理范围">
          <el-select v-model="form.region" placeholder="请选择管理范围" style="width:50%">
            <el-option label="望京店" value="shanghai"></el-option>
            <el-option label="旺角店" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="IC卡">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
         <el-form-item label="手机">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleadd = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改商户信息 -->
     <el-dialog title="修改账号信息" :visible.sync="dialogVisibleedit" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="登录名">
          <el-input v-model="form.name" style="width:50%" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.region" placeholder="请选择角色" style="width:50%">
            <el-option label="店长" value="shanghai"></el-option>
            <el-option label="服务员" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="管理范围">
          <el-select v-model="form.region" placeholder="请选择管理范围" style="width:50%">
            <el-option label="望京店" value="shanghai"></el-option>
            <el-option label="旺角店" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="IC卡">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
         <el-form-item label="手机">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleedit = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          username:'大海',
          phone:'1234879454',
          role:'经理',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          username:'大海',
          phone:'1234879454',
          role:'经理',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          username:'大海',
          phone:'1234879454',
          role:'经理',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        },
         {
          date: '2016-05-02',
          name: '王小虎',
          username:'大海',
          phone:'1234879454',
          role:'经理',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        },
      ],
      // 详情弹窗
      dialogVisible: false,
      // 添加
      dialogVisibleadd: false,
      form:{
        name:'',
        region:''
      },
      // 修改商户信息
      dialogVisibleedit:false
    }
  },
  methods: {
    // 查看详情
    xiangqing(row) {
      this.dialogVisible = true
      console.log(row)
    },
    // 删除用户
    del(id) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
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
