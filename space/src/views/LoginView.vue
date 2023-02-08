<template>
    <ContentBase>
      <div class="row justify-content-md-center">
        <div class="col-3 ">
          <form @submit.prevent="login">
            <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="username" class="form-control" id="username" placeholder="请输入用户名">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">密码</label>
              <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
              <div class="error_message">{{ error_message }}</div>
              <button type="submit" class="btn btn-primary">登录</button>
            </div>
          </form>
        </div>
      </div>
    </ContentBase>
  </template>
  
  <script>
  import ContentBase from '@/components/ContentBase.vue';
  import { useStore } from 'vuex';
  import { ref } from 'vue';
  import router from '@/router';
  
  export default {
    name: 'LoginView',
    components: {
      ContentBase
    },
    setup() {
      const store = useStore();
      let error_message = ref('');
      let username = ref('');
      let password = ref('');

      // 使用useStore调用全局函数同时进行传参
      const login = () => {
        error_message.value = "";
        store.dispatch("login", {
          username: username.value,
          password: password.value,
          success() {
            router.push({name: "userlist"});
          },
          error() {
            error_message.value = "用户名或密码错误";
          }
        });
      }

      return {
        error_message,
        login,
        username,
        password
      }
    }
  }
  </script>
  
  <style scoped>
    button {
      width:100%;
      margin-top: 10px;
    }
    .error_message {
      color:red;
    }
  </style>