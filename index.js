const form=document.getElementById('user-form');
const entriesTable=document.getElementById('entries-body');
const emailInput=document.getElementById('email');
const nameInput=document.getElementById('name');
const dobInput=document.getElementById('dob');

emailInput.addEventListener('input',function () {
    emailInput.setCustomValidity('');
});

function isValidEmail(email) {
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

form.addEventListener('submit',function(event) {
    event.preventDefault();

    const name=nameInput.value;
    const email=emailInput.value;
    const password=document.getElementById('password').value;
    const dob=dobInput.value;
    const acceptTerms=document.getElementById('acceptTerms').checked;

    if (!/^[A-Za-z\s]+$/.test(name)) {
        nameInput.setCustomValidity('Name should contain only alphabets and space characters');
        nameInput.reportValidity();
        return;
    } else {
        nameInput.setCustomValidity('');
    }

    if (!isValidEmail(email)) {
        emailInput.setCustomValidity('Invalid email format');
        emailInput.reportValidity();
        return;
    } else {
        emailInput.setCustomValidity('');
    }

    const currentDate=new Date();
    const dobDate=new Date(dob);
    const age=currentDate.getFullYear() - dobDate.getFullYear();

    if (age<18||age>55) {
        dobInput.setCustomValidity('Age should be between 18 and 55.');
        dobInput.reportValidity();
        return;
    } else {
        dobInput.setCustomValidity('');
    }

    const userData={ name, email, password, dob, acceptTerms };
    let storedEntries=JSON.parse(localStorage.getItem('userData')) || [];
    storedEntries.push(userData);
    localStorage.setItem('userData', JSON.stringify(storedEntries));

    updateEntriesTable();

    form.reset();
});

function updateEntriesTable() {
    entriesTable.innerHTML = '';
    let storedEntries = JSON.parse(localStorage.getItem('userData')) || [];
    storedEntries.forEach(userData => {
        const newRow = entriesTable.insertRow();
        newRow.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td>${userData.dob}</td>
            <td>${userData.acceptTerms ? 'Yes' : 'No'}</td>
        `;
    });
}

window.addEventListener('load',function() {
    updateEntriesTable();
});
