import express from "express";
import { hash } from "bcryptjs";
import {
  autenticarUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  cadastrarUsuario,
  todosUsuariosAtivos,
} from "./services/UsuarioService";
import { json } from "stream/consumers";
import routes from "./api/routes";

const app = express();
app.use(express.json());
app.use("/api", routes);

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor rodando em http://localhost:3000");
});
