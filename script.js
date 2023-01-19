let person;
let mensagem = document.querySelector("ul");
let mensagemAnterior;
let elementoqueaparece;

function mostrarMensagens(resposta){
    const resposta1 = resposta.data[99].time
    if(mensagemAnterior!=resposta1){
        if (resposta.data[99].type == "status"){
            mensagem.innerHTML += `<li class="status"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> ${(resposta.data[99].text)}</li>`
        }
        if (resposta.data[99].type == "message"){
            mensagem.innerHTML += `<li class="message"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> para <em>${(resposta.data[99].to)}: </em>${(resposta.data[99].text)}</li>`
        }
        if (resposta.data[99].type == "private_message"){
            if (person.name == resposta.data[99].from || person.name == resposta.data[99].to){
            mensagem.innerHTML += `<li class="private_message"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> reservadamente para <em>${(resposta.data[99].to)}: </em>${(resposta.data[99].text)}</li>`
            }
        }
        mensagemAnterior = resposta1
        elementoqueaparece = document.querySelector('ul li:last-child');
        elementoqueaparece.scrollIntoView();
    }
}
function coletarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(mostrarMensagens)
}

function manterConexão(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", person)
}

function entrou(){
    alert("Entrou")
    coletarMensagens()
    let y = setInterval(coletarMensagens, 3000)
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