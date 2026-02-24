import { useCallback, useState } from "react";
import { Record } from "../domain/record";

type Props = {
    id: number;
    records: Record[];
    setOpen: (open: boolean) => void;
};

export const useSelectRecord = () => {
    const [ selectedRecord, setSelectedRecord ] = useState<Record | null>(null);

    const onSelectRecord = useCallback((props: Props) => {
        const {id, records, setOpen} = props;
        const targetRecord = records.find((record) => record.id == id);

        setSelectedRecord(targetRecord!);
        setOpen(true);

    }, []);

    return {onSelectRecord, selectedRecord};
}