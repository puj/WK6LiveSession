const apiUrl = 'https://api.spacexdata.com/v3/launches';
const launchCountHeader = document.getElementById('launchCount');
const container = document.getElementById('main');

console.log('API Fetch Starting');

// Takes 5.19s to complete
fetch(apiUrl)
  .then((response) => {
    // Note:  This response does not contain the data, only information about the request
    console.log(`Response OK? ${response.ok}`);
    console.log(`Response Status: ${response.status}`);
    console.log('API Response Received');

    // We tell javascript to trigger our next `then` once the json is parsed into a javascript object
    return response.json();
  })
  .then((data) => {
    // data - our Array of launches
    // Note: This could be a good place to add a commented snippet of our data for reference.

    // We have access to all of the launch data here
    console.log(`Data: ${data}`);
    console.log(`Length: ${data.length}`);
    launchCountHeader.innerHTML = `${data.length}`;

    // We should update all elements that show launch data
    data.forEach((launch) => {
      // Alternative 1: With a local constant
      const wasSuccessful = launch.launch_success;
      const imageSrc = wasSuccessful ? 'success.png' : 'failure.png';

      // // Alternative 2: Access the data in-line
      // const imageSrc = launch.launch_success ? 'success.png' : 'failure.png';

      // Alternative 1: Create HTML on separate lines
      let launchHTML = '';
      launchHTML += `<section class="launch">`;
      launchHTML += `<img src=${imageSrc}> </img>`;
      launchHTML += `<p>${launch.flight_number}: ${launch.mission_name} </p>`;
      launchHTML += `</section>`;

      container.innerHTML += launchHTML;

      // Alternative 2: Create HTML on one-line
      // container.innerHTML += `
      //   <section class="launch">
      //     <img src=${imageSrc}> </img>
      //     <p>${launch.flight_number}: ${launch.mission_name} </p>
      //   </section>`;
    });
  });

// Notice: This is printed BEFORE the .then function is executed
console.log('API Fetch Initiated');
