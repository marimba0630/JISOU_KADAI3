import { Record } from "../domain/record";

type Props = {
    records: Record[];
    onClick: (id: number) => void;
}

export const ShowRecord = (props: Props) => {
    const { records, onClick } = props;
    return (
        <div>
            {records.map((record) => (
                <li key={record.id}>{record.title} {record.time}時間 <button onClick={() => onClick(record.id)}>削除</button></li>
            ))}
        </div>
    );

}