<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'your_feed',
                    }"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'your_feed',
                      },
                    }"
                    exact
                    >Your Feed</nuxt-link
                  >
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'global_feed',
                    }"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'global_feed',
                      },
                    }"
                    exact
                    >Global Feed</nuxt-link
                  >
                </li>
                <li class="nav-item" v-if="tab === 'tag'">
                  <nuxt-link
                    class="nav-link active"
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'tag',
                        tag,
                      },
                    }"
                    >#{{ tag }}</nuxt-link
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
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      params: {
                        username: article.author.username,
                      },
                    }"
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
              <nuxt-link
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug,
                  },
                }"
                class="preview-link"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: count === page,
                }"
                v-for="count in totalPage"
                :key="count"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: count,
                      tag,
                      tab,
                    },
                  }"
                  >{{ count }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <nuxt-link
                  v-for="item in tags"
                  :key="item"
                  :to="{
                    name: 'home',
                    query: {
                      tag: item,
                      tab: 'tag',
                    },
                  }"
                  class="tag-pill tag-default"
                  >{{ item }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArtical,
  getFeedArtical,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
export default {
  name: "Home",
  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  data() {
    return {
      favoritingAticle: "",
    };
  },
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tag = query.tag || "";
    const tab = query.tab || "global_feed";
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArtical : getArtical;
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;
    return {
      articles,
      articlesCount,
      limit,
      page,
      tag,
      tags,
      tab,
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
      title: `nuxtRealWorld`,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>