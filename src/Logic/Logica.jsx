import ReactDOM from 'react-dom';
import ramos from "../database/ramos.json";
import secciones from "../database/secciones.json";

localStorage.clear();
sessionStorage.clear();


function getDias(dias){ //esta funcion debe devolver los dias convertidos en numeros para ser puestos en los dias

    var numero_dia = [];         // variable auxiliar para recoger el numero del dia

    if(dias != "NO DEFINIDO"){
        
            var aux = dias.split(' ');

        for(let i = 0; i < aux.length ; i++){
            if ("LU" == aux[i].trim()){
                numero_dia.push(1);
            }
            if ("MA" == aux[i].trim()){
                numero_dia.push(2);
            }       
            if ("MI" == aux[i].trim()){
                numero_dia.push(3);
            }      
            if ("JU" == aux[i].trim()){
                numero_dia.push(4);
            } 
            if ("VI" == aux[i].trim()){
                numero_dia.push(5);        
            }
        }
    }

    return numero_dia;
}

function getHoras(horas){

    var numero_hora = [];         // variable auxiliar para recoger el numero del dia

    if(horas != "NO DEFINIDO"){
        var aux = horas.split('-');
    
        var bloque = [
                        new Date("2022/07/20 07:00:00"),
                        new Date("2022/07/20 08:30:00"), //1
                        new Date("2022/07/20 10:00:00"), //2
                        new Date("2022/07/20 11:30:00"), //3
                        new Date("2022/07/20 13:00:00"), //4
                        new Date("2022/07/20 14:30:00"), //5
                        new Date("2022/07/20 16:00:00"), //6
                        new Date("2022/07/20 17:25:00"), //7
                        new Date("2022/07/20 18:50:00"), //8
                        new Date("2022/07/20 20:15:00"), //9
                        new Date("2022/07/20 21:40:00")
                                                            ];

        var horainicio = new Date("2022/07/20 " + aux[0].trim());
        var horafin = new Date("2022/07/20 " + aux[1].trim());

        for(var i = 0; i < bloque.length ; i++){

            if(horainicio.getTime()  <= bloque[i].getTime()){   //cuando la hora de inicio sea menor o igual a la hora predefinida

                for(var j = i; j < bloque.length ; j++){

                    if(horafin.getTime()  >= bloque[j].getTime()){   //cuando la hora de fin sea menor o igual a la hora predefinida
                        
                        if(i == j){
                            numero_hora.push(i);

                        }
                        else if(numero_hora.indexOf(j) == -1 && i+1 != j){  //si la hora aun no fue ingresada, entonces ingresela, porque pueden existir casos particulares de ramos con horas distintas a las predefinidas, por lo que es bueno comparar
                            numero_hora.push(j);

                        }
                    }
                }
            }
        }
    }
        return numero_hora;
}

function ModificateTable(evento){

    //console.log(evento);
    var dias = getDias(evento.dia);                                    //devuelve los dias en numeros
    var hora = getHoras(evento.hora);                                    //devuelve los dias en numeros

    //Definimos si la hora o el dai esta definido, sino se lanzara un ALERT en la pagina

    if(dias.length ==0){
        alert("ADVERTENCIA " + evento.descripcion + " NO tiene dias definidos aun... Consulte secretaria de estudios.");
    }
    if(hora.length ==0){
        alert("ADVERTENCIA " + evento.descripcion + " NO tiene horas definidas aun... Consulte secretaria de estudios.");
    }

    ///////////////////////////////////////////////////////////////////////////////

    for(let i = 0; i < dias.length ; i++){
        for(let j = 0; j < hora.length ; j++){
            var td = document.getElementById(hora[j] + "" + dias[i]);
            console.log(td.innerHTML +" != . && " + evento.nombre_asignatura + "!=" + td.innerHTML);
            if(td.innerHTML != "." &&  !td.innerHTML.includes(evento.nombre_asignatura)){                        // si es distinto de un bloque vacio, esp orque hay un ramo obstruyendo
               
                alert("La seccion que selecciona, esta siendo obstruida por otra");
                window.location.reload()
            }

        }
    }


    for(let i = 0; i < dias.length ; i++){
        for(let j = 0; j < hora.length ; j++){
            var td = ReactDOM.createRoot(document.getElementById(hora[j] + "" + dias[i]));
            td.render(
                    <>
                        <p>{evento.nombre_asignatura} </p>
                        <small>{evento.nombre + " "+ evento.descripcion}</small>
                    </>
                );
                
        }
    }
}
    


function changeRamo(n){
    let datos = JSON.parse(sessionStorage.getItem("codigo"+n));
    //console.log(datos);

    for(let item of datos){
        //console.log(item.dia);
        //console.log(item.hora);

        var dias = getDias(item.dia);                                    //devuelve los dias en numeros
        var hora = getHoras(item.hora);                                    //devuelve los dias en numeros    
    ///////////////////////////////////////////////////////////////////////////////

        for(let i = 0; i < dias.length ; i++){
            for(let j = 0; j < hora.length ; j++){
                var td = ReactDOM.createRoot(document.getElementById(hora[j] + "" + dias[i]));
                td.render(<>.</>);
          
            }
        }
    }
}



