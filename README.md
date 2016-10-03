# Proiect CuratMurdar

## Descriere

Prezentare si comparatie energie verde (regenerabila) vs energie neregenerabila.
Grafic tip streamgraph interactiv in functie de perioada de timp / autoupdate din API de la [Transelectrica](http://www.transelectrica.ro/widget/web/tel/sen-grafic/-/SENGrafic_WAR_SENGraficportlet)

Varianta actuala foloseste date in format CSV pentru anul 2015. Fisierul este incarcat de `dsv-loader` pentru webpack.

## Utile

  - [USA Nuclear Energy](https://github.com/gavinr/usa-nuclear-energy-plants/blob/master/usa-nuclear-energy-plants.geojson)
  - [EU Energy Stats](http://ec.europa.eu/eurostat/web/energy/data/main-tables)

## Tech stuff

### Setup

1. `npm install`
2. Create __./.env__ file and add environment variables if any (NODE_ENV)

### Dev frontend

1. `npm start` - starts the Webpack dev server with Hot Module Replacement enabled for __css__ and __js__ files
2. Open http://localhost:8080 in your browser

### Dev backend

1. Build with webpack before starting server, Node serves the files from __./build/__
2. `npm install -g nodemon`
3. `nodemon ./bin/www` - starts the server on http://localhost:5000

### Prod

1. `npm run build` - builds the project in __./build/__ with uglified js and caching ready js and css
