let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

const toyCollection = document.getElementById("toy-collection"); // Reference to toy collection

// Function to add a new toy
function addNewToy(name, image) {
  const postData = {
    name: name,
    image: image,
    likes: 0
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(response => response.json())
    .then(data => {
      const newToyHTML = `
        <div class="card">
          <h2>${data.name}</h2>
          <img src="${data.image}" class="toy-avatar" />
          <p>${data.likes} Likes</p>
          <button class="like-btn" id="${data.id}">Like ❤️</button>
        </div>`;
      toyCollection.insertAdjacentHTML("beforeend", newToyHTML);
    })
    .catch(error => console.error("Error adding toy:", error));
}

// Event listener for form submission
document.querySelector(".add-toy-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  addNewToy(name, image);
  event.target.reset();
});

// Fetch and render existing toys
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => {
      const toyHTML = `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" id="${toy.id}">Like ❤️</button>
        </div>`;
      toyCollection.insertAdjacentHTML("beforeend", toyHTML);
    });
  })
  .catch(error => console.error("Error fetching toys:", error));
});