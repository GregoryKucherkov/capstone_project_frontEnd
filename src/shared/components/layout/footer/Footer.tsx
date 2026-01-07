import Container from "@/shared/ui/container/Container";
import css from "./Footer.module.css";
import { Logo } from "@/shared/ui/logo/Logo";
import { SocialNetworks } from "@/shared/ui/social-networks/SocialNetworks";
import { Copyright } from "@/shared/components/layout/footer/copyright/Copyright";


export default function Footer() {
    return (
        <footer>
            <Container>
                <div className={css.wrapper}>
                    <Logo />
                    <SocialNetworks />
                </div>
            </Container>
            <div className={css.separator}></div>
            <Container>
                <Copyright />
            </Container>
            
        </footer>
    )
}