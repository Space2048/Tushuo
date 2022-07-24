<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          v-bind="attrs"
          v-on="on"
          class= "loginbtn"
        >
          登录
        </v-btn>
      </template>
      
      <v-card ref="form">
        <v-card-title>
          <span class="text-h5">登录</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row >
              <v-col cols="12">
                <v-text-field
                  ref="account"
                  v-model="account"
                  label="账号*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  ref="password"
                  v-model = "password"
                  label="密码*"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-btn text color="primary" @click="$router.push('/registe')">还没有账号？去注册...</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="handLogin()"
          >
            登录
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-row>
  
</template>

<script>
import {login} from "@/api/api"
export default {
  name:"loginpad",
  data: () => ({
      dialog: false,
      account: null,
      password: null,
      nickName: null,
      avatar: null,
      collage: null,
      major: null,
    }),
  computed:{
    form(){
      return {
        account: this.account,
        password: this.password
      }
    }
  },
  methods:{
    handLogin(){
        login(this.account,this.password).then(res => { 
          this.nickName = res.data.data[0].nickName;
          this.avatar = res.data.data[0].avatar;
          this.collage = res.data.data[0].college;
          this.major = res.data.data[0].major;
          this.$emit('refreshlog',this.nickName,this.avatar,this.major,this.collage)
          this.dialog = false
          if(res.code != 1){

          }
        });

    }
  }
}
</script>

<style>
  .loginbtn{
    height: 80px!important;
    background-color: transparent;
    border:none;
    box-shadow: none;
  }
  .loginbtn:hover{
    background: transparent;
    border: none;
  }
</style>