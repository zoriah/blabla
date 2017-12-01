

let add = (a,b) => a+b;
let multiply = (a,b) => {return a*b};

a = function (x, y, callback) {
    return callback(x,y);    
};

console.log(a(2,2, (a,b) => a-b));