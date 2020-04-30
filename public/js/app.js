const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const message = document.querySelector('#message')
// const messageThree = document.querySelector('#message-3')
// const date = new Date()
// const time = date.getTime()
// console.log(time)

// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    message.textContent = '';
    messageOne.textContent = 'Fetching Data...';
    messageTwo.textContent = '';
    // messageThree.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = 'Fetched Error'
                messageOne.textContent = 'Error Details:';
                messageTwo.textContent = data.error;
                // messageThree.textContent = '';
            } else {
                message.textContent = 'Fetched Results: '
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast
                // messageThree.textContent = 'Observation time: ' 
            }
        })
    })
})