/*Erdő Széle*/ 
function erdoSzele(){
    let points = 0;
   
    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){

            if (gameTable[i][l] == field.forest && (countGivenNeighboors("outOfTable",i,l) > 0) ){
                points++;
            }
        }
    }
    return points;
}

/* Álmos völgy */
function almosVolgy(){
    let points = 0;
    let forest = 0;
    for(let i = 0; i < 11; i++){
        forest = 0;
        for(let l = 0; l < 11; l++){
            
            if (gameTable[i][l] == field.forest){
                forest++;
            }
        }

        if (forest == 3){
            points += 4;
        }
    }
    return points;
}

function krumpliont(){
    
    let points = 0;
    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){
            
            if ( gameTable[i][l] == field.farm){
                points += 2 * countGivenNeighboors(field.water,i,l);
            }
        }
    }
    return points;
}

/* Határvidék */
function hatarvidek(){
    let points = 0;
    let sor = 0;
    let oszlop = 0;

    for(let i = 0; i < 11; i++){
        sor = 0;
        oszlop = 0;
        for(let l = 0; l < 11; l++){
            
            if ( gameTable[i][l] != field.basic){
                sor ++;
            }

            if ( gameTable[l][i] != field.basic){
                oszlop ++;
            }
        }
        if ( sor == 11){
            points += 6;
        }

        if ( oszlop == 11){
            points += 6;
        }
    }
    return points;
}

/* extra kuldik*/ 
/*Fasor*/ 
function fasor(){  /*  faoszlop  amúgy ...*/ 

    let forestCounter = 0;
    let forestMaxColumn = 0;
    let lastfield = field.basic;

    for(let i = 0; i < 11; i++){

        
        forestCounter = 0;
        lastfield = field.basic;

        for(let l = 0; l < 11; l++){
            
            if (gameTable[l][i] == field.forest && lastfield == field.forest ){
                forestCounter++;
            }
            else{
                forestCounter = 0;
            }

            if (forestCounter > forestMaxColumn){
                forestMaxColumn = forestCounter;
            }
            lastfield = gameTable[l][i];
        }
    }
    const points = (forestMaxColumn == 0 ? 0 : (forestMaxColumn+1)*2); // csak a második egybefüggő mezőtől kezdjük számolni az erdőket
    return points; 
}

/*Gazdag Város*/ 
function gazdagVaros(){

    let points = 0;

    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){
            if ( gameTable[i][l] == field.town){

                if (countDifferentNeighboors(i,l) >= 3){
                    points +=3 ;
                }
            }
        }
    }
    return points;
}


/* Öntözőcsatorna */
function ontozoCsatorna(){

    let watersInCulumn = 0;
    let farmsInCulumn = 0;
    let points = 0;
    for(let i = 0; i < 11; i++){
        watersInCulumn = 0;
        farmsInCulumn = 0;
        
        for(let l = 0; l < 11; l++){
        
            if(gameTable[l][i] == field.water){
                watersInCulumn++;
            }

            if(gameTable[l][i] == field.farm){
                farmsInCulumn++;
            }
            
        }
        
        if (watersInCulumn != 0 && watersInCulumn ==farmsInCulumn){
            points += 4;
        }
    }

    return points;
}

/*Mágusok Völgye*/ 
function magusokVolgye(){
    let points = 0;
    let watersNextToMountins = 0;

    mountins.forEach( mountin =>
         watersNextToMountins += countGivenNeighboors(field.water,mountin.cordA,mountin.cordB));

    points = watersNextToMountins * 3;
    return points;
}

/*Üres Telek*/
function uresTelek(){
    let points = 0;

    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){
            if ( gameTable[i][l] == field.basic){
                points += (countGivenNeighboors(field.town,i,l) == 0 ? 0 : 2);
            }
        }
    }
    
    return points;
} 

