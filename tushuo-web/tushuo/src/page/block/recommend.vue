<template>
    
    <div>
        <rightbar :chiplist="chiplist"></rightbar>

        <!-- <v-row style="margin-left:10px;margin-right:10px;margin-top:5px; margin-bottom:10px;">
            <div v-for="(item,index) in chiplist" :key='index'>
                <v-chip
                    v-if="item.chip"
                    class="ma-2"
                    close
                    :color="item.color"
                    outlined
                    @click:close="item.chip = false"
                    >
                    {{item.value}}
                    </v-chip>
            </div>
        </v-row> -->

        <v-row style="margin-left:10px;margin-right:10px;margin-top:5px;"
            id = "scrolling-techniques-2">
            <div v-for="(item,index) in imglist" :key="index"
          style="margin-left:5px;margin-right:5px;margin-bottom:10px;"
        >
            <v-card
              class="mx-auto"
              max-width="400"
              :link="item.mediaPath"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="item.mediaPath"
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
        </div>
        </v-row>
    </div>
</template>

<script>
import rightbar from "@/components/rightBar"
import {getRecommendWork} from "@/api/media/work"
export default{
    name:'recommend',
    data(){
        return{
            pageSize:20,
            chiplist: [
                {
                    chip:true,
                    value:"读书",
                    color:'red'
                },
                {
                    chip:true,
                    value:"练字",
                    color:'green'
                },
                {
                    chip:true,
                    value:"小鹿",
                    color:'red'
                },
                {
                    chip:true,
                    value:"动漫",
                    color:'green'
                },
                {
                    chip:true,
                    value:"校园",
                    color:'blue'
                },
                {
                    chip:true,
                    value:"内师大",
                    color:'blue'
                },
                {
                    chip:true,
                    value:"天鹅",
                    color:'blue'
                },
                                {
                    chip:true,
                    value:"图书馆",
                    color:'blue'
                }
            ],
            imglist:[],
        }
    },
    methods:{
      greatBtn(item){
        if(item.greatStatus == 1){
          item.greatStatus =0;
        }else{
          item.greatStatus =1;
        }
      },
      shareBtn(item){
        if(item.shareStatus != 1){
          item.shareStatus =1;
        }
      },
      collectBtn(item){
        if(item.collectStatus == 1){
          item.collectStatus =0
        }else{
          item.collectStatus =1;
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
      handleScroll() {
        //let scrollTop= document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; //变量windowHeight是可视区的高度
        var pageYOffset = window.pageYOffset;
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight

        if (scrollHeight <= pageYOffset + clientHeight) {
          //获取后端数据
          getRecommendWork(this.pageSize).then(res =>{
            for(let i =0;i<res.data.data[0].length;i++){
            this.imglist.push(res.data.data[0][i])
            }
          });

        }
      }

    },
    created:function(){
      getRecommendWork(this.pageSize).then(res =>{
        for(let i =0;i<res.data.data[0].length;i++){
          this.imglist.push(res.data.data[0][i])
          // window.setInterval(() =>{
          //   setTimeout(() => {
          //   this.$redrawVueMasonry();
          //   }, 0);
          // },500)
        }
      });

    },
    mounted: function() {
      window.addEventListener("scroll", this.handleScroll, true);
    }


    ,
    components:{
        rightbar
    }
}
</script>