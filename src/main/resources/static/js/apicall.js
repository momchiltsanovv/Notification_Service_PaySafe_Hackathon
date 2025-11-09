document.getElementById('emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('emailForm'));
    const response = await fetch('/email/send', {
        method: 'POST',
        body: formData
    });

    const result = document.getElementById('result');
    if (response.ok) {
        result.textContent = '✅ Email sent successfully!';
        result.style.color = 'green';
    } else {
        result.textContent = '❌ Failed to send email.';
        result.style.color = 'red';
    }
});
