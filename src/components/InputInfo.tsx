import { Input, NumberInput } from "@chakra-ui/react"

type Props = {
    infoType: string;
    inputValue: string;
    setInputText: (title: string) => void;
    setInputTime: (time: number) => void;
};

export const InputInfo = (props:Props) => {
    const {infoType, inputValue, setInputText, setInputTime} = props;

    if(infoType === "Text"){
        return(
            <div>
                学習内容<Input width="300px" value={inputValue} onChange={(e) => setInputText(e.target.value)} />
            </div>
        );
    }
    else{
        return(
            <div>
                学習時間
                    <NumberInput.Root width="200px" value={inputValue} onValueChange={(e) => setInputTime(parseInt(e.value))}>
                        <NumberInput.Control />
                        <NumberInput.Input />
                    </NumberInput.Root>
                時間
            </div>
        );
    }
}