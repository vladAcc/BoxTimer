export const TRUE_VIBRO = 'TRUE_VIBRO';
export const FALSE_AUDIO = 'FALSE_AUDIO';


const TOGGLE_VIBRO = 'TOGGLE_VIBRO'


//========================================================================
const initState = {
   vibro : true,    
}



const VibroReducer = (state = initState, action) =>{

   switch(action.type){
    case TOGGLE_VIBRO:
        return {
            ...state,
            vibro: !state.vibro
        }

    default:
        return state
   }

}

export default VibroReducer;