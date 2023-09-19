## This repo contains FullstackOpen course exercises from part 3 Node.js and Express

**URL for Render.com: https://osa3-phonebook-done.onrender.com/**

Remember to wait for Render to give CPU resources for website to show up.

Project is using production mode while on render.

## EsLint

npm install eslint --save-dev

npx eslint --init

You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · style  
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · browser
√ How would you like to define a style for your project? · prompt
√ What format do you want your config file to be in? · JavaScript
√ What style of indentation do you use? · tab
√ What quotes do you use for strings? · single
√ What line endings do you use? · windows
√ Do you require semicolons? · No / Yes
Successfully created .eslintrc.js file in

```
Konfiguraatiot tallentuvat tiedostoon .eslintrc.js:

module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
```

### PROCESS for Render.com Backend and Frontend.

**TIP with render: Set env variable key:PORT and value: (what you want /3001) otherwise port is default 10k**
Build the front from osa2 the phonebook in the project with command npm run build. Remember to edit and remove the localhost
Take the folder and move it to the backend project folder.

Use Express static to server your Build from the folder.
**Should be after app.use(express.json())**

```
app.use(express.static('dist'))
```

TEST: npm start => go to localhost:3001 should render the webpage.

## MongoDB

Create Cluster if you don't have it, add user and password with privledges.
Install Compass for easier access and add new connection string that website gave.
Add creds and connect.
Create new DB (persons) and Collection(persons) Save.

Create environmental variables for the database in config.env and use it instead some code in index.js

## Mongoose

npm i mongoose

const mongoose = require("mongoose")

## Materiaalin tekijä ja lisenssi

Kurssimateriaalin osat 0-8 ja 13 on tehnyt [Matti Luukkainen](https://github.com/mluukkai).

Osa 9 on [Terveystalon](https://www.terveystalo.com/fi/Yritystietoa/Terveystalo-tyontantajana/Digital-Health/) ohjelmistokehittäjien tekemä.

Osa 10 on [Kalle Ilves](https://github.com/Kaltsoon) tekemä.

Osa 11 on [Smartlyn](https://www.smartly.io/) ohjelmistokehittäjien tekemä

Osa 12 on [Jami Kousa](https://github.com/jakousa) tekemä.

Lukuisat henkilöt ovat parantaneet materiaalin laatua kirjoitus- ja asiavirhekorjauksin.

Sivuston designin on suunnitellut ja toteuttanut[ Houston inc](https://www.houston-inc.com/), joka on myös auditoinut kurssin sisällön.

[Kurssin repo](https://github.com/fullstack-hy2020/fullstack-hy2020.github.io)

Tämä materiaali on lisensoitu [Creative Commons](https://creativecommons.org/licenses/by-nc-sa/3.0/) BY-NC-SA 3.0 -lisenssillä, joten voit käyttää ja levittää sitä vapaasti, kunhan alkuperäisten tekijöiden nimiä ei poisteta. Jos teet muutoksia materiaaliin ja haluat levittää muunneltua versiota, se täytyy lisensoida samalla lisenssillä. Materiaalien käyttö kaupalliseen tarkoitukseen on ilman erillistä lupaa kielletty.

Kiitos kaikille kurssin suunnitteluun ja toteutukseen osallistuneille. - Jarmo
