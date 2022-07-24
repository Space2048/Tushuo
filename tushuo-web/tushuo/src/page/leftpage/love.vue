<template>
    <div >
        <v-card
        elevation="2"
        outlined
        shaped
        style="margin-left:20px; margin-right:20px;margin-top:10px;margin-bottom:20px;"
        >
        <v-card-title><span style="color:#EF6D6D;">{{nickName}}</span>&nbsp;&nbsp;的喜好分析:</v-card-title>
        <v-card-text class="text-start">
            <span>喜爱标签统计图:</span>
            <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
                elevation="12"
                max-height="200"
                max-width="calc(100% - 700px)"
                >
                <v-sparkline
                    :labels="labels"
                    :value="value"
                    color="white"
                    line-width="2"
                    padding="16"
                ></v-sparkline>
                
                </v-sheet>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-start">
            最近观看的作者:
        </v-card-text>
            <v-chip
            class="ma-2"
            color="pink"
            label
            text-color="white"
            v-for="(item,index) in authorList"
            :key="index"
            @click="alert(item.nickName)"
            >
            <v-icon left>
                mdi-label
            </v-icon>
            {{item.nickName}}
            </v-chip>
        </v-card>
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
                <div v-for="(item,index) in loveWorkList" :key="index"
                style="margin-left:40px; margin-right:20px;margin-top:10px;margin-bottom:20px;"
                >
                    <v-card
            class="mx-auto"
            max-width="400"
            link
        >
            <v-img
            class="white--text align-end"
            height="200px"
            :src="item.src"
            >
            </v-img>
            <!-- <v-card-title>鬼刀</v-card-title> -->

            <v-card-text class="text--primary text-start" style="font-size:0.857em;font-weight:500;font-family:Roboto;padding-bottom:3px;">
            <div>鬼刀是我最喜欢的一部剧感谢大家支持</div>
            </v-card-text>
            <v-card-subtitle class="pb-0 text-start" style="padding-top:3px;">
            天才小熊猫
            </v-card-subtitle>
            <v-card-actions>
                <v-btn
                    icon
                    color="red"
                    >
                    <v-icon v-if="icon == 1">mdi-heart</v-icon>
                    <v-icon v-else>mdi-heart-outline</v-icon>
                </v-btn>
                
                <v-btn
                    icon
                    color="yellow"
                    >
                    <v-icon>mdi-star-outline</v-icon>
                </v-btn>

                <v-btn
                    icon
                    color="blue"
                    >
                    <v-icon>mdi-share-outline</v-icon>
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
    import {getLoveWork,upLike} from "@/api/media/work"
    
    export default({
        name:'love',
        data(){
            return{
                icon: 1,
                nickName:'余帅',
                authorList:[
                    {
                        nickName:'双子座',
                        userId:'sdsdd',
                    },
                    {
                        nickName:'中国共青团',
                        userId:'sdsdd',
                    },
                    {
                        nickName:'四川观察',
                        userId:'sdsdd',
                    },
                    {
                        nickName:'老番茄',
                        userId:'sdsdd',
                    },
                    {
                        nickName:'我叫何同学',
                        userId:'sdsdd',
                    },
                    {
                        nickName:'狂神',
                        userId:'sdsdd',
                    },
                ],
                labels: [
                    '读书',
                    '练字',
                    '食堂',
                    '课程',
                    '老师',
                    '赛车',
                    '计算机',
                    '校园',
                ],
                value: [
                    50,
                    70,
                    17,
                    80,
                    100,
                    120,
                    125,
                    139,
                ],
                imglist:[
                ]

            }
        },
        created: function(){
            getLoveWork().then(res=>{
                for(let i =0;i<res.data.data[0].length;i++){
          this.imglist.push(res.data.data[0][i])
          // window.setInterval(() =>{
          //   setTimeout(() => {
          //   this.$redrawVueMasonry();
          //   }, 0);
          // },500)
        }
            })
        },
        methods:{
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
        }
    })
</script>