import mongoose from "mongoose";

export const conexion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog");
    mongoose.set("strictQuery", true); // Añade esta línea
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos !!");
  }
};
