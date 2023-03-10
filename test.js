// KUTE.js Standard v2.1.2 | thednp © 2021 | MIT-License
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).KUTE =
        e());
})(this, function () {
  "use strict";
  var t = function (t, e, n, r, a) {
    var i = this;
    (this.cx = 3 * t),
      (this.bx = 3 * (n - t) - this.cx),
      (this.ax = 1 - this.cx - this.bx),
      (this.cy = 3 * e),
      (this.by = 3 * (r - e) - this.cy),
      (this.ay = 1 - this.cy - this.by);
    var s = function (t) {
      return i.sampleCurveY(i.solveCurveX(t));
    };
    return (
      Object.defineProperty(s, "name", { writable: !0 }),
      (s.name = a || "cubic-bezier(" + [t, e, n, r] + ")"),
      s
    );
  };
  (t.prototype.sampleCurveX = function (t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }),
    (t.prototype.sampleCurveY = function (t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    }),
    (t.prototype.sampleCurveDerivativeX = function (t) {
      return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
    }),
    (t.prototype.solveCurveX = function (t) {
      var e,
        n,
        r,
        a,
        i,
        s,
        o = 1e-5;
      for (r = t, s = 0; s < 32; s += 1) {
        if (((a = this.sampleCurveX(r) - t), Math.abs(a) < o)) return r;
        if (((i = this.sampleCurveDerivativeX(r)), Math.abs(i) < o)) break;
        r -= a / i;
      }
      if ((r = t) < (e = 0)) return e;
      if (r > (n = 1)) return n;
      for (; e < n; ) {
        if (((a = this.sampleCurveX(r)), Math.abs(a - t) < o)) return r;
        t > a ? (e = r) : (n = r), (r = 0.5 * (n - e) + e);
      }
      return r;
    });
  var e = {},
    n = [],
    r =
      "undefined" != typeof global
        ? global
        : void 0 !== window.self
        ? window.self
        : "undefined" != typeof window
        ? window
        : {},
    a = {},
    i = {},
    s = {},
    o = window.self || window || {};
  s.now = o.performance.now.bind(o.performance);
  var u = 0,
    c = function (t) {
      for (var e = 0; e < n.length; )
        n[e].update(t) ? (e += 1) : n.splice(e, 1);
      u = requestAnimationFrame(c);
    };
  function l() {
    setTimeout(function () {
      !n.length &&
        u &&
        (cancelAnimationFrame(u),
        (u = null),
        Object.keys(i).forEach(function (t) {
          "function" == typeof i[t]
            ? e[t] && delete e[t]
            : Object.keys(i[t]).forEach(function (t) {
                e[t] && delete e[t];
              });
        }),
        Object.keys(a).forEach(function (t) {
          e[t] && delete e[t];
        }));
    }, 64);
  }
  var h = { Tick: u, Ticker: c, Tweens: n, Time: s };
  Object.keys(h).forEach(function (t) {
    e[t] || (e[t] = "Time" === t ? s.now : h[t]);
  }),
    (r._KUTE = e);
  var p = {},
    f = {},
    d = { duration: 700, delay: 0, easing: "linear" },
    v = {},
    y = {},
    g = {},
    m = {},
    b = {},
    w = {
      supportedProperties: p,
      defaultValues: f,
      defaultOptions: d,
      prepareProperty: v,
      prepareStart: y,
      crossCheck: g,
      onStart: i,
      onComplete: m,
      linkProperty: b,
    },
    x = {};
  function E(t) {
    return n.push(t);
  }
  function M(t) {
    var e = n.indexOf(t);
    -1 !== e && n.splice(e, 1);
  }
  function _() {
    var t = this;
    Object.keys(b).forEach(function (n) {
      var r = b[n],
        a = p[n];
      Object.keys(r).forEach(function (n) {
        "function" == typeof r[n] &&
        Object.keys(t.valuesEnd).some(function (e) {
          return (
            (a && a.includes(e)) ||
            ("attr" === e &&
              Object.keys(t.valuesEnd[e]).some(function (t) {
                return a && a.includes(t);
              }))
          );
        })
          ? e[n] || (e[n] = r[n])
          : Object.keys(t.valuesEnd).forEach(function (a) {
              var i = t.valuesEnd[a];
              i instanceof Object &&
                Object.keys(i).forEach(function (t) {
                  "function" == typeof r[t]
                    ? e[t] || (e[t] = r[t])
                    : Object.keys(r[n]).forEach(function (n) {
                        r[t] &&
                          "function" == typeof r[t][n] &&
                          (e[n] || (e[n] = r[t][n]));
                      });
                });
            });
      });
    });
  }
  var k = {
    add: E,
    remove: M,
    getAll: function () {
      return n;
    },
    removeAll: function () {
      n.length = 0;
    },
    stop: l,
    linkInterpolation: _,
  };
  function O(t) {
    if (!t.style) return !1;
    var e = t.style.cssText.replace(/\s/g, "").split(";"),
      n = {},
      r = ["translate3d", "translate", "scale3d", "skew"];
    return (
      e.forEach(function (t) {
        /transform/i.test(t) &&
          t
            .split(":")[1]
            .split(")")
            .forEach(function (t) {
              var e = t.split("("),
                a = e[0],
                i = e[1];
              /matrix/.test(a) || (n[a] = r.includes(a) ? i.split(",") : i);
            });
      }),
      n
    );
  }
  function C(t, e) {
    var n = t.style,
      r = getComputedStyle(t) || t.currentStyle,
      a = n[e] && !/auto|initial|none|unset/.test(n[e]) ? n[e] : r[e],
      i = f[e];
    return "transform" !== e && (e in r || e in n) && (i = a), i;
  }
  function T(t, e) {
    var n = this,
      r = "start" === e ? this.valuesStart : this.valuesEnd;
    Object.keys(v).forEach(function (e) {
      var a = v[e],
        i = p[e];
      Object.keys(a).forEach(function (e) {
        var s = {};
        Object.keys(t).forEach(function (o) {
          f[o] && a[o]
            ? (r[o] = a[o].call(n, o, t[o]))
            : !f[e] && "transform" === e && i.includes(o)
            ? (s[o] = t[o])
            : f[o] || "transform" !== o
            ? !f[e] && i && i.includes(o) && (r[o] = a[e].call(n, o, t[o]))
            : (r[o] = t[o]);
        }),
          Object.keys(s).length && (r[e] = a[e].call(n, e, s));
      });
    });
  }
  function S() {
    var t = this,
      e = {},
      n = O(this.element);
    Object.keys(this.valuesStart).forEach(function (n) {
      Object.keys(y).forEach(function (r) {
        var a = y[r];
        Object.keys(a).forEach(function (i) {
          ((i === n && a[n]) || (p[r] && p[r].includes(n))) &&
            (e[n] = a[i].call(t, n, t.valuesStart[n]));
        });
      });
    }),
      Object.keys(n).forEach(function (r) {
        r in t.valuesStart || (e[r] = n[r] || f[r]);
      }),
      (this.valuesStart = {}),
      T.call(this, e, "start");
  }
  var I = {
      getInlineStyle: O,
      getStyleForProperty: C,
      getStartValues: S,
      prepareObject: T,
    },
    A = {},
    j = {
      linear: new t(0, 0, 1, 1, "linear"),
      easingSinusoidalIn: new t(0.47, 0, 0.745, 0.715, "easingSinusoidalIn"),
      easingSinusoidalOut: new t(0.39, 0.575, 0.565, 1, "easingSinusoidalOut"),
      easingSinusoidalInOut: new t(
        0.445,
        0.05,
        0.55,
        0.95,
        "easingSinusoidalInOut"
      ),
      easingQuadraticIn: new t(0.55, 0.085, 0.68, 0.53, "easingQuadraticIn"),
      easingQuadraticOut: new t(0.25, 0.46, 0.45, 0.94, "easingQuadraticOut"),
      easingQuadraticInOut: new t(
        0.455,
        0.03,
        0.515,
        0.955,
        "easingQuadraticInOut"
      ),
      easingCubicIn: new t(0.55, 0.055, 0.675, 0.19, "easingCubicIn"),
      easingCubicOut: new t(0.215, 0.61, 0.355, 1, "easingCubicOut"),
      easingCubicInOut: new t(0.645, 0.045, 0.355, 1, "easingCubicInOut"),
      easingQuarticIn: new t(0.895, 0.03, 0.685, 0.22, "easingQuarticIn"),
      easingQuarticOut: new t(0.165, 0.84, 0.44, 1, "easingQuarticOut"),
      easingQuarticInOut: new t(0.77, 0, 0.175, 1, "easingQuarticInOut"),
      easingQuinticIn: new t(0.755, 0.05, 0.855, 0.06, "easingQuinticIn"),
      easingQuinticOut: new t(0.23, 1, 0.32, 1, "easingQuinticOut"),
      easingQuinticInOut: new t(0.86, 0, 0.07, 1, "easingQuinticInOut"),
      easingExponentialIn: new t(
        0.95,
        0.05,
        0.795,
        0.035,
        "easingExponentialIn"
      ),
      easingExponentialOut: new t(0.19, 1, 0.22, 1, "easingExponentialOut"),
      easingExponentialInOut: new t(1, 0, 0, 1, "easingExponentialInOut"),
      easingCircularIn: new t(0.6, 0.04, 0.98, 0.335, "easingCircularIn"),
      easingCircularOut: new t(0.075, 0.82, 0.165, 1, "easingCircularOut"),
      easingCircularInOut: new t(
        0.785,
        0.135,
        0.15,
        0.86,
        "easingCircularInOut"
      ),
      easingBackIn: new t(0.6, -0.28, 0.735, 0.045, "easingBackIn"),
      easingBackOut: new t(0.175, 0.885, 0.32, 1.275, "easingBackOut"),
      easingBackInOut: new t(0.68, -0.55, 0.265, 1.55, "easingBackInOut"),
    };
  function L(t, e) {
    try {
      var n, r;
      return (
        e
          ? ((r =
              t instanceof Array &&
              t.every(function (t) {
                return t instanceof Element;
              })),
            (n =
              t instanceof HTMLCollection || t instanceof NodeList || r
                ? t
                : document.querySelectorAll(t)))
          : (n =
              t instanceof Element || t === window
                ? t
                : document.querySelector(t)),
        n
      );
    } catch (e) {
      throw TypeError("KUTE.js - Element(s) not found: " + t + ".");
    }
  }
  function P() {
    var t = this;
    Object.keys(i).forEach(function (e) {
      "function" == typeof i[e]
        ? i[e].call(t, e)
        : Object.keys(i[e]).forEach(function (n) {
            i[e][n].call(t, n);
          });
    }),
      _.call(this);
  }
  A.processEasing = function (e) {
    if ("function" == typeof e) return e;
    if ("function" == typeof j[e]) return j[e];
    if (/bezier/.test(e)) {
      var n = e.replace(/bezier|\s|\(|\)/g, "").split(",");
      return new t(1 * n[0], 1 * n[1], 1 * n[2], 1 * n[3]);
    }
    return j.linear;
  };
  var N = function (t, n, r, a) {
    var s = this;
    (this.element = t),
      (this.playing = !1),
      (this._startTime = null),
      (this._startFired = !1),
      (this.valuesEnd = r),
      (this.valuesStart = n);
    var o = a || {};
    (this._resetStart = o.resetStart || 0),
      (this._easing =
        "function" == typeof o.easing ? o.easing : A.processEasing(o.easing)),
      (this._duration = o.duration || d.duration),
      (this._delay = o.delay || d.delay),
      Object.keys(o).forEach(function (t) {
        var e = "_" + t;
        e in s || (s[e] = o[t]);
      });
    var u = this._easing.name;
    return (
      i[u] ||
        (i[u] = function (t) {
          e[t] || t !== this._easing.name || (e[t] = this._easing);
        }),
      this
    );
  };
  (N.prototype.start = function (t) {
    return (
      E(this),
      (this.playing = !0),
      (this._startTime = void 0 !== t ? t : e.Time()),
      (this._startTime += this._delay),
      this._startFired ||
        (this._onStart && this._onStart.call(this),
        P.call(this),
        (this._startFired = !0)),
      u || c(),
      this
    );
  }),
    (N.prototype.stop = function () {
      return (
        this.playing &&
          (M(this),
          (this.playing = !1),
          this._onStop && this._onStop.call(this),
          this.close()),
        this
      );
    }),
    (N.prototype.close = function () {
      var t = this;
      Object.keys(m).forEach(function (e) {
        Object.keys(m[e]).forEach(function (n) {
          m[e][n].call(t, n);
        });
      }),
        (this._startFired = !1),
        l.call(this);
    }),
    (N.prototype.chain = function (t) {
      return (
        (this._chain = []),
        (this._chain = t.length ? t : this._chain.concat(t)),
        this
      );
    }),
    (N.prototype.stopChainedTweens = function () {
      this._chain &&
        this._chain.length &&
        this._chain.forEach(function (t) {
          return t.stop();
        });
    }),
    (N.prototype.update = function (t) {
      var n,
        r = this,
        a = void 0 !== t ? t : e.Time();
      if (a < this._startTime && this.playing) return !0;
      (n = (a - this._startTime) / this._duration),
        (n = 0 === this._duration || n > 1 ? 1 : n);
      var i = this._easing(n);
      return (
        Object.keys(this.valuesEnd).forEach(function (t) {
          e[t](r.element, r.valuesStart[t], r.valuesEnd[t], i);
        }),
        this._onUpdate && this._onUpdate.call(this),
        1 !== n ||
          (this._onComplete && this._onComplete.call(this),
          (this.playing = !1),
          this.close(),
          void 0 !== this._chain &&
            this._chain.length &&
            this._chain.map(function (t) {
              return t.start();
            }),
          !1)
      );
    }),
    (A.tween = N),
    (d.repeat = 0),
    (d.repeatDelay = 0),
    (d.yoyo = !1),
    (d.resetStart = !1);
  var V = (function (t) {
    function n() {
      for (var e = this, n = [], r = arguments.length; r--; )
        n[r] = arguments[r];
      t.apply(this, n), (this.valuesStart = {}), (this.valuesEnd = {});
      var a = n[1],
        i = n[2];
      T.call(this, i, "end"),
        this._resetStart ? (this.valuesStart = a) : T.call(this, a, "start"),
        this._resetStart ||
          Object.keys(g).forEach(function (t) {
            Object.keys(g[t]).forEach(function (n) {
              g[t][n].call(e, n);
            });
          }),
        (this.paused = !1),
        (this._pauseTime = null);
      var s = n[3];
      return (
        (this._repeat = s.repeat || d.repeat),
        (this._repeatDelay = s.repeatDelay || d.repeatDelay),
        (this._repeatOption = this._repeat),
        (this.valuesRepeat = {}),
        (this._yoyo = s.yoyo || d.yoyo),
        (this._reversed = !1),
        this
      );
    }
    return (
      t && (n.__proto__ = t),
      (n.prototype = Object.create(t && t.prototype)),
      (n.prototype.constructor = n),
      (n.prototype.start = function (e) {
        var n = this;
        return (
          this._resetStart &&
            ((this.valuesStart = this._resetStart),
            S.call(this),
            Object.keys(g).forEach(function (t) {
              Object.keys(g[t]).forEach(function (e) {
                g[t][e].call(n, e);
              });
            })),
          (this.paused = !1),
          this._yoyo &&
            Object.keys(this.valuesEnd).forEach(function (t) {
              n.valuesRepeat[t] = n.valuesStart[t];
            }),
          t.prototype.start.call(this, e),
          this
        );
      }),
      (n.prototype.stop = function () {
        return (
          t.prototype.stop.call(this),
          !this.paused &&
            this.playing &&
            ((this.paused = !1), this.stopChainedTweens()),
          this
        );
      }),
      (n.prototype.close = function () {
        return (
          t.prototype.close.call(this),
          this._repeatOption > 0 && (this._repeat = this._repeatOption),
          this._yoyo &&
            !0 === this._reversed &&
            (this.reverse(), (this._reversed = !1)),
          this
        );
      }),
      (n.prototype.resume = function () {
        return (
          this.paused &&
            this.playing &&
            ((this.paused = !1),
            void 0 !== this._onResume && this._onResume.call(this),
            P.call(this),
            (this._startTime += e.Time() - this._pauseTime),
            E(this),
            u || c()),
          this
        );
      }),
      (n.prototype.pause = function () {
        return (
          !this.paused &&
            this.playing &&
            (M(this),
            (this.paused = !0),
            (this._pauseTime = e.Time()),
            void 0 !== this._onPause && this._onPause.call(this)),
          this
        );
      }),
      (n.prototype.reverse = function () {
        var t = this;
        Object.keys(this.valuesEnd).forEach(function (e) {
          var n = t.valuesRepeat[e];
          (t.valuesRepeat[e] = t.valuesEnd[e]),
            (t.valuesEnd[e] = n),
            (t.valuesStart[e] = t.valuesRepeat[e]);
        });
      }),
      (n.prototype.update = function (t) {
        var n,
          r = this,
          a = void 0 !== t ? t : e.Time();
        if (a < this._startTime && this.playing) return !0;
        (n = (a - this._startTime) / this._duration),
          (n = 0 === this._duration || n > 1 ? 1 : n);
        var i = this._easing(n);
        return (
          Object.keys(this.valuesEnd).forEach(function (t) {
            e[t](r.element, r.valuesStart[t], r.valuesEnd[t], i);
          }),
          this._onUpdate && this._onUpdate.call(this),
          1 !== n ||
            (this._repeat > 0
              ? (Number.isFinite(this._repeat) && (this._repeat -= 1),
                (this._startTime = a),
                Number.isFinite(this._repeat) &&
                  this._yoyo &&
                  !this._reversed &&
                  (this._startTime += this._repeatDelay),
                this._yoyo &&
                  ((this._reversed = !this._reversed), this.reverse()),
                !0)
              : (this._onComplete && this._onComplete.call(this),
                (this.playing = !1),
                this.close(),
                void 0 !== this._chain &&
                  this._chain.length &&
                  this._chain.forEach(function (t) {
                    return t.start();
                  }),
                !1))
        );
      }),
      n
    );
  })(N);
  A.tween = V;
  var q = function (t, e, n, r) {
    var a = this;
    (this.tweens = []), "offset" in d || (d.offset = 0);
    var i = r || {};
    i.delay = i.delay || d.delay;
    var s = [];
    return (
      Array.from(t).forEach(function (t, r) {
        var o = A.tween;
        if (
          ((s[r] = i || {}),
          (s[r].delay = r > 0 ? i.delay + (i.offset || d.offset) : i.delay),
          !(t instanceof Element))
        )
          throw Error("KUTE.js - " + t + " not instanceof [Element]");
        a.tweens.push(new o(t, e, n, s[r]));
      }),
      (this.length = this.tweens.length),
      this
    );
  };
  (q.prototype.start = function (t) {
    var n = void 0 === t ? e.Time() : t;
    return (
      this.tweens.map(function (t) {
        return t.start(n);
      }),
      this
    );
  }),
    (q.prototype.stop = function () {
      return (
        this.tweens.map(function (t) {
          return t.stop();
        }),
        this
      );
    }),
    (q.prototype.pause = function (t) {
      var n = void 0 === t ? e.Time() : t;
      return (
        this.tweens.map(function (t) {
          return t.pause(n);
        }),
        this
      );
    }),
    (q.prototype.resume = function (t) {
      var n = void 0 === t ? e.Time() : t;
      return (
        this.tweens.map(function (t) {
          return t.resume(n);
        }),
        this
      );
    }),
    (q.prototype.chain = function (t) {
      var e = this.tweens[this.length - 1];
      if (t instanceof q) e.chain(t.tweens);
      else {
        if (!(t instanceof A.tween))
          throw new TypeError("KUTE.js - invalid chain value");
        e.chain(t);
      }
      return this;
    }),
    (q.prototype.playing = function () {
      return this.tweens.some(function (t) {
        return t.playing;
      });
    }),
    (q.prototype.removeTweens = function () {
      this.tweens = [];
    }),
    (q.prototype.getMaxDuration = function () {
      var t = [];
      return (
        this.tweens.forEach(function (e) {
          t.push(e._duration + e._delay + e._repeat * e._repeatDelay);
        }),
        Math.max(t)
      );
    });
  var H = function (t) {
    try {
      if (t.component in p)
        throw Error("KUTE.js - " + t.component + " already registered");
      if (t.property in f)
        throw Error("KUTE.js - " + t.property + " already registered");
      this.setComponent(t);
    } catch (t) {
      throw Error(t);
    }
  };
  function F(t, e) {
    for (
      var n,
        r = parseInt(t, 10) || 0,
        a = ["px", "%", "deg", "rad", "em", "rem", "vh", "vw"],
        i = 0;
      i < a.length;
      i += 1
    )
      if ("string" == typeof t && t.includes(a[i])) {
        n = a[i];
        break;
      }
    return void 0 === n && (n = e ? "deg" : "px"), { v: r, u: n };
  }
  function Q(t, e, n) {
    return +t + (e - t) * n;
  }
  function U(t) {
    t in this.valuesEnd &&
      !e[t] &&
      (e[t] = function (e, n, r, a) {
        e.style[t] =
          (a > 0.99 || a < 0.01
            ? ((10 * Q(n, r, a)) >> 0) / 10
            : Q(n, r, a) >> 0) + "px";
      });
  }
  H.prototype.setComponent = function (t) {
    var e = this,
      n = t.component,
      r = {
        prepareProperty: v,
        prepareStart: y,
        onStart: i,
        onComplete: m,
        crossCheck: g,
      },
      s = t.category,
      o = t.property,
      u =
        (t.properties && t.properties.length) ||
        (t.subProperties && t.subProperties.length);
    return (
      (p[n] = t.properties || t.subProperties || t.property),
      "defaultValue" in t
        ? ((f[o] = t.defaultValue), (e.supports = o + " property"))
        : t.defaultValues &&
          (Object.keys(t.defaultValues).forEach(function (e) {
            f[e] = t.defaultValues[e];
          }),
          (e.supports = (u || o) + " " + (o || s) + " properties")),
      t.defaultOptions &&
        Object.keys(t.defaultOptions).forEach(function (e) {
          d[e] = t.defaultOptions[e];
        }),
      t.functions &&
        Object.keys(r).forEach(function (e) {
          e in t.functions &&
            ("function" == typeof t.functions[e]
              ? (r[e][n] || (r[e][n] = {}),
                r[e][n][s || o] || (r[e][n][s || o] = t.functions[e]))
              : Object.keys(t.functions[e]).forEach(function (a) {
                  r[e][n] || (r[e][n] = {}),
                    r[e][n][a] || (r[e][n][a] = t.functions[e][a]);
                }));
        }),
      t.Interpolate &&
        (Object.keys(t.Interpolate).forEach(function (e) {
          var n = t.Interpolate[e];
          "function" != typeof n || a[e]
            ? Object.keys(n).forEach(function (t) {
                "function" != typeof n[t] || a[e] || (a[e] = n[t]);
              })
            : (a[e] = n);
        }),
        (b[n] = t.Interpolate)),
      t.Util &&
        Object.keys(t.Util).forEach(function (e) {
          x[e] || (x[e] = t.Util[e]);
        }),
      e
    );
  };
  var D = {};
  ["top", "left", "width", "height"].forEach(function (t) {
    D[t] = U;
  });
  var R = ["top", "left", "width", "height"],
    X = {};
  R.forEach(function (t) {
    X[t] = U;
  });
  var B = {
    component: "essentialBoxModel",
    category: "boxModel",
    properties: R,
    defaultValues: { top: 0, left: 0, width: 0, height: 0 },
    Interpolate: { numbers: Q },
    functions: {
      prepareStart: function (t) {
        return C(this.element, t) || f[t];
      },
      prepareProperty: function (t, e) {
        var n = F(e),
          r = "height" === t ? "offsetHeight" : "offsetWidth";
        return "%" === n.u ? (n.v * this.element[r]) / 100 : n.v;
      },
      onStart: X,
    },
    Util: { trueDimension: F },
  };
  function Z(t) {
    var e;
    if (/rgb|rgba/.test(t)) {
      var n = t.replace(/\s|\)/, "").split("(")[1].split(","),
        r = n[3] ? n[3] : null;
      r ||
        (e = {
          r: parseInt(n[0], 10),
          g: parseInt(n[1], 10),
          b: parseInt(n[2], 10),
        }),
        (e = {
          r: parseInt(n[0], 10),
          g: parseInt(n[1], 10),
          b: parseInt(n[2], 10),
          a: parseFloat(r),
        });
    }
    if (/^#/.test(t)) {
      var a = (function (t) {
        var e = t.replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            function (t, e, n, r) {
              return e + e + n + n + r + r;
            }
          ),
          n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return n
          ? {
              r: parseInt(n[1], 16),
              g: parseInt(n[2], 16),
              b: parseInt(n[3], 16),
            }
          : null;
      })(t);
      e = { r: a.r, g: a.g, b: a.b };
    }
    if (
      (/transparent|none|initial|inherit/.test(t) &&
        (e = { r: 0, g: 0, b: 0, a: 0 }),
      !/^#|^rgb/.test(t))
    ) {
      var i = document.getElementsByTagName("head")[0];
      i.style.color = t;
      var s = getComputedStyle(i, null).color;
      (s = /rgb/.test(s) ? s.replace(/[^\d,]/g, "").split(",") : [0, 0, 0]),
        (i.style.color = ""),
        (e = {
          r: parseInt(s[0], 10),
          g: parseInt(s[1], 10),
          b: parseInt(s[2], 10),
        });
    }
    return e;
  }
  function z(t, e, n) {
    var r = {},
      a = ",";
    return (
      Object.keys(e).forEach(function (a) {
        "a" !== a
          ? (r[a] = Q(t[a], e[a], n) >> 0 || 0)
          : t[a] && e[a] && (r[a] = ((100 * Q(t[a], e[a], n)) >> 0) / 100);
      }),
      r.a
        ? "rgba(" + r.r + a + r.g + a + r.b + a + r.a + ")"
        : "rgb(" + r.r + a + r.g + a + r.b + ")"
    );
  }
  function Y(t) {
    this.valuesEnd[t] &&
      !e[t] &&
      (e[t] = function (e, n, r, a) {
        e.style[t] = z(n, r, a);
      });
  }
  var K = {};
  [
    "color",
    "backgroundColor",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "outlineColor",
  ].forEach(function (t) {
    K[t] = Y;
  });
  var $ = [
      "color",
      "backgroundColor",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
    ],
    W = {};
  $.forEach(function (t) {
    W[t] = "#000";
  });
  var G = {};
  $.forEach(function (t) {
    G[t] = Y;
  });
  var J = {
      component: "colorProperties",
      category: "colors",
      properties: $,
      defaultValues: W,
      Interpolate: { numbers: Q, colors: z },
      functions: {
        prepareStart: function (t) {
          return C(this.element, t) || f[t];
        },
        prepareProperty: function (t, e) {
          return Z(e);
        },
        onStart: G,
      },
      Util: { trueColor: Z },
    },
    tt = {},
    et = "htmlAttributes",
    nt = ["fill", "stroke", "stop-color"];
  function rt(t) {
    return t.replace(/[A-Z]/g, "-$&").toLowerCase();
  }
  var at = {
      prepareStart: function (t, e) {
        var n = this,
          r = {};
        return (
          Object.keys(e).forEach(function (t) {
            var e = rt(t).replace(/_+[a-z]+/, ""),
              a = n.element.getAttribute(e);
            r[e] = nt.includes(e)
              ? a || "rgba(0,0,0,0)"
              : a || (/opacity/i.test(t) ? 1 : 0);
          }),
          r
        );
      },
      prepareProperty: function (t, e) {
        var n = this,
          r = {};
        return (
          Object.keys(e).forEach(function (a) {
            var s = rt(a),
              o = /(%|[a-z]+)$/,
              u = n.element.getAttribute(s.replace(/_+[a-z]+/, ""));
            if (nt.includes(s))
              (i.htmlAttributes[s] = function (e) {
                n.valuesEnd[t] &&
                  n.valuesEnd[t][e] &&
                  !(e in tt) &&
                  (tt[e] = function (t, e, n, r, a) {
                    t.setAttribute(e, z(n, r, a));
                  });
              }),
                (r[s] = Z(e[a]) || f.htmlAttributes[a]);
            else if (null !== u && o.test(u)) {
              var c = F(u).u || F(e[a]).u,
                l = /%/.test(c) ? "_percent" : "_" + c;
              (i.htmlAttributes[s + l] = function (e) {
                n.valuesEnd[t] &&
                  n.valuesEnd[t][e] &&
                  !(e in tt) &&
                  (tt[e] = function (t, e, n, r, a) {
                    var i = e.replace(l, "");
                    t.setAttribute(
                      i,
                      ((1e3 * Q(n.v, r.v, a)) >> 0) / 1e3 + r.u
                    );
                  });
              }),
                (r[s + l] = F(e[a]));
            } else
              (o.test(e[a]) && null !== u && (null === u || o.test(u))) ||
                ((i.htmlAttributes[s] = function (e) {
                  n.valuesEnd[t] &&
                    n.valuesEnd[t][e] &&
                    !(e in tt) &&
                    (tt[e] = function (t, e, n, r, a) {
                      t.setAttribute(e, ((1e3 * Q(n, r, a)) >> 0) / 1e3);
                    });
                }),
                (r[s] = parseFloat(e[a])));
          }),
          r
        );
      },
      onStart: {
        attr: function (t) {
          !e[t] &&
            this.valuesEnd[t] &&
            (e[t] = function (t, n, r, a) {
              Object.keys(r).forEach(function (i) {
                e.attributes[i](t, i, n[i], r[i], a);
              });
            });
        },
        attributes: function (t) {
          !e[t] && this.valuesEnd.attr && (e[t] = tt);
        },
      },
    },
    it = {
      component: et,
      property: "attr",
      subProperties: [
        "fill",
        "stroke",
        "stop-color",
        "fill-opacity",
        "stroke-opacity",
      ],
      defaultValue: {
        fill: "rgb(0,0,0)",
        stroke: "rgb(0,0,0)",
        "stop-color": "rgb(0,0,0)",
        opacity: 1,
        "stroke-opacity": 1,
        "fill-opacity": 1,
      },
      Interpolate: { numbers: Q, colors: z },
      functions: at,
      Util: { replaceUppercase: rt, trueColor: Z, trueDimension: F },
    };
  var st = {
      prepareStart: function (t) {
        return C(this.element, t);
      },
      prepareProperty: function (t, e) {
        return parseFloat(e);
      },
      onStart: function (t) {
        t in this.valuesEnd &&
          !e[t] &&
          (e[t] = function (e, n, r, a) {
            e.style[t] = ((1e3 * Q(n, r, a)) >> 0) / 1e3;
          });
      },
    },
    ot = {
      component: "opacityProperty",
      property: "opacity",
      defaultValue: 1,
      Interpolate: { numbers: Q },
      functions: st,
    },
    ut = String("abcdefghijklmnopqrstuvwxyz").split(""),
    ct = String("abcdefghijklmnopqrstuvwxyz").toUpperCase().split(""),
    lt = String("~!@#$%^&*()_+{}[];'<>,./?=-").split(""),
    ht = String("0123456789").split(""),
    pt = ut.concat(ct, ht),
    ft = pt.concat(lt),
    dt = {
      alpha: ut,
      upper: ct,
      symbols: lt,
      numeric: ht,
      alphanumeric: pt,
      all: ft,
    },
    vt = {
      text: function (t) {
        if (!e[t] && this.valuesEnd[t]) {
          var n = this._textChars,
            r = dt[d.textChars];
          n in dt ? (r = dt[n]) : n && n.length && (r = n),
            (e[t] = function (t, e, n, a) {
              var i = "",
                s = "",
                o = "" === n ? " " : n,
                u = e.substring(0),
                c = n.substring(0),
                l = r[(Math.random() * r.length) >> 0];
              " " === e
                ? ((s = c.substring(Math.min(a * c.length, c.length) >> 0, 0)),
                  (t.innerHTML = a < 1 ? s + l : o))
                : " " === n
                ? ((i = u.substring(
                    0,
                    Math.min((1 - a) * u.length, u.length) >> 0
                  )),
                  (t.innerHTML = a < 1 ? i + l : o))
                : ((i = u.substring(
                    u.length,
                    Math.min(a * u.length, u.length) >> 0
                  )),
                  (s = c.substring(0, Math.min(a * c.length, c.length) >> 0)),
                  (t.innerHTML = a < 1 ? s + l + i : o));
            });
        }
      },
      number: function (t) {
        t in this.valuesEnd &&
          !e[t] &&
          (e[t] = function (t, e, n, r) {
            t.innerHTML = Q(e, n, r) >> 0;
          });
      },
    };
  function yt(t, e) {
    var n, r;
    if ("string" == typeof t)
      return (
        ((r = document.createElement("SPAN")).innerHTML = t),
        (r.className = e),
        r
      );
    if (
      !t.children.length ||
      (t.children.length && t.children[0].className !== e)
    ) {
      var a = t.innerHTML;
      ((n = document.createElement("SPAN")).className = e),
        (n.innerHTML = a),
        t.appendChild(n),
        (t.innerHTML = n.outerHTML);
    } else t.children.length && t.children[0].className === e && (n = t.children[0]);
    return n;
  }
  function gt(t, e) {
    var n = [],
      r = t.children.length;
    if (r) {
      for (
        var a,
          i = [],
          s = t.innerHTML,
          o = 0,
          u = void 0,
          c = void 0,
          l = void 0;
        o < r;
        o += 1
      )
        (c = (u = t.children[o]).outerHTML),
          "" !== (a = s.split(c))[0]
            ? ((l = yt(a[0], e)), i.push(l), (s = s.replace(a[0], "")))
            : "" !== a[1] &&
              ((l = yt(a[1].split("<")[0], e)),
              i.push(l),
              (s = s.replace(a[0].split("<")[0], ""))),
          u.classList.contains(e) || u.classList.add(e),
          i.push(u),
          (s = s.replace(c, ""));
      if ("" !== s) {
        var h = yt(s, e);
        i.push(h);
      }
      n = n.concat(i);
    } else n = n.concat([yt(t, e)]);
    return n;
  }
  function mt(t, e, n, r) {
    return "perspective(" + ((1e3 * (t + (e - t) * r)) >> 0) / 1e3 + n + ")";
  }
  function bt(t, e, n, r) {
    for (var a = [], i = 0; i < 3; i += 1)
      a[i] =
        (t[i] || e[i] ? ((1e3 * (t[i] + (e[i] - t[i]) * r)) >> 0) / 1e3 : 0) +
        n;
    return "translate3d(" + a.join(",") + ")";
  }
  function wt(t, e, n, r) {
    var a = "";
    return (
      (a +=
        t[0] || e[0]
          ? "rotateX(" +
            ((1e3 * (t[0] + (e[0] - t[0]) * r)) >> 0) / 1e3 +
            n +
            ")"
          : ""),
      (a +=
        t[1] || e[1]
          ? "rotateY(" +
            ((1e3 * (t[1] + (e[1] - t[1]) * r)) >> 0) / 1e3 +
            n +
            ")"
          : ""),
      (a +=
        t[2] || e[2]
          ? "rotateZ(" +
            ((1e3 * (t[2] + (e[2] - t[2]) * r)) >> 0) / 1e3 +
            n +
            ")"
          : "")
    );
  }
  function xt(t, e, n) {
    return "scale(" + ((1e3 * (t + (e - t) * n)) >> 0) / 1e3 + ")";
  }
  function Et(t, e, n, r) {
    var a = [];
    return (
      (a[0] =
        (t[0] === e[0]
          ? e[0]
          : ((1e3 * (t[0] + (e[0] - t[0]) * r)) >> 0) / 1e3) + n),
      (a[1] =
        t[1] || e[1]
          ? (t[1] === e[1]
              ? e[1]
              : ((1e3 * (t[1] + (e[1] - t[1]) * r)) >> 0) / 1e3) + n
          : "0"),
      "skew(" + a.join(",") + ")"
    );
  }
  function Mt(t, e) {
    return (parseFloat(t) / 100) * e;
  }
  function _t(t) {
    return 2 * t.getAttribute("width") + 2 * t.getAttribute("height");
  }
  function kt(t) {
    var e = t.getAttribute("points").split(" "),
      n = 0;
    if (e.length > 1) {
      var r = function (t) {
          var e = t.split(",");
          return 2 !== e.length ||
            Number.isNaN(1 * e[0]) ||
            Number.isNaN(1 * e[1])
            ? 0
            : [parseFloat(e[0]), parseFloat(e[1])];
        },
        a = function (t, e) {
          return void 0 !== t && void 0 !== e
            ? Math.sqrt(Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2))
            : 0;
        };
      if (e.length > 2)
        for (var i = 0; i < e.length - 1; i += 1) n += a(r(e[i]), r(e[i + 1]));
      n += "polygon" === t.tagName ? a(r(e[0]), r(e[e.length - 1])) : 0;
    }
    return n;
  }
  function Ot(t) {
    var e = t.getAttribute("x1"),
      n = t.getAttribute("x2"),
      r = t.getAttribute("y1"),
      a = t.getAttribute("y2");
    return Math.sqrt(Math.pow(n - e, 2) + Math.pow(a - r, 2));
  }
  function Ct(t) {
    var e = t.getAttribute("r");
    return 2 * Math.PI * e;
  }
  function Tt(t) {
    var e = 2 * t.getAttribute("rx"),
      n = 2 * t.getAttribute("ry");
    return (Math.sqrt(0.5 * (e * e + n * n)) * (2 * Math.PI)) / 2;
  }
  function St(t) {
    return "rect" === t.tagName
      ? _t(t)
      : "circle" === t.tagName
      ? Ct(t)
      : "ellipse" === t.tagName
      ? Tt(t)
      : ["polygon", "polyline"].includes(t.tagName)
      ? kt(t)
      : "line" === t.tagName
      ? Ot(t)
      : 0;
  }
  function It(t, e) {
    var n,
      r,
      a,
      i,
      s = /path|glyph/.test(t.tagName) ? t.getTotalLength() : St(t);
    if (e instanceof Object) return e;
    if ("string" == typeof e) {
      var o = e.split(/,|\s/);
      (n = /%/.test(o[0]) ? Mt(o[0].trim(), s) : parseFloat(o[0])),
        (r = /%/.test(o[1]) ? Mt(o[1].trim(), s) : parseFloat(o[1]));
    } else void 0 === e && ((i = parseFloat(C(t, "stroke-dashoffset"))), (a = C(t, "stroke-dasharray").split(",")), (n = 0 - i), (r = parseFloat(a[0]) + n || s));
    return { s: n, e: r, l: s };
  }
  var At = {
      prepareStart: function () {
        return It(this.element);
      },
      prepareProperty: function (t, e) {
        return It(this.element, e);
      },
      onStart: function (t) {
        t in this.valuesEnd &&
          !e[t] &&
          (e[t] = function (t, e, n, r) {
            var a = ((100 * e.l) >> 0) / 100,
              i = 0 - ((100 * Q(e.s, n.s, r)) >> 0) / 100,
              s = ((100 * Q(e.e, n.e, r)) >> 0) / 100 + i;
            (t.style.strokeDashoffset = i + "px"),
              (t.style.strokeDasharray =
                ((100 * (s < 1 ? 0 : s)) >> 0) / 100 + "px, " + a + "px");
          });
      },
    },
    jt = 4;
  function Lt(t) {
    return t.map(function (t) {
      return Array.isArray(t) ? Lt(t) : Number.isNaN(+t) ? t : +t;
    });
  }
  function Pt(t, e) {
    var n = Number.isNaN(+e) ? jt : +e;
    return n
      ? t.map(function (t) {
          return t.map(function (t) {
            var e = +t,
              r = Math.pow(10, n);
            return e ? (e % 1 == 0 ? e : Math.round(e * r) / r) : t;
          });
        })
      : Lt(t);
  }
  function Nt(t, e, n) {
    if (t[n].length > 7) {
      t[n].shift();
      for (var r = t[n], a = n; r.length; )
        (e[n] = "A"), t.splice((a += 1), 0, ["C"].concat(r.splice(0, 6)));
      t.splice(n, 1);
    }
  }
  var Vt = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 };
  function qt(t) {
    return (
      Array.isArray(t) &&
      t.every(function (t) {
        var e = t[0].toLowerCase();
        return Vt[e] === t.length - 1 && /[achlmrqstvz]/g.test(e);
      })
    );
  }
  function Ht(t) {
    var e = t.pathValue[t.segmentStart],
      n = e.toLowerCase(),
      r = t.data;
    if (
      ("m" === n &&
        r.length > 2 &&
        (t.segments.push([e, r[0], r[1]]),
        (r = r.slice(2)),
        (n = "l"),
        (e = "m" === e ? "l" : "L")),
      "r" === n)
    )
      t.segments.push([e].concat(r));
    else
      for (
        ;
        r.length >= Vt[n] &&
        (t.segments.push([e].concat(r.splice(0, Vt[n]))), Vt[n]);

      );
  }
  var Ft = "Invalid path value";
  function Qt(t) {
    var e = t.pathValue.charCodeAt(t.index);
    return 48 === e
      ? ((t.param = 0), void (t.index += 1))
      : 49 === e
      ? ((t.param = 1), void (t.index += 1))
      : void (t.err = Ft + ": invalid Arc flag " + e);
  }
  function Ut(t) {
    return t >= 48 && t <= 57;
  }
  function Dt(t) {
    var e,
      n = t.index,
      r = t.max,
      a = n,
      i = !1,
      s = !1,
      o = !1,
      u = !1;
    if (a >= r) t.err = Ft + ": missing param " + t.pathValue[a];
    else if (
      ((43 !== (e = t.pathValue.charCodeAt(a)) && 45 !== e) ||
        (e = (a += 1) < r ? t.pathValue.charCodeAt(a) : 0),
      Ut(e) || 46 === e)
    ) {
      if (46 !== e) {
        if (
          ((i = 48 === e),
          (e = (a += 1) < r ? t.pathValue.charCodeAt(a) : 0),
          i && a < r && e && Ut(e))
        )
          return void (t.err = Ft + ": " + t.pathValue[n] + " illegal number");
        for (; a < r && Ut(t.pathValue.charCodeAt(a)); ) (a += 1), (s = !0);
        e = a < r ? t.pathValue.charCodeAt(a) : 0;
      }
      if (46 === e) {
        for (u = !0, a += 1; Ut(t.pathValue.charCodeAt(a)); )
          (a += 1), (o = !0);
        e = a < r ? t.pathValue.charCodeAt(a) : 0;
      }
      if (101 === e || 69 === e) {
        if (u && !s && !o)
          return void (t.err =
            Ft + ": " + t.pathValue[a] + " invalid float exponent");
        if (
          ((43 !== (e = (a += 1) < r ? t.pathValue.charCodeAt(a) : 0) &&
            45 !== e) ||
            (a += 1),
          !(a < r && Ut(t.pathValue.charCodeAt(a))))
        )
          return void (t.err =
            Ft + ": " + t.pathValue[a] + " invalid float exponent");
        for (; a < r && Ut(t.pathValue.charCodeAt(a)); ) a += 1;
      }
      (t.index = a), (t.param = +t.pathValue.slice(n, a));
    } else
      t.err =
        Ft + " at index " + a + ": " + t.pathValue[a] + " is not a number";
  }
  function Rt(t) {
    for (
      ;
      t.index < t.max &&
      (10 === (e = t.pathValue.charCodeAt(t.index)) ||
        13 === e ||
        8232 === e ||
        8233 === e ||
        32 === e ||
        9 === e ||
        11 === e ||
        12 === e ||
        160 === e ||
        (e >= 5760 &&
          [
            5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
            8201, 8202, 8239, 8287, 12288, 65279,
          ].indexOf(e) >= 0));

    )
      t.index += 1;
    var e;
  }
  function Xt(t) {
    return (t >= 48 && t <= 57) || 43 === t || 45 === t || 46 === t;
  }
  function Bt(t) {
    var e = t.max,
      n = t.pathValue.charCodeAt(t.index),
      r = Vt[t.pathValue[t.index].toLowerCase()];
    if (
      ((t.segmentStart = t.index),
      (function (t) {
        switch (32 | t) {
          case 109:
          case 122:
          case 108:
          case 104:
          case 118:
          case 99:
          case 115:
          case 113:
          case 116:
          case 97:
          case 114:
            return !0;
          default:
            return !1;
        }
      })(n))
    )
      if (((t.index += 1), Rt(t), (t.data = []), r)) {
        for (;;) {
          for (var a = r; a > 0; a -= 1) {
            if (
              (97 != (32 | n) || (3 !== a && 4 !== a) ? Dt(t) : Qt(t),
              t.err.length)
            )
              return;
            t.data.push(t.param),
              Rt(t),
              t.index < e &&
                44 === t.pathValue.charCodeAt(t.index) &&
                ((t.index += 1), Rt(t));
          }
          if (t.index >= t.max) break;
          if (!Xt(t.pathValue.charCodeAt(t.index))) break;
        }
        Ht(t);
      } else Ht(t);
    else t.err = Ft + ": " + t.pathValue[t.index] + " not a path command";
  }
  function Zt(t) {
    return (
      (this.segments = []),
      (this.pathValue = t),
      (this.max = t.length),
      (this.index = 0),
      (this.param = 0),
      (this.segmentStart = 0),
      (this.data = []),
      (this.err = ""),
      this
    );
  }
  function zt(t, e) {
    if (
      (function (t) {
        return (
          qt(t) &&
          t.every(function (t) {
            return t[0] === t[0].toUpperCase();
          })
        );
      })(t)
    )
      return Lt(t);
    var n = (function (t, e) {
        if (qt(t)) return Lt(t);
        var n = new Zt(t);
        for (Rt(n); n.index < n.max && !n.err.length; ) Bt(n);
        return (
          n.err.length
            ? (n.segments = [])
            : n.segments.length &&
              ("mM".indexOf(n.segments[0][0]) < 0
                ? ((n.err = Ft + ": missing M/m"), (n.segments = []))
                : (n.segments[0][0] = "M")),
          Pt(n.segments, e)
        );
      })(t, e),
      r = n.length,
      a = [],
      i = 0,
      s = 0,
      o = 0,
      u = 0,
      c = 0;
    "M" === n[0][0] &&
      ((o = i = +n[0][1]), (u = s = +n[0][2]), (c += 1), a.push(["M", i, s]));
    for (var l = c; l < r; l += 1) {
      var h = n[l],
        p = h[0],
        f = p.toUpperCase(),
        d = [],
        v = [];
      if ((a.push(d), p !== f))
        switch (((d[0] = f), f)) {
          case "A":
            v = h.slice(1, -2).concat([+h[6] + i, +h[7] + s]);
            for (var y = 0; y < v.length; y += 1) d.push(v[y]);
            break;
          case "V":
            d[1] = +h[1] + s;
            break;
          case "H":
            d[1] = +h[1] + i;
            break;
          default:
            "M" === f && ((o = +h[1] + i), (u = +h[2] + s));
            for (var g = 1; g < h.length; g += 1)
              d.push(+h[g] + (g % 2 ? i : s));
        }
      else for (var m = 0; m < h.length; m += 1) d.push(h[m]);
      var b = d.length;
      switch (f) {
        case "Z":
          (i = o), (s = u);
          break;
        case "H":
          i = +d[1];
          break;
        case "V":
          s = +d[1];
          break;
        default:
          (i = +d[b - 2]), (s = +d[b - 1]), "M" === f && ((o = i), (u = s));
      }
    }
    return Pt(a, e);
  }
  function Yt(t, e, n) {
    var r = t[0],
      a = t.slice(1),
      i = t;
    if (("TQ".indexOf(t[0]) < 0 && ((e.qx = null), (e.qy = null)), "H" === r))
      i = ["L", t[1], e.y1];
    else if ("V" === r) i = ["L", e.x1, t[1]];
    else if ("S" === r) {
      var s = (function (t, e, n, r, a) {
          return "CS".indexOf(a) > -1
            ? { x1: 2 * t - n, y1: 2 * e - r }
            : { x1: t, y1: e };
        })(e.x1, e.y1, e.x2, e.y2, n),
        o = s.x1,
        u = s.y1;
      (e.x1 = o), (e.y1 = u), (i = ["C", o, u].concat(a));
    } else if ("T" === r) {
      var c = (function (t, e, n, r, a) {
          return "QT".indexOf(a) > -1
            ? { qx: 2 * t - n, qy: 2 * e - r }
            : { qx: t, qy: e };
        })(e.x1, e.y1, e.qx, e.qy, n),
        l = c.qx,
        h = c.qy;
      (e.qx = l), (e.qy = h), (i = ["Q", l, h].concat(a));
    } else if ("Q" === r) {
      var p = a[0],
        f = a[1];
      (e.qx = p), (e.qy = f);
    }
    return i;
  }
  function Kt(t, e) {
    if (
      (function (t) {
        return (
          Array.isArray(t) &&
          t.every(function (t) {
            var e = t[0].toLowerCase();
            return Vt[e] === t.length - 1 && /[ACLMQZ]/.test(t[0]);
          })
        );
      })(t)
    )
      return Lt(t);
    for (
      var n,
        r,
        a = zt(t, e),
        i = { x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null },
        s = [],
        o = a.length,
        u = "",
        c = 0;
      c < o;
      c += 1
    ) {
      var l = a[c][0];
      (s[c] = l),
        c && (u = s[c - 1]),
        (a[c] = Yt(a[c], i, u)),
        (r = (n = a[c]).length),
        (i.x1 = +n[r - 2]),
        (i.y1 = +n[r - 1]),
        (i.x2 = +n[r - 4] || i.x1),
        (i.y2 = +n[r - 3] || i.y1);
    }
    return Pt(a, e);
  }
  function $t(t, e, n) {
    return {
      x: t * Math.cos(n) - e * Math.sin(n),
      y: t * Math.sin(n) + e * Math.cos(n),
    };
  }
  function Wt(t, e, n, r, a, i, s, o, u, c) {
    var l,
      h,
      p,
      f,
      d,
      v = (120 * Math.PI) / 180,
      y = (Math.PI / 180) * (a || 0),
      g = [],
      m = t,
      b = o,
      w = e,
      x = u,
      E = n,
      M = r;
    if (c) {
      (h = c[0]), (p = c[1]), (f = c[2]), (d = c[3]);
    } else {
      (m = (l = $t(m, w, -y)).x), (w = l.y);
      var _ = (m - (b = (l = $t(b, x, -y)).x)) / 2,
        k = (w - (x = l.y)) / 2,
        O = (_ * _) / (E * M) + Math.pow(k, 2) / Math.pow(M, 2);
      O > 1 && ((E *= O = Math.sqrt(O)), (M *= O));
      var C = Math.pow(E, 2),
        T = Math.pow(M, 2),
        S =
          (i === s ? -1 : 1) *
          Math.sqrt(
            Math.abs((C * T - C * k * k - T * _ * _) / (C * k * k + T * _ * _))
          );
      (f = (S * E * k) / M + (m + b) / 2),
        (d = (S * -M * _) / E + (w + x) / 2),
        (h = Math.asin(
          ((((w - d) / M) * Math.pow(10, 9)) >> 0) / Math.pow(10, 9)
        )),
        (p = Math.asin(
          ((((x - d) / M) * Math.pow(10, 9)) >> 0) / Math.pow(10, 9)
        )),
        (h = m < f ? Math.PI - h : h),
        (p = b < f ? Math.PI - p : p),
        h < 0 && (h = 2 * Math.PI + h),
        p < 0 && (p = 2 * Math.PI + p),
        s && h > p && (h -= 2 * Math.PI),
        !s && p > h && (p -= 2 * Math.PI);
    }
    var I = p - h;
    if (Math.abs(I) > v) {
      var A = p,
        j = b,
        L = x;
      (p = h + v * (s && p > h ? 1 : -1)),
        (b = f + E * Math.cos(p)),
        (x = d + M * Math.sin(p)),
        (g = Wt(b, x, E, M, a, 0, s, j, L, [p, A, f, d]));
    }
    I = p - h;
    var P = Math.cos(h),
      N = Math.sin(h),
      V = Math.cos(p),
      q = Math.sin(p),
      H = Math.tan(I / 4),
      F = (4 / 3) * E * H,
      Q = (4 / 3) * M * H,
      U = [m, w],
      D = [m + F * N, w - Q * P],
      R = [b + F * q, x - Q * V],
      X = [b, x];
    return (
      (D[0] = 2 * U[0] - D[0]),
      (D[1] = 2 * U[1] - D[1]),
      c
        ? [D, R, X].concat(g)
        : (g = [D, R, X].concat(g).join().split(",")).map(function (t, e) {
            return e % 2 ? $t(g[e - 1], t, y).y : $t(t, g[e + 1], y).x;
          })
    );
  }
  function Gt(t, e, n, r, a, i) {
    var s = 1 / 3,
      o = 2 / 3;
    return [s * t + o * n, s * e + o * r, s * a + o * n, s * i + o * r, a, i];
  }
  function Jt(t, e, n, r, a, i, s, o, u) {
    var c = 1 - u;
    return {
      x:
        Math.pow(c, 3) * t +
        c * c * 3 * u * n +
        3 * c * u * u * a +
        Math.pow(u, 3) * s,
      y:
        Math.pow(c, 3) * e +
        c * c * 3 * u * r +
        3 * c * u * u * i +
        Math.pow(u, 3) * o,
    };
  }
  function te(t, e, n) {
    var r = t[0],
      a = t[1];
    return [r + (e[0] - r) * n, a + (e[1] - a) * n];
  }
  function ee(t, e, n, r) {
    var a = 0.5,
      i = [t, e],
      s = [n, r],
      o = te(i, s, a),
      u = te(s, o, a),
      c = te(o, u, a),
      l = te(u, c, a),
      h = te(c, l, a),
      p = Jt.apply(0, i.concat(o, c, h, a)),
      f = Jt.apply(0, h.concat(l, u, s, 0));
    return [p.x, p.y, f.x, f.y, n, r];
  }
  function ne(t, e) {
    "TQ".indexOf(t[0]) < 0 && ((e.qx = null), (e.qy = null));
    var n = t.slice(1),
      r = n[0],
      a = n[1];
    switch (t[0]) {
      case "M":
        return (e.x = r), (e.y = a), t;
      case "A":
        return ["C"].concat(Wt.apply(0, [e.x1, e.y1].concat(t.slice(1))));
      case "Q":
        return (
          (e.qx = r),
          (e.qy = a),
          ["C"].concat(Gt.apply(0, [e.x1, e.y1].concat(t.slice(1))))
        );
      case "L":
        return ["C"].concat(ee(e.x1, e.y1, t[1], t[2]));
      case "Z":
        return ["C"].concat(ee(e.x1, e.y1, e.x, e.y));
    }
    return t;
  }
  function re(t, e) {
    if (
      (function (t) {
        return (
          qt(t) &&
          t.slice(1).every(function (t) {
            return "C" === t[0];
          })
        );
      })(t)
    )
      return Lt(t);
    for (
      var n,
        r,
        a = Kt(t, e),
        i = { x1: 0, y1: 0, x2: 0, y2: 0, x: 0, y: 0, qx: null, qy: null },
        s = [],
        o = "",
        u = a.length,
        c = 0;
      c < u;
      c += 1
    )
      a[c] && (o = a[c][0]),
        (s[c] = o),
        (a[c] = ne(a[c], i)),
        Nt(a, s, c),
        (u = a.length),
        (r = (n = a[c]).length),
        (i.x1 = +n[r - 2]),
        (i.y1 = +n[r - 1]),
        (i.x2 = +n[r - 4] || i.x1),
        (i.y2 = +n[r - 3] || i.y1);
    return Pt(a, e);
  }
  function ae(t) {
    return t
      .map(function (t) {
        return t[0].concat(t.slice(1).join(" "));
      })
      .join("");
  }
  function ie(t, e, n, r, a) {
    return (
      a * (a * (-3 * t + 9 * e - 9 * n + 3 * r) + 6 * t - 12 * e + 6 * n) -
      3 * t +
      3 * e
    );
  }
  function se(t, e, n, r, a, i, s, o, u) {
    var c;
    (null === u || Number.isNaN(+u)) && (c = 1),
      c > 1 && (c = 1),
      c < 0 && (c = 0);
    var l = c / 2,
      h = 0,
      p = 0,
      f = 0,
      d = 0,
      v = [
        0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069,
        0.1069, 0.0472, 0.0472,
      ];
    return (
      [
        -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699,
        -0.9041, 0.9041, -0.9816, 0.9816,
      ].forEach(function (u, c) {
        (p = ie(t, n, a, s, (h = l * u + l))),
          (f = ie(e, r, i, o, h)),
          (d += v[c] * Math.sqrt(p * p + f * f));
      }),
      l * d
    );
  }
  function oe(t, e) {
    var n = 0;
    return (
      re(t, e).forEach(function (t, e, r) {
        n +=
          "M" !== t[0] ? se.apply(0, r[e - 1].slice(-2).concat(t.slice(1))) : 0;
      }),
      n
    );
  }
  function ue(t, e) {
    var n,
      r,
      a = 0;
    return re(t, 9)
      .map(function (t, i, s) {
        return (
          (r = i ? s[i - 1].slice(-2).concat(t.slice(1)) : t.slice(1)),
          (n = i ? se.apply(0, r) : 0),
          (a += n),
          0 === i
            ? { x: r[0], y: r[1] }
            : a > e && e > a - n
            ? Jt.apply(0, r.concat(1 - (a - e) / n))
            : null
        );
      })
      .filter(function (t) {
        return t;
      })
      .slice(-1)[0];
  }
  function ce(t, e, n, r, a, i, s, o) {
    return (
      (3 *
        ((o - e) * (n + a) -
          (s - t) * (r + i) +
          r * (t - a) -
          n * (e - i) +
          o * (a + t / 3) -
          s * (i + e / 3))) /
      20
    );
  }
  function le(t, e) {
    return (
      (function (t, e) {
        var n = 0,
          r = 0,
          a = 0,
          i = 0,
          s = 0;
        return re(t, e)
          .map(function (t) {
            var e;
            switch (t[0]) {
              case "M":
              case "Z":
                return (
                  (a = "M" === t[0] ? t[1] : a),
                  (i = "M" === t[0] ? t[2] : i),
                  (n = a),
                  (r = i),
                  0
                );
              default:
                return (
                  (s = ce.apply(0, [n, r].concat(t.slice(1)))),
                  (e = t.slice(-2)),
                  (n = e[0]),
                  (r = e[1]),
                  s
                );
            }
          })
          .reduce(function (t, e) {
            return t + e;
          }, 0);
      })(re(t, e)) >= 0
    );
  }
  function he(t, e) {
    return Math.sqrt(
      (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
    );
  }
  function pe(t, e, n, r) {
    for (var a = [], i = 0; i < n; i += 1) {
      a[i] = [];
      for (var s = 0; s < 2; s += 1)
        a[i].push(((1e3 * (t[i][s] + (e[i][s] - t[i][s]) * r)) >> 0) / 1e3);
    }
    return a;
  }
  function fe(t) {
    return t.reduce(function (e, n, r) {
      return r ? e + he(t[r - 1], n) : 0;
    }, 0);
  }
  function de(t, e) {
    var n,
      r,
      a = re(
        ((n = ae(t)),
        ae(zt(n, 0))
          .replace(/(m|M)/g, "|$1")
          .split("|")
          .map(function (t) {
            return t.trim();
          })
          .filter(function (t) {
            return t;
          }))[0],
        4
      ),
      i = oe(a),
      s = [],
      o = 3;
    e && !Number.isNaN(e) && +e > 0 && (o = Math.max(o, Math.ceil(i / e)));
    for (var u = 0; u < o; u += 1) (r = ue(a, (i * u) / o)), s.push([r.x, r.y]);
    return le(a) || s.reverse(), { pathLength: i, ring: s, skipBisect: !0 };
  }
  function ve(t, e) {
    var n = Kt(t, 0);
    return (
      (function (t) {
        var e,
          n = [],
          r = t.length,
          a = [],
          i = "";
        if (!t.length || "M" !== t[0][0]) return !1;
        for (
          var s = 0;
          s < r && !(("M" === (i = (a = t[s])[0]) && s) || "Z" === i);
          s += 1
        ) {
          if (!("ML".indexOf(i) > -1)) return !1;
          n.push([a[1], a[2]]);
        }
        return (e = fe(n)), !!r && { ring: n, pathLength: e };
      })(n) || de(n, e)
    );
  }
  function ye(t, e) {
    for (var n, r, a, i, s = t.length, o = 1 / 0, u = 0, c = 0; c < s; c += 1) {
      u = 0;
      for (var l = 0; l < e.length; l += 1)
        (i = e[l]), (u += (a = he(t[(c + l) % s], i)) * a);
      u < o && ((o = u), (n = c));
    }
    n && ((r = t.splice(0, n)), t.splice.apply(t, [t.length, 0].concat(r)));
  }
  function ge(t, e) {
    for (
      var n, r, a, i = t.length + e, s = fe(t) / e, o = 0, u = 0, c = s / 2;
      t.length < i;

    )
      c <= u + (a = he((n = t[o]), (r = t[(o + 1) % t.length])))
        ? (t.splice(o + 1, 0, a ? te(n, r, (c - u) / a) : n.slice(0)), (c += s))
        : ((u += a), (o += 1));
  }
  function me(t, e) {
    void 0 === e && (e = 1 / 0);
    for (var n = [], r = [], a = 0; a < t.length; a += 1)
      for (n = t[a], r = a === t.length - 1 ? t[0] : t[a + 1]; he(n, r) > e; )
        (r = te(n, r, 0.5)), t.splice(a + 1, 0, r);
  }
  function be(t) {
    return (
      Array.isArray(t) &&
      t.every(function (t) {
        return (
          Array.isArray(t) &&
          2 === t.length &&
          !Number.isNaN(t[0]) &&
          !Number.isNaN(t[1])
        );
      })
    );
  }
  function we(t, e) {
    var n,
      r,
      a = t;
    if ("string" == typeof a) {
      var i = ve(a, e);
      (a = i.ring), (n = i.skipBisect), (r = i.pathLength);
    } else if (!Array.isArray(a)) throw Error(Ft + ": " + a);
    var s = a.slice(0);
    if (((s.pathLength = r), !be(s))) throw Error(Ft + ": " + s);
    return (
      s.length > 1 && he(s[0], s[s.length - 1]) < 1e-9 && s.pop(),
      !n && e && !Number.isNaN(e) && +e > 0 && me(s, e),
      s
    );
  }
  function xe(t, e, n) {
    var r = n || d.morphPrecision,
      a = we(t, r),
      i = we(e, r),
      s = a.length - i.length;
    return (
      ge(a, s < 0 ? -1 * s : 0), ge(i, s > 0 ? s : 0), ye(a, i), [Pt(a), Pt(i)]
    );
  }
  var Ee = {
      prepareStart: function () {
        return this.element.getAttribute("d");
      },
      prepareProperty: function (t, e) {
        var n = {},
          r = new RegExp("\\n", "ig"),
          a = null;
        return (
          e instanceof SVGElement ? (a = e) : /^\.|^#/.test(e) && (a = L(e)),
          "object" == typeof e && e.pathArray
            ? e
            : (a && ["path", "glyph"].includes(a.tagName)
                ? (n.original = a.getAttribute("d").replace(r, ""))
                : a || "string" != typeof e || (n.original = e.replace(r, "")),
              n)
        );
      },
      onStart: function (t) {
        !e[t] &&
          this.valuesEnd[t] &&
          (e[t] = function (t, e, n, r) {
            var a = e.pathArray,
              i = n.pathArray,
              s = i.length;
            t.setAttribute(
              "d",
              1 === r ? n.original : "M" + pe(a, i, s, r).join("L") + "Z"
            );
          });
      },
      crossCheck: function (t) {
        if (this.valuesEnd[t]) {
          var e = this.valuesStart[t].pathArray,
            n = this.valuesEnd[t].pathArray;
          if (!e || !n || (e && n && e.length !== n.length)) {
            var r = xe(
                this.valuesStart[t].original,
                this.valuesEnd[t].original,
                this._morphPrecision
                  ? parseInt(this._morphPrecision, 10)
                  : d.morphPrecision
              ),
              a = r[0],
              i = r[1];
            (this.valuesStart[t].pathArray = a),
              (this.valuesEnd[t].pathArray = i);
          }
        }
      },
    },
    Me = {
      EssentialBoxModel: B,
      ColorsProperties: J,
      HTMLAttributes: it,
      OpacityProperty: ot,
      TextWrite: {
        component: "textWriteProperties",
        category: "textWrite",
        properties: ["text", "number"],
        defaultValues: { text: " ", numbers: "0" },
        defaultOptions: { textChars: "alpha" },
        Interpolate: { numbers: Q },
        functions: {
          prepareStart: function () {
            return this.element.innerHTML;
          },
          prepareProperty: function (t, e) {
            return "number" === t ? parseFloat(e) : "" === e ? " " : e;
          },
          onStart: vt,
        },
        Util: {
          charSet: dt,
          createTextTweens: function (t, e, n) {
            if (t.playing) return !1;
            var r = n || {};
            (r.duration = 1e3),
              "auto" === n.duration
                ? (r.duration = "auto")
                : Number.isFinite(1 * n.duration) &&
                  (r.duration = 1 * n.duration);
            var a = A.tween,
              i = (function (t, e) {
                var n = gt(t, "text-part"),
                  r = gt(yt(e), "text-part");
                return (
                  (t.innerHTML = ""),
                  (t.innerHTML += n
                    .map(function (t) {
                      return (t.className += " oldText"), t.outerHTML;
                    })
                    .join("")),
                  (t.innerHTML += r
                    .map(function (t) {
                      return (
                        (t.className += " newText"),
                        t.outerHTML.replace(t.innerHTML, "")
                      );
                    })
                    .join("")),
                  [n, r]
                );
              })(t, e),
              s = i[0],
              o = i[1],
              u = [].slice.call(t.getElementsByClassName("oldText")).reverse(),
              c = [].slice.call(t.getElementsByClassName("newText")),
              l = [],
              h = 0;
            return (
              ((l = (l = l.concat(
                u.map(function (t, e) {
                  return (
                    (r.duration =
                      "auto" === r.duration
                        ? 75 * s[e].innerHTML.length
                        : r.duration),
                    (r.delay = h),
                    (r.onComplete = null),
                    (h += r.duration),
                    new a(t, { text: t.innerHTML }, { text: "" }, r)
                  );
                })
              )).concat(
                c.map(function (n, i) {
                  return (
                    (r.duration =
                      "auto" === r.duration
                        ? 75 * o[i].innerHTML.length
                        : r.duration),
                    (r.delay = h),
                    (r.onComplete =
                      i === o.length - 1
                        ? function () {
                            (t.innerHTML = e), (t.playing = !1);
                          }
                        : null),
                    (h += r.duration),
                    new a(n, { text: "" }, { text: o[i].innerHTML }, r)
                  );
                })
              )).start = function () {
                t.playing ||
                  (l.forEach(function (t) {
                    return t.start();
                  }),
                  (t.playing = !0));
              }),
              l
            );
          },
        },
      },
      TransformFunctions: {
        component: "transformFunctions",
        property: "transform",
        subProperties: [
          "perspective",
          "translate3d",
          "translateX",
          "translateY",
          "translateZ",
          "translate",
          "rotate3d",
          "rotateX",
          "rotateY",
          "rotateZ",
          "rotate",
          "skewX",
          "skewY",
          "skew",
          "scale",
        ],
        defaultValues: {
          perspective: 400,
          translate3d: [0, 0, 0],
          translateX: 0,
          translateY: 0,
          translateZ: 0,
          translate: [0, 0],
          rotate3d: [0, 0, 0],
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          rotate: 0,
          skewX: 0,
          skewY: 0,
          skew: [0, 0],
          scale: 1,
        },
        functions: {
          prepareStart: function (t) {
            var e = O(this.element);
            return e[t] ? e[t] : f[t];
          },
          prepareProperty: function (t, e) {
            var n = ["X", "Y", "Z"],
              r = {},
              a = [],
              i = [],
              s = [],
              o = ["translate3d", "translate", "rotate3d", "skew"];
            return (
              Object.keys(e).forEach(function (t) {
                var u =
                  "object" == typeof e[t] && e[t].length
                    ? e[t].map(function (t) {
                        return parseInt(t, 10);
                      })
                    : parseInt(e[t], 10);
                if (o.includes(t)) {
                  var c = "translate" === t || "rotate" === t ? t + "3d" : t;
                  r[c] =
                    "skew" === t
                      ? u.length
                        ? [u[0] || 0, u[1] || 0]
                        : [u || 0, 0]
                      : "translate" === t
                      ? u.length
                        ? [u[0] || 0, u[1] || 0, u[2] || 0]
                        : [u || 0, 0, 0]
                      : [u[0] || 0, u[1] || 0, u[2] || 0];
                } else if (/[XYZ]/.test(t)) {
                  var l = t.replace(/[XYZ]/, ""),
                    h = "skew" === l ? l : l + "3d",
                    p = "skew" === l ? 2 : 3,
                    f = [];
                  "translate" === l
                    ? (f = a)
                    : "rotate" === l
                    ? (f = i)
                    : "skew" === l && (f = s);
                  for (var d = 0; d < p; d += 1) {
                    var v = n[d];
                    f[d] = "" + l + v in e ? parseInt(e["" + l + v], 10) : 0;
                  }
                  r[h] = f;
                } else
                  "rotate" === t
                    ? (r.rotate3d = [0, 0, u])
                    : (r[t] = "scale" === t ? parseFloat(e[t]) : u);
              }),
              r
            );
          },
          onStart: function (t) {
            !e[t] &&
              this.valuesEnd[t] &&
              (e[t] = function (e, n, r, a) {
                e.style[t] =
                  (n.perspective || r.perspective
                    ? mt(n.perspective, r.perspective, "px", a)
                    : "") +
                  (n.translate3d
                    ? bt(n.translate3d, r.translate3d, "px", a)
                    : "") +
                  (n.rotate3d ? wt(n.rotate3d, r.rotate3d, "deg", a) : "") +
                  (n.skew ? Et(n.skew, r.skew, "deg", a) : "") +
                  (n.scale || r.scale ? xt(n.scale, r.scale, a) : "");
              });
          },
          crossCheck: function (t) {
            this.valuesEnd[t] &&
              this.valuesEnd[t] &&
              this.valuesEnd[t].perspective &&
              !this.valuesStart[t].perspective &&
              (this.valuesStart[t].perspective = this.valuesEnd[t].perspective);
          },
        },
        Interpolate: {
          perspective: mt,
          translate3d: bt,
          rotate3d: wt,
          translate: function (t, e, n, r) {
            var a = [];
            return (
              (a[0] =
                (t[0] === e[0]
                  ? e[0]
                  : ((1e3 * (t[0] + (e[0] - t[0]) * r)) >> 0) / 1e3) + n),
              (a[1] =
                t[1] || e[1]
                  ? (t[1] === e[1]
                      ? e[1]
                      : ((1e3 * (t[1] + (e[1] - t[1]) * r)) >> 0) / 1e3) + n
                  : "0"),
              "translate(" + a.join(",") + ")"
            );
          },
          rotate: function (t, e, n, r) {
            return "rotate(" + ((1e3 * (t + (e - t) * r)) >> 0) / 1e3 + n + ")";
          },
          scale: xt,
          skew: Et,
        },
      },
      SVGDraw: {
        component: "svgDraw",
        property: "draw",
        defaultValue: "0% 0%",
        Interpolate: { numbers: Q },
        functions: At,
        Util: {
          getRectLength: _t,
          getPolyLength: kt,
          getLineLength: Ot,
          getCircleLength: Ct,
          getEllipseLength: Tt,
          getTotalLength: St,
          resetDraw: function (t) {
            (t.style.strokeDashoffset = ""), (t.style.strokeDasharray = "");
          },
          getDraw: It,
          percent: Mt,
        },
      },
      SVGMorph: {
        component: "svgMorph",
        property: "path",
        defaultValue: [],
        Interpolate: pe,
        defaultOptions: { morphPrecision: 10, morphIndex: 0 },
        functions: Ee,
        Util: {
          addPoints: ge,
          bisect: me,
          normalizeRing: we,
          validRing: be,
          getInterpolationPoints: xe,
          pathStringToRing: ve,
          distanceSquareRoot: he,
          midPoint: te,
          approximateRing: de,
          rotateRing: ye,
          pathToString: ae,
          pathToCurve: re,
          getPathLength: oe,
          getPointAtLength: ue,
          getDrawDirection: le,
          roundPath: Pt,
        },
      },
    };
  return (
    Object.keys(Me).forEach(function (t) {
      var e = Me[t];
      Me[t] = new H(e);
    }),
    {
      Animation: H,
      Components: Me,
      Tween: V,
      fromTo: function (t, e, n, r) {
        var a = r || {};
        return new (0, A.tween)(L(t), e, n, a);
      },
      to: function (t, e, n) {
        var r = n || {},
          a = A.tween;
        return (r.resetStart = e), new a(L(t), e, e, r);
      },
      TweenCollection: q,
      allFromTo: function (t, e, n, r) {
        var a = r || {};
        return new q(L(t, !0), e, n, a);
      },
      allTo: function (t, e, n) {
        var r = n || {};
        return (n.resetStart = e), new q(L(t, !0), e, e, r);
      },
      Objects: w,
      Util: x,
      Easing: j,
      CubicBezier: t,
      Render: h,
      Interpolate: a,
      Process: I,
      Internals: k,
      Selector: L,
      Version: "2.1.2",
    }
  );
});
