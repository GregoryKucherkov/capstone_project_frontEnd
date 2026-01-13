import css from "./ExercisesCategories.module.css"
import CloseIcon from "@/assets/icons/x.svg?react"
import SearchIcon from "@/assets/icons/search.svg?react"

export type FilterType = "Muscles" | "Body parts" | "Equipment";

interface ExercisesCategoriesProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
}


const ExercisesCategories = ({
    searchValue, 
    onSearchChange,
    onSearchSubmit
}: ExercisesCategoriesProps) => {

    return (
        <>
            <div className={css.searchContainer}>
                <form className={css.searchForm} onSubmit={onSearchSubmit}>
                    <input 
                        type="text"
                        placeholder="Search exercises..."
                        value={searchValue}
                        className={css.searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />

                    <div className={css.searchActions}>
                        {searchValue && (
                        <button
                            type="reset"
                            className={css.clearBtn}
                            onClick={() => onSearchChange("")}
                            aria-label="Clear search"
                        >
                            <CloseIcon />
                        </button>
                        )}

                        <button type="submit" className={css.searchBtn} aria-label="Search">
                        <SearchIcon style={{stroke: "black"}}/>
                        </button>
                    </div>
                </form>
            </div>

        {/* if need filtration by pre-defined buttons */}
            {/* <ul className={css.exercises__buttons}>
                {categories.map((type) => (
                    <li key={type} className={css.exercises__btn_item}>
                        <button 
                            className={`${css.exercises__btn_smpl} ${filterType === type ? css.active : ""}`}
                            onClick={() => onSelect(type)}
                        >
                            {type}
                        </button>
                    </li>
                ))}
            </ul> */}
        </>
    )
}

export {ExercisesCategories}