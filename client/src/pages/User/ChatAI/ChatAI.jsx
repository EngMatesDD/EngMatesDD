import classNames from 'classnames';

import ItemChat from './ItemChat';
import ContainerChat from './ContainerChat';

const cx = classNames;

const listChat = [1, 2, 3, 4, 453, 214, 1, 34, 23, 42, 3, 2, 342, 35, 2, 3, 9, 0, 6];

function ChatAI() {
    return (
        <div className={cx('flex h-full w-full')}>
            {/* list chat */}
            <div className={cx('h-full w-[18%] overflow-y-scroll bg-slate-100 pt-3 text-sm')}>
                {listChat.map(() => (
                    <ItemChat />
                ))}
            </div>
            {/* content chat */}
            <ContainerChat />
        </div>
    );
}

export default ChatAI;
