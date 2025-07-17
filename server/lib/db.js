import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connection: ${connection.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
// database
// username: lynx_socia_dbase
// password: nzeRJEIYuWGnKuGs
// connectionString: mongodb+srv://lynx_socia_dbase:<db_password>@lynx.05vklnh.mongodb.net/?retryWrites=true&w=majority&appName=Lynx
