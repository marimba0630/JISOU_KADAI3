type Props = {
    cumTime: number;
};

export const ShowCumTime = (props: Props) => {
    const { cumTime } = props;

    return (
        <div>合計時間:{cumTime}/1000 (h)</div> 
    );
}