import { Button } from "@chakra-ui/react"

type Props = {
    onClick: () => void;
};

export const Register = (props:Props) => {
    const {onClick} = props;

    return (
        <div>
            <Button onClick={onClick}>登録</Button>
        </div> 
    );
}