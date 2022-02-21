let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  function getAllToys(){
    fetch('http://localhost:3000/toys')
    .then(response => response.json())

    .then(data => data.forEach(toyData => {
      renderToys(toyData)
    }))

  }

  getAllToys()

function renderToys(toy){
  const toyCollection = document.querySelector('#toy-collection')
      let newDiv = document.createElement('div')
      newDiv.setAttribute('class','card')
      newDiv.innerHTML = `
      <h2>${toy.name}</h2>
      <img class = 'toy-avatar' src= '${toy.image}'/>
      <p> <span id = 'num-of-likes'> ${toy.likes} </span> Likes </p>
      <button class = 'like-btn' id = ${toy.id}> Like </button>`;
      toyCollection.appendChild(newDiv)

     newDiv.querySelector('.like-btn').addEventListener('click', 
     () => {
      toy.likes+= 1
      newDiv.querySelector('span').textContent = toy.likes 
      updateToyLikes(toy)
      })
    }
    
  function updateToyLikes(toy){

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(data => console.log(data))

  }
  getAllToys()

  function newToydata(newToy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
        Accept: 'application/JSON'
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }


  document.querySelector('.add-toy-form').addEventListener('submit',submitToys)

  function submitToys(e){
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    renderToys(toyObj)
    newToydata(toyObj);
    
  }
  
  //newToydata()
  addBtn.addEventListener("click", () => {

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });



});
