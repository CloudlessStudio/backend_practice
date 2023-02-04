// Given a string array words, return an array of all characters that show up 
// in all strings within the words (including duplicates). 
// You may return the answer in any order.

function repeat(arr){
    let x = [];
    let ans = [];
    let first_word = new Map();
    let repeats = new Map();

    //only worry about word number 1 because they all have to have something in common so map
    //all letters of the first word

    //loop through each letter of words n+1
    for(let j=0; j<arr.length; j++){
       
        for(let k = 0; k<arr[j].length; k++){
            //check if our map has the letter if so and not 
            first_word.set(arr[j][k],arr[j][k]);
            
            }
            x.push(first_word);
        
        }

    console.log(x);
    //console.log(repeats);
}




repeat(["bella","label","roller"]);
//repeat(["cool", "lock", "cook"]);