# CO2 emission visualizer tool

## Latest deployed version:

https://arcane-eyrie-52248.herokuapp.com/

## API endpoints:

### /api/countries

Lists all countries/areas and their codes

### /api/countries/:id

Lists all data for given country/area, id should be country's code i.e. Finland's code is fin

All codes can be seen from /api/countries

### /api/countries/emissions

Lists emissions of every country/area from each year

### /api/countries/populations

Lists populations of every country/area from each year

### /api/countries/cumulative

Lists cumulative emissions of every country from 1992 to 2014

### /api/countries/cumulative/:id

Returns cumulative emissions of a country speficied by id

### /api/countries/biggest/:year

Lists emissions of each country from specified year, ordered by highest emitters first

### /api/years

Lists all years that have any data
