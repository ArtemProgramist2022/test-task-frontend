import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../common/Preloader";
import cl from './../styles/HeadPage.module.css'
import Paginator from "./Paginator/Paginator";

const HeadPage = (props) => {

    if (props.isLogin) {
        let socket = new WebSocket('wss://test.relabs.ru/event');

        const openSocket = () => { }

        socket.addEventListener('open', openSocket);

        const messageSocket = (e) => {
            props.getEventWebSocket(JSON.parse(e.data));
        }

        if (props.events.length === 0) {
            socket.addEventListener('message', messageSocket);
        }

        const closeSocket = () => { }

        if (props.events.length === 10) {
            socket.removeEventListener('message', messageSocket);
        }

        socket.addEventListener('close', closeSocket);
    }

    useEffect(() => {
        props.getUsers(0);
    }, [])

    return (
        <div>
            {!props.isLogin && <Navigate to='/login' />}

            <div style={{ display: 'flex' }}>
                <div style={{ flexBasis: '60%' }}>
                    <h1 style={{ textAlign: 'center' }}>Список пользователей</h1>
                    <div className={cl.user}>
                        <p>ID</p>
                        <p>Имя</p>
                        <p>Роль</p>
                        <p>Дата создания</p>
                        <p>Действия</p>
                    </div>

                    {!props.isFetching ? props.items.map(user => {
                        return (
                            <div className={cl.user} key={user.id}>
                                <p>{user.id}</p>
                                <p>{user.name}</p>
                                <p>{user.role}</p>
                                <p>{10 > new Date(user.ctime).getDate() ? '0' + new Date(user.ctime).getDate() : new Date(user.ctime).getDate()}.
                                    {10 > new Date(user.ctime).getMonth() ? '0' + (+new Date(user.ctime).getMonth() + 1) : 1 + +new Date(user.ctime).getMonth()}.
                                    {new Date(user.ctime).getFullYear().toString()}{' '}
                                    {10 > new Date(user.ctime).getHours() ? '0' + new Date(user.ctime).getHours() : new Date(user.ctime).getHours()}:
                                    {10 > new Date(user.ctime).getMinutes() ? '0' + new Date(user.ctime).getMinutes() : new Date(user.ctime).getMinutes()}</p>
                                <button className={cl.deleteBtn} onClick={() => {
                                    props.deleteUser(user.id)
                                }}>Удалить</button>
                            </div>
                        )
                    }) : <div style={{ textAlign: 'center' }}><Preloader /></div>}

                    <Paginator limit={props.limit} total={props.total} page={props.page} getUsers={props.getUsers} />
           
                </div>

                <div style={{ flexBasis: '40%' }}>
                    <h1 style={{ textAlign: 'center' }}>События</h1>
                    <div className={cl.events}>
                        <p>Дата</p>
                        <p>Событие</p>
                    </div>

                    {props.events.map((event, index) => {
                        return <div className={cl.events} key={index}>
                            <p>{10 > new Date(event.ctime).getDate() ? '0' + new Date(event.ctime).getDate() : new Date(event.ctime).getDate()}.
                                {10 > new Date(event.ctime).getMonth() ? '0' + (+new Date(event.ctime).getMonth() + 1) : 1 + +new Date(event.ctime).getMonth()}.
                                {new Date(event.ctime).getFullYear().toString()}{' '}
                                {10 > new Date(event.ctime).getHours() ? '0' + new Date(event.ctime).getHours() : new Date(event.ctime).getHours()}:
                                {10 > new Date(event.ctime).getMinutes() ? '0' + new Date(event.ctime).getMinutes() : new Date(event.ctime).getMinutes()}</p>
                            <p>{event.event}</p>
                        </div>
                    })}

                </div>
            </div>

        </div>
    )
}

export default HeadPage;