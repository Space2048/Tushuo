  <template>
<v-app id="app">
    
    <router-view></router-view>
    
    <!-- <headline></headline>
    
    <leftbar></leftbar>


    <v-content style="padding-top:1rem;">
      <router-view></router-view>
    </v-content>

    <footline></footline> -->
    <!-- <register></register> -->
    
  </v-app>
</template>

<script>
import sysbar from "@/components/systemBar"
import headline from "@/components/headBar"
import leftbar from "@/components/leftBar"
import rightbar from "@/components/rightBar"
import footline from "@/components/footer"
import page1 from "@/page/index/index"
import zhHans from "vuetify/lib/locale/zh-Hans"
import Register from './page/register/register.vue'
export default {
  components: { sysbar,
    headline,
    leftbar,
    rightbar,
    footline,
    page1,
    Register, },
  name: 
  'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>