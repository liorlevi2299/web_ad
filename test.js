const result = [];

document.getElementById('upload').addEventListener('click',function (){ Upload() } );


function setKeys() {
    const keys = Object.keys(result);
    let list = document.getElementById('featuresList');
    keys.forEach(function(key) {
        let li = document.createElement('li');
        li.innerText = Object.keys(result[key]).toString();
        li.id = 'feat'+key;
        li.onclick = function () { changeColor(li.id)};
        list.appendChild(li);
        console.log(Object.keys(result[key]).toString());
    })
}

function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    //console.log(fileUpload);
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                //console.log("Raw File");
                console.log(e);
                var lines=e.target.result.split('\n');
                for(let i = 0; i<lines.length; i++){
                    lines[i] = lines[i].replace(/\s/,'')//delete all blanks
                }
                //var result = [];

                var headers=lines[0].split(",");

                for(var i=0;i<headers.length;i++){

                    var obj = {};
                    /*var currentline=lines[i].split(",");*/
                    var currentColumn = [];

                    for(var j=1;j<lines.length - 1;j++){
                        var currentline=lines[j].split(",");
                        currentColumn.push(currentline[i]);

                    }
                    obj[headers[i]] = currentColumn;
                    result.push(obj);

                }

                //return result; //JavaScript object
                console.log(result);
                console.log('call set keys')
                setKeys();
                //setKeysTry();

                console.log("After JSON Conversion");

                console.log(JSON.stringify(result));
                //let x = JSON.stringify(result);

                return JSON.stringify(result); //JSON

            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function changeColor (string) {
    let i;
    for(i = 0; i < result.length; i++) {
        if(document.getElementById(string) === document.getElementById('feat' + i)){
            document.getElementById(string).style.background = "yellow";
        } else {
            document.getElementById('feat' + i).style.background = "#eee";
        }
    }

}