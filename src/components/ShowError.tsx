type Props = {
    error: string;
};

export const ShowError = (props: Props) => {
    const {error} = props;

    return(
        <div>{error}</div>
    );
}