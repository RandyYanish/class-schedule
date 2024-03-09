import React, { useState, useEffect } from 'react';

const ClassScheduler = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfMonologues, setNumberOfMonologues] = useState(0);
  const [numberOfScenes, setNumberOfScenes] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [runningTime, setRunningTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [averageSceneTime, setAverageSceneTime] = useState(0);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setRunningTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [startTime]);

  const calculateSchedule = () => {
    if (!startTime || !endTime) {
      alert('Please enter valid start and end times.');
      return;
    }
  
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);
    const breakTime = 5;
    const totalMinutes = endMinutes - startMinutes;
    const numberOfElements = numberOfScenes + numberOfMonologues + 1;
  
    const averageSceneTime = Math.floor((totalMinutes - (numberOfMonologues * 10) - breakTime) / (numberOfScenes + 1));
    

  
    let newSchedule = [];
    let accumulatedTime = 0;
  
    for (let i = 1; i <= numberOfElements; i++) {
      let elementEndTime;
  
      if (accumulatedTime > totalMinutes / 2) {
        newSchedule.push({ type: 'Break', endTime: convertMinutesToTime(startMinutes + accumulatedTime) });
        accumulatedTime += breakTime;
        continue;
      }
  
      if (i <= numberOfScenes) {
        elementEndTime = convertMinutesToTime(startMinutes + (averageSceneTime * i) + accumulatedTime);
      } else {
        const monologueNumber = i - numberOfScenes;
        elementEndTime = convertMinutesToTime(endMinutes - (numberOfMonologues - monologueNumber) * 10);
      }
  
      newSchedule.push({ type: i <= numberOfScenes ? 'Scene' : 'Monologue', endTime: elementEndTime });
    }
  
    setSchedule(newSchedule);
  };
  

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours || 12;
    return `${displayHours}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
  };

  const handleStartClick = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    setStartTime(`${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    setRunningTime(seconds + minutes * 60 + hours * 3600);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className='grid mx-2'>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>Start Time:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="time" value={startTime} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>End Time:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>Number of Monologues:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="number" value={numberOfMonologues} onChange={(e) => setNumberOfMonologues(Number(e.target.value))} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>Number of Scenes:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="number" value={numberOfScenes} onChange={(e) => setNumberOfScenes(Number(e.target.value))} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        {!startTime && <button onClick={handleStartClick} className='rounded-full hover:bg-magenta bg-magenta-dark dark:bg-ice-dark py-2 px-8 text-steel-light text-xl font-serif dark:hover:bg-ice pointer-events-auto hover:scale-110 duration-500 m-2w-32 m-2'>START</button>}
      </div>
      <div className='flex justify-center align-middle items-center'>
        {startTime && <button onClick={calculateSchedule} className='rounded-full hover:bg-magenta bg-magenta-dark dark:bg-ice-dark py-2 px-8 text-steel-light text-xl font-serif dark:hover:bg-ice pointer-events-auto hover:scale-110 duration-500 m-2'>Calculate Schedule</button>}
      </div>
      <div className='flex justify-center align-middle items-center m-2'>
        {startTime && <p className='dark:text-ice-light'>Running Time: {formatTime(runningTime)}</p>}
      </div>
      <h3>Proposed Schedule:</h3>
      <ul>
        {schedule.map((item, index) => (
          <li key={index}>
            {item.type === 'Scene' && `Scene ${index + 1}: Ends @ ${item.endTime}`}
            {item.type === 'Monologue' && `Monologue ${item.number}: Ends @ ${item.endTime}`}
            {item.type === 'Break' && 'Break'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassScheduler;
