const $weight = document.querySelector('#weight')
const $height = document.querySelector('#height')
const $btnCalc = document.querySelector('#btn-calc')
const $btnOnTable = document.querySelector('#btn-on-table')
const $showResultArea = document.querySelector('#result-area')
const $conteinerImc = document.querySelector('#conteiner-calc-imc')
const $btnCloseTable = document.querySelector('#close-table')
const $table = document.querySelector('#imc-table')

$btnCalc.addEventListener('click', (e) => {
    e.preventDefault()
    let weight = $weight.value
    let height = $height.value
    let validateWeight = validateInput($weight)
    let validateHeight = validateInput($height)
    if(validateHeight == false || validateWeight == false){
        return stop
    }else{
        let result = calcImc(weight, height)
        let imc = validadeImc(result)
        $showResultArea.innerHTML = `
            <p>O resultado do seu imc foi: ${result}</p>
            <p>Voçê se enquadra na cartegoria ${imc}</p>
            <button class="btns two" onclick="clearResult()">Limpar</button>
        `
    }
})

function validateInput(input){
    if(input.value == '' || input.value == String){
        input.value = ''
        input.classList.add('erro')
        input.setAttribute("placeholder", "preencha o campo corretamente!")
        setTimeout( () => {
            clearInput(input)
        },5000)
        return false
    }
}

function clearInput(input){
    input.classList.remove('erro')
    input.removeAttribute("placeholder")
}

$weight.addEventListener('focus', () => {
    clearInput($weight)
})

$height.addEventListener('focus', () => {
    clearInput($height)
})

function calcImc(weight, height){
    return (weight / (height * height)).toFixed(1)
}

function validadeImc(imc){
    let result = ''
    if (imc < 18.5) {
      result = "Magreza"
    } else if (imc >= 18.5 && imc < 25) {
      result = "normal"
    } else if (imc >= 25 && imc < 30) {
      result = "Sobrepeso"
    } else if (imc >= 30 && imc < 35) {
      result = "Obesidade grau I"
    } else if (imc >= 35 && imc < 40) {
      result = "Obesidade grau II (severa)"
    } else{
      result = "Obesidade grau III (mórbida)"
    }
    return result
}
function clearResult(){
    $showResultArea.innerHTML = ''
    $weight.value = ''
    $height.value = ''
}

$btnOnTable.addEventListener('click', (e) => {
    e.preventDefault()
    showTable()
})

$btnCloseTable.addEventListener('click', closeTable)

function showTable(){
   $conteinerImc.classList.add('off')
   $table.classList.add('active')
   $btnCloseTable.classList.add('active')
}

function closeTable(){
    $table.classList.remove('active')
    $btnCloseTable.classList.remove('active')
    $conteinerImc.classList.remove('off')
}
