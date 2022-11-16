import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
    action?: () => {} | undefined;
    nonaction?: () => {} | undefined;
    content?: JSX.Element | undefined;
    actionText?: string | undefined;
    nonactionText?: string | undefined;
    title?: string | undefined;
    actionOutside?: () => {} | undefined;
    top?: string | number | undefined;
    fontFamily?: string | undefined;
    style?: React.CSSProperties | undefined;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    children: React.ReactNode | undefined;
    fullViewScroll?: boolean | undefined;
};

const Modal = (props: Props) => {
    const { action, nonaction, content, actionText, nonactionText, title, actionOutside, top, style, state, children, fontFamily, fullViewScroll } = props;
    const [openModal, setOpenModal] = state;
    return (
        <>
            {openModal && (
                <>
                    <div
                        className={styles.wrapper}
                        onClick={() => {
                            actionOutside && actionOutside();
                            setOpenModal((e) => !e);
                        }}
                    ></div>
                    <div className={clsx({ [styles.fullViewScroll]: fullViewScroll })}>
                        <div style={{ ...style, top, fontFamily }} className={styles.container}>
                            <div className={styles.title}>
                                <div className={styles.buttonWrapper}>
                                    <svg
                                        onClick={() => {
                                            setOpenModal((e) => !e);
                                        }}
                                        className={styles.buttonClose}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={288}
                                        height={288}
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="#fff"
                                            d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
                                            className="color000 svgShape"
                                        />
                                    </svg>
                                </div>
                                <p className={styles.titleText}>{title ? title : 'title'}</p>
                            </div>
                            <div className={styles.contentWrapper}>{content ? content : children}</div>

                            <div className={styles.end}>
                                <div className={styles.endButtonWrapper}>
                                    {nonaction && (
                                        <button
                                            type="submit"
                                            className={styles.cancel}
                                            onClick={() => {
                                                nonaction && nonaction();
                                                setOpenModal((e) => !e);
                                            }}
                                        >
                                            {nonactionText ? nonactionText : 'cancel'}
                                        </button>
                                    )}
                                    {action && (
                                        <button
                                            type="submit"
                                            className={styles.accept}
                                            onClick={() => {
                                                action ? action() : setOpenModal((e) => !e);
                                            }}
                                        >
                                            {actionText ? actionText : 'oke'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
