import styles from "./ImageArticle.module.scss"


export function ImageArticle({ imgName, text }: { imgName: string, text: string }) {
    return (
        <div className={styles.container} data-img>
            <div className={styles.imgContainer}>
                <img src={require(`../../../../assets/img/articlesImg/${imgName}`)}></img>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}