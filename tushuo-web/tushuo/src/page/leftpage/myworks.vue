<template>
    <div>
        <div class="workListPad">
            <v-card color="white" min-height="calc(80vh)">

                <v-tabs
                v-model="tab"
                color="deep-purple accent-4"
                >
                <v-tab
                    v-for="item in tabtitle"
                    :key="item"
                >
                    {{ item }}
                </v-tab>
                <v-btn
                    absolute
                    depressed
                    color="error"
                    right
                    min-height="100%"
                    style="margin-right:50px;"
                    @click="$router.push('./upwork')"
                >
                上传稿件
                </v-btn>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in works"
                    :key="item.key"
                >
                    <v-card
                    class="mx-auto"
                    min-height="calc(80vh)"
                    style="box-shadow: 0 0 0px 0px rgb(0 0 0 / 20%), 0 0px 0px 0 rgb(0 0 0 / 14%), 0 0px 0px 0 rgb(0 0 0 / 12%);border-buttom:0;"
                    >
                        <v-list style="padding-left:30px;padding-right:30px;">
                            <v-list-item
                            v-for="(work, i) in item.workList"
                            :key="i"
                            link="http://localhost/#/p1/detail/1"
                            style="padding-left:0;margin-right:20px;border-bottom:1px solid;border-color:#AAA5A5;height:130px;"
                            >
                            <v-img :src="work.imgPath" max-height="116px" max-width="18%" style="margin-top:10px;margin-bottom:5px;radis:5px;border-radius: 10px;"></v-img>
                            <v-list-item-action-text style="width:24%;margin-left:50px;font-size: 1em;font-weight:bold;">{{work.title}}</v-list-item-action-text>
                            <v-list-item-action-text style="width:16%;align:center;margin-right:20%">{{work.uploadTime}}</v-list-item-action-text>


                            <v-list-item-action-text style="width:4%;">
                                <v-icon>mdi-heart</v-icon>
                                <div style="">{{work.greatCount}}</div>    
                            </v-list-item-action-text>

                            <v-list-item-action-text style="width:4%;">
                                <v-icon>mdi-comment-processing</v-icon>
                                <div style="">{{work.commitCount}}</div>    
                            </v-list-item-action-text>

                            <v-list-item-action-text style="width:4%;">
                                <v-icon>mdi-star</v-icon>
                                <div style="">{{work.collectCount}}</div>    
                            </v-list-item-action-text>
                            <v-list-item-action style="width:6%;">
                                <v-btn dark color="purple darken-2" @click="edit(work.workId)">编辑</v-btn>
                            </v-list-item-action>
                            
                            </v-list-item>

                            <!-- </v-list-item-group> -->
                </v-list>

            </v-card>
                <div class="text-center" style="margin-left:50px;margin-right:50px;">
                    <v-pagination
                    v-model="item.pageNum"
                    :length="item.pageLength"
                    :total-visible="10"
                    @input="onPageChange"
                    ></v-pagination>
                </div>
                    
                </v-tab-item>
                </v-tabs-items>
            </v-card>
            
        </div>
    </div>
</template>

