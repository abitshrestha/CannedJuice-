export const errorHandler=(error,req,res,next)=>{
    console.log(error);
    res.status(error.status||500).json({
        error:{
            status:error.status || 500,
            message:error.message || 'Internal Server Error',
        }
    });
}