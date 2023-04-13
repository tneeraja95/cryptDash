import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import highchartsAccessibility from "highcharts/modules/accessibility";

highchartsAccessibility(Highcharts);

function CurrencyChart({ coinChartData }) {
  console.log("inside currreny chart");
  let setPlotLines = true;

  function handleRangeChange(thisObj) {
    console.log(thisObj);
    let plotPointValue = thisObj.series[0].points[0].y;
    let yAxis = thisObj.yAxis[0];
    console.log(plotPointValue);
    yAxis.update({
      plotLines: [
        {
          color: "#000",
          width: 1,
          dashStyle: "dot",
          value: plotPointValue,
        },
      ],
    });
  }

  Highcharts.StockChart("container", {
    yAxis: {
      crosshair: true,
    },

    xAxis: {
      type: "datetime",
      crosshair: true,
    },

    time: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },

    series: [
      {
        name: "Prices",
        data: coinChartData.prices,
        zones: [
          {
            //     value: plotLineValue,
            color: "rgb(234, 57, 67)", //red
          },
          { color: "rgb(22, 199, 132)" },
        ],
        fillOpacity: 1,
      },
      // {name: "Market cap", data: coinChartData.market_caps},
    ],

    chart: {
      events: {
        click() {
          console.log("redraw is triggered");
          let plotPointValue = thisObj.series[0].data.find(
            (el) => el !== undefined
          ).y;
          handleRangeChange(this);
        },
        render() {
          console.log("render is triggered", setPlotLines);
          if (setPlotLines) {
            setPlotLines = false;
            handleRangeChange(this);
          }
        },
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        //  console.log(this);
        let dateTime = new Date(this.x);
        let date = dateTime.toLocaleDateString();
        let time = dateTime.toLocaleTimeString();
        return date + "      " + time + "\nPrice " + this.y; // + " \nVolume " + this.points[1].y;
      },
    },
    legend: {
      enabled: false,
    },

    rangeSelector: {
      allButtonsEnabled: true,
      selected: 0,
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
          title: "View 1 day",    
           events : {
            click: function(){console.log(this); setPlotLines=true}
          }
     
        },
        {
          type: "day",
          count: 7,
          text: "7d",
          title: "View 7 days",
          events : {
            click: function(){console.log(this); setPlotLines=true}
          }
        },
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 months",
          events : {
            click: function(){console.log(this); setPlotLines=true}
          }
     
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months",
          events : {
            click: function(){console.log(this); setPlotLines=true}
          }
     
        },
      ],
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div style={{ margin: "20px" }}>
      <div id="container" />
    </div>
  );
}

export default CurrencyChart;
