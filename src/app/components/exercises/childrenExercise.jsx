import React from "react";
import PropTypes from "prop-types";
import CollapseWrapper from "../common/collapse";

const NumberedList = ({ children }) => {
    // либо, если нужно быть привязанным только к выдаче на странице
    // let counter = 0;
    return React.Children.toArray(children).map((child) => {
        // counter++;
        return React.cloneElement(child, {
            ...child.props,
            order: +child.key.slice(1) + 1
            // order: counter
        });
    });
};

NumberedList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>

            <NumberedList>
                <Component />
                <Component />
                <Component />
            </NumberedList>
        </CollapseWrapper>
    );
};

const Component = ({ order }) => {
    return <div>{order}. Компонент списка</div>;
};

Component.propTypes = {
    order: PropTypes.number
};

export default ChildrenExercise;
