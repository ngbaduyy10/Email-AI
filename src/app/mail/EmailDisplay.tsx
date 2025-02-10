import {useLocalStorage} from "usehooks-ts";
import {useEffect, useState} from "react";
import {formatDistanceToNow} from "date-fns";
import Avatar from "react-avatar";
import axios from "axios";
import {Letter} from "react-letter";

const EmailDisplay = ({ email } : { email: EmailMessage }) => {
    const [accountId] = useLocalStorage('accountId', '');
    const [isMe, setIsMe] = useState(false);

    useEffect(() => {
        const fetchEmailAddresses = async () => {
            const response = await axios.get(`/api/account/${accountId}`);
            if (response.status === 200) {
                if (response.data.data?.email === email.from.address) {
                    setIsMe(true);
                }
            }
        }

        fetchEmailAddresses();
    }, [email, accountId]);

    return (
        <div className={`rounded-lg p-4 cursor-pointer ${isMe && "border-l-gray-900 border-l-4"}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className='flex items-center gap-2'>
                    {!isMe &&
                        <Avatar
                            name={email.from.name ?? email.from.address}
                            email={email.from.address}
                            size='35'
                            textSizeRatio={2}
                            round={true}
                        />
                    }
                    <span className='font-medium'>
                        {isMe ? 'Me' : email.from.address}
                    </span>
                </div>
                <p className='text-xs'>
                    {formatDistanceToNow(email.sentAt ?? new Date(), { addSuffix: true })}
                </p>
            </div>

            <Letter className='letter text-black' html={email?.body ?? ""} />
        </div>
    );
}

export default EmailDisplay;