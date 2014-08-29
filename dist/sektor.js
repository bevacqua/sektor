/**
 * sektor - A slim alternative to jQuery's Sizzle
 * @version v1.0.0
 * @link https://github.com/bevacqua/sektor
 * @license MIT
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.sektor=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var dupe;
var docElem = window.document.documentElement;
var matches = docElem.matches ||
    docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector;

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

function find (selector, context, results, seed) {
  var element;
  var nodeType;
  var i = 0;

  results = results || [];
  context = context || document;

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
    results.push.apply(results, context.querySelectorAll(selector));
  }
  return results;
}

function matches (selector, elements) {
  return find(selector, null, null, elements);
}

function matchesSelector (element, selector) {
  return matches(selector, [element]);
}

module.exports = find;

find.matches = matches;
find.matchesSelector = matchesSelector;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9uaWNvL25pY28vZ2l0L3Nla3Rvci9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL25pY28vbmljby9naXQvc2VrdG9yL3NyYy9zZWt0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZHVwZTtcbnZhciBkb2NFbGVtID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbnZhciBtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzIHx8XG4gICAgZG9jRWxlbS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICBkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgIGRvY0VsZW0ub01hdGNoZXNTZWxlY3RvciB8fFxuICAgIGRvY0VsZW0ubXNNYXRjaGVzU2VsZWN0b3I7XG5cbmZ1bmN0aW9uIGNvbnRhaW5zIChsZWZ0LCByaWdodCkge1xuICB2YXIgbGVmdHkgPSBsZWZ0Lm5vZGVUeXBlID09PSA5ID8gbGVmdC5kb2N1bWVudEVsZW1lbnQgOiBsZWZ0O1xuICB2YXIgcmlnaHR5ID0gcmlnaHQgJiYgcmlnaHQucGFyZW50Tm9kZTtcbiAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0eSB8fCAhIShyaWdodHkgJiYgcmlnaHR5Lm5vZGVUeXBlID09PSAxICYmIGxlZnR5LmNvbnRhaW5zKHJpZ2h0eSkpO1xufVxuXG5mdW5jdGlvbiBzb3J0T3JkZXIgKGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChsZWZ0ID09PSByaWdodCkge1xuICAgIGR1cGUgPSB0cnVlOyAvLyBmbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIGNvbXBhcmUgPSByaWdodC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAmJlxuICAgICAgICAgICAgICAgIGxlZnQuY29tcGFyZURvY3VtZW50UG9zaXRpb24gJiZcbiAgICAgICAgICAgICAgICBsZWZ0LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHJpZ2h0KTtcblxuICBpZiAoY29tcGFyZSkge1xuICAgIGlmIChjb21wYXJlICYgMSkgeyAvLyBkaXNjb25uZWN0ZWQgbm9kZXNcbiAgICAgIC8vIGNob29zZSB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGlzIHJlbGF0ZWQgdG8gb3VyIGRvY3VtZW50XG4gICAgICBpZiAobGVmdCA9PT0gZG9jdW1lbnQgfHwgY29udGFpbnMoZG9jdW1lbnQsIGxlZnQpKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChyaWdodCA9PT0gZG9jdW1lbnQgfHwgY29udGFpbnMoZG9jdW1lbnQsIHJpZ2h0KSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwOyAvLyBtYWludGFpbiBvcmlnaW5hbCBvcmRlclxuICAgIH1cblxuICAgIHJldHVybiBjb21wYXJlICYgNCA/IC0xIDogMTtcbiAgfVxuICByZXR1cm4gbGVmdC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA/IC0xIDogMTsgLy8gbm90IGRpcmVjdGx5IGNvbXBhcmFibGUsIHNvcnQgb24gZXhpc3RlbmNlIG9mIG1ldGhvZFxufVxuXG5mdW5jdGlvbiBmaW5kIChzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCkge1xuICB2YXIgZWxlbWVudDtcbiAgdmFyIG5vZGVUeXBlO1xuICB2YXIgaSA9IDA7XG5cbiAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG4gIGlmICghc2VsZWN0b3IgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiByZXN1bHRzOyAvLyBzYW1lIHNhZmVndWFyZCBhcyBTaXp6bGVcbiAgfVxuXG4gIGlmICgobm9kZVR5cGUgPSBjb250ZXh0Lm5vZGVUeXBlKSAhPT0gMSAmJiBub2RlVHlwZSAhPT0gOSkge1xuICAgIHJldHVybiBbXTsgLy8gc2hvcnQtY2lyY3VpdCBpZiBjb250ZXh0IGlzIG5vdCBhbiBlbGVtZW50IG9yIGRvY3VtZW50XG4gIH1cblxuICBpZiAoc2VlZCkge1xuICAgIHdoaWxlICgoZWxlbWVudCA9IHNlZWRbaSsrXSkpIHtcbiAgICAgIGlmIChtYXRjaGVzU2VsZWN0b3IoZWxlbWVudCwgc2VsZWN0b3IpKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0cy5wdXNoLmFwcGx5KHJlc3VsdHMsIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChzZWxlY3RvciwgZWxlbWVudHMpIHtcbiAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIG51bGwsIG51bGwsIGVsZW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gbWF0Y2hlcyhzZWxlY3RvciwgW2VsZW1lbnRdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmaW5kO1xuXG5maW5kLm1hdGNoZXMgPSBtYXRjaGVzO1xuZmluZC5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG4iXX0=
(1)
});
