import styles from "./ImageArticle.module.scss"

interface IImageArticle {
    hasMargin?: boolean,
    imgName: string,
    text?: string,
    column?: string,
    row?: string,
    maxHeight?: string
}


export function ImageArticle({ hasMargin, imgName, text, column = 1, row = 2, maxHeight }:
    { hasMargin?: boolean, imgName: string, text?: string, column?: number, row?: number, maxHeight?: number }) {

    return (
        <div className={`${styles.container} ${row} ${styles[`column${column}`]} ${styles[`row${row}`]}`} data-img>
            <div className={styles.imgContainer}>
                <img
                    height={maxHeight}
                    className={`${styles[maxHeight ? 'imgWithHeight' : '']} ${styles[hasMargin ? 'imgWithMargin' : '']}`}
                    src={require(`../../../../assets/img/articlesImg/${imgName}`)}
                ></img>
            </div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}