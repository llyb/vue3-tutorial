<template>
    <ContentBase>
      <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
        <div class="card-body">
          <div class="row">
            <div class="col-1 img_field">
              <img class="img-fluid" :src="user.photo" alt="">
              </div>
            <div class="col-11">
              <div class="userid">{{ user.id }}</div>
              <div class="username">{{ user.username }}</div>
            </div>
          </div>
        </div>
      </div>
    </ContentBase>
  </template>
  
<script>
import ContentBase from '@/components/ContentBase.vue';
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';

export default {
    name: 'UserlistView',
    components: {
        ContentBase
    },
    setup() {
      const store = useStore();
      let users = ref('');

      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type: "get",
        success(resp) { // 传回用户的信息
          users.value = resp;
        }
      });

      const open_user_profile = (userId) => {
        if(!store.state.user.is_login) {
          router.push({
            name: "login"
          });
        } else {
          router.push({
            name: "userprofile",
            params: {
              userId
            }
          });
        }
      }

      return {
        users,
        open_user_profile
      };
    }
}
</script>

<style scoped>
  img {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .userid {
    font-weight: bold;
  }
  .username {
    color:gray;
    font-size: 15px;
  }
  .card {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .card:hover {
    box-shadow: 2px 2px lightgray;
    transition: 500ms;
  }

  .img_field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>