import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Fragment, useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import PopperMenu from '~/components/PopperMenu';
import getListItemInMenuPopper from '~/config/listItemInMenuPopper';
import { getListChat, deleteChat, renameChat } from '~/services/chatAiServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames;

function ItemChat({ title, chatId, setInforAllChat }) {
    const [isBtnOperationItemChat, setIsBtnOperationItemChat] = useState(false);
    const [_title, setTitle] = useState(title);
    const [valueInput, setValueInput] = useState(title);
    const [isInput, setIsInput] = useState(false);

    const containerRef = useRef();

    const [cookies] = useCookies(['token']);
    const token = cookies.token;
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname.split('/');

    const idChatCurrent = currentPath.length === 3 ? currentPath[2] : '';

    const showBtnOperationItemChat = () => {
        setIsBtnOperationItemChat(true);
    };

    const hideBtnOperationItemChat = () => {
        setIsBtnOperationItemChat(false);
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsInput(false);
        }
    };

    const handleClick = (e, data) => {
        e.stopPropagation();
        switch (data.code) {
            case 'delete':
                handleDeleteChat();
                break;
            case 'rename':
                handleClickRename();
                break;
            default:
        }
    };

    const handleMiddleDeleteChat = async () => {
        await deleteChat(token, chatId);

        if (idChatCurrent === chatId) {
            navigate(config.routes.chat_ai.CHAT_AI);
            return;
        }

        const result = getListChat(token);
        setInforAllChat(result);
    };

    const handleDeleteChat = async () => {
        handleMiddleDeleteChat().catch((error) => {
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            notify.error(error.response.data.message);
        });
    };

    const handleClickRename = () => {
        setIsInput(true);
    };

    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            handleRenameChat();
        }
    };

    const handleRenameChat = async () => {
        await renameChat(token, chatId, valueInput)
            .then(() => {
                setIsInput(false);
                setTitle(valueInput);
            })
            .catch((error) => {
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTitle(title);
    }, [title]);

    return (
        <div
            className={cx(
                'relative flex h-10 w-full cursor-pointer items-center whitespace-nowrap rounded-lg pl-4 pr-8',
                'hover:bg-background-color-secondnary',
            )}
            ref={containerRef}
            onMouseEnter={showBtnOperationItemChat}
            onMouseLeave={hideBtnOperationItemChat}
        >
            {isInput ? (
                <input
                    className={cx('h-[80%] w-full rounded-md border border-solid border-primary-color pl-2')}
                    value={valueInput}
                    onChange={(e) => {
                        setValueInput(e.target.value);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <Fragment>
                    <div className={cx('overflow-hidden')}>
                        {_title.length < 20 ? _title : _title.slice(0.2) + '...'}
                    </div>
                    {isBtnOperationItemChat && (
                        <PopperMenu items={getListItemInMenuPopper().chatAI.ItemChat} handleClick={handleClick}>
                            <div
                                className={cx(
                                    'absolute cursor-pointer rounded-full bg-background-color',
                                    'bottom-[50%] right-[5px]  translate-y-[50%] ',
                                    'flex h-7 w-7 items-center justify-center',
                                )}
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </PopperMenu>
                    )}
                </Fragment>
            )}
        </div>
    );
}

ItemChat.propTypes = {
    title: PropTypes.string,
    chatId: PropTypes.string.isRequired,
};

export default ItemChat;
