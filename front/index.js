
//Logic Goes Here
const containComb = (arr, comb) => {
  let arg = []
  let sortArr = arr.sort((a, b) => {return a - b})
  return sortArr.some((v) => {
    if (comb.indexOf(v) >= 0) {
      if (arg.length <= 3) arg.push(v)
      if (comb.equals(arg)) {
        return true
      }
    }
  })
};

Array.prototype.equals = function (array) {
  if (!array)
    return false

  if (this.length != array.length)
    return false

  for (var i = 0, l=this.length; i < l; i++) {
    if (this[i] instanceof Array && array[i] instanceof Array) {
      if (!this[i].equals(array[i]))
        return false
    }
    else if (this[i] != array[i]) {
      return false
    }
  }
  return true
};


const returnComb = (arr, comb) => {
  let comb1 = comb.slice(0, 2)
  let comb2 = comb.slice(1, 3)
  let comb3 = [ comb[0], comb[2] ]
  let arg = []
  let val

  arr.forEach(v => {
    if (comb.indexOf(v) >= 0) {
      arg.push(v)
      if (comb1.equals(arg)) {
        val = comb[2]
        return val
      }
      else if (comb2.equals(arg)) {
        val = comb[0]
        return val
      }
      else if (comb3.equals(arg)) {
        val = comb[1]
        return val
      }
    }
  })

  return val
};

const slctX = document.getElementById('selectX')
const slctO = document.getElementById('selectO')
const winModal = document.getElementById('winModal')
const winContent = document.getElementById('winContent')

class TicTacToeAnim {
  constructor() {
    this.insertX
    this.insertO
  }

  insertX(cell) {
    let divX = document.createElement('FIGURE')
    divX.className = 'sec-c__item--x'
    cell.appendChild(divX)
  }

  insertO(cell) {
    let divO = document.createElement('FIGURE')
    divO.className = 'sec-c__item--o'
    cell.appendChild(divO)
  }

  xoToggle() {
    slctX.classList.toggle('header__move-container--x--active')
    slctO.classList.toggle('header__move-container--o--active')
  }

  xActive() {
    slctX.classList.add('header__move-container--x--active')
    slctO.classList.remove('header__move-container--o--active')
  }

  oActive() {
    slctO.classList.add('header__move-container--o--active')
    slctX.classList.remove('header__move-container--x--active')
  }

  winX() {
    winModal.classList.add('win-modal--active')
    winContent.classList.add('win-modal__content--x')

    setTimeout(() => {
      winModal.classList.add('win-modal--disactive')
    }, 1400)

    setTimeout(() => {
      winModal.classList.remove('win-modal--active')
      winContent.classList.remove('win-modal__content--x')
      winModal.classList.remove('win-modal--disactive')
    }, 1600)
  }

  winO() {
    winModal.classList.add('win-modal--active')
    winContent.classList.add('win-modal__content--o')

    setTimeout(() => {
      winModal.classList.add('win-modal--disactive')
    }, 1400)

    setTimeout(() => {
      winModal.classList.remove('win-modal--active')
      winContent.classList.remove('win-modal__content--o')
      winModal.classList.remove('win-modal--disactive')
    }, 1600)
  }

  draw() {
    winModal.classList.add('win-modal--active')
    winContent.classList.add('win-modal__content--draw')

    setTimeout(() => {
      winModal.classList.add('win-modal--disactive')
    }, 1400)

    setTimeout(() => {
      winModal.classList.remove('win-modal--active')
      winContent.classList.remove('win-modal__content--draw')
      winModal.classList.remove('win-modal--disactive')
    }, 1600)
  }
}


const a = new TicTacToeAnim()

const combinationArr = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ]
]

const cells = document.querySelectorAll('.sec-c__item')
const cellsArr = [ ...cells ]
let cc = []                                                         //clicked cells
let uc = [0, 1, 2, 3, 4, 5, 6, 7, 8]                                //no clicked cells
let counterX = []                                                   //clicked cells for X
let counterO = []                                                   //clicked cells for O
let cM                                                              //currenr user move
let counter = 0
let oneUser = true
let userIs
let compIndex
let win = false

class TicTacToe {
  constructor(toggle, chooseVariant) {
    this.toggle
    this.chooseVariant
    this.selectMode
  }

  toggle(cell, i) {
    cM = !cM

    if (!oneUser) {
      if (cM && typeof cM !== undefined) {
        counterX.push(i)

        a.insertX(cell)
        a.xoToggle()
      } else {
        counterO.push(i)

        a.insertO(cell)
        a.xoToggle()
      }
    } else {
      if(userIs === 'x') {
        if (cM && typeof cM !== undefined) {
          counterX.push(i)

          a.insertX(cell)
          a.xoToggle()

          setTimeout(() => {
            this.computer()
          }, 200)
        }
      } else {
        if (!cM && typeof cM !== undefined) {
          counterO.push(i)

          a.insertO(cell)
          a.xoToggle()

          setTimeout(() => {
            this.computer()
          }, 200)
        }
      }
    }

    cc.push(i)
    this.removeIndex(i)
    this.checkComb()
  }

