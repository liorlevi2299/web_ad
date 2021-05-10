const Line = require("./Line");
const Point = require("./Point");

class anomalyFunc {
    avg(arr_x, size) {
        let sum = 0;

        for(let i=0; i<size;  i++) {
            let v = parseFloat(arr_x[i]);
            sum = sum + v;

        }
        return sum / size;
    }
// returns the variance of X and Y
    var(arr_x, size){
        let av = this.avg(arr_x,size);
        let sum=0;
        for(let i=0; i<size; i++){
            let v = parseFloat(arr_x[i]);
            sum+= v*v;
        }
        return sum/size - av*av;
    }
    // returns the covariance of X and Y
    cov(arr_x, arr_y, size){
        let sum=0;
        for(let i=0; i<size; i++){
            let v_x = parseFloat(arr_x[i]);
            let v_y = parseFloat(arr_y[i]);

            sum+= v_x*v_y;
        }
        sum/=size;
        return sum - this.avg(arr_x,size)*this.avg(arr_y,size);
    }

    pearson(arr_x, arr_y, size){
        if (size === 0) {
            return 0;
        }
        let co_var = this.cov(arr_x,arr_y, size);
        let var_x = Math.sqrt(this.var(arr_x, size));
        let var_y =Math.sqrt(this.var(arr_y, size)) ;
        let mul_var = var_x * var_y;

        if ((co_var === 0) || (mul_var === 0)) {
            return 0;
        }
        return co_var / mul_var;


/*        let var_x = Math.sqrt(this.var(arr_x, size));
        let var_mult = var_x* Math.sqrt(this.var(arr_y,size));
        let ret3 = this.cov(arr_x, arr_y,size);
        if()
        return ret3 / ret2;*/
/*        return this.cov(arr_x, arr_y, size)
            /(Math.sqrt(this.var(arr_x,size))*Math.sqrt(this.var(arr_y,size)));*/
    }
    // performs a linear regression and returns the line equation
    linear_reg(points, size){
        let x_arr = [];
        let y_arr = [];
        for(let i=0; i<size; i++){
            let p_x = parseFloat(points[i].x);
            let p_y = parseFloat(points[i].y)  ;

            x_arr[i] = p_x ;
            y_arr[i] = p_y ;
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


