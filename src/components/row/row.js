import { useClipboard } from 'use-clipboard-copy';
import { useRef } from 'react';

import './row.scss';

function Row({target, short, counter}) {
    const clipboard = useClipboard();
    const ref = useRef(null);
    const urlGenerator = 'https://front-test.hex.team/s';

    return (
        <div className='row'>
            <span>{ target }</span>
            <div className="row__column">
                <p ref={ref}>{`${urlGenerator}/${short}`}</p>
                <button className="row__btn" onClick={ () => clipboard.copy(ref.current.textContent) }>Скопировать</button>
            </div>
            <span>{ counter }</span>
        </div>
    )
}

export default Row;