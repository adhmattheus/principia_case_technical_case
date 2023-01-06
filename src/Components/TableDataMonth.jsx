import styles from './TableDataMonth.module.css';
import { DataContext } from '../Context/DataContext';
import { useContext } from 'react'

export function TableDataMonth() {

  const { extractByMonth } = useContext(DataContext);

  return (

    <div className={styles.card}>
      <div className={styles.card_header}>
        <h3>Extrato da Planilha</h3>
      </div>

      <div className={styles.card_body}>
        <div className={styles.table_responsive}>
          <table width='100%'>
            <thead>

              <tr>
                <td>Mês</td>
                <td>Valor Pago</td>
                <td>Valor em Aberto</td>
                <td>Valor Total</td>
                <td>Inadimplência</td>
              </tr>

            </thead>
            <tbody>

              {extractByMonth.length > 0 ? extractByMonth.map(item => (
                <tr key={JSON.stringify(item)}>

                  <td>{item.mes}</td>
                  <td>R$ {item.totalValorPago}</td>
                  <td>RS {item.totalValorAberto}</td>
                  <td>RS {item.valorTotal}</td>
                  <td>{item.inadimplencia}</td>
                </tr>
              )) : <h2>sem dados</h2>}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  ); F
}