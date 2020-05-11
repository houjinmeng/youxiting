<template>
  <div id="login-container">
    <div id="login-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账号登录" name="first">
          <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名"
                clearable
              >
                <i slot="prefix" class="iconfont icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                clearable
              >
                <i slot="prefix" class="iconfont icon-3702mima"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verifycode">
              <div class="img_code">
                <el-input
                  v-model="loginForm.verifycode"
                  style="width:70%"
                  placeholder="请输入图形验证码"
                  clearable
                >
                </el-input>
                <img
                  :src="code_src"
                  alt=""
                  style="width:25%;height:40px"
                  @click="get_verifycode"
                />
              </div>
            </el-form-item>
            <div style="text-align:right">
              <el-button type="primary" @click="login" style="width:30%"
                >登 录</el-button
              >
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="second">
          <el-form
            ref="loginForm2"
            :model="loginForm2"
            :rules="loginFormRules2"
          >
            <el-form-item prop="mobile">
              <el-input
                v-model="loginForm2.mobile"
                placeholder="请输入手机号"
                clearable
              >
                <i slot="prefix" class="iconfont icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="verifycode">
              <div class="img_code">
                <el-input
                  v-model="loginForm2.verifycode"
                  style="width:70%"
                  placeholder="请输入图形验证码"
                  clearable
                >
                </el-input>
                <img
                  :src="code_src"
                  alt=""
                  style="width:25%;height:40px"
                  @click="get_verifycode"
                />
              </div>
            </el-form-item>
            <el-form-item prop="smscode">
              <div class="img_code">
                <el-input
                  v-model="loginForm2.smscode"
                  style="width:70%"
                  placeholder="请输入短信验证码"
                  clearable
                >
                </el-input>
                <div class="getcode" v-show="show_btn" @click="get_smscode">
                  获取验证码
                </div>
                <div class="getcode" v-show="show_count">{{ count }}s</div>
              </div>
            </el-form-item>
            <div style="text-align:right">
              <el-button type="primary" @click="login2" style="width:30%"
                >登 录</el-button
              >
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: '',
      activeName: 'first',
      show_btn: true,
      show_count: false,
      code_src: '',
      loginForm: {
        username: '',
        password: '',
        verifyid:'',
        verifycode:''
      },
      loginForm2: {
        mobile: '',
        verifyid: '',
        verifycode: '',
        smscode: ''
      },
      loginFormRules: {
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' }
        ],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        verifycode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loginFormRules2: {
        verifycode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' }
        ],
        smscode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) === false) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.get_verifycode()
  },
  methods: {
    // 获取图形验证码
    get_verifycode() {
      this.$http.get('/captcha').then(res => {
        if (res.data.status == 200) {
          this.code_src = res.data.b64
          this.loginForm2.verifyid = res.data.id
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 获取短信验证码
    get_smscode() {
      this.$refs.loginForm2.validateField('mobile', value => {
        if (!value) {
          this.$refs.loginForm2.validateField('verifycode', value => {
            if (!value) {
              this.count = 60
              this.$http
                .get(
                  '/sms?mobile=' +
                    this.loginForm2.mobile +
                    '&verifyid=' +
                    this.loginForm2.verifyid +
                    '&verifycode=' +
                    this.loginForm2.verifycode
                )
                .then(res => {
                  if (res.data.status == 200) {
                    this.$message.success(res.data.msg)
                    this.show_btn = false
                    this.show_count = true
                    let timeInt = setInterval(() => {
                      this.count--
                      if (this.count <= 0) {
                        this.show_btn = true
                        this.show_count = false
                        window.clearInterval(timeInt)
                      }
                    }, 1000)
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
            }
          })
        }
      })
    },
    login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid === true) {
          this.$http.post('/login', this.loginForm).then(res => {
            if (res.data.status == 200) {
              window.sessionStorage.setItem('token', res.data.token)
              this.$router.push('/home')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    login2() {
      this.$refs.loginForm2.validate(valid => {
        if (valid === true) {
          this.$http.post('/smslogin', this.loginForm2).then(res => {
            if (res.data.status == 200) {
              window.sessionStorage.setItem('token', res.data.token)
              this.$router.push('/home')
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.getcode {
  width: 25%;
  height: 40px;
  background-color: skyblue;
  color: #ffffff;
  cursor: pointer;
}
.img_code {
  display: flex;
  justify-content: space-between;
}
#login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  #login-box {
    padding: 10px;
    width: 450px;
    // height: 400px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    .el-form {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
