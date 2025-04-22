/*selectors*/ 
const divGame = document.querySelector("#table");
const previewTable = document.querySelector("#previewTable");
const mirorringButton = document.querySelector("#reflects");
const rotateButton = document.querySelector("#rotate");
const timerBox = document.querySelector("#time h2")
const yearTime = document.querySelector("#yearTime");
const monthTime = document.querySelector("#monthTime");
const divMissionA = document.querySelector("#missionA");
const divMissionB = document.querySelector("#missionB");
const divMissionC = document.querySelector("#missionC");
const divMissionD = document.querySelector("#missionD");
const springPoints = document.querySelector("#tavasz .pont") ;
const summerPoints = document.querySelector("#nyar .pont");
const autumnPoints = document.querySelector("#osz .pont");
const winterPoints = document.querySelector("#tel .pont");
const divAllPoints = document.querySelector("#allPoints");
const divGameOver = document.querySelector("#gameOver");
const divendGamePoints = document.querySelector("#endGamePoints");
const divCurrentSeason = document.querySelector("#divCurrentSeason");
const buttonExitGame = document.querySelector("#exit");
const divRules = document.querySelector("#rules");
const buttonRules = document.querySelector("#rulesButton")

/*eventlisseners*/ 
rotateButton.addEventListener("click",rotation);
document.addEventListener("keydown",rotation);
mirorringButton.addEventListener("click",mirroring);
document.addEventListener("keydown",mirroring);
buttonExitGame.addEventListener("click",exitGame);
buttonRules.addEventListener("click",openRules);

divGame.addEventListener("mouseover",handleTdHover);
divGame.addEventListener("click",setElement)


/*variables*/ 
const rekord = 98; 

let currentElem;
let gameTable = [];
let hoverTable = [];
let bitHoverTable = [];
let gameOver = false;
let timeLeft = 28;
let timeElapsed = 0;
let allPoints = 0;
let currentSeason;
let springPast = 0
let summerPast = 0; 
let autumnPast = 0;
let winterPast = 0;

let chosedMissions =  [0,0,0,0];
missionGenerator();
const missionA = missions[ chosedMissions[0]-1 ];
const missionB = missions[ chosedMissions[1]-1 ];
const missionC = missions[ chosedMissions[2]-1 ];
const missionD = missions[ chosedMissions[3]-1 ];


init();

/* functions */ 
function init(){
    divRules.style.display = "none";

    let rand = Math.floor(Math.random()*16);
    currentElem = elements[rand];
    currentSeason = season.spring;

    for (let i = 0; i<11; i++) {
        const row1 = (new Array(11)).fill(field.basic);
        const row2 = (new Array(11)).fill(field.basic);
        const row3 = (new Array(11)).fill(0);
        gameTable.push(row1);
        hoverTable.push(row2);
        bitHoverTable.push(row3);
    }

    mountins.forEach( mountin => gameTable[mountin.cordA-1][mountin.cordB-1] = field.mountain); 
    hoverTable = JSON.parse(JSON.stringify(gameTable));
    
    missionRender();
    gameTableRender();
    previewRender();
}

function gameTableRender(){
    let table = "";
    table += `<table>`;
    for (let i = 0; i<11; i++) {
        table += `<tr>`;
        for (let k = 0; k<11; k++) {
            table += `<td style="background-image: url('${hoverTable[i][k]}'), url('${gameTable[i][k]}') "></td>`
        }
        table += `</tr>`;
    }
    table += `</table>`;
    divGame.innerHTML  = table;

}

function currentImg(){

    let background = "";
    switch(currentElem.type) {
        case "water":
            background = field.water;
            break;
        case "farm":
            background = field.farm;
            break;
        case "town":
            background = field.town;
            break;
        case "forest":
            background = field.forest;
            break;
        default:
            return "error";
    }
    return background;
}

