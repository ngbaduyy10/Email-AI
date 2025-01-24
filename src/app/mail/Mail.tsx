'use client'
import {ResizablePanel, ResizablePanelGroup, ResizableHandle} from "@/components/ui/resizable";
import {Separator} from "@/components/ui/separator";
import dynamic from 'next/dynamic';
import Sidebar from "./Sidebar";

const AccountSwitcher = dynamic(() => import('./AccountSwitcher'), { ssr: false });

const Mail = () => {
    return (
        <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel
                defaultSize={20}
                minSize={15}
                maxSize={20}
            >
                <div className="flex flex-col h-full p-3 border-r">
                    <AccountSwitcher />
                    <Separator className="my-4 border" />
                    <Sidebar />
                </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={32}
                minSize={30}
            >
                Thread list
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel
                defaultSize={48}
                minSize={30}
            >
                Thread display
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default Mail;