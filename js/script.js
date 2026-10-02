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

$("#RestartButton").click(function () {
    $(".popup-content").slideUp(500);
    setTimeout(function () {
        $("#GamePopup").fadeOut(500, function () {
            startGame();
        });
    }, 600);
});




