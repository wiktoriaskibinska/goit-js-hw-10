import axios from "axios";
import { fetchBreeds,fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';



//selecting html elements
const body = document.querySelector('body')
const selectInput = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const loadError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
loadError.style.display = 'none'
selectInput.style.display='none'
loader.style.display = 'block';
catInfo.style.display = 'none';


let storedBreeds = [];
//

    fetchBreeds().then(
    
        data => {
            selectInput.style.display='block'
        loader.style.display='none'
            storedBreeds = data;
    
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');
            option.value = breed.id;
            option.innerHTML = `${breed.name}`;
            selectInput.appendChild(option);
          

    
            };
              new SlimSelect({
                  select: selectInput,
                  settings: {
                      showSearch: false,
                  }
                
                  
})
        },).catch(error => {
            Notiflix.Report.failure(
                'Error!',
                'Something went wrong!Try reloading the page!'

            )
        }
    )


//
selectInput.addEventListener("change", event => {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    let breedId = event.currentTarget.value;
    console.log(breedId);
    
   
    fetchCatByBreed(breedId).then(
        data => {
            const url = data[0].url;
            console.log
            console.log(data);
            catInfo.innerHTML = `
            <div  class="cat-img"> <img src="${data[0].url}" width="600"></img> </div>
            <div class="cat-text" style="display: flex">
            <h2> ${data[0].breeds[0].name}</h2>
            <p>${data[0].breeds[0].description}</p>
            </div>`  
            catInfo.style.display = 'block'
            
}
    ).catch(error => {
            Notiflix.Report.failure(
                'Error!',
                'Something went wrong!Try reloading the page!'

            )
        }
    ).finally(() => {
        loader.style.display = 'none'
    })
});






