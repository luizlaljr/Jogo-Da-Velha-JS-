const jogodavelha = {

    board : ['','','','','','','','',''],
    symbol : {
        options: [
            ['X',0],
            ['O',0]
        ],
        turn_index: 0,

        change: function (){
            this.turn_index = (this.turn_index === 0 ? 1 : 0)
        }
    },
    container_element : null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ],
    player_X_point: 0,
    player_O_point: 0,
    result: document.getElementById('result'),

    init: function (container) {
        container_element = container
        for (const i in this.symbol.options) {            
            this.symbol.options[i][1]=0;
        }
    },

    make_play: function (position) {
        if(this.gameover) return false
        if(this.board[position] === ''){
            this.board[position] = this.symbol.options[this.symbol.turn_index][0]
            this.draw()
            let game_is_over = this.game_is_over(this.symbol.options[this.symbol.turn_index])
            if(game_is_over){                
                this.gameover = true
            } else {
                this.symbol.change()
            }
            
        } else{
            return false
        }
    },

    game_is_over: function (symbol){
        if(this.check_winning_sequences(symbol))
            return true;
        if(this.check_end_game())
            return true;
        return false;
    },

    check_winning_sequences: function (symbol){
        for (i in this.winning_sequences)
            if (this.board[this.winning_sequences[i][0]] == symbol[0] &&
                this.board[this.winning_sequences[i][1]] == symbol[0] &&
                this.board[this.winning_sequences[i][2]] == symbol[0]){                    
                    this.print_result('Vencedor Jogador ' + symbol[0]) 
                    const winner = 'jogador'+symbol[0]                   
                    document.getElementById(winner).innerHTML = ++symbol[1]
                    this.highlight_winning_sequence(i);                   
                    return true
            }
        return false
    },

    check_end_game: function (){
        for (i in this.board)
            if(this.board[i] === '')
                return false
        this.print_result('Deu Velha!')
        return true                
    },

    start: function (){
        this.board.fill('')
        this.gameover = false
        this.print_result('')
        this.draw()
    },

    print_result: function (text){
        result.innerHTML = text
    },
    
    draw: function () {
        let content = ''

        for (i in this.board) {
            content += '<div class="align-middle" onclick="jogodavelha.make_play(' + i + ')" id="winPos' + i + '">' + this.board[i] + '</div>'   
        }

        container_element.innerHTML = content
    },

    highlight_winning_sequence: function(sequence_id) {
        for (i in this.winning_sequences[sequence_id]) {
            this.highlight_item(this.winning_sequences[sequence_id][i]);
        }
    },

    highlight_item: function(item_id) {
        document.querySelector('#winPos'+item_id).classList.add('winningPosition');
    },

};

