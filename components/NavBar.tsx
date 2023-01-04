import Link from "next/link";
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <div className={styles.main}>
            <Link href="/">
                Home
            </Link>
            <Link href="/authors/allAuthors">
                All Authors
            </Link>
            <Link href="/books/allBooks">
                All Books
            </Link>
        </div>
    )
}