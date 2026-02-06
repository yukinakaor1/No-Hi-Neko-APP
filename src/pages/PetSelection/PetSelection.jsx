import { Link, useNavigate } from 'react-router-dom';
import { usePet } from '../../context/PetContext';
import FreakyCat from '../../../assets/MeiMei.png';
import ThousandYardStareCat from '../../../assets/Arwin.png';
import SuspiciousCat from '../../../assets/Shan.png';
import CrashOutCat from '../../../assets/Leon.png';
import './PetSelection.css';

export default function PetSelection() {
    const navigate = useNavigate();
    const { selectThePet } = usePet();

    // Our 4 hardcoded pets with their own info (shown after bonding)
    const pets = [
        {
            id: 1,
            name: 'Freaky Ahh Cat',
            image: FreakyCat,
            breed: 'Domestic Shorthair',
            furPattern: 'Tuxedo',
            coatType: 'Short, sleek',
            likes: '3 AM zoomies, knocking things off tables',
            dislikes: 'Being ignored, closed doors',
            hobbies: 'Staring at walls, sudden acrobatics'
        },
        {
            id: 2,
            name: 'Thousand Yard Stare Cat',
            image: ThousandYardStareCat,
            breed: 'Domestic Shorthair',
            furPattern: 'Tabby',
            coatType: 'Short, dense',
            likes: 'Windowsills, existential contemplation',
            dislikes: 'Loud noises, eye contact',
            hobbies: 'Staring into the void, judging from afar'
        },
        {
            id: 3,
            name: 'Suspicious Cat',
            image: SuspiciousCat,
            breed: 'Domestic Shorthair',
            furPattern: 'Tabby',
            coatType: 'Medium, fluffy',
            likes: 'Hidden treats, high vantage points',
            dislikes: 'Unexpected guests, sudden movements',
            hobbies: 'Eavesdropping, side-eyeing everyone'
        },
        {
            id: 4,
            name: 'Crash Out Cat',
            image: CrashOutCat,
            breed: 'Domestic Longhair',
            furPattern: 'Tabby',
            coatType: 'Short, soft',
            likes: 'Naps in sunbeams, being draped over furniture',
            dislikes: 'Early mornings, excessive activity',
            hobbies: 'Sleeping in weird positions, dramatic flops'
        }
    ];

    const handleSelect = (pet) => {
        // 1. Tell the Cloud "We picked this one!"
        selectThePet(pet);
        // 2. Move to the next room
        navigate('/pet');
    };

    return (
        <div className="app-page-center">
        <div className="pet-selection-page">
            <header className="pet-selection-header">
                <Link to="/" className="pet-selection-back-btn" aria-label="Back">
                    &lt;
                </Link>
                <div className="pet-selection-title">Cat Selection</div>
            </header>
            <div className="pet-selection-grid">
                {pets.map(pet => (
                    <div
                        key={pet.id}
                        className="pet-selection-card"
                        onClick={() => handleSelect(pet)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleSelect(pet)}
                    >
                        <div className="pet-selection-image-wrap">
                            <img src={pet.image} alt={pet.name} />
                        </div>
                        <button type="button" className="pet-selection-name-btn">
                            {pet.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}