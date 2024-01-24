
document.addEventListener('DOMContentLoaded', () =>{

    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
   let platformCount = 5
   let platforms = []

    //changeables 
    let isGameOver = false
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150


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
            console.log(platforms);
            
        }
    }
    createPlatforms()


    function createDoodler () {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodler.style.bottom = doodlerBottomSpace + 'px'
        
   
        //testing



    }
    createDoodler()


})