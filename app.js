// Initialisation des données
let store = JSON.parse(localStorage.getItem('store')) || [];
let stock = JSON.parse(localStorage.getItem('stock')) || [];
let employes = JSON.parse(localStorage.getItem('employes')) || [];
let history = JSON.parse(localStorage.getItem('history')) || [];

// Navigation entre sections
function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Gestion du Store
function addStore() {
  const name = document.getElementById('newStoreName').value.trim();
  const qty = parseInt(document.getElementById('newStoreQty').value);
  if (name && qty > 0) {
    store.push({ name, qty });
    saveData();
    updateStoreTable();
    document.getElementById('newStoreName').value = '';
    document.getElementById('newStoreQty').value = '';
  }
}

function updateStoreTable() {
  const table = document.getElementById('storeTable');
  table.innerHTML = '<tr><th>Produit</th><th>Quantité</th><th>Action</th></tr>';
  store.forEach((item, index) => {
    table.innerHTML += `<tr><td>${item.name}</td><td>${item.qty}</td>
      <td><button onclick="removeStore(${index})">Supprimer</button></td></tr>`;
  });
}

function removeStore(index) {
  store.splice(index, 1);
  saveData();
  updateStoreTable();
}

// Gestion du Stock Réel
function syncStock() {
  stock = store.map(item => ({ ...item }));
  saveData();
  updateStockTable();
}

function updateStockTable() {
  const table = document.getElementById('stockTable');
  table.innerHTML = '<tr><th>Produit</th><th>Quantité</th></tr>';
  stock.forEach(item => {
    table.innerHTML += <tr><td>${item.name}</td><td>${item.qty}</td></tr>;
  });
}

// Gestion de la Consommation
function consumeStock() {
  const name = document.getElementById('consumeName').value.trim();
  const qty = parseInt(document.getElementById('consumeQty').value);
  const item = stock.find(item => item.name === name);
  if (item && qty > 0 && item.qty >= qty) {
    item.qty -= qty;
    history.push(`Consommé ${qty} de ${name} le ${new Date().toLocaleString()}`);
    saveData();
    updateStockTable();
    updateHistory();
    document.getElementById('consumeName').value = '';
    document.getElementById('consumeQty').value = '';
  } else {
    alert('Erreur : Produit non trouvé ou quantité insuffisante');
  }
}

function updateHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.slice().reverse().forEach(entry => {
    list.innerHTML += <li>${entry}</li>;
  });
}

// Gestion des Employés
function addEmploye() {
  const name = document.getElementById('newEmployeName').value.trim();
  if (name) {
    employes.push(name);
    saveData();
    updateEmployeTable();
    document.getElementById('newEmployeName').value = '';
  }
}

function updateEmployeTable() {
  const table = document.getElementById('employeTable');
  table.innerHTML = '<tr><th>Nom</th><th>Action</th></tr>';
  employes.forEach((name, index) => {
    table.innerHTML += `<tr><td>${name}</td>
      <td><button onclick="removeEmploye(${index})">Supprimer</button></td></tr>`;
  });
}

function removeEmploye(index) {
  employes.splice(index, 1);
  saveData();
  updateEmployeTable();
}

// Sauvegarder dans le LocalStorage
function saveData() {
  localStorage.setItem('store', JSON.stringify(store));
  localStorage.setItem('stock', JSON.stringify(stock));
  localStorage.setItem('employes', JSON.stringify(employes));
  localStorage.setItem('history', JSON.stringify(history));
}

// Rappel automatique à 23h45
function setReminder() {
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 23 && now.getMinutes() === 45 && now.getSeconds() === 0) {
      alert('Rappel : Pensez à faire la mise à jour du stock !');
    }
  }, 1000);
}

// Initialisation de l'interface
function init() {
  updateStoreTable();
  updateStockTable();
  updateEmployeTable();
  updateHistory();
  setReminder();
}

init();
