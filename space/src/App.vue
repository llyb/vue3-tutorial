<template>
  <NavBar></NavBar>
  <router-view :key="$route.fullPath" />
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import NavBar from '@/components/NavBarView.vue';

export default {
  name: "App",
  components: {
    NavBar
  }
}

</script>

<style>

</style>
