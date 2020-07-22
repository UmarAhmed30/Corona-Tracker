import React from "react";
import {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line,Bar} from "react-chartjs-2";
import styles from "./Chart.module.css";

function Chart({data:{confirmed,recovered,deaths}, country}) {

    const [dailyData, setDailyData] = useState([]);
    
    useEffect(()=>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? 
        (<Line
            data={{
                labels:dailyData.map(({date}) => date),
                datasets:[{
                    data:dailyData.map(({deaths}) => deaths),
                    label:'Deaths',
                    borderColor:'#3333ff',
                    fill:true,
                },{
                    data:dailyData.map(({confirmed}) => confirmed),
                    label:'Confirmed',
                    borderColor:'rgba(255, 0, 0, 0.5)',
                    fill:true,
                }]
            }}
        />) 
        : 
        null
    );

    var v1;
    var v2;
    var v3;

    if(confirmed){
        v1 = confirmed.value;
    }

    if(recovered){
         v2 = recovered.value;
    }

    if(deaths){
        v3 = deaths.value;
    }

    console.log(v1,v2,v3);

    const barChart = (
        confirmed
        ? 
        <Bar 
            data={{
                labels : ['Infected', 'Recovered' ,'Deaths'],
                datasets : [{
                    label : 'People',
                    backgroundColor:['rgb(155,89,182)','rgb(46,204,113)','rgb(231,76,60)'],
                    data : [ v1, v2, v3 ]
                }]
            }}

            options={{
                legend : {display:false},
                title : {display:true, text:`Current state in ${country}`},
            }}
        />
        : 
        null
    )

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;