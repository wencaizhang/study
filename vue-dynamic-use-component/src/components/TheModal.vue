<template>
  <div>
    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
      <p>当前count为: {{ count }}</p>
      <p>当前时间戳为: {{ time }}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <a-button type="primary" @click="$emit('update', 'hahah')">update</a-button>
    </a-modal>
  </div>
</template>
<script>
export default {
  // name: 'TheTheModal',
  data() {
    return {
      visible: false,
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>