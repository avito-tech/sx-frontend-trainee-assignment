import { createSelector } from "reselect";

export const newsSelector = (state) => state.news;
export const commentsSelector = (state) => state.comments;
export const subcommentsSelector = (commentId) =>(state) => state.subcomments[commentId]

export const getCurrentNewsById = (selectedId) =>
  createSelector(newsSelector, (news) => {
    const currentNews = news.find((item) => item.id == selectedId);
    return currentNews;
  });

export const getCurrentNewsComment = (selectedId) =>
  createSelector(commentsSelector, (comments) => {
    const currentNewsComment = comments.find((item) => item.id == selectedId);
    return currentNewsComment.kids;
  });



/*   export const getSubcommentsById =(commentId) => createSelector(
    (state)=>state.subcomments,
    (subcomments) => subcomments && subcomments[commentId]
    ) */
