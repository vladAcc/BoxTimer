const PLUS_WORK = 'PLUS_WORK';
const MINUS_WORK = 'MINUS_WORK';
const SET_WORK = 'SET_WORK';

const PLUS_REST = 'PLUS_REST';
const MINUS_REST = 'MINUS_REST';
const SET_REST = 'SET_REST';

const PLUS_ROUND = 'PLUS_ROUND';
const MINUS_ROUND = 'MINUS_ROUND';

const SET_PREPARATION = 'SET_PREPARATION';











//------------------------------------------------
const initState = {
    work: 180,
    rest: 60,
    rounds: 3,
    preparation: 5
}



const TimerReducer = (state = initState, action) => {
    //console.log( action.payload)
    switch(action.type) { 
        case SET_WORK: {
            return {
                ...state,
                work: action.payload
            }    
        }
        case PLUS_WORK: {
            return {
                ...state,
                work: state.work + 5
            }     
        }
        case MINUS_WORK: {
            return {
                ...state,
                work:  state.work > 10 ?  state.work - 5 : state.work = 10
            }
        }


        case SET_REST: {
            return {
                ...state,
                rest: action.payload
            }
            
        }
        case PLUS_REST: {
            return {
                ...state,
                rest: state.rest + 5
            }
            
        }
        case MINUS_REST: {
            return {
                ...state,
                rest:  state.rest > 5 ? state.rest - 5 :  state.rest = 5
            }
        }


        case PLUS_ROUND: {
            return {
                ...state,
                rounds: state.rounds + 1
            }
            
        }
        case MINUS_ROUND: {
            return {
                ...state,
                rounds: state.rounds > 1 ? state.rounds - 1 : state.rounds = 1
            }
        }

        case 'SET_ROUNDS': {
            return {
                ...state,
                rounds: action.payload
            }
        }


        case "SET_PREPARATION": {
            return {
                ...state,
                preparation: action.payload
            }
        }


        default:
            return  state;
    }

}

export default TimerReducer;