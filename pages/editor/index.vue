<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="onAdd">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model="article.title"
                    required
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model="article.description"
                    required
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                    required
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tag"
                    @keydown.enter="addTag"
                  />
                  <div class="tag-list">
                    <span
                      v-for="item in article.tagList"
                      :key="item"
                      class="tag-default tag-pill"
                    >
                      <i @click="deleteTag(item)">X</i>
                      {{ item }}
                    </span>
                  </div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
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
import { addArticles, getArticalInfo, putArticles } from "@/api/article";
import MarkdownIt from "markdown-it";
export default {
  middleware: "authenticated",
  name: "Editor",
  data() {
    return {
      article: { title: "", description: "", body: "", tagList: [] },
      tag: "",
    };
  },
  async asyncData({ params }) {
    try {
      if (JSON.stringify(params) !== "{}") {
        const { data } = await getArticalInfo(params.slug);
        const { article } = data;
        return {
          article,
          params,
        };
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async onAdd() {
      console.log(this.params, "params");
      if (this.params && JSON.stringify(this.params) !== "{}") {
        await putArticles({ article: this.article, slug: this.params.slug });
        this.$router.push(`/article/${this.params.slug}`);
      } else {
        const { data } = await addArticles({ article: this.article });
        this.$router.push(`/article/${data.article.slug}`);
      }
    },
    addTag() {
      const { tagList } = this.article;
      if (this.tag && tagList.indexOf(this.tag) < 0) {
        const tagListNew = [...tagList, this.tag];
        this.article.tagList = tagListNew;
        this.tag = "";
      }
    },
    deleteTag(item) {
      const { tagList } = this.article;
      this.article.tagList = tagList.filter((i) => i !== item);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>