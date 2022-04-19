<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>vue2 动态创建组件</h1>

    <a-space>
      <a-button type="primary" @click="showModal">showModal</a-button>
      <a-button type="primary" @click="update">update</a-button>
    </a-space>
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
      },
    };
  },
  methods: {
    showModal() {
      if (this.modalInstance) {
        this.modalInstance.showModal();
        return;
      }
      this.modalInstance = useComponent(TheModal, this.modalProps);
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