function previewRender(){
    
    timerBox.innerHTML = currentElem.time;

    table = "<table>";
    for(let i = 0; i < 3; i++){
        table += "<tr>";
        for(let k = 0; k < 3; k++){

            if( currentElem.shape[i][k] == 0 ){
                table += "<td> </td>";
            }
            else{
                table += `<td style="background-image: url('${currentImg()}') "></td>`;
            }
        }
        table += "</tr>";
    }
    table += "</table>";

    previewTable.innerHTML = table;
    

}

function rotation(e){

    if( e.key == "r" || e.target.matches("div")){
        
        currentElem.rotation = (currentElem.rotation + 1) % 4;
    
        let temp = JSON.parse(JSON.stringify(currentElem.shape));

    
        for(let i = 0; i < 3; i++){
            for(let k = 0; k < 3; k++){
                temp[3-k-1][i] = currentElem.shape[i][k];
            }
        }
        currentElem.shape = temp;
        previewRender();

        /* ezt még szépteni akarom*/
        if (JSON.stringify(gameTable) != JSON.stringify(hoverTable)){ /* Ha van hover a pályán akkor tudod csak forgatni azt */
            hoverTableRender();

        }
    }    

}

function mirroring(e){

    if( e.key == "e" || e.target.matches("div")){
        const firstRow = currentElem.shape[0];
        const thirdRow = currentElem.shape[2];

        currentElem.shape[0] = thirdRow;
        currentElem.shape[2] = firstRow;
        
        if (currentElem.mirrored){
            currentElem.mirrored = false;
        }
        else{
            currentElem.mirrored = true;
        }
        previewRender();

        /* ezt még szépteni akarom*/
        if (JSON.stringify(gameTable) != JSON.stringify(hoverTable)){ 
            hoverTableRender();
        }
    } 
}

function nextElement(){

    rand = Math.floor(Math.random()*16);
    currentElem = elements[rand];

    if(timeLeft - currentElem.time < 0){ /*ha a következő elem lerakásával a játék idő minuszba csordulna a játéknak vége */ 
        gameOver = true;
    }
}

let lastEl = [-1,-1]; /* utolsó koordináta ahol a kurzor volt a táblán*/

function hoverTableRender(){

    cordA = lastEl[0];
    cordB = lastEl[1];

    for(let m = -1; m <= 1; m++){
        for(let n = -1; n <= 1; n++){
            if ( !validIndex(cordA+m,cordB+n) && (currentElem.shape[m+1][n+1] == 1 ) ){ //ha az alagzat kilog a játéktérből ne rajzoljuk ki

                hoverTable = JSON.parse(JSON.stringify(gameTable));
                gameTableRender();
                return ;
            }
        }
    }
    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){

            if( Math.abs(cordA - i) < 2 && Math.abs(cordB - l ) < 2){  // benne van-e a kis négyzetbe mert akkor lehet át kell szinezni
                
                if ( currentElem.shape[i-cordA+1][l-cordB+ 1] == 1){ //rajzoljuk ki ha kell 
                    hoverTable[i][l] = currentImg();
                    bitHoverTable[i][l] = 1;
                }
                else{
                    hoverTable[i][l] = gameTable[i][l];
                    bitHoverTable[i][l] = 0;
                }
            }
            else{
                hoverTable[i][l] = gameTable[i][l];
                bitHoverTable[i][l] = 0;
            }
            
        }
    }
    gameTableRender();
}

function handleTdHover(e){

    if( !e.target.matches("td") || gameOver){
        return;
    }

    const td = e.target;
    const cordA = getPosition(td.parentNode)-1;
    const cordB = getPosition(td)-1;
    
    /*NE RENDELJE ÚJRA HA UGYANAZON A TD-N VAN A KURZOR*/
    if ((lastEl[0] == cordA) && (lastEl[1] == cordB)){
        return;
    }

    lastEl = [cordA,cordB];
    hoverTableRender();
}

