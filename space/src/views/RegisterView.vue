<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3 ">
        <form @submit.prevent="register">
          <div class="mb-3">
          <label for="username" class="form-label">用户名</label>
          <input v-model="username" type="username" class="form-control" id="username" placeholder="请输入用户名">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label password_confirm">确认密码</label>
            <input v-model="password_confirm" type="password" class="form-control" id="password_confirm" placeholder="请再次输入密码">
          </div>
          <div class="mb-3">
            <div class="error_message">{{ error_message }}</div>
            <button type="submit" class="btn btn-primary">注册</button>
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
import $ from 'jquery';

export default {
  name: 'RegisterView',
  components: {
    ContentBase
  },
  setup() {
    const store = useStore();
    let error_message = ref('');
    let username = ref('');
    let password = ref('');
    let password_confirm = ref('');

    // 使用useStore调用全局函数同时进行传参
    const register = () => {
      error_message.value = "";
      
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "post",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value
        },
        success(resp) {
          if(resp.result === 'success') {
            store.dispatch("login", {
              username: username.value,
              password: password.value,
              success() {
                router.push({name: "userlist"});
              },
              error() {
                error_message.value = "系统异常，请稍后重试";
              }
            });
          } else {
            error_message.value = resp.result;
          }
        }
      })
    }

    return {
      error_message,
      register,
      username,
      password,
      password_confirm
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
  .password_confirm {
    margin-top: 10px;
  }
</style>