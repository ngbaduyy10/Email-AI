import axios from 'axios';

const startSync = async (token: string, daysWithin: number) => {
    const response = await axios.post(`${process.env.AURINKO_URL}/v1/email/sync`, {},
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            daysWithin,
            bodyType: 'html',
        }
    })

    return response.data;
}

const getUpdatedEmails = async (token: string, deltaToken: string, pageToken: string) => {
    let params: Record<string, string> = {};
    if (pageToken) {
        params.pageToken = pageToken;
    }
    if (deltaToken) {
        params.deltaToken = deltaToken;
    }

    const response = await axios.get(`${process.env.AURINKO_URL}/v1/email/sync/updated`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    })
    return response.data;
}

export const emailSync = async (token: string) => {
    try {
        const daysWithin = 4;
        let syncResponse = await startSync(token, daysWithin);
        while (!syncResponse.ready) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            syncResponse = await startSync(token, daysWithin);
        }

        let deltaToken = syncResponse.syncUpdatedToken;
        let updatedResponse = await getUpdatedEmails(token, deltaToken, '');
        let allEmails: EmailMessage[] = updatedResponse.records;
        if (updatedResponse.nextDeltaToken) {
            deltaToken = updatedResponse.nextDeltaToken;
        }

        while (updatedResponse.nextPageToken) {
            updatedResponse = await getUpdatedEmails(token, '', updatedResponse.nextPageToken);
            allEmails = allEmails.concat(updatedResponse.records);
            if (updatedResponse.nextDeltaToken) {
                deltaToken = updatedResponse.nextDeltaToken;
            }
        }

        return {
            emails: allEmails,
            deltaToken,
        }

    } catch (error) {
        console.error(error);
    }
}