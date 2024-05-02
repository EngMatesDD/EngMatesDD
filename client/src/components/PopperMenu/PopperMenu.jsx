import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = classNames;

const defaultFn = () => {};

function PopperMenu({ children, items = [], handleClick = defaultFn }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} onClick={handleClick} />);
    };

    const renderResult = (attrs) => (
        <div className={cx('mr-2')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
                <div className={cx('overflow-y-auto py-[2px]')}>{renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <Tippy interactive delay={[0, 700]} offset={[1, 2]} render={renderResult}>
            {children}
        </Tippy>
    );
}

PopperMenu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
};

export default PopperMenu;
