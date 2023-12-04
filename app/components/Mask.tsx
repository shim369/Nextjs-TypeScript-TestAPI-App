import styles from '../page.module.css';


interface MaskProps {
    onClick: () => void;
}

export const Mask = ({ onClick }: MaskProps) => (
    <div id="mask" className={styles.hidden} onClick={onClick}></div>
);