<script>
    import {getAll} from "@/api/media/work"
    export default{
		data(){
			return{
                model: 1,
                tab: null,
                tabtitle: [
                '全部稿件', '审核中', '已通过',
                ],
                works:{
                    "allWorks":{
                        pageLength:5,
                        pageNum:1,
                        workList:[
                            {
                                workId: 1,
                                imgPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                workTitle: "这是测试标题！！！！，学习新思想",
                                workTime: "2022-3-20",
                                playNum: "17w",
                                greatNum: "12.5k",
                                commentNum: "3w",
                                collectNum: "10.3k"
                            }
                        ]
                    }
                    ,
                    "auditing":{
                        pageLength:1,
                        pageNum:1,
                        workList:[
                            {
                                workId: 1,
                                picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                workTitle: "这是测试标题！！！！，学习新思想",
                                workTime: "2022-3-20",
                                playNum: "17w",
                                greatNum: "12.5k",
                                commentNum: "3w",
                                collectNum: "10.3k"
                            },
                        ]
                    },
                    "complete":{
                        pageLength:1,
                        pageNum:1,
                        workList:[
                            {
                                workId: 1,
                                picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                                workTitle: "这是测试标题！！！！，学习新思想",
                                workTime: "2022-3-20",
                                playNum: "17w",
                                greatNum: "12.5k",
                                commentNum: "3w",
                                collectNum: "10.3k"
                            },
                        ]
                    }
                },
            }
		},
		created(){
            console.log(this.works);
            getAll(1,"全部作品").then((res)=>{
                this.works["allWorks"] = res.data.data[0];
            });
            getAll(1,"审核中").then((res)=>{
                this.works["auditing"] = res.data.data[0];
            });
            getAll(1,"已通过").then((res)=>{
                this.works["complete"] = res.data.data[0];
            });
            console.log(this.works);
		},
        computed:{
            // works["allWorks"].pageNum: function(){

            // }
        },
		methods:{
            onPageChange: function(page){
                if(this.tab == 0){
                    getAll(page,"全部作品").then((res)=>{
                    this.works["allWorks"] = res.data.data[0];
                    });
                }else if(this.tab == 1){
                    getAll(page,"审核中").then((res)=>{
                    this.works["auditing"] = res.data.data[0];
                });
                }
                else if(this.tab == 2){
                    getAll(page,"已通过").then((res)=>{
                    this.works["complete"] = res.data.data[0];
                    });
                }
            },
            edit: function(workid){
                //http://localhost/#/p1/upwork
                this.$router.push({path: './edit?id='+workid})
            }

            
		}
	}

    // export default{
    //     data(){
    //         return {
    //             model: 1,
    //             tab: null,
    //             tabtitle: [
    //             '全部稿件', '审核中', '已通过',
    //             ],
    //             works:{
    //                 "allWorks":{
    //                     pageLength:5,
    //                     pageNum:1,
    //                     workList:[
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "3w",
    //                             collectNum: "10.3k"
    //                         },
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-1-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "30k",
    //                             collectNum: "20k"
    //                         },
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "30k",
    //                             collectNum: "20k"
    //                         },
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "30k",
    //                             collectNum: "20k"
    //                         },
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "30k",
    //                             collectNum: "20k"
    //                         },
    //                     ]
    //                 }
    //                 ,
    //                 "auditing":{
    //                     pageLength:1,
    //                     pageNum:1,
    //                     workList:[
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "3w",
    //                             collectNum: "10.3k"
    //                         },
    //                     ]
    //                 },
    //                 "complete":{
    //                     pageLength:1,
    //                     pageNum:1,
    //                     workList:[
    //                         {
    //                             workId: 1,
    //                             picPath: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    //                             workTitle: "这是测试标题！！！！，学习新思想",
    //                             workTime: "2022-3-20",
    //                             playNum: "17w",
    //                             greatNum: "12.5k",
    //                             commentNum: "3w",
    //                             collectNum: "10.3k"
    //                         },
    //                     ]
    //                 }
    //             },
    //         }
    //         },
    //     created:() =>{
    //         console.log(this.model);
    //     }
                    // getAll(1,"全部作品").then((res)=>{
            //     delete this.works["allWorks"];
            //     this.works["allWorks"] = res.data.data[0];
            //     console.info(res.data.data[0])
            // });
            // getAll(1,"审核中").then((res)=>{
            //     delete this.works["auditing"];
            //     this.works["auditing"] = res.data.data[0];
            // });
            // getAll(1,"已通过").then((res)=>{
            //     delete this.works["complete"];
            //     this.works["complete"] = res.data.data[0];
            // });
        
</script>
<style>
    .workListPad{
        width: 80%;
        margin-left: 10%;
        margin-top: 1%;
        min-height: calc(80vh);
    }
    /* Helper classes */
    .basil {
    background-color: #FFFBE6 !important;
    }
    .basil--text {
    color: #356859 !important;
    }

</style>
