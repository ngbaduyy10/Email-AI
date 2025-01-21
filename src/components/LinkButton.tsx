'use client'
import {Button} from "@/components/ui/button";
import {getAurinkoAuthUrl} from "@/lib/aurinko";

const LinkButton = () => {
    const handleClick = async () => {
        const url = await getAurinkoAuthUrl("Google");
        window.location.href = url.toString();
    }
    return (
        <Button onClick={handleClick}>
            Connect
        </Button>
    )
}

export default LinkButton;