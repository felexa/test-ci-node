import _ from "lodash";

import Entity from "app/core/entities/Entity";
import Brand from "app/core/entities/brand/Brand";
import Category from "app/core/entities/category/Category";
import Profile from "app/core/entities/profile/Profile";
import Image from "app/core/entities/image/Image";
import Video from "app/core/entities/video/Video";
import Sticker from "app/core/entities/sticker/Sticker";
import TotalQuantity from "app/core/entities/modification/TotalQuantity";
import Dosage from "app/core/entities/modification/Dosage";
import Price from "app/core/entities/price/Price";
import Sale from "app/core/entities/product/Sale";
import Seller from "app/core/entities/seller/Seller";
import Offer from "app/core/entities/offer/Offer";
import Property from "app/core/entities/property/Property";
import GroupProperty from "app/core/entities/property/GroupProperty";
import Rating from "app/core/entities/review/Rating";
import Status from "app/core/entities/status/Status";

class Product extends Entity {
    /**
     * @public
     * @method hasAllRoundView
     * @returns {boolean}
     */
    hasAllRoundView() {
        return Boolean(this.getAllRoundView().length);
    }

    /**
     * @public
     * @method hasVideo
     * @returns {boolean}
     */
    hasVideo() {
        return Boolean(this.getVideo().length);
    }

    /**
     * @public
     * @method isHeadliner
     * @returns {boolean}
     */
    isHeadliner() {
        return Boolean(this.entity.headliner);
    }

    /**
     * @public
     * method get product id from bitrix
     *
     * @method getOldId
     * @return {string|number}
     */
    getOldId() {
        return this.entity.remoteId || "";
    }

    /**
     * @public
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @public
     * @method getCode
     * @returns {string}
     */
    getCode() {
        return this.entity.sku || "";
    }

    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @public
     * @method getRedactor
     * @returns {Profile}
     */
    getRedactor() {
        //todo FIXTURE
        return new Profile({
            id: 1,
            name: "Павел",
            lastName: "Власенко",
            avatar: {
                src: {
                    original: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/team/vlasenko-pavel-small.jpg"
                }
            },
            url: "https://www.apteka24.ua/team/vlasenko-pavel-nikolaevich/"
        });
    }

    /**
     * @public
     * @method getReviewer
     * @returns {Profile}
     */
    getReviewer() {
        //todo FIXTURE
        return new Profile({
            id: 2,
            name: "Мария",
            lastName: "Семёнова",
            avatar: {
                src: {
                    original: "https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/team/semenova-maryia-small.jpg"
                }
            },
            url: "https://www.apteka24.ua/team/semenova-mariya/"
        });
    }

    /**
     * @public
     * @method getLastUpdateDate
     * @returns {Date}
     */
    getLastUpdateDate() {
        //todo FIXTURE
        return new Date(2020, 6, 24, 18, 37);
    }

    /**
     * @public
     * @method getVendor
     * @returns {Brand}
     */
    getBrand() {
        return new Brand(this.entity.brand);
    }

    /**
     * @public
     * @method getCategory
     * @returns {Category}
     */
    getCategory() {
        return new Category(this.entity.category);
    }

    /**
     * @public
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }

    /**
     * @public
     * @method getImages
     * @returns {Image[]}
     */
    getImages() {
        return (this.entity.images || []).map((image) => new Image(image));
    }

    /**
     * @public
     * @method getAllRoundView
     * @returns {Image[]}
     */
    getAllRoundView() {
        return (this.entity.images360 || []).map((image) => new Image(image));
    }

    /**
     * @public
     * @method getVideo
     * @returns {Video[]}
     */
    getVideo() {
        let maxVideoCount = 1;

        return (this.entity.videos || []).slice(0, maxVideoCount).map((video) => new Video(video));
    }

    /**
     * getFiles
     * @returns {{getUrl: (function(): *|string), getType: (function(): *|string), getId: (function(): *|string)}[]}
     */
    getFiles() {
        return (this.entity.files || []).map((file) => ({
            getId: () => file.id || '',
            getUrl: () => file.url || '',
            getType: () => file.type || ''
        }));
    }

