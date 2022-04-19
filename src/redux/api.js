import axios from "axios";

const YOUR_APP_ID = "5ae3c2f0";
const YOUR_APP_KEY = "67195c8ac78fea91e737b496c535fc1f";

export const getRecipes = async(query) => {
    
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url)
};