// Write your JavaScript code here! 

window.addEventListener("load", function() {
    console.log("Window Loaded")
    let listedPlanets;
     // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
    }).then(function () {
       console.log(listedPlanets);
       console.log("testMessage")
       
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planetSelection = pickPlanet(listedPlanets);
       addDestinationInfo(document, planetSelection.name, planetSelection.diameter, planetSelection.star, planetSelection.distance, planetSelection.moons, planetSelection.image)
    })

    let launchForm = document.getElementById("launchForm");
    launchForm.addEventListener("submit", function(submission){
         submission.preventDefault()   
         //console.log("Pre Form Submission")

         let pilotInput = document.querySelector("input[name=pilotName]");
         let pilot = String(pilotInput.value);
         let copilotInput = document.querySelector("input[name=copilotName]");
         let copilot = String(copilotInput.value);
         let fuelInput = document.querySelector("input[name=fuelLevel]");
         let fuelLevel = Number(fuelInput.value);
         let cargoInput = document.querySelector("input[name=cargoMass]");
         let cargoMass = Number(cargoInput.value);

        //console.log(pilotInput.value);

        formSubmission(document, pilot, copilot, fuelLevel, cargoMass)
    });

});