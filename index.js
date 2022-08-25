let b = [];
b[0] = document.getElementById("box0")
b[1] = document.getElementById("box1")
b[2] = document.getElementById("box2")
b[3] = document.getElementById("box3")
b[4] = document.getElementById("box4")
b[5] = document.getElementById("box5")
b[6] = document.getElementById("box6")
b[7] = document.getElementById("box7")
b[8] = document.getElementById("box8")
b[9] = document.getElementById("box9")
b[10] = document.getElementById("box10")
b[11] = document.getElementById("box11")
b[12] = document.getElementById("box12")
b[13] = document.getElementById("box13")
b[14] = document.getElementById("box14")
b[15] = document.getElementById("box15")
const scorebox=document.getElementById("score");
const bestbox=document.getElementById("best");
let score=0;
let bestscore =localStorage.getItem("best");
// bestscore.innerText="Best "+ bestscore;
if (localStorage.getItem("best") === null) {
    updatelocalstorage();
}
else{
    bestbox.innerText="BEST  "+ bestscore; 
}
let active = [];
let hidden = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let rightbox = [3, 7, 11, 15]
let leftbox = [0, 4, 8, 12]
let j, i;
let enter = 1;
let exit=1;
let movedown=0;
let moveup=0;
let moveright=0;
let moveleft=0;


const messageDisplay=document.getElementById("display");
const displaybox=document.getElementById("message")

for (let i = 0; i < 16; i++) {
    b[i].style.visibility = "hidden"
}

function colour() {
    for (i = 0; i < 16; i++) {
        if (b[i].innerText == "2") {
            b[i].style.backgroundColor = "#F18089";
            b[i].style.color = "#953F48";
        }
        else if (b[i].innerText == "4") {
            b[i].style.backgroundColor = "#EC9772";
            b[i].style.color = "#7F5131";
        }
        else if (b[i].innerText == "8") {
            b[i].style.backgroundColor = "#F4B56A";
            b[i].style.color = "#875A2C";
        }
        else if (b[i].innerText == "16") {
            b[i].style.backgroundColor = "#F5C55A";
            b[i].style.color = "#7D642D";
        }
        else if (b[i].innerText == "32") {
            b[i].style.backgroundColor = "#BBCE84";
            b[i].style.color = "#5C6F22";
        }
        else if (b[i].innerText == "64") {
            b[i].style.backgroundColor = "#A3C85E";
            b[i].style.color = "#48690E";
        }
        else if (b[i].innerText == "128") {
            b[i].style.backgroundColor = "#7AC76B";
            b[i].style.color = "#FFFFFF";
        }
        else if (b[i].innerText == "256") {
            b[i].style.backgroundColor = "#77CCC6";
            b[i].style.color = "#FFFDFF";
        }
        else if (b[i].innerText == "512") {
            b[i].style.backgroundColor = "#77AECB";
            b[i].style.color = "#FFFFFF";
        }
        else if (b[i].innerText == "1024") {
            b[i].style.backgroundColor = "#8284EC";
            b[i].style.color = "#FFFFFF";
        }
        else if (b[i].innerText == "2048") {
            b[i].style.backgroundColor = "#EF57A8";
            b[i].style.color = "#FFFFFF";
        }
        else {
            b[i].style.backgroundColor = "#EF57A8";
            b[i].style.color = "#FFFFFF";
        }
        
        if (parseInt(b[i].innerText)>=1024){
            b[i].style.fontSize="40px";
        }
        if (parseInt(b[i].innerText)>=4048){
            b[i].style.fontSize="35px";
        }
    }
}

function checkwin(){
    for (i = 0; i < 16; i++) {
        if(b[i].innerText=="2048"){
            displaybox.style.visibility="visible"
            messageDisplay.innerText="You WIN !";
        }   
    }
    if (hidden.length===0 && (movedown==0 && moveup==0 && moveright==0 && moveleft==0)){
        displaybox.style.visibility="visible"
        messageDisplay.innerText="You lose. Press CTRL + R to play again "
    }
}

