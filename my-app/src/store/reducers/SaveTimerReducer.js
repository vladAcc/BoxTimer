const SAVE_TIME = 'SAVE_TIME';






//------------------------------------------------
const initState = {
    arrTime : [
        { 
            work: 180,
            rest: 30,
            rounds: 31,
            preparation: 10,
            active: true
        },
        { 
            work: 280,
            rest: 20,
            rounds: 2,
            preparation: 5,
            active: false
        }, 
        { 
            work: 80,
            rest: 10,
            rounds: 1,
            preparation: 3,
            active: false
        },
    ]
   
}



const SaveTimerReducer = (state = initState, action) => {

    switch(action.type) { 
        case SAVE_TIME: {
            return {
                ...state,
                arrTime: action.payload
            }    
        }
       
       

        default:
            return  state;
    }

}

export default SaveTimerReducer;