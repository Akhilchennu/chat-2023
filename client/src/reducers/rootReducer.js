const initialState={
    userData:{},loginSession: false   
}

const rootReducer=(state = initialState, action)=>{
    switch(action.type){
        case "USERDATA":
            return{
                ...state,
                userData:action.userData
            }   
        case "AUTHENTICATE":
                return {
                    ...state,
                    loginSession: action.login
                }
        default:
            return state
    }
}

export default rootReducer