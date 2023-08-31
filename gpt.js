// ... (código anterior)

} else if (aguardandoPedido) {
    // Aqui o bot está aguardando o pedido do cliente
    if (msg.body === '0') {
        // Cliente finalizou o pedido
        aguardandoPedido = false;
        client.sendMessage(msg.from, `Seu pedido foi registrado:\n\n${pedidoCliente}\n\nCaso tenha *ERRADO* e deseje alterar seu pedido digite: *Alterar*\nCaso esteja tudo certo por favor digite 1 para *continuar*`);
        mensagemTempo(msg.from, 'Agora envie seu endereço.');

    } else if (aguardandoEndereco) {
        // Aqui o bot está aguardando o endereço do cliente
        if (msg.body === '0') {
            // Cliente cancelou a digitação do endereço
            aguardandoEndereco = false;
            pedidoCliente = ''; // Limpa o pedido após finalizar (se desejar, você pode remover esta linha se não quiser limpar o pedido)
            client.sendMessage(msg.from, 'Você cancelou o envio do endereço. Caso queira fazer um novo pedido, digite 2.');

        } else {
            // Cliente enviou o endereço
            endereco += msg.body + '\n'; // Adiciona a mensagem ao endereço
            // Aqui você pode fazer o processamento adicional com o endereço, se necessário
            // ...
            // Por fim, caso queira finalizar o pedido após o endereço ser informado, pode adicionar a linha abaixo.
            // pedidoCliente = ''; // Limpa o pedido após finalizar
            aguardandoEndereco = false;
            client.sendMessage(msg.from, 'Endereço registrado. Obrigado por fazer seu pedido. Caso queira fazer um novo pedido, digite 2.');
        }

    } else {
        // O bot pode fazer o processamento do pedido aqui, se necessário.
        // Neste exemplo, apenas adicionaremos ao pedidoCliente.
        pedidoCliente += msg.body + '\n'; // Adiciona a mensagem ao pedidoCliente
    }
}
// Restante do código ...
