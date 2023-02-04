function el(a){
    let x = a.length/2;
    let bignum1 = 0;
    let curr = 0;
    let bignum2 = 0;
    for(let i =0; i<a.length; i++){
        for(let j =0; j<a.length; j++){
            if(a[i]==a[j]){
                bignum1++;
            }
        }
        if(bignum1>bignum2){
            curr = a[i];
        }
        bignum2 = bignum1;
        bignum1 = 0;
    }
    console.log(curr);
}


el([2,2,2,3,4,5,6,6,6,6,6,7,2]);