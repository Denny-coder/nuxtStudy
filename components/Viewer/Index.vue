<template>
  <div
    style="
      width: 100%;
      position: relative;
      overflow: hidden;
      text-align: center;
    "
    :style="{ height: `calc(100vh - ${calcHeight}px)` }"
  >
    <div
      v-scroll="scrollKey"
      style="
        transform-origin: 50% 50%;
        position: absolute;
        left: 0;
        top: 0;
        transform: scale(1);
        height: 100%;
        text-align: center;
        width: 100%;
      "
    >
      <img
        :src="url"
        :style="{ transform: `rotate(${rotateDeg}deg)` }"
        style="height: 100%; user-select: none"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Viewer",
  props: {
    url: {
      type: String,
      required: true,
    },
    scrollKey: {
      type: [Boolean, Number],
      default: 0,
    },
    calcHeight: {
      type: Number,
      default: 85,
    },
  },
  data() {
    return {
      dialogVisible: false,
      opinion: "", // 审批意见
      auditStatus: "",
      rotateDeg: 0,
    };
  },
  methods: {
    doRotate() {
      this.rotateDeg += 90;
    },
  },
};
</script>

