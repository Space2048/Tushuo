<template>
<v-app-bar
      app
      clipped-right
      flat
      height="72"
      hide-on-scroll
    >

    <v-app-bar-title style="margin-left:55px;margin-right:55px;color:#EF5350;">
      <router-link tag="button" to="../p1">图说 </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>


        <v-btn
      text
      color="error"
      large
      @click="goindex"
    >
      <span class="barfont">主页</span>
    </v-btn>
    <v-divider vertical inset></v-divider>
    <v-btn
      text
      color="error"
      large
      @click="$router.push('/p1/recomd')"
    >
      <span class="barfont">推荐</span>
    </v-btn>

    <v-spacer></v-spacer>

      <v-responsive max-width="200" >
        <v-text-field
          dense
          flat
          hide-details
          
          solo-inverted
          label="搜索(按 回车)"
        ></v-text-field>
      </v-responsive>


    </v-app-bar>
</template>
<script>
  export default {
    name:'headline',
    methods:{
      goindex: function(){
        this.$router.push({path: '/'})
      }
    }
  }
</script>
<style>
.barfont{
  font-size: 1.2rem;
  font-weight: 1;
}
</style>