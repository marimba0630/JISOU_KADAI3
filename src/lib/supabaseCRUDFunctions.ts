import { supabase } from "../utils/supabaseClients";
import { Record } from "../domain/record";

export const getAllRecords = async (): Promise<Record[]> => {
    const response = await supabase
        .from("study-record")
        .select("*");
    if (response.error) {
        throw new Error(response.error.message);
    }

    const studiesData = response.data.map((study) => {
        return Record.newRecord(study.id, study.title, study.time, study.created_at);
    });

    return studiesData;
}

export const insertRecord = async ( record: {title: string; time: number;} ) => {
    const response = await supabase
    .from("study-record")
    .insert(record);

    if (response.error) {
        throw new Error(response.error.message);
    }
}

export const deleteRecord = async ( id:number ) => {
    const response = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);

    if(response.error){
        throw new Error(response.error.message);
    }
}