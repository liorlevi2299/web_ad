const Line = require("./Line");
const Point = require("./Point");

class anomalyFunc {
    avg(arr_x, size) {
        let sum=0;
        for(let i=0; i<size;  i++){
            sum += arr_x[i];
        }
        return sum / size;
    }
// returns the variance of X and Y
    var(arr_x, size){
        let av = this.avg(arr_x,size);
        let sum=0;
        for(let i=0; i<size; i++){
            sum+=arr_x[i]*arr_x[i];
        }
        return sum/size - av*av;
    }
    // returns the covariance of X and Y
    cov(arr_x, arr_y, size){
        let sum=0;
        for(let i=0; i<size; i++){
            sum+=arr_x[i]*arr_y[i];
        }
        sum/=size;
        return sum - this.avg(arr_x,size)*this.avg(arr_y,size);
    }

    pearson(arr_x, arr_y, size){
        return this.cov(arr_x, arr_y, size)
            /(Math.sqrt(this.var(arr_x,size))*Math.sqrt(this.var(arr_y,size)));
    }
    // performs a linear regression and returns the line equation
    linear_reg(points, size){
        let x_arr;
        let y_arr;
        for(let i=0; i<size; i++){
            x_arr[i] = points[i].x;
            y_arr[i] = points[i].y;
        }
        let a = this.cov(x_arr, y_arr,size)/this.var(x_arr,size);
        let b = this.avg(y_arr,size) - a*(this.avg(x_arr,size));

        return new Line(a,b);
    }
    // returns the deviation between point p and the line equation of the points
    dev(p, points, size){
        let l = this.linear_reg(points,size);
        return this.dev(p,l);
    }
    // returns the deviation between point p and the line
    dev(p, l){
        return Math.abs(p.y-l.f(p.x));
    }
}

module.exports = anomalyFunc;


