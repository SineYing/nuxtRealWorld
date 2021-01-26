<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <favorite-meta :article="article" :user="user" />
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12" v-html="article.body"></div>
        </div>

        <hr />
        <div class="article-actions">
          <favorite-meta :article="article" :user="user" />
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <comments-list :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticalInfo } from "@/api/article";
import MarkdownIt from "markdown-it";
import CommentsList from "./components/comments-list.vue";
import favoriteMeta from "./components/favorite-meta.vue";
import { mapState } from "vuex";
export default {
  components: { favoriteMeta, CommentsList },
  middleware: "authenticated",
  name: "Article",
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ params }) {
    try {
      const { data } = await getArticalInfo(params.slug);
      const md = new MarkdownIt();
      const { article } = data;
      article.body = md.render(article.body);
      console.log(article, "article");
      return {
        article,
      };
    } catch (err) {
      console.log(err);
    }
  },
  head() {
    return {
      title: `${this.article.title} - nuxtRealWorld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>