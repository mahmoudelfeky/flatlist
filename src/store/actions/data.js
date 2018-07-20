import {GET_DATA} from "./actionTypes";
import { uiStartLoading,uiStopLoading } from "./ui";
export const getData = (seed,page,data)=>{
    return dispatch=>{
        dispatch(uiStartLoading)
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    fetch(url)
      .then(res => res.json())
      .then(res => {

        setTimeout(() => {
            dispatch(
         setData({
            data: page === 1 ? res.results : [data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false
          })
        );
        }, 2000)
      })
      .catch(error => {
        dispatch(uiStopLoading)
      });
    }
}

const setData = data =>
{
    return{
        type:GET_DATA,
        data
    }
}