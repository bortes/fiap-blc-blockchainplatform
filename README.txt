# fiap-blc-blockchainplatform

Repositório destino ao projeto para criação de um blockchain.

A última versão pode ser encontra aqui [https://github.com/bortes/fiap-blc-blockchainplatform](https://github.com/bortes/fiap-blc-blockchainplatform).

Assim como uma versão on-line aqui [https://bcfiap.z19.web.core.windows.net/#/blocos](https://bcfiap.z19.web.core.windows.net/#/blocos).

## requisitos

Itens da avaliação.

### blocos

A aplicação foi planejada para ter quando blocos deseja-se, porém está restrita em 5. Apenas para fins da avaliação.

O fechamento do bloco pode ser observado [aqui](./src/app/services/bloco.service.ts).

### transacoes

As transação são construídas em uma tela a parte para que haja uma melhor apresentação do desáfios abaixos: taxa do minerador e transação com ou sem troco definido.

Para cada transação geramos uma hash da mesma para uso posterior no fechamento do bloco.

Esta regra pode ser observada [aqui](./src/app/services/bloco.transacoes.ts).

### hash SHA256

O cálculo do SHA-256 pode ser observado [aqui](./src/app/services/bloco.service.ts) e [aqui](./src/app/services/bloco.transacoes.ts).

### poW e Nonce- "botão" para mineração

A prova-de-trabalho assim como a geração do nonce, como resultado do trabalho executado, são executado via interface quando acionada ação `minerar`.

Ambas as regras podem ser observadas [aqui](./src/app/services/bloco.service.ts).

### dificuldade da rede 1000 (ou seja, blocos começando com 000)

A dificultade respeito a regra definida e foi estabelecida em `1000`.

Pode-se observa ela [aqui](./src/app/services/bloco.service.ts).

### fee

_Aplicamos juntos ao conceita da **taxa do minerador**_

### troco

A regra do troco segue o mesmo modelo da taxa do minerador e pode ser observada [aqui](./src//app/pages/transacoes/transacoes.component.html).

### possibilidade de alterar as transações e ver as consequências

A aplicação preve alteração apenas no `nonce` e nas `transação fechadas em um bloco`.

Ela pode ser observada [aqui](./src//app/pages/blocos/blocos.component.html).

### pelo menos 5 blocos

Foi respeitada a quantidade mínima esperada de blocos. Esta regra pode ser observada [aqui](./src/app/services/bloco.service.ts).

### deve ter taxa de minerador

Na aplicação, a taxa do minerador foi implementada no momento em que uma transação é criada.

Ela pode ser observada [aqui](./src//app/pages/transacoes/transacoes.component.html).

### deve mostrar o que acontece se não for definido para onde vai o troco

Esta regra foi pontuada no momento da construção da transação e pode ser observada [aqui](./src//app/pages/transacoes/transacoes.component.html).

