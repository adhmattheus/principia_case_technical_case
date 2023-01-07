
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import styles from './BarChart.module.css';
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,

} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels

);

export function BarChart() {

  const { extractByMonth, baddebtByMonth } = useContext(DataContext);
  const [inadimplencia, setInadimplencia] = useState();
  const [openValueTotal, setOpenValueTotal] = useState();
  const [paidValueTotal, setPaidValueTotal] = useState();
  const [totalValue, settotalValue] = useState();

  const labels = extractByMonth.map(
    function (index) {
      return index.mes;
    }
  );

  useEffect(() => {
    setInadimplencia(extractByMonth.map(
      function (item) {
        return parseFloat(item.inadimplencia);
      }
    ));

    setPaidValueTotal(extractByMonth.map(
      function (item) {
        return (parseFloat(item.totalValorPagoMes).toFixed(2));
      }
    ));

    setOpenValueTotal(extractByMonth.map(
      function (item) {
        return (parseFloat(item.totalValorAbertoMes).toFixed(2));
      }
    ));

    settotalValue(extractByMonth.map(
      function (item) {
        return (parseFloat(item.valorTotal).toFixed(2));
      }
    ));

  }, [baddebtByMonth]);

  const chartData = {
    labels,
    datasets: [
      {

        label: 'Valor Pago',
        data: paidValueTotal,
        borderColor: 'rgba(53, 235, 135, 0.712)',
        backgroundColor: 'rgba(53, 235, 135, 0.5)',
        borderWidth: 3,
        hoverBorderColor: ['#96ceff61'],
        hoverBorderWidth: 8
      },
      {
        label: 'Valor Aberto',
        data: openValueTotal,
        borderColor: 'rgba(235, 120, 53, 0.966)',
        backgroundColor: 'rgba(235, 96, 53, 0.5)',
        borderWidth: 3,
        hoverBorderColor: ['#96ceff61'],
        hoverBorderWidth: 8
      },

    ],

  };

  const options = {
    responsive: true,
    interaction: {
      intersect: true,
      mode: 'index',
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Mês',
          color: '#911',
          font: {
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'R$',
          color: '#191',
          font: {
            size: 20,
            style: 'normal',
            weight: 'bold',
            lineHeight: 1.2
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      }
    },
    plugins: {
      datalabels: {
        align: 'top',
        anchor: 'end',
        formatter: function (value) {
          return 'R$ ' + value;
        },
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
    <div className={styles.container} >
      <Bar
        options={options}
        data={chartData} />
    </div >
  )
}