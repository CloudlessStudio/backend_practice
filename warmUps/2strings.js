function _2string(a,b){
    if(a.length==b.length){
        
        let idxsA = checkArr(a).toString();
        let idxsB = checkArr(b).toString();
        console.log(idxsA);
        console.log(idxsB);
        if(idxsA===idxsB){
            console.log("a is "+a+" b is "+b);
            console.log(true);
            console.log("------------------------");
        }
        else{
            console.log("a is "+a+" b is "+b);
            console.log(false);
            console.log("------------------------");
        }
    }
}






function checkArr(val){
    arr = val.split("");
    let idxPos =[];
    for(let i=0; i<arr.length;i++){
        for(let j=0; j<arr.length;j++){
            if(arr[i]==arr[j] && i!=j){
                idxPos.push(i);
                idxPos.push(j);
            }    
        }
    }
    if(idxPos.length == 0){
        idxPos.push("no repeats!");
    }
    return idxPos

}



_2string("egg","add"); //true
_2string("mouse","house"); //true
_2string("paper","title"); //true
_2string("too","bus"); //false
_2string("sssa", "eeee"); //true
_2string("asa", "aad");//false