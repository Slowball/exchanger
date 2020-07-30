const currencyEl1 = document.querySelector('#currency-one');
const currencyEl2 = document.querySelector('#currency-two');
const amountEl1 = document.querySelector('#amount-one');
const amountEl2 = document.querySelector('#amount-two');

const rate = document.querySelector('#rate');
const swap = document.querySelector('#swap');

function calculate() {
   const currency_one = currencyEl1.value; 
   const currency_two = currencyEl2.value; 
   
   fetch(`https://api.exchangeratesapi.io/latest?symbols=${currency_one},${currency_two}`)
   .then(res => res.json())
   .then(res => {
       let dif = (res.rates[currency_two] / res.rates[currency_one]).toFixed(2);
       rate.innerText = `1 ${currency_one} = 
       ${dif} ${currency_two}`;

       amountEl2.value = (amountEl1.value * dif).toFixed(2)
   })
   .catch(error => console.log('something wrong'))
}

currencyEl1.addEventListener('change', calculate);

currencyEl2.addEventListener('change', calculate);

amountEl1.addEventListener('input', calculate);

amountEl2.addEventListener('change', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl1.value;
    currencyEl1.value = currencyEl2.value;
    currencyEl2.value = temp;
    calculate();
})

calculate();