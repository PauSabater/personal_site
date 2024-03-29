import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./MethodSection.module.scss"
import { setMethodSectionAnimation } from "./MethodSection.animations"

export interface IMethodSectionTexts {
    title: string,
    methods: {
        title: string,
        description: string
    }[]
}

export function MethodSection({props, mode}: {props: IMethodSectionTexts, mode: string}) {

    const refContent: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        const elContent: HTMLElement | null = refContent.current
        if (elContent === null) return

        setMethodSectionAnimation(elContent)
    }, [])

    const collapseElement = (elCollapsible: HTMLElement): void => {
        if (elCollapsible === null) return
        elCollapsible.style.height = '1px'
        elCollapsible.style.opacity = '0'
    }

    const expandElement = (elToExpand: HTMLElement) => {
        elToExpand.style.height = elToExpand.scrollHeight.toString() + 'px'
        elToExpand.style.opacity = '1'
    }


    const handleClickEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        const elTarget = event.target as HTMLElement
        const elCollapsible: HTMLElement = elTarget.querySelector('.collapsible') as HTMLElement

        const attrIsExpanded = 'is-expanded'
        const attrIsUnfocused = 'is-unfocused'
        const attrDataCollapsible = 'data-collapsible'

        if (refContent.current === null) return
        const elsContainerCollapsible = (refContent.current as HTMLElement).querySelectorAll('.container-collapsible')
        const attrClickedEl: string = elTarget.getAttribute(attrDataCollapsible) || ''

        // Remove 'is-unfocused' attr when none is selected in order to restart elements:
        if (elTarget.hasAttribute(attrIsExpanded)) {
            Array.from(elsContainerCollapsible).forEach((elContainerCol) => {
                (elContainerCol as HTMLElement).removeAttribute(attrIsUnfocused)
                elTarget.removeAttribute(attrIsExpanded)
                collapseElement(elTarget.querySelector('.collapsible') as HTMLElement)
            })
        return

        // add is-expanded attr to the one clicked and add id-unfocused to the rest
        } else {
            // Unfocus containers that are not clicked when a collapsible should open
            Array.from(elsContainerCollapsible).forEach((elContainerCol) => {
                // Case it is expanded and not the one clicked
                if ((elContainerCol as HTMLElement).hasAttribute(attrIsExpanded) && elContainerCol.getAttribute(attrDataCollapsible) !== attrClickedEl) {
                    (elContainerCol as HTMLElement).removeAttribute(attrIsExpanded)
                    collapseElement(elContainerCol.querySelector('.collapsible') as HTMLElement)
                }

                // Unfocus elements that are not clicked
                if (!(elContainerCol as HTMLElement).hasAttribute(attrIsUnfocused) && elContainerCol.getAttribute(attrDataCollapsible) !== attrClickedEl) {
                    (elContainerCol as HTMLElement).setAttribute(attrIsUnfocused, '')
                }

                // Expand clicked element
                if (elContainerCol.getAttribute(attrDataCollapsible) === attrClickedEl) {
                    (elContainerCol as HTMLElement).removeAttribute(attrIsUnfocused);
                    (elContainerCol as HTMLElement).setAttribute(attrIsExpanded, '');
                    expandElement(elContainerCol.querySelector('.collapsible') as HTMLElement)
                }
            })
        }

        if (elCollapsible === null) return
    }

    const splitLetters = (str: string): JSX.Element => {
        return (
            <div className={`${styles.spliLettersContainer} split-letters-container`}>
                {[...str].map((char, i): JSX.Element => {
                    return (
                        char !== '$'
                        ?   <div key={`char-${i}`} className={styles.charWrap}>
                                <pre className={char !== ' ' ? styles.char : styles.charEmpty}>
                                    {char !== ' ' ? char : '  '}
                                </pre>
                            </div>
                        :   <div key={`char-${i}`} className={styles.fillAvailable}></div>
                    )
                })}
            </div>
        )
    }

    const generateCollapsiblesTemplate = ()=> {
        return (
            <Fragment>
                {props.methods.map((method, i) =>
                    <div
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClickEvent(e)}
                        className={`${styles.containerCollapsible} container-collapsible`}
                        data-collapsible={`col-${i}`}
                        key={`method-${i}`}
                    >
                        <div className={`${styles.animatedContainer} animated-container`}>
                            <div className={styles.phraseContainer}>
                                <h2 className={styles.phrase}>{method.title}</h2>
                                <svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L11.5 11L22 1" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className={`${styles.collapsible} collapsible`}>
                                <p dangerouslySetInnerHTML={{__html: method.description}}></p>
                            </div>
                            <div className={`${styles.line} line`}/>
                        </div>
                    </div>
                )}
            </Fragment>
        )
    }

    return (
        <div className={styles.container} id="method-section" data-theme={mode}>
            <div className={styles.containerContent} ref={refContent}>
                {splitLetters(props.title)}
                {generateCollapsiblesTemplate()}
            </div>
        </div>
    )
}