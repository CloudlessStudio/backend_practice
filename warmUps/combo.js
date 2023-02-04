function combo(array, sum){
    let ans = [];
    let solX = [];
    let done = false;
    let num = '';
    

    while(done!=true){
        //find if a single num in our array adds to sum
        for(let i = 0; i<array.length; i++){
            if(sum-array[i]==0){
                solX.push(array[i]);
                ans.push(solX);
                array.splice(i,1);
                solX = [];
            }
        }
        //find if same number repeated from array adds to sum
        
        for(let i = 0; i<array.length; i++){
            if(sum%array[i]==0){
                let k = sum/array[i];
                console.log(k);
                for(let j = 0; j<k;j++){
                    solX.push(k);
                }
            ans.push(solX);
            }
         }
        done = true;
    }
    console.log(ans);
}
a = [2,3,4,6,8,7];
combo(a, 8);
