import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { warningInfo, warningError } from './warningInfo';
import { createCountryList, createCountryInfo } from './createListElement';
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

function clearTemplate() {
    refs.cardCountryList.innerHTML = '';
    refs.cardCountryInfo.innerHTML = '';
  };

  