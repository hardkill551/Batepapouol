let person;
let mensagem = document.querySelector("ul");



function mostrarmensagens(resposta){
    console.log(resposta)
    console.log(resposta.data)
    console.log(resposta.data[0].type)
    console.log(resposta.data.length)
    for (let i = 0; i < resposta.data.length; i++){
    if (resposta.data[i].type == "status"){
    mensagem.innerHTML += `<li class="status"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> ${(resposta.data[i].text)}</li>`
    }
    if (resposta.data[i].type == "message"){
        mensagem.innerHTML += `<li class="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`
    }
    if (resposta.data[i].type == "private_message"){
        mensagem.innerHTML += `<li class="private_message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> reservadamente para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`
    }
    }
}

function coletarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(mostrarmensagens)
}

function manterConexão(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", person)
}

function entrou(){
    alert("Entrou")
    coletarMensagens()
    let x = setInterval(manterConexão, 5000)
}
function naoEntrou(){
    alert("Nome de usuário já existe, escolha outro")
    entrarNaSala()
}

function entrarNaSala(){
    const member = prompt("Qual seu nome?")
    person = {name: member}
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", person)
    promise.then(entrou(person))
    promise.catch(naoEntrou)
}

entrarNaSala()