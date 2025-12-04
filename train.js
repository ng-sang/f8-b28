// //async/await
// // async function: Hàm này sẽ bọc 1 promise(promise wrapper)

// // const doSomething = async ()=>{
// //     return "ABC";
// // }
// // // console.log(doSomething);

// // //Promise.resolve(value)

// // doSomething().catch((err)=>{
// //     console.log(err);
    
// // })

// //await:Đợi promise resolve
// //cú pháp:await promise
// //await: không có hàm cath
// // const myPromise = new Promise((resolve)=>{setTimeout(()=>{
// //     resolve("result")
// // ,2000})
// // });

// // const doSomething = async () => {
// //     const data= await myPromise;
// //     console.log(data);
// //     console.log("xin chào");
    
// // };// mỗi lần await tương đương mỗi lần then nhưng k bị callback
// // doSomething();


// const myPromise =new Promise((resolve,reject) => {
//     setTimeout(()=>{
//         reject("errr")
//     },2000);
// })

// // const myPromise2 =new Promise((resolve) => {
// //     setTimeout(()=>{
// //         resolve("result")
// //     },1000)
// // })

// const doSomething=async () => {
// //     const data1 =await myPromise
// // console.log(data1);
// //   const data2 =await myPromise
// // console.log(data2s);
// try{
//     const data1 =await myPromise;
//     console.log(data1);
    
// }catch(err){
//     console.log(err);
// }
// }
// //await phải dùng trong async
// doSomething()

// //hàm iife
// const ids=[1,2,3]
// (async () => {
//     let total=0;
//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];
//         const it =ids[i]
        
//     }

// console.log(total);
// })();



// const myPromise4 =new Promise((resolve)=>{
//     resolve({
//         content:new Promise((resolve)=>{
//             resolve("Heloo anh em");
//         }),
//     });
// });

// const myPromise5 =Promise.resolve("hello ae")

// const doSomething1 = async ()=>{
//     //log==> Hello anh em
//     // const data = await myPromise4
//     // const result =await data.content
//     // console.log(result);
//     return myPromise5
// };
// doSomething1().then((data)=>{
//     console.log(data);
    
// })

//A (Promise)--> B(Promise)--> A--> [B]

//await nhận hàm gần nhất

const getUser =(userId)=>{
   return new Promise((resolve)=>{
    setTimeout(()=>{
     const users=[
        {
            id:1,
            name:"User 1",
            salary:1000,
        },
         {
            id:2,
            name:"User 2",
            salary:2000,
        },
         {
            id:3,
            name:"User 3",
            salary:3000,
        },
        
    ];
    const user= users.find((user)=>user.id===userId);
    resolve(user);
   },Math.random()*2000);
   });
};

const ids=[1,2,3]
const tongel = async () => {
    const user =await Promise.all(ids.map((id)=>getUser(id)));
    console.log(user);
    
    const total =user.reduce((prev,cur)=>prev+cur.salary,0);
    console.log(total);
    
};
tongel()