import { Inbox, File, Send } from 'lucide-react';

export const sidebarLinks = [
    {
        title: "Inbox",
        icon: Inbox,
    },
    {
        title: "Draft",
        icon: File,
    },
    {
        title: "Sent",
        icon: Send,
    },
]

export function cleanText(input: string) {
    const unwantedPattern = /[\u2800\s]+/g;
    const cleaned = input.replace(unwantedPattern, ' ').trim();

    const textArea = document.createElement("textarea");
    textArea.innerHTML = cleaned;
    return textArea.value;
}