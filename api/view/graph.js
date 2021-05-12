let xlabels=[];
let ylabels=[];
let anomalies=[];

async function getData(feature){

    let i = 0;
    xlabels=[];
    ylabels=[];
    anomalies=[];
    (Object.values(detectCSV[feature])[0]).forEach(val=>{ ////////
        xlabels.push(i);
        ylabels.push(val);
        i++;
    });

    let lines = []
    if (anomaliesList!=null){
        if (anomaliesList.has(Object.keys(detectCSV[feature]).toString())){
            lines = anomaliesList.get(Object.keys(detectCSV[feature]).toString())
        }
    }
    console.log(lines)

    lines.forEach(num=>{
        let point ={
            x: num,
            y: ((Object.values(detectCSV[feature])[0])[num])
        }
        anomalies.push(point);
    });
/*        (Object.values(anomaliesList[feature])[0]).forEach(val=>{

        });*/

}

async function showGraph(feature){
    document.getElementById("canvas").remove();
    let newCanvas = document.createElement("canvas");
    newCanvas.id = "canvas"
    document.getElementById("canvasDev").append(newCanvas);
    await getData(feature).catch(err=>{
        console.error(err);
    });
    var ctx = document.getElementById('canvas').getContext('2d');
    let myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: Object.keys(detectCSV[feature]).toString(),
                data: ylabels,
                backgroundColor:'rgba(9,79,208,0.20)',
                borderColor: 'rgb(9,79,208)',
                borderWidth: 0.1,
                pointRadius: 1,
            }, {
                type: 'scatter',
                label: 'anomalies',
                data:anomalies,
                backgroundColor:'rgb(208,9,9)',
                borderColor: 'rgb(208,9,9)',
                borderWidth: 0.1,
                pointRadius: 1.5,
            }],
            labels: xlabels
        },


        // backgroundColor: 'rgb(102,205,186)',
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


