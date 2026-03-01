import { useEffect, useState } from "react";
import { InputInfo } from "./components/InputInfo";
import { CheckInputInfo } from "./components/CheckInputInfo";
import { ShowRecord } from "./components/ShowRecord";
import { ShowError } from "./components/ShowError";
import { ShowCumTime } from "./components/ShowCumTime";
import { getAllRecords, deleteRecord } from "./lib/supabaseCRUDFunctions";
import { Loading } from "./components/Loading";
import { Record } from "./domain/record";

import { Button } from "@chakra-ui/react";
//import { Register } from "./components/Register";
import { Modal } from "./components/Modal";

export const LearningRecord = () => {
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState("");
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
        setInputTime("");
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
    setInputTime("");
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
        <InputInfo inputValue={inputText} setInputValue={setInputText}>学習内容</InputInfo>
        <InputInfo inputValue={inputTime} setInputValue={setInputTime}>時間</InputInfo>
        <CheckInputInfo infoType="Text" inputValue={inputText} />
        <CheckInputInfo infoType="Time" inputValue={inputTime} />
  
        <ShowRecord records={records} onClick={onDeleteRecord} getRecords={getRecords} />
  
        <Button data-testid="registerButton" onClick={() => setOpen(true)}>登録</Button>
        <Modal record={{"id":0, "title":inputText, "time":Number(inputTime)}} open={open} mode="Register" setOpen={setOpen} reload={getRecords} />
        <ShowError error={error} />
        <ShowCumTime cumTime={cumTime} />
      </>
    );
  }
};