import bcrypt from 'bcrypt';
const saltRounds=10;

const hashPassword=async(password)=>{
    try {
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        next(error)
    }
}

const compareHash=async(password,hashedPassword)=>{
    try {
        return await bcrypt.compare(password,hashedPassword);
    } catch (error) {
        next(error);
    }
}

export {hashPassword,compareHash};