function setElement(e){
    if (!e.target.matches("td") || gameOver){
        return ;
    }

    if (JSON.stringify(gameTable) == JSON.stringify(hoverTable)){ /* Ha nincs hover a pályán akkor nyilván nem tudunk elemet letenni */
        return;
    }

    for(let i = 0; i < 11; i++){
        for(let l = 0; l < 11; l++){
            if ( (bitHoverTable[i][l] == 1) && (gameTable[i][l] != field.basic)){
                /*console.log("debug "+ i + " "+ l);*/
                return;
            }    
        }
    }
    
    gameTable = JSON.parse(JSON.stringify(hoverTable));

    missionRender(); /*beirja a pontokat a kuldikhez*/ 
    timeAndPointsHandling(); 
    nextElement();  /* nem lehet a timeHandling előtt mert változtatja az időt és nyilván a previewRender előtt kell lennie*/

    missionRender();  /* ha változott az évszak akkor a zöld karikák is átkerülnel*/
    previewRender(); 
    gameTableRender();

    endGameHandling();
};

function missionMultiply(){
    
    const initialValue = 1;
    const multiplyWithInitial = chosedMissions.reduce(
        (accumulator, currentValue) => accumulator * currentValue,
        initialValue,
        );

    return multiplyWithInitial;
}

function missionGenerator(){
    
    let i = 0;
    while( missionMultiply() == 0 ){

        let rand = Math.floor(Math.random()* 12 );

        if ( !chosedMissions.includes(rand) ){
            chosedMissions[i] = rand;
            i++;    
        }

    }
}

function missionRender(){

    missions[0].points = erdoSzele();
    missions[1].points = almosVolgy();
    missions[2].points = krumpliont();
    missions[3].points = hatarvidek();
    missions[4].points = fasor();
    missions[5].points = gazdagVaros();
    missions[6].points = ontozoCsatorna();
    missions[7].points = magusokVolgye();
    missions[8].points = uresTelek();
    missions[9].points = sorHaz();
    missions[10].points = paratlanSilok();
    missions[11].points = gazdagVidek();
    
    const circleIMGhtml = '<img class="gCircle" src="images/circle.png"></img>';

    divMissionA.innerHTML = `
    <img class="missionImg" src=${missionA.img} >
    <h3 id="title">${missionA.title}</h3> 
    <p id="description">${missionA.description}</p>
    <p id="points">(pontok: ${missionA.points}  )<p>
    ${circleIMGhtml}
    <h2>A<h2>
     `
    divMissionB.innerHTML = `
    <img class="missionImg" src=${missionB.img}>
    <h3 id="title">${missionB.title}</h3>
    <p id="description">${missionB.description}</p>
    <p id="points">(pontok: ${missionB.points}  )<p>
    ${circleIMGhtml}
    <h2>B<h2>
    `
    divMissionC.innerHTML = `
    <img class="missionImg" src=${missionC.img}>
    <h3 id="title">${missionC.title}</h3>
    <p id="description">${missionC.description}</p>
    <p id="points">(pontok: ${missionC.points} )<p>
    ${circleIMGhtml}
    <h2>C<h2>
    `
    divMissionD.innerHTML = `
    <img class="missionImg" src=${missionD.img}>
    <h3 id="title">${missionD.title}</h3>
    <p id="description">${missionD.description}</p>
    <p id="points">(pontok: ${missionD.points}  )<p>
    ${circleIMGhtml}
    <h2>D<h2>
    `

    const circleImgA = document.querySelector("#missionA .gCircle");
    const circleImgB = document.querySelector("#missionB .gCircle");
    const circleImgC = document.querySelector("#missionC .gCircle");
    const circleImgD = document.querySelector("#missionD .gCircle");


    if (currentSeason == season.spring){
        circleImgC.setAttribute('hidden','');
        circleImgD.setAttribute('hidden','');
    }
    else if(currentSeason == season.summer){
        circleImgD.setAttribute('hidden','');
        circleImgA.setAttribute('hidden','');
    }
    else if(currentSeason == season.autumn){
        circleImgA.setAttribute('hidden','');
        circleImgB.setAttribute('hidden','');
    }
    else if(currentSeason == season.winter){
        circleImgB.setAttribute('hidden','');
        circleImgC.setAttribute('hidden','');
    }
}



