//import {GenerarTabla} from './Logica';
import {GenerarTabla} from './GenerarTabla';
import {LoadDoc} from './LoadDoc';


export function Table(){
    return(



        <div className="container" >
                
                    <div className="ComboBox">

                        <LoadDoc/>         

                    </div>          
                
                
                    <div>
                        <div id = "ComboBox" className="ComboBox">
                
                        </div> 
                
                        <GenerarTabla/>
                </div>          
                
                
        </div>
    
    
    );
}