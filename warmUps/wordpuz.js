function main(arr, ch){
    let list_of_hits = [];
    let ans =0;
    //check if any words return true if so add to list_of_hits;
    for(let k =0; k<arr.length; k++){
        if(check(arr[k],ch)){    //if true v
            list_of_hits.push(arr[k]);
        }
    }
    console.log("compatible words: "+list_of_hits);
    //count the letters in list of hits
    for(let p =0; p<list_of_hits.length; p++){
        ans+=list_of_hits[p].length;
    }

    return ans;
}


function check(word, chars){
    let original = "";
    let w_list = word.split("");
    let c_list = chars.split("");
    //go through each letter of word and if found in the long string add to original variable
    for(let i =0; i<w_list.length; i++){
        for(let j=0;j<c_list.length; j++){
            if(w_list[i]==c_list[j]){
                original += w_list[i];
                c_list[j] = "*";
                break;
            }
        }
    }
    //if the original var is the same as word return true
    if(original==word){
        return true;
    }
    else{
        return false;
    }
}

//test cases----------------------------------------------------
wrds =["cat","bt","hat","tree"];
c = "atach";
const A = main(wrds,c);  //should be 6

wrds1 = ["hello", "world"];
c1 = "welldonehoneyr"; 
const B = main(wrds1,c1);//should be 10

wrds2 = ["jam", "bee", "bread"];
c2 = "beardedjamaican";
const C = main(wrds2,c2); //should be 11




console.log(A);
console.log(B);
console.log(C);