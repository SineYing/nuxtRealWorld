import { request } from '@/plugins/request'
// 获取所有的文章列表
export const getArtical = params => {
    return request({
        method: "GET",
        url: "/api/articles",
        params,
    });
}
// 获取文章详情
export const getArticalInfo = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}`,
    });
}
// 添加文章
export const addArticles = data => {
    return request({
        method: "POST",
        url: `/api/articles`,
        data
    });
}
// 修改文章
export const putArticles = ({ article, slug }) => {
    return request({
        method: "PUT",
        url: `/api/articles/${slug}`,
        data: article
    });
}
// 删除文章
export const deleteArticles = (slug) => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}`,
    });
}
// 获取关注的文章列表
export const getFeedArtical = params => {
    return request({
        method: "GET",
        url: "/api/articles/feed",
        params,
    });
}
// 获取评论列表
export const getComments = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}/comments`,
    });
}
// 点赞
export const addFavorite = slug => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/favorite`,
    });
}
// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/favorite`,
    });
}
// 添加评论
export const addComments = ({ slug, comment }) => {
    const data = request({
        method: "POST",
        url: `/api/articles/${slug}/comments`,
        data: { comment }
    });
    return data
}
// 删除评论
export const deleteComments = (params) => {
    return request({
        method: "DELETE",
        url: `/api/articles/${params.slug}/comments/${params.id}`,
    });
}