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
        throw alert("Please fill in all Information");
    }

    else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        throw alert("Please enter valid data types.");
    }

    else {
        let list = document.getElementById("faultyItems");
        let list2 =  document.getElementById("launchStatus");
        console.log(list);
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        

        if (fuelLevel<10000 && cargoLevel<=10000) {
            fuelStatus.innerHTML = "Not Enough Fuel";
            cargoStatus.innerHTML = "Cargo Mass is clear for Launch"
                list2.innerHTML = "Shuttle Not Ready for Launch";
                list2.style.color = "red";
        } else if (fuelLevel<10000 && cargoLevel>10000) { 
            fuelStatus.innerHTML = "Not Enough Fuel";
            cargoStatus.innerHTML = "Cargo Mass is too high";
                list2.innerHTML = "Shuttle Not Ready for Launch";
                list2.style.color = "red";
        } else if (fuelLevel>=10000 && cargoLevel>10000) {
            fuelStatus.innerHTML = "Fuel Level is clear for launch"
            cargoStatus.innerHTML = "Cargo Mass is too high";
                list2.innerHTML = "Shuttle Not Ready for Launch";
                list2.style.color = "red";
        } else {
            fuelStatus.innerHTML = "Fuel Level is clear for launch"
            cargoStatus.innerHTML = "Cargo Mass is clear for Launch"
                list2.innerHTML = "Shuttle is Ready for Launch";
                list2.style.color = "green";
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
