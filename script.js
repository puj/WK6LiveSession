const container = document.getElementById("main"); // main
const launchCountHeader = document.getElementById("launchCount"); // h1
const apiUrl = "https://api.spacexdata.com/v3/launches/past";
launchCountHeader.innerHTML = 15;

const generateHTMLForLaunch = (launch) => {
  const launchDate = new Date(launch.launch_date_utc);
  // Here we'll make the date readable
  const launchDateString = launchDate.toLocaleDateString("en-US", {});
  const launchTimeString = launchDate.toLocaleTimeString("en-US", {
    timestyle: "short",
    hour12: false,
  });

  console.log(launch.launch_success);
  const launchOutcomeImage = launch.launch_success
    ? "success.png"
    : "failure.png";
  console.log(launchOutcomeImage);

  let launchHTML = "";
  launchHTML += `<section class='launch'>`;
  launchHTML += ` <img src='./${launchOutcomeImage}'>`;
  launchHTML += ` <p>${launch.flight_number}: ${launch.mission_name} - ${launchDateString}, ${launchTimeString}</p>`;
  launchHTML += `</section>`;
  return launchHTML;
};

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((launches) => {
    launchCountHeader.innerHTML = launches.length;
    launches.forEach((launch) => {
      container.innerHTML += generateHTMLForLaunch(launch);
    });
  });
