import { OWNER_NAME, CURRENT_YEAR } from '../data/navbar.js';
import '../css/footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
             <div className="copyright">
                    <span>
                        Copyright &copy; {CURRENT_YEAR} · All rights reserved · Designed by {OWNER_NAME}
                    </span>
                </div>
        </footer>
    )
}