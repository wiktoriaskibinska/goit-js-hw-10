import axios from "axios";
import { fetchBreeds,fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';




//selecting html elements
const body = document.querySelector('body')
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const loadError = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
loadError.style.display = 'none'
select.style.display='none'
loader.style.display = 'block';


let storedBreeds = [];
//

    fetchBreeds().then(
    
        data => {
            select.style.display='block'
        loader.style.display='none'
        storedBreeds = data;
        for (let i = 0; i < storedBreeds.length; i++) {
            const breed = storedBreeds[i];
            let option = document.createElement('option');
            option.value = breed.id;
            option.innerHTML = `${breed.name}`;
            select.appendChild(option);
    
        };
        },).catch(error => {
            Notiflix.Report.failure(
                'Error!',
                'Something went wrong!Try reloading the page!'

            )
        }
    )


//
select.addEventListener("change", event => {
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
            <img src="${data[0].url}" width="600"></img>
            <h2> ${data[0].breeds[0].name}</h2>
            <p>${data[0].breeds[0].description}</p>`  
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



