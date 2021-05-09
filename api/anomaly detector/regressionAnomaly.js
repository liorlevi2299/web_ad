const Line = require("./Line");
const anomalyFunc = require("./anomalyFunc");
const Point = require("./Point");
const CorrFeatures = require("./CorrFeatures");
const enclosingCircle = require('smallest-enclosing-circle')


class regressionAnomaly{
    typeAd;
    cf;
    threshold;
    regress_AD;
    constructor(itsHybrid,th) {
        this.itsHybrid = itsHybrid;
        this.cf = [];
        this.threshold = th;
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

    //learnHelper(ts,max,f1,f2,ps);
        if (p > this.threshold){
            let row_size = dataTrain[f1].length;
            let c;
            c.feature = f1;
            c.featureCorr = f2;
            c.correlation = p;
            c.line_reg = this.regress_AD.line_reg(ps, row_size)
            c.threshold = this.findThreshold(ps, len, c.line_reg);
            this.cf.push(c);
        }
        else if (this.itsHybrid == true) {
            if (p > 0.5) {
                let minCircle = new enclosingCircle(ps);

            }
        }
    }
}


}
