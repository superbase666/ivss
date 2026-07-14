/* ============================================================
   IVSS - ГЛАВНЫЙ ФАЙЛ JAVASCRIPT
   ============================================================
   Этот файл содержит все скрипты для всех страниц сайта.
   Каждая функция имеет комментарии на русском языке.
   ============================================================ */


// ==================== ГЛОБАЛЬНЫЕ НАСТРОЙКИ ====================

/* Правильный пароль для входа на сайт */
const CORRECT_PASSWORD = "InassGov26";

/* Ключ для сохранения имени пользователя в локальном хранилище */
const STORAGE_KEY_NAME = "ivss_user_name";


// ==================== ФУНКЦИЯ: Проверка формы логина ====================
/* Вызывается на странице index.html */
function validateLoginForm() {
    // Получаем элементы формы
    const fullNameInput = document.getElementById("fullName");      // Поле имени
    const passwordInput = document.getElementById("password");      // Поле пароля
    const checkbox = document.getElementById("agreeCheckbox");      // Чекбокс согласия
    const submitBtn = document.getElementById("submitBtn");         // Кнопка отправки

    // Если какой-то элемент не найден, выходим (мы на другой странице)
    if (!fullNameInput || !passwordInput || !checkbox || !submitBtn) return;

    /* Функция проверки: все ли поля заполнены и чекбокс отмечен */
    function checkForm() {
        const nameFilled = fullNameInput.value.trim() !== "";           // Имя не пустое
        const passwordFilled = passwordInput.value.trim() !== "";       // Пароль не пустой
        const isChecked = checkbox.checked;                              // Чекбокс отмечен

        // Активируем кнопку только если все условия выполнены
        if (nameFilled && passwordFilled && isChecked) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Слушатели событий: при любом изменении проверяем форму
    fullNameInput.addEventListener("input", checkForm);
    passwordInput.addEventListener("input", checkForm);
    checkbox.addEventListener("change", checkForm);
}


// ==================== ФУНКЦИЯ: Обработка входа ====================
/* Проверяет пароль и перенаправляет на страницу 2 */
function handleLogin(event) {
    event.preventDefault(); // Отменяем стандартную отправку формы

    const passwordInput = document.getElementById("password");
    const fullNameInput = document.getElementById("fullName");

    // Проверяем правильность пароля
    if (passwordInput.value !== CORRECT_PASSWORD) {
        alert("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
        return false;
    }

    // Сохраняем имя пользователя для использования на следующей странице
    localStorage.setItem(STORAGE_KEY_NAME, fullNameInput.value.trim());

    // Перенаправляем на страницу приветствия
    window.location.href = "index2.html";
    return false;
}


// ==================== ФУНКЦИЯ: Отображение имени пользователя ====================
/* Вызывается на странице index2.html - показывает имя из локального хранилища */
function displayUserName() {
    const userNameElement = document.getElementById("displayUserName");
    if (!userNameElement) return;

    // Получаем имя из локального хранилища
    const userName = localStorage.getItem(STORAGE_KEY_NAME);

    if (userName) {
        userNameElement.textContent = userName;
    } else {
        // Если имени нет (прямой переход на страницу), показываем заглушку
        userNameElement.textContent = "Usuario";
    }
}


// ==================== ФУНКЦИЯ: Проверка формы банковских данных ====================
/* Вызывается на странице index4.html */
function validateBankForm() {
    const bankSelect = document.getElementById("bankSelect");           // Выбор банка
    const accountNumber = document.getElementById("accountNumber");     // Номер счёта
    const fullName = document.getElementById("fullNameBank");           // Полное имя
    const checkbox = document.getElementById("agreeCheckbox");          // Чекбокс
    const submitBtn = document.getElementById("submitBankBtn");         // Кнопка

    if (!bankSelect || !accountNumber || !fullName || !checkbox || !submitBtn) return;

    function checkBankForm() {
        const bankSelected = bankSelect.value !== "";                        // Банк выбран
        const accountFilled = accountNumber.value.trim() !== "";             // Счёт введён
        const nameFilled = fullName.value.trim() !== "";                     // Имя введено
        const isChecked = checkbox.checked;                                   // Чекбокс отмечен

        // Активируем кнопку только при всех заполненных полях
        if (bankSelected && accountFilled && nameFilled && isChecked) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    bankSelect.addEventListener("change", checkBankForm);
    accountNumber.addEventListener("input", checkBankForm);
    fullName.addEventListener("input", checkBankForm);
    checkbox.addEventListener("change", checkBankForm);
}


// ==================== ФУНКЦИЯ: Имитация загрузки файла ====================
/* Вызывается на странице index8.html */
function simulateFileUpload() {
    const uploadBtn = document.getElementById("uploadContractBtn");         // Кнопка загрузки
    const fileInput = document.getElementById("fileInput");                 // Скрытый input файла
    const progressContainer = document.getElementById("progressContainer"); // Контейнер прогресса
    const progressBar = document.getElementById("progressBar");             // Полоса прогресса
    const uploadStatus = document.getElementById("uploadStatus");           // Текст статуса

    if (!uploadBtn || !fileInput) return;

    /* При клике на кнопку - открываем диалог выбора файлов */
    uploadBtn.addEventListener("click", function() {
        fileInput.click(); // Программно вызываем клик на скрытом input[type="file"]
    });

    /* Когда пользователь выбрал файлы */
    fileInput.addEventListener("change", function() {
        if (fileInput.files.length === 0) return; // Если ничего не выбрано - выходим

        // Показываем полосу прогресса
        progressContainer.style.display = "block";
        uploadBtn.disabled = true;
        uploadBtn.textContent = "Cargando...";

        // Имитируем процесс загрузки с прогрессом
        let progress = 0;
        const interval = setInterval(function() {
            progress += Math.random() * 15 + 5; // Случайный прирост 5-20%

            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Загрузка "завершена" - показываем модальное окно
                setTimeout(function() {
                    showModal();
                    // Сбрасываем состояние
                    uploadBtn.disabled = false;
                    uploadBtn.textContent = "Cargar Contrato";
                    progressContainer.style.display = "none";
                    progressBar.style.width = "0%";
                    fileInput.value = ""; // Очищаем выбор файла
                }, 500);
            }

            // Обновляем визуальную полосу прогресса
            progressBar.style.width = progress + "%";
            uploadStatus.textContent = "Cargando... " + Math.round(progress) + "%";
        }, 200); // Обновление каждые 200 мс
    });
}


// ==================== ФУНКЦИЯ: Показать модальное окно ====================
/* Показывает всплывающее окно об успешной загрузке */
function showModal() {
    const modal = document.getElementById("uploadModal");
    if (modal) {
        modal.classList.add("active");
    }
}


// ==================== ФУНКЦИЯ: Закрыть модальное окно ====================
/* Скрывает всплывающее окно */
function closeModal() {
    const modal = document.getElementById("uploadModal");
    if (modal) {
        modal.classList.remove("active");
    }
}


// ==================== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ====================
/* Когда вся страница загружена - запускаем нужные функции */
document.addEventListener("DOMContentLoaded", function() {
    // Запускаем проверку формы логина (для index.html)
    validateLoginForm();

    // Отображаем имя пользователя (для index2.html)
    displayUserName();

    // Запускаем проверку формы банка (для index4.html)
    validateBankForm();

    // Запускаем имитацию загрузки файла (для index8.html)
    simulateFileUpload();
});
