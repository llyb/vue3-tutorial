<template>
    <div class="card edit-area">
        <div class="card-body">
            <div class="mb-3">
                <label for="edit" class="form-label">编辑帖子</label>
                <textarea v-model="content" class="form-control" id="edit" rows="3"></textarea>
                <button @click="post_a_post" type="button" class="btn btn-warning btn-sm add">发帖</button>
                </div>
            </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: "UserprofileWrite",
    setup(props, context) {
        const store = useStore();
        let content = ref('');

        const post_a_post = () => {
            // 更新模式：先后端再前端
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "post",
                data: {
                    content: content.value
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access
                },
                
                success(resp) {
                    if(resp.result === "success") {
                        context.emit('post_a_post', content.value);
                        content.value = "";
                    }
                }
            })
        }

        return {
            content,
            post_a_post,
        }
    }
}
</script>

<style scoped>
.edit-area {
    margin-top: 10px;
}

.add {
    margin-top: 10px;
}
</style>