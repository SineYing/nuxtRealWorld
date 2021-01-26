<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentBody"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click="postComment()">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            param: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            param: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
          >{{ comment.author.username }}</nuxt-link
        >
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD,YYYY")
        }}</span>
        <span class="mod-options">
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, deleteComments, addComments } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "CommentsList",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data({ store }) {
    console.log(store, "store");
    return {
      comments: [],
      commentBody: "",
    };
  },
  mounted() {
    this.getComment();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async deleteComment(id) {
      const { data } = await deleteComments({
        id,
        slug: this.article.slug,
      });
      this.getComment();
    },
    async postComment() {
      const { data } = await addComments({
        slug: this.article.slug,
        comment: { body: this.commentBody },
      });
      this.getComment();
    },
    async getComment() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>