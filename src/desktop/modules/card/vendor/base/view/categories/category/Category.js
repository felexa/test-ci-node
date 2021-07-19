import React from "react";
import PropTypes from "prop-types";

class Category extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="category new-super-box-shadow">
                <div className="category__header">
                    <div className="category__preview">
                        <img
                            src={this.props.category.getIcon().getOriginal()}
                            alt={this.props.category.getIcon().getAlt()}
                        />
                    </div>
                </div>

                <div className="category__body d-flex align-items-center flex-grow-1">
                    <a
                        href={this.props.category.getUrl()}
                        className="category__title d-block text-center line-height-1-5"
                    >
                        {this.props.category.getName()}
                    </a>

                    <div className="category__description box-shadow-9 d-none d-xl-flex flex-column">
                        <div className="description__text text-center color-black line-height-1-5 flex-grow-1">
                            {this.props.category.getDescription()}
                        </div>

                        <div className="description__go-over text-center">
                            <a
                                href={this.props.category.getUrl()}
                                className="btn-default btn-md"
                            >
                                Перейти
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    category: PropTypes.instanceOf(Object).isRequired
};

export default Category;
