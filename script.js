const container = document.getElementById("main");
fetch('http://api.open-notify.org/astros.json')
    .then((response) => {
        return response.json();
    })
    .then((json) =>{
        console.log(json);
        json.people.forEach(element => {
            container.innerHTML += `<p>${element.name}</p>`
        });
    })