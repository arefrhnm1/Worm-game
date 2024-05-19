// start game
// move hero
// place enemies
// set timer & force stop
// kill enemy
// check end





// start game
let boardWidth = document.querySelector(".circles_wrapper").offsetWidth;
let boardHeight = document.querySelector(".circles_wrapper").offsetHeight;


// place enemies
function placeEnemies () {
    let circles = document.querySelectorAll(".circle");
    // Math.random() * (max-min+1) + min
    circles.forEach(el => {
        el.style.top = `calc(${ Math.floor(Math.random() * (boardHeight - 60 + 1) + 30)}px)`;
        el.style.left = `calc(${ Math.floor(Math.random() * (boardWidth - 60 + 1) + 30)}px)`;
    })
}

document.body.addEventListener("load", placeEnemies());

// move hero
function moveHero (e) {
    let hero = document.querySelector(".user_icon");
    let leftPosition = parseInt(getComputedStyle(hero).left.replace("px", ""));
    let topPosition = parseInt(getComputedStyle(hero).top.replace("px", ""));

    switch(e.keyCode) {
        case 37 : 
            hero.style.left = leftPosition > -15 ? leftPosition - 10 : boardWidth - 50;
            kill(leftPosition, topPosition);
            break;
        case 38 : 
            hero.style.top = topPosition - 25 > 0 ? topPosition - 10 : boardHeight - 25;
            kill(leftPosition, topPosition);
            break;
        case 39 : 
            hero.style.left = leftPosition + 50 > boardWidth ? -10 : leftPosition + 10;
            kill(leftPosition, topPosition);
            break;
        case 40 : 
            hero.style.top = topPosition + 25 > boardHeight ? 25 : topPosition + 10;
            kill(leftPosition, topPosition);
            break;
    }
}

// set timer & force stop
let time = 30;
let timer = setInterval(() => {
    time = time - 1;
    document.querySelector(".seconds").innerHTML = time >= 10 ? " " + time : " 0" + time;
    if(!time) {
        checkEnd();
        clearInterval(timer);
    }
},1000);


// kill enemy
function kill (heroLeft, heroTop) {
    let circles = document.querySelectorAll(".circle");
    circles.forEach(el => {
        let elementLeftPosition = parseInt(getComputedStyle(el).left.replace("px", ""));
        let elementTopPosition = parseInt(getComputedStyle(el).top.replace("px", ""));
        if(Math.abs(heroLeft - elementLeftPosition) < 35 && Math.abs(heroTop - elementTopPosition) < 35) {
            el.remove();
            checkEnd();
        }
    })
}

// check end
function checkEnd () {
    let circles = document.querySelectorAll(".circle");
    if(time) {
        if(!circles.length) {
            clearInterval(timer);
            document.querySelector(
                "#successful_popup > .pop_up_background"
              ).style.visibility = "visible";
              document.querySelector(
                "#successful_popup > .pop_up_background"
              ).style.opacity = "1";
              document.querySelector("#successful_popup .pop_up_box").style.transform =
                "translateY(0)";
        }
    } else {
        document.querySelector(
            "#failed_popup > .pop_up_background"
          ).style.visibility = "visible";
          document.querySelector(
            "#failed_popup > .pop_up_background"
          ).style.opacity = "1";
          document.querySelector("#failed_popup .pop_up_box").style.transform =
            "translateY(0)";
    }
    
}