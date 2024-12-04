<template>
    <!-- <p class="tip">Click on button in image container</p> -->
    <div style="width: 100%;height: 100%;background-color: #455a81; padding-top: 10%; background: linear-gradient(70deg, #c6e2ff, #ecf5ff);" >
        <div class="cont">
            <div class="form sign-in" style="background-color: #FFFFFF;">
                <div style="margin-top: 10%;">
                    <h2>欢迎回来,</h2>
                    <div v-if="!isEmail">
                      <label>
                        <span>账号名称</span>
                        <input type="text" v-model="username"/>
                        </label>
                        <label>
                        <span>密码</span>
                        <input type="password" v-model="pwd"/>
                        </label>
                    </div>
                    <div v-else>
                      <label>
                        <span>邮箱</span>
                        <input type="text" v-model="email" />
                        </label> 
                        <label style="margin: 25px 0 10px 160px; width: 300px;">
                        <span>验证码</span>
                        <div style="display: flex;justify-content: center;">
                          <input type="text" v-model="code" style="width: 260px;"/>
                          <el-button style="width: 80px;margin: 0; font-size: 14px;border-radius: 5px;" text type="primary" :disabled="isSend" bg  @click="sendCode">
                            {{isSend?'已发送':'发送'}}
                          </el-button>
                        </div>
                        </label>
                    </div>
                    <div style="display: flex;justify-content: center;margin-top: 5px;">
                      <el-button style="width: 80px;margin: 0; font-size: 14px;" v-if="!isEmail" type="primary" link size="small" @click="forget">忘记密码</el-button>
                      <el-button style="width: 80px;margin: 0;font-size: 14px;" v-if="!isEmail"  type="primary" link size="small" @click="isEmail = !isEmail">邮箱登录</el-button>
                      <el-button style="font-size: 14px;" v-else  type="primary" link size="small" @click="isEmail = !isEmail">账号密码</el-button>
                    </div>
                    <button type="button" class="submit" @click="login">登录</button>

                    
                </div>
                <!-- <button type="button" class="fb-btn">Connect with <span>facebook</span></button> -->
            </div>
            <div class="sub-cont">
                <div class="img">
                <div class="img__text m--up">
                    <h2>第一次登录?</h2>
                    <p>注册并认识更广阔的世界!</p>
                </div>
                <div class="img__text m--in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>
                <div class="img__btn" @click="signUp">
                    <span class="m--up">注册</span>
                    <span class="m--in">登录</span>
                </div>
                </div>
                <div class="form sign-up" style="background-color: #FFFFFF;">
                    <div style="margin-top: 10%;">
                        <h2>Time to feel like home,</h2>
                        <label>
                            <span>账号名</span>
                            <input type="text" v-model="registe.name"/>
                        </label>
                        <label>
                            <span>手机号</span>
                            <input type="email" v-model="registe.phone"/>
                        </label>
                        <label>
                            <span>密码</span>
                            <input type="password" v-model="registe.pwd"/>
                        </label>
                        <button type="button" class="submit" @click="register">注册</button>
                    </div>
                    <!-- <button type="button" class="fb-btn">Join with <span>facebook</span></button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import {service} from '@/components/js/http.js'
    import { useRouter } from 'vue-router'
    import { ElMessage ,ElNotification} from 'element-plus'

    const username = ref('kiri')
    const pwd = ref('123456')

    const registe = ref({
        name:'',
        phone:'',
        pwd:''
    })

    let isEmail = ref(false)
    let email = ref('2769695382@qq.com')

    let isSend = ref(false)

    const router = useRouter()
    let code = ref('')

    let emailPattern = /^([A-Za-z0-9_\-\.])+\@(163.com|qq.com|42du.cn)$/;
    

    const signUp = () => {
        const contElement = document.querySelector('.cont');
        if (contElement) {
            contElement.classList.toggle('s--signup');
        }
    }

    const login = () => {
      if(isEmail.value){
        mail_login()
        return;
      }
        

        service.get('/user/login?'+'userName='+username.value+'&password='+pwd.value)
        .then(res=>{
            let data = res.data.data;
            if(res.data.code === 200){
                // let e = JSON.parse(data)
                // data.user.avatar = fileOps.getFile + data.user.avatar;
                sessionStorage.setItem('user',JSON.stringify(data.user));
                sessionStorage.setItem('token',data.token);
                console.log(data.token)
                router.push({path:'/game/home'})
            }else{
                ElMessage.error(res.data.message)
            
            }
        })
    }

    const forget = () => {
    }
    const register = () => {
        if(registe.value.name === ''||registe.value.phone === ''||registe.value.pwd === ''){
            ElMessage.warning('请输入完整信息')
            return
        }

        service.post('/user/register',registe.value)
        .then(res=>{
            if(res.data.code === 200&&res.data.data){
                ElMessage.success('注册成功')

                username.value = registe.value.name;
                pwd.value = registe.value.pwd;
                login();
            }else{
                ElMessage.error(res.data.message)
            }
        })
    }

    // 邮箱格式验证
    const  verify = ()=>{

        if(emailPattern.test(email.value)){
          ElNotification({
            title: '验证通过',
            message: '邮箱格式正确',
            type: 'success',
          })
          return true
        }else{
          ElNotification({
            title: '验证不通过',
            message: '邮箱格式错误',
            type: 'error',
          })
          return false
        }
    }

    const sendCode = () => {
      if(!verify()){
        return;
      }
      isSend.value = true;
      setTimeout(()=>{
        isSend.value = false;
      },1000*60*5)

      service.get('/user/sendEmail?target='+email.value)
      .then(res=>{
        if(res.data.code === 200){
          ElNotification({
            title: '验证码发送成功',
            message: '验证码发送成功，请在五分钟内操作。若为收到请检查邮箱或者刷新页面重试！',
            type: 'success',
          })
        }
      })
    }
    const mail_login = ()=>{
        if(!code.value){
          ElNotification({
            title: '警告',
            message: '请输入验证码！',
            type: 'warning',
          })
        }

        service.get('/user/email?email='+email.value+'&code='+code.value)
        .then(res=>{
          let data = res.data.data;
          if(res.data.code === 200){
            ElNotification({
              title: '登录成功',
              message: '登录成功，即将跳转至主页',
              type: 'success',
            })

            sessionStorage.setItem('user',JSON.stringify(data.user));
                sessionStorage.setItem('token',data.token);
            setTimeout(()=>{
              router.push({path:'/game/home'})
            })
          }else{
            ElNotification({
              title: '登录失败',
              message: res.data.message,
              type: 'error',
            })
          }
        })
    }


