// Função para mostrar o modal de login
function showLogin() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
    } else {
        console.warn('Elemento com id loginModal não encontrado.');
    }
}

// Função para fechar o modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.warn(`Elemento com id ${modalId} não encontrado.`);
    }
}

// Fechar o modal quando clicar fora dele
window.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    if (loginModal && event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    updateSummaryAmounts();
});

function updateSummaryAmounts() {
    const entryTotal = calculateTotal('entry-value');
    const exitTotal = calculateTotal('exit-value');
    document.getElementById('entry-amount').textContent = `R$ ${entryTotal.toFixed(2)}`;
    document.getElementById('exit-amount').textContent = `R$ ${exitTotal.toFixed(2)}`;
    updateCurrentBalance(entryTotal, exitTotal);
}

function calculateTotal(className) {
    const values = Array.from(document.getElementsByClassName(className))
        .map(element => parseFloat(element.textContent.replace('R$', '').replace('.', '').replace(',', '.')));
    return values.reduce((total, value) => total + value, 0);
}

function updateCurrentBalance(entryTotal, exitTotal) {
    const balance = entryTotal - exitTotal;
    document.querySelector('.current-balance span').textContent = `Seu saldo atual é: R$ ${balance.toFixed(2).replace('.', ',')}`;
}

function registerEntry(event) {
    event.preventDefault();
    const description = document.getElementById('entry-description').value;
    const value = parseFloat(document.getElementById('entry-value').value);
    addTransaction('entry-table', 'entry-value', description, value);
}

function registerExit(event) {
    event.preventDefault();
    const description = document.getElementById('exit-description').value;
    const value = parseFloat(document.getElementById('exit-value').value);
    addTransaction('exit-table', 'exit-value', description, value);
}

function addTransaction(tableId, className, description, value) {
    const table = document.getElementById(tableId);
    const row = table.insertRow(-1);
    const dateCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const valueCell = row.insertCell(2);
    
    const today = new Date();
    const dateString = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    dateCell.textContent = dateString;
    descriptionCell.textContent = description;
    valueCell.textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
    valueCell.classList.add(className);

    updateSummaryAmounts();
}
