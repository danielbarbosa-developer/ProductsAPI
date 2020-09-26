class TimeControl{

    toMiliSeconds = (minutes) =>{
        return minutes*60*1000;// converte minutos em milisegundos
    }
    
    timmer(sameProduct, minutes){
        // sameProduct é um array de todos os produtos semelhantes à requisição
        const filterTime = sameProduct.map((times)=>{
            return times.time;
        });// mapeando apenas os tempos das requisições anteriores
    
        const timmer = filterTime.filter(time => time > Date.now() - this.toMiliSeconds(minutes))
        
        if(timmer*1 !== 0){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = TimeControl;
