document.getElementById('diagnoseBtn').addEventListener('click', () => {
const statusElement = document.getElementById('status')
const suggestionsList = document.getElementById('suggestions')

statusElement.textContent = 'Realizando diagnóstico...'
suggestionsList.innerHTML = ''
setTimeout(() => {
    fetch('http://localhost:3000/diagnose')
    .then(res => res.json())
    .then(data => {
        statusElement.textContent = `${data.status} (Sinal: ${data.signalLevel}, Frequência: ${data.frequency})`;
        
        data.suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
        });
    })
    .catch(error => {
        statusElement.textContent = 'Erro ao realizar o diagnóstico.';
        console.error('Erro:', error);
    });
}, 5000)
})