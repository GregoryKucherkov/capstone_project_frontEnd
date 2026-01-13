import { Button } from "@/shared/ui/button/Button"
import { useSearchParams } from "react-router-dom";

export const AuthBar = () => {
    const [, setSearchParams] = useSearchParams();

    const handleClick = () => {
        setSearchParams({ modal: "signin" })
    }
    return(
        <Button
            bordered
            variant="light"
            size="small"
            onClick={handleClick}
            >
            Sign In
        </Button>
    )
}