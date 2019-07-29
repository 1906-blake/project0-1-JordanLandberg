const nav = document.getElementById('navbar');
nav.classList = 'navbar navbar-expand-md navbar-dark bg-dark';
nav.innerHTML = `
    <a class="navbar-brand" href="#">Expense Reimbursement System</a>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Dashboard</a>
            </li>
            <li class="nav-item active">
                <a class="nav-link" href="#">Users</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Reimbursements</a>
            </li>
        </ul>
    </div>
    <div id="nav-username" class="my-2 my-md-0"></div>
    <a href="/ers-ui/login.html"><button class="btn btn-secondary" type="button">Log Out</button></a>
    `;

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('nav-username').innerText = user.username;
}