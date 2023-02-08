<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card content">
                    <div class="card-body">
                        {{ post.content }}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';
import $ from 'jquery';

export default {
    name: "UserprofilePost",
    props: {
        posts: {
            type: Object,
            require: true
        }
    },
    setup(props, context) {
        const store = useStore();
        const router = useRoute();
        const userId = parseInt(router.params.userId);

        let is_me = computed(() => {
            return userId === store.state.user.id;
        });

        const delete_a_post = (post_id) => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                headers: {
                    'Authorization': "Bearer " + store.state.user.access
                },
                data: {
                    post_id
                },
                success(resp) {
                    if(resp.result === "success") {
                        context.emit('delete_a_post', post_id);
                    }
                }
            })
        }

        return {
            is_me,
            delete_a_post
        }
    }
}
</script>

<style scoped>
.content {
    margin-bottom: 10px;
}
button {
    float:right;
}
</style>