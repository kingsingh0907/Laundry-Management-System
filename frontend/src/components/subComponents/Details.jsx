import React from 'react'

const Details = (props) => {
    return (
        <>
            <div className={props.className}>
                <div className="col-md-6">
                    <p >{props.id}</p>
                </div>
                <div className="col-md-6">
                    <p>{props.value}</p>
                </div>
            </div>
        </>
    )
}

export default Details
