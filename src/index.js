import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    cardCountryList: document.querySelector('.country-list'),
    cardCountryInfo: document.querySelector('.country-info'),
    inputForm: document.getElementById('search-box')
};

const debounceDelay = debounce(searchCountry, DEBOUNCE_DELAY)
refs.inputForm.addEventListener('input', debounceDelay);

function searchCountry(e) {
    e.preventDefault();
  
    const inputValue = e.target.value.trim();

  if (!inputValue) {
    clearTemplate();
    return;
  }
    fetchCountries(inputValue)
    .then(data => {
        if (data.length > 10) {
            warningInfo();
            clearTemplate();
            return;
        }
        renderContryCard(data);
    })
    .catch(Error => {
        clearTemplate();
        warningError();
    }); 
};

function renderContryCard(el) {
   
    clearTemplate();
    if (el.length === 1) {
      const markupCountryInfo = createCountryInfo(el);
        refs.cardCountryInfo.innerHTML = markupCountryInfo;
    } else { 
       const markupCountryList = createCountryList(el);
        refs.cardCountryList.innerHTML = markupCountryList;
    }   
};

function createCountryList(el) {
    return el.map(({ name, flags }) => `<li class="countrylist_item"><img src="${flags.svg}" alt="${name}" class="countrylist_img">
    <p class="countrylist_text">${name.common}</p></li>`)
    .join('');
};

function createCountryInfo(el) {
    return el.map(({ flags, name, capital, population, languages }) =>`
    <div class="info-conteiner">
    <div class="countryInfo_conteiner">
    <img src="${flags.svg}" alt="${name.common}" class="countryInfo_img"> 
    <h2 class="countryInfo_title">${name.common}</h2>
  </div>
  <ul class="countryInfo_list">
    <li class="countryInfo_item">capital: <span class="countryInfo_span">${capital}</span></li>
    <li class="countryInfo_item">population: <span class="countryInfo_span">${population}</span></li>
    <li class="countryInfo_item">languages: <span class="countryInfo_span">${Object.values(languages)}</span></li>
  </ul>
  </div>`)
  .join('');
};

function warningInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

function warningError() {
    Notiflix.Notify.failure(`Oops, there is no country with that name`);
};

function clearTemplate() {
    refs.cardCountryList.innerHTML = '';
    refs.cardCountryInfo.innerHTML = '';
  };

  