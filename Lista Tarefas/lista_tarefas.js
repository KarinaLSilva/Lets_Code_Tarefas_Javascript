let listaTarefasFazer = [];
let listaTarefasConcluidas = [];
let listaTodasTarefas = [];

const adicionarTarefa = (tarefa) => {
    listaTarefasFazer.push(tarefa);
    listaTodasTarefas.push(tarefa);
    document.getElementById('adicionaTarefa');
    console.log(listaTarefasFazer);
    //atualizaListaAdicionarTarefa();
}

// const atualizaListaAdicionarTarefa = () => {
//     const ulTag = document.getElementById('listaTarefasFazer');
//     let listaLi = '';

//     for(item of listaTarefasFazer){
//         listaLi += `<li>${item}</li>`
//     }
//     ulTag.innerHTML = listaLi;
// } nao está carregando itens

const adicionarTarefaConcluida = (tarefa) => {
    listaTarefasConcluidas.push(tarefa);
    listaTodasTarefas.push(tarefa);
    document.getElementById('adicionaTarefaConcluida');
    console.log(listaTarefasConcluidas);
} 

const removerTarefa = (tarefa) => {
    console.log(tarefa)
    let indice = listaTodasTarefas.indexOf(tarefa);
    if(indice > -1) {
        listaTodasTarefas.splice(indice, 1);
    } else {
        alert("tarefa não encontrada");
    }
    console.log(listaTodasTarefas);
    buscarTarefas();
}

const buscarTarefas = () => {
    const ulTag = document.getElementById('listaTarefas');
    let listaLi = '';

    for(item of listaTodasTarefas){
        listaLi += `<li>${item}</li>`
    }
    ulTag.innerHTML = listaLi;
}

const concluirTarefa = (tarefa) => {
    document.getElementById('concluiTarefa');
    let indice = listaTarefasFazer.indexOf(tarefa);
    if(indice > -1) {
        listaTarefasFazer.splice(indice, 1);
    } else {
        alert("tarefa não encontrada");
    }
    listaTarefasConcluidas.push(tarefa);
    console.log(listaTarefasFazer);
    console.log(listaTarefasConcluidas);
}   