<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </h1>
            <p class="text-xs-center">
              <nuxt-link v-if="isLogin" to="/register"
                >Need an account?</nuxt-link
              >
              <nuxt-link v-if="!isLogin" to="/login"
                >Have an account?</nuxt-link
              >
            </p>

            <ul class="error-messages">
              <template v-for="(messages, field) in errors">
                <li v-for="(message, index) in messages" :key="index">
                  {{ field }}{{ message }}
                </li>
              </template>
            </ul>

            <form @submit.prevent="onSubmit">
              <fieldset v-if="!isLogin" class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  required
                  minlength="8"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                {{ isLogin ? "Sign in" : "Sign up" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
//只在客户端加载这个包
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  name: "Login",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });
        // TODO：保存用户的登录状态
        // 存储到容器方便共享
        this.$store.commit("setUser", data.user);
        // 操作cookie,数据既要在客户端用，也要在服务端用
        Cookie.set("user", data.user);
        //跳转到首页
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.errors = err.response.data.errors;
      }
    },
    head() {
      return {
        title: `login - nuxtRealWorld`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>