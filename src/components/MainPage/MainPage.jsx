import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNewsThunk } from "../../redux/app-reducer";
import { newsSelector } from "../../redux/selectros";
import { timestampToTime } from "../../utils/helpers/dateFormatter";

const MainPage = (props) => {
  const dispatch = useDispatch();
  const news = useSelector(newsSelector);
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsThunk());
    const interval = setInterval(() => {
      dispatch(getNewsThunk());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1> Данные загружаются </h1>
        <LinearProgress />
      </div>
    );
  }

  const handleRefresh = () => {
    dispatch(getNewsThunk());
  };

  return (
    <Grid container spacing={1}>
      <IconButton onClick={() => handleRefresh()}>
        <RefreshIcon></RefreshIcon>
        Обновить список новостей
      </IconButton>
      {news.map((item, index) => (
        <CardActionArea onClick={() => navigate(`/news/${item.id}`)}>
          <Card
            sx={{
              display: "flex",
            }}
          >
            <CardContent>
              <Typography component="h2" variant="h5">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {item.score} points by {item.by} {timestampToTime(item.time)}
              </Typography>
              <Link href={item.url} variant="subtitle1">
                Read the full text of the news...
              </Link>
            </CardContent>
          </Card>
        </CardActionArea>
      ))}
    </Grid>
  );
};

export default MainPage;
