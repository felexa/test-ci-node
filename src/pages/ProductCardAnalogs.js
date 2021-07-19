import React from "react";
import PropTypes from "prop-types";

import ProductCard from "desktop/modules/product/analogs";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class ProductCardAnalogs extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    getView() {
        let module = ProductCardAnalogs.getModuleByPageType(this.props.pageInfo.type);

        return (
            module &&
            module.getView(
                module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
            )
        );
    }

    render() {
        let lang = this.props.pageInfo.language,
            {promoBanner, breadcrumbs, hasError} = this.props;

        return (
            <ErrorBoundary language={lang}>
                <MainLayout pageType={this.props.pageInfo.type} breadcrumbs={breadcrumbs} promoBanner={promoBanner}>
                    {hasError && <Error language={lang} />}
                    {!hasError && <ErrorBoundary language={lang}>{this.getView()}</ErrorBoundary>}
                </MainLayout>
            </ErrorBoundary>
        );
    }
}

/**
 * @static
 * @method getModuleByPageType
 * @param type {string}
 * @returns {Object|null}
 */
ProductCardAnalogs.getModuleByPageType = function (type) {
    let result = null;

    if (type === "product") {
        result = ProductCard;
    }

    return result;
};

/**
 * @example
 *
 * props = {
 *   pageInfo: Object,
 *   pageProps: {
 *       breadcrumbs: Array,
 *       initialData: Object
 *   }
 * }
 *
 * @static
 * @method getInitialProps
 * @param context {Object}
 * @param props {Object}
 * @returns {*}
 */
ProductCardAnalogs.getInitialProps = function (context, props) {
    let module = ProductCardAnalogs.getModuleByPageType(props.pageInfo.type);

    return module && module.getServerSideProps(context, props);
};

ProductCardAnalogs.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

ProductCardAnalogs.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default ProductCardAnalogs;
