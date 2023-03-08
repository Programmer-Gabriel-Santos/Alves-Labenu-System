import { Request, Response } from "express-serve-static-core";
import TurmasData from "../../data/turmas/turmasData";
import Turma from "../../model/turma";
import { TurmaBancoDeDados } from "../../types/turma";

class TurmasController {
    async getTurma(req: Request, res: Response) {
        try {
            const turmasData = new TurmasData()
            const turmasAtivas = await turmasData.selectTurmas("")

            if (!turmasAtivas?.length) {
                throw new Error("nao há turmas ativas")
            }

            res.status(200).send(turmasAtivas)

        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }

    async criarTurma(req: Request, res: Response) {
        try {
            const { nome } = req.body

            if (!nome) {
                throw new Error("o nome da turma deve ser passado")
            }

            const novaTurma: Turma = {
                id: Date.now().toString(),
                nome
            }
            const turmasData = new TurmasData()

            await turmasData.insertTurma(novaTurma)

            res.status(201).send({ message: "turma criada com sucesso" })
        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }

    async mudancaModuloTurma(req:Request,res:Response) {
        try {
            const {idTurma,modulo}= req.body
    
            if(!idTurma || !modulo){
                throw new Error("idTurma e modulo devem ser passados")
            }
            
            const turmasData = new TurmasData()
            const turmaExiste = await turmasData.selectTurma(idTurma)
            
            if(!turmaExiste){
                throw new Error(`turma com id ${idTurma} nao existe`)
            }
            
            if(modulo === "0"){
                throw new Error("não é possivel alterar uma turma para o modulo 0")
            }
    
    
            await turmasData.updateModulo(idTurma,modulo)
    
            res.status(200).send({message:"modulo alterado com sucesso!"})
        } catch (error: any) {
            res.status(500).send({ message: error.message })
        }
    }
}

export default TurmasController