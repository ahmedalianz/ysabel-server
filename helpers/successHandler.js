const successHandler=(data,res,message)=>{
    res.status(200).send({
        status:'success',
        data,
        message
    })
}
module.exports=successHandler