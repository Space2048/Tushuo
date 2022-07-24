<template>
  <div id="mainpg">
    <router-view  />
  </div>
  
</template>
<script>

export default {
    name:'mainpg',
    data: () => ({
      show: false,
    }),
    components:{
      // typelist
    }
}
</script>