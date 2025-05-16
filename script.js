// Знаходимо елементи
const form = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses');

// Масив для збереження витрат
let expenses = [];

// Завантажуємо витрати з localStorage при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
  const savedExpenses = localStorage.getItem('expenses');
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
  }
});

// Обробка подачі форми
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Отримуємо значення з полів
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value.trim();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value.trim();

  // Перевірка обов’язкових полів
  if (!date || !category || !amount) {
    alert('Будь ласка, заповніть дату, категорію та суму.');
    return;
  }

  // Створюємо об'єкт витрати
  const expense = {
    date,
    category,
    amount: parseFloat(amount),
    description
  };

  // Додаємо до масиву
  expenses.push(expense);

  // Зберігаємо масив у localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Оновлюємо список на сторінці
  renderExpenses();

  // Очищення форми
  form.reset();
});

// Функція для рендеру списку витрат
function renderExpenses() {
  expensesList.innerHTML = '';

  expenses.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.amount.toFixed(2)} грн</strong> — ${item.category} (${item.date})<br>
      <em>${item.description}</em>
      <button class="delete-btn" data-index="${index}">Видалити</button>
    `;
    expensesList.appendChild(li);
  });

  // Додаємо обробник для кнопок видалення
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      expenses.splice(index, 1); // видаляємо запис із масиву
      localStorage.setItem('expenses', JSON.stringify(expenses)); // оновлюємо localStorage
      renderExpenses(); // перерендеримо список
    });
  });

  // Оновлюємо загальну суму після відображення списку
  updateTotalAmount();
}

// Функція для підрахунку та оновлення загальної суми
function updateTotalAmount() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalAmountEl = document.getElementById('total-amount');
  totalAmountEl.textContent = total.toFixed(2);
}
