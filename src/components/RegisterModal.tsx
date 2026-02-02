import { memo, useState, useEffect, type ChangeEvent } from "react"
import { Stack, Dialog, CloseButton, Field, Input, Button, NumberInput } from "@chakra-ui/react"
import { Record } from "../domain/record.ts"

type Props = {
    record: Record | null;
    open: boolean;
    setOpen: (open: boolean) => void;
};


export const RegisterModal = memo((props: Props) => {
    const { record, open, setOpen } = props; 

    const [ title, setTitle ] = useState("");
    const [ time, setTime ] = useState(0);
    const [ titleBlankFlag, setTitleBlankFlag ] = useState(false);
    const [ valueErrorFlag, setValueErrorFlag ] = useState(false); 

    useEffect(() => {
        setTitle(record?.title ?? "");
        setTime(record?.time ?? 0);
    }, [record]);

    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setTitleBlankFlag(false);
        if(e.target.value == ""){
            setTitleBlankFlag(true);
        }
    }

    return (
        <>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                trapFocus={false}
                >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content pb={2}>
                        <Dialog.Header>以下の内容で登録します</Dialog.Header>
                        <Dialog.Body>
                            <Stack gap={4}>
                                <Field.Root>
                                    <Field.Label>
                                        学習内容
                                    </Field.Label>
                                    <Input value={title} onChange={onChangeTitle} />
                                    {titleBlankFlag ? <Field.ErrorText>入力必須です</Field.ErrorText> : <></>}
                                    <Field.Label>
                                        時間
                                    </Field.Label>
                                    <NumberInput.Root value={time.toString()} width="200px" onValueChange={(details) => {
                                        if(!Number.isNaN(details.valueAsNumber) && details.valueAsNumber > 0){
                                            setTime(details.valueAsNumber);
                                            setValueErrorFlag(false);
                                        }else{
                                            setValueErrorFlag(true);
                                        }
                                    }}>
                                        <NumberInput.Control />
                                        <NumberInput.Input />
                                    </NumberInput.Root>
                                    {valueErrorFlag ? <Field.ErrorText>0より大きい値を入力してください</Field.ErrorText> : <></>}
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onChange={}>登録</Button>
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