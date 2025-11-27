import { ChartData, ChartOptions, Point } from "chart.js";
import { useEffect, useState } from "react";

//variables
const textColor = "#aaa";
const opacityColor = "rgba(255,255,255,0.1)";
const maxStepLength = 5;
const firstAndLastLength = 2;
const isLabelAvailable = false;
const CHART_MIN_VALUE = 15000;
const CHART_MAX_VALUE = 19000;
const NUM_POINTS = 60;
const INTERVAL_TIME = 2000;

// HELPER functions
function createTimeGenerator(numSteps: number = NUM_POINTS) {
  let current = new Date();
  const start = new Date(current);
  start.setMinutes(start.getMinutes() - (numSteps - 1));
  return () => {
    const timeStr = start.toTimeString().slice(0, 5);
    start.setMinutes(start.getMinutes() + 1);
    return timeStr;
  };
}

const getMinusVal = (number: number, length: number) => {
  const ratio = Math.floor(length / number);
  return ratio >= 2 ? ratio : 1;
};

// show calculated date labels
const getLabelIndexes = function getIndicesElements(dates: string[]) {
  let minus = dates?.length > 16 ? getMinusVal(20, dates.length) : 0;

  if (dates && dates.length > 7) {
    const indices = [];
    const firstElIdx = 0;
    const lastElIdx = dates.length - 1;
    const steps = Math.floor((dates.length - firstAndLastLength) / maxStepLength);
    let currentStep = 0;
    let bool = false;
    for (let i = 0; i < maxStepLength; i++) {
      currentStep = bool ? currentStep + steps : currentStep + steps - minus;
      indices.push(dates[currentStep]);
      bool = !bool;
    }
    const indexes = indices.map((idx) => dates.indexOf(idx));

    return [firstElIdx, ...indexes, lastElIdx];
  } else return dates?.map((idx) => dates.indexOf(idx));
};

const useChartData = (selectedCoin: string, minValue = CHART_MIN_VALUE, maxValue = CHART_MAX_VALUE) => {
  const [realMockData, setRealMockData] = useState<ChartData<"line", (number | Point | null)[], unknown>>();

  // Generate an array of mock data
  const generateRandomData = (numDatasets = 1, numPoints = NUM_POINTS) => {
    const getTime = createTimeGenerator();

    const randomNumbers = (length: number, min = minValue, max = maxValue) =>
      Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    return {
      dates: Array.from({ length: numPoints }, getTime),
      data: Array.from({ length: numDatasets }, () => ({
        name: selectedCoin,
        data: randomNumbers(numPoints),
      })),
    };
  };

  const generateAdditionalData = (numPoints = 1) => {
    const getTime = createTimeGenerator(numPoints);

    const randomNumbers = (length: number, min = minValue, max = maxValue) =>
      Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    // Generate mock data
    return {
      // adding only 1 new date
      dates: [getTime()],
      data: {
        name: selectedCoin,
        data: randomNumbers(numPoints),
      },
    };
  };

  //mock data
  const mockData = generateRandomData();

  const { dates, data } = mockData;

  const chartData: ChartData<"line"> = {
    labels: dates,

    datasets: data.map(({ data, name }) => {
      return {
        backgroundColor: (ctx, _opts) => {
          const { ctx: canvas, chartArea } = ctx.chart;
          if (!chartArea) return undefined;
          const gradient = canvas.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "rgba(255, 200, 0, 0)");
          gradient.addColorStop(1, "rgba(255, 200, 0, 0.05)");
          return gradient;
        },
        fill: true,
        tension: 0.1,
        pointBackgroundColor: "white",
        pointRadius: 0,
        label: name,
        data,
        borderColor: "#ECBD75",
      };
    }),
  };

  useEffect(() => {
    setRealMockData(chartData);

    // UPDATE INTERVAL: REMOVE FIRST DATA & ADD NEW DATA
    const interval = setInterval(() => {
      const newData = generateAdditionalData();

      setRealMockData((prev) => {
        if (!prev) return prev;

        // Ensure labels stay at most NUM_POINTS by keeping the last NUM_POINTS entries
        const prevLabels = (prev.labels as string[]) ?? [];
        const combinedLabels = [...prevLabels, ...newData.dates];
        const labels = combinedLabels.slice(-NUM_POINTS);

        // Append new point(s) to each dataset and trim to last NUM_POINTS
        const datasets = prev.datasets.map((dataset) => {
          const prevPoints = (dataset.data as (number | Point | null)[]) ?? [];
          const appended = [...prevPoints, ...(newData.data.data as number[])];
          const trimmed = appended.slice(-NUM_POINTS);
          return { ...dataset, data: trimmed };
        });

        return { ...prev, labels, datasets };
      });
    }, INTERVAL_TIME);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  // CHART OPTIONS
  const options: ChartOptions<"line"> = {
    datasets: {
      line: {
        pointBorderColor: "rgba(0, 0, 0, 0)",
        pointBackgroundColor: "rgb(0,0,0,0)",
        pointHitRadius: 50,
        fill: true,
        borderWidth: 2,
        borderJoinStyle: "miter",
        pointBorderWidth: 5,
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
        animation: {
          duration: 0,
        },
      },
    },

    plugins: {
      tooltip: {
        titleColor: "#fff",
        backgroundColor: "#222",

        borderColor: opacityColor,
        titleFont: { size: 20 },
        bodyFont: {
          size: 14,
          weight: "bold",
          lineHeight: 1.2,
        },
        bodyColor: "#ECBD75",
        usePointStyle: false,
        padding: {
          x: 16,
          y: 14,
        },
        boxHeight: 0,
        boxWidth: 0,
      },

      legend: {
        display: isLabelAvailable,
        position: "top",
        align: "start",
        onHover: function (e: any) {
          e.native.target.style.cursor = "pointer";
        },
        onLeave: function (e: any) {
          e.native.target.style.cursor = "default";
        },

        labels: {
          padding: 12,
          useBorderRadius: true,
          color: textColor,
          pointStyleWidth: 23,
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: {
        border: {
          color: "rgb(255,255,255,0.1)",
        },
        beginAtZero: true,
        ticks: {
          align: "inner",
          maxTicksLimit: 7,
          color: textColor,
          font: { size: 12 },
          callback(_: any, index: number) {
            let idxs = getLabelIndexes(dates);
            if (idxs.includes(index)) return dates[index];
            return null;
          },
        },
        grid: {
          color: "transparent",
          tickColor: opacityColor,
        },
      },
      y: {
        min: minValue,
        max: maxValue,

        border: {
          color: "rgb(255,255,255,0.1)",
        },
        position: "right",
        beginAtZero: true,

        ticks: {
          align: "inner",
          color: textColor,
          padding: 10,
          maxTicksLimit: 5,
          stepSize: 1,
        },
        grid: {
          color: "transparent",
          tickColor: opacityColor,
        },
      },
    },
    responsive: true,
    aspectRatio: 3 / 1,
  };

  return { realMockData, options };
};

export default useChartData;
