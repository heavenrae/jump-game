
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


    class Platform {
        constructor(newPlatBottom){
            this.left = Math.random() * 315  //this calculation so it doesn't move out side of the grid 
            this.bottom = newPlatBottom
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
            console.log(platforms)
            
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 80) {
            platforms.forEach(platform => {
              platform.bottom -= 4
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'
    
              if(platform.bottom < 10) {
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()
                console.log(platforms)
                score++
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

 

    function gameOver(){
        isGameOver = true 
        while (grid.firstChild) {
            console.log('remove')
            grid.removeChild(grid.firstChild)
        }
        
    }

    function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30) 
        }
    }
    
    start()

})