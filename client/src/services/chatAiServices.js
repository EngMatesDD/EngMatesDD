import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getListChat = async (token) => {
    const res = await httpRequest.get(config.api.chatAI.GETALLCHAT, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const sendChat = async (data, token) => {
    const res = await httpRequest.post(
        config.api.chatAI.SENDCHAT,
        { prompt: data.prompt },
        {
            params: {
                chatId: data.idChat,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return res.data;
};

const deleteChat = async (token, id) => {
    const res = await httpRequest.delete(config.api.chatAI.DELETECHAT + `/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const renameChat = async (token, id, title) => {
    const res = await httpRequest.put(
        config.api.chatAI.RENAME + `/${id}`,
        { title: title },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return res.data;
};

export { getListChat, sendChat, deleteChat, renameChat };
