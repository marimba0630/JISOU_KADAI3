import { Input, NumberInput } from "@chakra-ui/react"
import { type ChangeEvent} from "react";

type Props = {
    inputValue: string;
    setInputValue: (value: string) => void;
    children: React.ReactNode;
};


export const InputInfo = (props:Props) => {
    const {inputValue, setInputValue, children} = props;

    return(
        <div>
            {children}<Input width="300px" value={inputValue} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
        </div>
    );
}