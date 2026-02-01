type Props = {
    onClick: () => void;
};

export const Register = (props:Props) => {
    const {onClick} = props;

    return (
        <div>
            <button onClick={onClick}>登録</button>
        </div> 
    );
}