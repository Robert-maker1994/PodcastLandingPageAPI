require('dotenv').config({ path: './config/config.env' });

module.exports = {
	port: process.env.PORT || 5000,
	isProduction: process.env.NODE_ENV === 'production',
	token_exp: process.env.TOKEN_EXP,
	apiKey: process.env.MAILCHIMP_API_KEY,
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	server: process.env.SERVER,
	listId: process.env.LIST_ID
}