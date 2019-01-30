package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

//Planet represents a planet from a long time ago and far, far away
type Planet struct {
	Climate string `json:"climate"`
	Name    string `json:"name"`
}

//Person is a character from the Star Wars Universe
type Person struct {
	Name string `json:"name"`
}

//GetPlanet retrieves planet information from the Star Wars API
func GetPlanet(id int) (p Planet, err error) {
	url := fmt.Sprintf("https://swapi.co/api/planets/%d", id)
	res, err := http.Get(url)
	if err != nil {
		return p, err
	}

	defer res.Body.Close()

	err = json.NewDecoder(res.Body).Decode(&p)
	if err != nil {
		return p, err
	}

	return p, nil
}

//GetPerson retrieves character information from the Star Wars API
func GetPerson(id int) (p Person, err error) {
	url := fmt.Sprintf("https://swapi.co/api/people/%d", id)
	res, err := http.Get(url)
	if err != nil {
		return p, err
	}

	defer res.Body.Close()

	err = json.NewDecoder(res.Body).Decode(&p)
	if err != nil {
		return p, err
	}

	return p, nil
}
