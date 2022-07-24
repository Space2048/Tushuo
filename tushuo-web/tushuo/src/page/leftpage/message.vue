<template>
    <div>
      <v-row>
        <v-col cols="3">
           <v-virtual-scroll
            :bench="benched"
            :items="friend"
            height="700"
            item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item" link @click="avtiveUser(item)">
                <v-list-item-action>
                  <v-avatar >
                <v-img :src ="item.avatar"></v-img>
              </v-avatar>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{item.friendName}}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon small>
                    mdi-open-in-new
                  </v-icon>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-col>
        <v-col cols="9">
           <v-card
            class="mx-auto"
            outlined
          >
              <v-list-item-content>
                <div class="text-overline mb-4">
                  {{nowTalk}}
                </div>
              </v-list-item-content>
              <v-card
            outlined
            height="400px"
          ><v-virtual-scroll
        :bench="benched"
        :items="items"
        height="400"
        item-height="64"
      >
        <template v-slot:default="{ item }">
          <v-list-item :key="item" style="border:none">
            <v-list-item-action>
              <v-avatar v-if="item.person === 'you'" >
                <v-img src ="http://i.qqkou.com/i/1a4135408666x853817875b26.jpg"></v-img>
              </v-avatar>
            </v-list-item-action>

            <v-list-item-content>
              <!-- <v-chip
                  class="ma-2"
                  v-if="item.person === 'me'"
                  style=" text-align: left;"
                >
                  {{ item.msg }}
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                  v-if="item.person === 'you'"
                  style=" text-align: right;"
                >
                  {{ item.msg }}
                </v-chip> -->
              <v-list-item-title v-if="item.person === 'you'" style=" text-align: left;">
                {{ item.msg }}
              </v-list-item-title>
              <v-list-item-title v-if="item.person === 'me'" style=" text-align: right;">
                {{ item.msg }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-avatar v-if="item.person === 'me'" >
                <v-img src ="data:image/webp;base64,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"></v-img>
              </v-avatar>
            </v-list-item-action>

          </v-list-item>

          <v-divider></v-divider>
        </template>
      </v-virtual-scroll></v-card>
           <v-card
           height="250">
              <v-toolbar dense
              style="shade;">
                <!-- <v-overflow-btn
                  :items="dropdown_font"
                  label="Select font"
                  hide-details
                  class="pa-0"
                ></v-overflow-btn> -->

                <template v-if="$vuetify.breakpoint.mdAndUp">


                  <v-btn
                      :value="1"
                      text
                    >
                      <v-icon>mdi-emoticon-outline</v-icon>
                    </v-btn>

                    <v-btn
                      :value="2"
                      text
                    >
                      <v-icon>mdi-camera-image</v-icon>
                    </v-btn>

                  <v-btn-toggle
                    v-model="toggle_multiple"
                    color="primary"
                    dense
                    group
                    multiple
                  >
                    <v-btn
                      :value="3"
                      text
                    >
                      <v-icon>mdi-format-underline</v-icon>
                    </v-btn>

                    <v-btn
                      :value="4"
                      text
                    >
                      <v-icon>mdi-format-bold</v-icon>
                    </v-btn>
                  </v-btn-toggle>

                  <div class="mx-4"></div>

                  <v-btn-toggle
                    v-model="toggle_exclusive"
                    color="primary"
                    dense
                    group
                  >
                    <v-btn
                      :value="1"
                      text
                    >
                      <v-icon>mdi-format-align-left</v-icon>
                    </v-btn>

                    <v-btn
                      :value="2"
                      text
                    >
                      <v-icon>mdi-format-align-center</v-icon>
                    </v-btn>

                    <v-btn
                      :value="3"
                      text
                    >
                      <v-icon>mdi-format-align-right</v-icon>
                    </v-btn>

                    <v-btn
                      :value="4"
                      text
                    >
                      <v-icon>mdi-format-align-justify</v-icon>
                    </v-btn>
                    
                  </v-btn-toggle>
                  <v-btn
                      text
                      color="green"
                      style="margin-left:450px"
                      @click="sendMsg"
                    >
                      发送
                    </v-btn>
                </template>
              </v-toolbar>
              <v-textarea
      name="input-7-1"
      filled
      label="从这里开始"
      rows="9"
      row-height="20"
      auto-grow
      v-model="nowTxt"
    ></v-textarea>
           </v-card>
          </v-card>
        </v-col>
        </v-row>
    </div>
</template>
<script>
  import {getFriendList} from "@/api/message/message"

  export default {
  
    data: () => ({
      benched: 0,
      nowTxt:"",
      items:[
        {msg:"你好",person:"you"},
        {msg:"在不在",person:"you"},
        {msg:"在",person:"me"},
        {msg:"你干什么！",person:"you"}
      ],
      friend:[
        {
          friendId:"1",
          friendName: "小新",
          avatar:"http://i.qqkou.com/i/1a4135408666x853817875b26.jpg",
          userLink:"",
        },
        {
          friendId:"2",
          friendName: "动感超人",
          avatar:"https://inews.gtimg.com/newsapp_bt/0/12990576915/1000",
          userLink:"",
        }
      ],
      nowTalk:'小新'
    }),
    methods:{
      avtiveUser(item){
        this.nowTalk = item.friendName;

        this.items = [];
      },
      sendMsg(){
        console.log(this.nowTxt)
        var table = {msg:this.nowTxt,person:"me"};
        this.items.push(table);
        console.log(table);
        this.nowTxt = "";
      }
    }
    ,
    computed: {

    },
    created:function(){
          getFriendList().then(res =>{
          this.friend=[];
          if(res.data.code != -1){
            this.friend=res.data.data; 
            console.log(this.friend);
          }
        })
    }
  }
</script>
