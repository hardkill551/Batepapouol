let person;
let mensagem = document.querySelector("ul");
let mensagemAnterior = [];
let elementoqueaparece;

function reload(){
    alert("Você não está mais logado");
    window.location.reload();
}

function enviarMensagens(){
    const EnvioDaMensagem = {
        from: person.name,
        to: "Todos",
        text: document.querySelector("input").value,
        type: "message"
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", EnvioDaMensagem);
    promise.then(coletarMensagens);
    promise.catch(reload);
    document.querySelector("input").value = "";
}

function mostrarMensagens(resposta){
    let deletandoMensagens = document.querySelector("ul");
    while (deletandoMensagens.firstChild) {
    deletandoMensagens.removeChild(deletandoMensagens.firstChild);
    }
    for (let i =0;i<resposta.data.length;i++){
    if (resposta.data[i].type == "status"){
        mensagem.innerHTML += `<li class="status" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> ${(resposta.data[i].text)}</li>`;
    }
    if (resposta.data[i].type == "message"){
        mensagem.innerHTML += `<li class="message" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`;
    }
    if (resposta.data[i].type == "private_message"){
        if (person.name == resposta.data[i].from || person.name == resposta.data[i].to){
        mensagem.innerHTML += `<li class="private_message" data-test="message"><span>${(resposta.data[i].time)} </span><em>${(resposta.data[i].from)}</em> reservadamente para <em>${(resposta.data[i].to)}: </em>${(resposta.data[i].text)}</li>`;
        }
    }
    }
    if (mensagemAnterior[0] !== resposta.data[99].time || mensagemAnterior[1] !== resposta.data[99].from || mensagemAnterior[2] !== resposta.data[99].text){
        elementoqueaparece = document.querySelector('ul li:last-child');
        elementoqueaparece.scrollIntoView();
        mensagemAnterior[0]=resposta.data[99].time;
        mensagemAnterior[1]=resposta.data[99].from;
        mensagemAnterior[2]=resposta.data[99].text;
    }
}

function coletarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(mostrarMensagens);
}

function manterConexão(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", person);
}

function entrou(resposta){
    if (resposta.status === 200){
    coletarMensagens();
    let y = setInterval(coletarMensagens, 3000);
    let x = setInterval(manterConexão, 5000);
}
}
function naoEntrou(resposta){
    if (resposta.response.status === 400){
    alert("Nome de usuário já existe, escolha outro");
    location.reload()
}
}

function entrarNaSala(){
    const member = prompt("Qual seu nome?");
    person = {name: member};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", person);
        promise.then(entrou);
        promise.catch(naoEntrou);
}

entrarNaSala();