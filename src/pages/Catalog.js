import React from "react";
import PropTypes from "prop-types";

import CatalogModule from "desktop/modules/catalog/search/catalog";
import MainLayout from "app/desktop/layouts/main/Main";
import Error from "desktop/components/error/Error";
import ErrorBoundary from "desktop/components/errorBoundary/ErrorBoundary";

class Catalog extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {React.element}
     */
    getView() {
        return CatalogModule.getView(
            CatalogModule.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
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
 * @method getInitialProps
 * @param context {Object}
 * @param props {Object}
 * @returns {*}
 */
Catalog.getInitialProps = function (context, props) {
    return CatalogModule.getServerSideProps(context, props);
};

Catalog.propTypes = {
    hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    promoBanner: PropTypes.instanceOf(Object),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

Catalog.defaultProps = {
    hasError: false,
    breadcrumbs: [],
    promoBanner: {},
    pageInfo: {},
    initialData: {}
};

export default Catalog;
