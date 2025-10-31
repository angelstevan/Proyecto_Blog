import { promises as fs } from "fs";
import path from "path";
import { validarArticulo } from "../helpers/validar.js";
import Articulo from "../models/Articulo.js";

// Crear un artículo
export const crearArticulo = async (req, res) => {
  const parametros = req.body;
  console.log(parametros);
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).send({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  const articulo = new Articulo(parametros);
  try {
    const articuloGuardado = await articulo.save();
    return res.status(200).send({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Articulo creado con exito!!",
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      mensaje: "No se ha guardado el artículo",
    });
  }
};

// Listar artículos
export const listarArticulos = async (req, res) => {
  try {
    let consulta = Articulo.find({}).sort({ fecha: +1 });
    if (req.params.ultimos) {
      consulta = consulta.limit(req.params.ultimos);
    }
    const articulos = await consulta.exec();

    if (!articulos || articulos.length === 0) {
      return res.status(404).send({
        status: "error",
        mensaje: "No se han encontrado artículos!!",
      });
    }
    return res.status(200).send({
      status: "success",
      contador: articulos.length,
      articulos,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al listar los artículos",
    });
  }
};

// Listar todos los artículos sin límite
export const listarTodos = async (req, res) => {
  try {
    
    const articulos = await Articulo.find({}).sort({ fecha: +1 });

    if (!articulos || articulos.length === 0) {
      return res.status(404).send({
        status: "error",
        mensaje: "No se han encontrado artículos!!",
      });
    }
    return res.status(200).send({
      status: "success",
      contador: articulos.length,
      articulos,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al listar los artículos",
    });
  }
};

export const obtenerArticuloId = async (req, res) => {
  const id = req.params.id;
  try {
    const articulo = await Articulo.findById(id);
    if (!articulo) {
      return res.status(404).send({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }
    return res.status(200).send({
      status: "success",
      articulo,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al buscar el artículo",
    });
  }
};

// Borrar un artículo
export const borrarArticulo = async (req, res) => {
  const articuloId = req.params.id;
  try {
    const articuloBorrado = await Articulo.findOneAndDelete({
      _id: articuloId,
    });
    if (!articuloBorrado) {
      return res.status(404).send({
        status: "error",
        mensaje: "Artículo no encontrado para borrar",
      });
    }
    return res.status(200).send({
      status: "success",
      articulo: articuloBorrado,
      mensaje: "Artículo borrado con éxito",
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al borrar el artículo",
    });
  }
};

// Editar un artículo
export const editarArticulo = async (req, res) => {
  const articuloId = req.params.id;
  const parametros = req.body;
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).send({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  try {
    const articuloActualizado = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      parametros,
      { new: true }
    );
    if (!articuloActualizado) {
      return res.status(404).send({
        status: "error",
        mensaje: "Artículo no encontrado para actualizar",
      });
    }
    return res.status(200).send({
      status: "success",
      articulo: articuloActualizado,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al actualizar",
    });
  }
};

// Subir una imagen
export const subirImagen = async (req, res) => {
  if (!req.file) {
    return res.status(404).send({
      status: "error",
      mensaje: "Petición invalida, no se ha subido ningún archivo",
    });
  }
  const archivo = req.file.originalname;
  const extension = archivo.split(".").pop().toLowerCase();
  const extensionesPermitidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesPermitidas.includes(extension)) {
    try {
      await fs.unlink(req.file.path);
      return res.status(400).send({
        status: "error",
        mensaje: "Imagen invalida, solo se permiten .png, .jpg, .jpeg, .gif",
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        mensaje: "Error al borrar el archivo no válido",
      });
    }
  }
  const articuloId = req.params.id;
  try {
    const articuloActualizado = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      { imagen: req.file.filename },
      { new: true }
    );
    if (!articuloActualizado) {
      return res.status(404).send({
        status: "error",
        mensaje: "Artículo no encontrado para asociar la imagen",
      });
    }
    return res.status(200).send({
      status: "success",
      articulo: articuloActualizado,
      fichero: req.file.filename,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error al actualizar el artículo con la imagen",
    });
  }
};

export const mostrarImagen = async (req, res) => {
  const fichero = req.params.fichero;
  const ruta_fisica = path.resolve("./public/img/" + fichero);
  try {
    await fs.access(ruta_fisica);
    return res.sendFile(ruta_fisica);
  } catch (error) {
    return res.status(404).send({
      status: "error",
      mensaje: "La imagen no existe",
    });
  }
};

export const buscador = async (req, res) => {
  const busqueda = req.params.busqueda;
  try {
    const articulosEncontrados = await Articulo.find({
      $or: [
        { titulo: { $regex: busqueda, $options: "i" } },
        { contenido: { $regex: busqueda, $options: "i" } },
      ],
    }).sort({ fecha: -1 });

    if (!articulosEncontrados || articulosEncontrados.length === 0) {
      return res.status(404).send({
        status: "error",
        mensaje: "No se han encontrado artículos",
      });
    }
    return res.status(200).send({
      status: "success",
      articulos: articulosEncontrados,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      mensaje: "Error en la búsqueda de artículos",
    });
  }
};
