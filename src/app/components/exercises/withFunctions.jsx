import React, { useRef } from "react";
import CardWrapper from "../common/Card";

const withFunctions = (Component) => (props) => {
    const isAuth = localStorage.getItem("auth");
    const componentRef = useRef();
    const onLogin = ({ target }) => {
        target.remove();
        localStorage.setItem("auth", "token");
        componentRef.current.append(
            "Чтобы изменения вступили в силу, пожалуйста, обновите страницу"
        );
    };
    const onLogOut = ({ target }) => {
        target.remove();
        localStorage.removeItem("auth");
        componentRef.current.append(
            "Чтобы изменения вступили в силу, пожалуйста, обновите страницу"
        );
    };
    return (
        <CardWrapper>
            <Component
                isAuth={!!isAuth}
                onLogOut={onLogOut}
                onLogin={onLogin}
            />
            <p ref={componentRef}>{""}</p>
        </CardWrapper>
    );
};

export default withFunctions;
