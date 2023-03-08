import Docente from "../../model/docente";
import Especialidades from "../../model/especialidades";
import BaseDataBase from "../BaseDataBase";

class DocenteData extends BaseDataBase{

    async insertDocente(docente: Docente): Promise<void> {
        try {
            await this.getConnection()("docentes")
                .insert(docente)
    
        } catch (error: any) {
            throw new Error(
                `Ocorreu um erro com a inserção de dados, verifique os dados enviados e tente novamente. 
                Dica: faça o um get e certifique-se de que o docente realmente não existe antes de adicionar.
                `)
        }
    }

    async insertEspecialidades(especialidade: Especialidades): Promise<void>{
        try {
            await this.getConnection()("especialidades")
                .insert(especialidade)
    
        } catch (error: any) {
            console.log(error.sqlMessage || error.message);
            throw new Error("Certifique-se de que os dados estão corretos.")
        }
    }

    async selectDocente(nome: string): Promise<Docente[]> {

        try {
            const docentes: Docente[] = await this.getConnection()("docentes")
                .where("nome", "LIKE", `%${nome ? nome : ""}%`)
    
            return docentes
    
        } catch (error: any) {
            throw new Error(`Um erro inesperado aconteceu :/.`)
        }
    }

    async updateDocente(id: string, turma_id: string): Promise<void> {
        try {
            await this.getConnection()("docentes")
                .update({ turma_id: turma_id })
                .where({ id })
    
        } catch (error: any) {
            throw new Error(`Um erro inesperado aconteceu :/.`)
        }
    }

}

export default DocenteData