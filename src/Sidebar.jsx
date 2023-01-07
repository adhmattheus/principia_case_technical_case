import { ArrowDown, ArrowUp, CalendarCheck, ChartBar, CodepenLogo, FileCsv, Student, Table, Users, Warning } from "phosphor-react";
import { TableDataMonth } from "./Components/TableDataMonth";
import { LineChart } from "./Components/LineChart";
import { TableData } from "./Components/TableData";
import { BarChart } from "./Components/BarChart";
import { InputFile } from "./InputFile";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context/DataContext";
import styles from './Sidebar.module.css';
import { DoughnutChart } from "./Components/DoughnutChart";

function sumArray(array) {
  for (var index = 0, length = array.length, sum = 0;
    index < length; sum += array[index++]
  );
  return sum;
};

export function Sidebar() {

  const { extractByMonth, totalEnrollments } = useContext(DataContext);
  const [amountMonths, setAmountMonths] = useState('');
  const [amountEnrollments, setAmountEnrollments] = useState();
  const [openValueTotal, setOpenValueTotal] = useState('');
  const [paidValueTotal, setPaidValueTotal] = useState('');
  const [baddebetTotal, setbaddebetTotal] = useState();


  useEffect(() => {
    setbaddebetTotal(Number((((Number(openValueTotal) / (Number(openValueTotal) + Number(paidValueTotal)))) * 100).toFixed(2)));
  }, [paidValueTotal, openValueTotal])

  useEffect(() => {
    setAmountEnrollments(totalEnrollments);
  }, [totalEnrollments]);

  useEffect(() => {
    const openTotal = extractByMonth.map(
      function (item) {
        return parseFloat(item.totalValorAbertoMes);
      }
    );
    setOpenValueTotal(sumArray(openTotal).toFixed(2));

    const paidTotal = extractByMonth.map(
      function (item) {
        return parseFloat(item.totalValorPagoMes);
      }
    );
    setPaidValueTotal(sumArray(paidTotal).toFixed(2));
  }, [extractByMonth]);

  useEffect(() => {
    setAmountMonths(extractByMonth.length)
  }, [extractByMonth]);


  return (
    <>

      <div className={styles.sidebar}>

        <div className={styles.sidebar_logo}>
          <CodepenLogo size={32} weight="bold" />
          <h2>Princípia</h2>
        </div>

        <div className={styles.sidebar_menu}>


          <li><a href="" className={styles.active}>
            <ChartBar size={32} />
            <span>Dashboard</span></a>
          </li>
          <li><a href=""><Table size={32} />
            <span>Tabela de dados</span></a>
          </li>
          <li><a href="">
            <Users size={32} />
            <span>Matrículas</span></a>
          </li>

        </div>
      </div>

      <div className={styles.main_container}>

        <header>
    
          <div className={styles.updatefile}>
            <span> <FileCsv size={32} /></span>
            <InputFile />
          </div>

          <div className={styles.user_wrapper}>
            <img src="https://www.shutterstock.com/image-photo/
            beautiful-businesswoman-sit-workplace-office-600w-410689738.jpg"
              alt="" width="40px" height="40px" />

            <div>
              <h4>user person</h4>
              <small>Admin</small>
            </div>

          </div>
        </header >

        <main>

          <div className={styles.dashboard}>

            <div className={styles.cards}>
              <div className={styles.card_single}>
                <div>
                  <h1>{amountMonths}</h1>
                  <span>Meses</span>
                </div>
                <div>
                  <span><CalendarCheck /></span>
                </div>
              </div>

              <div className={styles.card_single}>
                <div>
                  <h1>{amountEnrollments}</h1>
                  <span>Matriculas</span>
                </div>
                <div>
                  <span><Student /></span>
                </div>
              </div>

              <div className={styles.card_single}>
                <div>
                  <h2>R$ {paidValueTotal}</h2>
                  <span>Total Pago</span>
                </div>
                <div>
                  <span><ArrowUp /></span>
                </div>
              </div>


              <div className={styles.card_single}>
                <div>
                  <h2>R$ {openValueTotal}</h2>
                  <span>Total Aberto</span>
                </div>
                <div>
                  <span><ArrowDown /></span>
                </div>
              </div>

              <div className={styles.card_single}>
                <div>
                  {extractByMonth.length === 0 ? <h2>-</h2> : (
                    <h2>{baddebetTotal} %</h2>
                  )}
                  <span>Total Inadimplência</span>
                </div>
                <div>
                  <span><Warning /></span>
                </div>
              </div>

            </div>

            <div className={styles.barchart}>
              <BarChart />
              <div className={styles.second_chart}>
                <LineChart />
                <DoughnutChart />
              </div>

            </div>

            <div className={styles.table}>
              <TableData />
              <TableDataMonth />
            </div>
          </div>

        </main>
      </div >
    </>
  )
}