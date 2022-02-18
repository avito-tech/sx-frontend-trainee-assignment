import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCommentsThunk,
  getCurrentNewsByIdThunk,
} from "../../redux/app-reducer";
import {
  commentsSelector,
  getCurrentNewsById,
  newsSelector,
} from "../../redux/selectros";
import { timestampToTime } from "../../utils/helpers/dateFormatter";
import Comment from "./Comment";

const useEffectCommentsRefresher = (kids) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (kids?.length) {
      dispatch(getCommentsThunk(kids));
      const interval = setInterval(() => {
        dispatch(getCommentsThunk(kids));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [kids]);
};

const NewsPage = () => {
  const dispatch = useDispatch();
  const { id: selectedId } = useParams();
  const news = useSelector(newsSelector);
  const comments = useSelector(commentsSelector);
  const currentNews = useSelector(getCurrentNewsById(selectedId));
  const navigate = useNavigate();
  const handleRefresh = () => {
    dispatch(getCommentsThunk(currentNews?.kids));
  };

  useEffect(() => {
    if (!news.length) {
      dispatch(getCurrentNewsByIdThunk(selectedId));
    }
  }, [news]);

  useEffectCommentsRefresher(currentNews?.kids);

  /*   useEffect(() => {
    if (currentNews.kids?.length) {
      dispatch(getCommentsThunk(currentNews.kids));
    }
  }, [currentNews?.kids]); */

  if (!selectedId) {
    return navigate("/");
  }

  if (!news.length) {
    return <LinearProgress />;
  }

  console.log(currentNews);
  console.log(news);
  console.log(selectedId);
  console.log(comments);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card>
          <IconButton onClick={() => handleRefresh()}>
            <RefreshIcon></RefreshIcon>
            Обновить список комментариев
          </IconButton>
          <CardContent>
            <Typography component="h2" variant="h5">
              {currentNews.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentNews.score} poinst by {currentNews.by}{" "}
              {timestampToTime(currentNews.time)}
            </Typography>
            <Link href={currentNews.url}>News source</Link>
          </CardContent>
        </Card>
      </Grid>

      {comments.map((comment) => (
        <Comment
          text={comment.text}
          by={comment.by}
          id={comment.id}
          time={comment.time}
          kids={comment.kids}
        />
      ))}
    </Grid>
  );
};

export default NewsPage;
