let card =document.getElementById('tarjeta');
let form =document.getElementById('formulario');
let detail =document.getElementById('detalle');

const CALCULAR = document.getElementById('calcular');
const VOLUMEN = document.getElementById('volumen');
const VOLUMEN2 = document.getElementById('volumen2')
const ERROR = document.getElementById('error');
const MANTMEDIO = document.getElementById('mantmedio');
const FLUHORA = document.getElementById('fluhora');

CALCULAR.addEventListener('click', () => {

    const DATO = document.getElementById('peso').value
    if (DATO > 0){

        ERROR.style.display = 'none';
        let volumen = 0;
        let volumen2 = 0;

        let aux = 0;

        if(DATO<31){
            volumen = calcHollSeg(DATO);
            VOLUMEN2.style.display = 'none';
            let fluhora = volumen/24;
            let mantmedio = fluhora*1.5;
            fluhora= eliminaceros(fluhora);
            mantmedio=eliminaceros(mantmedio);
            VOLUMEN.innerHTML = volumen + 'cc diario';
            FLUHORA.innerHTML = fluhora + ' cc/hr';
            MANTMEDIO.innerHTML = 'm+m/2 = ' + mantmedio + ' cc/hr';
        }
        else{
            aux = calcSC(DATO);

            volumen= aux*1500;
            volumen2 = aux*2000;
            let scHora1 = 0;
            let scHora2 = 0;
            scHora1=volumen/24;
            scHora2=volumen2/24;

            volumen=eliminaceros(volumen)
            volumen2=eliminaceros(volumen2);
            scHora1=eliminaceros(scHora1);
            scHora2=eliminaceros(scHora2);

            VOLUMEN.innerHTML = 'SC*1500= ' + volumen + 'cc diario';
            VOLUMEN2.innerHTML ='SC*2000=' + volumen2 + 'cc diario';
            VOLUMEN2.style.display = 'block';
            //utilizo flujo y mantenimiento para mostrar volumen horario para no crear más constantes ni líneas en el HTML
            FLUHORA.innerHTML = scHora1 + ' cc/hr';
            MANTMEDIO.innerHTML = scHora2 + ' cc/hr';  
        }
; 



        VOLUMEN.style.display = 'block'
        FLUHORA.style.display = 'block';
        MANTMEDIO.style.display = 'block';        
}   else {
        ERROR.style.display = 'block';
        VOLUMEN.style.display = 'none';
        VOLUMEN2.style.display = 'none';
        FLUHORA.style.display ='none';
        MANTMEDIO.style.display = 'none';   
}

} )

function calcHollSeg(peso){
    let volumen = 0;

    peso=Number(peso);
    if(peso<=10){
        volumen=peso*100;
    }
    if(peso>10 && peso<=20){
        volumen=1000+(peso-10)*50;
    }
    if(peso>20 && peso<31){
        volumen=1500+(peso-20)*20;
    }
    return volumen;
    
}
function calcSC(peso){

    peso=Number(peso);
    let aux = 0;
    aux=((peso*4)+7)/(peso+90);    
    return aux; 
}
//para redondear los resultados con decimales, pero evitar que los enteros tengan .000 ej: 8.000
function eliminaceros(num) {
    return num.toFixed(3).replace(/\.000$/, "");
}
