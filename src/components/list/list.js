import { useEffect, useState } from "react";
import { links } from '../../api/functions';

import Row from "../row/row";

import './list.scss';

function List({inputData, setInputData}) {
    const [order, setOrder] = useState('');

    function changeHandler(evt) {
        setOrder(evt.target.value);
    };

    useEffect(() => { dataSortHandler() }, [order]);

    function dataSortHandler() {
        links.sorting(localStorage.getItem('jwt'), order, '100000')
            .then((res) => {
                setInputData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function updateData() {
        links.statistics(localStorage.getItem('jwt'))
            .then((res) => {
                setInputData(res);
                setOrder('');
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className="list">
            <div className="list__sorting">
                <div className="list__column">
                    <div className="list__title">По возрастанию</div>
                    <label>
                        <input type='radio' value='asc_target' checked={order === 'asc_target'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Исходная ссылка</span>
                    </label>
                    <label>
                        <input type='radio' value='asc_short' checked={order === 'asc_short'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Короткая ссылка</span>
                    </label>
                    <label>
                        <input type='radio' value='asc_counter' checked={order === 'asc_counter'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Кол-во переходов</span>
                    </label>
                </div>
                <div className="list__column">
                    <div className="list__title">По убыванию</div>
                    <label>
                        <input type='radio' value='desc_target' checked={order === 'desc_target'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Исходная ссылка</span>
                    </label>
                    <label>
                        <input type='radio' value='desc_short' checked={order === 'desc_short'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Короткая ссылка</span>
                    </label>
                    <label>
                        <input type='radio' value='desc_counter' checked={order === 'desc_counter'} onChange={(evt) => changeHandler(evt)}/>
                        <span>Кол-во переходов</span>
                    </label>
                </div>
            </div>
            <button className="list__btn" onClick={ updateData }>Очистить сортировку</button>
            <div className="list__header">
                <div>Исходная ссылка</div>
                <div>Короткая ссылка</div>
                <div>Кол-во переходов</div>
            </div>
            <ul className="list__links">
                {
                    inputData.map((i) => (
                        <li key={ i.id }> 
                            <Row target={ i.target } short={ i.short } counter={ i.counter }/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default List;