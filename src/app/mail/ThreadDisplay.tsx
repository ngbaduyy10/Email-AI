import {Archive, ArchiveX, Clock, Trash2, Reply, ReplyAll, Forward, LoaderCircle} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAtom } from 'jotai';
import { threadIdAtom } from '@/components/useThread';
import {Separator} from "@/components/ui/separator";
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import {format} from "date-fns";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import EmailDisplay from "@/app/mail/EmailDisplay";

const ThreadDisplay = () => {
    const [threadId] = useAtom(threadIdAtom);
    const [thread, setThread] = useState<Thread | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchThread = async () => {
            setLoading(true);
            const response = await axios.get(`/api/email/${threadId}`);
            if (response.status === 200) {
                setThread(response.data.data);
            }
            setLoading(false);
        }

        if (threadId) {
            fetchThread();
        }
    }, [threadId]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <Archive />
                                <span className="sr-only">Archive</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Archive</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <ArchiveX />
                                <span className="sr-only">Move to junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Move to junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <Trash2 />
                                <span className="sr-only">Move to trash</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Move to trash</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="h-6 mx-1 border" />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <Clock />
                                <span className="sr-only">Snooze</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Snooze</TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <Reply />
                                <span className="sr-only">Reply</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Reply</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <ReplyAll />
                                <span className="sr-only">Reply all</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Reply all</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" disabled={!threadId || loading}>
                                <Forward />
                                <span className="sr-only">Forward</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-bank-gradient text-white">Forward</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <Separator className="my-4 border" />

            {loading ? (
                <div className="flex-center h-full">
                    <LoaderCircle size={40} className="animate-spin"/>
                </div>
            ) : (
                <>
                    {thread ? (
                        <div className="flex flex-col flex-1 overflow-scroll">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 text-sm">
                                    <Avatar>
                                        <AvatarFallback className="border text-white font-bold bg-bank-gradient">
                                            {thread.emails[0]?.from?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="font-semibold">{thread.emails[0]?.from?.name}</div>
                                        <div className="text-xs line-clamp-1">
                                            {thread.emails[0]?.from?.address}
                                        </div>
                                        <div className="text-md line-clamp-1">{thread.emails[0]?.subject}</div>
                                    </div>
                                </div>
                                {thread.emails[0]?.sentAt && (
                                    <div className="text-xs w-1/4">
                                        {format(new Date(thread.emails[0].sentAt), "PP p")}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col gap-4">
                                {thread.emails.map(email => {
                                    return <EmailDisplay key={email.id} email={email} />
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            No email selected
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ThreadDisplay;