/*Sorház*/
function sorHaz(){

    let townCounter = 0;
    let townMaxRow = 0;
    let lastfield = field.basic;

    for(let i = 0; i < 11; i++){

        townCounter = 0;
        lastfield = field.basic;
        for(let l = 0; l < 11; l++){
            
            if (gameTable[i][l] == field.town && lastfield == field.town ){
                townCounter++;
            }
            else{
                townCounter = 0;
            }

            if (townCounter > townMaxRow){
                townMaxRow = townCounter;
            }
            lastfield = gameTable[i][l];
        }
    }
    const points = (townMaxRow == 0 ? 0 : (townMaxRow+1)*2); // csak a második egybefüggő mezőtől kezdjük számolni az erdőket
    return points; 

} 

/*Páratlan Silók */
function paratlanSilok(){
    
    let points = 0;
    let column = [];

    for ( let i = 0; i < 11 ; i++){
        column = [];
        for ( let l = 0; l < 11 ; l++){
            column.push(gameTable[l][i]);
            
        }

        if (isFull(column) && (i % 2) == 0 ){ /*páros tele sor*/
            points += 10;
        }
    }

    return points;
}
function isFull(array){
    return (!array.includes(field.basic));
}

/*Gazdag vidék*/
function gazdagVidek(){

    let points = 0;
    let row = [];

    for ( let i = 0; i < 11 ; i++){
        row = [];
        for ( let l = 0; l < 11 ; l++){
            row.push(gameTable[i][l]);
            
        }
        
        if ( countDifferentFieldsOf(row) > 4){ /*páros tele sor*/
            points += 4;
        }
    }

    return points;
}
function countDifferentFieldsOf(array){

    differentFields = []; /*ide gyüjtük a különböző mezőket egy sorba*/
    array.forEach( element =>
         (!differentFields.includes(element) && element!=field.basic) ? differentFields.push(element) : null )
    
    return differentFields.length;
}

/*hegyek teljes bekeritese*/

function mountinsAllCover(){
    
    let coveredMountins = 0;

    for (let i = 0; i < 5; i++){
        const emptyFields =  countGivenNeighboors(field.basic,mountins[i].cordA-1,mountins[i].cordB-1); 
        if (  emptyFields  == 0 ){ 
            coveredMountins++;
        }
    }

    console.log(coveredMountins);
    return (coveredMountins == 5);  
}


/*segedfv-ek*/
function countDifferentNeighboors(cordA,cordB){
    let differentNeighboors = 0;

    if ( countGivenNeighboors(field.town,cordA,cordB) > 0){
        differentNeighboors ++;
    }
    if ( countGivenNeighboors(field.forest,cordA,cordB) > 0){
        differentNeighboors ++;
    }
    if ( countGivenNeighboors(field.mountain,cordA,cordB) > 0){
        differentNeighboors ++;
    }
    if ( countGivenNeighboors(field.farm,cordA,cordB) > 0 ){
        differentNeighboors ++;
    }
    if ( countGivenNeighboors(field.water,cordA,cordB) > 0){
        differentNeighboors ++;
    }

    return differentNeighboors;
}

function countGivenNeighboors(fieldToCount,cordA,cordB){ 
    let neighboorsCounter = 0;

    neighboorsCounter +=  (fieldToCount === getLeftField(cordA,cordB) ? 1 : 0);
    neighboorsCounter +=  (fieldToCount === getTopField(cordA,cordB) ? 1 : 0);
    neighboorsCounter +=  (fieldToCount === getRightField(cordA,cordB) ? 1 : 0);
    neighboorsCounter +=  (fieldToCount === getBottomField(cordA,cordB) ? 1 : 0);

    return neighboorsCounter;
}
function getLeftField(cordA,cordB){
    if (!validIndex(cordA,cordB-1)) {return "outOfTable";} 
    return gameTable[cordA][cordB-1];
}
function getTopField(cordA,cordB){
    if (!validIndex(cordA-1,cordB)) {return "outOfTable";} 
    return gameTable[cordA-1][cordB];
}
function getRightField(cordA,cordB){
    if (!validIndex(cordA,cordB+1)) {return "outOfTable";} 
    return gameTable[cordA][cordB+1];
}
function getBottomField(cordA,cordB){
    if (!validIndex(cordA+1,cordB)) {return "outOfTable";} 
    return gameTable[cordA+1][cordB];
}