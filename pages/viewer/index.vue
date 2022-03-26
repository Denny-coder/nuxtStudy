<template>
  <viewer
    ref="viewer"
    :calcHeight="185"
    :url="dialogImageUrl"
    :scrollKey="fullscreen"
  ></viewer>
</template>

<script>
import viewer from "@/components/Viewer/Index.vue";
import dialogImageUrl from "@/assets/img/view.jpg";
export default {
  components: {
    viewer,
  },
  data() {
    return {
      dialogImageUrl,
      fullscreen: false,
    };
  },
  methods: {
    doFullscreen() {
      this.fullscreen = !this.fullscreen;
      this.$refs.viewer.rotateDeg = 0;
    },
    // 图片旋转
    doImgRotate(type) {
      console.log(this.$refs.viewer);
      if (type) {
        this.$refs.viewer.rotateDeg -= 90;
      } else {
        this.$refs.viewer.rotateDeg += 90;
      }
    },
    // 图片上一张
    leftImg() {
      this.imgIndex = this.imgIndex - 1;
      if (this.imgIndex >= 0) {
        this.$refs.viewer.rotateDeg = 0;
        this.getChildPicModal(this.imgIndex);
      }
      // console.log(this.imgIndex)
      // this.dialogImageUrl = this.imgList[this.imgIndex];
    },
    // 图片下一张
    rightImg() {
      this.imgIndex = this.imgIndex + 1;
      if (this.imgIndex <= this.invCodeList.length - 1) {
        this.$refs.viewer.rotateDeg = 0;
        this.getChildPicModal(this.imgIndex);
      }
      // console.log(this.imgIndex)
      // this.dialogImageUrl = this.imgList[this.imgIndex];
    },
  },
};
</script>

<style>
</style>
