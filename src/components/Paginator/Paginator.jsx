import React, { useState } from 'react';
import cl from './../../styles/Paginator.module.css'

const Paginator = (props) => {
    
    let pagesCount = Math.ceil(props.total / props.limit);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.limit)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.limit + 1;
    let rightPortionPageNumber = portionNumber * props.limit;

    return (
        <div>
            {portionNumber > 1 &&
                <button className={cl.btn} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>}

            <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((page) => {
                        return (
                            <span
                                key={page}
                                className={props.page === page ? `${cl.selectedPage} ${cl.paginationSpan}` : `${cl.paginationSpan}`}
                                onClick={() => { props.getUsers(page - 1) }}
                            >{page}</span>
                        )
                    })}
            </div>

            {portionCount > portionNumber &&
                <button className={cl.btn} onClick={() => {
                    setPortionNumber(portionNumber + 1)

                }}>Next</button>}
        </div>
    )
}

export default Paginator;