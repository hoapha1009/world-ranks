import { GetStaticProps } from "next";
import React, { useState } from "react";
import CountriesTable from "../component/CountriesTable";
import Layout from "../component/Layout";
import SearchInput from "../component/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countries }) {
    const [keyword, setKeyword] = useState<string>("");

    const filteredCountries = countries.filter((c) => {
        return (
            c.name.toLowerCase().includes(keyword) ||
            c.region.toLowerCase().includes(keyword) ||
            c.subregion.toLowerCase().includes(keyword)
        );
    });

    const onHandleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();

        setKeyword(e.currentTarget.value.toLowerCase());
    };

    return (
        <Layout title="World Rank">
            <div className={styles.counts}>
                Found {countries.length} countries
            </div>

            <SearchInput
                onChange={onHandleChange}
                placeholder="Filter by Name, Region, SubRegion"
            />

            <CountriesTable countries={filteredCountries} />
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    return {
        props: {
            countries,
        },
    };
};
