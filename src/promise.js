const promise = new Promise((resolve,reject)=>{
    if(2==3) resolve("equall")
    else reject("not")
})
    promise.then((res)=>{
        console.log(res)
    })

    .catch((res)=>{
        console.log(res)
    })