export const LIGHT_THEME = 'LIGHT_THEME'
export const  DARK_THEME = 'DARK_THEME'




//========================================================================
const initState = {
    themeToggle:  true
}



const ThemeReducer = (state = initState, action) =>{

    switch(action.type){
        case  LIGHT_THEME:
            return {
                ...state,
                themeToggle: false
            }
        case  DARK_THEME:
            return {
                ...state,
                themeToggle: true
            }
        default:
            return state
    }
  
}

export default ThemeReducer 