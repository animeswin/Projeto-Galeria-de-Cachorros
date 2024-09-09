document.addEventListener("DOMContentLoaded", () => {
  const breedButtonsContainer = document.getElementById("breed-buttons")
  const imagesContainer = document.getElementById("dog-images")
  const errorMessage = document.getElementById("error-message")

  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => response.json())
    .then((data) => {
      const breeds = Object.keys(data.message)
      displayBreedButtons(breeds)
    })
    .catch(() => {
      errorMessage.textContent =
        "Ocorreu um erro ao carregar a lista de raças."
      errorMessage.classList.remove("hidden")
    })

  function displayBreedButtons(breeds) {
    breeds.forEach((breed) => {
      const button = document.createElement("button")
      button.textContent = breed
      button.addEventListener("click", () => fetchBreedImages(breed))
      breedButtonsContainer.appendChild(button)
    })
  }

  function fetchBreedImages(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`)
      .then((response) => response.json())
      .then((data) => {
        displayImages(data.message)
      })
      .catch(() => {
        errorMessage.textContent = "Ocorreu um erro ao carregar as imagens."
        errorMessage.classList.remove("hidden")
      })
  }

  function displayImages(images) {
    imagesContainer.innerHTML = ""
    errorMessage.classList.add("hidden")
    images.forEach((imageUrl) => {
      const img = document.createElement("img")
      img.src = imageUrl
      imagesContainer.appendChild(img)
    })
  }
})