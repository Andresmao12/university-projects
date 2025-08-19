import React, { useEffect, useState } from 'react';
import styles from './BannerMember.module.css';

function BannerMember({ name, description, direction }) {
    console.log(direction == undefined)
    return (
        <section className={`${styles.section} `} >
            <div className={`${styles.content} ${direction == 'right' ? styles.slideToRight : styles.slideToLeft}`} >
                {(!direction || direction == 'left') && <img
                    src="https://i.ytimg.com/vi/BH8HFkdcjZc/maxresdefault.jpg"
                    alt="Foto de perfil"
                    className={styles.profileImage}
                />}

                <div className={styles.textContainer}>
                    <h1 className={styles.name}>{name}</h1>
                    <p className={styles.description}>
                        {description}
                    </p>
                </div>

                {direction == 'right' && <img
                    src="https://i.ytimg.com/vi/BH8HFkdcjZc/maxresdefault.jpg"
                    alt="Foto de perfil"
                    className={styles.profileImage}
                />}
            </div>
        </section>
    );
}

export default BannerMember;