function randombox() {
    rnum = Math.floor(Math.random() * 16);
    if (active.includes(rnum)) {
        randombox();
    }
    else {
        b[rnum].className += " new ";
        b[rnum].innerText = "2";
        b[rnum].style.visibility = "visible";
        active.push(rnum);
        console.log(active);
        var myIndex = hidden.indexOf(rnum);
        if (myIndex !== -1) {
            hidden.splice(myIndex, 1);
        }
        console.log(hidden);

    }
    exit=1;
}

randombox();
randombox();
colour();

document.addEventListener("keydown", function (e) {

    checkwin();
    updatelocalstorage();
    enter=0
    if (e.key === "Enter") {
        // down();
        // up();
        // right();
        // left();
        randombox();
        colour();
    }
    if (e.key === 'ArrowUp') {
        up();
        upmerge();
        up();
        if (enter) {
            randombox();
            moveup=1;
        }
        else {
            moveup=0
        }
        colour();
    }
    else if (e.key === 'ArrowDown') {
        down();
        downmerge();
        down();
        
        if (enter) {
            randombox();
            movedown=1;
        }
        else {
            movedown=0
        }
        colour();
    }
    else if (e.key === 'ArrowLeft') {
        left();
        leftmerge();
        left();
        
        
        if (enter) {
            randombox();
            moveleft=1;
        }
        else {
            moveleft=0
        }
        colour();
    }
    else if (e.key === 'ArrowRight') {
        right();
        rightmerge();
        right();
        
        if (enter) {
            randombox();
            moveright=1;
        }
        else {
            moveright=0;
        }
        colour();
    }
    updatelocalstorage();
})

function down() {
    for (i = 11; i >= 0; i--) {
        if (active.includes(i)) {
            if (!(active.includes(i + 4))) {
                j = i;
                while (j < 12 && hidden.includes(j + 4)) {

                    b[j + 4].innerText = b[j].innerText;
                    b[j].style.visibility = "hidden";
                    b[j + 4].style.visibility = "visible";

                    j = j + 4;
                }

                enter = 1;
                b[i].classList.remove("new");
                active.push(j);
                var myIndex = active.indexOf(i);
                if (myIndex !== -1) {
                    active.splice(myIndex, 1);
                }
                var myIndex = hidden.indexOf(j);
                if (myIndex !== -1) {
                    hidden.splice(myIndex, 1);
                }
                hidden.push(i)

            }
        }
    }
    // downmerge(j);
    // randombox();
}


function downmerge() {
    for (i = 11; i >= 0; i--) {
        if (active.includes(i)) {
            if ((active.includes(i + 4))) {
                j = i;

                let a = b[j].innerText;
                let c = b[j + 4].innerText;

                if (a === c) {

                    b[j].style.visibility = "hidden";
                    b[j + 4].innerText = b[j + 4].innerText * 2;
                    score=score+parseInt(b[j+4].innerText);
                    scorebox.innerText="SCORE "+ score;
                    hidden.push(j);
                    var myIndex = active.indexOf(j);
                    if (myIndex !== -1) {
                        active.splice(myIndex, 1);
                    }

                }

            }
        }
    }


}


function up() {
    for (let i = 4; i < 16; i++) {
        let j;
        if (active.includes(i)) {
            if (!(active.includes(i - 4))) {
                j = i;
                while (j >= 4 && hidden.includes(j - 4)) {
                    b[j - 4].innerText = b[j].innerText;
                    b[j].style.visibility = "hidden";
                    b[j - 4].style.visibility = "visible";
                    j = j - 4;
                }
                enter = 1;
                b[i].classList.remove("new");
                active.push(j);
                var myIndex = active.indexOf(i);
                if (myIndex !== -1) {
                    active.splice(myIndex, 1);
                }
                var myIndex = hidden.indexOf(j);
                if (myIndex !== -1) {
                    hidden.splice(myIndex, 1);
                }
                hidden.push(i);
            }
        }
    }
    // upmerge();
    // randombox();
}

function upmerge() {
    for (i = 4; i < 16; i++) {
        if (active.includes(i)) {
            if ((active.includes(i - 4))) {
                j = i;

                let a = b[j].innerText;
                let c = b[j - 4].innerText;

                if (a === c) {

                    b[j].style.visibility = "hidden";
                    b[j - 4].innerText = b[j - 4].innerText * 2
                    score=score+parseInt(b[j-4].innerText);
                    scorebox.innerText="SCORE "+ score;
                    hidden.push(j);
                    var myIndex = active.indexOf(j);
                    if (myIndex !== -1) {
                        active.splice(myIndex, 1);
                    }

                }

            }
        }
    }


}

