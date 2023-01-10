
import Carreras from "../database/carreras.json";
import {Logica} from "./Logica.jsx";



const Lista  = [];
Lista.push(<option selected disabled>Seleccione carrera</option>);

Lista.push(Carreras.map( carrera =>{

    return <option >{carrera.nombre_carrera}</option>
}))


//cargamos las carreras
export function LoadDoc() {



    return (
            <select id = "carrera" name="carrera"  onChange={Logica}>
                {Lista}
            
                </select>
            );

}