<template>
    <ContentBase>
      <div class="row">
        <div class="col-3">
          <UserprofileInfo @follow="follow" @unfollow="unfollow" :user="user" />
          <UserprofileWrite v-if="is_me" @post_a_post="post_a_post" />
        </div>
        <div class="col-9">
          <UserprofilePost @delete_a_post="delete_a_post" :posts="posts" />
        </div>
      </div>
    </ContentBase>
  </template>
  
  <script>
  import ContentBase from '@/components/ContentBase.vue';
  import UserprofileInfo from '@/components/UserprofileInfo.vue';
  import UserprofilePost from '@/components/UserprofilePost.vue';
  import UserprofileWrite from '@/components/UserprofileWrite.vue';
  import { useRoute } from 'vue-router';
  import { reactive } from 'vue';
  import $ from 'jquery';
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: 'UserprofileView',
    components: {
      ContentBase,
      UserprofileInfo,
      UserprofilePost,
      UserprofileWrite
    },

    setup() {
      const store = useStore();
      const route = useRoute();
      const userId = parseInt(route.params.userId); // 这里要和路由中的名字一致均为userId
    
    // 定义变量
    const user = reactive({});
    const posts = reactive ({});

      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
        type: "GET",
        data: {
          user_id: userId
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access
        },
        success(resp) {
          user.id = resp.id;
          user.username = resp.username;
          user.photo = resp.photo;
          user.followersCount = resp.followerCount;
          user.is_followed = resp.is_followed;
        }
      });

      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "GET",
        headers: {
          'Authorization': "Bearer " + store.state.user.access
        },
        data: {
          user_id: userId
        },
        success(resp) {
          posts.count = resp.length;
          posts.posts = resp;
        }
      })

    const follow = () => { // 关注
      if(user.is_followed) return;
      user.is_followed = true;
      user.followersCount ++;
    }

    const unfollow = () => {
      if(!user.is_followed) return;
      user.is_followed = false;
      user.followersCount --;
    }

    const post_a_post = (content) => {
      posts.count ++;
      posts.posts.unshift({
        id: 2,
        userid: 1,
        content: content
      })
    }

    const delete_a_post = post_id => {
      posts.posts = posts.posts.filter(post => post.id !== post_id);
      posts.count = posts.posts.length;
    }

    const is_me = computed(() => {
      return userId === store.state.user.id;
    } )

    // 返回定义的变量,我们就能在上面使用了
    return {
      user,
      follow,
      unfollow,
      posts,
      post_a_post,
      delete_a_post,
      is_me
    }
    }
  }
  
  </script>
  
  <style scoped>
  </style>