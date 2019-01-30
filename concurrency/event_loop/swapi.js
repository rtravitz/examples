const axios = require('axios')

const client = axios.create({ baseURL: 'https://swapi.co/api' })

async function getPlanet(i) {
  const response = await client.get(`/planets/${i}`)
  return response.data
}

async function getPerson(i) {
  const response = await client.get(`/people/${i}`)
  return response.data
}

function printIncomingTransmissions(planet, person) {
  console.log(`Incoming transmission from the ${planet.climate} surface of ${planet.name}! It's from ${person.name}.`)
}

async function main() {
  let planetCalls = []
  let personCalls = []

  for (let i = 1; i < 4; i++) {
    planetCalls.push(getPlanet(i))
    personCalls.push(getPerson(i))
  }

  const planets = await Promise.all(planetCalls)
  const people = await Promise.all(personCalls)

  planets.forEach((planet, idx) => { printIncomingTransmissions(planet, people[idx]) })
}

main()
