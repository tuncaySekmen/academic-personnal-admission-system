const express = require('express');
const soap = require('soap');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const wsdlUrl = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL';

app.post('/api/tc-dogrula', async (req, res) => {
  const { TCKimlikNo, Ad, Soyad, DogumYili } = req.body;

  try {
    const client = await soap.createClientAsync(wsdlUrl);
    const [result] = await client.TCKimlikNoDogrulaAsync({
      TCKimlikNo,
      Ad,
      Soyad,
      DogumYili,
    });

    res.json({ valid: result.TCKimlikNoDogrulaResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kimlik doğrulama başarısız.' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend çalışıyor: http://localhost:${PORT}`);
});