</script>

<style scoped>
    *,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: #ededed;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.cont {
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  margin: 0 auto 100px;
  background: #fff;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: transform 1.2s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: transform 1.2s ease-in-out;
}
.cont.s--signup .sub-cont {
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}
.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  /* background-image: url("@/assets/login.jpg"); */
  background-size: cover;
  transition: transform 1.2s ease-in-out;
}
.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/login.jpg");
  background-size: cover;
}
.cont.s--signup .img:before {
  transform: translate3d(640px, 0, 0);
}
.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: transform 1.2s ease-in-out;
}
.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}
.img__text p {
  font-size: 14px;
  line-height: 1.5;
}
.cont.s--signup .img__text.m--up {
  transform: translateX(520px);
}
.img__text.m--in {
  transform: translateX(-520px);
}
.cont.s--signup .img__text.m--in {
  transform: translateX(0);
}
.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}
.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 1.2s;
}
.img__btn span.m--in {
  transform: translateY(-72px);
}
.cont.s--signup .img__btn span.m--in {
  transform: translateY(0);
}
.cont.s--signup .img__btn span.m--up {
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}
label span {
  font-size: 12px;
  color: #cfcfcf;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #77BCF4;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.cont.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 1.2s;
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  transform: translate3d(-900px, 0, 0);
}
.cont.s--signup .sign-up {
  transform: translate3d(0, 0, 0);
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;
}
.icon-link img {
  width: 100%;
  vertical-align: top;
}
.icon-link--twitter {
  left: auto;
  right: 5px;
}

.link-footer {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>