export function ShowSeccionSelected(n){ //funcion que es creada para agragar los ramos a la tabla
    var ComboBoxSeccion = document.getElementById("ComboBoxSeccion"+n).value;/* para saber el ramo que se selecciono*/ 
    var ComboBoxRamo = document.getElementById("ComboBoxRamo"+n).value;/* para saber el ramo que se selecciono*/ 

    var tmp = sessionStorage.getItem("codigo"+n);
    const auxSecciones = []; //en este arreglo se van a guardar todas las secciones correspondientes a este ramo     


    var auxiliar = [];
    
    if(tmp!=null && tmp !=""){       //limpia el ramo anterior
        changeRamo(n);
    }


    for(let item of secciones){
        if( item.id == ComboBoxRamo){
            auxSecciones.push(item); // luego se subira al LocalStorage
        }

        if( item.codigo == ComboBoxSeccion){

            ModificateTable(item);
            auxiliar.push(item);
                                                // para quitar la seleccion que se hizo antes
        }

    }
                   //si no hay ramo obstruyendo, pongalo en cookies
        sessionStorage.setItem("codigo"+n, JSON.stringify(auxiliar) );       //OJO ACA, Esto define si se podra quitar o no

        localStorage.setItem("ramo"+n, JSON.stringify(auxSecciones));        //guaramos lo que pongamos en la caja


}


export function ShowRamoSelected(n){
    const Lista = [];
    const aux = [];         // es un auxiliar para saber luego si la seccion fue agregada
    var ComboBoxRamo = document.getElementById('ComboBoxRamo'+n).value;
    var bloqueCookies = [];   
    var choqueDeDias = [];  //Con esto se vera que ramos chocan con cuales ramos

    for(let index = 0 ; index < sessionStorage.length ; index++){   //recorremos todas las cookies si es que tenemos
        for(let coockie of JSON.parse(sessionStorage.getItem(sessionStorage.key(index)))){   //dentro de esos elemenos, hay distintos eventos con distintas horas y dias
            var bloqueHoraCookie = getHoras(coockie.hora);
            var bloqueDiasCookie = getDias(coockie.dia);

            for(let i = 0 ; i < bloqueDiasCookie.length ; i++){       //se debe recorrer el storage a ver cuantos elementos hay
                for(let j = 0 ; j < bloqueHoraCookie.length ; j++){ 
                    bloqueCookies.push(bloqueHoraCookie[j] + "" + bloqueDiasCookie[i]);
                }
            }
        }
    }
    
       
    for(let seccion of secciones){        //El codigo que se presenta a continuacion es para ir bloqueando las secciones que no nos sirven porque estan siendo obstruidas por los ramos anteriores
        if(seccion.id == ComboBoxRamo){
        
            var bloqueSeleccionado = []; 
            var bloqueHora = getHoras(seccion.hora);
            var bloqueDias = getDias(seccion.dia);

            for(let k = 0; k < bloqueDias.length ; k++){
                for(let h = 0; h < bloqueHora.length ; h++){
                    bloqueSeleccionado.push(bloqueHora[h] + "" + bloqueDias[k]);

                }
            }

            for(let p = 0; p < bloqueSeleccionado.length ; p++){            //se comprueba si un ramo choca con otro
                if(bloqueCookies.includes(bloqueSeleccionado[p]) == true){
                    choqueDeDias.push(seccion.codigo);
                }
            }

        }
    }

    Lista.push(<option disabled selected>Seccion </option>);

    //--- Ahora colocamos todas las secciones en la ComboBox
    Lista.push(
        secciones.map( seccion =>{
            if(aux.indexOf(seccion.codigo) == -1 && seccion.id == ComboBoxRamo){    {/*Aca se agregan las secciones*/}
                if(choqueDeDias.indexOf(seccion.codigo) == -1){      // si el ramo NO esta, es porque NO obstruye las selecciones anteriores 
                    aux.push(seccion.codigo);
                    return <option value = {seccion.codigo}>{seccion.codigo}</option>
                }
                else{// si el ramo esta, es porque esta siendo obstruido por sus selecciones anteriores
                    aux.push(seccion.codigo);
                    return <option value = {seccion.codigo} disabled>{seccion.codigo}</option>
                }
            } 
        })
    );



    const ComboBoxSeccion = ReactDOM.createRoot(document.getElementById('ComboBoxSeccion'+n));
    ComboBoxSeccion.render(
        Lista
    );
    
}

function ShowSelected(){

    const Lista  = [];
    for(let i = 1 ; i < 7 ; i++){

        Lista.push(
        <div>
                <div id = {"DivRamo"+i}>
                    
                        <select id ={"ComboBoxRamo"+i} onChange= {(e) => {ShowRamoSelected(i)}}> <option disabled selected>Seleccione ramo </option>
                        {
                            ramos.map( ramo =>{

                                return <option value = {ramo.id}>{ramo.nombre_asignatura}</option>
                            })
                        
                        }</select>
                        
                        
                    
                 </div>

                 <div id = {"DivSeccion"+i}>
                    
                        <select id ={"ComboBoxSeccion"+i} onChange= {(e) => {ShowSeccionSelected(i)}}> </select>
                        
                        
                    
                 </div>
        </div>
        
        );
    }

    return Lista;

}


export function Logica(){

    const ComboBoxRamo = ReactDOM.createRoot(
        document.getElementById('ComboBox')
      );

      const Lista = ShowSelected();

    ComboBoxRamo.render(
        Lista
    );
}