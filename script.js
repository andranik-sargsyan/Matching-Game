let game = {
    width: 4,
    height: 3,
    size: 100,
    waitingBox: undefined,
    animating: false,
    foundCount: 0
};

let container = document.getElementById("container");
let dictionary = 'abcdefghijklmnopqrstuvwxyz';
let boxCount = game.width * game.height;

container.style.width = game.size * game.width + "px";
container.style.height = game.size * game.height + "px";

for (let i = 0; i < boxCount; i++) {
    container.innerHTML += '<div class="box"></div>';
}

if (boxCount % 2 == 0) {
    start();
}
else {
    alert("Wrong game configuration.");
}

function start() {
    prepare();
    bindEvents();
}

function prepare() {
    let numberArray = [];
    for (var i = 0; i < boxCount; i++) {
        numberArray.push(i);
    }

    for (var i = 0; i < boxCount / 2; i++) {
        let letter = dictionary[i];

        let index, boxIndex;

        index = getRandomInt(numberArray.length);
        boxIndex = numberArray[index];
        container.children[boxIndex].innerText = letter;
        numberArray.splice(index, 1);

        index = getRandomInt(numberArray.length);
        boxIndex = numberArray[index];
        container.children[boxIndex].innerText = letter;
        numberArray.splice(index, 1);
    }
}

function bindEvents() {
    for (let box of container.children) {
        box.addEventListener("click", () => {
            if (box.classList.contains("open") || game.animating) {
                return;
            }

            if (game.waitingBox) {
                box.classList.add("open");

                if (game.waitingBox.innerText == box.innerText) {
                    game.waitingBox = undefined;

                    game.foundCount++;

                    if (game.foundCount == boxCount / 2) {
                        setTimeout(() => {
                            alert("Congratulations, you won!");

                            location.reload();
                        }, 1000);
                    }
                }
                else {
                    game.animating = true;

                    setTimeout(() => {
                        box.classList.remove("open");

                        game.waitingBox.classList.remove("open");
                        game.waitingBox = undefined;

                        game.animating = false;
                    }, 1000);
                }
            }
            else {
                box.classList.add("open");
                game.waitingBox = box;
            }
        });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}