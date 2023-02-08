import $ from 'jquery';
import jwt_decode from 'jwt-decode';

const ModuleUser = {
  state: {
    id: "",
    username: "",
    photo: "",
    followercount: 0,
    access: "",
    refresh: "",
    is_login: false
  },
  getters: {
  },
  mutations: { // 里面实现对用户信息的更改
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followercount = user.followercount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
    },
    updateAccess(state, access) {
      state.access = access;
    },
    logout(state) {
      state.id = "";
      state.username = "";
      state.photo = "";
      state.followercount = 0;
      state.access = "";
      state.refresh = "";
      state.is_login = false;
    }
  },
  actions: {
    login(context, data) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/api/token/",
        type: "post",
        data: {
          username: data.username,
          password: data.password
        },
        success(resp) {
          const {access, refresh} = resp;
          const access_obj = jwt_decode(access); // 解码得到我们需要的信息,里面存在userid

          // 通过refresh刷新access
          setInterval(() => {
            $.ajax({
              url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
              type: "post",
              data: {
                refresh,
              },
              success(resp) {
                context.commit('updateAccess',resp.access);
              }
            });
          }, 1000 * 4.5 * 60)

          // 如果登录成功我们就要得到这个用户的信息了
          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "get",
            data: {
              user_id: access_obj.user_id, // 传入userid得到用户的信息
            },
            headers: { // 授权
              'Authorization': "Bearer " + access
            },
            success(resp) { // 如果成功我们就要更新用户的信息了
              context.commit('updateUser', {
                ...resp, // 展开当前对象
                access: access,
                refresh: refresh,
                is_login: true
              });
              data.success(); // 成功调用
            },
          })
        },
        error() {
          data.error();
        }
      })
    }
  },
  modules: {
  }
};

export default ModuleUser;