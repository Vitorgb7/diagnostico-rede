import express from 'express';
import wifi from 'node-wifi';
import cors from 'cors';
import NetworkSpeed from 'network-speed';
import { getActiveNetworkInterface } from '../utils/networkUtils.js';

const app = express();
const port = 3000;
const testNetworkSpeed = new NetworkSpeed();
const activeNetworkInterface = getActiveNetworkInterface();
console.log(`Interface de rede ativa: ${activeNetworkInterface}`);

wifi.init({ iface: activeNetworkInterface || '' });

app.use(cors());

const fileSizeInBytes = 10000000; 
const baseUrl = 'http://localhost:3000/testfile.bin';
const uploadTestUrl = 'http://localhost:3000/upload-test';

app.get('/diagnose', async (req, res) => {
  try {
    console.log('Tentando obter informações da rede...');
    const currentConnection = await wifi.getCurrentConnections();
    console.log('Informações da rede obtidas:', currentConnection);

    if (currentConnection.length === 0) {
      return res.json({
        status: 'Nenhuma rede conectada.',
        suggestions: [
          'Verifique se o Wi-Fi está ativado.',
          'Tente conectar-se a uma rede Wi-Fi.',
        ],
      });
    }

    const connection = currentConnection[0];
    const suggestions = [];

    if (connection.signal_level < -70) {
      suggestions.push('A intensidade do sinal é baixa. Tente se aproximar do roteador.');
    }

    const downloadSpeed = await getDownloadSpeed();
    const uploadSpeed = await getUploadSpeed();
    return res.json({
      status: 'Rede conectada.',
      network: connection.ssid,
      signalLevel: connection.signal_level,
      frequency: connection.frequency,
      ping: 'A ser implementado', 
      downloadSpeed: `Velocidade de Download: ${downloadSpeed.mbps} Mbps`,
      uploadSpeed: `Velocidade de Upload: ${uploadSpeed.mbps} Mbps`,
      suggestions,
    });
  } catch (error) {
    console.error('Erro ao obter informações da rede:', error);
    res.status(500).json({ error: 'Erro ao realizar diagnóstico da rede.' });
  }
});

app.post('/upload', async (req, res) => {
  try {
    const uploadSpeed = await getUploadSpeed();
    res.json({ uploadSpeed: `Velocidade de Upload: ${uploadSpeed.mbps} Mbps` });
  } catch (error) {
    console.error('Erro ao obter a velocidade de upload:', error);
    res.status(500).json({ error: 'Erro ao medir upload' });
  }
});

app.get('/download', async (req, res) => {
  try {
    const downloadSpeed = await getDownloadSpeed();
    res.json({ downloadSpeed: `Velocidade de Download: ${downloadSpeed.mbps} Mbps` });
  } catch (error) {
    console.error('Erro ao obter a velocidade de download:', error);
    res.status(500).json({ error: 'Erro ao medir download' });
  }
});

async function getDownloadSpeed() {
  try {
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    return speed;
  } catch (error) {
    console.error('Erro ao obter a velocidade de download:', error);
    throw error;
  }
}

async function getUploadSpeed() {
  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const speed = await testNetworkSpeed.checkUploadSpeed(options);
    return speed;
  } catch (error) {
    console.error('Erro ao obter a velocidade de upload:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});