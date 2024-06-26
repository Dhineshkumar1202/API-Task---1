let timer
let deleteFirstphotodelay


async function start() {
   try{
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
   } catch (e) {
    console.log("There was a problem fetching the breed list.");
    
   }
}

start()




function createBreedList(breedlist){
    document.getElementById("breed").innerHTML = `
     <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedlist).map(function (breed){
            return` <option>${breed}</option>`
       }).join('')}
        </select>
    `
}


async function loadByBreed(breed) {
    if (breed != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        console.log(data);
        createSlideshow(data.message)
    }
}

function createSlideshow(image){
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstphotodelay)

    if (image.length > 1){
        document.getElementById("slideshow").innerHTML = `
     <div class="slide" style="background-image:url('${image[0]}')"></div>
     <div class="slide" style="background-image:url('${image[1]}')"></div>
     `

     currentPosition += 2
     if(image.length == 2) currentPosition = 0
     timer= setInterval(nextSlide, 3000)
    }else {

    }
    document.getElementById("slideshow").innerHTML = `
     <div class="slide" style="background-image:url('${image[0]}')"></div>
     <div class="slide"></div>
     `

     currentPosition += 2
     timer= setInterval(nextSlide, 3000)

     function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend" ,`<div class="slide" style="background-image:url('${image[currentPosition]}')"></div>`)
        deleteFirstphotodelay = setTimeout(function (){
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1>= image.length){
            currentPosition = 0
         } else {
            currentPosition++
         }
    }
}