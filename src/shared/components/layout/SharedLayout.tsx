import { Suspense} from "react";
import css from "./SharedLayout.module.css";
import Header from "@/shared/components/layout/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/shared/components/layout/footer/Footer";




export const SharedLayout = () => {
    return (
        <div className={css.container}>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet /> 
            </Suspense>
            <Footer/>
        </div>
    )
}