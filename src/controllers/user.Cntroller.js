import db from "../config/rushdb.js";

//create user

export const createUser = async(req,res) => {
    try{
        const {fullname, email, age} = req.body

        if(!fullname || !email){
            return res.status(400).json({
                success: false,
                message: "Full name and email are required"
            });
        }

        const result = await db.records.create({
            label: "USER",
            data: {
                fullname,
                email,
                age: age ? Number(age) : null
            }
        });

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: result
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


//Get User

export const getAllUsers = async(req, res) =>{
    try{
        const result = await db.records.find({
            labels:["USER"],
            limit: 100
        });

        return res.status(200).json({
            success: true,
            message: "Users ferched  successfully",
            data: result.data
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};