require('dotenv').config();
const {
  PORT,
} = process.env;

const express = require('express');
const app = express({
  strict: true
});
const http = require('http').createServer(app);
const path = require('path');
const db = require('./db');
const oth = require('./oth-interop');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('You may close this window (NFC tag scanned).');
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:tagname', async (req, res) => {
  const user = await oth.fetchPermissions(req.cookies.sid);

  if (user) {
    if (user.permissions.includes('SCAN_NFC_TAGS')) {
      await db.Scan.create({
        userId: user.id,
        tag: req.params.tagname
      });

      res.sendFile(path.join(__dirname, 'index.html'));
    } else {
      res.send('You are missing permissions.');
    }
  } else {
    res.send('You must be logged in.');
  }

});

db.isReady().then(() => {
  http.listen(PORT, () => {
    console.log(`NFC running on port ${PORT}`);
  });
});