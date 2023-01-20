import React, { useEffect, useState, useMemo } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

function runFactorial(n) {
    console.log("Run factorial func");
    return factorial(n);
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100);
    const [otherState, setOtherState] = useState(false);

    const btnColor = { value: otherState ? "primary" : "secondary" };
    const fact = useMemo(() => runFactorial(value), [value]);
    useEffect(() => {
        console.log("render Btn color");
    }, [btnColor]);
    const handleIncrement = () => {
        setValue((prevState) => prevState + 100);
    };
    const handleDecrement = () => {
        setValue((prevState) => prevState - 100);
    };
    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <p>value {value}</p>
                <p>Result fact {fact}</p>
            </CardWrapper>
            <button
                className="btn btn-primary ms-md-2"
                onClick={handleIncrement}
            >
                Increment
            </button>
            <button
                className="btn btn-primary ms-md-2"
                onClick={handleDecrement}
            >
                Decrement
            </button>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    className={`btn btn-${btnColor.value} ms-md-2`}
                    onClick={() => {
                        setOtherState((prevState) => !prevState);
                    }}
                >
                    Change Color
                </button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
