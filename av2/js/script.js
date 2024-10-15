// Função para validar o preenchimento dos campos e regras
function validateFields(username, email, password, confirmPassword) {
    if (!username || !email || !password || !confirmPassword) {
        alert("Todos os campos são obrigatórios.");
        return false;
    }

    // Validação de username: apenas letras e sem repetição
    if (!/^[a-zA-Z]+$/.test(username)) {
        alert("O username deve conter apenas letras.");
        return false;
    }

    // Validação de senha: exatamente 8 caracteres e no mínimo 2 números
    if (password.length !== 8 || password.replace(/[^0-9]/g, "").length < 2) {
        alert("A senha deve ter exatamente 8 caracteres e incluir pelo menos 2 números.");
        return false;
    }

    // Verificar se a confirmação de senha é igual à senha
    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return false;
    }

    return true;
}

// Função para salvar no sessionStorage e impedir duplicação de username
function saveToStorage(username, email) {
    let users = JSON.parse(sessionStorage.getItem('users')) || [];

    // Verificar se o username já existe
    if (users.some(user => user.username === username)) {
        alert("Este username já foi registrado.");
        return false;
    }

    // Adicionar novo usuário
    users.push({ username, email });
    sessionStorage.setItem('users', JSON.stringify(users));

    return true;
}

// Função para bloquear os campos e mudar o botão para "Unlocker"
function lockFields() {
    document.getElementById('userName').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('password').disabled = true;
    document.getElementById('confirmPassword').disabled = true;
    const registerBtn = document.getElementById('idBtnRegister');
    registerBtn.textContent = "UNLOCKER";
}

// Função para desbloquear os campos e restaurar o botão
function unlockFields() {
    document.getElementById('userName').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('password').disabled = false;
    document.getElementById('confirmPassword').disabled = false;
    const registerBtn = document.getElementById('idBtnRegister');
    registerBtn.textContent = "REGISTER";
}

// Evento de clique no botão de registro
document.getElementById('idBtnRegister').addEventListener('click', function () {
    const username = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar se o botão está no modo "Unlocker"
    const isUnlocker = this.textContent === "UNLOCKER";

    if (isUnlocker) {
        unlockFields(); // Desbloquear campos
    } else {
        if (validateFields(username, email, password, confirmPassword)) {
            if (saveToStorage(username, email)) {
                lockFields(); // Bloquear campos e alterar botão para "Unlocker"
            }
        }
    }
});