let $eggs = $(".egg"),
    $brokenEggs = $(".brokenEgg"),
    $basket = $("#Basket"),
    LifeScore = 5,
    score = 0,
    lastScore = 0,
    highestScore = 0;


// * LocalStorage
if (localStorage.getItem("highestScore") === null) {
    localStorage.setItem("highestScore", 0);
} else {
    highestScore = Number(localStorage.getItem("highestScore"));
}

$(".highestScore").text(highestScore);

$(window).mousemove(function (e) {
    let halfBasketWidth = $("#Basket").outerWidth(true) / 2;

    if (e.pageX >= halfBasketWidth && e.pageX <= ($(window).outerWidth(true) - halfBasketWidth)) {

        // $("#Basket").css("left", e.pageX - $("#Basket").width() / 2);

        // ! OR We can use the Object in offset method

        $("#Basket").offset({
            left: e.pageX - halfBasketWidth,
        });
    }
});

// * Sounds
let backgroundMusic = new Audio("../audio/alex-morgan-game.mp3"),
    gameOver = new Audio("../audio/game-over.mp3"),
    brockenEgg = new Audio("../audio/broken.mp3"),
    bonus = new Audio("../audio/bonus-earned.mp3"),
    success = new Audio("../audio/success.mp3");

backgroundMusic.currentTime = 0;
backgroundMusic.play();

$("#RestartButton").click(function () {
    score = 0
    $(".popup-content").slideUp(500);
    setTimeout(function () {
        $("#GamePopup").fadeOut(500, function () {
            startGame();
        });
    }, 600);

    startChickenSound();
});




