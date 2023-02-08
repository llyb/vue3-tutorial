<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
            <div class="col-3 img_field">
                <img class="img-fluid" :src="user.photo" alt="">
            </div>
            <div class="col-9">
                <div class="username">{{ user.username }}</div>
                <div class="fans">粉丝数：{{ user.followersCount }}</div>
                <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-primary btn-sm">+关注</button>
                <button @click="unfollow" v-else type="button" class="btn btn-primary btn-sm">取消关注</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import $ from 'jquery';
export default {
    name: "UserprofileInfo",
    props: { // 拿到父组件中的信息
        user: {
            type: Object,
            required: true // 是否必填
        }
    },
    setup(props, context) {
        // 传入context,调用里面的api触发父组件中的事件
        const follow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access
                },
                success(resp) {
                    if(resp.result === 'success') {
                        context.emit('follow');
                    }
                }
            })
        }

        const unfollow = () => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
                type: "POST",
                data: {
                    target_id: props.user.id
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access
                },
                success(resp) {
                    if(resp.result === 'success') {
                        context.emit('unfollow');
                    }
                }
            })
        }
        return {
            follow,
            unfollow
        }
    }
}
</script>

<style scoped>
img {
    border-radius: 50%;
}
.username {
    font-weight: bold;
    font-size: small;
}
.fans {
    font-size: small;
    color: gray;
}
.img_field {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>