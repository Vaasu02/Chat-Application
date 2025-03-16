import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:"strict",
        maxAge:1*24*60*60*1000
    })
}

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({message:"Unauthorized"});
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({message:"Unauthorized"});
        req.userId = decoded.userId;
        next();
    })
}