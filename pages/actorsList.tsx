import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
// import "dotenv/config";  NE PAS METTRE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const actors = await mongodb.db().collection("actor").find().toArray();
  console.log(process.env.MONGODB_URI);
  const actorsStringify = JSON.stringify(actors);
  const actorsParse = JSON.parse(actorsStringify);
  return {
    props: {
      actors: actorsParse,
    },
  };
};

export default function actorsList({ actors }) {
  return (
    <div>
      <div>
        <button>
          <Link href="/">HomePage</Link>
        </button>
      </div>
      <br />
      <div>
        <p>Element qui s'affiche provenant de la DB :</p>
        <p>
          {actors.map((element) => (
            <ul>{element.lastName}</ul>
          ))}
        </p>
      </div>
      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          Powered by{" Kevin"}
          <span className={styles.logo}></span>
        </a>
      </footer>
    </div>
  );
}
