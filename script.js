
var images = [],
    theme = "",
    count = 19,
    rand = 0,
    tempElt1 = "",
    tempElt2 = "",
    click = -1,
    score = 0,
    win = 0,
    time = 0;

var preElt = document.querySelector("#pre"),
    themesElts = document.querySelectorAll(".themes"),
    boxElts = document.querySelectorAll(".box"),
    timeElt = document.querySelector("#time"),
    scoreElt = document.querySelector("#score"),
    postElt = document.querySelector("#post"),
    finalElt = document.querySelector("#final"),
    againElt = document.querySelector("#again");

// initiate the game with chosen theme
for (let j=0; j<themesElts.length; j++) {
  themesElts[j].addEventListener("click", function () {
    clearInterval(checkPageInterval);
    theme = this.id;
    // insert theme in images array
    switch (theme) {
      case "pokemon":
        for (let i=0; i<20; i++) {images.push(library.pokemon[i]);}
        break;
      case "starwars":
        for (let i=0; i<20; i++) {images.push(library.starwars[i]);}
        break;
      case "lotr":
        for (let i=0; i<20; i++) {images.push(library.lotr[i]);}
        break;
      case "disney":
        for (let i=0; i<20; i++) {images.push(library.disney[i]);}
        break;
      case "pixar":
        for (let i=0; i<20; i++) {images.push(library.pixar[i]);}
        break;
      case "harrypotter":
        for (let i=0; i<20; i++) {images.push(library.harrypotter[i]);}
        break;
    }

    // insert images in memory game
    for (let i=0; i<20; i++) {
      rand = Math.floor(Math.random() * count);
      boxElts[i].innerHTML = "<img src='" + images[rand] + "' alt='image' class='hidden'>";
      images.splice(rand, 1);
      count--;
    }
    preElt.classList.add("hidden");
  });
}


// Handle the play
for (let j=0; j<document.querySelectorAll(".play").length; j++) {
  document.querySelectorAll(".play")[j].addEventListener("click", function () {
    this.firstChild.classList.remove("hidden");

    // first of two click
    if (click < 1) {
      tempElt1 = this;
      // timer
      if (click === -1) {
        timer = setInterval(function() {
          time++;
          timeElt.innerHTML = time;
        }, 1000);
      }
      click = 1;
    }

    // second click
    else if (this !== tempElt1) {
      tempElt2 = this;

      // different images
      if (tempElt1.firstChild.src !== tempElt2.firstChild.src) {
        setTimeout( function() {
          tempElt1.firstChild.classList.add("hidden");
          tempElt2.firstChild.classList.add("hidden");
        }, 400);
        if (score > 0){
          score -= 2;
        }
        scoreElt.innerHTML = score;
      }

      // same images
      else {
        score += 10;
        win += 2;
        tempElt1.firstChild.classList.add("outlined");
        tempElt2.firstChild.classList.add("outlined");
        tempElt1.classList.remove("play");
        tempElt2.classList.remove("play");
        scoreElt.innerHTML = score;

        // game won
        if (win === 20) {
          clearTimeout(timer);
          finalElt.innerHTML = "You won " + score + " points <br> in " + time + " seconds";
          postElt.classList.remove("hidden");
        }
      }
      click = 0;
    }
  });
}

againElt.addEventListener("click", function() {
  // reset game
  theme = "";
  count = 19;
  rand = 0;
  tempElt1 = "";
  tempElt2 = "";
  click = -1;
  score = 0;
  win = 0;
  time = 0;
  postElt.classList.add("hidden");
  preElt.classList.remove("hidden");
  for (let i=0; i<20; i++) {
    boxElts[i].firstChild.classList.add("hidden");
  }
  timeElt.textContent = time;
  scoreElt.textContent = score;
});

// handle focus of the page
function checkPageFocus() {
  if (document.hasFocus()) {
    preElt.classList.remove("hidden");
  }
  else {
    preElt.classList.add("hidden");
  }
}
var checkPageInterval = setInterval(checkPageFocus, 300);
