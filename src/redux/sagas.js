import { takeLatest, all, put, fork, call } from 'redux-saga/effects'
import * as ACTIONS from './actionTypes';
import { getRecipes } from './api';


export function* onLoadRecipeAsync({payload : query}){
    try{
        console.log(query);
        const response = yield call(getRecipes,query)
        yield put({type: ACTIONS.FETCH_RECIPE_SUCCESS, payload: response.data});
    } catch(error){
        yield put({type: ACTIONS.FETCH_RECIPE_FAIL, payload: error });
    }
}

//Star notation means it's a generator function.
// Generators are functions that can be exited and later re-entered. 
// Their context (variable bindings) will be saved across re-entrances.
export function* onLoadRecipe(){
    //takeLatest will make only one api call using the lastest click
    yield takeLatest(ACTIONS.FETCH_RECIPE_START, onLoadRecipeAsync)
}

const recipeSaga = [fork(onLoadRecipe)];
export default function* rootSaga(){
    yield all([...recipeSaga]);
}