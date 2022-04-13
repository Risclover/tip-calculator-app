const bill = document.querySelector('.bill');
const people = document.querySelector('.people');
const buttons = document.querySelectorAll('.tip-btn');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const custom = document.querySelector('.custom');
const zero = document.querySelector('.zero');
const customTip = document.querySelector('.custom-tip');
const reset = document.querySelector('.reset');

let tipPercent = 0;
let tip = 0;
let total = 0;
let activeBtn = false;

buttons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
        customTip.value = "";
        customTip.style.display = "none";
        custom.style.display = "block";
        buttons.forEach((btn) => {
            btn.classList.remove('tip-active');
        });
        let numberOfPeople = Number(people.value);
        let billAmount = Number(bill.value); 
        if(numberOfPeople === 0) {
            zero.style.display = "block";
            people.classList.add('people-error');
        } else {
            btn.classList.add('tip-active');
            people.classList.remove('people-error');
            zero.style.display = "none";
            tipPercent = Number(e.target.value);
            tip = (billAmount * tipPercent) / numberOfPeople;
            console.log(`Tip amount: ${tip.toFixed(2)}`);
            total = (billAmount + (billAmount * tipPercent)) / numberOfPeople;
            console.log(`Total: ${total.toFixed(2)}`);
            tipAmount.textContent = `$${(tip.toFixed(2))}`;
            totalAmount.textContent = `$${(total.toFixed(2))}`;
        }
    });
});

custom.addEventListener('click', function() {
    let numberOfPeople = Number(people.value);
    if(numberOfPeople === 0) {
        zero.style.display = "block";
        people.classList.add('people-error');
    } else {
        people.classList.remove('people-error');
        zero.style.display = 'none';
        custom.style.display = "none";
        customTip.style.display = "inline-block";
        customTip.focus();
    }
});

customTip.addEventListener('keyup', function(e) {
    buttons.forEach((btn) => {
        btn.classList.remove('tip-active');
    });
    let numberOfPeople = Number(people.value);
    let billAmount = Number(bill.value);
    tipPercent = Number(e.target.value).toFixed(2)/100;
    tip = (billAmount * tipPercent) / numberOfPeople;
    console.log(`Tip amount: ${tip.toFixed(2)}`);
    total = (billAmount + (billAmount * tipPercent)) / numberOfPeople;
    console.log(`Total: ${total.toFixed(2)}`);
    tipAmount.textContent = `$${(tip.toFixed(2))}`;
    totalAmount.textContent = `$${(total.toFixed(2))}`;
});

reset.addEventListener('click', function() {
    buttons.forEach((btn) => {
        btn.classList.remove('tip-active');
    });
    customTip.value = "";
    bill.value = "";
    people.value = "";
    custom.style.display = "block";
    customTip.style.display = "none";
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
});

bill.addEventListener('keyup', inputChange);

people.addEventListener('keyup', inputChange);

function inputChange(e) {
    buttons.forEach((btn) => {
        if(btn.classList.contains('tip-active')) {
            btn.classList.remove('tip-active');
        }
    });
    customTip.style.display = "none";
    customTip.value = "";
    custom.style.display = "block";
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    if (activeBtn === true) {
        let numberOfPeople = Number(people.value);
        let billAmount = Number(bill.value);
        tipPercent = Number(e.target.value)/100;
        tip = (billAmount * tipPercent) / numberOfPeople;
        console.log(`Tip amount: ${tip.toFixed(2)}`);
        total = (billAmount + (billAmount * tipPercent)) / numberOfPeople;
        console.log(`Total: ${total.toFixed(2)}`);
        tipAmount.textContent = `$${(tip.toFixed(2))}`;
        totalAmount.textContent = `$${(total.toFixed(2))}`;
    }
}