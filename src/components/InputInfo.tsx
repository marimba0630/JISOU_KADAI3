import { type ChangeEvent } from "react";

type Props = {
    infoType: string;
    inputValue: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
};

export const InputInfo = (props:Props) => {
    const {infoType, inputValue, onChange} = props;

    if(infoType === "Text"){
        return(
            <div>
                学習内容<input value={inputValue} onChange={onChange}></input>
            </div>
        );
    }
    else{
        return(
            <div>
                学習時間<input type="number" value={inputValue} onChange={onChange}></input>時間
            </div>
        );
    }
}