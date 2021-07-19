import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const StarRatings = dynamic(import("react-rating"), {ssr: false});

const SVGIcon = (props) => (
    // eslint-disable-next-line react/prop-types
    <i style={{fontSize: `${props.fontSize}px`}} className={`icon icon-star ${props.className} `} />
);

function Rating(props) {
    let {
        rating, className, fontSize, readonly, onChange, onClick, onHover
    } = props;

    return (
        <div className={classNames("rating", className)}>
            <StarRatings
                start={0}
                stop={5}
                fractions={1}
                initialRating={rating}
                fullSymbol={<SVGIcon className="icon-star--active" fontSize={fontSize} />}
                emptySymbol={<SVGIcon className="icon-star--empty" fontSize={fontSize} />}
                readonly={readonly}
                onChange={onChange}
                onClick={onClick}
                onHover={onHover}
            />
        </div>
    );
}

Rating.propTypes = {
    rating: PropTypes.number,
    className: PropTypes.string,
    fontSize: PropTypes.string,
    readonly: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onHover: PropTypes.func
};

Rating.defaultProps = {
    rating: 0,
    className: "",
    fontSize: "24",
    readonly: false,
    onChange: () => {},
    onClick: () => {},
    onHover: () => {}
};

export default Rating;
