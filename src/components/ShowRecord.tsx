import { useState, useCallback } from "react";
import { Modal } from "./Modal";
import { Record } from "../domain/record";
import { Button, Table } from "@chakra-ui/react"
import { useSelectRecord } from "../hooks/useSelectRecord"

type Props = {
    records: Record[];
    onClick: (id: number) => void;
    getRecords: () => void;
}

export const ShowRecord = (props: Props) => {
    const { records, onClick, getRecords } = props;
    const [open, setOpen] = useState(false);
    const {onSelectRecord, selectedRecord} = useSelectRecord();

    const onClickRecord = useCallback((id: number) => {
        onSelectRecord({id, records, setOpen});
    }, [records, onSelectRecord, setOpen]);

    return (
        <div>
            <Table.Root >
                <Table.Caption />
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>学習内容</Table.ColumnHeader>
                        <Table.ColumnHeader>学習時間</Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
            <Table.Body>
            {records.map((record) => (
                <Table.Row key={record.id}>
                    <Table.Cell>{record.title}</Table.Cell>
                    <Table.Cell>{record.time}時間</Table.Cell>
                    <Table.Cell><Button colorPalette="teal" onClick={() => onClickRecord(record.id)}>編集</Button></Table.Cell>
                    <Table.Cell><Button colorPalette="red" onClick={() => onClick(record.id)}>削除</Button></Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
            </Table.Root>
            <Modal record={selectedRecord!} open={open} mode="Update" setOpen={setOpen} reload={getRecords} />
        </div>
    );

}