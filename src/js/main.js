document.getElementById('diagnoseBtn').addEventListener('click', async function() {
  const statusElement = document.getElementById('status');
  const networkNameElement = document.getElementById('networkName');
  const signalLevelElement = document.getElementById('signalLevel');
  const frequencyElement = document.getElementById('frequency');
  const pingElement = document.getElementById('ping');
  const downloadSpeedElement = document.getElementById('downloadSpeed');
  const uploadSpeedElement = document.getElementById('uploadSpeed');
  const suggestionsElement = document.getElementById('suggestions');

  try {
    statusElement.textContent = 'Realizando diagnóstico...';

    const response = await fetch('http://localhost:3000/diagnose');
    const data = await response.json();

    statusElement.textContent = data.status;
    networkNameElement.textContent = data.network || 'Indisponível';
    signalLevelElement.textContent = data.signalLevel || 'Indisponível';
    frequencyElement.textContent = data.frequency || 'Indisponível';
    pingElement.textContent = data.ping || 'Indisponível';
    downloadSpeedElement.textContent = data.downloadSpeed || 'Indisponível';
    uploadSpeedElement.textContent = data.uploadSpeed || 'Indisponível';
    suggestionsElement.innerHTML = '';
    data.suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      suggestionsElement.appendChild(li);
    });

  } catch (error) {
    console.error('Erro ao realizar o diagnóstico:', error);
    statusElement.textContent = 'Erro ao realizar o diagnóstico.';
  }
});

// Adicionando funcionalidade para o botão de upload
document.getElementById('uploadBtn').addEventListener('click', async function() {
  const statusElement = document.getElementById('status');

  try {
    statusElement.textContent = 'Testando Upload...';

    const response = await fetch('http://localhost:3000/upload', { method: 'POST' });
    const data = await response.json();

    statusElement.textContent = `Resultado do Upload: ${data.uploadSpeed || 'Indisponível'}`;

  } catch (error) {
    console.error('Erro ao testar upload:', error);
    statusElement.textContent = 'Erro ao testar upload.';
  }
});

document.getElementById('downloadBtn').addEventListener('click', async function() {
  const statusElement = document.getElementById('status');

  try {
    statusElement.textContent = 'Testando Download...';

    const response = await fetch('http://localhost:3000/download'); 
    const data = await response.json();

    statusElement.textContent = `Resultado do Download: ${data.downloadSpeed || 'Indisponível'}`;

  } catch (error) {
    console.error('Erro ao testar download:', error);
    statusElement.textContent = 'Erro ao testar download.';
  }
});