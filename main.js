let canvas = document.querySelector("canvas");
let ctx = canvas.getContext('2d');

let maze = [
    [0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
    [3,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1],
    [0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0],
    [0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0],
    [0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0],
    [0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,1,1,0,3,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0],
    [0,0,-1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0],
    [0,0,0,3,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0],
    [0,3,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1],
    [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1],
    [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0],
    [1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,3,0,1,0,1,0,1,1],
    [0,0,0,1,0,0,0,1,0,1,0,0,0,3,1,1,0,1,0,1,0,1,0],
    [0,1,0,1,1,1,0,1,0,1,0,3,0,0,0,1,0,1,1,1,0,1,0],
    [0,1,0,0,0,0,0,0,0,1,0,0,1,3,0,1,0,0,0,0,0,1,0],
    [0,1,1,1,1,1,1,1,1,1,3,0,1,0,0,1,1,1,0,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,1,0,0,0,1,0,0,0]
];

let y = 0;
let x = 0;
let tileSize = 35; //Bare istedet for at skrive 100 alle steder - Fordi vi arbejder med 100 hele tiden (vores game er nemlig 1000x1000)
let player = -1;

//Sounds
//Baggrundsmusik
//Jeg kan ikke få min baggrundsmusik til at virke....
function backgroundmusic() {
    var audio = new Audio ('sounds/backgroundmusic.mp3');
    audio.play();
}

//Bevægelseslyd
function beepsound() {
    var audio = new Audio ('sounds/beepsound.mp3');
    audio.play();
}

//BOMBElyd
function bombsound() {
    var audio = new Audio ('sounds/bombsound.mp3');
    audio.play();
}

//KLAPPElyd
function applausesound() {
    var audio = new Audio ('sounds/applausesound.mp3');
    audio.play();
}

//VÆGlyd
function wallsound() {
    var audio = new Audio ('sounds/wallsound.mp3');
    audio.play();
}


//Generel countdown til at klare spillet
(function countdown(remaining) {
    if(remaining === 0)
        location.reload(true);
    document.querySelector('#countdown').innerHTML = remaining;
    setTimeout(function(){ countdown(remaining - 1); }, 1000);
})(30);


function grid() {

    for(y = 0; y < maze.length; y++) {
        //Det yderste loop kaster ét tal af sted
        for(x = 0; x < maze[y].length; x++) {
            //Denne ovenstående refererer til første loops længde
            //Det inderste loop kaster 3 tal afsted

            //Her bygges vores spil op
            /*
            Hvis 0 så laves hvid tile (der hvor man kan bevæge sig)
            Hvis 1 så laves orange tile (vægge i spillet)
            Hvis 2 så laves purple tile (mål)
            Hvis -1 så laves deeppink (spiller)
            Hvis 3 så laves rød tile (bomber)
            */
            if(maze[y][x] == 0){
                ctx.fillStyle = "white";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (maze[y][x] == 1) {
                ctx.fillStyle = "orange";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (maze[y][x] == 2) {
                ctx.fillStyle = "purple";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if(maze[y][x] == -1){
                player = {y,x};
                console.log(player.y + " " + player.x);
                ctx.fillStyle = "deeppink";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else if (maze[y][x] == 3) {
                ctx.fillStyle = "red";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

            }
            //Bare log
            console.log("y er = " + y + " og x er = " + x);
        }
    }

}

//Callback function (vi har tjekket hvad keyCode er inde i f12)
window.addEventListener('keydown', function(event) {
    console.log(event.keyCode);

    //Her er vores switch som ud fra hvilken case der sker, kører vores if (else if) osv.
    //Det er sat op til at kigge på vores keyCode som vi fandt tidligere at f.eks venstre er 37.
    /*
    1. if vi rykker player f.eks -1 (det vil sige en til venstre da det er på x-aksen) og derefter sætter den nye position til 0
    2. else if hvis vi rammer en 3'er så kører vi bombsound og i en timeout reloader(så bombelyd kan nå at spilles) (død)
    3. else if hvis vi rammer en 2'er så vinder vi og kører applausesound og i en timeout sender til ekstern side
    4. vores generelle else er wallsound, altså når vi rammer en væg. For vi kan jo ikke ramme andre muligheder efter de andre
    */
    switch (event.keyCode) {
        case 37:
            //alert("venstre")
            if(maze[player.y][player.x-1] == 0){
                maze[player.y][player.x-1] = -1;
                maze[player.y][player.x] = 0; 
                beepsound();

            } else if (maze[player.y][player.x-1] == 3){
                bombsound();
                setTimeout (function() {
                    location.reload()
                },800);
                //alert("DU DØDE DIN IDIOT");

            } else if (maze[player.y][player.x-1] == 2){
                applausesound();
                setTimeout (function() {
                    window.location.href = "https://erdetfredag.dk/"
                },2500);
                //alert("DU VANDT");

            } else {
                wallsound();
            } grid();  
            break;

        case 38:
            //alert("op")
            if(maze[player.y-1][player.x] == 0){
                 maze[player.y-1][player.x] = -1;
                 maze[player.y][player.x] = 0; 
                 beepsound();

            } else if (maze[player.y-1][player.x] == 3){
                bombsound();
                setTimeout (function() {
                    location.reload()
                },800);
                //alert("DU DØDE DIN IDIOT");

            } else if (maze[player.y-1][player.x] == 2){
                applausesound();
                setTimeout (function() {
                    window.location.href = "https://erdetfredag.dk/"
                },2500);
            //alert("DU VANDT");
            } else {
                wallsound();
            }grid(); 
            break;

        case 39:
            //alert("højre")
            if(maze[player.y][player.x+1] == 0){
                maze[player.y][player.x+1] = -1;
                maze[player.y][player.x] = 0;
                beepsound();

            } else if (maze[player.y][player.x+1] == 3){
                bombsound();
                setTimeout (function() {
                    location.reload()
                },800);
                //alert("DU DØDE DIN IDIOT");

            } else if (maze[player.y][player.x+1] == 2){
                applausesound();
                setTimeout (function() {
                    window.location.href = "https://erdetfredag.dk/"
                },2500);
            //alert("DU VANDT");
            } else {
                wallsound();
            }grid();
            break;

        case 40:
            //alert("ned")
            if(maze[player.y+1][player.x] == 0){
                maze[player.y+1][player.x] = -1;
                maze[player.y][player.x] = 0;
                beepsound();

            } else if (maze[player.y+1][player.x] == 3){
                bombsound();
                setTimeout (function() {
                    location.reload()
                },800);
                //alert("DU DØDE DIN IDIOT");

            } else if (maze[player.y+1][player.x] == 2){
                applausesound();
                setTimeout (function() {
                    window.location.href = "https://erdetfredag.dk/"
                },2500);
                //alert("DU VANDT");
            } else {
                wallsound();
            }grid();
             break;
    
        default:
            break;
    }
})

grid();







//Hele lortet er udkommenteret, blot så vi kunne lege
/* 
//Definerer array
let arrayCanvas = [0, 1, 0, -1, 2, 0, 0, 0, 0, 1]


// 1. vi definerer hvilket tal loopet starter på (altså vores 0)
// 2. definerer hvornår loopet skal stoppe (når i er større eller lig med 3)(fordi vi siger jo MINDRE end 3 i vores loop)
// 3. autoincrement

for(let i = 0; i<arrayCanvas.length ;i++) {
    
    //Denne consolelog er blot for at tjekke et bestemt sted i mit array
    console.log(arrayCanvas[3]);
    //Blot console log
    console.log("I er lig med = " + i);

    if(arrayCanvas[i] == 0){
        ctx.fillStyle = "red";
        ctx.fillRect(i*50,0,50,50);

    }else if(arrayCanvas[i] == 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(i*50,0,50,50);

    }else if(arrayCanvas[i] == -1) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(i*50,0,50,50);
    } else {
        ctx.fillStyle = "deeppink";
        ctx.fillRect(i*50,0,50,50);
    }
} 
*/











