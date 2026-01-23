import { useEffect, useState } from "react";
import { InputInfo } from "./InputInfo";
import { CheckInputInfo } from "./CheckInputInfo";
import { ShowRecord } from "./ShowRecord";
import { Register } from "./Register";
import { ShowError } from "./ShowError";
import { ShowCumTime } from "./ShowCumTime";
import { getAllRecords, insertRecord, deleteRecord } from "./supabaseCRUDFunctions";
import { Loading } from "./Loading";

export const LearningRecord = () => {
  const [inputText, setInputText] = useState("");
  const [inputTime, setInputTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [cumTime, setCumTime] = useState(0);
  const [loadingFlag, setLoading] = useState(true);

  const getRecords = async () => {
    try {
      const fetchedRecord = await getAllRecords();
      setRecords(fetchedRecord);
      setCumTime(fetchedRecord.reduce((accumlator, record) => {
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

  const onChangeText = (e) => {
    setInputText(e.target.value);
  }

  const onChangeTime = (e) => {
    setInputTime(parseInt(e.target.value));
  }

  const onDeleteRecord = async ( id ) => {
    await deleteRecord(id);
    const deleteAfterRecords = await getAllRecords();
    //const newRecords = [...records, { title: inputText, time: inputTime }];
    setRecords(deleteAfterRecords);

    const newCumTime = deleteAfterRecords.reduce((accumlator, record) => {
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

    const newCumTime = insertAfterRecords.reduce((accumlator, record) => {
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
        <InputInfo infoType="Time" inputValue={inputTime} onChange={onChangeTime} />
        <CheckInputInfo infoType="Text" inputValue={inputText} />
        <CheckInputInfo infoType="Time" inputValue={inputTime} />
  
        <ShowRecord records={records} onClick={onDeleteRecord} />
  
        <Register onClick={onRegister} />
        <ShowError error={error} />
        <ShowCumTime cumTime={cumTime} />
      </>
    );
  }
};