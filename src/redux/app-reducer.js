import { commentsSelector } from "./selectros";

const SET_NEWS = "SET_NEWS";
const SET_COMMENTS = 'SET_COMMENTS';
const SET_SUBCOMMENTS = 'SET_SUBCOMMENTS'

const MAXIMUM_NEWS = 100;

const setNews = (news) => {
  return {
    type: SET_NEWS,
    news,
  };
};

const setComments = (comments) => {
  return {
    type:SET_COMMENTS,
    comments
  }
}

const setSubcomments = (commentId, subcomments) => {
  return {
    type:SET_SUBCOMMENTS,
    commentId,
    subcomments
  }
}

export const getNewsThunk = () => async (dispatch) => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  );
  const data = await response.json();
  const maxNewsData = data.filter((_, index) => index < MAXIMUM_NEWS);
  const news = await Promise.all(
    maxNewsData.map((id) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
    )
  ).then((results) => Promise.all(results.map((r) => r.json())));
  return dispatch(setNews(news));
};

export const getCurrentNewsByIdThunk = (selectedId) => async (dispatch) => {
  fetch(
    `https://hacker-news.firebaseio.com/v0/item/${selectedId}.json?print=pretty`
  )
    .then((res) => res.json())
    .then((data) => dispatch(setNews([data])))
    .then((data) => console.log(data));
};

export const getCommentsThunk = (kids) => async (dispatch) => {
  const comments = await Promise.all(
    kids.map((id)=>fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`))
  ).then((results) => Promise.all(results.map((r)=>r.json())))
  console.log(comments)
  return dispatch(setComments(comments))
}

 export const getSubcommentsThunk = (commentId, commentKids) => async (dispatch) => {
  const subcomments = await Promise.all(
    commentKids.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`))
  ).then((results) => Promise.all(results.map((r)=>r.json())))
  console.log(subcomments)
  return dispatch(setSubcomments(commentId, subcomments))
}
  
    

let initialState = {
  news: [],
  comments: [],
  isLoading: true,
  subcomments : {},
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.news,
        isLoading: false,
      }
      case SET_COMMENTS: 
        return {
          ...state,
          comments:action.comments
        }
      case SET_SUBCOMMENTS: 
      return{
        ...state,
        subcomments: {
          ...state.subcomments, [action.commentId] : action.subcomments
        }
      }

    default:
      return state;
  }
};

export default appReducer;

/* maxNewsData
  .map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  )
  


  .then((result)=> Promise.all(result.map(r) => r.json()); */
