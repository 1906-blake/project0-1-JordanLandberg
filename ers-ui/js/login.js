async function login(event) {
    event.preventDefault();
    console.log('attempting to login');
    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    const credentials = {
        username, // variable name is the key, and the value is what is stored in the variable
        password
    }
    console.log(credentials);
    try {
        const res = await fetch('http://localhost:8012/login', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(res);
        const user = res.json();
        console.log(user);

        localStorage.setItem('user', JSON.stringify(user));
        window.location = '/ers-ui/users.html'; // navigate pages
    } catch (err) {
        console.log(err);
        console.log('invalid credentials')
        const errorElement = document.getElementById('error-message')
        errorElement.innerText = 'Invalid Credentials';
        errorElement.style.color = 'red';
    }
}