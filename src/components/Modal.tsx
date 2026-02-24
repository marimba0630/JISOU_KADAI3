import { memo, useEffect, useRef } from "react"
import { Stack, Dialog, CloseButton, Field, Input, Button, NumberInput } from "@chakra-ui/react"
import { insertRecord, updateRecord } from "../lib/supabaseCRUDFunctions"
import { useForm, useController } from "react-hook-form"

type Props = {
    record: {title:string, time:number};
    open: boolean;
    mode: "Register" | "Update";
    setOpen: (open: boolean) => void;
    reload: () => void;
};

type FormValues = {
    title: string;
    time: string;
};

type RecordData = {
    title: string;
    time: number;
}

export const Modal = memo((props: Props) => {
    const { record, open, mode, setOpen, reload } = props; 

    const { register, control, reset, handleSubmit, formState:{errors}, trigger } = useForm<FormValues>({defaultValues: {title:"", time:""}, mode: "onBlur"});

    const title = mode === "Register" ? "新規登録" : "記録編集";
    const submitButton = mode === "Register" ? "登録" : "保存";

    useEffect(() => {
        if(!open) {
            reset({
                title: "",
                time: ""
            });

            return;
        }

        reset({
            title: record?.title ?? "",
            time: record?.time != null ? String(record.time) : ""
        });
        
    }, [open, record, reset]);

    const onSubmit = async (tempdata: FormValues) => {
        const data : RecordData = {title: tempdata.title, time: Number(tempdata.time)};
        if(mode === "Register") await insertRecord(data);
        else if(mode === "Update") await updateRecord(data, record.id);
        setOpen(false);
        reload();
    };

    return (
        <>
            <Dialog.Root
                open={open}
                initialFocusEl={null}
                onOpenChange={(e) => {
                    setOpen(e.open)
                }}
                >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content pb={2}>
                        <Dialog.Header data-testid="title">{title}</Dialog.Header>
                        <Dialog.Body>
                            <Stack gap={4}>
                                <Field.Root invalid={!!errors.title}>
                                    <Field.Label htmlFor="title">
                                        学習内容
                                    </Field.Label>
                                    <Input 
                                        id="title" 
                                        {...register("title", {
                                            validate: (value) => value.trim() !== "" || "内容の入力は必須です"
                                        })} 
                                    />
                                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={!!errors.time}>
                                    <Field.Label htmlFor="time">
                                        時間
                                    </Field.Label>
                                    <Input 
                                        id="time"
                                        {...register("time",{
                                            validate:{
                                              BlankCheck: (value) => value.trim() !== "" || "時間の入力は必須です",
                                              NegativeNumber: (value) => (!isNaN(Number(value)) && Number(value) >= 0) || "時間は0以上である必要があります"
                                            }
                                        })}
                                    />
                                    <Field.ErrorText>{errors.time?.message}</Field.ErrorText>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={handleSubmit(onSubmit)}>{submitButton}</Button>
                            <Button type="button" onClick={() => setOpen(false)}>キャンセル</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    );
})