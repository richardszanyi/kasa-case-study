export default {
  IFRAME: 'iframe[title="Modal Message"]',
  EMAIL_MODAL: ".ab-iam-root",
  LOCATION_INPUT: 'input[id="full-screen-hero-search-input"]',
  PROPERTY_CARDS_LIST: '.list-page-properties > .list-page__content-list',
  PROPERTY_CARD: '.property-card',
  PROPERTY_CARD_RECOMMENDED: '.recommended-room-type__price-details__guest-and-night',
  SEARCH_WIDGET: '.search-widget',
  SEARCH_WIDGET_BUTTON: '.search-widget button',
  GUEST_COUNT: '.guest-count-input__btn',
  GUEST_COUNT_INPUT: 'input[id="full-screen-hero-adult-guest-count-input"]',
  getDatepickerDate: (date: string) => {
    return `button[date="${date}"]`;
  },
  CHECK_IN_INPUT: 'input[id="full-screen-hero-check-in-input"]',
  CHECK_OUT_INPUT: 'input[id="full-screen-hero-check-out-input"]',
  PROPERTY_DETAILS_CARD: '.room-type-popup__card',
}
