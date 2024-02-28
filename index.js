
document.addEventListener('DOMContentLoaded', () =>{

    const grid = document.querySelector('.grid')
    const spooder = document.createElement('div')
   let platformCount = 5
   let platforms = []

    // variables for managing game state and spooderman position
    let isGameOver = false
    let spooderLeftSpace = 50
    let spooderBottomSpace = 140
    let score = 0
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId 
    let rightTimerId
    let upTimerId
    let downTimerId
    let startPoint = 150


    // Platform class for creating platform objects
    class Platform {
        constructor(newPlatBottom){
            this.left = Math.random() * 315  // randomize platform left position within grid
            this.bottom = newPlatBottom
            this.isScored = false;
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms(){
        for (let index = 0; index < platformCount; index++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 90 + index * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
            
        }
    }

    function movePlatforms() {
        if (spooderBottomSpace > 60) {
            platforms.forEach(platform => {
              platform.bottom -= 3
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'
    
              if (platform.bottom < 10) {
                if (!platform.isScored) {
                    platform.isScored = true; 
                    score++;
                    updateScoreDisplay();
                }

                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()

                var newPlatform = new Platform(600)
                platforms.push(newPlatform)
              }
          }) 
        }
        
      }



    function createspooder () {
        grid.appendChild(spooder)
        spooder.classList.add('spooder')
        spooderLeftSpace = platforms[0].left
        spooder.style.left = spooderLeftSpace +'px'
        spooder.style.bottom = spooderBottomSpace + 'px'
    }

    // handles spooderman falling
    function fall () {
        isJumping = false
        clearTimeout(upTimerId)
        downTimerId = setInterval(function() {
            spooderBottomSpace -= 3
            spooder.style.bottom = spooderBottomSpace + 'px'
            if (spooderBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach (platform => {
                if (
                    (spooderBottomSpace >= platform.bottom) &&
                    (spooderBottomSpace <= (platform.bottom + 15)) &&
                    ((spooderLeftSpace + 60) >=platform.left) && 
                    (spooderLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    startPoint = spooderBottomSpace
                    jump()
                    console.log('startPoint', startPoint)
                    isJumping = true 
                }
            })
        }, 20)
    }
    fall()

      // function to handle spooderman jumping
    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
        spooderBottomSpace += 7;
          spooder.style.bottom = spooderBottomSpace + 'px'
          console.log('2',spooderBottomSpace)
          console.log('s',startPoint)
          if (spooderBottomSpace > (startPoint + 100)) {
            fall()
            isJumping = false
          }
        },20)
      }

    function moveLeft () {
        if (isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
            isGoingLeft = true
            leftTimerId = setInterval (() => {
                if (spooderLeftSpace >= 0) {
                    console.log('going left')
                    spooderLeftSpace -= 5
                    spooder.style.left = spooderLeftSpace +'px'
                } else moveRight()
            }, 20 )
        }
    

    function moveRight () { 
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function() {
                if (spooderLeftSpace <= 313){
                    console.log('going right ')
                    spooderLeftSpace += 5
                    spooder.style.left = spooderLeftSpace + 'px';
                } else moveLeft()
        }, 20);
      }

     // wont allow  horizontal movement

      function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      }

          // function to handle keyboard controls
        function control(e) {
            spooder.style.bottom = spooderBottomSpace + 'px'
            if (e.key === 'ArrowLeft') {
                moveLeft()
            } else if (e.key === 'ArrowRight') {
                moveRight()
            } else if (e.key === 'ArrowUp') {
                moveStraight()
            }
        }

        //how to end the game
        function gameOver() {
            isGameOver = true;
            clearInterval(upTimerId);
            clearInterval(downTimerId);
            clearInterval(leftTimerId);
            clearInterval(rightTimerId);
        
            platforms.forEach(platform => {
                platform.visual.classList.remove('platform');
            });
        
            spooder.classList.remove('spooder');
        
        
            updateScoreDisplay();
        }

   
// start the game
    function start() {
        if (!isGameOver) {
            createPlatforms()
            createspooder()
            setInterval(movePlatforms, 30) 
            jump(startPoint)
            document.addEventListener('keyup', control)

            updateScoreDisplay();

        }
    }

        // update the score logic
     function updateScoreDisplay() {
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.innerText = 'Score: ' + score;
        } else {
            console.error('Score display element not found');
        }
    }
   
    
    start();
})