<template>
  <el-container>
    <el-header>
      <div id="logo-box">
        <img src="../assets/image/heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logoout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow ? '65px' : '210px'">
        <div
          style="background-color:rgb(74,80,100); height:25px;line-height:25px;font-size:12px;text-align:center;color:#fff;
          letter-spacing:0.1em;user-select:none;cursor:pointer "
          @click="menushow = !menushow"
        >
          |||
        </div>

        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :style="menushow ? 'width:65px' : 'width:200px'"
          :collapse="menushow"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="(item, k) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="'iconfont icon-' + menuicon[k]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="item2.path"
              v-for="item2 in item.children"
              :key="item2.id"
            >
              <i style="margin-right:10px"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="item in breadList"
            :to="{ path: item.path }"
            :key="item.name"
            @click.native="getRouter(item.path, item.name)"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex' //引入vuex
export default {
  created() {
    // this.getMenuList()
  },
  computed: {
    breadList() {
      let dataArr = []
      if (this.$store.state.myRouter.length !== 1) {
        dataArr = this.$store.state.myRouter
      } else {
        dataArr = JSON.parse(sessionStorage.getItem('myRouter'))
      }
      return dataArr
    }
  },
  data() {
    return {
      menushow: false,
      //  左侧导航菜单数据
      menuList: [
        {
          id: 1,
          authName: '账号管理',
          path: null,
          children: [
            {
              id: 8,
              authName: '账号列表',
              path: 'account',
              children: []
            }
          ]
        },
        {
          id: 2,
          authName: '用户管理',
          path: null,
          children: [
            {
              id: 9,
              authName: '用户列表',
              path: 'users',
              children: []
            }
          ]
        },
        {
          id: 3,
          authName: '审核管理',
          path: null,
          children: [
            {
              id: 10,
              authName: '审核列表',
              path: 'check',
              children: []
            }
          ]
        },
        {
          id: 4,
          authName: '设备管理',
          path: null,
          children: [
            {
              id: 11,
              authName: '设备列表',
              path: 'machine',
              children: []
            }
          ]
        },
        {
          id: 5,
          authName: '价格管理',
          path: null,
          children: [
            {
              id: 12,
              authName: '价格设置',
              path: 'price',
              children: []
            }
          ]
        },
        {
          id: 6,
          authName: '订单管理',
          path: null,
          children: [
            {
              id: 13,
              authName: '订单列表',
              path: 'order',
              children: []
            }
          ]
        },
        {
          id: 7,
          authName: '统计管理',
          path: null,
          children: [
            {
              id: 14,
              authName: '投放统计',
              path: 'statistics',
              children: []
            },
            {
              id: 15,
              authName: '营销号统计',
              path: 'marketing',
              children: []
            }
          ]
        }
      ],
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    ...mapActions(['routerFun']),
    getRouter(path, name) {
      let obj = { path, name }
      this.routerFun(obj) //调用vuex中的方法
    },
    logoout() {
      this.$confirm('确定要退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      // 获取失败处理
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: rgb(55, 61, 65);
    padding: 0;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    #logo-box {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    width: 209px !important;
    border: none !important;
  }
}
</style>
