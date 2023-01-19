let person;
let mensagem = document.querySelector("ul");
let mensagemAnterior;
let elementoqueaparece;
let x = 0

function reload(){
    alert("Você não está mais logado")
    window.location.reload()
}
function enviarMensagens(){
    const EnvioDaMensagem = {
        from: person.name,
        to: "Todos",
        text: document.querySelector("input").value,
        type: "message"
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", EnvioDaMensagem);
    promise.then(coletarMensagens);
    promise.catch(reload);
    document.querySelector("input").value = ""
}

function mostrarPrimeirasMensagens(resposta){
    if(x!==1){
    for (let i =0;i<resposta.data.length-1;i++){
    if (resposta.data[i].type == "status"){
        mensagem.innerHTML += `<li class="status" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> ${(resposta.data[i].text)}</li>`
    }
    if (resposta.data[i].type == "message"){
        mensagem.innerHTML += `<li class="message" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`
    }
    if (resposta.data[i].type == "private_message"){
        if (person.name == resposta.data[i].from || person.name == resposta.data[i].to){
        mensagem.innerHTML += `<li class="private_message" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> reservadamente para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`
        }
    }
    }
    x=1
}
}

function mostrarMensagens(resposta){
    const resposta1 = resposta.data[99].time
    if(mensagemAnterior!=resposta1){
        if (resposta.data[99].type == "status"){
            mensagem.innerHTML += `<li data-test="message" class="status"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> ${(resposta.data[99].text)}</li>`
        }
        if (resposta.data[99].type == "message"){
            mensagem.innerHTML += `<li data-test="message" class="message"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> para <em>${(resposta.data[99].to)}: </em>${(resposta.data[99].text)}</li>`
        }
        if (resposta.data[99].type == "private_message"){
            if (person.name == resposta.data[99].from || person.name == resposta.data[99].to){
            mensagem.innerHTML += `<li data-test="message" class="private_message"><span>${(resposta.data[99].time)} </span><em>${(resposta.data[99].from)}</em> reservadamente para <em>${(resposta.data[99].to)}: </em>${(resposta.data[99].text)}</li>`
            }
        }
        mensagemAnterior = resposta1
        elementoqueaparece = document.querySelector('ul li:last-child');
        elementoqueaparece.scrollIntoView();
    }
}
function coletarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(mostrarPrimeirasMensagens)
}

function coletarMensagensACada3Segundos(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(mostrarMensagens)
}
function manterConexão(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", person)
}

function entrou(){
    coletarMensagens()
    let x = setInterval(manterConexão, 5000)
    let y = setInterval(coletarMensagensACada3Segundos, 3000)
}
function naoEntrou(){
    alert("Nome de usuário já existe, escolha outro")
    conferirParticipantes()
}

function entrarNaSala(resposta){
    for (let i=0;i<resposta.data-1;i++){
        if (resposta.data[i]==person){
            naoEntrou()
        }
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", person)
        promise.then(entrou)
        promise.catch(naoEntrou)
}

function conferirParticipantes(){
    const member = prompt("Qual seu nome?")
    person = {name: member}
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promise.then(entrarNaSala)
    promise.catch(naoEntrou)
}

conferirParticipantes()