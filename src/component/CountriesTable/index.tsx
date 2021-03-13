import {
    KeyboardArrowDownRounded,
    KeyboardArrowUpRounded,
} from "@material-ui/icons";
import Link from "next/link";
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
    const [direction, setDirection] = useState<string>();
    const [value, setValue] = useState<string>();

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
                Sort
                <div className={styles.heading_flag}></div>
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
                <button
                    className={styles.heading_area}
                    onClick={() => setValueAndDirection("area")}
                >
                    <div>
                        Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
                    </div>

                    {value === "area" && <SortArrow direction={direction} />}
                </button>
                <button
                    className={styles.heading_gini}
                    onClick={() => setValueAndDirection("gini")}
                >
                    <div>Gini</div>

                    {value === "gini" && <SortArrow direction={direction} />}
                </button>
            </div>

            {orderedCountries.map((c) => {
                return (
                    <Link
                        key={c.alpha3Code}
                        href="/country/[id]"
                        as={`/country/${c.alpha3Code}`}
                    >
                        <a>
                            <div className={styles.row}>
                                <div className={styles.flag}>
                                    <img src={c.flag} alt={c.name} />
                                </div>
                                <div className={styles.name}>{c.name}</div>

                                <div className={styles.population}>
                                    {c.population}
                                </div>

                                <div className={styles.area}>{c.area || 0}</div>

                                <div className={styles.gini}>
                                    {c.gini || "?"} %
                                </div>
                            </div>
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

export default CountriesTable;
