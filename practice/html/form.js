document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const event = document.getElementById('event').value;
    const date = document.getElementById('date').value;
    
    if (!name || !email || !phone || !event || !date) {
        document.getElementById('error').textContent = 'All fields are required';
        return;
    }
    
    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById('error').textContent = 'Invalid phone number';
        return;
    }
    
    alert('Registration successful!');
    this.reset();
    document.getElementById('error').textContent = '';
});