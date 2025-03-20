/*
    Sources:

    Bus and Motorcycle Emissions: https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf
*/


/* Emissions Values */
const CAR_EMISSIONS = 19.37; // this is in lb CO2/gallon of gasoline
const BUS_EMISSIONS = 0.1455; //this is in lb CO2/mile per passenger
const MOTORCYCLE_EMISSIONS = 0.8113; //this is in lb CO2/mile 
const WASTE_EMISSIONS = 0.7715; // this is in metric tons CO2/short ton, which I'll try to change
const ELECTRICITY_EMISSIONS = 0.82752; // this is an estimate in general, daily consumption would be multiplied by this and would be assumed as individual

/* Estimate Values */
const CAR_EMISSIONS_ESTIMATE = 23.21; // this is the average amount of emissions per day in lb CO2e/vehicle
const ELECTRICITY_EMISSIONS_ESTIMATE = 9.54; // estimate of electricity emissions per day and is in lb CO2e/person
const WASTE_EMISSIONS_ESTIMATE = 2.2521; // estimate of average waste one throws away per day in lb CO2e/person

export {CAR_EMISSIONS, BUS_EMISSIONS, MOTORCYCLE_EMISSIONS, WASTE_EMISSIONS, ELECTRICITY_EMISSIONS, CAR_EMISSIONS_ESTIMATE, ELECTRICITY_EMISSIONS_ESTIMATE, WASTE_EMISSIONS_ESTIMATE }