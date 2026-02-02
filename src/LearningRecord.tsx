import { useEffect, useState, type ChangeEvent } from "react";
import { InputInfo } from "./components/InputInfo";
import { CheckInputInfo } from "./components/CheckInputInfo";
import { ShowRecord } from "./components/ShowRecord";
import { Register } from "./components/Register";
import { ShowError } from "./components/ShowError";
import { ShowCumTime } from "./components/ShowCumTime";
import { getAllRecords, insertRecord, deleteRecord } from "./lib/supabaseCRUDFunctions";
import { Loading } from "./components/Loading";
import { type Record } from "./domain/record";

export const LearningRecord = () => {
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState(0);
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState("");
  const [cumTime, setCumTime] = useState(0);
  const [loadingFlag, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getRecords = async () => {
    try {
      const fetchedRecord = await getAllRecords();
      setRecords(fetchedRecord);
      setCumTime(fetchedRecord.reduce((accumlator: number, record: Record) => {
        return accumlator += record.time;
      }, 0));
      setLoading(false);

    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {

    getRecords();
  
  }, []);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const onChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTime(parseInt(e.target.value));
  }

  const onDeleteRecord = async ( id: number ) => {
    await deleteRecord(id);
    const deleteAfterRecords = await getAllRecords();
    //const newRecords = [...records, { title: inputText, time: inputTime }];
    setRecords(deleteAfterRecords);

    const newCumTime = deleteAfterRecords.reduce((accumlator: number, record: Record) => {
      return accumlator += record.time;
    }, 0);
    setInputText("");
    setInputTime(0);
    setError("");
    setCumTime(newCumTime);

  }


  const onRegister = async () => {
    if (inputText === "" || inputTime <= 0 || isNaN(inputTime)) {
      setError("入力されていない項目があります");
      return;
    }

    await insertRecord({title: inputText, time: inputTime});
    const insertAfterRecords = await getAllRecords();
    //const newRecords = [...records, { title: inputText, time: inputTime }];
    setRecords(insertAfterRecords);

    const newCumTime = insertAfterRecords.reduce((accumlator: number, record: Record) => {
      return accumlator += record.time;
    }, 0);
    setInputText("");
    setInputTime(0);
    setError("");
    setCumTime(newCumTime);
  }

  if(loadingFlag){
    return (
      <>
        <Loading />
      </>
    );

  }else{
    return (
      <>
        <h1>学習記録一覧</h1>
        <InputInfo infoType="Text" inputValue={inputText} onChange={onChangeText} />
        <InputInfo infoType="Time" inputValue={inputTime.toString()} onChange={onChangeTime} />
        <CheckInputInfo infoType="Text" inputValue={inputText} />
        <CheckInputInfo infoType="Time" inputValue={inputTime.toString()} />
  
        <ShowRecord records={records} onClick={onDeleteRecord} />
  
        <Register onClick={onRegister} />
        <ShowError error={error} />
        <ShowCumTime cumTime={cumTime} />
      </>
    );
  }
};