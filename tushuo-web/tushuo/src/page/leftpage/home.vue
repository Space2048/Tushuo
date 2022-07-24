<template>
    <div>
        <v-row>
          <v-img
          src="https://raw.githubusercontent.com/Space2048/Tuchuang/main/202202241111692.png"
          max-height="100"
          style="margin-top:-10px;"
          >
          </v-img>
        </v-row>
        <v-row>
      <v-spacer></v-spacer>
      <v-col>
            <v-img
          src="/api/default.jpg"
          max-width="400"
          max-height="240"
          style="margin-left:30%;margin-top:5%;"
            >
            </v-img>
            
            <!-- <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              @imageuploaded="imageuploaded"
              :data="data"
              :max-file-size="5242880"
              url="http://101.198.151.190/api/upload.php"
              style="margin-left:25%;margin-top:5%;" >
            </vue-core-image-upload> -->
            <input v-show="false" ref="fileRef" type="file" @change="fileChange">
            <v-btn
            align-self="center"
            color="primary"
            style="margin-left:25%;margin-top:5%;"
            @click="uploadFile"
            >
              更换头像
            </v-btn>

      </v-col>

      <v-col>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="nickName"
                :counter="10"
                :rules="nameRules"
                label="昵称"
                required
              ></v-text-field>

              <v-select
                v-model="collage"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="学院"
                required
              ></v-select>

              <v-text-field
                v-model="major"
                label="专业"
                required
              ></v-text-field>

              <v-text-field
                v-model="remark"
                label="骚话"
                required
              ></v-text-field>

              <v-btn
                color="success"
                class="mr-4"
                @click="saveBtn"
              >
                保存修改
              </v-btn>
              <v-btn
                color="error"
                @click="Logout"
              >
                退出登录
              </v-btn>
            </v-form>
      </v-col>
      <v-spacer></v-spacer>

    </v-row>
    </div>
</template>

<script>
import {getLoginInfo,logout,edit} from "@/api/api"
//import VueCoreImageUpload  from 'vue-core-image-upload';
export default {
    data: ()=>{
      return{
          avator:"",
          nickName:"",
          collage:"",
          major:"",
          items: [
            '计算机科学技术学院',
            '研究生院',
            '教育学院',
            '蒙古学学院',
            '民族学人类学学院',
            '文学院',
            '新闻传播学院',
            '马克思主义学院',
            '历史文化学院',
            '经济管理学院',
            '政府管理学院',
            '旅游学院',
            '外国语学院',
            '数学科学学院',
            '物理与电子信息学院',
            '化学与环境科学学院',
            '生命科学与技术学院',
            '地理科学学院',
            '心理学院',
            '音乐学院',
            '体育学院',
            '美术学院',
            '国际设计艺术学院',
            '工艺美术学院',
            '国际交流学院',
            '继续教育学院',
            '二连国际学院',
            '科学技术史研究学院',
          ],
          remark:"",  //个性签名
        }
    },
    methods:{
      saveBtn(){
        edit(this.nickName,this.collage,this.major,this.remark).then(res => {
          alert(res.data.tipMsg);
        })
      },
      Logout(){
        logout().then(res =>{
          this.$router.push("/")
        })
      },
      uploadFile() {
        this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
      },
      fileChange() {
      // 上传文件
      }
    },
    created: function(){
          getLoginInfo().then(res => {
            this.nickName = res.data.data[0].nickName;
            this.avatar = res.data.data[0].avatar;
            this.collage = res.data.data[0].college;
            this.major = res.data.data[0].major;
            this.remark = res.data.data[0].content;
          })
    },
    components: {
    // 'vue-core-image-upload': VueCoreImageUpload
  },

}
</script>
<style>

</style>