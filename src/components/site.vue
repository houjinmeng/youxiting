<template>
  <div>
    <el-button type="primary" @click.stop="dialogVisibleadd = true"
      >添加场地</el-button
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
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="场地名称" align="center">
      </el-table-column>
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
      <el-table-column prop="address" label="地址" align="center">
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
    <el-dialog title="场地详情" :visible.sync="dialogVisible" width="30%">
      <div>场地名:旺角广场</div>
      <div>联系人:李四</div>
      <div>联系电话:158689865564</div>
      <div>地址:朝阳区望京</div>
      <div>状态:启用</div>
      <div>员工数量:2</div>
      <div>设备数量:45</div>
      <div>游戏机数量:55</div>
      <div>卡头数量:44</div>
    </el-dialog>
    <!-- 添加商户弹框 -->
    <el-dialog title="添加场地" :visible.sync="dialogVisibleadd" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="场地名">
          <el-input v-model="form.name" style="width:50%"></el-input>
        </el-form-item>
        <el-form-item label="场地经理">
          <el-select v-model="form.region" placeholder="请选择场地经理" style="width:50%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="地址">
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
     <el-dialog title="修改场地信息" :visible.sync="dialogVisibleedit" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="场地名">
          <el-input v-model="form.name" style="width:50%" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="场地管理员">
          <el-select v-model="form.region" placeholder="请选择场地经理" style="width:50%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> </el-form-item
      >
      <el-form-item label="地址">
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
      this.$confirm('此操作将永久删除该场地, 是否继续?', '提示', {
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
