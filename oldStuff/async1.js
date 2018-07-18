function first(y) {
   console.log(1);
   y();
}

function second(a,b) {
    console.log(2);
    return a+b;
}

first( function(){
    var z = second(6,8);
    console.log(z);
});
