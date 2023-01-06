import { useContext, useEffect } from 'react';
import { DataContext } from '../Context/DataContext';
import styles from './TableData.module.css'

export function TableData() {

  const { dataFile } = useContext(DataContext);

  useEffect(() => {
    //processa dataFile e salva as variaveis de estado

  }, []);

  return (
    
    <div className={styles.card}>
      <div className={styles.card_header}>
        <h3>Dados da Planilha</h3>
      </div>

      <div className={styles.card_body}>
        <div className={styles.table_responsive}>
          <table width='100%'>
            <thead>
              <tr>
                <td>Matricula</td>
                <td>Mes</td>
                <td>Valor</td>
                <td>status</td>

              </tr>
            </thead>
            <tbody>

              {dataFile.length > 0 ? dataFile.map(item => (
                <tr key={JSON.stringify(item)}>
                  <td>{item.matricula}</td>
                  <td>{item.mes}</td>
                  <td>R$ {item.valor}</td>
                  <td>{item.status}</td>
                </tr>
              )) : <h2>sem dados</h2>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}