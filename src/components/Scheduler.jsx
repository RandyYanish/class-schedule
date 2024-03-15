import React, { useEffect, useState } from 'react';
import { calculateSchedule } from '../utils/schedule';
import { currentTime, formatTimeMinutes, formatTimeSeconds, timeToMinutes } from '../utils/time';

const ClassScheduler = () => {
  const [startTime, setStartTime] = useState(localStorage.getItem('startTime') || '');
  const [endTime, setEndTime] = useState(localStorage.getItem('endTime') || '');
  const [numberOfScenes, setNumberOfScenes] = useState(localStorage.getItem('numberOfScenes') || '');
  const [numberOfMonologues, setNumberOfMonologues] = useState(localStorage.getItem('numberOfMonologues') || '');
  const [time, setTime] = useState(currentTime('hh:mm:ss'));
  const [schedule, setSchedule] = useState(JSON.parse(localStorage.getItem('schedule')) || []);
  const [sceneTime, setSceneTime] = useState(localStorage.getItem('sceneTime') || '');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(currentTime('hh:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem(name, value);

    switch (name) {
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      case 'numberOfScenes':
        setNumberOfScenes(value);
        break;
      case 'numberOfMonologues':
        setNumberOfMonologues(value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === '') {
      localStorage.removeItem(name);

      switch (name) {
        case 'startTime':
          setStartTime('');
          break;
        case 'endTime':
          setEndTime('');
          break;
        case 'numberOfScenes':
          setNumberOfScenes('');
          break;
        case 'numberOfMonologues':
          setNumberOfMonologues('');
          break;
        default:
          break;
      }
    }
  };

  let handleCalculate = () => {
    try {
      const calculatedSchedule = calculateSchedule(startTime, endTime, numberOfScenes, numberOfMonologues);
      console.log(calculatedSchedule);
      localStorage.setItem('schedule', JSON.stringify(calculatedSchedule));
      setSchedule(calculatedSchedule);
      let scene = calculatedSchedule[0];
      setSceneTime(timeToMinutes(scene.endTime) - timeToMinutes(scene.startTime));
    } catch (error) {
      console.log(error);
    }
  };

  let handleSetStartTime = () => {
    let updatedStartTime = currentTime('hh:mm');
    handleChange({ target: { name: 'startTime', value: updatedStartTime } });
  };

  let handleReset = () => {
    localStorage.clear();
    setStartTime('');
    setEndTime('');
    setNumberOfScenes('');
    setNumberOfMonologues('');
    setSchedule([]);
    setSceneTime('');
  };

  return (
    <div className='grid mx-2'>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>{!startTime ? (<span className='text-red-600 font-bold text-lg w-2 h-2'>*</span>) : (<span className='w-2 h-2 text-transparent text-lg font-bold'>*</span>)}Start Time:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="time" name='startTime' value={startTime} onChange={handleChange} onBlur={handleBlur} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        {!startTime ? (<button onClick={handleSetStartTime} className='rounded-full hover:bg-magenta bg-magenta-dark dark:bg-teal-600 py-2 px-8 text-steel-light text-xl font-serif dark:hover:bg-teal-500 pointer-events-auto hover:scale-110 duration-500 m-2'>Start Now</button>) : (<button className='rounded-full bg-steel-400 dark:bg-steel-850 py-2 px-8 dark:text-steel text-steel-100 text-xl font-serif pointer-events-none duration-500 m-2'>Start Now</button>)}
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>{!endTime ? (<span className='text-red-600 font-bold text-lg w-2 h-2'>*</span>) : (<span className='w-2 h-2 text-transparent text-lg font-bold'>*</span>)}End Time:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="time" name='endTime' value={endTime} onChange={handleChange} onBlur={handleBlur} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>{!numberOfScenes ? (<span className='text-red-600 font-bold text-lg w-2 h-2'>*</span>) : (<span className='w-2 h-2 text-transparent text-lg font-bold'>*</span>)}Number of Scenes:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="number" name='numberOfScenes' value={numberOfScenes} onChange={handleChange} onBlur={handleBlur} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='mr-2 dark:text-ice-light '>{!numberOfMonologues ? (<span className='text-red-600 font-bold text-lg w-2 h-2'>*</span>) : (<span className='w-2 h-2 text-transparent text-lg font-bold'>*</span>)}Number of Monologues:</label>
        <input className='w-32 rounded-lg p-1 m-2' type="number" name='numberOfMonologues' value={numberOfMonologues} onChange={handleChange} onBlur={handleBlur} />
      </div>
      <div className='flex justify-center align-middle items-center'>
        {startTime && endTime && numberOfMonologues && numberOfScenes ? (<p></p>) : (<p className='text-red-600 italic'>* required</p>)}
      </div>
      <div className='flex justify-center align-middle items-center'>
        <div className='flex justify-center align-middle items-center'>
          {startTime && endTime && numberOfMonologues && numberOfScenes ? (<button onClick={handleCalculate} className='rounded-full hover:bg-magenta bg-magenta-dark dark:bg-teal-600 py-2 px-8 text-steel-light text-xl font-serif dark:hover:bg-teal-500 pointer-events-auto hover:scale-110 duration-500 m-2'>Calculate Schedule</button>) : (<button className='rounded-full bg-steel-400 dark:bg-steel-850 py-2 px-8 dark:text-steel text-steel-100 text-xl font-serif pointer-events-none duration-500 m-2'>Calculate Schedule</button>)}
        </div>
      </div>
      <div className='flex justify-center align-middle items-center'>
        <label className='dark:text-ice-light m-2'>Minutes per Scene:</label>
        <p className='dark:text-ice-light mx-2'>{sceneTime}</p>
      </div>
      <div className='flex justify-center align-middle items-center font-bold'>
        <label className='dark:text-ice-light m-2'>Current Time:</label>
        <p className='dark:text-ice-light mx-2'>{formatTimeSeconds(time)}</p>
      </div>
      <div className='flex justify-center align-middle items-center m-2'>
        <label className='dark:text-ice-light italic'>Proposed Schedule:</label>
      </div>
      <div className='flex justify-center align-middle items-center'>
        <table>
          <thead>
            <tr>
              <th className='dark:text-ice-light w-auto text-right px-2'>Scene</th>
              <th className='dark:text-ice-light w-auto px-2'>Start</th>
              <th className='dark:text-ice-light w-auto px-2'>End</th>
            </tr>
          </thead>
          {schedule.map((item, index) => (
            <tbody key={index} className='dark:text-ice-light text-center m-1'>
              <tr>
                <td className='text-right w-auto px-2'>{item.name}:</td>
                <td className='w-auto px-2'>{formatTimeMinutes(item.startTime)}</td>
                <td className='w-auto px-2'>{formatTimeMinutes(item.endTime)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className='flex justify-center align-middle items-center'>
        <button onClick={handleReset} className='rounded-full hover:bg-magenta bg-magenta-dark dark:bg-teal-600 py-2 px-8 text-steel-light text-xl font-serif dark:hover:bg-teal-500 pointer-events-auto hover:scale-110 duration-500 m-2'>Reset</button>
      </div>
    </div>
  );
};

export default ClassScheduler;
