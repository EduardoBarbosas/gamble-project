const prompt = require('prompt-sync')();


const ROWS = 3;//just remember all caps when spell the man's name.
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOL_VALUE = { //multiplica pelo valor da linha. ex.: se eu conseguir uma linha de "a" a aposta será multiplicada por 5.
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}



const deposito = () => {
    while (true){
        const qtdDeposito = prompt("Insira a quantidade a ser depositada:");
        const numeroQtdDeposit = parseFloat(qtdDeposito)
        
        if (isNaN(numeroQtdDeposit) || numeroQtdDeposit <= 0) {
            console.log("Quantidade invalida, por favor insira uma quantidade valida.");
        } else {
            return numeroQtdDeposit;
        }
    }
};

const getNmrDeLinhas = () =>{
    while (true){
        const linhas = prompt("Insira a quantidade de linhas em que você quer apostar(1-3):");
        const numeroDeLinhas = parseFloat(linhas)
        
        if (isNaN(numeroDeLinhas) || numeroDeLinhas <= 0 || numeroDeLinhas > 3)  {
            console.log("Invalido insira uma quantidade de linhas.");
        } else {
            return numeroDeLinhas ;
        }
    }
};

const getAposta = (saldo, linhas) =>{
        while (true){
            const aposta = prompt("Insira a quantidade que gostaria de apostar:");
            const numeroDaAposta = parseFloat(aposta)
            
            if (isNaN(numeroDaAposta) || numeroDaAposta <= 0 || numeroDaAposta > (saldo / linhas))  {
                console.log("Invalido, insira uma quantidade valida.");
            } else {
                return numeroDaAposta ;
            }
        }
};

const spin = () => {
  const symbols = []; 
 for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
    for (let i = 0; i < count; i++){
        symbols.push(symbol);
    }
 }

 const reels =[];
 for(let i = 0; i < COLS; i++){
    reels.push([]);
    const reelSymbols = [...symbols];
   for (let j = 0; j < ROWS; j++){
     const randomIndex = Math.floor(Math.random()* reelSymbols.length);
     const selectedSymbol = reelSymbols[randomIndex];
     reels[i].push(selectedSymbol);
     reelSymbols.splice(randomIndex, 1);
    }
 } 

 return reels;

};

const transpose = (reels) =>{
    const rows = []
    
   for(let i = 0; i < ROWS; i++) {
    rows.push([]);
    for(let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i])  
    }
 }


   return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
     let rowString = "";
     for (const [i, symbol] of row.entries()) {
          rowString += symbol
          if (i != row.length - 1){
          rowString += " | " 
        }
    }  
     console.log(rowString);
  }
};

const getGanhos = (rows, aposta, linhas) => {
    let ganhos = 0;

    for (let row = 0; row < linhas; row++){
        const symbols = rows[row];
        let allSame = true;


       for (const symbol of symbols){
        if (symbol != symbols[0]) {
            allSame = false;
            break;
        }
        if (allSame){
            ganhos += aposta * SYMBOL_VALUE[symbols[0]]
        }
     }

    }

    return ganhos

}

const game = ( ) => {
let saldo = deposito();

while(true){  
    console.log ("Você tem um saldo de $" + saldo);
    const numeroDeLinhas = getNmrDeLinhas();
     const aposta = getAposta(saldo, numeroDeLinhas);
     saldo -= aposta * numeroDeLinhas;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const ganhos = getGanhos(rows, aposta, numeroDeLinhas)
    saldo += ganhos;
    console.log("Voce ganhou $" + ganhos.toString())
    
   if (saldo <= 0) {
    console.log("Você está sem saldo!") 
    break;
   }

   const jogarDnv = prompt("Você deseja jogar novamente? (S/N)").toUpperCase();

   if (jogarDnv != "S") break;
 }  
};


game();
