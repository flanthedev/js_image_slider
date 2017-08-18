const containerElement = document.getElementById('container');
const buttonElements = document.getElementsByTagName('button');

const carousel = {
  imgHand: [ 'img/img0.jpg' ], // active and inactive images
  imgDeck: [ 'img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img5.jpg'],

  initialize: function() {
    containerElement.childNodes[1].setAttribute('src', carousel.imgHand[0]);
    // containerElement.childNodes[1].style.opacity = 0;
    carousel.play();
    // carousel.fade();
    this.slide();
  },

  play: function() {
    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);

    interval = setInterval( function() { // begins movement
      carousel.showNext();
    }, 5000);

    buttonElements[0].onclick = () => {
      this.pause();

    };

    buttonElements[1].onclick = () => {
      this.pause();
      this.showNext();
    };

    containerElement.addEventListener('mouseover', () => { // pauses
      this.pause();
    });
    containerElement.addEventListener('mouseout', () => { // replays
      this.play();
    });
  },

  pause: function() {
    clearInterval(interval);
  },

  fade: function() {
    element1 = containerElement.childNodes[1];
    element2 = containerElement.firstChild;
    if (element1.style.opacity < 1) {
      setTimeout( function() {
        element1.style.opacity = element1.style.opacity * 1 + .01;
        element2.style.opacity = element2.style.opacity * 1 - .02;
        carousel.fade();
      }, 20);
    }
  },

  slide: function() {
    element1 = containerElement.childNodes[1];
    element2 = containerElement.firstChild;
    element2.style.left = '800px';
    var i = 0;
    let slideInterval = setInterval( function() {
      if (i <= 800) {
        console.log(i);
        element1.style.left = `${800 - i}px`;
        element2.style.left = `-${i}px`;
        i += 10;
      } else {
        return;
      }
    }, 62.5)

  },

  showPrev: function() {
    this.imgHand.push( this.imgDeck[this.imgDeck.length - 1]); // add new image to hand
    this.imgDeck.pop();                                  // remove that image from deck

    containerElement.removeChild(containerElement.childNodes[1]); // remove HTML
    let prevElement = document.createElement('img');              // add HTML
    prevElement.setAttribute('src', this.imgHand[0]);
    // prevElement.style.opacity = 0;
    containerElement.appendChild(prevElement);

    this.imgDeck.unshift( this.imgHand[0] );  // place image back in deck
    this.imgHand.shift();                     // remove image from hand
    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);

  },

  showNext: function() {
    this.imgHand.push( this.imgDeck[0] ); // add new image to hand
    this.imgDeck.shift();                 // remove that image from deck

    containerElement.removeChild(containerElement.firstChild); // remove HTML
    let nextElement = document.createElement('img');      // append new node
    nextElement.setAttribute('src', carousel.imgHand[1]);
    // nextElement.style.opacity = 0;
    containerElement.appendChild(nextElement);

    console.log(`HAND: ${this.imgHand} --- DECK: ${this.imgDeck}`);

    this.imgDeck.push( this.imgHand[0] ); // place image back in deck
    this.imgHand.shift();                 // remove image from hand

    // this.fade();
    this.slide();
  }
}

carousel.initialize();
