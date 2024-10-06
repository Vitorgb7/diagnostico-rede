const express = require('express');
const wifi = require('node-wifi');
const cors = require('cors');
const app = express();
const port = 3000;

wifi.init({
iface: ''
})

app.use(cors());

const frequencyRanges = [
{ min: 2400, max: 2500, classification: 'Boa (Frequência 2.4 GHz, ideal para longo alcance, mas sujeita a interferências).' },
{ min: 5000, max: 5800, classification: 'Média (Frequência 5 GHz, melhor para velocidade, mas com menor alcance).' },
{ min: 5900, max: 7100, classification: 'Boa (Frequência 6 GHz, maior velocidade, mas alcance muito limitado).' }
];

function classifyFrequency(frequency) {
if (!frequency || isNaN(frequency)) {
return 'Frequência indisponível ou desconhecida.';
}

const range = frequencyRanges.find(r => frequency >= r.min && frequency <= r.max);
return range ? range.classification : 'Desconhecida (Frequência fora dos padrões típicos de Wi-Fi).';
}

app.get('/diagnose', async (req, res) => {
try {
const currentConnection = await wifi.getCurrentConnections();

if (currentConnection.length === 0) {
    return res.json({
    status: 'Nenhuma rede conectada.',
    suggestions: ['Verifique se o Wi-Fi está ativado.', 'Tente conectar-se a uma rede Wi-Fi.']
    });
}

const network = currentConnection[0]

const frequency = network.frequency
const frequencyClassification = classifyFrequency(frequency)

const response = {
    status: `Conectado à rede: ${network.ssid || 'Indisponível'}`,
    signalLevel: network.signal_level ? `${network.signal_level}%` : 'Sinal indisponível',
    frequency: frequency ? `${frequency} MHz (${frequencyClassification})` : 'Frequência indisponível',
    suggestions: [
    'Ajuste o roteador para minimizar interferências.',
    'Posicione o roteador em um local centralizado.',
    `A força do sinal é ${network.signal_level ? network.signal_level : 'indisponível'}%. Considere melhorar a posição do roteador se o sinal estiver fraco.`,
    `A frequência atual é ${frequency ? `${frequency} MHz` : 'indisponível'}. ${frequencyClassification}`
    ]
};

res.json(response);
} catch (error) {
console.error('Erro ao obter as informações da rede:', error);
res.status(500).json({ 
    status: 'Erro ao realizar o diagnóstico.',
    suggestions: ['Tente novamente mais tarde.'] 
});
}
});

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`)
})
