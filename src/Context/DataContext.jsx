import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [dataFile, setDataFile] = useState(() => {
    const file = localStorage.getItem('@principia@dataFile');

    if (file) {
      return JSON.parse(file);
    }
    return {};
  });

  const [extractByMonth, setExtractByMonth] = useState(() => {
    const fileExtractByMonth = localStorage.getItem('@principia@extractByMonth');

    if (fileExtractByMonth) {
      return JSON.parse(fileExtractByMonth);
    }
    return []
  });

  const [baddebtByMonth, setBaddebtByMonth] = useState(() => {
    const fileBaddebtByMonth = localStorage.getItem('@principia@baddebtByMonth');

    if (fileBaddebtByMonth) {
      return JSON.parse(fileBaddebtByMonth);
    }
    return [];
  });


  const [totalInadimplencia, setTotalInadimplencia] = useState(() => {
    const inadimplencia = localStorage.getItem('@principia@inadimplencia');

    if (!inadimplencia) return [];

    return JSON.parse(inadimplencia)
  });

  const [totalEnrollments, setTotalEnrollments] = useState(() => {
    const resultTotalEnrollments = localStorage.getItem('@principia@totalEnrollments');

    if (resultTotalEnrollments) {
      return JSON.parse(resultTotalEnrollments);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('@principia@totalEnrollments', JSON.stringify(totalEnrollments));
  }, [totalEnrollments]);

  useEffect(() => {
    localStorage.setItem('@principia@dataFile', JSON.stringify(dataFile));
  }, [dataFile]);

  useEffect(() => {
    localStorage.setItem('@principia@extractByMonth', JSON.stringify(extractByMonth));
  }, [extractByMonth]);

  useEffect(() => {
    localStorage.setItem('@principia@baddebtByMonth', JSON.stringify(baddebtByMonth));
  }, [baddebtByMonth]);

  return (
    <DataContext.Provider value={{ dataFile, setDataFile, extractByMonth, setExtractByMonth, baddebtByMonth, setBaddebtByMonth, totalInadimplencia, setTotalInadimplencia, totalEnrollments, setTotalEnrollments }}>
      {children}
    </DataContext.Provider>
  )
}