const apiUrl = 'https://api.spacexdata.com/v3/launches';
const container = document.getElementById('main');
const launchCountHeader = document.getElementById('launchCount');

fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((launchArray) => {
    // Update launch count
    launchCountHeader.innerHTML = launchArray.length;

    // Add HTML content for each launch
    launchArray.forEach((launch) => {
      container.innerHTML += generateHTMLForLaunch(launch);
    });
  });

const generateHTMLForLaunch = (launch) => {
  // Create time strings for launch
  const launchDate = new Date(launch.launch_date_utc);
  const launchTimeString = launchDate.toLocaleTimeString('en-US', {
    timestyle: 'short',
    hour12: false,
  });
  const launchDateString = launchDate.toLocaleDateString('en-US', {
    weekday: 'short',
  });

  // Determine image to show for launch
  const launchOutcome = launch.launch_success;
  const launchOutcomeImageUrl = launchOutcome
    ? './success.png'
    : './failure.png';

  // Create HTML code to return
  let launchHTML = '';
  launchHTML += `<section class="launch">`;
  launchHTML += ` <img src='${launchOutcomeImageUrl}'>`;
  launchHTML += ` <p>${launch.flight_number}: ${launch.mission_name} - ${launchDateString} ${launchTimeString}</p>`;
  launchHTML += `</section>`;
  return launchHTML;
};
