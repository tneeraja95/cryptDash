import Highcharts from "highcharts/highstock";
import highchartsAccessibility from "highcharts/modules/accessibility";

highchartsAccessibility(Highcharts);

function CurrencyChart(coinChartData) {
  let setPlotLines = true;

  function handleRangeChange(thisObj) {
    let plotPointValue = thisObj.series[0].points[0].y;
    let yAxis = thisObj.yAxis[0];

    thisObj.series[0].update({ threshold: plotPointValue });

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
        negativeColor: "rgba(234, 57, 67)",
        color: "rgb(22, 199, 132)",
        fillColor: "rgb(22, 199, 132, 0.1)",
        negativeFillColor: "rgb(234, 57, 67, 0.1)",
      },
    ],

    chart: {
      type: "area",
      events: {
        render() {
          if (setPlotLines) {
            setPlotLines = false;
            handleRangeChange(this);
          }
        },
      },
    },

    navigator: {
      series: {
        color: "#EFF2F5",
        fillColor: "#EFF2F5",
      },
    },

    tooltip: {
      shared: true,
      useHTML: true,
      formatter: function () {
        let dateTime = new Date(this.x);
        let date = dateTime.toLocaleDateString();
        let time = dateTime.toLocaleTimeString();
        return date + "      " + time + "\nPrice " + this.y; // + " \nVolume " + this.points[1].y;
      },
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
          events: {
            click: function () {
              setPlotLines = true;
            },
          },
        },
        {
          type: "day",
          count: 7,
          text: "7d",
          title: "View 7 days",
          events: {
            click: function () {
              setPlotLines = true;
            },
          },
        },
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 months",
          events: {
            click: function () {
              setPlotLines = true;
            },
          },
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months",
          events: {
            click: function () {
              setPlotLines = true;
            },
          },
        },
      ],
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1000,
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
}

export default CurrencyChart;
