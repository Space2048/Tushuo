<template>
    <v-container>
        <v-row>
            <v-col col="5" class="justify-center">
                    <v-img
                    contain="true"
                    :src="imgUrl"
                    :lazy-src="demoImg"
                    max-width="600px"
                    max-height="338"
                    style="margin-top:120px;margin-bottom:50px;margin-left:60px"
                >
                </v-img>

                <div class="up-div">
                  <div class="file-upload-text">上传图片</div>
                  <input class= "upbtn" type="file" id="file" multiple @change="uploadimg($event)" accept="image/*">
                </div>
      
            </v-col>
            <v-col cols="7" class="justify-center">
                <!-- //作品标题 -->
                <v-text-field
                    v-model="title"
                    :counter="30"
                    label="作品标题"
                    :rules="titlerules"
                    required
                    style="margin-top:110px;"
                ></v-text-field>
                <!-- //文本框-作品介绍 -->
                <v-textarea
                solo
                auto-grow
                v-model="content"
                name="input-7-4"
                :rules="contentrules"
                label="作品简介"
                ></v-textarea>

               <!-- 自动填充- 标签 -->
                <v-autocomplete
              v-model="selectedTabs"
              :items="existTabs"
              filled
              chips
              color="blue-grey lighten-2"
              label="标签"
              item-text="name"
              item-value="name"
              multiple
              :search-input.sync="nowInput"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
            <div style="margin-top:50px;">
              <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  x-large
                  @click="uploadWork"
                >
                  保存作品
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  color="error"
                  x-large
                  @click="saveWork()"
                  :disabled="delBtn"
                >
                  删除作品
                </v-btn>
            </div>
                
            </v-col>

        </v-row>

    </v-container>
</template>
<script>
import{searchTags,upwork,tranTag,upTags} from "@/api/media/work"
export default {
  
    data: ()=>{
        return{
            imgUrl: 'https://raw.githubusercontent.com/Space2048/Tuchuang/main/202204161517174.png',
            demoImg: require('../../assets/img/demo.png'),
            autoUpdate: true,
            nowInput: null,
            nowInsert:null,
            selectedTabs: [],
            isUpdating: false,
            name: 'Midnight Crew',
            existTabs: [
            {name:'学校',tagId:-1}
            ],
            title: '',
            content: '',
            file: null,
            titlerules: [
              value => !!value || '标题不能为空',
              value => (value && value.length >= 3) || '标题太短',
              value => (value && value.length < 30) || '不得超过30个字符',
            ],
            contentrules: [
              value => !!value || '简介不能为空',
              value => (value && value.length < 1000) || '不得超过1000个字符',
            ],
            delBtn: false,

         }
    },
    watch: {
      selectedTabs (){
        this.nowInput = '';
      },
      nowInput (val){
        var value = {name: val,tagId: -1}
        //搜索
        val && -1 == this.selectedTabs.indexOf(value) && this.querySelections(value)

        if(this.nowInsert != null){
          var list = [];
          for(var i=0;i<this.selectedTabs.length;i++){
            let obj = this.existTabs.find(o => o.name===this.selectedTabs[i]);
            var li = {name: this.selectedTabs[i],tageId: obj.tagId}
            list.unshift(obj);
          }
          this.existTabs = list;
        }
        if(val != ''){
            this.existTabs.unshift(value)
            this.nowInsert = value
        }
        else{
            this.nowInsert = null
        }
        
      }
    },
    methods: {
      async uploadWork(){
        //if(this.file == null || this.title == '' || this.content == ''){
          //alert("存在空数据");
          //return
        //}
        var tagList = [];
        //翻译标签
        for(var i =0;i<this.selectedTabs.length;i++){
          let obj = this.existTabs.find(o => o.name===this.selectedTabs[i]);
          var pattern = new RegExp("[\u4E00-\u9FA5]+");
          var li = {}
          var enName = "";
          var zhName = "";
          if(pattern.test(this.selectedTabs[i]) && obj.tagId == -1){ //该字符串是中文
                    await tranTag(this.selectedTabs[i]).then(res=> {
                      enName = res.data.data[0]
                      li = {"tagName": this.selectedTabs[i],"tagEnName":enName,"tagId": obj.tagId}
                    })            
          }
          else if(obj.tagId == -1){
                    await tranTag(this.selectedTabs[i]).then(res=> {
                      zhName = res.data.data[0]
                      li = {"tagName": zhName,"tagEnName":this.selectedTabs[i],"tagId": obj.tagId}
                    })      
          }
          tagList.push(li)
        }
        let tagIds = []
        //上传标签
        await upTags(tagList).then(res => {
          tagIds = res.data.data
        })

        let param = new FormData()
        param.append("file", this.file)
        param.append('title',this.title)
        param.append('content',this.content)
        param.append('tagList',tagIds)
        await upwork(param).then(res =>{
          if(res.data.code == 1){
            
            alert("上传成功");
          }
        });
        this.$router.push({path: './myworks'})

      },
      uploadimg(e){
        this.file = e.target.files[0];
        this.imgUrl =this.getObjectURL(this.file);
        console.info(this.file)
      },
      //获取图片地址
      getObjectURL (file) {
      let url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      }else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      }
      return url ;
    }
      ,
      remove (item) {
        const index = this.selectedTabs.indexOf(item.name)
        if (index >= 0) this.selectedTabs.splice(index, 1)
      },
      querySelections (val){
          setTimeout(() => {
            searchTags(val.name).then(res =>{
              if(res.data.code == 1){
                var TagId = '';
                var dataLine = res.data.data[0];
                var pattern = new RegExp("[\u4E00-\u9FA5]+");
                for(var i=0;i<dataLine.length;i++){
                  TagId = dataLine[i].tagId;
                  var Name = '';
                  if(pattern.test(val.name)){
                    //该字符串是中文
                    Name = dataLine[i].tagName;  
                  }else{
                    Name = dataLine[i].tagEnName;
                  }
                  var tag = {name:Name,tagId:TagId}
                  this.existTabs.push(tag);
                }
              }
              
            })

        }, 500)
      }
    },
    created: function(){
      this.$route.query.status = "修改页面"
      
    }
}
</script>
<style>
  .up-div{
        width: 120px;
        height: 50px;
        position: relative;
        overflow: hidden;
        border: 1px solid #3f51b5 ;
        display: inline-block;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: lighter;
        color: #3f51b5;
        text-align: center;
        line-height: 50px;
        margin: 10px 0 auto auto;
  }
  .upbtn{
        background-color: transparent;
        position: absolute;
        width: 999px;
        height: 999px;
        top: -10px;
        right: -10px;
        cursor: pointer;
  }
</style>