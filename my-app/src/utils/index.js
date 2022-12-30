//format la timp pentru taimer
export const getFormatTime = (time) => time.toString().padStart(2,'0')



export class formatTime  {

    constructor(seconds, minutes, hours, totalSeconds){
        this.seconds = seconds
        this.minutes = minutes
        this.hours = hours
        this.totalSeconds = totalSeconds
    }

    //preface cifrele din piker in secunde (h:1, m:2, s:3) = 3723 s-----------------------------
    minutAndSecond(){
       return  this.minutes * 60 + this.seconds// 
    }

    hoursAndSeconds(){
        return this.hours * 60 * 60 + this.minutAndSecond()
    }

    //01:59:59 - tu ai sa intselegi
    //------------------------------------------------------
    secondsAndSeconds(){
        return this.totalSeconds % 60
    }

    secondsandmiMutes(){
        return Math.floor((this.totalSeconds  % 3600) / 60)
    }

    secondsAndHours(){
        return Math.floor(this.totalSeconds / 3600)
    }

}

//getTotalTime-------------------------------------------------
export const getTotalTime = (work, rest, rounds) =>{

    const totalTime = (work + rest) * rounds - rest;

    const hours   =  new formatTime(0,0,0, totalTime).secondsAndHours();
    const minutes =  new formatTime(0,0,0, totalTime).secondsandmiMutes();
    const seconds =  new formatTime(0,0,0, totalTime).secondsAndSeconds();
    
    const h = hours !== 0 ?  getFormatTime(hours) + ':' : '';
    const m = getFormatTime(minutes) + ':';
    const s = getFormatTime(seconds);
    

    return {
        totalTime: h + m + s, 
        hours, 
        minutes, 
        seconds};
}





//piker item ['00','01','02']
//----------------------------------------------------------------------
export  function createTimerItems(val){
    let arr = [];
    for(let i = 0; i < val; i++){
      i < 10 ? arr.push("0" + i) : arr.push(i)
    }
    return arr
}