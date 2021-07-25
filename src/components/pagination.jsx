import React, { Component } from 'react'

export class Pagination extends Component {

    state = {
        isEditable: false,
    }

    render() {
        const { 
            handlePageChange,
            goTopage,
            currentPage,
            totalPages,
            isPrevious,
            isNext,
            next,
            prev,
        } = this.props
        return (
            <div className="d-flex my-5 align-items-center">
                <button className="btn btn-sm btn-warning" disabled={!isPrevious} onClick={()=>prev()}>Previous</button>
                <div className="flex-grow-1 text-center">
                    {this.state.isEditable ? (
                        <input 
                            type="number" 
                            value={currentPage}
                            onChange={e=>handlePageChange(e.target.value)}
                            onKeyPress={e=>{
                                if(e.key === 'Enter'){
                                    goTopage()
                                    this.setState({isEditable: false})
                                }
                            }}
                        />
                    ) : (
                        <p
                            style={{
                                userSelect:"none",
                                lineHeight: '1.1',
                            }}
                            title="Double Click To Jump Page"
                            onDoubleClick={()=>{
                                this.setState({isEditable: !this.state.isEditable})
                            }}
                        >
                            {currentPage} of {totalPages}
                            <br />
                            <small>Double Tap To Edit</small>
                        </p>
                    )}
                </div>
                <button className="btn btn-sm btn-warning ms-auto" disabled={!isNext} onClick={()=>next()}>Next</button>
            </div>
        )
    }
}

export default Pagination
