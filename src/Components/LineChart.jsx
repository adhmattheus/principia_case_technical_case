import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContext';
import styles from './LineChart.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart() {

  const { extractByMonth, baddebtByMonth } = useContext(DataContext);
  const [inadimplencia, setInadimplencia] = useState();

  const labels = extractByMonth.map(
    function (index) {
      return index.mes;
    }
  );

  useEffect(() => {
    setInadimplencia(baddebtByMonth.map(
      function (item) {
        return item.inadimplencia
      }
    ));
  }, [baddebtByMonth]);


  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Inadimplência',
        data: inadimplencia,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(0, 68, 255, 0.5)',
      },

    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Mês',
          color: '#911',
          font: {
            weight: 'bold',
            size: 20,
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Inadimplência',
          color: '#191',
          font: {
            weight: 'bold',
            size: 20,
            style: 'normal',
            lineHeight: 1.2,
            tension: 2
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <div className={styles.container} >
      <Line options={options} data={data} />
    </div >
  )
}