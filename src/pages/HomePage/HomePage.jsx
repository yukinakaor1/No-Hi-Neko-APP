import { Link } from 'react-router-dom';
import './home-page.css';

export default function HomePage() {
    return (
        <div className="homepage-container">
            <div className="homepage-title-block">
                <h1 className="title-text">猫の日</h1>
                <p className="subtitle-text">- neko no hi -</p>
            </div>

            <div className="button-container">
                <Link to="/pet" className="nav-button">My Cat</Link>
                <Link to="/select" className="nav-button">Cat Selection</Link>
            </div>
        </div>
    );
}