import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import './pet-page.css';

export default function PetPage() {
    const {
        selectedPet,
        bondingLevel,
        incrementBond,
        petName,
        readyToName,
        adoptPet
    } = usePet();

    const [tempName, setTempName] = useState('');

    // =========================
    // EMPTY STATE – NO CAT YET
    // =========================
    if (!selectedPet) {
        return (
            <div className="app-page-center">
                <div className="pet-page-wrap">
                    <div className="pet-page-empty">
                        <h2>No Cat Yet 🐾</h2>
                        <p>Your future best friend is waiting.</p>
                        <Link to="/select" className="link-btn">
                            Select a Cat
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // BONDING STATE
    // =========================
    const isFullyBonded =
        petName !== null && petName !== undefined && petName !== '';

    const bondPercent = Math.min(100, Math.round(bondingLevel));
    const isReadyToName = readyToName;

    const handleSaveName = () => {
        if (tempName.trim()) {
            adoptPet(tempName.trim());
        }
    };

    if (!isFullyBonded) {
        return (
            <div className="app-page-center">
                <div className="pet-page-wrap">
                    <div className="pet-page-bonding-header">
                        <Link
                            to="/"
                            className="pet-page-back-btn"
                            aria-label="Back"
                        >
                            &lt;
                        </Link>
                        <span className="pet-page-bonding-title">
                            Pet Me!
                        </span>
                    </div>

                    <div className="bonding-layout">
                        <div className="bonding-cat-frame">
                            <img
                                src={selectedPet.image}
                                alt={selectedPet.name}
                            />
                        </div>

                        <div className="bonding-right">
                            <div className="progress-ring-wrap">
                                <div
                                    className="progress-ring"
                                    style={{ '--p': bondPercent }}
                                    aria-hidden
                                />
                                <div className="progress-ring-inner">
                                    <span className="progress-ring-text">
                                        {bondPercent}%
                                    </span>
                                </div>
                            </div>

                            {!isReadyToName ? (
                                <button
                                    type="button"
                                    className="bonding-action-btn"
                                    onClick={incrementBond}
                                >
                                    Pet!
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="bonding-action-btn"
                                        disabled
                                    >
                                        He’s your Cat Now!
                                    </button>

                                    <div className="bonding-name-section">
                                        <p className="name-prompt">
                                            Name your Cat:
                                        </p>
                                        <div className="name-row">
                                            <input
                                                type="text"
                                                className="name-input"
                                                value={tempName}
                                                onChange={(e) =>
                                                    setTempName(e.target.value)
                                                }
                                                placeholder="Enter name..."
                                            />
                                            <button
                                                type="button"
                                                className="save-name-btn"
                                                onClick={handleSaveName}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // FINAL – MY CAT PAGE
    // =========================
    return (
        <div className="app-page-center">
            <div className="pet-page-container">
                <div className="pet-page-header">
                    <Link
                        to="/"
                        className="pet-page-back-btn"
                        aria-label="Back"
                    >
                        &lt;
                    </Link>
                    <div className="pet-page-title">My Cat</div>
                </div>

                <div className="pet-content">
                    <div className="pet-image-container">
                        <img
                            src={selectedPet.image}
                            alt={selectedPet.name}
                        />
                    </div>

                    <div className="pet-info-container">
                        <div className="pet-name-box">
                            {petName}
                        </div>

                        <div className="pet-details-box">
                            <p>
                                <strong>Breed:</strong>{' '}
                                {selectedPet.breed ?? '—'}
                            </p>
                            <p>
                                <strong>Fur Pattern:</strong>{' '}
                                {selectedPet.furPattern ?? '—'}
                            </p>
                            <p>
                                <strong>Coat Type:</strong>{' '}
                                {selectedPet.coatType ?? '—'}
                            </p>
                            <p>
                                <strong>Likes:</strong>{' '}
                                {selectedPet.likes ?? '—'}
                            </p>
                            <p>
                                <strong>Dislikes:</strong>{' '}
                                {selectedPet.dislikes ?? '—'}
                            </p>
                            <p>
                                <strong>Hobbies:</strong>{' '}
                                {selectedPet.hobbies ?? '—'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
