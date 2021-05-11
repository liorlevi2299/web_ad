const Line = require("./Line");
const anomalyFunc = require("./anomalyFunc");
const Point = require("./Point");
const CorrFeatures = require("./CorrFeatures");
const enclosingCircle = require('smallest-enclosing-circle')
const AnomalyReport = require("./AnomalyReport");


class anomalyDetector {
    isHybrid;
    cf;
    thresholdCorr;
    regress_AD;
    status;
    mult_thresh;
    constructor(th) {
        this.cf = [];
        this.thresholdCorr = th;
        this.regress_AD = new anomalyFunc();
        this.mult_thresh = 1;
        this.status = false;
    }
    toPoints(arr_x, arr_y){
        let ps = [];
        for(let i=0;i<arr_x.length; i++){
            ps[i] = new Point(parseFloat(arr_x[i]) ,parseFloat(arr_y[i]));
        }
        return ps;
    }
    findThreshold(ps, len, rl) {
        let max = 0;
        for (let i = 0; i < len; i++) {
            let ps_y= parseFloat(ps[i].y);
            let ps_x= rl.f((parseFloat(ps[i].x) ));
            let d = Math.abs(ps_y - ps_x);
            if (d > max)
                max = d;
        }
        return max;
    }
    learnNormal(dataTrain){
        //let x = dataTrain[14].
        let len = dataTrain.length;
        let corrFeatures = []

        for (let i = 0; i < len; i++) {
            corrFeatures[i] = Object.keys(dataTrain[i])
        }

        for(let i=0; i<len; i++){
            let f1 = corrFeatures[i][0];
            let max=0;
            let jmax=0;
            let p;
            let f2
            let numRows = dataTrain[i][corrFeatures[i]].length

            //let y = dataTrain[i][corrFeatures[i]]
            var arr_i = dataTrain[i][corrFeatures[i]];

            for(let j=0; j<len ;j++){
                let arr_j = dataTrain[j][corrFeatures[j]];
                if (i !== j){
                    p = Math.abs(this.regress_AD.pearson(arr_i, arr_j,numRows));
                    if(p >= max){
                        max=p;
                        jmax = j;
                    }
                }
                f2 = corrFeatures[jmax][0];
            }
            var arr_corr =  dataTrain[jmax][corrFeatures[jmax]];

            let ps = this.toPoints(arr_i, arr_corr);

        //the regression
            if (p > this.thresholdCorr){
                let c = new CorrFeatures();
                c.feature = f1;
                c.featureCorr = f2;
                c.correlation = p;
                c.line_reg = this.regress_AD.linear_reg(ps, numRows)
                c.threshold = this.findThreshold(ps, len, c.line_reg) * this.mult_thresh;
                this.cf.push(c);
            }
            //hybrid anomaly detector
            else if (this.isHybrid === true) {
                if (p > 0.5) {
                    let minCircle = new enclosingCircle(ps);
                    let c = new CorrFeatures();
                    c.feature = f1;
                    c.featureCorr = f2;
                    c.correlation = p;
                    c.threshold = minCircle.r * this.mult_thresh;
                    c.cx = minCircle.x;
                    c.cy = minCircle.y;
                    this.cf.push(c);
                }
            }
        }
        this.status = true;
    }
    detect(dataTest){
        let anomalies = [];
        let cf_len = this.cf.length;
        for (let i = 0; i < cf_len; i++) {
            let name = this.cf[i].feature;
            let arr_x = dataTest[this.find_key(this.cf[i].feature, dataTest)];
            let arr_y = dataTest[this.find_key(this.cf[i].featureCorr, dataTest)];
            //let len_arr = arr_x.length;
            let arr_xx = Object.values(arr_x)[0];
            let numRow = arr_xx.length;
            let arr_yy = Object.values(arr_y)[0];
            let list_anomalies = [];
            for(let  j=0;j<numRow; j++){
                let xx_j = parseFloat(arr_xx[j]);
                let yy_j = parseFloat(arr_yy[j]);

                if(this.isAnomalous(xx_j,yy_j, this.cf[i])){
                    //let d = this.cf[i].feature;
/*                    let d = this.cf[i].feature + "-" + this.cf[i].featureCorr;
                    anomalies.push(new AnomalyReport(d,(j+1)));*/
                    list_anomalies.push(j+1);
                }
            }
            if (list_anomalies.length > 0){
                let object = { [name] :list_anomalies};
                anomalies.push(object);
            }
        }
        return anomalies;
    }
    find_key(key_feature, dataTest) {
        let len = dataTest.length;
        for (let i = 0; i < len; i++) {
            if (this.cf[i].feature === key_feature ){
                return i;
            }
        }
    }

    dist(p1, p2) {
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;

        return Math.sqrt( a*a + b*b );
    }
    isAnomalous(x, y, c) {
        if (c.correlation > this.thresholdCorr) {
            let dist = Math.abs(y - c.line_reg.f(x));
            return (dist > c.threshold);
        }
        else if ((c.correlation> 0.5) && (this.isHybrid)) {
            let p1 = new Point(x, y);
            let p2 = new Point(c.cx, c.cy)
            return (Math.abs(this.dist(p1, p2)) > c.threshold);
        }
    }
}

module.exports = anomalyDetector;