    /**
     * @public
     * @method getStickers
     * @returns {Sticker[]}
     */
    getStickers() {
        return (this.entity.promotions || []).map((sticker) => new Sticker(sticker));
    }

    /**
     * @public
     * @method getModification
     * @returns {{getDosage(): Dosage[], getTotalQuantity(): TotalQuantity[]}}
     */
    getModification() {
        let entity = this.entity;

        return {
            /**
             * @public
             * @method getTotalQuantity
             * @returns {TotalQuantity[]}
             */
            getTotalQuantity() {
                return _.get(entity, "modification.totalQuantity", []).map(
                    (totalQuantity) => new TotalQuantity(totalQuantity)
                );
            },
            /**
             * @public
             * @method getDosage
             * @returns {Dosage[]}
             */
            getDosage() {
                return _.get(entity, "modification.dosage", []).map((dosage) => new Dosage(dosage));
            }
        };
    }

    /**
     * @public
     * @method getRestrictions
     * @returns {{isPrescription(): boolean, isThermolabile(): boolean}}
     */
    getRestrictions() {
        let restrictions = this.entity.restrictions || {};

        return {
            /**
             * @public
             * @method isThermolabile
             * @returns {boolean}
             */
            isThermolabile() {
                return Boolean(restrictions.thermolabile);
            },

            /**
             * @public
             * @method isPrescription
             * @returns {boolean}
             */
            isPrescription() {
                return false;
                // return Boolean(restrictions.prescription);
            }
        };
    }

    /**
     * @public
     * @method getQuantity
     * @returns {number}
     */
    getQuantity() {
        return Number(this.entity.quantity) || 1;
    }

    /**
     * @public
     * @method setQuantity
     * @param quantity {number}
     * @returns {number}
     */
    setQuantity(quantity) {
        if (_.isNumber(quantity)) {
            this.entity.quantity = quantity;
        }

        return this;
    }

    /**
     * @public
     * @method getPrice
     * @returns {Price}
     */
    getPrice() {
        return new Price(this.entity.price);
    }

    /**
     * @public
     * @method getSale
     * @returns {Sale}
     */
    getSale() {
        return new Sale(this.entity.sale);
    }

    /**
     * @public
     * @method getBonus
     * @returns {Sale}
     */
    getBonus() {
        return new Sale(this.entity.bonus);
    }

    /**
     * @public
     * @method getSeller
     * @return {Seller}
     */
    getSeller() {
        return new Seller(this.entity.seller);
    }

    /**
     * @public
     * @method getStatus
     * @returns {{getType(): string, getId(): string, getDescription(): string}}
     */
    getStatus() {
        return new Status(this.entity.status);
    }

    /**
     * @public
     * @method getReview
     * @returns {{
     *  getQuestionsCount(): number,
     *  getCommentsCount(): number,
     *  getLikesCount(): number,
     *  getRating(): Rating
     * }}
     */
    getReview() {
        let entity = this.entity;

        return {
            /**
             * @public
             * @method getRating
             * @returns {Rating}
             */
            getRating() {
                return new Rating(_.get(entity, "review.rating") || {});
            },
            /**
             * @public
             * @method getCommentsCount
             * @returns {number}
             */
            getCommentsCount() {
                return Number(_.get(entity, "review.comments") || 0);
            },
            /**
             * @public
             * @method getLikesCount
             * @returns {number}
             */
            getLikesCount() {
                return Number(_.get(entity, "review.likes") || 0);
            },
            /**
             * @public
             * @method getQuestionsCount
             * @returns {number}
             */
            getQuestionsCount() {
                return Number(_.get(entity, "review.questions") || 0);
            }
        };
    }

    /**
     * @public
     * @method getRelatedItems
     * @returns {Product[]}
     */
    getRelatedItems() {
        return (this.entity.relatedItems || []).map((product) => new Product(product));
    }

