<template>
    <v-navigation-drawer
        app 
        permanent
        expand-on-hover
        
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img v-bind:src ="avatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content v-show="logpad">
              <v-list-item-title class="text-h6">
                  <loginpad v-on:refreshlog="refreshtab"></loginpad>
              </v-list-item-title>
            </v-list-item-content>
            
            <v-list-item-content v-show="!logpad" @click="$router.push('/p1/home')">
            <v-list-item-title class="text-h6">
              {{nickName}}
            </v-list-item-title>
            <v-list-item-subtitle>{{collage}}</v-list-item-subtitle>
          </v-list-item-content>
          
          </v-list-item>

        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
        <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in menulist"
          :key="i"
          @click="jumpurl(item.url)"
        >
          <v-list-item-icon>
            <v-icon :color="item.iconcolor" v-text="item.iconname"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

         
        </v-list>
       
      </v-navigation-drawer>
</template>

<script>

import Loginpad from './loginpad.vue';
import {getinfo} from '@/api/api'
export default {
  name:'leftbar',
  props:{
    
  },
  components:{
    Loginpad
  },
  data: ()=> ({
  grouplist: 1,
  avatar:'https://files.catbox.moe/eb4aov.jpg',
  nickName: "",
  major:"",
  collage:"",
  logpad: true,
  drawerd:true,
  listbar:false,
  dialog : false,
  user_email:"",
  model: 1,
  menulist: [
    {
      name:'我的喜欢',
      iconname: 'mdi-heart',
      iconcolor: 'red lighten-1',
      url:'/p1/love',
    },
    {
      name:'我的关注',
      iconname: 'mdi-account-multiple',
      iconcolor: 'blue darken-1',
      url:'/p1/attention',
    },
    {
      name:'我的消息',
      iconname: 'mdi-comment',
      iconcolor: 'teal darken-1',
      url:'/p1/message',
    },
    {
      name:'我的稿件',
      iconname: 'mdi-file',
      iconcolor: 'deep-purple lighten-2',
      url:'/p1/myworks',
    },
  ]

  }),
  methods:{
    jumpurl(url){
      this.$router.push(url)
    },
    refreshtab(nickName,avatar,major,collage){
      this.logpad = false
      this.nickName = nickName
      this.avatar = avatar
      this.major = major
      this.collage = collage
    }
    
  },
  created:function (){
    getinfo().then(res =>{
      if(res.data.code == -1){

        return
      }
      this.logpad = false;
      this.nickName = res.data.data[0].nickName;
      this.avatar = res.data.data[0].avatar;
      this.collage = res.data.data[0].college;
      this.major = res.data.data[0].major;
    })
  } 
  ,
  computed:{
  }
}
</script>
<style>
#logoline{
  color: #FF7777;
  font-weight: bold;
  font-family: 黑体;
  
}
</style>