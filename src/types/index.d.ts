declare interface EmailMessage {
    id: string;
    threadId: string;
    createdTime: string;
    lastModifiedTime: string;
    sentAt: string;
    receivedAt: string;
    internetMessageId: string;
    subject: string;
    sysLabels: Array<"junk" | "trash" | "sent" | "inbox" | "unread" | "flagged" | "important" | "draft">;
    keywords: string[];
    sysClassifications: Array<"personal" | "social" | "promotions" | "updates" | "forums">;
    sensitivity: "normal" | "private" | "personal" | "confidential";
    meetingMessageMethod?: "request" | "reply" | "cancel" | "counter" | "other";
    from: EmailAddress;
    to: EmailAddress[];
    cc: EmailAddress[];
    bcc: EmailAddress[];
    replyTo: EmailAddress[];
    hasAttachments: boolean;
    body?: string;
    bodySnippet?: string;
    attachments: EmailAttachment[];
    inReplyTo?: string;
    references?: string;
    threadIndex?: string;
    internetHeaders: EmailHeader[];
    nativeProperties: Record<string, string>;
    folderId?: string;
    omitted: Array<"threadId" | "body" | "attachments" | "recipients" | "internetHeaders">;
}

declare interface EmailAddress {
    name?: string;
    address: string;
    raw?: string;
}

declare interface EmailAttachment {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    inline: boolean;
    contentId?: string;
    content?: string;
    contentLocation?: string;
}

declare interface EmailHeader {
    name: string;
    value: string;
}

declare interface Account {
    id: string;
    email: string;
    userId: string;
    token: string;
    provider: string;
    name: string;
    nextDeltaToken?: string;
}

declare interface Thread {
    accountId: string,
    id: string,
    subject: string,
    lastMessageDate: Date,
    participantIds: string[],
    done: boolean,
    inboxStatus: boolean,
    draftStatus: boolean,
    sentStatus: boolean
    emails: EmailMessage[]
}
