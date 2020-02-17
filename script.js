/*
Tasks:
 1. * Add total number of launches
 2. Add launch number, mission name and date to HTML
 3. Change launch date to show different days of the week, locales
 4. toLocaleDateString() vs. custom array 
*/

const container = document.getElementById("main"); // div
const launchCountHeader = document.getElementById("launchCount"); // H1
const apiUrl = 'https://api.spacexdata.com/v3/launches/past';
fetch(apiUrl)
    .then((response) => {
        return response.json();
    })
    .then((launchArray) => {
        const numLaunches = launchArray.length;
        launchCountHeader.innerHTML = `Total Launches: ${numLaunches}`
        // Do stuff with the JSON here, modify DOM etc..
        launchArray.forEach((launch) => {
            const launchDate = new Date(launch.launch_date_utc);
            console.log(launch);

            // Here we'll make the date readable
            const launchDateString = launchDate.toLocaleDateString('en-US', {weekday: 'short'});
            const launchTimeString = launchDate.toLocaleTimeString('en-US', {timestyle: 'short',hour12:false})

            container.innerHTML += `<p>${launch.flight_number}: ${launch.mission_name} - ${launchDateString}, ${launchTimeString}</p><img src='http://placekitten.com/200/300?q=${Math.random()}'></img>`

        });
    })
