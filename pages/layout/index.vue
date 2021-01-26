<template>
  <div>
    <!-- header -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/setting">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: user.username,
                  },
                }"
              >
                <img :src="user.image" class="user-pic" />
                {{ user.username }}
              </nuxt-link>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="logout">Logout</button>
            </li>
          </template>
          <template v-if="!user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /header -->
    <nuxt-child />
    <!-- footer -->
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp;
          design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
  <!-- /footer -->
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "LayoutIndex",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      Cookie.remove("user");
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>