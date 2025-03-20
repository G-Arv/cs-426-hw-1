import { CAR_EMISSIONS_ESTIMATE, ELECTRICITY_EMISSIONS_ESTIMATE, WASTE_EMISSIONS_ESTIMATE } from "../carbon-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Legend, Tooltip, Label } from 'recharts';
import "./Chart.css";

function CarbonBarChart({ dailyEmissions }: any) {
    const averageData = [
        {name: "Vehicle", Daily: dailyEmissions[0], Average: CAR_EMISSIONS_ESTIMATE},
        {name: "Electricity", Daily: dailyEmissions[1], Average: ELECTRICITY_EMISSIONS_ESTIMATE}, 
        {name: "Waste", Daily: dailyEmissions[2], Average: WASTE_EMISSIONS_ESTIMATE}
    ];
        
    return (
        <div className="emissionsCharts">
            <h3 className="emissionsChartsHeader">Your Daily Emissions vs. Average Emissions</h3>

            <BarChart width={600} height={600} cx={300} cy={300} data={averageData}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis>
                    <Label 
                        style={{
                            textAnchor: "middle",
                            fontSize: "80%",
                            fill: "white",
                            marginBottom: "1.5em"
                        }}
                        angle={270}
                        value={"Carbon Dioxide Emissions (equivalent)"}
                    />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="Daily" stackId="daily" fill="mediumseagreen" />
                <Bar dataKey="Average" stackId="average" fill="thistle" />
            </BarChart>
        </div>
    )

}

export default CarbonBarChart