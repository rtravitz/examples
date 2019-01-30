package main

import (
	"fmt"
	"log"
)

func printIncomingTransmissions(planets chan Planet, people chan Person) {
	planet := <-planets
	person := <-people
	fmt.Printf("Incoming transmission from the %s surface of %s! It's from %s\n", planet.Climate, planet.Name, person.Name)
}

func sendPlanet(id int, planets chan Planet) {
	planet, err := GetPlanet(id)
	if err != nil {
		log.Fatalf("Error retrieving planet: %v\n", err)
	}
	planets <- planet
}

func sendPerson(id int, people chan Person) {
	person, err := GetPerson(id)
	if err != nil {
		log.Fatalf("Error retrieving person: %v\n", err)
	}
	people <- person
}

func main() {
	planets := make(chan Planet)
	people := make(chan Person)

	for i := 1; i < 4; i++ {
		go sendPlanet(i, planets)
		go sendPerson(i, people)
	}

	printIncomingTransmissions(planets, people)
	printIncomingTransmissions(planets, people)
	printIncomingTransmissions(planets, people)
}
