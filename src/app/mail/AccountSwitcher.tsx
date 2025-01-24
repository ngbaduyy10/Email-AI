'use client'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import {useLocalStorage} from 'usehooks-ts';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from "sonner";
import { getAurinkoAuthUrl } from "@/lib/aurinko";
import {Plus} from "lucide-react";

const AccountSwitcher = () => {
    const [accounts, setAccounts] = useState([]);
    const [accountId, setAccountId] = useLocalStorage('accountId', '')

    useEffect(() => {
        const fetchAccounts = async () => {
            const response = await axios.get('/api/account');
            if (response.status === 200) {
                if (response.data.data.length > 0) {
                    setAccounts(response.data.data);
                    if (!accountId) {
                        setAccountId(response.data.data[0].id);
                    }
                } else {
                    toast('Link an account to continue', {
                        action: {
                            label: 'Add account',
                            onClick: handleAddAccount,
                        },
                    })
                }
            }
        }
        fetchAccounts();
    }, [accountId, setAccountId]);

    const handleAddAccount = async () => {
        try {
            const url = await getAurinkoAuthUrl('Google');
            window.location.href = url.toString();
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    return (
        <Select defaultValue={accountId} onValueChange={setAccountId} >
            <SelectTrigger className="py-6 font-inter">
                <SelectValue placeholder="Select a account" />
            </SelectTrigger>
            <SelectContent className="font-inter bg-white">
                {accounts?.map((account: Account) => (
                    <SelectItem
                        value={account.id}
                        key={account.id}
                        className="cursor-pointer border-b pb-3"
                    >
                        {account.email}
                    </SelectItem>
                ))}

                <div onClick={handleAddAccount} className="flex items-center gap-2 cursor-pointer px-1 py-2">
                    <Plus size={18} />
                    <p className="text-[15px] font-medium">
                        Add account
                    </p>
                </div>
            </SelectContent>
        </Select>
    );
}

export default AccountSwitcher;