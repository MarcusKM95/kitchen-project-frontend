// Функция для загрузки данных о заказах
function loadOrders() {
    // Имитация асинхронного запроса (например, через fetch или XMLHttpRequest)
    setTimeout(() => {
        document.getElementById('orders-count').textContent = '120 Orders'; // Обновляем количество заказов
    }, 1000); // Задержка 1 секунда для имитации загрузки
}

// Функция для загрузки данных о пользователях
function loadUsers() {
    setTimeout(() => {
        document.getElementById('users-count').textContent = '50 Active Users'; // Обновляем количество пользователей
    }, 1000);
}

// Открыть модальное окно настроек
function openSettingsModal() {
    document.getElementById('settings-modal').style.display = 'block';
}

// Закрыть модальное окно настроек
function closeSettingsModal() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    if (event.target === document.getElementById('settings-modal')) {
        closeSettingsModal();
    }
};
