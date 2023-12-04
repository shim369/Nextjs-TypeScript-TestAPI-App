import Link from 'next/link';
import styles from '../page.module.css';


interface ModalProps {
    selectedUserName: string;
    selectedUserEmail: string;
    selectedUserWebsite: string;
    formattedWebsite: string;
    onClose: () => void;
}

export const Modal = ({ selectedUserName, selectedUserEmail, selectedUserWebsite, formattedWebsite, onClose }: ModalProps) => (
  <div id="modal" className={styles.hidden}>
    <h2>User Info</h2>
    <p>Name : {selectedUserName}</p>
    <p>Email : {selectedUserEmail}</p>
    <p>Website : {selectedUserWebsite && <Link href={formattedWebsite} target="_blank" rel="noopener noreferrer">{selectedUserWebsite}</Link>}</p>
    <button id="close" className={styles.closeBtn} onClick={onClose}>close</button>
  </div>
);