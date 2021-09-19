const App = require('./app');
const ClinicRoutes = require('./routes/clinic.route');

const app = new App([new ClinicRoutes()]);

app.listen();
