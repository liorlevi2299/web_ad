let detectCSV = [];
let learnCSV = [];
let anomaliesList = new Map();

function setKeys() {
    const keys = Object.keys(learnCSV);

    let list = document.getElementById('featuresList');
    // removing old children in list from previous uploads of files.
    while (list.firstChild)
        list.removeChild(list.firstChild);
    keys.forEach(function(key) {
        let li = document.createElement('li');
        li.innerText = Object.keys(learnCSV[key]).toString();
        li.id = 'feat'+key;
        li.onclick = function () {
        showGraph(key.toString()).catch(err => {});
        changeColor(li.id)};
        list.appendChild(li);
        console.log(Object.keys(learnCSV[key]).toString());
    })
}

function uploadDetect() {
    detectCSV = []; // emptying the array for next use
    detectCSV.length = 0;
    let fileUpload = document.getElementById("detectUpload");
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            reader.onload = async function (e) {
                console.log(e);
                let lines=e.target.result.split('\n');
                for(let i = 0; i<lines.length; i++){
                    lines[i] = lines[i].replace(/\s/,'')//delete all blanks
                }

                let headers=lines[0].split(",");

                for(let i=0;i<headers.length;i++){

                    let obj = {};
                    let currentColumn = [];

                    for(let j=1;j<lines.length - 1;j++){
                        let currentline=lines[j].split(",");
                        currentColumn.push(currentline[i]);

                    }
                    obj[headers[i]] = currentColumn;
                    detectCSV.push(obj);

                }

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(detectCSV)
                };
                anomaliesList.clear();
                const response = await fetch('/detect', options).then(response => response.json()).then(data => {
                    Object.keys(data).forEach(anomaly=>{
                        let feature = Object.keys(data[anomaly]).toString();
                        Object.values(data[anomaly]).forEach(value => {
                            anomaliesList.set(feature, value);
                        });

                    });

                })

                await updateTable();
                document.getElementById('feat0').click();

                return JSON.stringify(detectCSV); //JSON

            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid detect CSV file.");
    }
}
async function uploadLearn() {
    learnCSV = []; // emptying the array for next use
    learnCSV.length = 0;
    let learnUpload = document.getElementById("learnUpload");
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(learnUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            reader.onload = function (e) {
                console.log(e);
                let lines=e.target.result.split('\n');
                for(let i = 0; i<lines.length; i++){
                    lines[i] = lines[i].replace(/\s/,'')//delete all blanks
                }

                let headers=lines[0].split(",");

                for(let i=0;i<headers.length;i++){

                    let obj = {};
                    let currentColumn = [];

                    for(let j=1;j<lines.length - 1;j++){
                        let currentline=lines[j].split(",");
                        currentColumn.push(currentline[i]);

                    }
                    obj[headers[i]] = currentColumn;
                    learnCSV.push(obj);

                }

                setKeys();

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(learnCSV)
                };
                if(document.getElementById('regression').checked){

                   /* var url = new URL("/learn"),
                        params = {model_type: 'hybrid'}
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
                    const response = fetch(url, options).then()
*/

                    const response = fetch('/learn?model_type=regression', options).then(val=>{
                        alert("the file was upload");
                    }).catch(err=>{
                        console.log(err);
                    });
                } else if (document.getElementById('hybrid').checked) {
                    const response = fetch('/learn?model_type=hybrid', options).then(val=>{
                        alert("the file was uploaded");
                    }).catch(err=>{
                        console.log(err);
                    });

                }

                uploadDetect();
                return JSON.stringify(learnCSV); //JSON

            }
            reader.readAsText(learnUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid learn CSV file.");
    }
}
function changeColor (string) {
    let i;
    for(i = 0; i < learnCSV.length; i++) {
        if(document.getElementById(string) === document.getElementById('feat' + i)){
            document.getElementById(string).style.background = "#8A2BE2EF";
        } else {
            document.getElementById('feat' + i).style.background = "#eee";
        }
    }

}

async function uploadToServer () {
    await Upload();
    let json = JSON.stringify(detectCSV);
    let result2 = {'a': detectCSV};
    let x = typeof detectCSV;
    let hybrid = true;
    let test = 5;
    const data = {hybrid,test }
    //const data = {result, hybrid};

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result2)
    };
    const response = await fetch('/detect', options);
    const data1 = await response.json();

}
