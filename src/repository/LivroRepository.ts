import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";


export const LivroRepo: Repository<Livro> = AppDataSource.getRepository(Livro);