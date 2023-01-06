
import styles from './App.module.css'
import { DataProvider } from './Context/DataContext';
import { Sidebar } from './Sidebar';

function App() {
  return (
    <DataProvider>
      <Sidebar />
    </DataProvider>


  )
}
export default App;