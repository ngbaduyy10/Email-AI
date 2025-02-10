'use client'
import {ResizablePanel, ResizablePanelGroup, ResizableHandle} from "@/components/ui/resizable";
import {Separator} from "@/components/ui/separator";
import {TooltipProvider} from "@/components/ui/tooltip";
import dynamic from 'next/dynamic';
import Sidebar from "./Sidebar";
import ThreadList from "@/app/mail/ThreadList";
import ThreadDisplay from "@/app/mail/ThreadDisplay";

const AccountSwitcher = dynamic(() => import('./AccountSwitcher'), { ssr: false });

const Mail = () => {
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel
                    defaultSize={17}
                    minSize={15}
                    maxSize={17}
                >
                    <div className="flex flex-col gap-8 h-full p-3 border-r">
                        <AccountSwitcher />
                        <Sidebar />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel
                    defaultSize={35}
                    minSize={30}
                >
                    <div className="flex flex-col h-full p-3 border-r">
                        <div className="flex items-center justify-between">
                            <h1 className="ml-1 text-3xl font-bold">Inbox</h1>
                        </div>
                        <Separator className="my-4 border" />
                        <ThreadList />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel
                    defaultSize={48}
                    minSize={30}
                >
                    <div className="flex flex-col h-full p-3">
                        <ThreadDisplay />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}

export default Mail;