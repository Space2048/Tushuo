<template>
    <div id="hotapp">
            <v-card style="margin-bottom:10px;">
              <v-tabs
                background-color="red lighten-1"
                center-active
                dark
                
              >
                <v-tab v-for="typename in types" :key="typename" @click=changeTab(typename)>
                    {{typename}}
                </v-tab>

                
              </v-tabs>

            </v-card>
        
    <div id="mainpad" v-masonry  transition-duration="0.3s" stagger="0.03s" item-selector=".item" gutter=10>
        <div v-masonry-tile class="item" v-for="(item,index) in imglist" :key="index"
        >
            <v-col style="padding-top:0;padding-bottom:3;padding-left:0;padding-right:0;">
              <v-card
              class="mx-auto card"
              link
            >
              <v-img
                class="white--text align-end"
                :src="item.mediaPath"
                max-width="400"
                :min-height="item.imgHeight"
                @click="toDetail(item.workId)"
              >
              
              </v-img>
              <!-- <v-card-title>鬼刀</v-card-title> -->

              <v-card-text class="text--primary text-start" style="font-size:0.857em;font-weight:500;font-family:Roboto;padding-bottom:3px;">
                <div>{{item.workName}}</div>
              </v-card-text>
              <v-card-subtitle class="pb-0 text-start" style="padding-top:3px;">
                {{item.authorName}}
              </v-card-subtitle>
              <v-card-actions>
                  <v-btn
                        icon
                        color="red"
                        @click="greatBtn(item)"
                      >
                        <v-icon v-if="item.greatStatus == 1">mdi-heart</v-icon>
                        <v-icon v-else>mdi-heart-outline</v-icon>
                  </v-btn>
                  
                  <v-btn
                        icon
                        color="yellow"
                        @click="collectBtn(item)"
                      >
                        <v-icon v-if="item.collectStatus == 1">mdi-star</v-icon>
                        <v-icon v-else>mdi-star-outline</v-icon>

                  </v-btn>

                  <v-btn
                        icon
                        color="blue"
                        @click="shareBtn(item)"
                      >
                        <v-icon v-if="item.shareStatus == 1">mdi-share</v-icon>
                        <v-icon v-else>mdi-share-outline</v-icon>
                  </v-btn>
                  
                <v-btn
                  color="orange"
                  text
                >
                  关注
                </v-btn>

                <v-btn
                  color="orange"
                  text
                  @click="downloadImg(item.mediaPath)"
                >
                  下载
                </v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
        </div>

    </div>
    
    </div>
</template>
<script>
import {getHotWork,upLike,getType} from "@/api/media/work"
export default {
    name:'hot',
    data(){
      return {
        pagenum:1,
        timer:'',
        now_width:document.body.clientWidth,
        pageNum:1,
        types:[
            "热门",
            "榜单",
            "读书",
            "校园",
            "游戏",
            "绘画",
        ],
        btnicon:[
          {

          }
        ],
        imglist:[],

      }
    },
    methods:{
      getlist(){
     
      },
      changeTab(typename){
          getType(typename).then(res=>{
          this.imglist = [];
          for(let i =0;i<res.data.data[0].length;i++){
          this.imglist.push(res.data.data[0][i])
          this.$redrawVueMasonry()
          }
        })
        
      },
      greatBtn(item){
        upLike(item.workId).then(res =>{
            if(res.data.code == -1){
              alert(res.data.tipMsg);
            }
          })
        if(item.greatStatus == 0){
          item.greatStatus =1;
        }else{
          item.greatStatus =0;
        }
      },
      shareBtn(item){
        if(item.shareStatus == 0){
          item.shareStatus =1;
        }else{
          item.shareStatus =0;
        }
      },
      collectBtn(item){
        if(item.collectStatus == 0){
          item.collectStatus =1;
        }else{
          item.collectStatus =0;
        }
      }
      ,
      handleScroll() {
        const container =  document.getElementById('hotapp');

        let scrollTop= document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; //变量windowHeight是可视区的高度
        var pageYOffset = window.pageYOffset;
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight

        if (scrollHeight <= pageYOffset + clientHeight+1) {
          //获取后端数据
          getHotWork(this.pagenum,20).then(res =>{
            this.pagenum = this.pagenum+1;
            for(let i =0;i<res.data.data[0].length;i++){
              this.imglist.push(res.data.data[0][i])
            }
          });

        }
      },
      downloadImg(url){
        this.downloadPicture(url,url.slice(-10))
      },
      downloadPicture(imgSrc, name) {
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.src = imgSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.download = name || "photo";
          a.href = url;
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        });
      };
    },
      toDetail(id){
        var to = 'p1/detail/'+id
        this.$router.push({path:to})
      }

    },
    created:function(){
      getHotWork(this.pagenum,20).then(res =>{
        this.pagenum = this.pagenum+1;
        for(let i =0;i<res.data.data[0].length;i++){
          this.imglist.push(res.data.data[0][i])
          window.setInterval(() =>{
            setTimeout(() => {
            this.$redrawVueMasonry();
          }, 0);
          },500)

          // setTimeout(() => {
          //   this.$redrawVueMasonry();
          // }, 3000);
        }
      });
    },
    watch:{
      now_width: function(){
        console.log(this.now_width);
      }
    },
    mounted: function() {
      window.addEventListener("scroll", this.handleScroll, true);
    }
}
</script>


<style>
</style>
