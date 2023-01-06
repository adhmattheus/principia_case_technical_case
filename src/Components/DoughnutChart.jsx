
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import styles from './BarChart.module.css';
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function DoughnutChart() {

  const { extractByMonth, baddebtByMonth } = useContext(DataContext);
  const [inadimplencia, setInadimplencia] = useState();
  const [openValueTotal, setOpenValueTotal] = useState();
  const [paidValueTotal, setPaidValueTotal] = useState();

  const labels = extractByMonth.map(
    function (index) {
      return index.mes;
    }
  );

  useEffect(() => {
    setInadimplencia(extractByMonth.map(
      function (item) {
        return ((parseFloat(item.inadimplencia)) * 100).toFixed(2);
      }
    ));

    setPaidValueTotal(extractByMonth.map(
      function (item) {
        return parseFloat(item.totalValorPago);
      }
    ));

    setOpenValueTotal(extractByMonth.map(
      function (item) {
        return parseFloat(item.totalValorAberto);
      }
    ));

  }, [baddebtByMonth]);

  const chartData = {
    labels: labels,
    datasets: [
      {

        label: 'Inadimplência',
        data: inadimplencia,
        borderColor: 'rgba(255, 255, 255, 0.267)',
        backgroundColor: [
          'rgba(233, 105, 31, 0.63)',
          'rgba(31, 233, 31, 0.63)',
          'rgba(196, 233, 31, 0.63)',
          'rgba(233, 31, 189, 0.63)',
          'rgba(31, 233, 223, 0.63)',
        ],
        borderWidth: 5,
        hoverBorderColor: ['#96ceff61'],
        hoverBorderWidth: 10
      },

    ],
  };

  const options = {
    responsive: true,

    plugins: {
      datalabels: {
        formatter: function (value) {
          return value + ' %';
          // eq. return ['line1', 'line2', value]
        }
      },
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  return (
    <div className={styles.container}>
      <Doughnut
        options={options}
        data={chartData} />
    </div>
  )
}