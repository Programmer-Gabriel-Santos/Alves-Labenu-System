import app from "./app";
import EstudanteController from "./endpoints/estudanteController/estudanteController";
import DocenteController from "./endpoints/docenteController/docenteController";
import TurmasController from "./endpoints/turmasController/turmasController";

const turmasController = new TurmasController()
const estudanteController = new EstudanteController()
const docenteController = new DocenteController()

app.get("/selecionar-turmas",turmasController.getTurma)

app.post('/criar-turma',turmasController.criarTurma)

app.put("/mudanca-modulo",turmasController.mudancaModuloTurma)

app.get("/estudante", estudanteController.getEstudante)

app.post("/estudante", estudanteController.createEstudante)

app.put("/estudante", estudanteController.putEstudanteTurma)

app.get("/docentes", docenteController.getDocentes)

app.post("/docente", docenteController.createDocente)

app.put("/docentes", docenteController.putDocente)
