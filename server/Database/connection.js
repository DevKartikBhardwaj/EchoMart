import mongoose from 'mongoose';


async function ConnectDatabase(){
    try {
        await mongoose.connect('mongodb://localhost:27017/SpeciallyAbledCart');
        console.log("database is connected");
    } catch (error) {
        console.error('error in db - ',error.message);
    }
}

export default ConnectDatabase;