import React, { useCallback, useEffect, useRef, useState } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

const UseCallBackExample = () => {
    const [data, setData] = useState({});
    const withOutCallback = useRef(0);
    const withCallback = useRef(0);
    const handleChange = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const ValidateWithOutCallback = (data) => {
        console.log(data);
    };
    const ValidateWithCallback = useCallback((data) => {
        console.log(data);
    }, []);
    console.log(
        "withOutCallback",
        withOutCallback.current,
        "withCallback",
        withCallback.current
    );
    useEffect(() => {
        ValidateWithCallback(data);
        ValidateWithOutCallback(data);
    }, [data]);
    useEffect(() => {
        withOutCallback.current++;
    }, [ValidateWithOutCallback]);
    useEffect(() => {
        withCallback.current++;
    }, [ValidateWithCallback]);
    return (
        <CardWrapper>
            <SmallTitle>Example</SmallTitle>
            <p>Render without callback: {withOutCallback.current}</p>
            <p>Render without callback: {withCallback.current}</p>

            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input
                onChange={handleChange}
                type="email"
                value={data.email || ""}
                className="form-control"
                name="email"
                id="email"
            />
        </CardWrapper>
    );
};

export default UseCallBackExample;
