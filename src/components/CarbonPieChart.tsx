import { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import "./Chart.css";

function CarbonPieChart({ dailyEmissions }: any) {
    const [active, setActive] = useState(-1);
    
    const colors = ["darkolivegreen", "coral", "rosybrown"];

    const pieEnter = (_: any, index: any) => {
        setActive(index);
    };

    const renderLabel = (type: any) => {
        return type.name;
    }
    
    return( 
        <div className="emissionsCharts">
            <h3 className="emissionsChartsHeader">Daily Emissions Pie Chart</h3>
             <PieChart width={600} height={600}>
                <Pie
                    activeIndex={active}
                    data={dailyEmissions}
                    cx={300}
                    cy={300}
                    dataKey="emission"
                    label={renderLabel}
                    outerRadius={200}
                    fill="green"
                    onMouseEnter={pieEnter}
                    style={{ cursor: 'pointer', outline: 'none' }}
                >
                    {dailyEmissions.map((entry: any, index: any) => (
                        <Cell key={`${entry}-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    )
}

export default CarbonPieChart