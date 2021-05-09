const Line = require("./Line");
const anomalyFunc = require("./anomalyFunc");
const Point = require("./Point");
const CorrFeatures = require("./CorrFeatures");
const enclosingCircle = require('smallest-enclosing-circle')
const AnomalyReport = require("./AnomalyReport");


class anomalyDetector {
    itsHybrid;
    cf;
    thresholdCorr;
    regress_AD;
    constructor(itsHybrid,th) {
        this.itsHybrid = itsHybrid;
        this.cf = [];
        this.thresholdCorr = th;
        this.regress_AD = new anomalyFunc();
    }
    toPoints(arr_x, arr_y){
        let ps = [];
        for(let i=0;i<arr_x.length; i++){
            ps[i] = new Point(arr_x[i],arr_y[i]);
        }
        return ps;
    }
    findThreshold(ps, len,rl) {
        let max = 0;
        for (let i = 0; i < len; i++) {
            let d = Math.abs(ps[i].y - rl.f(ps[i].x));
            if (d > max)
                max = d;
        }
        return max;
    }
    learnNormal(dataTrain){
        let corrFeatures = Object.keys(dataTrain);
        let len = corrFeatures.length;

        for(let i=0; i<len; i++){
            let f1 = corrFeatures[i];
            let max=0;
            let jmax=0;
            let p;
            for(let j=i+1; j<len ;j++){
                p = Math.abs(this.regress_AD.pearson(dataTrain[corrFeatures[i]], dataTrain[corrFeatures[j]],len));
                if(p > max){
                    max=p;
                    jmax=j;
                }
            }
            let f2 = corrFeatures[jmax];
            let ps = this.toPoints(dataTrain[f1], dataTrain[f2]);

        //the regression
            if (p > this.threshold){
                let row_size = dataTrain[f1].length;
                let c;
                c.feature = f1;
                c.featureCorr = f2;
                c.correlation = p;
                c.line_reg = this.regress_AD.line_reg(ps, row_size)
                c.threshold = this.findThreshold(ps, len, c.line_reg) * 1.1;
                this.cf.push(c);
            }
            //hybrid anomaly detector
            else if (this.itsHybrid === true) {
                if (p > 0.5) {
                    let minCircle = new enclosingCircle(ps);
                    let c;
                    c.feature = f1;
                    c.featureCorr = f2;
                    c.correlation = p;
                    c.threshold = minCircle.r * 1.1;
                    c.cx = minCircle.x;
                    c.cy = minCircle.y;
                    this.cf.push(c);
                }
            }
        }
    }
    detect(dataTest){
        let anomalies;
        let len = this.cf.length;

        for (let i = 0; i < len; i++) {
            let arr_x = dataTest[this.cf[i].feature];
            let arr_y = dataTest[this.cf[i].featureCorr];
            for(let  j=0;j<arr_x.length; j++){
                if(this.isAnomalous(arr_x[j],arr_y[j], this.cf[i])){
                    let d = this.cf[i].feature;
                    //let d = this.cf[i].feature + "-" + this.cf[i].featureCorr;
                    anomalies.push(new AnomalyReport(d,(j+1)));
                }
            }
        }
        return anomalies;
    }
    dist(p1, p2) {
        let a = p1.x - p2.x;
        let b = p1.y - p2.y;

        return Math.sqrt( a*a + b*b );
    }
    isAnomalous(x, y, c) {
        if (c.correlation> this.thresholdCorr) {
            return (Math.abs(y - c.line_reg.f(x))>c.threshold);
        }
        else if ((c.correlation> 0.5) && (this.itsHybrid)) {
            let p1 = new Point(x, y);
            let p2 = new Point(c.cx, c.cy)
            return (Math.abs(this.dist(p1, p2)) > c.threshold);
        }
    }
}
