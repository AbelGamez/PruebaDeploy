// import React from 'react';
import PropTypes from 'prop-types';

const Container =({ children, className, ...rest}) => {
    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default Container;