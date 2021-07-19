import React from "react";
import CategoryModule from "desktop/modules/category";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "desktop/components/error/Error";
import ErrorBoundary from "desktop/components/errorBoundary/ErrorBoundary";
import PropTypes from "prop-types";

class Category extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {React.element}
     */
    getView() {
        return CategoryModule.getView(
            CategoryModule.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        let {promoBanner, breadcrumbs, hasError} = this.props;

        return (
            <ErrorBoundary>
                <MainLayout breadcrumbs={breadcrumbs} promoBanner={promoBanner}>
                    {hasError && <Error />}
                    {!hasError && <ErrorBoundary>{this.getView()}</ErrorBoundary>}
                </MainLayout>
            </ErrorBoundary>
        );
    }
}

/**
 * @static
 * @method getInitialProps
 * @param context {Object}
 * @param props {Object}
 * @returns {*}
 */
Category.getInitialProps = function (context, props) {
    return CategoryModule.getServerSideProps(context, props);
};

Category.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

Category.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default Category;
