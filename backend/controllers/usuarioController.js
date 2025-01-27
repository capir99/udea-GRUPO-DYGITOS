const Usuario = require("../models/usuarioModel");

//metodo para listar los usuarios
exports.getUsuarios = (req, res) => {
  Usuario.find()
    .then((postResult) => {
      if (postResult) {
        res.status(200).json(postResult);
      } else {
        res.status(404).json("Sin usuarios");
      }
    })
    .catch((err) => {
      console.log("error:", err);
    });
};

//metodo para crear un nuevo usuario con rol vendedor por defecto
exports.addUsuario = (req, res) => {
  const usuario = new Usuario({
    login: req.body.login,
    fullName: req.body.fullName,
    pass: req.body.pass,
    rol: "Vendedor",
  });
  usuario.save().then((createdUser) => {
    res.status(201).json("Usuario creado satisfactoriamente");
  });
};

//metodo para eliminar un usuario
exports.removeUsuario = (req, res) => {
  const filter = { _id: req.params.id };
  Usuario.deleteOne(filter).then(() => {
    res.status(201).json("Usuario eliminado satisfactoriamente");
  });
};

//metodo para consultar un usuario por su ID
exports.getUsuarioById = (req, res) => {
  Usuario.findById(req.params.id).then((userResult) => {
    if (userResult) {
      res.status(200).json(userResult);
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  });
};

//metodo para consultar un usuario por su Email
exports.getUsuarioByEmail = (req, res) => {
  const filter = { email: { $regex: "^" + req.params.email, $options: "i" } };

  Usuario.find(filter).then((userResult) => {
    if (userResult) {
      res.status(200).json(userResult);
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  });
};

//metodo para modificar un usuario existente
exports.modifyUsuario = (req, res) => {
  const filter = { _id: req.params.id };

  Usuario.findOne(filter).then((userResult) => {
    if (userResult) {
      userResult.rol = req.body.rol;
      userResult.estado = req.body.estado;
      userResult.save().then(() => {
        res.status(201).json("Usuario actualizado satisfactoriamente");
      });
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  });
};

//metodo para consultar vendedores
exports.getUsuariosVendedores = (req, res) => {
  const filter = { rol: "Vendedor", estado: "Autorizado" };
  Usuario.find(filter).then((userResult) => {
    if (userResult) {
      res.status(200).json(userResult);
    } else {
      res.status(404).json("No existe ningún usuario con rol Vendedor");
    }
  });
};
