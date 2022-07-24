<template>
    <v-card
    class="mx-auto"
    max-width="100%"
  >
    <v-list>

      <v-list-group
          v-for="keys in userList"
          :key="keys.id"
          :value="true"
          v-model="keys.active"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="keys.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in keys.items"
            :key="subItem.id"
          >
            
            <v-list-item-avatar style="margin-right:20px;margin-left:20px;">
              <v-img :src = "subItem.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="text-start">
            <v-list-item-title >{{subItem.title}}</v-list-item-title>
            <v-list-item-subtitle >{{subItem.path}}</v-list-item-subtitle>
          </v-list-item-content>
            <v-list-item-action
              style="margin-right: 40px;"
            >
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="delFrend(subItem)"
              >
                取消关注
              </v-btn>
            </v-list-item-action>
          
          </v-list-item>

        </v-list-group>
    </v-list>
  </v-card>
</template>
<script>
export default({
    data: () => ({
      items: [
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
          chilren: {
              icon: 'mdi-star',
              text: 'Star',
          }
        },
        {
          icon: 'mdi-star',
          text: 'Star',
        },
        {
          icon: 'mdi-send',
          text: 'Send',
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts',
        },
      ],
      userList: [
          {
              "id": 1,
              "title": "默认列表",
              "path": "/item",
              "pid": 0,
              "sid": "7, 8, 9, 10",
              "description": "",
              "create_time": "2019-12-19 16:46:29",
              "modify_tiem": "2019-12-23 18:28:05",
              "action": "apps",
              "show": true,
              "items": [
                  {
                      "id": 7,
                      "title": "LALALa",
                      "avatar":"https://i.pinimg.com/564x/52/91/44/529144d265566ddb9e91863b50af48ae.jpg",
                      "path": "最是一年春好处绝胜烟柳满皇都",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 8,
                      "title": "双子座",
                      "avator":"",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 9,
                      "title": "PDD",
                      "avatar":"https://img2.baidu.com/it/u=3994981141,644842747&fm=253&fmt=auto&app=138&f=JPEG?w=353&h=220",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 10,
                      "title": "半佛仙人", 
                      "avatar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg3quyA_wwwkZW5v1_gMXbWrNQDAcNcJx0xg&usqp=CAU",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
              ]
          }
            ,
                      {
              "id": 1,
              "title": "自定义列表",
              "path": "/item",
              "pid": 0,
              "sid": "7, 8, 9, 10",
              "description": "",
              "create_time": "2019-12-19 16:46:29",
              "modify_tiem": "2019-12-23 18:28:05",
              "action": "apps",
              "show": true,
              "items": [
                  {
                      "id": 7,
                      "title": "杨过",
                      "avatar":"https://img1.baidu.com/it/u=3017869287,851152612&fm=253&fmt=auto&app=120&f=JPEG?w=307&h=500",
                      "path": "最是一年春好处绝胜烟柳满皇都",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 8,
                      "title": "张飞",
                      "avatar":"https://img2.baidu.com/it/u=1244167863,551934075&fm=253&fmt=auto&app=138&f=JPEG?w=673&h=500",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 9,
                      "title": "小龙女",
                      "avatar":"https://img1.baidu.com/it/u=4125806926,1742433428&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=500",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
                  {
                      "id": 10,
                      "title": "乔峰", 
                      "avatar":"https://img0.baidu.com/it/u=400826452,4175652044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=399",
                      "path": "这是个性签名！！！！",
                      "pid": 2,
                      "sid": "",
                      "description": "",
                      "create_time": "2019-12-19 16:56:07",
                      "modify_tiem": "2019-12-19 16:56:07",
                      "action": ""
                  },
              ]
          }
            ],
      model: 1,
    }),
    methods:{
      delFrend(subItem){
        for(var i=0;i<this.userList.lenght;i++){
          for(var j=0;j<this.userList[i].items.lenght;j++){
            if(this.userList[i].items[j] == subItem){
              this.userList[i].items = this.userList[i].items.splice(j,1);
            }
          }
        }
      }
    }
    


})
</script>
