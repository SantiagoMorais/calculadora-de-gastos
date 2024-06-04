import { RootState } from "@store/store"
import { useMemo } from "react"
import { useSelector } from "react-redux"

export const useDataFilteredByDate = () => {
    const currentDate = useSelector((state: RootState) => state.newDate)
    const tablesData = useSelector((state: RootState) => state.tablesData);

    const dataFiltered = useMemo(() => {
        const currentMonth = currentDate.currentMonth.number;
        const currentYear = currentDate.currentYear;

        const filteredData = tablesData.filter(data => {
            const dataMonth = data.month;
            const dataYear = data.year;

            return currentMonth === dataMonth && currentYear === dataYear;
        })

        const sortedData = filteredData.sort((a, b) => a.day - b.day);

        return sortedData;
    }, [currentDate, tablesData])

    return dataFiltered
}