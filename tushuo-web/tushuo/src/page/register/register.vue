<template>
  <div id="page">
    <v-row>
      <v-spacer></v-spacer>
        <v-col>
          <div style="color:#EF6D6D;font-size:1.5em;">注册</div>
        </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
    <v-spacer></v-spacer>
    <v-col>
        <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-row>
      <v-text-field
      v-model="email"
      :rules="emailRules"
      label="邮箱"
      required
    ></v-text-field>
    </v-row>
    <v-row>
      <v-text-field
      v-model="code"
      :counter="6"
      :rules="nameRules"
      label="验证码"
      required
    ></v-text-field>
        <v-btn
      depressed
      :loading="loading"
      :disabled="loading"
      color="primary"
      style="margin-top:1rem;margin-left:0.2rem;"
      @click="getcode"
    >
      发送验证码
      <template v-slot:loader>
        <span>{{btn_msg}}</span>
      </template>
    </v-btn>
    </v-row>

    <v-row>
          <v-text-field
      v-model="password"
      :counter="15"
      label="密码"
      type="password"
      required
    ></v-text-field>
    </v-row>
    
        <v-row>
          <v-text-field
      v-model="repassword"
      :counter="15"
      :rules="repasswordRules"
      label="确认密码"
      type="password"
      required
    ></v-text-field>
    </v-row>

      <v-btn
      :disabled="!valid"
      color="success"
      @click="sendRegister"

    >
      注册
    </v-btn>
    <v-btn
      color="error"
      @click="$router.push('/')"

    >
      取消
    </v-btn>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  </v-form>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
  </div>
</template>
<script>
import {sendEmail,register} from "@/api/api.js"
export default({
    name:"register",
    data(){
        return{
            loader: null,
            loading: false,
            valid: true,
            name: '',
            nameRules: [
                v => !!v || '验证码必须填写',
                v => (v.length == 6) || '验证码格式错误',
            ],
            email: '',
            emailRules: [
                v => !!v || '邮箱必须填写',
                v => /.+@.+\..+/.test(v) || '邮箱格式不正确',
            ],
            repasswordRules:[
                v => !!v || '请确认密码',
                v => (v == this.password) || '两次密码不一致',
            ],
            code: '',
            password: '',
            repassword: '',
            btn_msg: "发送中...",
            uuid: '',
        }
    },
    methods:{
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        sendEmail (){
            
        },
        cancelToIndex (){
          // this.$router.push('/')
        }
    },
    watch: {
      // loader () {
      //   const l = this.loader
      //   this[l] = !this[l]
      //   setTimeout(() => (this.btn_msg = "重新发送"), 3000)
      //   var count = 60
      //   setTimeout(() =>(this[l] = false),62000)
      //   setInterval(() => (this.btn_msg = "重新发送("+count--+")"), 1000)
      //   this.loader = null
      // },
    },
    methods: {
      //注册
      sendRegister(){
        console.log(this.$refs.form.validate());
        if(this.repassword != this.repassword || this.password === null || this.password == '' ){
          alert("密码错误")
          return
        }
        else{
          register(1,this.email,this.password,this.uuid,this.code).then(
            function(res){
              $router.push('/')
            }
          ).catch(function(err){console.log(err)})
        }
      },
      //获取验证码
      getcode(){
        if(this.email == '' || this.email == null){
          alert("邮箱不能为空!")
          return 
        }
        this.uuid = this.getUUID();
        sendEmail(this.email,this.uuid).then(function(res){}).catch(function(err){console.log(err)})
        
        this.loading = true
        setTimeout(() => (this.btn_msg = "重新发送"), 3000)
        var count = 60
        setTimeout(() =>(this.loading = false),62000)
        setInterval(() => (this.btn_msg = "重新发送("+count--+")"), 1000)
      },
      getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
        });
      },

    }


})
</script>
