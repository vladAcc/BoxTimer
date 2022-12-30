
export const TOGGLE_AUDIO = 'TOGGLE_AUDIO';



//========================================================================
const initState = {
   audio : true
}


//==========================================================================
const AudioReducer = (state = initState, action) =>{
   switch(action.type){
        case TOGGLE_AUDIO:
            return {
                ...state,
                audio: !state.audio
            }

        default:
            return state
   }

}

export default AudioReducer;