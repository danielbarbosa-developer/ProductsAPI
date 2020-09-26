class TimeControl{

    toMiliSeconds = (minutes) =>{
        return minutes*60*1000;// converte minutos em milisegundos
    }
    
    timmer(sameProduct, minutes){
        const filterTime = sameProduct.map((times)=>{
            return times.time;
        });// filtrando os tempos das requisições anteriores
    
        const timmer = filterTime.filter(time => time > Date.now() - this.toMiliSeconds(minutes) )
        console.log(timmer);
        var test = timmer * 1;
        console.log(test)
        if(timmer*1 !== 0){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = TimeControl;
