/*

const xlabels=[];
const ylabels=[];

async function getData(){
    const data = await fetch('ZonAnn.Ts+dSST.csv');
    const finalData = await data.text();
    console.log(finalData);
    //document.getElementById('text').innerText=finalData; // this will put the data in the screen (not only in the console)


    const rows = finalData.split('\n').slice(1);//the slice is removing the fist line
    //const years=[];
    //const vals=[];
    let i = 0;
    rows.forEach(r=>{
        const row = r.split(',');
        const year = row[0];
        xlabels.push(year);
        const val=row[1];
        ylabels.push(val);
        i++;
    })
    //document.getElementById('test').innerText=years[0]; // this will put the data in the screen (not only in the console)

    //console.log(years);
    //console.log(vals);

}

async function showGraph(){
    await getData().catch(err=>{
        console.error(err);
    });
    var ctx = document.getElementById('canvas').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',//'line',
        data: {
            labels: xlabels, // the labels at the bottom of each column
            datasets: [{
                label: 'global temp', // the label at the top of the graph
                data: ylabels, // the values of each column
                backgroundColor: [
                    'rgba(9,79,208,0.20)',
                ],
                borderColor: [
                    'rgb(9,79,208)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

showGraph().catch(err=>{
    console.error(err);
});


*/


const xlabels=[];
const ylabels=[];

async function getData(feature){
/*    // getting the data- wont be relevant if there will be a global variable
    const data = await fetch('reg_flight.csv');
    const finalData = await data.text();
    console.log(finalData);
    //document.getElementById('text').innerText=finalData; // this will put the data in the screen (not only in the console)
    const rows = finalData.split('\n').slice(1);//the slice is removing the fist line

    //const years=[];
    //const vals=[];
    let i = 0;
    rows.forEach(r=>{
        const row = r.split(',');
        const year = row[14];
        //xlabels.push(year);
        xlabels.push(i);
        const val=row[18];
        ylabels.push(val);
        i++;
    })*/
    let i = 0;
    //console.log(feature);
    //console.log(result[feature]);
    /*Object.entries(result).forEach(([key, value]) =>{
        console.log('${key} ${value}');
    });*/
    //const d = [3, 6, 6, 8, 8, 7, 8]
    ///console.log(Object.values(result[feature])[0]);
    (Object.values(result[feature])[0]).forEach(val=>{
    // d.forEach(val=>{
        //console.log("val is")
        //console.log(val);
        xlabels.push(i);
        ylabels.push(val);
        i++;
    });
    console.log(ylabels);
    //console.log(i);
    // console.log("x:")
    // console.log(xlabels);
    /*
    * let i = 0;
    * global.find(feature).forEach{
    *   xlabels.push(i);
    *   ylabels.push(val)
    * }
    *
    * */
    //document.getElementById('test').innerText=years[0]; // this will put the data in the screen (not only in the console)

    //console.log(years);
    //console.log(vals);

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
        type: 'line',//'bar',
        data: {
            labels: xlabels, // the labels at the bottom of each column
            datasets: [{
                label: Object.keys(result[feature]).toString(), // the label at the top of the graph
                data: ylabels, // the values of each column
                backgroundColor:'rgba(9,79,208,0.20)',
                borderColor: 'rgb(9,79,208)',
                borderWidth: 0.1,
                pointRadius: 0.7,
                //tension: 0.5
            }]
/*            datasets: [{
                label: Object.keys(result[feature]).toString(), // the label at the top of the graph
                data: ylabels, // the values of each column
                backgroundColor:'rgb(195,18,18)',
                borderColor: 'rgba(208,9,9,0.48)',
                borderWidth: 0.1,
                pointRadius: 0.7,
                //tension: 0.5
            }]*/
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


// is this need to be called from the scrolling bar?
/*showGraph().catch(err=>{
    console.error(err);
});*/

