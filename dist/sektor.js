/**
 * sektor - A slim alternative to jQuery's Sizzle
 * @version v1.0.1
 * @link https://github.com/bevacqua/sektor
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.sektor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWNvL25pY28vZ2l0L3Nla3Rvci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvc2VrdG9yL3NyYy9zZWt0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkdXBlO1xudmFyIGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIGRvbU1hdGNoZXMgPSBkb2NFbGVtLm1hdGNoZXMgfHxcbiAgICAgICAgICAgICAgICAgZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgZG9jRWxlbS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgIGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIG1lcmdlIChsZWZ0LCByaWdodCkge1xuICB2YXIgaTtcbiAgdmFyIGxlbiA9IHJpZ2h0Lmxlbmd0aDtcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGVmdC5wdXNoKHJpZ2h0W2ldKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb250YWlucyAobGVmdCwgcmlnaHQpIHtcbiAgdmFyIGxlZnR5ID0gbGVmdC5ub2RlVHlwZSA9PT0gOSA/IGxlZnQuZG9jdW1lbnRFbGVtZW50IDogbGVmdDtcbiAgdmFyIHJpZ2h0eSA9IHJpZ2h0ICYmIHJpZ2h0LnBhcmVudE5vZGU7XG4gIHJldHVybiBsZWZ0ID09PSByaWdodHkgfHwgISEocmlnaHR5ICYmIHJpZ2h0eS5ub2RlVHlwZSA9PT0gMSAmJiBsZWZ0eS5jb250YWlucyhyaWdodHkpKTtcbn1cblxuZnVuY3Rpb24gc29ydE9yZGVyIChsZWZ0LCByaWdodCkge1xuICBpZiAobGVmdCA9PT0gcmlnaHQpIHtcbiAgICBkdXBlID0gdHJ1ZTsgLy8gZmxhZyBmb3IgZHVwbGljYXRlIHJlbW92YWxcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBjb21wYXJlID0gcmlnaHQuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiZcbiAgICAgICAgICAgICAgICBsZWZ0LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uICYmXG4gICAgICAgICAgICAgICAgbGVmdC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihyaWdodCk7XG5cbiAgaWYgKGNvbXBhcmUpIHtcbiAgICBpZiAoY29tcGFyZSAmIDEpIHsgLy8gZGlzY29ubmVjdGVkIG5vZGVzXG4gICAgICAvLyBjaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBkb2N1bWVudFxuICAgICAgaWYgKGxlZnQgPT09IGRvY3VtZW50IHx8IGNvbnRhaW5zKGRvY3VtZW50LCBsZWZ0KSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICBpZiAocmlnaHQgPT09IGRvY3VtZW50IHx8IGNvbnRhaW5zKGRvY3VtZW50LCByaWdodCkpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDsgLy8gbWFpbnRhaW4gb3JpZ2luYWwgb3JkZXJcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG4gIH1cbiAgcmV0dXJuIGxlZnQuY29tcGFyZURvY3VtZW50UG9zaXRpb24gPyAtMSA6IDE7IC8vIG5vdCBkaXJlY3RseSBjb21wYXJhYmxlLCBzb3J0IG9uIGV4aXN0ZW5jZSBvZiBtZXRob2Rcbn1cblxuZnVuY3Rpb24gZmluZCAoc2VsZWN0b3IsIGN0eCwgY29sbGVjdGlvbiwgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIG5vZGVUeXBlO1xuICB2YXIgcmVzdWx0cyA9IGNvbGxlY3Rpb24gfHwgW107XG4gIHZhciBjb250ZXh0ID0gY3R4IHx8IGRvY3VtZW50O1xuICB2YXIgaSA9IDA7XG5cbiAgaWYgKCFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7IC8vIHNhbWUgc2FmZWd1YXJkIGFzIFNpenpsZVxuICB9XG5cbiAgaWYgKChub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGUpICE9PSAxICYmIG5vZGVUeXBlICE9PSA5KSB7XG4gICAgcmV0dXJuIFtdOyAvLyBzaG9ydC1jaXJjdWl0IGlmIGNvbnRleHQgaXMgbm90IGFuIGVsZW1lbnQgb3IgZG9jdW1lbnRcbiAgfVxuXG4gIGlmIChzZWVkKSB7XG4gICAgd2hpbGUgKChlbGVtZW50ID0gc2VlZFtpKytdKSkge1xuICAgICAgaWYgKG1hdGNoZXNTZWxlY3RvcihlbGVtZW50LCBzZWxlY3RvcikpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtZXJnZShyZXN1bHRzLCBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyAoc2VsZWN0b3IsIGVsZW1lbnRzKSB7XG4gIHJldHVybiBmaW5kKHNlbGVjdG9yLCBudWxsLCBudWxsLCBlbGVtZW50cyk7XG59XG5cbmZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciAoZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGRvbU1hdGNoZXMuY2FsbChlbGVtZW50LCBzZWxlY3Rvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmluZDtcblxuZmluZC5tYXRjaGVzID0gbWF0Y2hlcztcbmZpbmQubWF0Y2hlc1NlbGVjdG9yID0gbWF0Y2hlc1NlbGVjdG9yO1xuIl19
(1)
});
