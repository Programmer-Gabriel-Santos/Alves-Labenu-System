export type Docente = {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string
}

export type Especialidades = {
    especialidade: string,
    docente_id: string
}