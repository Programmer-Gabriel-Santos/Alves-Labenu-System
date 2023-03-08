import Estudante from "../../model/estudante"
import Hobbies from "../../model/hobbies"
import BaseDataBase from "../BaseDataBase"
import connection from "../connection"

class EstudanteData extends BaseDataBase{
    async insertEstudante(estudante: Estudante, hobbies: Hobbies): Promise<void>{
        try {
            await this.getConnection()("estudante")
                .insert(estudante)
    
            await this.getConnection()("hobbies")
                .insert(hobbies)
    
        } catch (error: any) {
            throw new Error(
                `Ocorreu um erro com a inserção de dados, verifique os dados enviados e tente novamente.`)
        }
    }

    async selectEstudante(nome: string): Promise<Estudante[]>{
        try {
            const estudantes: Estudante[] = await this.getConnection()("estudante")
                .where("nome", "LIKE", `%${nome ? nome : ""}%`)
    
            return estudantes
    
        } catch (error: any) {
            throw new Error(`Um erro inesperado aconteceu :/.`)
        }
    }

    async updateEstudante(id: string, turma_id: string): Promise<void> {
        try {
            await connection("estudante")
                .update({ turma_id: turma_id })
                .where({ id })
    
        } catch (error: any) {
            throw new Error(`Um erro inesperado aconteceu :/.`)
        }
    }
}

export default EstudanteData