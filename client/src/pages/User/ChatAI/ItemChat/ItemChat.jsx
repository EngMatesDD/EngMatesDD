import classNames from 'classnames';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import PopperMenu from '~/components/PopperMenu';
import getListItemInMenuPopper from '~/config/listItemInMenuPopper';

const cx = classNames;

function ListChat() {
    const [isBtnOperationItemChat, setIsBtnOperationItemChat] = useState(false);

    const showBtnOperationItemChat = () => {
        setIsBtnOperationItemChat(true);
    };

    const hideBtnOperationItemChat = () => {
        setIsBtnOperationItemChat(false);
    };
    return (
        <div
            className={cx(
                'relative flex h-10 w-full cursor-pointer items-center whitespace-nowrap rounded-lg pl-4 pr-8',
                'hover:bg-background-color-secondnary',
            )}
            onMouseEnter={showBtnOperationItemChat}
            onMouseLeave={hideBtnOperationItemChat}
        >
            <div className={cx('overflow-hidden')}>Hello, I'm DatsfssagehreahrshrssgagrhbrsjagfwsegS sGdehjzdesrdh</div>
            {isBtnOperationItemChat && (
                <PopperMenu items={getListItemInMenuPopper().chatAI.ItemChat} handleClick={() => {}}>
                    <div
                        className={cx(
                            'absolute bottom-[50%] right-[5px]  translate-y-[50%] cursor-pointer rounded-full bg-background-color',
                            'flex h-7 w-7 items-center justify-center',
                        )}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </PopperMenu>
            )}
        </div>
    );
}

export default ListChat;
