
import Carreras from "./database/carreras.json";



//cargamos las carreras
export function LoadDoc() {



    return (
            <select id = "carrera" name="carrera"  onChange="ShowSelected();">
                {Carreras.map( carrera =>{

                    return <option >{carrera.nombre_carrera}</option>
                })
                }

                </select>
            );

}