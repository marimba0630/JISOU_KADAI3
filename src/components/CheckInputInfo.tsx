type Props = {
    infoType: string;
    inputValue: String;
};

export const CheckInputInfo = (props: Props) => {
    const {infoType, inputValue} = props;

    if(infoType === "Text"){
        return(
            <div>
                入力されている学習内容:{inputValue}
            </div>
        );
    }
    else{
        return(
            <div>
                入力されている時間:{inputValue}時間
            </div>
        );
    }
}