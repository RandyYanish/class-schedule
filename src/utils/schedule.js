import { timeToMinutes } from "./time";

export function calculateSchedule(startTime, endTime, numberOfScenes, numberOfMonologues) {
  if (startTime && endTime && numberOfScenes && numberOfMonologues) {
    let schedule = [];
    let startMinutes = timeToMinutes(startTime);
    let endMinutes = timeToMinutes(endTime);
    let monologueTime = 10;
    let breakTime = 5;
    let remainingTime = endMinutes - startMinutes;
    let halfTime = Math.floor(remainingTime / 1.5);

    for (let i = 0; i < numberOfMonologues; i++) {
      let monologue = {};
      monologue.endTime = endTime;
      endMinutes -= 10;
      monologue.startTime = `${Math.floor(endMinutes / 60)}:${endMinutes % 60}`;
      monologue.name = `Monologue ${numberOfMonologues - i}`;
      schedule.push(monologue);
      endTime = monologue.startTime;
      remainingTime -= monologueTime;
    };

    let sceneTime = Math.floor((remainingTime - 5) / numberOfScenes);
    let breakAdded = false;

    for (let i = 0; i < numberOfScenes; i++) {
      if (breakAdded === false && remainingTime <= halfTime) {
        let midBreak = {};
        midBreak.endTime = endTime;
        endMinutes -= breakTime;
        midBreak.startTime = `${Math.floor(endMinutes / 60)}:${endMinutes % 60}`;
        midBreak.name = `Break`;
        schedule.push(midBreak);
        endTime = midBreak.startTime;
        remainingTime -= breakTime;
        breakAdded = true;
      };
      let scene = {};
      scene.endTime = endTime;
      endMinutes -= sceneTime;
      scene.startTime = `${Math.floor(endMinutes / 60)}:${endMinutes % 60}`;
      scene.name = `Scene ${numberOfScenes - i}`;
      schedule.push(scene);
      endTime = scene.startTime;
      remainingTime -= sceneTime;
    };

    schedule = schedule.reverse();
    return schedule;
  } else {
    return 'Please fill out all fields';
  };
};
