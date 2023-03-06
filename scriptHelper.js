// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  
  missionTarget = document.getElementById("missionTarget")
  missionTarget.innerHTML = `
  <h2>Mission Destination</h2>
  <ol>
      <li>Name: ${name}</li>
      <li>Diameter: ${diameter}</li>
      <li>Star: ${star}</li>
      <li>Distance from Earth: ${distance}</li>
      <li>Number of Moons: ${moons}</li>
  </ol>
  <img src=${imageUrl}>
  `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    } 
    else if (isNaN(testInput)) {
        return "Not a Number"
    }
    else if (!isNaN(testInput)) {
        return "Is a Number"
    }
    else {
        return testInput
    }
}

function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    
    console.log(pilot);
    console.log(copilot);
    console.log(fuelLevel);
    console.log(cargoLevel);

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("Please fill in all Information");
    }

    else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter valid data types.");
    }

    else {
        let list = document.getElementById("faultyItems");
        let h2 =  document.getElementById("launchStatus");
        console.log(list);
        list.style.visibility = "visible";
        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
        copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
        
        if (fuelLevel<10000 && cargoLevel<=10000) {
            fuelStatus.textContent = "Fuel level too low for launch";
            cargoStatus.textContent = "Cargo mass low enough for launch"
                h2.textContent = "Shuttle Not Ready for Launch";
                h2.style.color = "rgb(199, 37, 78)";
        } else if (fuelLevel<10000 && cargoLevel>10000) { 
            fuelStatus.textContent = "Fuel level too low for launch";
            cargoStatus.textContent = "Cargo mass too heavy for launch";
                h2.textContent = "Shuttle Not Ready for Launch";
                h2.style.color = "rgb(199, 37, 78)";
        } else if (fuelLevel>=10000 && cargoLevel>10000) {
            fuelStatus.textContent = "Fuel level high enough for launch"
            cargoStatus.textContent = "Cargo mass too heavy for launch";
                h2.textContent = "Shuttle Not Ready for Launch";
                h2.style.color = "rgb(199, 37, 78)";
        } else {
            fuelStatus.textContent = "Fuel level high enough for launch"
            cargoStatus.textContent = "Cargo mass low enough for launch"
                h2.textContent = "Shuttle is Ready for Launch";
                h2.style.color = "rgb(65, 159, 106)";
        }
    }   
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let selectedPlanet = Math.floor(Math.random() * planets.length);
    return planets[selectedPlanet]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
