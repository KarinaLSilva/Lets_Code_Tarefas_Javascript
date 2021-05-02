//Declaração de elementos
const divVisualizacao = document.getElementById('visualizacao');
const selectTipoBusca = document.getElementById('tipoBusca');
const inputBusca = document.getElementById('inputBusca');
const btnSalvar = document.getElementById('btnSalvar');
const inputNomeDescricao = document.getElementById('nomeDescricao');
const inputValorConta = document.getElementById('valorConta');
const selectTipoConta = document.getElementById('tipoConta');
const selectCategoria = document.getElementById('categoria');

//Declaração de variáveis
const contas = [];
let proximoId = 1;



//ADICIONAR CONTA
const adicionaConta = () => {
    const conta = {
        id: proximoId,
        nomeDescricao: inputNomeDescricao.value,
        valorConta: selectTipoConta.value === 'Receita' ? parseFloat(inputValorConta.value) : -parseFloat(inputValorConta.value),
        tipoConta:selectTipoConta.value,
        categoria:selectCategoria.value
    };

    contas.push(conta);
    proximoId++;
    atualizaListaContas();
    limpaCampos();
}

//  Editar Campo
const editarConta = (id) => {
    const contaIndice = contas.findIndex(buscaPorId(id));
    if (contaIndice > -1){
        contas[contaIndice] = {
            id,
            nomeDescricao: inputNomeDescricao.value,
            valorConta: selectTipoConta.value === 'Receita' ? parseFloat(inputValorConta.value) : -parseFloat(inputValorConta.value),
            tipoConta:selectTipoConta.value,
            categoria:selectCategoria.value
        }
    }
    limpaCampos();
    atualizaListaContas();
    btnSalvar.onclick = adicionaConta;
} 

btnSalvar.onclick = adicionaConta;

const carregaDadosContas = (id) => {
    const conta = contas.find(buscaPorId(id));
    
        inputNomeDescricao.value = conta.nomeDescricao,
        inputValorConta.value = conta.valorConta,
        selectTipoConta.value = conta.tipoConta,
        selectCategoria.value = conta.categoria
  
    btnSalvar.onclick = () => editarConta(id);
}

//ATUALIZAR LISTA DE CONTA
const atualizaListaContas = (listaContasFiltrada) => {
    let cards = '';
    const listaContas = listaContasFiltrada && listaContasFiltrada.length > 0
    ? listaContasFiltrada : contas;

    for (conta of listaContas){
        cards += `
        <div class="card">
        <div class="descricao-card">
          <p>Descrição: <b>${conta.nomeDescricao}</b></p>
          <p>Valor: <b>R$${conta.valorConta}
          </b></p>
          <p>Tipo de Conta: <b>${conta.tipoConta}</b></p>
          <p>Categoria: <b>${conta.categoria}</b></p>
        </div>
        <div class="acoes">
          <span class="material-icons acao" onclick="removeContas(${conta.id})"> delete </span>
        </div>
        <div class="acoes">
          <span class="material-icons acao" onclick="carregaDadosContas(${conta.id})"> edit </span>
        </div>
      </div>
        `
    }
    divVisualizacao.innerHTML = cards;
    atualizaIndicadores();
}


//REMOVE ALUNO
const removeContas = (id) => {
    const contaIndex = contas.findIndex((conta) => conta.id === id);
    contas.splice(contaIndex, 1);
    atualizaListaContas();
}

//LIMPAR CAMPOS
const limpaCampos = () => {
        inputNomeDescricao.value = '',
        inputValorConta.value = '',
        selectTipoConta.value = '',
        selectCategoria.value = ''
    }

//FUNÇÕES DE BUSCA
const buscaPorId = id => conta => conta.id === id;
const buscaPorDescricao = descricao => conta => conta.nomeDescricao.toUpperCase().search(descricao.toUpperCase()) > -1;
const buscaPorTipo = tipo => conta => conta.tipoConta.toUpperCase().search(tipo.toUpperCase()) > -1;
const buscaPorCategoria = categoria => conta => conta.categoria.toUpperCase().search(categoria.toUpperCase()) > -1;


const busca =  (event) => {
    const valor = event.target.value;
    const listaContasFiltrada = contas.filter(
       selectTipoBusca.value === 'descricoes' ? 
       buscaPorDescricao(valor) :
       selectTipoBusca.value === 'tiposdeconta' ?
       buscaPorTipo(valor) :
       selectTipoBusca.value === 'categorias' ?
       buscaPorCategoria(valor):
       buscaPorId(parseInt(valor))
    );
    atualizaListaContas(listaContasFiltrada);
}

inputBusca.addEventListener('keyup', busca);

//INDICADORES

const atualizaIndicadores = () => {
    const h3TotalReceitas = document.getElementById('totalReceitas');
    const h3TotalDespesas = document.getElementById('totalDespesas');
    const h3MediaReceitas = document.getElementById('mediaReceitas')
    const h3MediaDespesas = document.getElementById('mediaDespesas');

    const saldoTotal = document.getElementById('saldoTotal');
    const totalReceitas = totalTipoConta('Receita');
    const totalDespesas = totalTipoConta('Despesa');

    saldoTotal.innerText = `Saldo total: ${totalReceitas + totalDespesas}`
    h3TotalReceitas.innerText = `Total de Receitas: ${totalReceitas}`
    h3TotalDespesas.innerText = `Total de Despesas: ${totalDespesas}`
    h3MediaReceitas.innerText = `Média de Receitas: ${mediaReceitaDespesa('Receita')}`
    h3MediaDespesas.innerText = `Média de Despesas: ${mediaReceitaDespesa('Despesa')}`
  
}


const mediaReceitaDespesa = (tipoConta) => {
    const porTipoConta = contas.filter((conta) => conta.tipoConta === tipoConta)
    let somaTotalTipoConta = 0;
    for (conta of porTipoConta){
        somaTotalTipoConta += conta.valorConta;
    }
    if(porTipoConta.length > 0){
        return somaTotalTipoConta / porTipoConta.length;
    }return 0;
}


const totalTipoConta = (tipoConta) => {
    const porTipoConta = contas.filter((conta) => conta.tipoConta === tipoConta)
    let somaTotalTipoConta = 0;
    for (conta of porTipoConta){
        somaTotalTipoConta += conta.valorConta;
    }
    return somaTotalTipoConta;
}


