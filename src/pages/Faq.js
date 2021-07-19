import React from "react";
import PropTypes from "prop-types";

import MainLayout from "app/desktop/layouts/main/Main";

import Answer from "desktop/modules/faq/answer";
import Questions from "desktop/modules/faq/questions";

// import Error from "app/desktop/components/error/Error";
// import ErrorBoundary from "app/desktop/components/errorBoundary/ErrorBoundary";

class Faq extends React.Component {
    /**
     * @private
     * @method getView
     * @returns {String}
     */
    getView() {
        let module = Faq.getModuleByPageType(this.props.pageInfo.type);

        return (
            module && module.getView(
                module.normalizeInitialProps(this.props.initialData, this.props.pageInfo), this.props.pageInfo
            )
        );
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        let breadcrumbs = this.props.breadcrumbs || [],
            pageType = this.props.pageInfo.type || "";

        if (pageType === "medical-answer") {
            breadcrumbs.push({});
            breadcrumbs.length = 2;
        }

        return (
            <MainLayout breadcrumbs={breadcrumbs}>
                {this.getView()}
            </MainLayout>
        );
    }
}

/**
 * @static
 * @method getModuleByPageType
 * @param type {string}
 * @returns {Object}
 */
Faq.getModuleByPageType = function (type) {
    let result = Questions;

    if (type === "medical-answer") {
        result = Answer;
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
Faq.getInitialProps = function (context, props) {
    let module = Faq.getModuleByPageType(props.pageInfo.type);

    return module && module.getServerSideProps(context, props);
};

Faq.propTypes = {
    // hasError: PropTypes.bool,
    breadcrumbs: PropTypes.instanceOf(Array),
    pageInfo: PropTypes.instanceOf(Object),
    initialData: PropTypes.instanceOf(Object)
};

Faq.defaultProps = {
    // hasError: false,
    breadcrumbs: [],
    pageInfo: {},
    initialData: {}
};

export default Faq;
