import {useEffect, useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import axios from 'axios';
import {format, formatDistanceToNow} from 'date-fns';
import { useAtom } from 'jotai';
import { threadIdAtom } from '@/components/useThread';
import {LoaderCircle} from "lucide-react";
import {cleanText} from "@/constants";

const ThreadList = () => {
    const [threadId, setThreadId] = useAtom(threadIdAtom);
    const [threadsGroup, setThreadsGroup] = useState<Record<string, Thread[]>>({});
    const [accountId] = useLocalStorage('accountId', '');
    const [status] = useLocalStorage('status', 'inbox');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchThreads = async () => {
            setLoading(true);
            const response = await axios.get('/api/email', {
                params: { accountId, status },
            })
            if (response.status === 200) {
                let timeMap: Record<string, Thread[]> = {};
                response.data.data.forEach((thread: Thread) => {
                    const date = format(thread.lastMessageDate || new Date(), "yyyy-MM-dd");
                    if (!timeMap[date]) {
                        timeMap[date] = [];
                    }
                    timeMap[date].push(thread);
                });
                setThreadsGroup(timeMap);
            }
            setLoading(false);
        }

        fetchThreads();
    }, [accountId, status]);

    return (
        <>
            {loading ? (
                <div className="flex-center h-full">
                    <LoaderCircle size={40} className="animate-spin" />
                </div>
            ) : (
                <div className="overflow-y-scroll flex flex-col gap-2">
                    {Object.entries(threadsGroup).map(([date, threads]) => (
                        <div key={date} className="flex flex-col gap-2">
                            <div className="text-xs font-medium">
                                {format(new Date(date), "MMMM d, yyyy")}
                            </div>

                            {threads.map(thread => {
                                const active = thread.id === threadId;

                                return (
                                    <div
                                        key={thread.id}
                                        className={`thread-item ${active ? "bg-bank-gradient text-white" : "hover:bg-gray-200"}`}
                                        onClick={() => setThreadId(thread.id)}
                                    >
                                        <div className="flex flex-col w-full gap-1">
                                            <div className="flex items-start justify-between">
                                                <div className="font-semibold">
                                                    {thread.emails.at(-1)?.from?.name}
                                                </div>
                                                <div className="text-xs whitespace-nowrap">
                                                    {formatDistanceToNow(thread.emails.at(-1)?.sentAt || new Date(), {addSuffix: true})}
                                                </div>
                                            </div>
                                            <div className="text-xs font-medium">{thread.subject}</div>
                                        </div>

                                        <div className="text-xs line-clamp-2">
                                            {cleanText(thread.emails.at(-1)?.bodySnippet!)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ThreadList;