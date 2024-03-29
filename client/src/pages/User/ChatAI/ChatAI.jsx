import classNames from 'classnames';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemChat from './ItemChat';

const cx = classNames;

const listChat = [1, 2, 3, 4, 453, 214, 1, 34, 23, 42, 3, 2, 342, 35, 2, 3, 9, 0, 6];

function ChatAI() {
    const inputRef = useRef();

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            //postFeedbackAPI();
        }
    };
    return (
        <div className={cx('flex h-full w-full')}>
            {/* list chat */}
            <div className={cx('h-full w-[18%] overflow-y-scroll bg-slate-100 pt-3 text-sm')}>
                {listChat.map(() => (
                    <ItemChat />
                ))}
            </div>
            {/* layout chat */}
            <div className={cx('flex flex-1 justify-center')}>
                <div className={cx('flex h-full w-[700px] flex-col items-center')}>
                    {/* content chat */}
                    <div className={cx('flex max-w-[90%] flex-1 flex-col justify-end')}>
                        <div className="relative inline-block rounded-2xl bg-background-color-secondnary px-3 py-2">
                            <div>hello</div>
                        </div>
                    </div>
                    {/* input chat */}
                    <div className={cx('relative flex h-[80px] w-full items-center justify-start')}>
                        <input
                            className="ml-4 w-full rounded-xl bg-background-color-secondnary px-4 py-2"
                            placeholder={t('write_feedback')}
                            ref={inputRef}
                            value={''}
                            onChange={(e) => {}}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="absolute right-3">
                            <FontAwesomeIcon
                                className="cursor-pointer hover:text-text-color-link"
                                icon={faPaperPlane}
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatAI;
