import { useContext, useEffect, useState } from 'react';
import { DataContext } from './Context/DataContext';
import styles from './InputFile.module.css';
import Papa from 'papaparse';
import moment from 'moment/moment';
import 'moment/locale/pt-br'
moment.locale('pt-br');

function groupBy(array, key) {
  return array.reduce((acc, item) => {
    if (!acc[item[key]]) acc[item[key]] = [];
    acc[item[key]].push(item);
    return acc;
  }, {})
};

export function InputFile() {

  const { setDataFile, setExtractByMonth, setBaddebtByMonth, setTotalEnrollments } = useContext(DataContext);
  const [inputFileData, setinputFileData] = useState([]);

  useEffect(() => {
    const _amountEnrollments = ([...Array.from(new Set(inputFileData.map((item) => item.matricula)))]).length
    if (inputFileData.length) {
      setTotalEnrollments(_amountEnrollments);
    }
  }, [inputFileData]);


  const onChangeHandler = async (e) => {
    e.preventDefault();

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setinputFileData(results.data.map(item => {
          item.valor = Number(item.valor);
          item.mes = moment(item.mes).format('MMMM YYYY')
          return item;
        }));
      }
    });
  };

  useEffect(() => {
    const months = groupBy(inputFileData, "mes");
    const keys = Object.keys(months);
    const extractByMonth = [];
    const baddebtByMonth = [];

    for (let i = 0; i < keys.length; i++) {

      const keyI = keys[i];
      let _totalAmountOpen = 0;
      let _totalAmountOpenByMonth = 0;
      let _totalAmountPaidByMonth = 0;
      let _totalAmountPaid = 0;
      let _totalAmount = 0;

      _totalAmountOpenByMonth += months[keyI]
        .filter((item) => item.status == "aberto")
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);
      _totalAmountPaidByMonth += months[keyI]
        .filter((item) => item.status == "pago")
        .reduce((acc, item) => acc + parseFloat(item.valor), 0);

      console.log(Number(_totalAmountOpenByMonth) + Number(_totalAmountOpenByMonth));

      for (let j = 0; j <= i; j++) {
        const keyJ = keys[j];
        _totalAmountOpen += months[keyJ]
          .filter((item) => item.status == "aberto")
          .reduce((acc, item) => acc + parseFloat(item.valor), 0);

        _totalAmountPaid += months[keyJ]
          .filter((item) => item.status == "pago")
          .reduce((acc, item) => acc + parseFloat(item.valor), 0);

        _totalAmount += months[keyJ]
          .reduce((acc, item) => acc + parseFloat(item.valor), 0);
      }

      let inadimplencia = Number((_totalAmountOpen / _totalAmount).toFixed(3));


      extractByMonth.push({
        mes: keyI,
        totalValorPagoMes: _totalAmountPaidByMonth,
        totalValorAbertoMes: _totalAmountOpenByMonth,
        totalValorPago: _totalAmountPaid,
        totalValorAberto: _totalAmountOpen,
        valorTotal: _totalAmount,
        inadimplencia: inadimplencia,
      });

      baddebtByMonth.push({
        mes: keyI,
        inadimplencia: inadimplencia,
      });
    };
    if (inputFileData.length) {
      setDataFile(inputFileData);
      setBaddebtByMonth(baddebtByMonth);
      setExtractByMonth(extractByMonth);
    };
  }, [inputFileData]);

  return (
    <div className={styles.container}>
      <input type="file"
        name="file"
        accept=".csv"
        onChange={onChangeHandler}
      />
    </div>
  )
}