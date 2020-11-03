require('dotenv').config();

const PORT = process.env.PORT || 8080;

const express = require('express');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
	extname: '.hbs'
});

const app = express();

// Use handlebars engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/src/views`);

// Use all files in "public" as static content
app.use(express.static(`${__dirname}/public`));

// Render route "/"
app.get('/', (req, res) => {
	res.render('index');
});

app.listen(PORT, () => console.log('Active on port:', PORT));
