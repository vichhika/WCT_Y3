import React, { useContext, useEffect, useState } from 'react';
import { authContext } from "../../Context/AuthContext";
import axios from "axios";
import server from "./../../../config.json"
import { CircularProgress } from "@material-ui/core";


const trashCanStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}


const UserBuild = () => {
    const { contextAuthState } = useContext(authContext)
    const [totalPage, setTotalPage] = useState(1)
    const [current, setCurrent] = useState(1)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState([])


    useEffect(() => {
        setLoading(true)
        axios.get(server.uri + "build/product_index", {
            headers: { 'Authorization': `Bearer ${contextAuthState.token}` },
            params: {
                current_page: 10,
                page: current
            }
        }).then(r => {
            if (r.data.statusCode === 1) {
                setDisplay(r.data.message);
                setTotalPage(r.data.total_page);
            } else {
                console.log("wrong")
            }
            setLoading(false)
        }).catch(e => {
            console.log("erro", e)
            setLoading(false)
        })
    }, [current])

    const nextList = () => {
        if (totalPage > current) {
            setCurrent(current + 1)
        }
    }

    const previousList = () => {
        if (current > 1) {
            setCurrent(current - 1)
        }
    }

    const setCuttentList = listNum => {
        setCurrent(listNum)
    }

    const btns = () => {

        const btnpushing = i => {
            let btnClassname = "btn btn-outline-secondary"
            if (i === current) {
                btnClassname += " active"
            }

            console.log(btnClassname)

            btns.push(<button type="button" onClick={() => setCuttentList(i)}
                className={btnClassname}>{i}</button>)
        }

        let btns = []

        btns.push(<button type="button" onClick={() => setCuttentList(1)} className="btn btn-secondary">First</button>,
            <button type="button" onClick={previousList} className="btn btn-secondary">Previor</button>)

        if (current <= 3 || totalPage <= 5) {
            let List = Math.min(5, totalPage)
            for (let i = 1; i <= List; i++) {
                btnpushing(i);
            }
        } else if (current > 3 && current <= totalPage - 3) {
            for (let i = current - 2; i <= current + 2; i++) {
                btnpushing(i);
            }
        } else if (current > totalPage - 3) {
            for (let i = totalPage - 4; i <= totalPage; i++) {
                btnpushing(i);
            }
        }

        btns.push(<button type="button" onClick={nextList} className="btn btn-secondary">Next</button>,
            <button type="button" onClick={() => setCuttentList(totalPage)} className="btn btn-secondary">Last</button>)

        return btns;
    }



    let listItems = display.map(builded =>
        <div key={builded.productbuildID}>
            <div className="card"
                style={{ marginLeft: '30px' }}>
                <div className="card-body d-flex flex-row">
                    <img src="https://www.chantracomputer.com/DESKTOP%20SYSTEM/CASE/AEROCOOL/TOR-PRO-RGB.gif" width="6%"
                        height="auto" />
                    <div className="container d-flex justify-content-between">
                        <div>
                            <h4 data-toggle="modal" data-target={`#${builded.productbuildID}`}>
                                <b>{builded.cpu?.brand} {builded.cpu?.model} {builded.memory?.brand} {builded.memory?.model} {builded.videocard?.brand} {builded.videocard?.model}</b>
                            </h4>
                            <h6 className="mb-1">Price : <span className="text-danger">{builded.totalprice ? "$" + builded.totalprice : "Unavailable"}</span>
                            </h6>
                            <h6 className="mb-1">Owned By:<span> {builded.user}</span></h6>
                        </div>
                        <div onClick={() => deleteBuild(builded.productbuildID)} style={trashCanStyle}>
                            <button className="btn btn-light btn-sm"><i className="fad fa-trash text-danger" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="modal fade" id={builded.productbuildID} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{builded.cpu?.brand} {builded.cpu?.model} {builded.memory?.brand} {builded.memory?.model} {builded.videocard?.brand} {builded.videocard?.model}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><b>CPU</b> {builded.cpu?.brand} {builded.cpu?.model} {builded.cpu === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>GPU</b> {builded.videocard?.brand} {builded.videocard?.model} {builded.videocard === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Ram</b> {builded.memory?.brand} {builded.memory?.model} {builded.memory === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Monitor</b> {builded.monitor?.brand} {builded.monitor?.model} {builded.monitor === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Motherboard</b> {builded.motherboard?.brand} {builded.motherboard?.model} {builded.motherboard === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Disk</b> {builded.internalharddrive?.brand} {builded.internalharddrive?.model} {builded.internalharddrive === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Powersupply</b> {builded.powersupply?.brand} {builded.powersupply?.model} {builded.powersupply === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Case</b> {builded.casepc?.brand} {builded.casepc?.model} {builded.casepc === null && <span className="text-danger">Unavailable</span>}</p>
                            <p><b>Price</b> <span className="text-danger">{builded.totalprice ? "$" + builded.totalprice : <span className="text-danger">Unavailable</span>}</span></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        console.log("hellllo", display);
    }, [display])


    const deleteBuild = id => {
        axios.post(server.uri + "build/delete",
            { productbuildID: id },
            { headers: { 'Authorization': `Bearer ${contextAuthState.token}` } })
            .then(r => {
                if (r.data.statusCode === 1) {
                    let tmp = display;
                    tmp.splice(tmp.indexOf(tmp.find(e => e.productbuildID === id)), 1)
                    setDisplay([...tmp])
                }
            }).catch(e => {
            })
    }


    return (

        <div className="container my-3">
            <h3 style={{ borderLeft: '3px solid', paddingLeft: '20px' }}>
                Your Build
            </h3>
            <br />
            {loading ? <div className="d-flex justify-content-center"><CircularProgress size="10rem" /></div> :
                <div>
                    {listItems}
                    <br />
                    <div className="d-flex justify-content-end">
                        <div className="btn-group" role="group" aria-label="First group">
                            {totalPage === 1 || btns()}
                        </div>
                    </div>
                </div>}

        </div>

    );
}

export default UserBuild;