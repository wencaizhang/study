<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>vue2 动态创建组件</h1>

    <div id="demo" style="width: 10px; height: 10px; border: 1px solid #ccc; "></div>

    <a-space>
      <a-button type="primary" @click="showModal">showModal</a-button>
      <a-button type="primary" @click="update">update</a-button>
      <!-- <a-button type="primary" @click="update2">update</a-button> -->
    </a-space>

    <el-row style="margin-top: 2rem;">
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import TheModal from "./components/TheModal.vue";
import useComponent from "./components/useComponent";

export default {
  name: "App",
  components: {},
  data() {
    return {
      modalInstance: null,
      modalProps: {
        count: 1,
        time: new Date().getTime(),
        obj: {
          name: 'zwc',
          time: 0,
        },
        ary: ['香蕉']
      },
    };
  },
  methods: {
    showModal() {
      if (this.modalInstance) {
        this.modalInstance.showModal();
        return;
      }
      this.modalInstance = useComponent(TheModal, this.modalProps, {
        el: '#demo'
      });
      console.log('this.modalProps: ', this.modalProps);
      console.log('this.modalInstance: ', this.modalInstance);
      this.modalInstance.showModal();
      this.modalInstance.$on("update", (e) => {
        console.log('%c [ e ]-38', 'font-size:13px; background:pink; color:#bf2c9f;', e)
        this.update();
      });
    },
    update() {
      console.log("app update");
      const { count } = this.modalProps;
      Object.assign(this.modalProps, {
        count: count + 1,
        time: new Date().getTime(),
      });

      // 需要手动更新组件实例 props
      Object.assign(this.modalInstance.$props, this.modalProps)
      console.log(this.modalProps);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
