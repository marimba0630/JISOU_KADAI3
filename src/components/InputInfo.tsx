import { Input, NumberInput } from "@chakra-ui/react"
import { type ChangeEvent} from "react";

type Props = {
    infoType: string;
    inputValue: string;
    setInputText: (title: string) => void;
    setInputTime: (time: number) => void;
};

type ValueChangeDetails = {
    value: string;
};

export const InputInfo = (props:Props) => {
    const {infoType, inputValue, setInputText, setInputTime} = props;

    if(infoType === "Text"){
        return(
            <div>
                学習内容<Input width="300px" value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} />
            </div>
        );
    }
    else{
        return(
            <div>
                学習時間
                    <NumberInput.Root width="200px" value={inputValue.toString()} onValueChange={(details: ValueChangeDetails) => setInputTime(Number(details.value))}>
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                時間
            </div>
        );
    }
}