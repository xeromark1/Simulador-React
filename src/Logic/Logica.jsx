import ReactDOM from 'react-dom';
import ramos from "../database/ramos.json";
import secciones from "../database/secciones.json";

export function ShowSeccionSelected(evento){ //funcion que es creada para agragar los ramos a la tabla

}


export function ShowRamoSelected(n){
    const Lista = [];
    const aux = [];    
    var ComboBoxRamo = document.getElementById('ComboBoxRamo'+n).value;


    Lista.push(<option disabled selected>Seccion </option>);
                   
    Lista.push(
        secciones.map( seccion =>{
            if(aux.indexOf(seccion.codigo) == -1 && seccion.id == ComboBoxRamo){    {/*Aca se agregan las secciones*/}
                aux.push(seccion.codigo)
                return <option value = {seccion.codigo}>{seccion.codigo}</option>
                
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
                    
                        <select id ={"ComboBoxSeccion"+i} > </select>
                        
                        
                    
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