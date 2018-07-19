import { GET_DATA} from "../actions/actionTypes";    
    initialState = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };

    const reducer = (state = initialState , action)=>{
        switch(action.type){
            case GET_DATA:
            return{
                ...state,
                ...action.payload
            }
            break;
            default:
            return state
        }
    }