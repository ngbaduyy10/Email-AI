'use client'
import { useLocalStorage } from "usehooks-ts";
import { sidebarLinks } from "@/constants";
import {useEffect, useState} from "react";
import axios from "axios";

const Sidebar = () => {
    const [accountId] = useLocalStorage("accountId", "");
    const [status, setStatus] = useLocalStorage("status", "inbox");
    const [inboxNum, setInboxNum] = useState(0);
    const [draftNum, setDraftNum] = useState(0);
    const [sentNum, setSentNum] = useState(0);

    useEffect(() => {
        const fetchThreads = async () => {
            const response = await axios.get("/api/email/status", {
                params: { accountId }
            });

            if (response.status === 200) {
                setInboxNum(response.data.inboxNum);
                setDraftNum(response.data.draftNum);
                setSentNum(response.data.sentNum);
            }
        }

        fetchThreads();
    }, [accountId]);

    return (
        <div className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
                const num = link.title === "Inbox" ? inboxNum : link.title === "Draft" ? draftNum : sentNum;
                const active = link.title.toLowerCase() === status;

                return (
                    <div
                        key={link.title}
                        className={`sidebar-item ${active ? "bg-bank-gradient" : "hover:bg-gray-200"}`}
                        onClick={() => setStatus(link.title.toLowerCase())}
                    >
                        <div className={`flex items-center gap-3 ${active && "text-white"}`}>
                            <link.icon size={20}/>
                            <span>{link.title}</span>
                        </div>

                        <div className={`text-sm ${active && "text-white"}`}>
                            {num}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Sidebar;