const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
  list.innerHTML = '';

  let amounts = transactions.map(t => t.amount);

  let total = amounts.reduce((acc, item) => acc + item, 0);
  let income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  let expense = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);

  balance.innerText = total;
  money_plus.innerText = `+₹${income}`;
  money_minus.innerText = `-₹${Math.abs(expense)}`;

  transactions.forEach(addTransactionDOM);
}

function addTransactionDOM(transaction) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${transaction.text}
    <span>₹${transaction.amount}</span>
    <button onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(li);
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  text.value = '';
  amount.value = '';

  updateUI();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateUI();
}

form.addEventListener('submit', addTransaction);

updateUI();
function downloadData() {
	const data = localStorage.getItem('transactions');
	const blob = new Blob([data], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.href = url;
	a.download = 'expenses.json';
	a.click();
}