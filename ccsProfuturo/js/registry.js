module.exports = {
  components: {
    'promos': require('./components/promos/promociones'),
	'fondo': require('./components/fondo/enviarFondo'),
	'FAQ': require('./components/faq/faq'),
    'login': require('./components/login/acctlink'),
    'getToken': require('./components/obtenerToken/obtenerToken'),
	'track': require('./components/tracking/track'),
	'dblocal': require('./components/dblocal/dblocal')
  }
};
