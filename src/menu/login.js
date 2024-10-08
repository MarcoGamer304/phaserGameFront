
const btnLoginModal = document.getElementById('loginModal')
const credentialsForm = document.getElementById('credentials')
const modalLogin = document.getElementById('modalLogin')
const closeLoginModal = document.getElementById('closeModal')

btnLoginModal.addEventListener('click', () => {
    modalLogin.showModal();
})

closeLoginModal.addEventListener('click', () => {
    modalLogin.close()
})

credentialsForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputUsername = document.getElementById('inputUsename');
    const inputPassword = document.getElementById('inputPassword');

    localStorage.setItem('username', inputUsername.value);
    localStorage.setItem('password', inputPassword.value);

    inputUsername.value = '';
    inputPassword.value = '';

    connectMultiplayer();  
})

function connectMultiplayer() {
    window.location.href = '../../../game.html';  
}

