const SET_NEWS = "SET_NEWS";

const MAXIMUM_NEWS = 100;

const setNews = (news) => {
  return {
    type: SET_NEWS,
    news,
  };
};

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
  ).then((results) => Promise.all (results.map((r) => r.json())));
  return dispatch(setNews(news));
};

let initialState = {
  news: [],
  comments: [],
  isLoading:true,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
        return {
            ...state,
            news: action.news,
            isLoading:false,
        }

    default:
      return state
  }
};

export default appReducer

/* maxNewsData
  .map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  )
  


  .then((result)=> Promise.all(result.map(r) => r.json()); */