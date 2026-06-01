const recentEvents =
new Set();



export const emitOnce =
(
key:string,
callback:any
)=>{


if(
recentEvents.has(key)
){

return;

}



recentEvents.add(key);



callback();



setTimeout(
()=>{

recentEvents.delete(key);

},
1000
);



};