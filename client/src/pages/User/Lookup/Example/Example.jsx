import classNames from 'classnames/bind';
import styles from './Example.module.scss';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { setTranslate, translate } from '~/services/translationSevice';

const cx = classNames.bind(styles);

function Example({ isOpenAllMean, example, index }) {
    const [isOpenVietnamese, setIsOpenVietnamese] = useState(isOpenAllMean);
    const [meanVietNamese, setMeanVietNamese] = useState('Không dịch được');

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const handleTranslate = async () => {
        await setTranslate({ isRelease: true }, token);
        const data = {
            text: example.example,
            to: 'vi',
        };
        const resultTranslate = await translate(data, token);
        setMeanVietNamese(resultTranslate);
        await setTranslate({ isRelease: false }, token);
    };

    const toggle = () => {
        setIsOpenVietnamese(!isOpenVietnamese);
    };

    useEffect(() => {
        handleTranslate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsOpenVietnamese(isOpenAllMean);
    }, [isOpenAllMean]);

    return (
        <div className={cx('gap-5 md:flex')} key={index}>
            <span className={cx('text-3xl leading-5')}>-</span>
            <span className={cx('pl-1 italic')}>{example.example} </span>
            <button onClick={() => toggle()} className=" hover:rounded-lg hover:bg-blue-100">
                <FontAwesomeIcon icon={faCaretLeft} className={`mx-3 text-lg ${isOpenVietnamese ? 'hidden' : ''}`} />
                <FontAwesomeIcon icon={faCaretRight} className={`mx-3 text-lg ${isOpenVietnamese ? '' : 'hidden'}`} />
            </button>
            <p className={cx(`bg-yellow-50 pl-1 italic ${isOpenVietnamese ? '' : 'hidden'}`)}>{meanVietNamese}</p>
        </div>
    );
}
export default Example;
