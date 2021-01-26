<template>
  <div>
    <div class="settings-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="putInfo">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    v-model="image"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    v-model="username"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="bio"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </fieldset>
                <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { putUser, getProfile } from "@/api/profile";
import { mapState } from "vuex";
export default {
  // 在路由匹配组件之前会先执行中间件处理
  middleware: "authenticated",
  name: "Setting",
  data() {
    return {
      bio: "",
      email: "",
      image: "",
      password: "",
      username: "",
    };
  },
  mounted() {
    this.getProfile();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async putInfo() {
      await putUser({
        user: {
          bio: this.bio,
          email: this.email,
          image: this.image,
          password: this.password,
          username: this.username,
        },
      });
      this.$store.commit("setUser", {
        ...this.user,
        ...{
          bio: this.bio,
          image: this.image,
          username: this.username,
        },
      });
      this.$router.push(`/profile/${this.username}`);
    },
    async getProfile() {
      const { data } = await getProfile(this.user.username);
      const { bio, image, username } = data.profile;
      this.bio = bio;
      this.image = image;
      this.username = username;
    },
  },
  head() {
    return {
      title: `${this.user.username} - nuxtRealWorl`,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>