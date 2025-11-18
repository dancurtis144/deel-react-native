import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { PayslipItem } from '../types/PayslipTypes';
import sampleData from '../../assets/mock-data/sample-data.json';


export type AppContextValue = {
    payslips: PayslipItem[];
}

const defaultValue: AppContextValue = {
    payslips: [],
}

export const AppContext = createContext<AppContextValue>(defaultValue);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
    const [payslips, setPayslips] = useState<PayslipItem[]>([]);

    const initialValue = useMemo(() => ({ payslips, setPayslips }), [payslips, setPayslips]);

    useEffect(() => {
        setPayslips(sampleData)
    }, []);

    return (
        <AppContext.Provider value={initialValue}>
            {children}
        </AppContext.Provider>
    );
}