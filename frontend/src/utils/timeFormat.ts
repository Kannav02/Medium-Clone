export const timeFormat=(time:string)=>{
    const date=new Date(time)
    return date.toLocaleString("en-us",{
        year:"numeric",
        month:"long",
        day:"numeric"

    })


}