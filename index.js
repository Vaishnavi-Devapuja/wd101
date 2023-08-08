const userForm=document.getElementById('user-form');
const entriesTable=document.getElementById('entries-body');
const emailInput=document.getElementById('email');
const nameInput=document.getElementById('name');

nameInput.addEventListener('input',function() {
    if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
        nameInput.setCustomValidity('Name should contain only alphabets and space characters');
        nameInput.reportValidity();
    } else {
        nameInput.setCustomValidity('');
    }
});

userForm.addEventListener('submit',function(event) {
    event.preventDefault();

    const name=document.getElementById('name').value;
    const email=emailInput.value;
    const password=document.getElementById('password').value;
    const dob=document.getElementById('dob').value;
    const acceptTerms=document.getElementById('acceptTerms').checked;
    const userData={name, email, password, dob, acceptTerms};
    localStorage.setItem('userData', JSON.stringify(userData));

    updateEntriesTable(userData);

    userForm.reset();
});

function updateEntriesTable(userData) {
    const newRow=entriesTable.insertRow();
    newRow.innerHTML=`
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.dob}</td>
        <td>${userData.acceptTerms ? 'Yes' : 'No'}</td>
    `;
}

window.addEventListener('load',function() {
    const userDataJSON=localStorage.getItem('userData');
    if (userDataJSON) {
        const userData=JSON.parse(userDataJSON);
        updateEntriesTable(userData);
    }
});
window.addEventListener('load',function() {
    entriesTable.innerHTML='';
});
