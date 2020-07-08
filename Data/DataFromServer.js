// Data/DataFromServer.js

export function requestNewProgram (muscle, goal, level) {
    const url = 'http://localhost:3000/requestexercises/' + muscle + '/' + goal + '/' + level
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err))
}

export function requestProgram (muscle, level, goal) {
  const url = 'http://localhost:3000/request/' + muscle + '/' + level + '/' + goal
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestProgramWithSpecificPart (muscle, part, level, goal) {
  const url = 'http://localhost:3000/specificpart' + '/' + muscle + '/' + part + '/' + level + '/' + goal
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestAllExercises(level, goal) {
  const url = 'http://localhost:3000/allexercises/' + level + '/' + goal
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function requestDetails(exercise) {
  const url = 'http://localhost:3000/details/' + exercise
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