  chooseVariant() {
    if (this.randomDice() === 1 && !cc.length) {
      cM = false
      if (oneUser) { userIs = 'x' }

      a.xActive()
    } else {
      cM = true
      if (oneUser) { userIs = 'o' }

      a.oActive()
    }

    slctX.addEventListener('click', () => {
      if (!cc.length) {
        cM = false
        if (oneUser) userIs = 'x'

        a.xActive()
      }
    }, false)

    slctO.addEventListener('click', () => {
      if (!cc.length) {
        cM = true
        if (oneUser) userIs = 'o'

        a.oActive()
      }
    }, false)
  }

  selectMode(mode) {
    switch (Number(mode)) {
      case 1:
        oneUser = true
        break
      case 2:
        oneUser = false
        break
      case 3:
        this.reset()
        break
    }

    this.reset()
  }

  checkComb() {
    let contX
    let contO

    combinationArr.forEach(comb => {
      contX = containComb(counterX, comb)
      contO = containComb(counterO, comb)

      if (counterX.length > 2 || counterO.length > 2) {
        if (contX) {
          win = true
          a.winX()
          this.reset()
          return
        }

        else if (contO) {
          win = true
          a.winO()
          this.reset()
          return
        }

        else if (!contX && !contO && cc.length > 8) {
          win = true
          a.draw()
          this.reset()
          return
        }

        else if (cc.length === 9) {
          win = true
          a.draw()
          this.reset()
          return
        }
      }
    })
  }

  computer() {
    if (cc.length <= 9 && !win) {
      const index = this.randomize()
      this.removeIndex(index)

      if (userIs === 'x') {
        a.insertO(cellsArr[index])
        counterO.push(index)
      } else {
        a.insertX(cellsArr[index])
        counterX.push(index)
      }

      cc.push(index)
    }

    cM = !cM
    a.xoToggle()
    this.checkComb()
  }

  reset() {
    setTimeout(() => {
      cellsArr.forEach(cell => {
        cc = []
        counterX = []
        counterO = []
        this.chooseVariant()
        win = false
        uc = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        let child = cell.children[0]
        if (child) cell.removeChild(child)
      })
    }, 1000)
  }

  randomDice() {
    return Math.round(Math.random())
  }

  randomize() {
    let rand = uc[Math.floor(Math.random() * uc.length)]
    let sArr

    if (userIs === 'x') {
      sArr = counterX.sort((a, b) => {return a - b})
    } else {
      sArr = counterO.sort((a, b) => {return a - b})
    }

    for(let i = 0; i < combinationArr.length; i++) {
      let val = returnComb(sArr, combinationArr[i])
      if (typeof val !== 'undefined' && uc.includes(val)) {
        rand = val
      }
    }

    if (uc.includes(rand)) {
      return rand
    } else {
      return this.randomize()
    }
  }

  removeIndex(index) {
    uc.splice(uc.indexOf(index), 1)
  }
}





let t = new TicTacToe()

document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.sec-c__item')
  const cellsArr = [ ...cells ]
  const menu = document.getElementById('menu')
  const hamburger = document.getElementById('hamburger')
  const aside = document.getElementById('aside')
  const mode = document.getElementById('mode')

  t.chooseVariant()

  cellsArr.forEach((cell, i) => {
    cell.addEventListener('click', (e) => {
      if (e.target.childElementCount < 1 && e.target.classList[0] === 'sec-c__item') {
        t.toggle(cell, i)
      }
    })
  })

  menu.addEventListener('mouseover', () => {
    if (hamburger.classList[1] !== 'menu-container__menu--active')
      hamburger.classList.toggle('menu-container__menu--hover')
  })

  menu.addEventListener('mouseleave', () => {
    if (hamburger.classList[1] !== 'menu-container__menu--active')
      hamburger.classList.toggle('menu-container__menu--hover')
  })

  menu.addEventListener('click', () => {
    hamburger.classList.toggle('menu-container__menu--active')
    hamburger.classList.remove('menu-container__menu--hover')
    aside.style.display = 'block'

    if (hamburger.classList[1] === 'menu-container__menu--active') {
      aside.style.display = 'block'
    } else {
      setTimeout(() => {
        aside.style.display = 'none'
      }, 500)
    }

    setTimeout(() => {
      aside.classList.toggle('aside--show')
    }, 200)
  })

  mode.addEventListener('click', (e) => {
    t.selectMode(e.target.dataset.id)

    hamburger.classList.toggle('menu-container__menu--active')

    setTimeout(() => {
      aside.classList.toggle('aside--show')
    }, 200)

    setTimeout(() => {
      aside.style.display = 'none'
    }, 500)
  })
});
