import React from "react";
import PropTypes from "prop-types";

import CatalogModule from "desktop/modules/catalog/search/activeIngredient/productCatalog";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "app/desktop/components/error/Error";
import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class MNN extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {Object|null}
     */
    getView() {
        return CatalogModule.getView(
            CatalogModule.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

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
MNN.getInitialProps = function (context, props) {
    return CatalogModule.getServerSideProps(context, props);
};

MNN.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

MNN.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default MNN;
