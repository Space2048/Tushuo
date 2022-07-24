<template>
    <div>
            <headline></headline>
            <svg viewBox="0 0 800 600">
                <symbol id="s-text">
                    <text text-anchor="middle" x="50%" y="40%" class="text--line">
                        404
                    </text>
                    <text text-anchor="middle" x="50%" y="60%" class="text--line2">
                        对不起，页面找不到了！
                    </text>
                </symbol>
                <g class="g-ants">
                    <use xlink:href="#s-text" class="text-copy"></use>
                    <use xlink:href="#s-text" class="text-copy"></use>
                    <use xlink:href="#s-text" class="text-copy"></use>
                    <use xlink:href="#s-text" class="text-copy"></use>
                    <use xlink:href="#s-text" class="text-copy"></use>
                </g>
            </svg>
    </div>
</template>
<script>
import headline from "@/components/headBar"
export default {
  components: {
    headline,
},
  name: 
  '404',
}
</script>
<style>
    @import '../../assets/css/style.css';
</style>