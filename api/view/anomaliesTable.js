let isFirstTime = true
let numOfRows = 0

function updateTable(){
    let myTable = document.getElementById("anomaliesTable")

    // design:
    myTable.style.width = "70vw"
    myTable.style.border = "2px solid rgba(138, 43, 226, 0.94)"
    myTable.style.borderCollapse = "collapse"
    myTable.style.borderSpacing = "0.3px";
    myTable.style.fontSize = "1.5vw"
    myTable.style.padding = "1px"
    myTable.style.position = 'absolute'
    myTable.style.top = '5cm';
    myTable.style.overflowY = 'auto'

    if(isFirstTime){ // in the first time create the header
        let header = myTable.createTHead();
        let firstRow = header.insertRow(0);
        let cell11 = firstRow.insertCell(0)
        let cell12 = firstRow.insertCell(1)

        cell11.innerHTML = "Feature:"
        cell12.innerHTML = "Anomalies:"
        cell12.style.borderSpacing = "0.3px";
        cell11.style.borderSpacing = "0.3px";
        cell11.style.fontStyle = "oblique";
        cell12.style.fontStyle = "oblique";
        cell12.style.fontWeight = "bold";
        cell11.style.fontWeight = "bold";
        cell12.style.color = "rgba(138, 43, 226, 0.94)"
        cell11.style.color = "rgba(138, 43, 226, 0.94)"
        cell11.style.border = "2px solid rgba(138, 43, 226, 0.94)"
        cell12.style.border = "2px solid rgba(138, 43, 226, 0.94)"

        isFirstTime = false
    } else { // not the first time: we need to delete all the former information
        for (let i = 0; i<numOfRows; i++){
            myTable.deleteRow(1);
        }
    }


    let i = 1;
    numOfRows = 0; // save the numbers of rows, so we know how many to delete next time
    anomaliesList.forEach((value, key) => {
        let tableData = document.getElementById("anomaliesTable");
        let row = tableData.insertRow(i);

        i++;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.style.color = "#000000"
        cell2.style.color = "#000000"

        cell2.style.border = "2px solid rgba(138, 43, 226, 0.94)"
        cell1.style.border = "2px solid rgba(138, 43, 226, 0.94)"

        cell1.innerHTML = key;
        let firstInSet = value[0];
        cell2.innerHTML = '[' + value[0].toString();
        if (value.length === 1) {
            cell2.innerHTML += ']';
        } else {
            for (let v = 1; v < value.length; v++) {
                if (v === value.length - 1 && value[v - 1] + 1 === value[v]) {
                    // last anomaly in array, and the continuation of the last set
                    cell2.innerHTML += '-' + value[v].toString() + ']';
                } else if (v === value.length - 1) {
                    // last anomaly in array, and a new set
                    cell2.innerHTML += ']';
                } else if (value[v] + 1 === value[v + 1]) {
                    // continue
                } else {
                    if (firstInSet === value[v]) {
                        cell2.innerHTML += ']';
                        firstInSet = value[v + 1];
                        cell2.innerHTML += ', [' + value[v + 1].toString();
                    } else {
                        cell2.innerHTML += '-' + value[v].toString() + ']';
                        cell2.innerHTML += ', [' + value[v + 1].toString();
                        firstInSet = value[v + 1];
                    }

                }
            }
        }
        numOfRows++
    })
}

