


function updateTable(){
/*    json.forEach(val=>{
        console.log("val is: ");
        console.log(val);
    });*/
    let i = 1;
    console.log("dddadsfasdfadsfkjadshfkjahdsf")
    // console.log(anomaliesList)
    /*let m = new Map()
    for(let i = 0 ; i<3; i++){
        m.set(i.toString(), [i, i+1, i+2])
    }
    m.set("a", [1, 5, 9])
    m.set("b", [4, 45, 890])
    m.set("d", [6, 10, 5, 14])*/
    // console.log("outside")
/*    for(let i = 0; i < 3/!*anomaliesList.size*!/; i++){
        // console.log("inside")
        let key = Array.from(anomaliesList.keys());
        // console.log(key)
    }*/
    // console.log("lior:" + anomaliesList.size)
/*    for (let g in anomaliesList){
        console.log("2222222222222222222222222")
        console.log(g);*/
/*        for (let i = 0;i<myMap[m].length;i++){
        ... do something with myMap[m][i] ...
        }
    }
*/

         anomaliesList.forEach((value, key)=>{
          console.log(value);
          console.log(key);
          console.log("2222222222222222222222222")
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