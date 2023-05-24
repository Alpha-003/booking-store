import { DataInterface } from "@/pages";
import React, { createContext } from "react";
import { useState } from "react";
import { PropsWithChildren } from "react";



export interface InterfaceDataContext {
  OpenCTA: boolean;
  setOpenCTA: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedUnit: DataInterface;
  setSelectedUnit: React.Dispatch<React.SetStateAction<DataInterface>>;

}



const defualts = {
  OpenCTA: false,
  setOpenCTA: () => { },
  SelectedUnit: {
    id: -1,
    description: "",
    code: "",
    monthly_rack_rate: -1,
    type_category: "",
    size_category: "",
    total_vacant: -1,
    length: -1,
    width: -1,
  },
  setSelectedUnit: () => { }



}


const DataContext = React.createContext<InterfaceDataContext>(defualts);

export const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [OpenCTA, setOpenCTA] = useState<boolean>(false);
  const [SelectedUnit, setSelectedUnit] = useState<DataInterface>(defualts.SelectedUnit);

  return (
    <DataContext.Provider value={{ OpenCTA, setOpenCTA, SelectedUnit, setSelectedUnit }}>
      {children}
    </DataContext.Provider >
  );
};

export default DataContext;
