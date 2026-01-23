import { supabase } from "./supabaseClients";

export const getAllRecords = async () => {
    const { data: records, error } = await supabase
        .from("study-record")
        .select("*");
    if (error) {
        console.error("Error fetching todos:", error);
    }

    return records;
}

export const insertRecord = async ( record ) => {
    const { error } = await supabase
    .from("study-record")
    .insert(record);

    if (error) {
        console.error("Error insert todos:", error);
    }
}

export const deleteRecord = async ( id ) => {
    const { error } = await supabase
    .from("study-record")
    .delete()
    .eq("id", id);

    if(error){
        console.error("Error delete todos:", error);
    }
}