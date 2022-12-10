
const createCountryList = function createCountryList(el) {
    return el.map(({ name, flags }) => `<li class="countrylist_item"><img src="${flags.svg}" alt="${name}" class="countrylist_img">
    <p class="countrylist_text">${name.common}</p></li>`)
    .join('');
};

const createCountryInfo = function createCountryInfo(el) {
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

export { createCountryList, createCountryInfo };