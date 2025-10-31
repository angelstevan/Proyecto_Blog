import { conexion } from "./src/config/conexion.js";
import express from "express";
import cors from "cors";
conexion();
const app = express();
const puerto = 3900;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import rutasArticulo from "./src/routes/articulo.js";
app.use("/api", rutasArticulo);
app.listen(puerto, () => {
  console.log(`Servidor corriendo en el puerto ${puerto}`);
});
