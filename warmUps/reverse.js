// Given an array of numbers reverse every k consecutive numbers

// input array = [3,4,2,12,40,2,4]
// k = 3
// output = [2,4,3,2,40,12,4]

function rev(a,k){
let e = [];
let ans =[];
if(k<=a.length==false){
    console.log("k is longer than the array");
    return 0;
}
while(a.length!=0){
        for(let i =k-1; i>=0;i--){
            e.push(a[i]);
        }
        a.splice(0,k);
}
console.log(e);
for(let j = 0; j<e.length; j++){
    console.log(e[j]);
    if(e[j]==null){
        continue;
    }
    else{
        ans.push(e[j]);
    }
}
console.log("anwser: "+ans);

}


let input  = [3,4,2,12,40,2,4];
rev(input,3);


//chat anwser 


// function rev(a, k) {
//     let e = [];
//     if (k > a.length) {
//       console.log("k is longer than the array");
//       return 0;
//     }
//     for (let i = 0; i < a.length; i += k) {
//       for (let j = i + k - 1; j >= i; j--) {
//         e.push(a[j]);
//       }
//     }
//     console.log(e);
//   }
  
//   let input = [3, 4, 2, 12, 40, 2, 4];
//   rev(input, 3);