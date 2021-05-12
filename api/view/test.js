let detectCSV = [];
let learnCSV = [];
let anomaliesList = new Map();

function setKeys() {
    const keys = Object.keys(learnCSV);
    let list = document.getElementById('featuresList');
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

                // console.log(detectCSV);
                // console.log("After detect JSON Conversion");
                // console.log(JSON.stringify(detectCSV));

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(detectCSV)
                };
                //anomaliesList.clear();
                const response = await fetch('/detect', options).then(response => response.json()).then(data => {
                    Object.keys(data).forEach(anomaly=>{
                        let feature = Object.keys(data[anomaly]).toString();
                        // for(let i = 0 ; i < data.)
                        // console.log("size:" + data.size)
                        Object.values(data[anomaly]).forEach(value => {
                            anomaliesList.set(feature, value);
                        });

                    });

                })


                //console.log(json);

                /*if(document.getElementById('regression').checked){
                    const response = fetch('/detect?model_type=regression', options);
                } else if (document.getElementById('hybrid').checked) {
                    const response = fetch('/detect?model_type=hybrid', options);
                }*/

                await updateTable();

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

                // console.log(learnCSV);
                // console.log('call set keys')
                setKeys();

                // console.log("After learn JSON Conversion");
                // console.log(learnCSV);
                // console.log(JSON.stringify(learnCSV));
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
/*                    const response = fetch('/learn?model_type=hybrid', options).then((response) => response.blob())
                        .then(data => {
                            return data;
                        })
                        .catch(error => {
                            console.error(error);
                        });*/
                    const response = fetch('/learn?model_type=hybrid', options).then(val=>{
                        alert("the file was upload");
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
            document.getElementById(string).style.background = "yellow";
        } else {
            document.getElementById('feat' + i).style.background = "#eee";
        }
    }

}

async function uploadToServer () {
    await Upload();
    //$.post('/detect', JSON.stringify(result));
    let json = JSON.stringify(detectCSV);
    let result2 = {'a': detectCSV};
    let x = typeof detectCSV;
    console.log(x);
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
    console.log(data1);
    /*fetch('/detect', options).then(res => {
        console.log(res);
    }).catch(res => {
        console.log(res);
    });*/

}
