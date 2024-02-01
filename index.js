
document.addEventListener('DOMContentLoaded', () =>{

    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
   let platformCount = 5
   let platforms = []

    //changeables 
    let isGameOver = false
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150
    let score = 0
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId 
    let rightTimerId
    let upTimerId
    let downTimerId
    let startPoint = 150



    class Platform {
        constructor(newPlatBottom){
            this.left = Math.random() * 315  //this calculation so it doesn't move out side of the grid 
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
            let newPlatBottom = 100 + index * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
            
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 80) {
            platforms.forEach(platform => {
              platform.bottom -= 4
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'
    
              if (platform.bottom < 10) {
                if (!platform.isScored) {
                    platform.isScored = true; // Add this line
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



    function createDoodler () {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace +'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }


    function fall () {
        isJumping = false
        clearTimeout(upTimerId)
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 3
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach (platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + 60) >=platform.left) && 
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace
                    jump()
                    console.log('startPoint', startPoint)
                    isJumping = true 
                }
            })
        }, 20)
    }
    fall()

  
    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
        doodlerBottomSpace += 5;
          doodler.style.bottom = doodlerBottomSpace + 'px'
          console.log('2',doodlerBottomSpace)
          console.log('s',startPoint)
          if (doodlerBottomSpace > (startPoint + 100)) {
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
                if (doodlerLeftSpace >= 0) {
                    console.log('going left')
                    doodlerLeftSpace -= 5
                    doodler.style.left = doodlerLeftSpace +'px'
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
                if (doodlerLeftSpace <= 313){
                    console.log('going right ')
                    doodlerLeftSpace += 5
                    doodler.style.left = doodlerLeftSpace + 'px';
                } else moveLeft()
        }, 20);
      }

      function moveStraight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
      }

        function control(e) {
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (e.key === 'ArrowLeft') {
                moveLeft()
            } else if (e.key === 'ArrowRight') {
                moveRight()
            } else if (e.key === 'ArrowUp') {
                moveStraight()
            }
        }


        function gameOver() {
            isGameOver = true;
            clearInterval(upTimerId);
            clearInterval(downTimerId);
            clearInterval(leftTimerId);
            clearInterval(rightTimerId);
        
            platforms.forEach(platform => {
                platform.visual.classList.remove('platform');
            });
        
            doodler.classList.remove('doodler');
        
        
            updateScoreDisplay();
        }

   

    function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30) 
            jump(startPoint)
            document.addEventListener('keyup', control)

            updateScoreDisplay();

        }
    }
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