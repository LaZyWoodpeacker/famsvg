<template>
  <div id="wraper" v-if="show" @click.self="action">
    <div class="card">
      <label for="modal-control" class="modal-close"></label>
      <h3 class="section" v-text="header"></h3>
      <img class="section" ref="img" />
      <button @click="action">Ok</button>
    </div>
  </div>
</template>

<style scoped>
#wraper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
export default {
  name: "okDialog",
  data() {
    return {
      show: false,
      header: "String",
      message: "String",
    };
  },
};
</script>