let regression = 0;
let hybrid = 0;
let detectType = null;

function regressionFunc(){
    if (document.getElementById("hybrid").checked){
        console.log("check1");
        document.getElementById("hybrid").checked=false;
    }
}

function hybridFunc(){
    if (document.getElementById("regression").checked){
        console.log("check2");
        document.getElementById("regression").checked=false;
    }
}
