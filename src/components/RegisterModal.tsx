import { memo, useEffect, useRef } from "react"
import { Stack, Dialog, CloseButton, Field, Input, Button, NumberInput } from "@chakra-ui/react"
import { insertRecord } from "../lib/supabaseCRUDFunctions"
import { useForm, Controller } from "react-hook-form"

type Props = {
    record: {title:string, time:number};
    open: boolean;
    setOpen: (open: boolean) => void;
    reload: () => void;
};

type FormValues = {
    title: string;
    time: number;
};

/*type ValueChangeDetails = {
    value: string;
};
*/
export const RegisterModal = memo((props: Props) => {
    const { record, open, setOpen, reload } = props; 

    const { register, control, reset, handleSubmit, formState:{errors}, trigger } = useForm<FormValues>({defaultValues: {title:"", time:0}, mode: "onBlur"});


    useEffect(() => {
        if(open){
            reset({
                title: record?.title ?? "",
                time: record?.time ?? 0
            });

            setTimeout(() => {
                trigger(["title", "time"]);
            }, 0);
        }
    }, [record, open, reset, trigger]);

    const onSubmit = async (data: FormValues) => {
        await insertRecord(data);
        setOpen(false);
        reload();
    };

    return (
        <>
            <Dialog.Root
                open={open}
                onOpenChange={(e) => {
                    setOpen(e.open)
                    if(!e.open){
                        reset();
                    }
                }}
                modal={false}
                >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content pb={2}>
                        <Dialog.Header>新規登録</Dialog.Header>
                        <Dialog.Body>
                            <Stack gap={4}>
                                <Field.Root invalid={!!errors.title}>
                                    <Field.Label htmlFor="title">
                                        学習内容
                                    </Field.Label>
                                    <Input 
                                        id="title" 
                                        {...register("title", {
                                            validate: (v) => v.trim() !== "" || "内容の入力は必須です"
                                        })} 
                                    />
                                <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={!!errors.time}>
                                    <Field.Label htmlFor="time">
                                        時間
                                    </Field.Label>
                                    <Controller
                                        name="time"
                                        control={control}
                                        rules={{
                                            validate: (value) =>{
                                                if (value === undefined) return "時間の入力は必須です";
                                                if (value < 0) return "時間は0以上である必要があります";
                                                return true;
                                            },
                                        }}
                                        render = {({field}) => (
                                                <NumberInput.Root 
                                                    name={field.name}
                                                    value={field.value !== undefined ? String(field.value) : ""} 
                                                    width="200px" 
                                                    onValueChange={(details) => {
                                                        field.onChange(
                                                            details.value === "" ? undefined : Number(details.value)
                                                        );
                                                    }}
                                                >
                                                <NumberInput.Control />
                                                <NumberInput.Input id="time" onBlur={field.onBlur} />
                                                </NumberInput.Root>
                                        )
                                    }
                                    />
                                    <Field.ErrorText>{errors.time?.message}</Field.ErrorText>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={handleSubmit(onSubmit)}>登録</Button>
                            <Button onClick={() => setOpen(false)}>キャンセル</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    );
})