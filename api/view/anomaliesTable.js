let isFirstTime = true
let numOfRows = 0

function updateTable(){
    let myTable = document.getElementById("anomaliesTable")
    if(isFirstTime){
        let header = myTable.createTHead();
        let firstRow = header.insertRow(0);
        let cell11 = firstRow.insertCell(0)
        let cell12 = firstRow.insertCell(1)

        cell11.innerHTML = "Feature"
        cell12.innerHTML = "Anomalies"
        isFirstTime = false
    } else { // not the first time: we need to delete all the former information
        for (let i = 0; i<numOfRows; i++){
            myTable.deleteRow(1);
        }
    }

    let i = 1;
    numOfRows = 0;
    anomaliesList.forEach((value, key)=>{
        let tableData = document.getElementById("anomaliesTable");
        let row = tableData.insertRow(i);
        i++;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = key;
        //cell2.innerHTML = value.toString();
        cell2.innerHTML = '[' + value[0].toString();
        for(let v = 0; v < value.length; v++) {
            if(v === value.length - 1 && value[v - 1] + 1 === value[v]) {
                // last anomaly in array, and the continuation of the last set
                cell2.innerHTML += '-' + value[v].toString() + ']';
            } else if(v === value.length - 1) {
                // last anomaly in array, and a new set
                cell2.innerHTML += '[' + value[v].toString() + ']';
            }
            else if(value[v] + 1 === value[v+1]) {
                // continue
            } else {
                cell2.innerHTML += '-' + value[v].toString() + ']';
                cell2.innerHTML += ', [' + value[v + 1].toString();
            }
        }
        numOfRows++
    })
}

