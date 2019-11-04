# CO2 emission visualizer tool

## Latest deployed version:

https://arcane-eyrie-52248.herokuapp.com/

## API endpoints:

### /api/v1/countries

Lists all countries/areas and their codes

### /api/v1/countries/:id

Lists all data for given country/area, id should be country's code i.e. Finland's code is fin

All codes can be seen from /api/countries

### /api/v1/countries/emissions

Lists emissions of every country/area from each year

### /api/v1/countries/populations

Lists populations of every country/area from each year

### /api/v1/countries/cumulative

Lists cumulative emissions of every country from 1992 to 2014

### /api/v1/countries/cumulative/:id

Returns cumulative emissions of a country speficied by id

### /api/v1/countries/biggest/:year

Lists emissions of each country from specified year, ordered by highest emitters first

### /api/v1/years

Lists all years that have any data
