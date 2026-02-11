import { useEffect, useState } from "react";
import { InputInfo } from "./components/InputInfo";
import { CheckInputInfo } from "./components/CheckInputInfo";
import { ShowRecord } from "./components/ShowRecord";
import { ShowError } from "./components/ShowError";
import { ShowCumTime } from "./components/ShowCumTime";
import { getAllRecords, deleteRecord } from "./lib/supabaseCRUDFunctions";
import { Loading } from "./components/Loading";
import { type Record } from "./domain/record";

import { Button } from "@chakra-ui/react";
//import { Register } from "./components/Register";
import { RegisterModal } from "./components/RegisterModal";

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

      if(loadingFlag){
        setLoading(false);
      }else{
        setInputText("");
        setInputTime(0);
      }

    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };


  useEffect(() => {

    getRecords();
  
  }, []);

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

  if(loadingFlag){
    return (
      <>
        <Loading />
      </>
    );

  }else{
    return (
      <>
        <h1 data-testid="title">学習記録一覧</h1>
        <InputInfo infoType="Text" inputValue={inputText} setInputText={setInputText} setInputTime={setInputTime} />
        <InputInfo infoType="Time" inputValue={inputTime.toString()} setInputText={setInputText} setInputTime={setInputTime} />
        <CheckInputInfo infoType="Text" inputValue={inputText} />
        <CheckInputInfo infoType="Time" inputValue={inputTime.toString()} />
  
        <ShowRecord records={records} onClick={onDeleteRecord} />
  
        <Button data-testid="registerButton" onClick={() => setOpen(true)}>登録</Button>
        <RegisterModal open={open} setOpen={setOpen} record={{"title":inputText, "time":inputTime}} reload={getRecords} />
        <ShowError error={error} />
        <ShowCumTime cumTime={cumTime} />
      </>
    );
  }
};