    /**
     * @public
     * @method getProductSet
     * @returns {{getItems(): Product[], getTotalSale(): Sale, getMainItem(): Product, getTotalPrice(): number}}
     */
    getProductSet() {
        let entity = this.entity;

        return {
            /**
             * @public
             * @method getMainItem
             * @returns {Product}
             */
            getMainItem() {
                return new Product(_.get(entity, "productSet.mainItem") || {});
            },
            /**
             * @public
             * @method getItems
             * @returns {Product[]}
             */
            getItems() {
                return (_.get(entity, "productSet.items") || []).map((item) => new Product(item));
            },
            /**
             * @public
             * @method getTotalPrice
             * @returns {number}
             */
            getTotalPrice() {
                return Number(_.get(entity, "productSet.total.price") || 0);
            },
            /**
             * @public
             * @method getTotalSale
             * @returns {Sale}
             */
            getTotalSale() {
                return new Sale(_.get(entity, "productSet.total.sale") || {});
            }
        };
    }

    /**
     * @public
     * @method getOffers
     * @returns {Offer[]}
     */
    getOffers() {
        return (this.entity.offers || []).map((offer) => new Offer(offer));
    }

    /**
     * @public
     * @method getProperty
     * @returns {Property}
     */
    getProperty() {
        let property = this.entity.warning || {};

        return new Property(property);
    }

    /**
     * @public
     * @method getProperties
     * @returns {Property[]}
     */
    getProperties() {
        return (this.entity.attributes || []).map((item) => new Property(item)); //todo FIXTURE
    }

    /**
     * @public
     * @method getPropertyGroups
     * @returns {GroupProperty[]}
     */
    getPropertyGroups() {
        return (this.entity.attributeGroups || []).map((item) => new GroupProperty(item));
    }

    /**
     * @public
     * @method getMainProperties
     * @returns {GroupProperty}
     */
    getMainProperties() {
        return new GroupProperty(this.entity.basicAttributes);
    }

    /**
     * @public
     * @method getNewInstruction
     * @returns {{getSections(): Array}, getActive(): boolean}
     */
    getNewInstruction() {
        let entity = this.entity;

        return {
            /**
             * @method getSection
             * @returns {Array}
             */
            getSections() {
                return (_.get(entity, "newInstruction.sections") || []).map((item) => ({
                    getId() {
                        return item.id || "";
                    },
                    getName() {
                        return item.name || "";
                    },
                    getText() {
                        return item.text || "";
                    }
                }));
            },

            /**
             * @method isActive
             * @returns {boolean}
             */
            isActive() {
                return _.get(entity, "newInstruction.active") || false;
            }
        };
    }

    /**
     * @public
     * @method getDescriptionAsHTML
     * @returns {string}
     */
    getDescriptionAsHTML() {
        return this.entity.description || "";
    }

    /**
     * @public
     * @method getInstructionAsHTML
     * @returns {string}
     */
    getInstructionAsHTML() {
        return this.entity.instruction || "";
    }

    /**
     * @public
     * @method getReturnPolicy
     * @returns {Object}
     */
    getReturnPolicy() {
        let { returnPolicy = {} } = this.entity;

        return {
            getId() {
                return (returnPolicy.id) || "";
            },
            getTitle() {
                return (returnPolicy.name) || "";
            },
            getDescription() {
                return (returnPolicy.text) || "";
            },
            getUrl() {
                return (returnPolicy.url) || "";
            }
        };
    }

    /**
     * @public
     * @method getGeneric
     * @returns {Object}
     */
    getGeneric() {
        let generic = this.entity.marketedName || {};

        return {
            /**
             * @method getId
             * @returns {string}
             */
            getId() {
                return (generic.id) || "";
            },
            /**
             * @method getAlias
             * @returns {string}
             */
            getAlias() {
                return (generic.alias) || "";
            },
            /**
             * @method getName
             * @returns {string}
             */
            getName() {
                return (generic.name) || "";
            },
            /**
             * @method getUrl
             * @returns {string}
             */
            getUrl() {
                return (generic.url) || "";
            }
        };
    }

    /**
     * @public
     * @method getShares
     * @returns {Promotions}
     */
    getShares() {
        return _.merge([], this.entity.promotions);
    }
}

export default Product;
