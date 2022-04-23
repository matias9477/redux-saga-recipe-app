import axios from "axios";

const YOUR_APP_ID = process.env.REACT_APP_ID;
const YOUR_APP_KEY = process.env.REACT_APP_KEY;

export const getRecipes = async(query) => {
    
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url)
};