/* IDOKEZELÉS */
function timeAndPointsHandling(){
    
    timeElapsed += currentElem.time;
    timeLeft = 28 - timeElapsed;
    switch(Math.floor((timeLeft - 1) / 7) ) {
        case 3:
          currentSeason = season.spring;
          break;
        case 2:
            currentSeason = season.summer;
            springPast ++;
            if ( springPast == 1 ){
                springPoints.innerHTML = `${missionA.points + missionB.points} pont`;
                allPoints = missionA.points + missionB.points;
            }
          break;
        case 1:
            currentSeason = season.autumn;
            summerPast ++;
            if ( summerPast == 1 ){
                summerPoints.innerHTML = `${missionB.points +missionC.points} pont`;
                allPoints += missionB.points +missionC.points;
            }
          break;
        case 0:
            currentSeason = season.winter;
            autumnPast ++;
            if ( autumnPast == 1 ){
                autumnPoints.innerHTML = `${missionC.points +missionD.points} pont`;
                allPoints += missionC.points +missionD.points;
            }
          break;
        case -1:
            currentSeason = season.winter; /* endgame-be van lekezelve */
          break;
        default:
          return "error!!!";
    }
    
    divCurrentSeason.innerHTML = `Jelenlegi évszak: ${currentSeason.short}`;
    divAllPoints.innerHTML = `Öszzesen: ${allPoints} pont`;
    yearTime.innerHTML = `Évből hátralévő idő: ${timeLeft}/28`;  /*<br>` +  ` Eltelt idő: ${timeElapsed}`;*/
    monthTime.innerHTML = currentSeason.long + " " + (((timeLeft-1) % 7)+1) +"/7";
    
}

function endGameHandling(){
    if (!gameOver){
        return;
    }

    winterPoints.innerHTML = `${missionD.points +missionA.points} pont`; 
    allPoints += missionD.points +missionA.points;  /* tél pontjait hozáadjuk az összeshez */
    divAllPoints.innerHTML = `Öszzesen: ${allPoints} pont`;

    if(5 >= allPoints && allPoints > -1){

        divendGamePoints.innerHTML = `${endGameText.disaster} ${allPoints} pontot szereztél.`;
    }
    else if ( 20 >= allPoints &&  allPoints > 5){
        divendGamePoints.innerHTML = `${endGameText.bad} ${allPoints} pontot szereztél.`;
    }
    else if (40 >= allPoints && allPoints >20){
        divendGamePoints.innerHTML = `${endGameText.medium} ${allPoints} pontot szereztél.`;
    }
    else if (55 >= allPoints &&  allPoints > 40){
        divendGamePoints.innerHTML = `${endGameText.good} ${allPoints} pontot szereztél.`;
    }
    else if (rekord >= allPoints && allPoints > 55){
        divendGamePoints.innerHTML = `${endGameText.excellent} ${allPoints} pontot szereztél.`;
    }
    else if (allPoints > rekord){
        divendGamePoints.innerHTML = `${endGameText.rekorder} ${allPoints} pontot szereztél.`;
    }
   
    divGameOver.removeAttribute('hidden','');
    divGameOver.setAttribute('unhidden','');


}

function exitGame(){
    if (gameOver){ return;}
    gameOver = true;
    endGameHandling();
}

function openRules(){

    if (divRules.style.display === "none") {
        divRules.style.display = "block";
    } else {
        divRules.style.display = "none";
    }

}


/*fontosabb segédfv.ek*/
function getPosition(element) {
    const parent = element.parentNode;
    const children = Array.from(parent.children);
  
    return children.indexOf(element) + 1;
}

function validIndex(a,b){
    if(a >= 0 && a <= 10 && b >= 0 && b <= 10){
        return true;
    }
    return false;
} 
