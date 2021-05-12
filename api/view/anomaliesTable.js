


function updateTable(){
/*    json.forEach(val=>{
        console.log("val is: ");
        console.log(val);
    });*/
    let i = 1;


         anomaliesList.forEach((value, key)=>{
             let tableData = document.getElementById("anomaliesTable");
             let row = tableData.insertRow(i);
             i++;
             let cell1 = row.insertCell(0);
             let cell2 = row.insertCell(1);
             cell1.innerHTML = key;
             cell2.innerHTML = value.toString();
             /*value.forEach(v=>{
           })*/
    })

}

//updateTable();