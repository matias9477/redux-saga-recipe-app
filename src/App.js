import './App.css';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import * as ACTIONS from './redux/actionTypes';
import RecipeReviewCard from './components/Card';


const useStyles = makeStyles((theme) =>({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const gridStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  }
}));

function App() {
  const classes = useStyles();
  const gridClasses = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");


  const {recipes} = useSelector(state => state.data);

  const updateSearch = () =>{
    setQuery(search);
    setSearch("");
  };


  let dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: ACTIONS.FETCH_RECIPE_START, payload: query });
  }, [query])

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="outlined-basic" 
          label="Outlined" 
          variant="outlined" 
          value={search} onChange={(e) => setSearch(e.target.value)} 
        />
        <Button 
          variant="contained" 
          color="secondary" 
          style={{width: "80px", height:"55px"}}
          onClick={updateSearch}>
            Search
        </Button>
      </form>
        <Grid container className={gridClasses.root}>
          <Grid item xs={12}>
            <Grid container justify="center">
              {recipes && recipes.hits && recipes.hits.map((item, index) => (
                <Grid key={index} item>
                  <Card/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* {recipes && recipes.hits && recipes.hits.map((item, index) => (
          <h4>{item.recipe.label}</h4>
          ))} */}
    </div>
  );
}

export default App;
