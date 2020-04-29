console.log('Client-side javascript console')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const message = document.querySelector('#message')

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    message.textContent = '';
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = 'Error'
                messageOne.textContent = 'Error Details:';
                messageTwo.textContent = data.error;
            } else {
                message.textContent = 'Results: '
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast
            }
        })
    })
})