import _ from "lodash";
import styles from '../styles/Home.module.css'
import { getEntriesByContentType } from "../lib/helpers";

export default function Home(props: Promise<any>) {
  const book = _.get(props, "book");
  const title = _.get(book, "fields.title");
  const authorName = _.get(book, "fields.author[0].fields.authorname");
  const yearPublished = _.get(book, "fields.yearPublished");

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>
            My Home Library
          </h1>
        </div>
        <div className={styles.bookCard}>
          <div>{title}</div>
          <div>{yearPublished}</div>
          <div>{authorName}</div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps(): Promise<any> {
  const bookEntries = await getEntriesByContentType("product");
  let homepageBook = _.get(bookEntries, "items[0]");

  return {
    props: {
      book: homepageBook ? homepageBook : {},
    },
  };
}