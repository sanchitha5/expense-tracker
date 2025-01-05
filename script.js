const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = [];

// Add a new transaction
function addTransaction(e) {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description && amount) {
        const transaction = {
            id: Date.now(),
            description,
            amount,
        };

        transactions.push(transaction);
        updateDOM();
        descriptionInput.value = '';
        amountInput.value = '';
    }
}

// Remove a transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateDOM();
}

// Update the DOM
function updateDOM() {
    transactionList.innerHTML = '';

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.amount > 0 ? 'positive' : 'negative');
        li.innerHTML = `
            ${transaction.description} <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
        transactionList.appendChild(li);

        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const totalBalance = totalIncome + totalExpense;
    balance.textContent = `$${totalBalance.toFixed(2)}`;
    income.textContent = `$${totalIncome.toFixed(2)}`;
    expense.textContent = `$${Math.abs(totalExpense).toFixed(2)}`;
}

// Event listener for form submission
transactionForm.addEventListener('submit', addTransaction);
