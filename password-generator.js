const state = { l: 0, x: 0, n: 0, c: 0 }

let totalLengthInput, nanC, caps, numberInput;
document.addEventListener('DOMContentLoaded', () => {
    totalLengthInput = document.querySelector('#totallength');
    totalLengthInput.addEventListener('change', handleTotalLength);

    numberInput = document.querySelector('#numbers')
    numberInput.addEventListener('change', handleNumbers)

    nanC = document.querySelector('#non-an-chars')
    nanC.addEventListener('change', handleNanC)

    caps = document.querySelector('#caps')
    caps.addEventListener('change', handleCaps)

    const show = document.querySelector('#show-password')
    show.addEventListener('click', showPassword)

    const form = document.querySelector('#input-wrapper')
    form.addEventListener('submit', generatePassword)

    const copy = document.querySelector('#copy-password')
    copy.addEventListener('click', copyToClip)
})

const copyToClip = () => {
    const value = document.querySelector('#out').value
    navigator.clipboard.writeText(value)
    alert('Password copied to the clipboard.')
}
const checkForReps = (arr) => {
    let count = 0;
    (() => {
        for (let i = 0; i < arr.shuff.length - 1; i++) {
            if (arr.shuff[i] === arr.shuff[i + 1]) {
                let elToReplace = arr.shuff.splice(i, 1)[0]
                arr.shuff.splice(Math.floor(Math.random() * (arr.shuff.length + 1)), 0, elToReplace)
                count++
            }
        }
    })()
    if (!!count) {
        count = 0;
        checkForReps(arr)
    }
    return arr
}

const getNumbers = (len) => [...Array(len)].map(_ => Math.floor(Math.random() * 10))
const getChars = (len) => {
    const characters = "[{(,.<>+=&%$£!?)}|/'']".split('')
    const nonAlphNum = [...Array(len).fill('')].map(nAN => nAN.replace(nAN, characters[Math.floor(Math.random() * characters.length)]))
    return nonAlphNum
}
const getAlpha = (len, casing, otherChars) => {
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    let chars;
    casing === 'lower' && (chars = [...Array(len - otherChars).fill('')].map(_ => lower.split('')[Math.floor(Math.random() * (lower.length))]))
    casing === 'upper' && (chars = [...Array(len).fill('')].map(nAN => nAN.replace(nAN, lower.toUpperCase().split('')[Math.floor(Math.random() * (lower.toUpperCase().length))])))
    return chars
}

const generatePassword = (e, l = state.l, n = state.n, x = state.x, c = state.c) => {
    e.preventDefault()
    document.querySelector('#out').type = 'password'
    if (
        typeof +l !== 'number' ||
        typeof +n !== 'number' ||
        typeof +x !== 'number' ||
        typeof +c !== 'number'


    ) {
        alert('Please enter numbers only')
    } else
        if (l <= 0 || n < 0 || x < 0 || c < 0) {
            return alert('Looks like you may have failed to enter a password length or you may have used a negative number.')
        } else
            if ((n + x + c) > l) {
                return alert('Requested characters exceed given password length')
            }
    const numbers = getNumbers(n)
    const chars = getChars(x)
    const lower = getAlpha(l, 'lower', n + x + c)
    const upper = getAlpha(c, 'upper')
    const newArray = [...numbers, ...chars, ...upper, ...lower]

    let shuffled = []
    newArray.forEach(el => {
        shuffled.splice(Math.floor(Math.random() * newArray.length), 0, el)
    })
    let curre = checkForReps({ shuff: shuffled.join('').split('') })
    document.querySelector('#out').value = curre.shuff.join('')
    document.querySelector('#out').size = l + ' !important'

}

const handleTotalLength = (e) => {
    if (e.target.value < (state.n + state.x + state.c)) {
        totalLengthInput.value = state.n+state.x+state.c;
        alert('Total length must exceed other selected characters')
    } else {
        state.l = +e.target.value
    }
}

const handleNumbers = (e) => {
    if (state.l < (+e.target.value + state.x + state.c)) {
        numberInput.value = 0;
        alert('Total length must exceed other selected characters')
    } else {
        state.n = +e.target.value
    }
}

const handleCaps = (e) => {
    if (state.l < (state.n + state.x + +e.target.value)) {
        caps.value = 0;
        alert('Total length must exceed other selected characters')
    } else {
        state.c = +e.target.value
    }
}

const handleNanC = (e) => {
    if (state.l < (state.n + +e.target.value + state.c)) {
        nanC.value = 0
        alert('Total length must exceed other selected characters')
    } else {
        state.x = +e.target.value
    }
}

const showPassword = () => {
    document.querySelector('#out').type === 'text' ?
        (document.querySelector('#out').type = 'password') :
        (document.querySelector('#out').type = 'text')
}
