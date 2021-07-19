import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.play = this.play.bind(this);
    }

    /**
     * @private
     * @method isOpen
     * @returns {boolean}
     * */
    isOpen() {
        return this.state.isOpen;
    }

    /**
     * @private
     * @method play
     * @returns {Video}
     */
    play() {
        this.setState({isOpen: true});

        return this;
    }

    /**
     * @private
     * @method getVideoUrl
     * @param video {Video}
     * @returns {string}
     */
    getVideoUrl(video) {
        return `https://www.youtube.com/embed/${video.getCode()}?autoplay=1`;
    }

    /**
     * @private
     * @method getPreviewUrl
     * @param video {Video}
     * @returns {string}
     */
    getPreviewUrl(video) {
        return `https://i.ytimg.com/vi/${video.getCode()}/mqdefault.jpg`;
    }

    /**
     * @private
     * @method renderVideos
     * @returns {Array}
     */
    renderVideos() {
        return this.props.items.map((video) => (
            <div className="row" key={video.getCode()}>
                <div className="col">
                    <div onClick={this.play} className="video__body">
                        {this.isOpen() && (
                            <iframe
                                title={video.getCode()}
                                width="100%"
                                height="100%"
                                src={this.getVideoUrl(video)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        )}
                        {!this.isOpen() && (
                            <>
                                <img
                                    className="video__preview lazyload"
                                    data-src={this.getPreviewUrl(video)}
                                    alt="preview"
                                />
                                <svg className="video__play" height="100%" viewBox="0 0 68 48" width="100%">
                                    <path
                                        d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                                    />
                                    <path d="M 45,24 27,14 27,34" fill="#fff" />
                                </svg>
                            </>
                        )}
                    </div>
                </div>
            </div>
        ));
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        let {title, className} = this.props;

        return (
            <section className={classnames("video", className)}>
                <header className="video__header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <h2
                                    className="text-black text-size-xl lg-text-size-h4 video__header-title mb-24"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{__html: title}}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container-fluid">{this.renderVideos()}</div>
            </section>
        );
    }
}

Video.defaultProps = {
    className: ""
};

Video.propTypes = {
    items: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Video;
