function freq(arr){
    let g = [];
    for(let i= 0; i<arr.length; i++){
        let check = 0;
        for(let j=0;j<arr.length;j++){
            if(arr[i]==arr[j]){
                check++;
            }
        }
        g.push(check);
    }

    console.log(g);

}

freq([1,2,2,3,3,3]);