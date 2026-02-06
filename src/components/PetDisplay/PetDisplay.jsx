import { useState } from 'react';
import styles from './PetDisplay.module.css';

function PetDisplay(props) {
    const [tempName, setTempName] = useState("");

    const handleNameSubmit = () => {
        if (tempName.trim()) {
            props.onSaveName(tempName);
        }
    }

    const isReadyToName = props.bondingLevel >= props.bondTarget;
    const isNamed = !!props.petName;

    return (
        <div className={styles.card}>
            {props.image && (
                <img src={props.image} alt={props.name} className={styles.cardImage} />
            )}
            <h2 className={styles.cardName}>{props.name}</h2>
            <p className={styles.bondLevel}>Bond Level: {props.bondingLevel}</p>
            {props.mood && <div className={styles.mood}>{props.mood}</div>}

            {!isNamed && !isReadyToName && (
                <button type="button" className={styles.petBtn} onClick={props.onBond}>
                    Pet!
                </button>
            )}

            {!isNamed && isReadyToName && (
                <div className={styles.nameSection}>
                    <p className={styles.namePrompt}>You've bonded enough! Name your companion:</p>
                    <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Enter name..."
                        className={styles.nameInput}
                    />
                    <button type="button" onClick={handleNameSubmit} className={styles.saveBtn}>
                        Save Name
                    </button>
                </div>
            )}

            {isNamed && <p className={styles.bonded}>Forever Bonded!</p>}
        </div>
    );
}
export default PetDisplay;
