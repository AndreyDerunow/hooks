import React, { useState, useEffect, useCallback } from "react";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData
}) => {
    const [data, setData] = useState(defaultData || {});
    const [errors, setErrors] = useState({});

    const handleChange = useCallback(
        (target) => {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        },
        [setData]
    );

    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
    };
    const handleKeyDown = useCallback((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const el = e.target;
            const form = e.target.form.elements;
            const indexElement = [...form].findIndex((formel) => formel === el);
            form[indexElement + 1].focus();
        }
    }, []);

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
    }, [data]);

    const isValid = Object.keys(errors).length === 0;
    const clonedElements = React.Children.map(children, (child) => {
        let config = {};
        const childType = typeof child.type;
        if (childType === "object") {
            if (!child.props.name) {
                throw new Error("field name is requared");
            }
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
        }
        if (childType === "string") {
            if (child.type === "button") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === "undefined"
                ) {
                    config = {
                        ...child.props,
                        disabled: !isValid,
                        onSubmit: handleSubmit
                    };
                }
            }
        }
        return React.cloneElement(child, config);
    });

    return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    validatorConfig: PropTypes.object,
    onSubmit: PropTypes.func,
    defaultData: PropTypes.object
};

export default FormComponent;
