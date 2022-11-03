let card =document.getElementById('tarjeta');
let form =document.getElementById('formulario');
let detail =document.getElementById('detalle');
/*las constantes se determinan haciendo un getId usando los id de los <p> en el HTML*/
const CALCULAR = document.getElementById('calcular');
const VOLUMEN = document.getElementById('volumen');
const VOLUMEN2 = document.getElementById('volumen2')
const ERROR = document.getElementById('error');
const MANTMEDIO = document.getElementById('mantmedio');
const FLUHORA = document.getElementById('fluhora');
/*El eventlistener solo reproduce funciones, por eso utilizamos una funcion de flecha => () para reproducir nuestro código*/
CALCULAR.addEventListener('click', () => {
    /*El dato se determina a través de un getId.value con a etiqueta de la línea que contiene el input*/
    const DATO = document.getElementById('peso').value
    if (DATO > 0){
        /*style.display lanza un error si no se utiliza con una constante*/
        /* 'none' evita que se muestre el elemento */
        ERROR.style.display = 'none';
        let volumen = 0;
        let volumen2 = 0;
        /*esta variable auxiliar será el return de la función SC para pesos mayores a 30 kg.*/
        let aux = 0;
        /*Si el peso es menor a 31, se ejecutará la función del método Holliday-Segar. También se ocultará la línea que contiene el mensaje
        para el dato de SC*2000 del método para pesos por sobre 30 kg*/
        if(DATO<31){
            volumen = calcHollSeg(DATO);
            VOLUMEN2.style.display = 'none';
        }
        else{ //se ejecuta la funnción del método de Superficie Corporal
            /*esta función dará de return el valor de aux, que es el método de superficie corporal
            antes de ser multiplicado por 1500 0 2000*/
            aux = calcSC(DATO);
            //se determina el valor de ambas opciones del método de superficie corporal
            volumen= aux*1500;
            volumen2 = aux*2000;
            /*utilizo mi función de redondeo que omite los ceros decimales en los enteros*/
            volumen2=eliminaceros(volumen2);
            /*se asigna lo que se mostrará en las línea de volumen2 dentro de este else ya que solo hace
            falta en el caso de que se ejecute el else*/
            VOLUMEN2.innerHTML ='SC*2000=' + volumen2 + 'cc diario';
            VOLUMEN2.style.display = 'block';
            MANTMEDIO.style.display = 'none';
        }
        let fluhora = volumen/24;
        let mantmedio = fluhora*1.5;
        fluhora= eliminaceros(fluhora);
        volumen=eliminaceros(volumen); 
        mantmedio=eliminaceros(mantmedio);
        /*los inner.HTML asignan un valor determinado en JS a un elemento en el HTML, y se realizan con las constantes
        correspondientes a las etiquetas del elemento en HTML que se desea cambiar. En este caso, se cambian los elementos
        paragraph <p>*/
        VOLUMEN.innerHTML = volumen + 'cc diario';
        FLUHORA.innerHTML = fluhora + ' cc/hr';
        MANTMEDIO.innerHTML = 'm+m/2 = ' + mantmedio + ' cc/hr';
        /*el display tipo block hace el display en la linea con el formato asignado*/
        VOLUMEN.style.display = 'block'
        FLUHORA.style.display = 'block';
        MANTMEDIO.style.display = 'block';        
}   else {//si el dato es menor a 0, se mostrará la linea de error
        ERROR.style.display = 'block';
        VOLUMEN.style.display = 'none';
        VOLUMEN2.style.display = 'none';
        FLUHORA.style.display ='none';
        MANTMEDIO.style.display = 'none';   
}

} )
//función del método Holliday-Segar
function calcHollSeg(peso){
    let volumen = 0;
    /*El input toma el dato 'peso' como object, y eso crea problema en las calculaciones ya que el símbolo
    de suma también realiza concatenación, y si el dato no es estrictamente un número, hará una concatenación*/
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
    /*Convertimos el tipo de dato de 'peso' aquí también, ya que en esta función se realiza una operación de suma*/
    peso=Number(peso);
    let aux = 0;
    aux=((peso*4)+7)/(peso+90);    
    return aux; //se retorna un auxiliar y no los volumenes para evitar un retorno de más de una variable
}
//para redondear los resultados con decimales, pero evitar que los enteros tengan .000 ej: 8.000
function eliminaceros(num) {
    return num.toFixed(3).replace(/\.000$/, "");
}
