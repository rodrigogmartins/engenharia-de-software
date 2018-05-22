import {CLIMATEMPOTOKEN} from './apikeys.js';
import {ESTADOS} from './estados.js';

const ajax = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = callback;
    xhr.send();
};

export const getCurrentPosition = function() {
    navigator.geolocation.getCurrentPosition(function(posicao) {
        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;
        ajax(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, (e) => getCityId(JSON.parse(e.target.response).address.city, ESTADOS.get(JSON.parse(e.target.response).address.state)));
    });
};

const getCityId = (cityName, state) => ajax(`https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${cityName}&state=${state}&token=${CLIMATEMPOTOKEN}`, (e) => getWeatherForecast(JSON.parse(e.target.response)[0].id));

const getWeatherForecast = (cityId) =>
    ajax(`https://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${cityId}/days/15?token=${CLIMATEMPOTOKEN}`,
        (e) => localStorage.setItem('previsao', e.target.response));
