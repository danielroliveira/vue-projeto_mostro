new Vue({
    el: '#app',
    data: {
        listavisivel: false,
        pontuacaoMonstro: 100,
        pontuacaoJogador: 100,
        listaAcoes: [],
        jogadorVenceu: false,
        monstroVenceu: false
    },
    methods: {
        desistir(){
            this.listaAcoes = []
            this.pontuacaoJogador = 100,
            this.pontuacaoMonstro = 100,
            this.monstroVenceu = false,
            this.jogadorVenceu = false
        },
        ataque(){
            // ataque do monstro
            let ataqueMonstro = Math.random() * 10 * 1.5
            ataqueMonstro = ataqueMonstro.toFixed(0)

            // ataque do jogador
            let ataqueJogador = Math.random() * 10
            ataqueJogador = ataqueJogador.toFixed(0)

            if (ataqueJogador == 0) ataqueJogador = 1
            
            // recebeataque
            this.EfetuaMovimento(ataqueMonstro, ataqueJogador)
        },
        ataqueEspecial(){
            // ataque do monstro
            let ataqueMonstro = Math.random() * 10 * 1.2
            ataqueMonstro = ataqueMonstro.toFixed(0)

            // ataque do jogador
            let ataqueJogador = Math.random() * 10 * 1.4
            ataqueJogador = ataqueJogador.toFixed(0)

            if (ataqueJogador == 0) ataqueJogador = 1
            
            // recebeataque
            this.EfetuaMovimento(ataqueMonstro, ataqueJogador)
        },
        curar(){
            // ataque do monstro
            let curaJogador = Math.random() * 10 * (-1.5)
            curaJogador = curaJogador.toFixed(0)

            // ataque do monstro
            let ataqueMonstro =  Math.random() * 10
            ataqueMonstro = ataqueMonstro.toFixed(0)

            // recebeataque
            this.EfetuaMovimento(ataqueMonstro, curaJogador)

        },
        EfetuaMovimento(ataqueMonstro, ataqueJogador){

            if (this.pontuacaoJogador - ataqueMonstro <= 0) {
                this.monstroVenceu = true
                this.pontuacaoJogador = 0
            }
            else if (this.pontuacaoMonstro - ataqueJogador <= 0) {
                this.jogadorVenceu = true
                this.pontuacaoMonstro = 0
            }
            else {
                // ATAQUE: ataqueMonstro > 0 && ataqueJogador > 0
                // CURA  : ataqueMonstro > 0 && ataqueJogador < 0
                
                // listagem
                this.listaAcoes.unshift({ monstro: ataqueMonstro, jogador: ataqueJogador })

                // verifica pontuacao maior que 100
                if (this.pontuacaoJogador - ataqueMonstro > 100) {
                    ataqueMonstro = 100 - this.pontuacaoJogador
                }

                //recebe ataque mesmo na cura
                this.pontuacaoJogador -= ataqueMonstro

                if(ataqueJogador >= 0) {
                    // ataque
                    this.pontuacaoMonstro -= ataqueJogador
                } else if (ataqueJogador < 0) {
                    // verifica pontuacao maior que 100
                    if (this.pontuacaoJogador - ataqueJogador > 100) {
                        ataqueJogador = 100 - this.pontuacaoJogador
                    }
                    // cura
                    this.pontuacaoJogador -= ataqueJogador
                }

            }
        }
    },
    computed: {
        ControlaProgressoJogador(){
            if (this.pontuacaoJogador >= 20)
                return 'width : ' + this.pontuacaoJogador + '%; background-color : green';
            else
                return 'width : ' + this.pontuacaoJogador + '%; background-color : darkred';

        },
        ControlaProgressoMonstro(){
            if (this.pontuacaoMonstro >= 20)
                return 'width : ' + this.pontuacaoMonstro + '%; background-color : green';
            else
			    return 'width : ' + this.pontuacaoMonstro + '%; background-color : darkred';
        }
    }
});