import { useNavigate, useLocation } from 'react-router-dom'
import { Journal, Activity } from './user/user-data'
import * as carbon from './carbon-data'
import './App.css'
import { ELECTRICITY_EMISSIONS } from './carbon-data'
import { WASTE_EMISSIONS } from './carbon-data'

function Calculate() {
    const location = useLocation()
    const navigate = useNavigate()

    const user = location.state;

    // Creates an activity for each vehicle entry
    // Return: Activity[]
    const determineVehicleCalculations = () => {
        const vehicleActivities: Activity[] = [];

        for(let i = 1; i < 4; ++i) {
            const vehicleInput = document.getElementById("vehicleInput" + i.toString()) as HTMLInputElement;
            const vehicleAmount = document.getElementById("vehicleAmount" + i.toString()) as HTMLInputElement;
            const vehicleActInput = vehicleInput?.value
            const vehicleMiles = vehicleAmount?.value;
            let vehicleEmission = -1;
            if(vehicleActInput.length != 0 && vehicleMiles != "") {
                if((vehicleActInput == "car" || vehicleActInput == "Car")) {
                    vehicleEmission = parseInt(vehicleMiles) * carbon.CAR_EMISSIONS;
                }
                else if ((vehicleActInput == "bus" || vehicleActInput == "Bus")) {
                    vehicleEmission = parseInt(vehicleMiles) * carbon.BUS_EMISSIONS;
                }
                else if (((vehicleActInput == "motorcycle" || vehicleActInput == "Motorcycle"))) {
                    vehicleEmission = parseInt(vehicleMiles) * carbon.MOTORCYCLE_EMISSIONS;
                }
                else {
                    const error = document.getElementById("calculateVehicleErrorDiv");
                    if(error) {
                        error.innerHTML = "Error with vehicle choice. Please enter a valid vehicle (car, bus, or motorcycle).\n";
                        error.style.color = "red";
                    }
                    const inputError = document.getElementById("vehicleInput" + i.toString());
                    if(inputError) {
                        inputError.style.backgroundColor = "lightcoral";
                    }
                }
                if(vehicleActInput && vehicleEmission != -1) {
                    const vehicleActivity: Activity = {
                        name: vehicleActInput,
                        type: "vehicle",
                        metric: vehicleEmission
                    }

                    const error = document.getElementById("calculateVehicleErrorDiv");
                    if(error) {
                        error.innerHTML = "";
                    }

                    vehicleActivities.push(vehicleActivity);
                }
            }
            else {
                if(vehicleActInput.length != 0 && vehicleMiles == "") {
                    const error = document.getElementById("calculateVehicleErrorDiv");
                    if(error) {
                        error.innerHTML = "Amount missing. Please enter an amount.\n";
                        error.style.color = "red";
                    }
                    const inputError = document.getElementById("vehicleAmount" + i.toString());
                    if(inputError) {
                        inputError.style.backgroundColor = "lightcoral";
                    }
                    return null;
                }
                else if(vehicleActInput.length == 0 && vehicleMiles != "") {
                    const error = document.getElementById("calculateVehicleErrorDiv")
                    if(error) {
                        error.innerHTML = "Vehicle missing. Please enter a valid vehicle (car, bus, or motorcycle).\n";
                        error.style.color = "red";
                    }
                    const inputError = document.getElementById("vehicleInput" + i.toString());
                    if(inputError) {
                        inputError.style.backgroundColor = "lightcoral"; 
                    }
                    return null;
                }
            }
        }

        if(vehicleActivities.length > 0) {
            return vehicleActivities;
        }
    }

     // Creates an activity for electricity
     // Return: Activity
    const determineElectricCalculations = () => {
        const electricInput = document.getElementById("electricInput1") as HTMLInputElement;
        const electricAmount = document.getElementById("electricAmount1") as HTMLInputElement;
        const electricActInput = electricInput?.value;
        const electricActAmount = electricAmount?.value;
        let electricEmission = -1;

        if(electricActInput.length != 0 && electricActAmount != "") {
            electricEmission = parseInt(electricActAmount) * ELECTRICITY_EMISSIONS;

            const electricActivity: Activity = {
                name: electricActInput,
                type: "electric",
                metric: electricEmission
            }
            const error = document.getElementById("calculateElectricErrorDiv");
            if(error) {
                error.innerHTML = "";
            }
            return electricActivity;
        }
        else if (electricActInput.length != 0 && electricActAmount == "") {
            const error = document.getElementById("calculateElectricErrorDiv");
            if(error) {
                error.innerHTML = "Electricity amount missing. Please enter the amount in dollars.\n";
                error.style.color = "red";
            }
            const inputError = document.getElementById("electricAmount1");
            if(inputError) {
                inputError.style.backgroundColor = "lightcoral"; 
            }
            return null;
        }
        else if(electricActInput.length == 0 && electricActAmount != "") {
            const error = document.getElementById("calculateElectricErrorDiv")
            if(error) {
                error.innerHTML = "Electricity name missing. Please enter a short description of electricity.\n";
                error.style.color = "red";
            }
            const inputError = document.getElementById("electricInput1")
            if(inputError) {
                inputError.style.backgroundColor = "lightcoral"; 
            }
            return null;
        }
    }

    // Creates an activity for waste
    // Return: Activity
    const determineWasteCalculations = () => {
        const wasteInput = document.getElementById("wasteInput1") as HTMLInputElement;
        const wasteAmount = document.getElementById("wasteAmount1") as HTMLInputElement;
        const wasteActInput = wasteInput?.value;
        const wasteActAmount = wasteAmount?.value;
        let wasteEmission = -1;

        if(wasteActInput.length != 0 && wasteActAmount != "") {
            wasteEmission = parseInt(wasteActAmount) * WASTE_EMISSIONS;
            const wasteActivity: Activity = {
                name: wasteActInput, 
                type: "waste",
                metric: wasteEmission
            }

            const error = document.getElementById("calculateWasteErrorDiv");
            if(error) {
                error.innerHTML = "";
            }

            return wasteActivity;
        }
        else if (wasteActInput.length != 0  && wasteActAmount == "") {
            const error = document.getElementById("calculateWasteErrorDiv");
            if(error) {
                error.innerHTML = "Waste amount missing. Please enter the amount in dollars.\n";
                error.style.color = "red";
            }
            const inputError = document.getElementById("wasteAmount1");
            if(inputError) {
                inputError.style.backgroundColor = "lightcoral"; 
            }
            return null;
        }
        else if(wasteActInput.length == 0  && wasteActAmount != "") {
            const error = document.getElementById("calculateWasteErrorDiv");
            if(error) {
                error.innerHTML = "Waste name missing. Please enter a short description of waste.\n";
                error.style.color = "red";
            }
            const inputError = document.getElementById("wasteInput1");
            if(inputError) {
                inputError.style.backgroundColor = "lightcoral"; 
            }
            return null;
        }
    }

    // Determines calculations for each input entered
    // Return: div
    const determineCalculations = () => {
        // Get the date to make a unique journal entry
        const today = new Date();

        // Create activities for each emission value
        let todaysActivities: Activity[] = [];
        let vehicleActivities = determineVehicleCalculations();
        let electricActivities = determineElectricCalculations();
        let wasteActivities = determineWasteCalculations();
        const error = document.getElementById("calculateErrorDiv");

        if(error?.textContent == "") {
            if(vehicleActivities && vehicleActivities.length > 0) {
                for(let i = 0; i < vehicleActivities.length; ++i) {
                    todaysActivities.push(vehicleActivities[i]);
                }
            }
            
            if(electricActivities) {
                todaysActivities.push(electricActivities);
            }
    
            if(wasteActivities) {
                todaysActivities.push(wasteActivities);
            }
    
            
            
            const dailyJournal: Journal = {
                day: today.getUTCDate(),
                month: today.getUTCMonth() + 1,
                year: today.getUTCFullYear(),
                activities: todaysActivities
            }
    
            user.journal.push(dailyJournal);
    
            localStorage.setItem(user.userName, JSON.stringify(user));
            navigate("/results", {state: user});
        }
    }

    return (
        <>
        <h1>Hi {user.userName}! Welcome to CarbonBuddy's Carbon Footprint Calculator!</h1>
        <h3>This calculator allows you to determine your daily carbon footprint in three categories:
            vehicle emissions, electricity emissions, and waste emissions. 
            For vehicle emissions, choose from either car, bus, or motorcycle emissions, and write
            the total amount in miles for each vehicle . 
            For electric emissions, write in the amount in dollars spent on electricity for today. 
            For waste emissions, write in the amount of waste in pounds thrown out for today.  
            Fill out each section and press submit when you're ready. 
        </h3>
        <div id="calculateErrorDiv">
            <div id="calculateVehicleErrorDiv"></div>
            <div id="calculateElectricErrorDiv"></div>
            <div id="calculateWasteErrorDiv"></div>
        </div>
        <div>
            <form className="calculationForm">
                <div id="vehicleContainer" className="calculationContainer">
                    <h4>Vehicle Emissions</h4>
                    <div className="calculationCard">
                        <div id="vehicleEmissions1">
                            <label className="calculationLabel">Vehicle:</label>
                            <input type="text" id="vehicleInput1" className="calculationInput"/> 
                            <label className="calculationLabel">Amount (miles):</label>
                            <input id="vehicleAmount1" className="calculationInput"/>
                        </div>
                        <div id="vehicleEmissions2">
                            <label className="calculationLabel">Vehicle:</label>
                            <input type="text" id="vehicleInput2" className="calculationInput"/> 
                            <label className="calculationLabel">Amount (miles):</label>
                            <input id="vehicleAmount2" className="calculationInput"/>
                        </div>
                        <div id="vehicleEmissions3">
                            <label className="calculationLabel">Vehicle:</label>
                            <input type="text" id="vehicleInput3" className="calculationInput"/> 
                            <label className="calculationLabel">Amount (miles):</label>
                            <input id="vehicleAmount3" className="calculationInput"/>
                        </div>
                    </div>
                </div>
                <div id="electricityContainer" className="calculationContainer">
                    <h4>Electricity Emissions</h4>
                    <div className="calculationCard">
                        <div id="electricityEmissions1">
                            <label className="calculationLabel">Item:</label>
                            <input type="text" id="electricInput1" className="calculationInput"/>
                            <label className="calculationLabel">Amount ($):</label>
                            <input id="electricAmount1" className="calculationInput"/> 
                        </div>
                    </div>
                </div>
                <div id="wasteContainer" className="calculationContainer">
                    <h4>Waste Emissions</h4>
                    <div className="calculationCard">
                        <div id="wasteEmissions1">
                            <label className="calculationLabel">Item:</label>
                            <input type="text" id="wasteInput1" className="calculationInput"/> 
                            <label className="calculationLabel">Amount (lb):</label>
                            <input id="wasteAmount1" className="calculationInput"/>
                        </div> 
                    </div>
                </div>
            </form>

        </div>
        <button onClick={() => determineCalculations()}>Submit</button>
        </>   
    )
}

export default Calculate