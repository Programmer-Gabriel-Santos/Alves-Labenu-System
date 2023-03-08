import { Request, Response } from "express-serve-static-core";
import DocenteData from "../../data/docente/docenteData";
import Docente from "../../model/docente";
import Especialidades from "../../model/especialidades";

class DocenteController {
    async getDocentes(req: Request, res: Response): Promise<void> {

        try {
            let nome = req.query.nome as string
            
            const docenteData = new DocenteData()
            const docentes: Docente[] = await docenteData.selectDocente(nome)

            res.send(docentes)
    
        } catch (error: any) {
    
            if (typeof error === "string") {
    
                res.status(404).send(error)
            } else {
    
                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }

    async createDocente(req: Request, res: Response): Promise<void>{

        try {
            const { nome, email, data_nasc, turma_id, especialidade } = req.body
            let docente_id = Date.now().toString()
    
            if (!(nome || email || data_nasc || turma_id || especialidade)) {
    
                res.statusCode = 422
                throw new Error("Todos os campos precisam estar preenchidos corretamente.")
            }
    
            const docente: Docente = {
                id: docente_id,
                nome,
                email,
                data_nasc,
                turma_id
            }
            const Especialidades: Especialidades = { especialidade, docente_id }
            const docenteData = new DocenteData()

            await docenteData.insertDocente(docente)
            
            await docenteData.insertEspecialidades(Especialidades)
    
            res.send("Docente adicionado com suceso!")
    
        } catch (error: any) {
            if (typeof error === "string") {
    
                res.send(error)
            } else {
    
                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }

    async putDocente(req: Request, res: Response): Promise<void> {
        try {
            const { docente_id, turma_id } = req.body
    
            if (!(docente_id || turma_id)) {
                res.statusCode = 422
                throw new Error("Por favor preencha todos os campos corretamente.")
            }

            const docenteData = new DocenteData()

            await docenteData.updateDocente(docente_id, turma_id)
            
            res.send("Docente transferido com sucesso!")
    
        } catch (error: any) {
            if (typeof error === "string") {
    
                res.send(error)
            } else {
    
                res.status(500).send("Ops! Um erro inesperado ocorreu =/")
            }
        }
    }
}

export default DocenteController