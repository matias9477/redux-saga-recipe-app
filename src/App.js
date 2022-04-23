import './App.css';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
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


function App() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("lasagna");


  const {recipes, loading} = useSelector(state => state.data);

  const updateSearch = () =>{
    setQuery(search);
    setSearch("");
  };


  let dispatch = useDispatch();

  useEffect(()=>{
    dispatch({type: ACTIONS.FETCH_RECIPE_START, payload: query });
  }, [query, dispatch])

  return (
    <div className="App">
      <h1>Recipe App</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField 
          id="outlined-basic" 
          label="Search a recipe" 
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
      { loading ? <div>Loading...</div> :
        <Grid container  spacing={2} columns={4}>
          <Grid item xs={12}>
            <Grid container justify="center">
              {recipes && recipes.hits && recipes.hits.map((item, index) => (
                <Grid key={index} item  md={3}>
                  <RecipeReviewCard image={item.recipe.image} title={item.recipe.label} calories={item.recipe.calories} ingredients={item.recipe.ingredients}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default App;
