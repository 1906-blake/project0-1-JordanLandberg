async function loadData(event) {
    const input = document.getElementById('userByUserId').value;
    console.log(input);
    const res = await fetch(`http://localhost:8012/users/${input}`, {
        credentials: 'include'
    });
    const user = await res.json();
    
    const table = document.getElementsByClassName('display-users')[0];
    const tbody = document.getElementById('display-users');
    tbody.innerHTML = '';
    addRow(user);
    table.style.display = 'block';
}

function addRow(user) {
    const tbody = document.getElementById('display-users');
    const row = document.createElement('tr');
    tbody.appendChild(row);

    const idInfo = document.createElement('td');
    idInfo.innerText = user.userId;
    row.appendChild(idInfo);
    
    const usernameInfo = document.createElement('td');
    usernameInfo.innerText = user.username;
    row.appendChild(usernameInfo);
    
    const firstNameInfo = document.createElement('td');
    firstNameInfo.innerText = user.firstName;
    row.appendChild(firstNameInfo);
    
    const lastNameInfo = document.createElement('td');
    lastNameInfo.innerText = user.lastName;
    row.appendChild(lastNameInfo);
    
    const emailInfo = document.createElement('td');
    emailInfo.innerText = user.email;
    row.appendChild(emailInfo);
    
    const roleInfo = document.createElement('td');
    roleInfo.innerText = user.role.role;
    row.appendChild(roleInfo);
}