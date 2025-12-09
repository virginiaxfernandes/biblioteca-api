import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsBoolean, IsInt, IsNotEmpty, IsString, Length } from "class-validator";


@Entity()
export class Livro {
@PrimaryGeneratedColumn()
id!: number;


@Column({ length: 255 })
@IsString()
@IsNotEmpty()
@Length(1, 255)
titulo!: string;


@Column({ length: 255 })
@IsString()
@IsNotEmpty()
@Length(1, 255)
autor!: string;


@Column({ length: 20, unique: true })
@IsString()
@IsNotEmpty()
isbn!: string;


@Column()
@IsInt()
anoPublicacao!: number;


@Column({ default: true })
@IsBoolean()
disponivel!: boolean;
}
