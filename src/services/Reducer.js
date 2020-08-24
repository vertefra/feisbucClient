const defaultState = {
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    username: undefined,
    password: undefined,
    city: undefined,
    state: undefined,
    profile_img: undefined,
    isAdmin: false,
    isLogged: false,
    isAuth: false,
    friends: [],
    posts: [],
    favouriteFoods: [],
}



const Reducer = (state, action) => {
    switch(action.type){
        case 'SET_ID':
            return {
                ...state,
                id: action.payload,
            }
        
        case 'IS_LOGGED': 
            return {
                ...state,
                isLogged: action.payload            
        }

        case 'IS_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }

        case 'LOAD_USER':
            return {               
                ...state,
                ...action.payload
            }
        case 'CLEAN_STATE':
            
            return action.payload ? defaultState : undefined

        default: 
            return state
    }
}

export default  Reducer