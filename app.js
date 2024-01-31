const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

//每位user 需獨立secret存db
// const { base32: secret } = speakeasy.generateSecret({ length: 20 });
const secret = 'ENNE4VRTIAXHW22JOETFEMDLHJGTEQDY';

//auth帳戶資訊
app.get('/qrcode', (req, res) => {
    const userName = "UserName";
    const serviceName = process.env.SERVICE_NAME;
    const otpauthUrl = speakeasy.otpauthURL({
        secret,
        label: encodeURIComponent(`${userName}:${serviceName}`),
        issuer: serviceName,
        encoding: 'base32'
    });

    //QR Code
    qrcode.toDataURL(otpauthUrl, (err, data_url) => {
        res.json({ data_url });
    });
});

//驗證認證碼
app.post('/verify', (req, res) => {
    const token = req.body.token;
    const verified = speakeasy.totp.verify({
        token: token,
        secret,
        encoding: 'base32'
    });

    res.json({ verified: verified ? '驗證成功！' : '驗證失敗。' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
