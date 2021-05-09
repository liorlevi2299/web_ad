const Line = require("./Line");
const anomalyFunc = require("./anomalyFunc");
const Point = require("./Point");
const CorrFeatures = require("./CorrFeatures");

regress_AD = new anomalyFunc();
class regressionAnomaly{
    toPoints(arr_x, arr_y){
        let ps = [];
        for(let i=0;i<arr_x.length; i++){
            ps[i] = new Point(arr_x[i],arr_y[i]);
        }
        return ps;
    }
    float SimpleAnomalyDetector::findThreshold(Point** ps,size_t len,Line rl){
    float max=0;
    for(size_t i=0;i<len;i++){
    float d=abs(ps[i]->y - rl.f(ps[i]->x));
    if(d>max)
    max=d;
}
return max;
}
