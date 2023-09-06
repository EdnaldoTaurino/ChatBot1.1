client.on('message', msg => {
    if (!welcomeSent) {
        if (msg.body.toLowerCase() === 'oi' || msg.body.toLowerCase() === 'ola' || msg.body.toLowerCase() === 'olá') {
            enviarBoasVindas(msg.from); // Chamamos a função para enviar a mensagem de boas-vindas
        }

    } else {
        if (msg.body === '1') {
            client.sendMessage(msg.from, 'Certo, te enviarei o Menu do dia!\nA qualquer momento digite 0 para voltar para o menu inicial\n*Digite 2 para iniciar o seu pedido!* 🥘');
            client.sendMessage(msg.from, 'Menu do dia:\n\nFeijão preto\nFeijão carioca\nArroz branco\nArrroz carioca\n carnes');
        } else if (msg.body === '2') {
            // Iniciando o pedido
            client.sendMessage(msg.from, 'Certo, vamos iniciar seu pedido (EMOJI FELIZ)!\nAgora escreva todo o seu pedido e, ao finalizar, digite 0 (zero).\nExemplo:\n\nFeijão preto\nArroz branco\nBife acebolado\nGuisadinho de carne\nVinagrete\nSalada\n\nDesta forma acima. Pronto, pode escrever seu pedido que estou anotando:');
            aguardandoPedido = true;
        
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