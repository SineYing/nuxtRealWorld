<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>
                {{ profile.bio }}
              </p>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                :class="{
                  active: profile.follow,
                }"
              >
                <i class="ion-plus-round"></i>
                &nbsp; Follow Eric Simons
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab !== 'favorite_articles',
                    }"
                    :to="{
                      name: 'profile',
                      query: {
                        tab: 'my_articles',
                      },
                    }"
                    exact
                    >My Articles</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'favorite_articles',
                    }"
                    :to="{
                      name: 'profile',
                      query: {
                        tab: 'favorite_articles',
                      },
                    }"
                    exact
                    >Favorited Articles</nuxt-link
                  >
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link :to="'/profile/' + article.author.username"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="'/profile/' + article.author.username"
                    class="author"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">{{
                    article.createdAt | date("MMM DD,YYYY")
                  }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{
                    active: article.favorited,
                  }"
                  @click="favoritChange(article)"
                  :disabled="article.slug === favoritingAticle"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="'/article/' + article.slug" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getArtical, addFavorite, deleteFavorite } from "@/api/article";
import { getProfile } from "@/api/profile";
export default {
  // 在路由匹配组件之前会先执行中间件处理
  middleware: "authenticated",
  name: "UserProfile",
  watchQuery: ["tab"],
  data() {
    return {
      favoritingAticle: "",
    };
  },
  async asyncData({ query, store, params }) {
    const limit = 5;
    const tabQuery =
      query.tab == "favorite_articles"
        ? { favorited: params.username }
        : { author: params.username };
    const {
      data: { articles },
    } = await getArtical({
      limit,
      offset: 0,
      ...tabQuery,
    });
    // 获取用户信息
    const {
      data: { profile },
    } = await getProfile(params.username);
    return {
      articles,
      limit,
      tab: query.tab,
      profile,
    };
  },
  methods: {
    async favoritChange(article) {
      this.favoritingAticle = article.slug;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      this.favoritingAticle = "";
    },
  },
  head() {
    return {
      title: `${this.profile.username} - nuxtRealWorld`,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>