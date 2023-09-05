import styles from "./ImageArticle.module.scss"

interface IImageArticle {
    hasMargin?: boolean,
    imgName: string,
    text?: string,
    column?: string,
    row?: string,
    maxHeight?: string
}


export function ImageArticle({ hasMargin, imgName, text, column = 1, row = 2, maxHeight, applyFilter = true }:
    { hasMargin?: boolean, imgName?: string, text?: string, column?: number, row?: number, maxHeight?: number, applyFilter?: boolean }) {

    return (
        <div className={`${styles.container} ${row} ${styles[`column${column}`]} ${styles[`row${row}`]}`} data-img>
            <div className={styles.imgContainer}>
                <img
                    alt={text || "project image"}
                    height={maxHeight}
                    className={`${maxHeight ? styles.imgWithHeight : ''} ${hasMargin ? styles.hasMargin : ''}`}
                    src={require(`../../../../assets/img/articlesImg/${imgName}`)}
                    data-apply-filter={applyFilter}
                ></img>
            </div>
            {/* <p className={styles.text}>{text}</p> */}
        </div>
    )
}