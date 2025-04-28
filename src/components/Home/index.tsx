import React from 'react'
import { useNavigate } from "react-router-dom";
import {list} from './config'
import styles from './index.module.scss'

export const Home = () => {
    let navigate = useNavigate();

    const handleJumpPage = (url: string) => {
        navigate(url)
    }

    return (
        <div className={styles.home}>
            {
                list.map((group: any) => {
                    const {
                        title,
                        children
                    } = group ?? {}

                    return (
                        <div
                            className={styles.wraper}
                            key={title}
                        >
                            <div className={styles.title}>{title}</div>

                            <div className={styles.content}>
                                {
                                   children.map((item: any) => {
                                        const {
                                            title,
                                            desc,
                                            imgUrl,
                                            pageUrl
                                        } = item ?? {}

                                        return (
                                            <div
                                                className={styles.item}
                                                key={pageUrl}
                                                onClick={() => handleJumpPage(pageUrl)}
                                            >
                                                <img src={imgUrl} />

                                                <div className={styles.itemTitle}>{title}</div>
                                                <div className={styles.desc}>{desc}</div>
                                            </div>
                                        )
                                   }) 
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