function right() {
    for (let i = 14; i >= 0; i--) {
        if (i != 3 || i != 7 || i != 11 || i != 15) {
            let j;
            if ((!(rightbox.includes(i))) && active.includes(i)) {
                if (!(active.includes(i + 1))) {
                    j = i;
                    while ((!(rightbox.includes(j))) && hidden.includes(j + 1)) {
                        b[j + 1].innerText = b[j].innerText;
                        b[j].style.visibility = "hidden";
                        b[j + 1].style.visibility = "visible";
                        j = j + 1;
                    }
                    enter = 1;
                    b[i].classList.remove("new");
                    active.push(j);
                    var myIndex = active.indexOf(i);
                    if (myIndex !== -1) {
                        active.splice(myIndex, 1);
                    }
                    var myIndex = hidden.indexOf(j);
                    if (myIndex !== -1) {
                        hidden.splice(myIndex, 1);
                    }

                    hidden.push(i);
                }
            }
        }
    }
    // rightmerge();
    // randombox();
}
function rightmerge() {
    for (let i = 14; i >= 0; i--) {
        if (i != 3 || i != 7 || i != 11 || i != 15) {
            let j;
            if ((!(rightbox.includes(i))) && active.includes(i)) {
                if ((active.includes(i + 1))) {
                    j = i;
                    let a = b[j].innerText;
                    let c = b[j + 1].innerText;

                    if (a === c) {

                        b[j].style.visibility = "hidden";
                        b[j + 1].innerText = b[j + 1].innerText * 2
                        score=score+parseInt(b[j+1].innerText);
                        scorebox.innerText="SCORE "+ score;
                        hidden.push(j);
                        var myIndex = active.indexOf(j);
                        if (myIndex !== -1) {
                            active.splice(myIndex, 1);
                        }

                    }
                }
            }
        }
    }
}
function left() {
    for (let i = 1; i < 16; i++) {
        if (i != 0 || i != 4 || i != 8 || i != 12) {
            let j;
            if ((!(leftbox.includes(i))) && active.includes(i)) {
                if (!(active.includes(i - 1))) {
                    j = i;
                    while ((!(leftbox.includes(j))) && hidden.includes(j - 1)) {
                        b[j - 1].innerText = b[j].innerText;
                        b[j].style.visibility = "hidden";
                        b[j - 1].style.visibility = "visible";
                        j = j - 1;
                    }
                    enter = 1;
                    b[i].classList.remove("new");
                    active.push(j);
                    var myIndex = active.indexOf(i);
                    if (myIndex !== -1) {
                        active.splice(myIndex, 1);
                    }
                    var myIndex = hidden.indexOf(j);
                    if (myIndex !== -1) {
                        hidden.splice(myIndex, 1);
                    }

                    hidden.push(i);
                }
            }
        }
    }
    // leftmerge()
    // randombox();
}

function leftmerge() {
    for (let i = 1; i < 16; i++) {
        if (i != 0 || i != 4 || i != 8 || i != 12) {
            let j;
            if ((!(leftbox.includes(i))) && active.includes(i)) {
                if ((active.includes(i - 1))) {
                    j = i;
                    let a = b[j].innerText;
                    let c = b[j - 1].innerText;

                    if (a === c) {

                        b[j].style.visibility = "hidden";
                        b[j - 1].innerText = b[j - 1].innerText * 2
                        score=score+parseInt(b[j-1].innerText);
                        scorebox.innerText="SCORE "+ score;
                        hidden.push(j);
                        var myIndex = active.indexOf(j);
                        if (myIndex !== -1) {
                            active.splice(myIndex, 1);
                        }

                    }
                }
            }
        }
    }
}

function updatelocalstorage(){

    if (parseInt(score)>=bestscore){
        bestscore=score;
        bestbox.innerText="BEST "+ bestscore;
        localStorage.setItem("best", bestscore);
    }
    
}

