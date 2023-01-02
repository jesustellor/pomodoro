import { useState, useEffect } from "react";

export default function Countdown() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState({first: 25, second: 25});
  const [breakMin, setBreakMin] = useState({first: 5, second: 5});
  const [count, setCount] = useState({breakDwn: 5, sessionDwn: 25});
  const [sessionRunning, setSessionRunning] = useState(false);
  const [breakRunning, setBreakRunning] = useState(false);


  useEffect(() => {
    if (sessionRunning) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      }else if (minutes.second === 0 && seconds === 0){
        let audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
        audio.play();
        setSessionRunning(false);
        setBreakRunning(true);
      } else if (seconds === 0) {
        setMinutes({...minutes, second: minutes.second - 1});
        setSeconds(59);
      } else {
         return;
      }
    }else if (breakRunning){
      if(seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      }else if(breakMin.second > 0 && seconds === 0){
        setBreakMin({...breakMin, second: breakMin.second - 1});
        setSeconds(59);
      }else if(seconds === 0 && breakMin.second === 0){
        let audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
        audio.play();
        setBreakRunning(false)
        setSessionRunning(true)
        setMinutes({...minutes, second: Math.abs(count.sessionDwn)});
        setBreakMin({...breakMin, second: Math.abs(count.breakDwn)});
        setSeconds(0);
      }
    }
  }, [sessionRunning, minutes, seconds, breakMin, breakRunning, count]);

  let myFun = () => {
    setSessionRunning(true);
  }

  let noFun = () => {
    setSessionRunning(false);
  }

  let increase = (event) => {
    let select = event.target.id
    if(select === 'breakId'){
      setCount({...count, breakDwn: count.breakDwn + 1})
      console.log(count.breakDwn)
      return setBreakMin({...breakMin, second: breakMin.second + 1});
    }else if(select === 'sessionId'){
      setCount({...count, sessionDwn: count.sessionDwn + 1})
      console.log(count.sessionDwn)
      return setMinutes({...minutes, second: minutes.second + 1});
    }
  }

  let decrease = (event) => {
    let select = event.target.id
    if(select === 'breakId'){
      if(breakMin.second > 0){
        setCount({...count, breakDwn: count.breakDwn - 1})
        console.log(count.breakDwn)
        return setBreakMin({...breakMin, second: breakMin.second - 1});
      }
    }else if(select === 'sessionId'){
      if(minutes.second > 0){ 
        setCount({...count, sessionDwn: count.sessionDwn - 1})
        console.log(count.sessionDwn)
        return setMinutes({...minutes, second: minutes.second - 1});
      }
    }
  }

  let resetApp = () => {
    noFun();
    setBreakMin({...breakMin, second: breakMin.first});
    setMinutes({...minutes, second: minutes.first});
    setTimeout(() => {
      setSeconds(0)
    }, 1000);
  }

  return (
    <div>
    <section>
      <p>Break in Minutes:</p>
     <button id="breakId" onClick={increase}>Up</button> <p>{breakMin.second}</p> <button id="breakId" onClick={decrease}>Dwn</button>
    </section>
    <section>
      <p>Session Length:</p>
     <button id="sessionId" onClick={increase}>Up</button> <p>{minutes.second}</p> <button id="sessionId" onClick={decrease}>Dwn</button>
    </section>
      <p>Countdown: {minutes.second === 0 && seconds === 0? breakMin.second : minutes.second} : {seconds.toString().padStart(2, "0")}</p> 
      <section>
        <button onClick={() => myFun()}>play</button>
        <button onClick={() => noFun()}>stop</button>
        <button onClick={() => resetApp()}>reset</button>
      </section>
    </div>
  );
}
