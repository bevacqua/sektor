'use strict';

var dupe;
var docElem = window.document.documentElement;
var domMatches = docElem.matches ||
                 docElem.webkitMatchesSelector ||
                 docElem.mozMatchesSelector ||
                 docElem.oMatchesSelector ||
                 docElem.msMatchesSelector;

function merge (left, right) {
  var i;
  var len = right.length;
  for (i = 0; i < len; i++) {
    left.push(right[i]);
  }
}

function contains (left, right) {
  var lefty = left.nodeType === 9 ? left.documentElement : left;
  var righty = right && right.parentNode;
  return left === righty || !!(righty && righty.nodeType === 1 && lefty.contains(righty));
}

function sortOrder (left, right) {
  if (left === right) {
    dupe = true; // flag for duplicate removal
    return 0;
  }

  var compare = right.compareDocumentPosition &&
                left.compareDocumentPosition &&
                left.compareDocumentPosition(right);

  if (compare) {
    if (compare & 1) { // disconnected nodes
      // choose the first element that is related to our document
      if (left === document || contains(document, left)) {
        return -1;
      }
      if (right === document || contains(document, right)) {
        return 1;
      }
      return 0; // maintain original order
    }

    return compare & 4 ? -1 : 1;
  }
  return left.compareDocumentPosition ? -1 : 1; // not directly comparable, sort on existence of method
}

function find (selector, ctx, collection, seed) {
  var element;
  var nodeType;
  var results = collection || [];
  var context = ctx || document;
  var i = 0;

  if (!selector || typeof selector !== 'string') {
    return results; // same safeguard as Sizzle
  }

  if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
    return []; // short-circuit if context is not an element or document
  }

  if (seed) {
    while ((element = seed[i++])) {
      if (matchesSelector(element, selector)) {
        results.push(element);
      }
    }
  } else {
    merge(results, context.querySelectorAll(selector));
  }
  return results;
}

function matches (selector, elements) {
  return find(selector, null, null, elements);
}

function matchesSelector (element, selector) {
  return domMatches.call(element, selector);
}

module.exports = find;

find.matches = matches;
find.matchesSelector = matchesSelector;
