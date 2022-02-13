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
  const news = await maxNewsData.map((id) => {
    return fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
  }).then((results) => results.map((r)=> r.json()))
  console.log(news)
  return dispatch(setNews(news));
};

let initialState = {
  news: [],
  comments: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 1:
      break;

    default:
      break;
  }
};
