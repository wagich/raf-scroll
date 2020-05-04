'use strict';

var raf = require('component-raf');
var scrollTop = require('scrolltop');
var Emitter = require('tiny-emitter');
var emitter = new Emitter();
var rafId = -1;
var scrollY = 0;
var deltaY = 0;
var ticking = false;

module.exports = {
  add: function(fn) {
    emitter.on('scroll', fn);

    // Start raf on first callback
    if (emitter.e.scroll.length === 1) {
      rafId = raf(update);
    }
  },

  addOnce: function(fn) {
    emitter.once('scroll', fn);

    // Start raf on first callback
    if (emitter.e.scroll.length === 1) {
      rafId = raf(update);
    }
  },

  remove: function(fn) {
    emitter.off('scroll', fn);

    // Stop raf if there is no more callbacks
    if (!emitter.e.scroll || emitter.e.scroll.length < 1) {
      raf.cancel(rafId);
    }
  },

  getCurrent: function() {
    return getEvent();
  },

  destroy: function() {
    raf.cancel(rafId);
    emitter = new Emitter();
    scrollY = 0;
    deltaY = 0;
  }
};

function getEvent() {
  var scroll = scrollTop();

  if (scroll === scrollY) { // we haven't scrolled since the last tick
    return null;
  }

  if (ticking) {
    deltaY = scroll - scrollY;
  }

  scrollY = scroll;

  return {
    scrollY: scrollY,
    deltaY: deltaY
  };
}

function update() {
  rafId = raf(update);

  var event = getEvent();
  if (event !== null){
    ticking = true;
    emitter.emit('scroll', event);
    ticking = false;
  }
}
