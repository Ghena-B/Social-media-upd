import React from 'react';

const Textarea = React.forwardRef((props, ref) => {

        const {
            label,
            name,
            error,
            ...rest
        } = props

        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <textarea
                    name={name}
                    {...rest}
                />
                {error && <span className="error">{error}</span>}
            </div>
        )
    }
);
export default Textarea;

