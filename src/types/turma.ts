export type Turma = {
    id:string,
    nome:string
}

export type TurmaBancoDeDados = {
    id:string,
    nome:string,
    modulo:string
}

export function tipageTurma (turma:any){
    const tipoTurma:TurmaBancoDeDados={
        id: turma.id,
        nome:turma.nome,
        modulo:turma.modulo
    }

    return tipoTurma
}