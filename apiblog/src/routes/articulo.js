import { Router } from "express";
import multer from "multer";
import * as ArticuloControlador from "../controllers/articulo.js";
const router = Router();
// Configuración de multer
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/");
  },
  filename: (req, file, cb) => {
    cb(null, `articulo${Date.now()}${file.originalname}`);
  },
});

const subidas = multer({ storage: almacenamiento });


// Rutas útiles
router.get("/", ArticuloControlador.listarTodos);
router.post("/crear", ArticuloControlador.crearArticulo);
router.get("/listar", ArticuloControlador.listarTodos);
router.get("/articulos/:ultimos", ArticuloControlador.listarArticulos);
router.get("/articulo/:id", ArticuloControlador.obtenerArticuloId);
router.delete("/articulo/:id", ArticuloControlador.borrarArticulo);
router.put("/articulo/:id", ArticuloControlador.editarArticulo);
router.post(
  "/subir-imagen/:id",
  subidas.single("file0"),
  ArticuloControlador.subirImagen
);
router.get("/imagen/:fichero", ArticuloControlador.mostrarImagen);
router.get("/buscar/:busqueda", ArticuloControlador.buscador);

export default router;
