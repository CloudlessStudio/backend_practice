function sum(arr, n){
    let flag = false;
    if(n==0){
        flag = true;
    }
    if(flag==false){
        let ans = arr[n-1]+ sum(arr, n-1);
        console.log(ans);
        return ans;
    }
    
}

sum([1,2,3,4,4],3);