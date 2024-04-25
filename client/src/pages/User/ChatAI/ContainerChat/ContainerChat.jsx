import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemMessenger from '../ItemMessenger';
import { sendChat, getListChat } from '~/services/chatAiServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames;

function ContainerChat({ inforCurentChat, setInforCurrentChat }) {
    const [contentChat, setContentChat] = useState(inforCurentChat.length !== 0 ? inforCurentChat[0]?.histories : []);
    const [idChat, setIdChat] = useState(inforCurentChat.length === 0 ? '' : inforCurentChat[0].id);
    const [inputMesseage, setInputMesseage] = useState('');

    const inputRef = useRef();
    const contentRef = useRef();

    const navigate = useNavigate();

    const { t } = useTranslation('translation', { keyPrefix: 'ChatAI' });
    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const fetchSendChat = async () => {
        if (inputMesseage.trim() === '') {
            return;
        }
        const newMesseage = [{ role: 'user', message: inputMesseage }, { loading: true }];
        setContentChat([...contentChat, ...newMesseage]);
        setInputMesseage('');
        const data = {
            prompt: inputMesseage,
            idChat: idChat,
        };

        await sendChat(data, token);
        const inforAllChat = await getListChat(token);

        if (idChat === '') {
            navigate(config.routes.chat_ai.CHAT_AI + '/' + inforAllChat[0].id);
            return;
        }

        const chatFilter = inforAllChat.filter((item) => item.id === idChat);
        setInforCurrentChat(chatFilter);
    };

    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            event.preventDefault();
            fetchSendChat().catch((error) => {
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
                notify.error(error.response.data.message);
            });
        }
    };

    useEffect(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [contentChat]);

    useEffect(() => {
        setContentChat(inforCurentChat.length !== 0 ? inforCurentChat[0]?.histories : []);
        setIdChat(inforCurentChat.length === 0 ? '' : inforCurentChat[0].id);
        inputRef.current.focus();
    }, [inforCurentChat]);

    return (
        <div className={cx('flex flex-1 justify-center')}>
            <div className={cx('flex h-full w-full flex-col items-center')}>
                {/* content messeage */}
                <div className={cx(' mb-4 w-full flex-1 overflow-hidden overflow-y-auto px-4')}>
                    {contentChat.length === 0 && (
                        <div className={cx(' flex h-full w-full items-center justify-center text-xl font-semibold')}>
                            How can I help you today?
                        </div>
                    )}
                    {contentChat.length !== 0 && (
                        <div className="px-[250px] max-xl:px-[150px]  max-lg:px-[50px]">
                            {contentChat.map((value, index) => (
                                <ItemMessenger
                                    isUser={value.role === 'user'}
                                    key={index}
                                    content={value.message}
                                    loading={value.loading}
                                />
                            ))}
                        </div>
                    )}
                    <div ref={contentRef}></div>
                </div>

                {/* input chat */}
                <div className={cx('relative flex h-[80px] w-[700px] items-center justify-center')}>
                    <input
                        className={cx(
                            'w-full rounded-xl bg-background-color-secondnary px-4 py-2',
                            'border border-solid border-primary-color',
                        )}
                        placeholder={t('message_chat')}
                        ref={inputRef}
                        value={inputMesseage}
                        onChange={(e) => {
                            setInputMesseage(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="absolute right-3">
                        <FontAwesomeIcon
                            className="cursor-pointer hover:text-text-color-link"
                            icon={faPaperPlane}
                            onClick={fetchSendChat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

ContainerChat.propTypes = {
    inforCurentChat: PropTypes.array.isRequired,
    setInforCurrentChat: PropTypes.func.isRequired,
};

export default ContainerChat;
