import Notiflix from 'notiflix';

const warningInfo = function warningInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

const warningError = function warningError() {
    Notiflix.Notify.failure(`Oops, there is no country with that name`);
}

export { warningInfo, warningError }