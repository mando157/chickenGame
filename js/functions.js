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

                    score = 0;
                    $(".score").text(score);

                    backgroundMusic.play();
                    startChickenSound();

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

            success.play();

        } else {
            gameOver.play();
        }

        LifeScore = 5;

        backgroundMusic.currentTime = 0;
        backgroundMusic.pause();
        stopChickenSound();
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

            brockenEgg.currentTime = 0;
            brockenEgg.play();
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

        if (score % 5 === 0) {
            bonus.play();
        }
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

// * Chicken Sound
let
    chicken = new Audio("../audio/chicken-laying.mp3"),
    chicken2 = new Audio("../audio/chicken.mp3"),
    toggle = true,
    chickenInterval = null;

function startChickenSound() {

    clearInterval(chickenInterval);

    toggle = true;

    chickenInterval = setInterval(() => {

        if (toggle) {
            chicken.currentTime = 0;
            chicken.play();
        } else {
            chicken2.currentTime = 0;
            chicken2.play();
        }

        toggle = !toggle;

    }, 3000);
}


function stopChickenSound() {

    clearInterval(chickenInterval);

    chickenInterval = null;

    chicken.pause();
    chicken2.pause();
}