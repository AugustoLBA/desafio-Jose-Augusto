class CaixaDaLanchonete {

    //Metodo que valida os itens extras
    validaExtra(itens) {
        let produtos = [];
        for (let i = 0; i < itens.length; i++) {
            let [nomeItem] = itens[i].split(','); // Pega apenas o nome do item
            produtos.push(nomeItem.trim()); // Adiciona o nome do item ao array produtos
        }
        if (
            (produtos.includes("chantily") && !produtos.includes("cafe")) ||
            (produtos.includes("queijo") && !produtos.includes("sanduiche"))
        ) {
            return "Item extra não pode ser pedido sem o principal";
        }
        return null;

    }
    //Metodo que valida o item
    validarItem(itens) {
        let produtos = ["cafe", "chantily", "suco", "sanduiche", "queijo", "salgado", "combo1", "combo2"];

        for (let item of itens) {

            let [nomeItem, quantidade] = item.split(',');
            quantidade = parseInt(quantidade, 10);

            if (nomeItem === null) {
                return "Item inválido!";
            }

            else if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            else if (!produtos.includes(nomeItem)) {
                return "Item inválido!";
            }
        }

        return null;
    }
    //Metodo que converte para real
    transformaParaReal(valor) {
        let stringBR
        stringBR = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        return stringBR
    }
    //Metodo que calcula o valor sem desconto ou acrécimo
    calcularValorTotal(itens) {
        let produtos = [["cafe", 3.00], ["chantily", 1.50], ["suco", 6.20], ["sanduiche", 6.50], ["queijo", 2.00], ["salgado", 7.25], ["combo1", 9.50], ["combo2", 7.50]];

        let valorTotal = 0;

        for (let item of itens) {
            let [nomeItem, quantidade] = item.split(',');
            let itemEncontrado = produtos.find(item => item[0] === nomeItem);

            if (itemEncontrado) {
                valorTotal += itemEncontrado[1] * quantidade;
            }
        }
        return valorTotal;
    }

    //Metodo que valida o carrinho
    validarCarrinho(itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }
        return null;
    }

    //Metodo fachada que chama os metodos de validação
    fachadaMetodosDeValidacao(itens) {

        let validacaoCarrinho = this.validarCarrinho(itens);
        if (validacaoCarrinho !== null) {
            return validacaoCarrinho;
        }

        let validacaoItensExtra = this.validaExtra(itens);
        if (validacaoItensExtra !== null) {
            return validacaoItensExtra;
        }

        let validacaoItens = this.validarItem(itens);
        if (validacaoItens !== null) {
            return validacaoItens;
        }
        return null;

    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        let validacao = this.fachadaMetodosDeValidacao(itens);
        if (validacao !== null) {
            return validacao;
        }

        let valorTotal = this.calcularValorTotal(itens);
        let valorFinal;
        
        // Verifica se o pagamento está correto e calcula o valor da compra
        if (metodoDePagamento === "dinheiro") {
            let desconto = 0.05;
            desconto = valorTotal * desconto;
            valorTotal -= desconto;
            valorFinal = this.transformaParaReal(valorTotal);
            return valorFinal;
        }
        else if (metodoDePagamento === "debito") {
            valorFinal = this.transformaParaReal(valorTotal);
            return valorFinal;
        }
        else if (metodoDePagamento === "credito") {
            let acrecimo = 0.03;
            acrecimo = valorTotal * acrecimo;
            valorTotal += acrecimo;
            if (valorTotal > 20.00) {
                valorTotal = valorTotal - 0.01;
            }
            valorFinal = this.transformaParaReal(valorTotal);
            return valorFinal;
        }
        else {
            return "Forma de pagamento inválida!";
        }

    }

}

export { CaixaDaLanchonete };