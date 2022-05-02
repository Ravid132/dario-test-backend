const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);

// session setup
const session = expressSession({
  secret: 'coding is amazing',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
// Express App Config
app.use(express.json());
app.use(session);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const messageRoutes = require('./api/message/message.routes');
const countryRoutes = require('./api/country/country.routes');
const userRoutes = require('./api/user/user.routes');

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

app.use('/api/getMessages', messageRoutes);
app.use('/api/getCountries', countryRoutes);
app.use('/api/getUsers', userRoutes);

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('Server is running on port: ' + port);
  logger.info('Server is running on port: ' + port);
});