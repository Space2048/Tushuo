<template>
    <div>
        <headline></headline>
        
        <leftbar></leftbar>


        <v-main style="padding-top:1rem;">
            <mainpg></mainpg>
        </v-main>
    </div>
</template>
<script>
import mainpg from '@/page/index/index'
import sysbar from "@/components/systemBar"
import headline from "@/components/headBar"
import leftbar from "@/components/leftBar"
import rightbar from "@/components/rightBar"
import footline from "@/components/footer"
import page1 from "@/page/index/index"
export default {
  components: { sysbar,
    headline,
    leftbar,
    rightbar,
    footline,
    page1,
    mainpg },
  name: 
  'selfIndex',
}
</script>