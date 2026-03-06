import { OWNER_NAME, CURRENT_YEAR } from '../data/navbar.js';
import '../css/footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span>Task</span>Bridge
                </div>
                <div className="copyright">
                    Copyright &copy; {CURRENT_YEAR} · All rights reserved · Designed by {OWNER_NAME}
                </div>
            </div>
        </footer>
    );
}
