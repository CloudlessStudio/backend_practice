function adjdup(s){
    let flag = false;
    let s_array = s.split("");
    let ans = "";
    for(let i = 0; i<s_array.length; i++){
        if(s_array[i]==s_array[i+1]){
         s_array.splice(i, 2);
        flag = true;  //flag set to true meaning there were duplicates
        }
    }
    let text = s_array.join('');
    //solving with recursion!
    if(flag==false){
        return text;
    }
    else{
        return adjdup(text);
    }
}


const a = adjdup("abbaca"); //should be ca
const b = adjdup("abbbaca"); // should be abaca
const c = adjdup("abcdeeffgg"); //should be abcd
const d = adjdup("abcdd"); // should be abc

console.log("abcde is now: ",d);