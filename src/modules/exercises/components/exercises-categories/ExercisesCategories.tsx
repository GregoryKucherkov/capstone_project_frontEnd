import css from "./ExercisesCategories.module.css"

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
                <form className={css.searchContainer} onSubmit={onSearchSubmit}>
                    <input 
                        type="text"
                        placeholder="Search exercises..."
                        value={searchValue}
                        className={css.searchInput}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <button type="submit" className={css.searchBtn}>Search</button>
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