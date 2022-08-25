const criarPessoaElement = (item) => {
    // conectar no elemento template
    const template = document.getElementById('pessoa-template')
  
    // clonar template
    const PessoaElement = document.importNode(template.content, true)
  
    // preencher os dados
    const itens_pessoas = PessoaElement.querySelectorAll('span')
  
    itens_pessoas[0].innerText = item.nome
    itens_pessoas[1].innerText = item.senha
    itens_pessoas[2].innerText = item.email
    
  
    return PessoaElement
  }
  
  const carregarPessoas = async () => {
  
    // Comunicacao com a API
    const response = await fetch('http://localhost:3007/signup')
    const dados = await response.json()
    console.log(dados)
  
  
    dados.forEach(item => {
      const containerPessoasEle = document.getElementById('Container-Pessoas')
  
      const PessoasElement = criarPessoaElement(item)
  
      
      containerPessoasEle.append(PessoasElement)
  
    })  
  
  }
  
  const novoUser = async () => {
    const pessoaNomeElement = document.getElementById('pessoa-nome')
    const pessoaSenhaElement = document.getElementById('pessoa-senha')
    const pessoaEmailElement = document.getElementById('pessoa-email')
    
  
    const person = {
      nome: pessoaNomeElement.value,
      senha: pessoaSenhaElement.value,
      genero: pessoaEmailElement.value
      
    }
  
    const init = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(person)
    }
  
    // Chamar POST na API
    const response = await fetch('http://localhost:3007/signup', init)
    console.log(response)
    const dados = await response.json()
  
    // Adicionar novo filme à listagem
    const containerPessoaElement = document.getElementById('Container-Pessoas')
  
    const pessoaElement = criarPessoaElement(dados)
  
    
    containerPessoaElement.prepend(pessoaElement)
  }
  
  
  window.onload = () => {
    carregarPessoas()
  
    const btnNovouser = document.getElementById('btnAddPessoa')
  
    btnNovouser.onclick = novoUser
  
    console.log('Iniciado')
  }