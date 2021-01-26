<template>
  <div>
    <div class="article-meta">
      <nuxt-link
        :to="{
          name: 'profile',
          parames: {
            username: article.author.username,
          },
        }"
        ><img :src="article.author.image"
      /></nuxt-link>
      <div class="info">
        <nuxt-link to="" class="author">{{
          article.author.username
        }}</nuxt-link>
        <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
      </div>
      <template v-if="article.author.username !== user.username">
        <button
          class="btn btn-sm btn-outline-secondary"
          :class="{
            active: article.author.following,
          }"
        >
          <i class="ion-plus-round"></i>
          &nbsp; Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button
          class="btn btn-sm btn-outline-primary"
          :class="{
            active: article.favorited,
          }"
        >
          <i class="ion-heart"></i>
          &nbsp; Favorite Post <span class="counter">(29)</span>
        </button>
      </template>
      <template v-else>
        <span ng-show="$ctrl.canModify" class="ng-scope">
          <nuxt-link
            class="btn btn-outline-secondary btn-sm"
            :to="{
              name: 'editor',
              params: {
                ...article,
              },
            }"
          >
            <i class="ion-edit"></i> Edit Article
          </nuxt-link>

          <button class="btn btn-outline-danger btn-sm" @click="onDelete">
            <i class="ion-trash-a"></i> Delete Article
          </button>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import { deleteArticles } from "@/api/article";
export default {
  name: "FavoriteMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onDelete() {
      await deleteArticles(this.article.slug);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>