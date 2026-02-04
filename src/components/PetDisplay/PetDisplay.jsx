import styles from './PetDisplay.module.css';

function PetDisplay(props) {
    return (
        <div style={{ border: '2px solid #ccc', padding: '20px', margin: '20px', borderRadius: '10px', textAlign: 'center' }}>
            <h2>{props.name}</h2>

            {/* Visualizing the bond */}
            <p>Bond Level: {props.bondingLevel}</p>

            <div style={{ fontSize: '50px' }}>
                {props.mood}
            </div>
            {/* The Interaction */}
            <button className={styles.btn} onClick={props.onBond}>
                ❤️ Bond
            </button>
        </div>
    );
}
export default PetDisplay;
