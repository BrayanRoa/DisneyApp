import jwt from "jsonwebtoken";

export const generarJWT = (id:string ='')=>{
    return new Promise((resolve, reject)=>{
        const payload = {id}

        jwt.sign(payload, process.env.SECRET_KEY || '',{
            expiresIn: '4h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No se puede generar el JWT')
            }else{
                resolve(token)
            }
        })
    })
}