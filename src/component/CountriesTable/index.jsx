import {
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
    if (direction === "asc") {
        return [...countries].sort((a, b) => {
            return a[value] > b[value] ? 1 : -1;
        });
    }

    if (direction === "desc") {
        return [...countries].sort((a, b) => {
            return a[value] > b[value] ? -1 : 1;
        });
    }

    return [...countries];
};

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }

    if (direction === "asc") {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    } else {
        return (
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    }
};

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if (direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    };

    return (
        <div>
            <div className={styles.heading}>
                <button
                    onClick={() => setValueAndDirection("name")}
                    className={styles.heading_name}
                >
                    <div>Name</div>

                    {value === "name" && <SortArrow direction={direction} />}
                </button>

                <button
                    onClick={() => setValueAndDirection("population")}
                    className={styles.heading_population}
                >
                    <div>Population</div>

                    {value === "population" && (
                        <SortArrow direction={direction} />
                    )}
                </button>
            </div>

            {orderedCountries.map((c) => (
                <div className={styles.row}>
                    <div className={styles.name}>{c.name}</div>

                    <div className={styles.population}>{c.population}</div>
                </div>
            ))}
        </div>
    );
};

export default CountriesTable;
