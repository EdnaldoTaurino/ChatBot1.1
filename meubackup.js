//const uma variavel no js, esta dizendo que a variavel cons vai usar o client buttons localauth do whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require ('qrcode-terminal'); //Variavel que cria o qrcode para autenticação do whatsapp web


//criando o cliente e deixando salva pra logar apenas uma vez
const client = new Client({  // criando uma autenticação para que autorize apenas uma vez e fica salvo o whatsapp 
    authStrategy: new LocalAuth()
});

// depois de tempos o programa buga e nao inicia ate que se escluxa por completo a pasta .wwebjs_auth assim volta ao normal
// criar um comando que apague essa pasta apos nao inciar em talvez 1 minuto para assim solicitar qrcode novamente.

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })  //função que gera o qrcode na tela
});

//quando deu certo conetou 

client.on('ready', () => {
   console.log('Tudo certo estamos conectados...');
});

// var clientes = []; // Criando uma variavel clientes para salvar os clientes

// var cliente = {numero: '889797987987', senha: '123456', saldo: 0};  //cada cliente separado

//quando receber uma mensagem
//msg, mostra toda mensagem numero da pessoa e conteúdo. msg.body mostra apenas o corpo da mensagem


let welcomeSent = false; // Variável de controle
let pedidoCliente = ''; // Variável para armazenar o pedido do cliente
let aguardandoPedido = false;
let endereco = '';
let aguardandoEndereco = false;

function enviarBoasVindas(to) {
    client.sendMessage(to, 'Olá, seja bem-vindo 😀! Eu sou o Edybô, o assistente virtual do restaurante Cozinha De Casa. Vou te ajudar com as opções: Digite 1 para Menu 🥘😋\nDigite 9 para falar com um Atendente humano (EMOJI HUMANO)');
    welcomeSent = true; // Marcamos que o cumprimento foi enviado, e não irá enviar novamente
}

// function mensagemTempo(to, mensagem) {
//     setTimeout(() => {
//         client.sendMessage(to, mensagem);
//     }, 2000); // Atraso de 1 segundo (1000 milissegundos)
// }

client.on('message', msg => {
    if (!welcomeSent) {
        if (msg.body.toLowerCase() === 'oi' || msg.body.toLowerCase() === 'ola' || msg.body.toLowerCase() === 'olá') {
            enviarBoasVindas(msg.from); // Chamamos a função para enviar a mensagem de boas-vindas
        }

    } else {
        if (msg.body === '1') {
            client.sendMessage(msg.from, 'Certo, te enviarei o Menu do dia!\nA qualquer momento digite 0 para voltar para o menu inicial\n*Digite 2 para iniciar o seu pedido!* (EMOJI PRATO)');

        } else if (msg.body === '2') {
            // Iniciando o pedido
            client.sendMessage(msg.from, 'Certo, vamos iniciar seu pedido (EMOJI FELIZ)!\nAgora escreva todo o seu pedido e, ao finalizar, digite 0 (zero).\nExemplo:\n\nFeijão preto\nArroz branco\nBife acebolado\nGuisadinho de carne\nVinagrete\nSalada\n\nDesta forma acima. Pronto, pode escrever seu pedido que estou anotando:');
            aguardandoPedido = true;

        // } else if (msg.body === '9'){
        //     // Enviar uma mensagem para o seu telefone pessoal
        //     const seuNumeroPessoal = '+5581996629070';
        //     const mensagem = 'Cliente deseja atendimento.';
        //     client.sendMessage(seuNumeroPessoal, mensagem);
        
        } else if (msg.body.toLocaleLowerCase() === 'alterar') {
            client.sendMessage(msg.from, '*VAMOS ALTERAR SEU PEDIDO AGORA*');
            pedidoCliente = ''; // Limpa o pedido atual antes de aguardar o novo pedido
            aguardandoPedido = true; // Definindo como true para aguardar o novo pedido
            client.sendMessage(msg.from, 'Certo, vamos iniciar novamente seu pedido (EMOJI FELIZ)!\nAgora escreva todo o seu pedido e, ao finalizar, digite 0 (zero).\nExemplo:\n\nFeijão preto\nArroz branco\nBife acebolado\nGuisadinho de carne\nVinagrete\nSalada\n\nDesta forma acima. Pronto, pode escrever seu pedido que estou anotando:');
        
        } else if (aguardandoPedido) {
            // Aqui o bot está aguardando o pedido do cliente
            if (msg.body === '0') {
                // Cliente finalizou o pedido
                aguardandoPedido = false;
                client.sendMessage(msg.from, `Seu pedido foi registrado:\n\n ${pedidoCliente}\n\nCaso tenha *ERRADO* e deseje alterar seu pedido digite: *Alterar*\nCaso esteja tudo certo por favor digite 5 para *continuar*`);
            } else if (aguardandoEndereco) {
                if (msg.body === '5') {
                    // Cliente finalizou o pedido de endereço
                    aguardandoEndereco = false;
                    pedidoCliente += `\nEndereço: ${endereco}\n`;
                    client.sendMessage(msg.from, `Seu endereço é ${endereco}`);
                } else {
                    endereco += msg.body + '\n'; // Adiciona a mensagem ao endereço
                }
            } else {
                // O bot pode fazer o processamento do pedido aqui, se necessário.
                // Neste exemplo, apenas adicionaremos ao pedidoCliente.
                pedidoCliente += msg.body + '\n'; // Adiciona a mensagem ao pedidoCliente
            }
        }
        else if (msg.body === '9') {
            client.sendMessage(msg.from, 'Ok! Só um instante que um Atendente humano vai falar com você.');
        } else {
            // Resposta para entrada inválida
            msg.reply('Desculpe, não entendi sua resposta. Por favor, escolha uma das opções do menu:\nDigite 1 para *Menu* 🥘😋\nDigite 9 para falar com um Atendente humano (EMOJI HUMANO)');
        }
    }
});





// Enviamos uma resposta para solicitar o endereço do cliente
                // client.sendMessage(msg.from,'Digite seu CEP');
                // Solicitar endereço:
            //////////////////////////////////////////////////////////////////client.sendMessage(msg.from, 'Por favor agora digite seu endereço completo com nome da rua e numero exemplo:\n *Rua fulano numero: 0*');
          
    // bugs corrigir: apos o eviareio menu do dia digitar 0 não esta voltando para o menu inicial ele esta dizendo "Você ainda não digitou o seu pedido. Para cancelar, digite 0 novamente"
    // adicionar welcomeSent = false; ao final quando digitar encerrar o atendimento para na proxima vez o bot falar bem vindo de novo
    // Adicionar quando digitar 9 falar com humano o bot fazer uma chamada ou tocar no celualar um aviso para olhar o celular 
    //adicionar imprimir pedido quando cliente finalizar pedido
    // adicionar quando cliente escrever qualquer coisa aguardar e só finalizar o pedido quando ele digitar 0 pegar tudo que foi digitado e printar na tela.

 
 

// client.on('message', message => {
// 	if(message.body === '!ping') {
// 		message.reply('pong'); // message.reply o bot seleciona a msg e responde ou pong ou o que desejar escrever
// 	}
// });

client.initialize(); //para funcionar por fim esse código