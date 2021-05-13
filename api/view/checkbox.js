let regression = 0;
let hybrid = 0;

function regressionFunc(){
    if (document.getElementById("hybrid").checked){
        document.getElementById("hybrid").checked=false;
    }
    if (!document.getElementById("hybrid").checked){
        // console.log("asdfadsf");
        document.getElementById("regression").checked=true;
    }

}

function hybridFunc(){
    if (document.getElementById("regression").checked){
        document.getElementById("regression").checked=false;
    } else { // not checked
        document.getElementById("hybrid").checked=true;
    }
}