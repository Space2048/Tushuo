<template>
    <v-navigation-drawer
      app
      clipped
      right
      width="180"
    >
      <v-row style="margin-left:3px;margin-top:10px;">
        <v-chip-group
            active-class="primary--text"
            column
          >
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
          </v-chip-group>
        
      </v-row>
    </v-navigation-drawer>
</template>
<script>
export default {
    data: () => ({ drawer: null }),
    name:'rightbar',
    props:['chiplist']
}
</script>