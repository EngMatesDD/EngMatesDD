import classNames from 'classnames';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemMessenger from '../ItemMessenger';

const cx = classNames;

function ContainerChat() {
    const inputRef = useRef();

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            //postFeedbackAPI();
        }
    };
    return (
        <div className={cx('flex flex-1 justify-center')}>
            <div className={cx('flex h-full w-[700px] flex-col items-center')}>
                {/* content messeage */}
                <div className={cx(' w-full flex-1 overflow-hidden overflow-y-scroll px-4')}>
                    <ItemMessenger isUser={true} />
                    <ItemMessenger />
                    <ItemMessenger isUser={true} />
                    <ItemMessenger />
                </div>
                {/* input chat */}
                <div className={cx('relative flex h-[80px] w-full items-center justify-center')}>
                    <input
                        className="w-full rounded-xl bg-background-color-secondnary px-4 py-2"
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
    );
}

export default ContainerChat;
