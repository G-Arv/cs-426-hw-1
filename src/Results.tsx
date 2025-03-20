import { useLocation } from 'react-router-dom'
import { Journal } from './user/user-data'
import './App.css'
import CarbonBarChart from './components/CarbonBarChart'
import CarbonPieChart from './components/CarbonPieChart'
import Menu from './components/Menu'

function Results() {
    const location = useLocation();

    let user = location.state;

    // Variables for setting values listed below
    let totalEmissions = 0
    let greatestEmissions = "none"
    let lowestEmissions = "none"

    // Functions for determining each
    // Determines if today's date can be found for the user's entries
    // Return: []
    const findDate = () => {
        if(user.journal.length == 0) {
            return [];
        }
        else {
            const entries = user.journal;
            const today = new Date();
            const day = today.getUTCDate();
            const month = today.getUTCMonth() + 1;
            const year = today.getUTCFullYear();
            let entryForToday: Journal[] = []
            console.log(user.journal)
            for(let h = 0; h < entries.length; ++h) {
                console.log(entries[h]);
                if(entries[h].day == day && entries[h].month == month && entries[h].year == year) {
                    entryForToday.push(entries[h]);
                }
            }
            return entryForToday;
        }
    };

    // Determines the total emissions for a day for a user
    // Return: number
    const determineTotalEmissions = () => {
        let total = 0;
        const entryForToday = findDate();

        if(entryForToday.length == 0) {
            return -1;
        }
        else {
            for(let i = 0; i < entryForToday.length; ++i) {
                let activities = entryForToday[i].activities;
               for(let j = 0; j < activities.length; ++j) {
                    total += activities[j].metric;
               }
            }
            return total
        }
    };

    // Determines the total vehicle, eletric, and waste emissions
    // Return: [string, string, string]
    const determineEachEmission = () => {
        const entryForToday = findDate();

        if(entryForToday.length == 0) {
            return [];
        }
        else {
            let vehicleEmissionsTotal = 0;
            let electricEmissionsTotal = 0;
            let wasteEmissionsTotal = 0;

            for(let i = 0; i < entryForToday.length; ++i) {
                let activities = entryForToday[i].activities;
               for(let j = 0; j < activities.length; ++j) {
                    if(activities[j].type == "vehicle") {
                        vehicleEmissionsTotal += activities[j].metric;
                    }
                    else if(activities[j].type == "electric") {
                        electricEmissionsTotal += activities[j].metric;
                    }
                    else if(activities[j].type == "waste") {
                        wasteEmissionsTotal += activities[j].metric;
                    }
               }
            }

            return [vehicleEmissionsTotal, electricEmissionsTotal, wasteEmissionsTotal];
        }
    }

    // Determines the highest and lowest emissions for a day for a user
    // Return: [string, string]
    const determineLowAndHighEmissions = () => {
        let lowest = "";
        let highest = "";

        const eachEmission = determineEachEmission();

        if(eachEmission && eachEmission.length == 0) {
            return ["", "", ""];
        }
        else {
            // Sets highest value
            if(eachEmission[0] >= eachEmission[1] && eachEmission[0] >= eachEmission[2]) {
                highest = "Vehicle";
            }
            else if(eachEmission[1] >= eachEmission[0] && eachEmission[1] >= eachEmission[2]) {
                highest = "Electric";
            }
            else if(eachEmission[2] >= eachEmission[0] && eachEmission[2] >= eachEmission[1]) {
                highest = "Waste";
            }
            else {
                highest = "Multiple";
            }

            // Sets lowest value
            if(eachEmission[0] <= eachEmission[1] && eachEmission[0] <= eachEmission[2]) {
                lowest = "Vehicle";
            }
            else if(eachEmission[1] <= eachEmission[0] && eachEmission[1] <= eachEmission[2]) {
                lowest = "Electric";
            }
            else if(eachEmission[2] <= eachEmission[0] && eachEmission[2] <= eachEmission[1]) {
                lowest = "Waste";
            }
            else {
                lowest = "Multiple";
            }

            return [lowest, highest];
        } 
    }

    // Setting values for variables
    totalEmissions = determineTotalEmissions()

    const emissionLowAndHigh = determineLowAndHighEmissions();
    greatestEmissions = emissionLowAndHigh[1];
    lowestEmissions = emissionLowAndHigh[0];
    const eachTypeEmission = determineEachEmission();

    // Determines the contents of the paragraph tag below depending on whether the user has data to display
    const emissionsResultsPGraph = () => {
        let paragraph: any = document.getElementById("emissionsResultsPGraph");

        if(paragraph && totalEmissions == -1) {
            paragraph = "No results to display.";
        }
        else if(paragraph) {
            paragraph = "Your daily total emissions was " + totalEmissions 
            + "lb CO<sub>2</sub> e. Your emissions was greatest in the " 
            + greatestEmissions + " category, and your lowest emissions is in the "
            + lowestEmissions + " category.  Below is a pie chart which displays the percentages" +
            " of your CO<sub>2</sub> emissions and a bar chart depicting your daily "
            + "emissions in comparison to the average emissions per day for an individual in the United States.";
        }
    }

    emissionsResultsPGraph();

    return (
        <>
        <Menu page={["resources", "profile", JSON.stringify(user)]}/>
        <h1>Hi {user.userName}! Here are your results from your carbon footprint calculator.
        </h1>
        <h3>Click on Resources to learn more about ways to reduce your carbon footprint from experts 
            around the world, or click logout to exit the application.
        </h3>
        <p id="emissionsResultsPGraph"></p>
        <div>
                <CarbonPieChart dailyEmissions={[
                    {name: "Vehicle", emission: eachTypeEmission[0]},
                    {name: "Electric", emission: eachTypeEmission[1]},
                    {name: "Waste", emission: eachTypeEmission[2]}
                ]} />
                <CarbonBarChart dailyEmissions={eachTypeEmission}/>
        </div>
        </>
    )
}

export default Results