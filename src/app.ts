import express from "express";
import { AppDataSource } from "./data-source";
import { LivroController } from "./controller/LivroController";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado.");

    const app = express();
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("API da Biblioteca funcionando! Use /api/livros");
    });

    const base = "/api/livros";

    app.post(base, LivroController.criar);
    app.get(base, LivroController.listar);
    app.get(`${base}/:id`, LivroController.obterPorId);
    app.put(`${base}/:id`, LivroController.atualizar);
    app.delete(`${base}/:id`, LivroController.excluir);

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro inicializando Data Source:", err);
  });
