import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

import ItemChat from './ItemChat';
import ContainerChat from './ContainerChat';
import { getListChat } from '~/services/chatAiServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames;

function ChatAI() {
    const [inforAllChat, setInforAllChat] = useState([]);
    const [inforCurentChat, setInforCurrentChat] = useState([]);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname.split('/');

    const idChat = currentPath.length === 3 ? currentPath[2] : '';

    const handleClickItemChat = (id) => {
        navigate(config.routes.chat_ai.CHAT_AI + '/' + id);
    };

    const handleCreateNewChat = () => {
        navigate(config.routes.chat_ai.CHAT_AI);
    };

    const fetchGetListChat = async () => {
        const result = await getListChat(token);
        setInforAllChat(result);
        const chatFilter = result.filter((item) => item.id === idChat);
        setInforCurrentChat(chatFilter);
    };

    //handle when change URL
    useEffect(() => {
        fetchGetListChat().catch((error) => {
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            notify.error(error.response.data.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    return (
        <div className={cx('flex h-full w-full')}>
            <div className={cx('h-full w-[18%] overflow-y-scroll bg-slate-100 pt-3 text-sm')}>
                {/* button create new chat */}
                <div
                    className={cx(
                        'relative mb-4 flex h-10 w-full cursor-pointer items-center whitespace-nowrap rounded-lg pl-4 pr-8',
                        'bg-background-button',
                        'hover:bg-background-color-secondnary',
                    )}
                    onClick={handleCreateNewChat}
                >
                    <div className={cx('overflow-hidden')}>New chat</div>
                </div>
                {/* list chat */}
                {inforAllChat.map((value, index) => (
                    <div
                        className={cx(idChat === value.id && 'bg-background-color-secondnary')}
                        key={index}
                        onClick={() => handleClickItemChat(value.id)}
                    >
                        <ItemChat
                            title={value.title ? value.title : value.histories[0].message}
                            chatId={value.id}
                            setInforAllChat={setInforAllChat}
                        />
                    </div>
                ))}
            </div>
            {/* content chat */}
            <ContainerChat inforCurentChat={inforCurentChat} setInforCurrentChat={setInforCurrentChat} />
        </div>
    );
}

export default ChatAI;
