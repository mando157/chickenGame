function startGame() {
    moveEggs($eggs);

    catchEgg($eggs[0]);
    catchEgg($eggs[1]);
    catchEgg($eggs[2]);

    let theGameReq = requestAnimationFrame(startGame);

    if (LifeScore == 0) {
        cancelAnimationFrame(theGameReq);

        $("#GamePopup").fadeIn(500);

        setTimeout(function () {
            $("#RestartButton")
                .removeClass("btn-success")
                .addClass("btn-danger")
                .text("Start Again ^-^")
                .click(function () {
                    resetEgg($eggs[0]);
                    resetEgg($eggs[1]);
                    resetEgg($eggs[2]);
                });


            $(".popup-content h2").text("Game Over");
            $(".popup-content")
                .removeClass("success")
                .addClass("gameOver")
                .slideDown(500);

        }, 600);

        if (highestScore < lastScore) {
            highestScore = lastScore;

            localStorage.setItem("highestScore", highestScore);

            $(".highestScore").text(highestScore);
        }

        LifeScore = 5;
        score = 0;

    }
}
function moveEggs(eggs) {
    let incSpeed = 10;

    eggs.each(function (egg) {
        let
            distance = Math.random() * (Math.random() * incSpeed) + 1,
            topEgg = $(this).offset().top,
            bottomOfBasket = ($basket.offset().top) + ($basket.outerHeight(true)),
            indexOfEgg = $eggs.index(this);

        if (topEgg <= bottomOfBasket) {
            $(this).offset({
                top: topEgg + distance,
            });

            incSpeed++;
        } else {
            if (LifeScore > 0) {
                let eggBroken = $brokenEggs.get(indexOfEgg);
                resetEgg(this);

                $(eggBroken).fadeIn(500).delay(500).fadeOut(500);

                $("#LifeScore").text(--LifeScore);
            }
        }
    });
}

function resetEgg(egg) {
    $(egg).offset({
        top: 120,
    });
}

function catchEgg(egg) {
    if (collision(egg, $basket)) {
        $(".score").text(++score);
        lastScore = score;
        resetEgg(egg);
    }
}

function collision(egg, basket) {
    // * Egg Dimensions
    let topEgg = $(egg).offset().top,
        bottomEgg = topEgg + ($(egg).outerHeight(true)),
        leftEgg = $(egg).offset().left,
        rightEgg = leftEgg + ($(egg).outerWidth(true)),

        // * Basket Dimensions
        topOfBasket = $(basket).offset().top,
        bottomOfBasket = topOfBasket + ($(basket).outerHeight(true)),
        leftOfBasket = $(basket).offset().left,
        rightOfBasket = leftOfBasket + ($(basket).outerWidth(true));

    if (
        bottomEgg < topOfBasket ||
        leftEgg > rightOfBasket ||
        topEgg > bottomOfBasket ||
        rightEgg < leftOfBasket
    ) {
        return false;
    }
    else {
        return true;
    }
}