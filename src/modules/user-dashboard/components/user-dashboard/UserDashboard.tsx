import css from "./UserDashboard.module.css"


export const UserDashboard = () => {
    return (
        <div className={css.container}>
            <h1 style={{ color: 'blue', fontSize: '24px', marginTop: '20px' }}>Dashboard</h1>
        </div>
    )
}