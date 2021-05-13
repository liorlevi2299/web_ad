let isFirstTime = true
let numOfRows = 0

function updateTable(){
    let myTable = document.getElementById("anomaliesTable")

    myTable.style.width = "70%"
    myTable.style.border = "2px solid #460ecd"
    myTable.style.borderCollapse = "collapse"
    myTable.style.borderSpacing = "0.3px";
    myTable.style.fontSize = "25px"
    myTable.style.padding = "10px"
    myTable.style.position = 'absolute'
    myTable.style.top = '5cm';
    myTable.style.overflowY = 'auto'

    if(isFirstTime){
        let header = mytable.createthead();
        let firstrow = header.insertrow(0);
        let cell11 = firstrow.insertcell(0)
        let cell12 = firstrow.insertcell(1)

        cell11.innerhtml = "feature:"
        cell12.innerhtml = "anomalies:"
        cell12.style.borderspacing = "0.3px";
        cell11.style.borderspacing = "0.3px";
        cell11.style.fontstyle = "oblique";
        cell12.style.fontstyle = "oblique";
        cell12.style.fontweight = "bold";
        cell11.style.fontweight = "bold";


        cell12.style.color = "#6d40ce"
        cell11.style.color = "#6d40ce"
        cell11.style.border = "2px solid #6d40ce"
        cell12.style.border = "2px solid #6d40ce"

        isfirsttime = false
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

        cell1.style.color = "#000000"
        cell2.style.color = "#000000"

        cell2.style.border = "2px solid #6d40ce"
        cell1.style.border = "2px solid #6d40ce"

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

