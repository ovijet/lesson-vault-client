'use server'


const baseURI=process.env.NEXT_PUBLIC_SERVER_URL

export const subscription= async (data)=>{
    const res=await fetch(`${baseURI}/subscription`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })

    const userData = await res.json()
    return userData;
}