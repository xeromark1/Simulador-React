        const data = [];

    for (let i = 1; i <= 8; i++) {
      const arr = [];

        for (let j = 0; j <= 5; j++) {

          if(j==0){
                if(i==1){ arr.push(<td id = {i+""+j}>{ "08:30 - 09:50"} </td>);}
            else if(i==2){ arr.push(<td id = {i+""+j}>{ "10:00 - 11:20"} </td>);}
            else if(i==3){ arr.push(<td id = {i+""+j}>{ "11:30 - 12:50"} </td>);}
            else if(i==4){ arr.push(<td id = {i+""+j}>{ "13:00 - 14:20"} </td>);}
            else if(i==5){ arr.push(<td id = {i+""+j}>{ "14:30 - 15:50"} </td>);}
            else if(i==6){ arr.push(<td id = {i+""+j}>{ "16:00 - 17:20"} </td>);}
            else if(i==7){ arr.push(<td id = {i+""+j}>{ "17:25 - 18:45"} </td>);}
            else if(i==8){ arr.push(<td id = {i+""+j}>{ "18:50 - 20:10"} </td>);}
            else if(i==9){ arr.push(<td id = {i+""+j}>{ "20:15 - 21:30"} </td>);}
          }
          else{
              arr.push(<td id = {i+""+j}>.</td>);

          }                                                       

        }

        data[i] = <tr id = {i}> {arr}</tr>;

    }
    


export function GenerarTabla(){


    return (
        <div className="contenedorTabla">
          <table>
          <thead> 
                <tr>
                <td></td>
                <td>Lunes</td>
                <td>Martes</td>
                <td>Miercoles</td>
                <td>Jueves</td>
                <td>Viernes</td>
    
                </tr>
            </thead>

            {data}

          </table>
        </div>
      );


}