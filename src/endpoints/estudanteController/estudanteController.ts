import { Request, Response } from "express-serve-static-core";
import EstudanteData from "../../data/estudante/estudanteData";
import Estudante from "../../model/estudante"
import Hobbies from "../../model/hobbies";

class EstudanteController {
    async getEstudante(req: Request, res: Response): Promise<void> {
        try {
            let nome = req.query.nome as string
            
            const estudanteData = new EstudanteData()

            const estudante: Estudante[] = await estudanteData.selectEstudante(nome)
            res.send(estudante)
    
        } catch (error: any) {
    
            if (typeof error === "string") {
    
                res.status(404).send(error)
            } else {
    
                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }

    async createEstudante(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, data_nasc, turma_id, hobbies } = req.body
            let id = Date.now().toString()

            if (!(nome || email || data_nasc || turma_id || hobbies)) {

                res.statusCode = 422
                throw new Error("Todos os campos precisam estar preenchidos corretamente.")
            }

            const estudante = new Estudante(
                id,
                nome,
                email,
                data_nasc,
                turma_id
            )

            const Hobbies: Hobbies = { hobbies, estudante_id : id }

            const estudanteData = new EstudanteData()
            await estudanteData.insertEstudante(estudante, Hobbies)

            res.send("Aluno adicionado com suceso!")

        } catch (error: any) {
            if (typeof error === "string") {

                res.send(error)
            } else {

                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }

    async putEstudanteTurma(req: Request, res: Response): Promise<void> {
        try {
            const { aluno_id, turma_id } = req.body
    
            if (!(aluno_id || turma_id)) {
                res.statusCode = 422
                throw new Error("Por favor preencha todos os campos corretamente.")
            }
            
            const estudanteData = new EstudanteData()
            await estudanteData.updateEstudante(aluno_id, turma_id)
    
            res.send("Estudante transferido com sucesso!")
    
        } catch (error: any) {
            if (typeof error === "string") {
    
                res.send(error)
            } else {
    
                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }
}

export default EstudanteController
