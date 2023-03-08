import Turma from "../../model/turma";
import { TurmaBancoDeDados } from "../../types/turma";
import BaseDataBase from "../BaseDataBase";

class TurmasData extends BaseDataBase {
    async insertTurma(turma: Turma): Promise<void> {
        const { id, nome } = turma;

        await this.getConnection()("turma").insert({
            id,
            nome
        })
    }

    async selectTurma(idTurma: string): Promise<TurmaBancoDeDados[]> {
        try {
            const result: TurmaBancoDeDados[] = await this.getConnection()("turma")
                .where("id", `${idTurma}`)

            return result

        } catch (error: any) {
            throw new Error(
                `Ocorreu um erro com a busca de dados, verifique os dados enviados e tente novamente.`)
        }
    }

    async selectTurmas(nome: string): Promise<TurmaBancoDeDados[]> {
        try {
            const result: TurmaBancoDeDados[] = await this.getConnection()("turma")
                .where("nome", "LIKE", `%${nome ? nome : ""}%`)

            return result

        } catch (error: any) {
            throw new Error(
                `Ocorreu um erro com a busca de dados, verifique os dados enviados e tente novamente.`)
        }
    }

    async updateModulo(id: string, modulo: string): Promise<void> {
        try {
            await this.getConnection()("turma")
            .update({ modulo: modulo })
            .where({id})
    
        } catch (error: any) {
            console.log(error)
            throw new Error(`Um erro inesperado aconteceu :/.`)
        }
    }
}

export default TurmasData