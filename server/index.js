const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(getPath()));

app.get('*', function (_, response) {
    response.sendFile(getPath('index.html'));
});

app.listen(port);

console.log('Server started on port ' + port);

function getPath(...segments) {
    return path.join(__dirname, '..', ...segments);
}
