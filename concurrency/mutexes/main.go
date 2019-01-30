package main

import (
	"fmt"
	"log"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	mutex := &sync.Mutex{}
	planetList := make(map[string]string)

	for i := 1; i < 4; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			planet, err := GetPlanet(id)
			if err != nil {
				log.Fatalf("Err getting planet: %v\n", err)
			}

			mutex.Lock()
			planetList[planet.Name] = planet.Climate
			mutex.Unlock()
		}(i)
	}

	wg.Wait()
	fmt.Printf("Planets: %v\n", planetList)
}
