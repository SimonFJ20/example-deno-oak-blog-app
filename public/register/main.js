
const feedbackCode = document.getElementById('feedback');
const emailTextInput = document.getElementById('email');
const usernameTextInput = document.getElementById('username');
const password1stTextInput = document.getElementById('password1st');
const password2ndTextInput = document.getElementById('password2nd');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async () => {
    const res = await post('/api/users/register', {
        email: emailTextInput.value,
        username: usernameTextInput.value,
        password1st: password1stTextInput.value,
        password2nd: password2ndTextInput.value,
    });
    if (!res.ok) {
        console.log(res);
    } else {
        feedbackCode.textContent = `Registered: ${JSON.stringify(res.user)}`;
    }
});
