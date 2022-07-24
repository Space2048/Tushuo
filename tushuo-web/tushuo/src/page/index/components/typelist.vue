<template>
<!-- 首页导航条 -->
    <v-card style="margin-bottom:10px;">
    <v-tabs
      background-color="red lighten-1"
      center-active
      dark
    >
      <v-tab v-for="typename in types" :key="typename" :change = changeTab(typename)>
          {{typename}}
      </v-tab>

      
    </v-tabs>

  </v-card>

</template>
<script>
export default{
    name:'typelist',
    data() {
        return{
            types:[
            "热门",
            "榜单",
            "读书",
            "校园",
            "游戏",
            "绘画",
        ]
        }
        
    },
    methods:{
      changeTab(typename){
        console.log(typename)
      }
    }

}
</script>