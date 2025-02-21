// Import environment variables from .env file
require('dotenv').config({ path: './.env' });

const app = require('./src/app.js');

// App will be running on 3000
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log(`Express started on http://localhost:${app.get('port')}; press Ctrl-C to terminate.`);
});