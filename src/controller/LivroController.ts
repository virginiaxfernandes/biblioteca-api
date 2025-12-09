import { Request, Response } from "express";
import { validate } from "class-validator";
import { Livro } from "../entity/Livro";
import { AppDataSource } from "../data-source";

const LivroRepo = AppDataSource.getRepository(Livro);

export class LivroController {

  static async criar(req: Request, res: Response) {
    try {
      const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

      const livro = LivroRepo.create({
        titulo,
        autor,
        isbn,
        anoPublicacao,
        disponivel,
      });

      const errors = await validate(livro);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const salvo = await LivroRepo.save(livro);
      return res.status(201).json(salvo);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const livros = await LivroRepo.find();
      return res.json(livros);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async obterPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const livro = await LivroRepo.findOneBy({ id });

      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      return res.json(livro);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      let livro = await LivroRepo.findOneBy({ id });

      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      LivroRepo.merge(livro, req.body);

      const errors = await validate(livro);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const salvo = await LivroRepo.save(livro);
      return res.json(salvo);

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }

  static async excluir(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const livro = await LivroRepo.findOneBy({ id });

      if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      await LivroRepo.delete(id);
      return res.status(204).send();

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
