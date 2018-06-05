import {getCurrentPosition, getCityId} from './forecast.js';

const HoraInicioManha = 6;
const HoraFinalManha = 11;
const HoraInicioTarde = 12;
const HoraFinalTarde = 17;
const HoraInicioNoite = 18;
const HoraFinalNoite = 23;
const HoraInicioMadrugada = 0;
const HoraFinalMadrugada = 5;
const htmlUL = document.querySelector('ul');
const refreshLocation = document.querySelector('#refresh-location');
let page = 0;

document.addEventListener('DOMContentLoaded', function() {
    getCurrentPosition();
    getCityId(localStorage.getItem('cidade'), localStorage.getItem('estado'));

    let period = getPeriod();
    showWeatherForecast(period, page);

    htmlUL.addEventListener('click', function(e) {
        const id = e.target.id;
        const lastId = page;
        if (id === 'voltar' || id === 'proximo') {
            page -= (id === 'voltar' && page !== 0);
            page += (id === 'proximo' && page !== 4);
        } else page = parseInt(id) - 1;
        if (lastId !== page) {
            htmlUL.children[page + 1].setAttribute('class', 'active');
            htmlUL.children[lastId + 1].setAttribute('class', 'waves-effect');
        }
        let period = getPeriod();
        showWeatherForecast(period, page);
    });

    refreshLocation.addEventListener('click', getCurrentPosition);
});

const showWeatherForecast = function(period) {
    const jsonPrevisao = JSON.parse(localStorage.getItem('previsao'));
    const imagemPrevisao = document.querySelector('#imagem-previsao');
    imagemPrevisao.setAttribute('src', `./image/250px/${
        eval(`jsonPrevisao.data[${page}].text_icon.icon.${period}`)}.jpg`);
    const spanTitulo = document.querySelector('span#titulo');
    spanTitulo.textContent = buildForecastTitle(jsonPrevisao, period);
    fillTable(jsonPrevisao, period);
};

const fillTable = function(json, period) {
    const temperatura = document.querySelector('#temperatura');
    let mediaTemperatura =
    (parseInt(eval(`json.data[${page}].temperature.${period}.min`)) +
        parseInt(eval(`json.data[${page}].temperature.${period}.max`))) / 2;
    temperatura.textContent = mediaTemperatura + ' ºC';

    const sensTermica = document.querySelector('#sens-termica');
    let mediaSensTemperatura =
        (parseInt(eval(`json.data[${page}].thermal_sensation.min`)) +
            parseInt(eval(`json.data[${page}].thermal_sensation.max`))) / 2;
    sensTermica.textContent = mediaSensTemperatura + ' ºC';

    const velVento= document.querySelector('#vel-vento');
    let mediaVelVento = (eval(`json.data[${page}].wind.velocity_avg`));
    velVento.textContent = mediaVelVento + ' Km/H';

    const umidade = document.querySelector('#umidade');
    let mediaUmidade =
        (parseInt(eval(`json.data[${page}].humidity.min`)) +
            parseInt(eval(`json.data[${page}].humidity.max`))) / 2;
    umidade.textContent = mediaUmidade + ' %';

    const probChuva = document.querySelector('#prob-chuva');
    probChuva.textContent = eval(`json.data[${page}].rain.probability`)+ ' %';
};

const buildForecastTitle = function(json, period) {
    const data = tirarAnoData(json.data[page].date_br);
    const texto = eval(`json.data[${page}].text_icon.text
        .phrase.${period}`);
    const cidade = json.name;
    return data + ' - ' + texto + ' em ' + cidade;
};

const tirarAnoData = function(data) {
    data = data.split('/');
    return data[0]+'/'+data[1];
};

const getPeriod = function() {
    const date = new Date();
    const horas = date.getHours();
    if (horas >= HoraInicioManha && horas <= HoraFinalManha) return 'morning';
    if (horas >= HoraInicioTarde && horas <= HoraFinalTarde) return 'afternoon';
    if (horas >= HoraInicioNoite && horas <= HoraFinalNoite ||
        horas >= HoraInicioMadrugada
        && horas <= HoraFinalMadrugada) return 'night';
};
