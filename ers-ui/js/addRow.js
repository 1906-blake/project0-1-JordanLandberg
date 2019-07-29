export default function addRow(user) {
    const table = document.getElementById('insert-table');
    const row = document.createElement('tr');
    table.appendChild(row);

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