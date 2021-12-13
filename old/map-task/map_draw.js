google.maps.__gjsload__("poly", function (_) {
  var eH = function (a, b) {
      return b ? _.Ek(b, a.m.get("projection")) : null;
    },
    fH = function (a, b) {
      return b ? _.el(b, a.m.get("projection"), void 0) : null;
    },
    gH = function (a) {
      for (a = a.toString(16); 2 > a.length; ) a = "0" + a;
      return a;
    },
    vCa = function (a) {
      var b = a.length;
      !b ||
        (a[0] == a[b - 2] && a[1] == a[b - 1]) ||
        (a.push(a[0]), a.push(a[1]));
    },
    wCa = function (a, b) {
      for (var c = 0, d = a.length; c < d; c += 2) {
        var e = new _.bf(a[c], a[c + 1], !0);
        e = _.Ek(e, b);
        a[c] = e.g;
        a[c + 1] = e.h;
      }
    },
    hH = function (a, b, c) {
      var d = a.path;
      a = a.g;
      for (
        var e = [],
          f = a ? [] : null,
          g = d[0] == d[d.length - 2] && d[1] == d[d.length - 1],
          h = 0,
          k = d.length - 2;
        h < k;
        h += 2
      ) {
        var l = d[h],
          m = d[h + 1],
          p = d[h + 2],
          q = d[h + 3],
          r = void 0,
          t = void 0;
        a && ((r = a[h / 2]), (t = a[h / 2 + 1]));
        var v = void 0,
          w = void 0;
        switch (b) {
          case 0:
            v = l >= c;
            w = p >= c;
            break;
          case 1:
            v = l <= c;
            w = p <= c;
            break;
          case 2:
            v = m >= c;
            w = q >= c;
            break;
          case 3:
            (v = m <= c), (w = q <= c);
        }
        !h && v && (e.push(l, m), a && f.push(r));
        if (v != w) {
          v = void 0;
          switch (b) {
            case 0:
            case 1:
              v = (c - l) / (p - l);
              e.push(c, m + v * (q - m));
              break;
            case 2:
            case 3:
              (v = (c - m) / (q - m)), e.push(l + v * (p - l), c);
          }
          a && f.push(r + v * (t - r));
        }
        w && (e.push(p, q), a && f.push(t));
      }
      g &&
        e.length &&
        (e[0] != e[e.length - 2] || e[1] != e[e.length - 1]) &&
        (e.push(e[0], e[1]), a && f.push(a[a.length - 1]));
      return { path: e, g: f };
    },
    xCa = function (a, b) {
      a = hH(a, 0, b.Aa);
      a = hH(a, 1, b.Ia);
      a = hH(a, 2, b.xa);
      return hH(a, 3, b.Ca);
    },
    yCa = function (a, b, c) {
      for (var d = 0, e = 0, f = c.length; e < f; ++e) d += _.yra(a, b, c[e]);
      return !!(d & 1);
    },
    zCa = function (a, b, c, d) {
      for (var e = null, f = c * c, g = 0, h = d.length; g < h; ++g) {
        var k = a,
          l = b,
          m = c,
          p = d[g],
          q = p.length;
        if (!q || 0 >= m) var r = null;
        else {
          var t = 0,
            v = m * m * 1.01,
            w = [0, 0],
            y = p[t++] - k,
            z = p[t++] - l,
            J =
              (y < -m ? 1 : 0) |
              (y > m ? 2 : 0) |
              (z < -m ? 4 : 0) |
              (z > m ? 8 : 0),
            G = y * y + z * z;
          !J && G <= v && ((v = G), (w[0] = y), (w[1] = z));
          for (; t < q; ) {
            var K = y;
            r = z;
            var R = J;
            y = p[t++] - k;
            z = p[t++] - l;
            J =
              (y < -m ? 1 : 0) |
              (y > m ? 2 : 0) |
              (z < -m ? 4 : 0) |
              (z > m ? 8 : 0);
            if (!(R & J)) {
              G = y * y + z * z;
              !J && G <= v && ((v = G), (w[0] = y), (w[1] = z));
              R = y - K;
              var T = z - r,
                aa = R * R + T * T;
              if (!(1e-12 > aa)) {
                var la = y * R + z * T;
                0 > la ||
                  la > aa ||
                  ((G -= (la * la) / aa),
                  G <= v &&
                    ((v = G),
                    (aa = 1 - la / aa),
                    (w[0] = K + R * aa),
                    (w[1] = r + T * aa)));
              }
            }
          }
          w[0] += k;
          w[1] += l;
          w[2] = v;
          r = v <= m * m ? w : null;
        }
        r && r[2] <= f && ((f = r[2]), (e = r));
      }
      return e;
    },
    ACa = function (a) {
      var b = new _.BB(["mousemove", "mouseup", "mousewheel"]);
      _.dt(b, ["panes", "pixelBounds"], a);
      return b;
    },
    iH = function (a) {
      var b = ACa(a);
      _.L.addListener(b, "mousemove", _.sf);
      _.L.addListener(b, "mouseup", _.sf);
      _.L.addListener(b, "mousewheel", function (c) {
        var d = a.get("mouseEventTarget");
        d &&
          _.L.trigger.apply(
            null,
            [d, "mousewheel"].concat(Array.prototype.slice.call(arguments, 0))
          );
      });
      return b;
    },
    CCa = function (a) {
      var b = ["px", "%"];
      if (!a || !_.Ae(b)) return null;
      if ("0" == a) return { value: 0, unit: b[0] };
      for (var c = 0, d = b.length; c < d; ++c) {
        var e = b[c],
          f = (BCa[e] =
            BCa[e] || new RegExp("^(\\d+(?:\\.\\d+)?)" + e + "$")).exec(a);
        if (f) return { value: parseFloat(f[1]), unit: e };
      }
      return null;
    },
    DCa = function (a, b, c) {
      var d = _.el(new _.Vg(c.x, c.y), a);
      a = _.el(new _.Vg(c.x + b, c.y + b), a);
      return Math.min(Math.abs(d.lat() - a.lat()), Math.abs(d.lng() - a.lng()));
    },
    jH = function (a) {
      this.y = this.x = 0;
      this.z = a;
    },
    ECa = function (a) {
      var b = Math.sqrt(kH(a, a));
      1e-12 > b || ((a.x /= b), (a.y /= b), (a.z /= b));
    },
    kH = function (a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    },
    lH = function (a, b, c) {
      c.x = a.y * b.z - a.z * b.y;
      c.y = a.z * b.x - a.x * b.z;
      c.z = a.x * b.y - a.y * b.x;
    },
    mH = function (a, b) {
      var c = _.Qc(a[0]);
      a = _.Qc(a[1]);
      var d = Math.cos(c);
      b.x = Math.cos(a) * d;
      b.y = Math.sin(a) * d;
      b.z = Math.sin(c);
    },
    nH = function (a, b) {
      var c = Math.atan2(a.y, a.x);
      b[0] = _.Rc(Math.atan2(a.z, Math.sqrt(a.x * a.x + a.y * a.y)));
      b[1] = _.Rc(c);
    },
    FCa = function (a, b, c) {
      c.x = a.x + b.x;
      c.y = a.y + b.y;
      c.z = a.z + b.z;
      ECa(c);
    },
    oH = function (a, b, c, d, e, f, g, h) {
      function k() {
        l.m || _.L.trigger(l, "toolbar", { show: !1 });
      }
      var l = this;
      this.L = a;
      this.F = b;
      this.C = c;
      this.j = _.Cm("div", e, _.Ej);
      this.m = d;
      this.K = f;
      this.g = g;
      this.i = h;
      this.h = [];
      a.forEach((0, _.Na)(this.o, this));
      this.G = [
        _.L.addListener(a, "insert_at", function (m) {
          l.o(a.getAt(m), m);
          GCa(l, m + 1);
          k();
        }),
        _.L.addListener(a, "remove_at", function (m) {
          var p = l.h[m];
          l.h.splice(m, 1);
          l.J(p);
          GCa(l, m);
          k();
        }),
        _.L.addListener(a, "set_at", function (m) {
          l.h[m].h.set("latLngPosition", a.getAt(m));
          k();
        }),
      ];
    },
    HCa = function (a, b, c) {
      if ((b = b.h.C) && a.g) {
        a = a.g.__gm.get("projectionController");
        var d = a.fromLatLngToDivPixel(c);
        b = b(d);
        if ((b = a.fromDivPixelToLatLng(b))) return b;
      }
      return c;
    },
    ICa = function (a, b) {
      if (b && a.i) {
        if (2 == a.m) return { clientX: a.i.clientX, clientY: b.clientY };
        if (1 == a.m) return { clientX: b.clientX, clientY: a.i.clientY };
      }
      return b;
    },
    pH = function (a, b, c, d) {
      var e = b.index,
        f = b.h.get("position");
      b =
        (b = b.h.get("latLngPosition")) && a.g
          ? _.Ek(b, a.g.get("projection"))
          : null;
      _.L.trigger(a, c, e, f, b, d);
    },
    GCa = function (a, b) {
      for (; b < a.h.length; ++b) a.h[b].index = b;
    },
    qH = function (a, b, c) {
      this.l = a;
      this.m = b;
      this.j = null;
      this.h = !1;
      this.g = new _.ph();
      this.i = !1;
      this.o = c;
      _.L.bind(this.g, "set_at", this, this.Tx);
    },
    LCa = function (a) {
      var b = a.get("panes");
      if (!b) return null;
      b = new oH(
        a.g,
        JCa,
        KCa,
        !1,
        b.overlayMouseTarget,
        a.m,
        a.get("map"),
        a.o
      );
      b.bindTo("projection", a);
      b.bindTo("zoom", a);
      b.bindTo("projectionCenterQ", a);
      b.bindTo("panningEnabled", a);
      b.bindTo("mapPixelBounds", a);
      b.bindTo("color", a);
      b.bindTo("zIndex", a);
      b.bindTo("offset", a);
      var c = a.l;
      c.bindTo("freeVertexPosition", b);
      var d, e;
      _.L.addListener(b, "dragstart", function (f) {
        d = a.get("center");
        e = a.get("radius");
        c.set("freeVertexIsCenter", 0 == f);
        c.set("map", a.get("map"));
      });
      _.L.addListener(b, "dragend", function (f, g, h) {
        c.set("map", null);
        _.L.trigger(a, "toolbar", {
          show: !0,
          g: h,
          action: function () {
            a.set("center", d);
            a.set("radius", e);
          },
        });
      });
      _.L.forward(b, "dragstart", a);
      _.L.forward(b, "dragend", a);
      _.L.forward(b, "panbynow", a);
      return b;
    },
    MCa = function (a) {
      var b = a.j;
      b &&
        (b.unbindAll(),
        b.release(),
        _.L.clearInstanceListeners(b),
        (a.j = null));
    },
    rH = function () {},
    sH = function () {
      var a = new _.Ai({ clickable: !1, fillOpacity: 0 });
      a.bindTo("map", this);
      a.bindTo("strokeColor", this);
      a.bindTo("strokeOpacity", this);
      a.bindTo("strokeWeight", this);
      var b = ["center", "freeVertexPosition", "freeVertexIsCenter"],
        c = new _.lA(b, "return", NCa);
      _.dt(c, b, this);
      a.bindTo("center", c, "return");
      b = [
        "center",
        "radius",
        "planetRadius",
        "freeVertexPosition",
        "freeVertexIsCenter",
      ];
      c = new _.lA(b, "return", (0, _.Na)(this.h, this));
      _.dt(c, b, this);
      a.bindTo("radius", c, "return");
      this.g = _.CB();
      this.g.bindTo("zIndex", this);
      a.bindTo("zIndex", this.g, "ghostZIndex");
    },
    NCa = function (a, b, c) {
      return (c && b) || a;
    },
    uH = function (a, b, c, d, e, f, g) {
      var h = this;
      a = _.Cm("div", a);
      a.style.display = "none";
      var k = 9 + 2 * (1 + c);
      _.Bh(a, new _.pg(k, k));
      f.construct(a, c, 9, 1, g ? 0.5 : 1);
      f = new _.uA(a, !0);
      f.bindTo("containerPixelBounds", this, "mapPixelBounds");
      f.bindTo("panningEnabled", this);
      f.set("draggableCursor", d);
      f.bindTo("position", this);
      f.bindTo("deltaClientPosition", this);
      this.g = a;
      this.j = b;
      this.o = c;
      this.C = e;
      this.i = f;
      this.h = !1;
      var l;
      this.pa = [
        _.L.addListener(f, "dragstart", function () {
          b.set("draggableCursor", d);
          b.set("active", !0);
        }),
        _.L.addListener(f, "dragend", function () {
          b.set("active", !1);
          l && (_.Xa(l, _.L.removeListener), (l = null));
        }),
        _.L.forward(f, "panbynow", this),
        _.L.forward(f, "dragstart", this),
        _.L.forward(f, "dragend", this),
      ];
      this.l = _.vn(a, {
        Wc: function (m) {
          _.Xm(m);
          _.L.trigger(h, "mousedown", m.Wa);
        },
        Wg: function (m) {
          _.Ym(m);
          _.L.trigger(h, "mousemove", m.Wa);
        },
        Kd: function (m) {
          _.Ym(m);
          _.L.trigger(h, "mousemove", m.Wa);
        },
        gd: function (m) {
          _.Zm(m);
          _.L.trigger(h, "mouseup", m.Wa);
        },
        onClick: function (m) {
          var p = m.event;
          m = m.Dh;
          _.$m(p);
          3 == p.button
            ? m || _.L.trigger(h, "rightclick", p.Wa)
            : m
            ? _.L.trigger(h, "dblclick", p.Wa)
            : _.L.trigger(h, "click", p.Wa);
        },
        Ai: function (m) {
          _.bn(m);
          _.L.trigger(h, "contextmenu", m.Wa);
        },
      });
      this.m = new _.Sm(a, a, {
        Aj: function (m) {
          h.h = !1;
          tH(h);
          _.uf(m);
          _.vf(m);
          _.L.trigger(h, "mouseout", m);
        },
        Bj: function (m) {
          h.h = !0;
          tH(h);
          _.uf(m);
          _.vf(m);
          _.L.trigger(h, "mouseover", m);
        },
      });
    },
    tH = function (a) {
      if (a.h) {
        var b = _.Pra(a.get("color"));
        if (b) {
          b.i = Math.floor((b.i + 255) / 2);
          b.h = Math.floor((b.h + 255) / 2);
          b.g = Math.floor((b.g + 255) / 2);
          var c = ["#", gH(b.i), gH(b.h), gH(b.g)].join("");
        }
      }
      a.g.firstChild.style.backgroundColor = c || "white";
    },
    QCa = function (a, b, c, d) {
      function e() {
        a.get("editable")
          ? OCa(a, b, c, d)
          : (PCa(a), _.L.trigger(a, "toolbar", { show: !1 }));
      }
      a.editable_changed = e;
      e();
    },
    OCa = function (a, b, c, d) {
      if (!a.em) {
        var e = new _.FB(a, !0);
        a.ih = e;
        var f = new sH();
        f.bindTo("strokeColor", e);
        f.bindTo("strokeOpacity", e, "ghostStrokeOpacity");
        f.bindTo("strokeWeight", e);
        f.bindTo("center", a);
        f.bindTo("radius", a);
        f.bindTo("planetRadius", c);
        f.bindTo("zIndex", a);
        a.Np = f;
        var g = b.__gm;
        a.de = iH(g);
        var h = _.cB(g, a),
          k = _.Bq() ? 9 : 0,
          l = new rH();
        d = new qH(
          f,
          function (m, p, q) {
            return new uH(m, a.de, k, p, h, l, q);
          },
          d
        );
        d.set("map", b);
        d.bindTo("center", a);
        d.bindTo("radius", a);
        d.bindTo("planetRadius", c);
        d.bindTo("panes", g);
        d.bindTo("projection", b);
        d.bindTo("zoom", g);
        d.bindTo("projectionCenterQ", g);
        d.bindTo("panningEnabled", b, "draggable");
        d.bindTo("mapPixelBounds", g, "pixelBounds");
        d.bindTo("offset", g);
        d.bindTo("color", e, "strokeColor");
        d.bindTo("zIndex", a);
        a.em = d;
        _.L.forward(d, "panbynow", g);
        _.L.forward(d, "toolbar", a);
      }
    },
    PCa = function (a) {
      var b = a.em;
      b &&
        (b.unbindAll(),
        b.set("map", null),
        _.L.clearInstanceListeners(b),
        delete a.em,
        a.de.unbindAll(),
        a.de.release(),
        delete a.de,
        a.Np.unbindAll(),
        delete a.Np,
        a.ih.release(),
        delete a.ih);
    },
    RCa = function (a, b, c, d, e) {
      this.i = a;
      this.Qa = c;
      a = a.get("center");
      b = c.fromDivPixelToLatLng(b);
      this.l = d(a, b);
      this.h = _.ws(b, a);
      this.j = e;
    },
    SCa = function (a, b, c) {
      var d = 250;
      d = void 0 === d ? 250 : d;
      var e = Array(d),
        f = _.Qc(a.lat()),
        g = _.Qc(a.lng()),
        h = Math.cos(b),
        k = Math.sin(b),
        l = Math.cos(f);
      f = Math.sin(f);
      if (1e-6 < l)
        for (a = 0; a < d; ++a) {
          b = (a / d) * Math.PI * 4;
          b += Math.sin(b + Math.PI);
          var m = b / 2,
            p = f * h + l * k * Math.cos(m);
          b = Math.asin(p);
          m = g + Math.atan2(Math.sin(m) * k * l, h - f * p);
          p = -Math.PI;
          var q = Math.PI - p;
          m = ((((m - p) % q) + q) % q) + p;
          e[a] = c(_.Rc(b), _.Rc(m));
        }
      else
        for (
          g = _.Rc(b), g = 0 < a.lat() ? a.lat() - g : a.lat() + g, h = 0;
          h < d;
          ++h
        )
          e[h] = c(g, (360 * h) / d);
      return e;
    },
    wH = function (a) {
      var b = this,
        c = this,
        d = new _.Ci();
      this.h = d;
      d.ij = a;
      d.Jk = !0;
      d.bindTo("capturing", c);
      d.bindTo("cursor", c);
      d.bindTo("map", c);
      d.bindTo("strokeColor", c);
      d.bindTo("strokeOpacity", c);
      d.bindTo("strokeWeight", c);
      d.bindTo("strokePosition", c);
      d.bindTo("fillColor", c);
      d.bindTo("fillOpacity", c);
      d.bindTo("clickable", c);
      d.bindTo("zIndex", c);
      d.bindTo("suppressUndo", c);
      var e = (this.g = []);
      _.Xa(vH, function (f) {
        e.push(_.L.forward(d, f, c));
      });
      e.push(_.L.forward(c, "toolbar", d));
      this.Ga = new _.Rh(function () {
        var f = b.h;
        if (f) {
          var g = b.get("radius"),
            h = b.get("center");
          _.Je(g) && h
            ? ((g /= b.get("planetRadius")), f.setPaths(TCa(h, g)))
            : f.setPaths([]);
        }
      }, 0);
    },
    TCa = function (a, b) {
      var c = [
        SCa(a, b, function (d, e) {
          return new _.bf(d, e);
        }),
      ];
      _.Qc(a.lat()) - b < -Math.PI / 2 &&
        ((a = [
          new _.bf(-90, -200, !0),
          new _.bf(90, -200, !0),
          new _.bf(90, -100, !0),
          new _.bf(90, 0, !0),
          new _.bf(90, 100, !0),
          new _.bf(90, 200, !0),
          new _.bf(-90, 200, !0),
          new _.bf(-90, 100, !0),
          new _.bf(-90, 0, !0),
          new _.bf(-90, -100, !0),
          new _.bf(-90, -200, !0),
        ]),
        c.push(a));
      return c;
    },
    xH = function (a, b) {
      function c() {
        var e = a.get("gestureHandling");
        null != e
          ? b.set("panningEnabled", "none" != e)
          : b.set("panningEnabled", a.get("draggable"));
      }
      var d = a.__gm;
      _.L.addListener(a, "gesturehandling_changed", c);
      _.L.addListener(a, "draggable_changed", c);
      b.bindTo("panes", d);
      b.bindTo("projectionController", d);
      b.bindTo("containerPixelBounds", d, "pixelBounds");
      d.T = _.L.forward(b, "panbynow", d);
    },
    yH = function (a, b) {
      function c() {
        var d = a.getMap();
        a.getDraggable() && (_.O(d, "Od"), _.cl("Od", "-p", a));
      }
      a.draggable_changed = c;
      c();
      a.xp = [
        _.L.addListener(a, "mouseover", function (d) {
          null == d.vertex && null == d.edge && b.set("poly", a);
        }),
        _.L.addListener(a, "click", function (d) {
          null == d.vertex &&
            null == d.edge &&
            a.getDraggable() &&
            _.cl("Od", "-i", a);
        }),
        _.L.addListener(a, "mouseout", function (d) {
          null != d.vertex ||
            null != d.edge ||
            (d.domEvent && _.uk(d.domEvent)) ||
            b.set("poly", null);
        }),
      ];
    },
    zH = function (a) {
      _.Xa(a.xp || [], _.L.removeListener);
      delete a.draggable_changed;
      delete a.xp;
      _.dl("Od", "-p", a);
    },
    AH = function (a, b, c) {
      var d = this;
      this.g = null;
      this.F = a;
      this.j = b;
      this.h = new _.Bs(
        c.Md,
        {
          Rh: function (e) {
            e && d.set("position", new _.N(e.ia, e.ja));
          },
          Hi: function () {},
        },
        null,
        c
      );
      c.Za(this.h);
      this.pa = this.Qa = this.C = this.l = null;
      this.o = !1;
      this.i = new _.pA(function (e, f) {
        _.L.trigger(d, "panbynow", e, f);
      });
      a = new _.lA(["waitingForQuiver", "dragging"], "active", function (e, f) {
        return e || f;
      });
      a.bindTo("dragging", this, null, !0);
      a.bindTo("waitingForQuiver", this, null, !0);
      this.bindTo("active", a, null, !0);
    },
    BH = function (a, b, c) {
      var d = a.get("position");
      d = a.Qa.fromDivPixelToLatLng(d);
      c = new _.Tm(d, c.domEvent);
      a.g && _.L.trigger(a.g, b, c);
    },
    WCa = function (a) {
      var b = this;
      this.h = a;
      this.g = a.__gm;
      this.i = this.j = null;
      this.g.h.then(function (c) {
        c = c.cc;
        b.i = c;
        UCa(b, c);
      });
      this.g.m.g = function (c) {
        return VCa(b, c);
      };
      this.g.m.onRemove = function (c) {
        if (b.i) {
          var d = c.Eo;
          d.unbindAll();
          d.set("map", null);
          d.release();
          delete c.Eo;
          c.listeners && _.Xa(c.listeners, _.L.removeListener);
          delete c.listeners;
          zH(c);
          delete c.editable_changed;
          PCa(c);
          _.dl("Oc", "-p", c);
        }
      };
    },
    UCa = function (a, b) {
      var c, d;
      _.Aa(function (e) {
        if (1 == e.g) return _.Xj(e, _.qf("geometry"), 2);
        c = e.h;
        d = function (f, g, h) {
          return new RCa(f, g, h, c.computeHeading, c.computeOffsetOrigin);
        };
        a.j = new AH(d, a.h, b);
        xH(a.h, a.j);
        a.g.m.forEach(function (f) {
          return VCa(a, f);
        });
        e.g = 0;
      });
    },
    VCa = function (a, b) {
      if (a.j && a.i) {
        var c = new _.lA(["baseMapType"], "planetRadius", _.wda);
        c.bindTo("baseMapType", a.g);
        var d = (b.Eo = new wH(b));
        d.set("map", a.h);
        d.bindTo("radius", b);
        d.bindTo("center", b);
        d.bindTo("capturing", b);
        d.bindTo("clickable", b);
        d.bindTo("cursor", b);
        d.bindTo("fillColor", b);
        d.bindTo("fillOpacity", b);
        d.bindTo("strokeColor", b);
        d.bindTo("strokeOpacity", b);
        d.bindTo("strokeWeight", b);
        d.bindTo("strokePosition", b);
        d.bindTo("zIndex", b);
        d.bindTo("suppressUndo", b);
        d.bindTo("planetRadius", c);
        b.listeners = [];
        _.Xa(vH, function (e) {
          b.listeners.push(_.L.forward(d, e, b));
        });
        b.listeners.push(_.L.forward(b, "toolbar", d));
        yH(b, a.j);
        QCa(b, a.h, c, a.i);
        _.O(a.h, "Oc");
        _.cl("Oc", "-p", b);
        b.listeners.push(
          _.L.addListener(b, "click", function () {
            _.cl("Oc", "-i", b);
          })
        );
      }
    },
    YCa = function (a, b, c, d, e, f) {
      this.h = a;
      this.Qa = c;
      this.o = e;
      this.m = f;
      var g = XCa(this);
      b = c.fromDivPixelToLatLng(b);
      this.C = _.ws(g, b);
      this.F = d(g, b);
      var h = (this.l = []);
      a.get("latLngs").forEach(function (k) {
        var l = [];
        k.forEach(function (m) {
          l.push({ heading: d(g, m), distance: _.ws(m, g) });
        });
        h.push(l);
      });
      this.i = g;
      this.j = b.lng() - g.lng();
    },
    XCa = function (a) {
      a = a.h.get("latLngs");
      var b = new jH(0),
        c = new jH(0);
      a.forEach(function (d) {
        d.forEach(function (e) {
          mH([e.lat(), e.lng()], c);
          b.x += c.x;
          b.y += c.y;
          b.z += c.z;
        });
      });
      ECa(b);
      a = [0, 0];
      nH(b, a);
      a[0] = _.De(a[0], -89, 89);
      return new _.bf(a[0], a[1]);
    },
    CH = function () {},
    ZCa = function (a, b, c, d) {
      a.capturing_changed = function () {
        if (a.get("capturing"))
          if (0 == a.get("clickable")) {
            var e = (a.g = new CH());
            e.bindTo("draggableCursor", a, "cursor");
            e.set("active", !0);
            b.bindTo("cursor", e);
            d.register(e);
          } else (d.g = c), (d.j = a);
        else
          a.g
            ? (_.vs(d.i, a.g),
              a.g.unbindAll(),
              b.unbind("cursor"),
              b.set("cursor", ""),
              delete a.g)
            : d.g == c && d.j == a && ((d.g = null), (d.j = null));
      };
    },
    EH = function (a, b, c) {
      var d = this,
        e = this;
      this.o = a;
      this.j = b;
      this.l = c;
      this.h = {};
      this.g = {};
      this.i = 0;
      this.m = function (f) {
        $Ca(e, this, f);
      };
      a.g = function (f) {
        var g = d.get("projection");
        g = f.h = { style: aDa(d.l, f), geometry: bDa(f, g) };
        cDa(d, f);
        f.changed = d.m;
        _.ch(d.j, g);
      };
      a.onRemove = function (f) {
        var g = f.h;
        delete f.h;
        d.j.remove(g);
        delete f.changed;
        DH(f);
        f = _.zf(f);
        delete d.h[f];
        delete d.g[f];
      };
    },
    $Ca = function (a, b, c) {
      var d = _.zf(b);
      c in dDa && ((a.g[d] = b), DH(b));
      c in eDa && (a.h[d] = b);
      fDa(a);
    },
    fDa = function (a) {
      a.i ||
        (a.i = _.Yk(function () {
          a.i = 0;
          var b = a.h;
          a.h = {};
          var c = a.g;
          a.g = {};
          for (var d in b) {
            var e = b[d],
              f = e.h;
            f.style = aDa(a.l, e);
            f.Zm && !c[d] && f.Zm();
          }
          b = a.j;
          d = a.get("projection");
          for (var g in c)
            (e = c[g]),
              (f = e.h),
              b.remove(f),
              (f.geometry = bDa(e, d)),
              _.ch(b, f),
              cDa(a, e);
        }));
    },
    cDa = function (a, b) {
      function c() {
        $Ca(e, b, "latLngs");
      }
      var d = b.get("latLngs");
      if (d) {
        var e = a,
          f = _.zf(b);
        a = d.getArray();
        for (var g = 0, h = a.length; g < h; ++g) {
          var k = a[g];
          gDa(k);
          k.g.ce[f] = k.i.ce[f] = k.h.ce[f] = c;
        }
        gDa(d);
        d.i.ce[f] = d.h.ce[f] = function (l, m) {
          FH(m, f);
          c();
        };
        d.g.ce[f] = c;
      }
    },
    DH = function (a) {
      var b = a.get("latLngs");
      if (b) {
        a = _.zf(a);
        FH(b, a);
        b = b.getArray();
        for (var c = 0, d = b.length; c < d; ++c) FH(b[c], a);
      }
    },
    gDa = function (a) {
      a.g ||
        ((a.g = function (b) {
          _.Be(a.g.ce, function (c, d) {
            d(b);
          });
        }),
        (a.g.ce = {}));
      a.i ||
        ((a.i = function (b, c) {
          _.Be(a.i.ce, function (d, e) {
            e(b, c);
          });
        }),
        (a.i.ce = {}));
      a.h ||
        ((a.h = function (b, c) {
          _.Be(a.h.ce, function (d, e) {
            e(b, c);
          });
        }),
        (a.h.ce = {}));
    },
    FH = function (a, b) {
      a.g && delete a.g.ce[b];
      a.i && delete a.i.ce[b];
      a.h && delete a.h.ce[b];
    },
    GH = function (a) {
      var b = this;
      this.g = a;
      _.L.addListener(a, "set_at", function (c) {
        _.L.trigger(b, "set_at", c);
        var d = a.getLength();
        0 == c && 1 < d && _.L.trigger(b, "set_at", d);
      });
      _.L.addListener(a, "insert_at", function (c) {
        _.L.trigger(b, "insert_at", c);
        var d = a.getLength();
        2 == d
          ? _.L.trigger(b, "insert_at", 2)
          : 0 == c && 1 < d && _.L.trigger(b, "set_at", d);
      });
      _.L.addListener(a, "remove_at", function (c) {
        _.L.trigger(b, "remove_at", c);
        var d = a.getLength();
        1 == d
          ? _.L.trigger(b, "remove_at", 1)
          : 0 == c && 1 < d && _.L.trigger(b, "set_at", d);
      });
    },
    HH = function (a, b, c) {
      this.h = a;
      this.i = b;
      this.g = c;
      this.pa = [
        _.L.bind(a, "set_at", this, this.qw),
        _.L.bind(a, "insert_at", this, this.eq),
        _.L.bind(a, "remove_at", this, this.mw),
      ];
      b = 0;
      for (a = a.getLength(); b < a; ++b) this.eq(b);
    },
    hDa = function (a, b, c) {
      var d = a.get("projection");
      if (d) {
        var e = a.h,
          f = e.getAt(c),
          g = a.i,
          h = a.get("geodesic");
        0 < c && g.setAt(c - 1, IH(e.getAt(c - 1), f, h, d, a.g));
        c < e.getLength() - 1 &&
          ((a = IH(f, e.getAt(c + 1), h, d, a.g)),
          b ? g.insertAt(c, a) : g.setAt(c, a));
      }
    },
    IH = function (a, b, c, d, e) {
      c
        ? (d = e(a, b, 0.5))
        : (180 < Math.abs(a.lng() - b.lng()) &&
            (a = new _.bf(
              a.lat(),
              _.Ee(a.lng(), b.lng() - 180, b.lng() + 180),
              !0
            )),
          (a = d.fromLatLngToPoint(a)),
          (b = d.fromLatLngToPoint(b)),
          (d = d.fromPointToLatLng(new _.N((a.x + b.x) / 2, (a.y + b.y) / 2))));
      return d;
    },
    JH = function (a, b, c, d, e) {
      _.Tm.call(this, a, b);
      void 0 !== c && (this.path = c);
      void 0 !== d && (this.vertex = d);
      void 0 !== e && (this.edge = e);
    },
    KH = function (a, b, c, d, e) {
      this.l = a;
      this.j = b;
      this.C = c;
      this.o = d;
      this.h = [];
      this.g = [];
      this.m = [];
      this.F = e;
    },
    LH = function (a, b, c) {
      var d = iDa(a, b, c, !1),
        e = a.l,
        f;
      _.L.addListener(d, "dragstart", function (g) {
        f = b.getAt(g);
        var h = b.getArray(),
          k = a.j,
          l = h.length;
        if (2 > l) e.set("anchors", []);
        else {
          var m = h[k && 0 == g ? l - 1 : g - 1];
          g = h[k && g == l - 1 ? 0 : g + 1];
          h = [];
          m && h.push(m);
          g && h.push(g);
          e.set("anchors", h);
        }
        e.bindTo("freeVertexPosition", d);
        e.set("map", a.get("map"));
      });
      _.L.addListener(d, "dragend", function (g, h, k) {
        e.set("map", null);
        _.L.trigger(a, "toolbar", {
          show: !0,
          g: k,
          action: function () {
            b.setAt(g, f);
          },
        });
      });
      return d;
    },
    MH = function (a, b, c) {
      var d = new _.ph(),
        e = a.j ? new GH(b) : b,
        f = new HH(e, d, a.o);
      f.bindTo("geodesic", a);
      f.bindTo("projection", a);
      var g = iDa(a, d, c, !0);
      g.l = f;
      var h = a.l;
      _.L.addListener(g, "dragstart", function (k) {
        k = [e.getAt(k), e.getAt(k + 1)];
        h.set("anchors", k);
        h.bindTo("freeVertexPosition", g);
        h.set("map", a.get("map"));
      });
      _.L.addListener(g, "dragend", function (k, l, m) {
        b.insertAt(k + 1, d.getAt(k));
        h.set("map", null);
        _.L.trigger(a, "toolbar", {
          show: !0,
          g: m,
          action: function () {
            b.removeAt(k + 1);
          },
        });
      });
      return g;
    },
    iDa = function (a, b, c, d) {
      var e = new oH(b, ["pointer"], [0], d, c, a.C, a.get("map"), a.F);
      e.bindTo("projection", a);
      e.bindTo("zoom", a);
      e.bindTo("projectionCenterQ", a);
      e.bindTo("panningEnabled", a);
      e.bindTo("mapPixelBounds", a);
      e.bindTo("color", a);
      e.bindTo("zIndex", a);
      e.bindTo("offset", a);
      _.L.forward(e, "dragstart", a);
      _.L.forward(e, "dragend", a);
      _.L.forward(e, "panbynow", a);
      _.L.forward(e, "toolbar", a);
      _.Xa(vH, function (f) {
        _.L.addListener(e, f, function (g, h, k, l) {
          h = _.L;
          k = h.trigger;
          var m = b.getAt(g);
          if (a.j)
            for (var p = d ? a.g : a.h, q = 0; q < p.length; ++q)
              if (p[q] == e) {
                var r = q;
                break;
              }
          k.call(h, a, f, new JH(m, l, r, d ? void 0 : g, d ? g : void 0));
        });
      });
      return e;
    },
    jDa = function (a) {
      var b = (0, _.Na)(a.i, a);
      _.Xa(a.h, b);
      _.Xa(a.g, b);
      a.h.length = 0;
      a.g.length = 0;
      _.Xa(a.m, _.L.removeListener);
      a.m.length = 0;
    },
    mDa = function (a, b, c, d, e) {
      function f() {
        a.get("editable")
          ? (kDa(a, b, d, e), _.O(b, "Oe"), _.cl("Oe", "-p", a))
          : (_.L.trigger(c, "toolbar", { show: !1, poly: a }), lDa(a));
      }
      a.editable_changed = f;
      f();
      a.Jn = _.L.addListener(a, "toolbar", function (g) {
        g.poly = a;
        _.L.trigger(c, "toolbar", g);
      });
    },
    kDa = function (a, b, c, d) {
      if (!a.i) {
        var e = new _.FB(a, a.Gd);
        a.ih = e;
        var f = new _.GB();
        f.bindTo("strokeColor", e);
        f.bindTo("strokeOpacity", e, "ghostStrokeOpacity");
        f.bindTo("strokeWeight", e);
        f.bindTo("geodesic", a);
        f.bindTo("zIndex", a);
        a.kf = f;
        var g = b.__gm;
        a.de = iH(g);
        var h = _.cB(g, a),
          k = _.Bq() ? 9 : 0,
          l = new rH(),
          m = new KH(
            f,
            a.Gd,
            function (p, q, r) {
              return new uH(p, a.de, k, q, h, l, r);
            },
            c,
            d
          );
        m.set("map", b);
        m.bindTo("paths", a, "latLngs");
        m.bindTo("panes", g);
        m.bindTo("projection", b);
        m.bindTo("zoom", g);
        m.bindTo("projectionCenterQ", g);
        m.bindTo("panningEnabled", b, "draggable");
        m.bindTo("mapPixelBounds", g, "pixelBounds");
        m.bindTo("offset", g);
        m.bindTo("color", e, "strokeColor");
        m.bindTo("zIndex", a);
        m.bindTo("geodesic", a);
        m.bindTo("suppressGhostControlPoints", a);
        a.i = m;
        _.L.addListener(a, "click", function () {
          a.get("editable") && _.cl("Oe", "-i", a);
        });
        _.L.forward(m, "panbynow", g);
        _.L.forward(m, "toolbar", a);
        _.Xa(vH, function (p) {
          _.L.forward(m, p, a);
        });
      }
    },
    lDa = function (a) {
      var b = a.i;
      b &&
        (b.unbindAll(),
        b.set("map", null),
        _.L.clearInstanceListeners(b),
        delete a.i,
        a.de.unbindAll(),
        a.de.release(),
        delete a.de,
        a.kf.unbindAll(),
        delete a.kf,
        a.ih.release(),
        delete a.ih);
    },
    NH = function (a) {
      var b = (this.g = _.Cm("div"));
      _.Hm(b, -202);
      _.wt(b, "pointer");
      _.lt(b);
      this.h = _.gA(nDa, b, _.Ej, oDa);
      _.L.bind(this, "toolbar", this, this.Tr);
      var c = this;
      this.j = new _.Bs(
        a.Md,
        {
          Rh: function (d) {
            d &&
              ((d = new _.N(d.ia, d.ja)),
              _.Bm(c.g, new _.N(d.x + pDa.x, d.y + pDa.y)));
          },
          Hi: function () {},
        },
        null,
        a
      );
      a.Za(this.j);
      _.vn(b, {
        Wc: function (d) {
          _.Xm(d);
          c.ol(qDa);
        },
        Wg: function (d) {
          _.Ym(d);
        },
        Kd: function (d) {
          _.Ym(d);
        },
        gd: function (d) {
          _.Zm(d);
        },
        onClick: function (d) {
          d = d.event;
          _.$m(d);
          d = d.Wa;
          _.uf(d);
          _.vf(d);
          c.l();
          c.Zh();
        },
        uh: {
          Vg: function (d, e) {
            _.bla(e);
          },
          Bi: function () {},
          Jh: function () {},
        },
      });
      new _.Sm(b, b, {
        Aj: (0, _.Na)(this.ol, this, _.Ej),
        Bj: (0, _.Na)(this.ol, this, rDa),
      });
    },
    sDa = function (a) {
      a.i && _.L.clearListeners(a.i, "suppressundo_changed");
    },
    tDa = function (a, b, c) {
      a.ol(_.Ej);
      a.l = b;
      sDa(a);
      a.i = c;
      _.mt(a.g);
      _.L.addListener(c, "suppressundo_changed", function () {
        c.get("suppressUndo") && a.Zh();
      });
    },
    OH = function (a, b, c, d, e) {
      this.l = b;
      this.C = c;
      this.o = new _.mB(a.ad(), d, e);
      this.m = e;
      this.g = null;
      this.j = !1;
    },
    uDa = function (a) {
      return _.Ge(a, function (b) {
        return _.Ge(b, function (c) {
          return Math.round(c);
        });
      });
    },
    xDa = function (a, b, c) {
      function d() {
        g[q++] = t.latLng[0];
        g[q++] = t.latLng[1];
        f && (h[m++] = t.distance);
        k = t;
      }
      var e = a.path,
        f = a.g;
      if (!e.length) return a;
      var g = Array(e.length),
        h = f ? Array(f.length) : null;
      a = [];
      var k = PH();
      g[0] = k.latLng[0] = e[0];
      g[1] = k.latLng[1] = e[1];
      f && (h[0] = k.distance = f[0]);
      k.depth = 0;
      mH(k.latLng, k.Gi);
      for (var l = 1, m = 1, p = [], q = 2, r = 2; r < e.length || p.length; ) {
        if (p.length) var t = p.pop();
        else
          (t = PH()),
            (t.depth = 0),
            (t.latLng[0] = e[r++]),
            (t.latLng[1] = e[r++]),
            f && (t.distance = f[l++]),
            mH(t.latLng, t.Gi);
        if (12 <= Math.max(k.depth, t.depth)) d();
        else {
          var v = new _.xh();
          v.Aa = Math.min(k.latLng[0], t.latLng[0]);
          v.Ia = Math.max(k.latLng[0], t.latLng[0]);
          v.xa = Math.min(k.latLng[1], t.latLng[1]);
          v.Ca = Math.max(k.latLng[1], t.latLng[1]);
          if (_.et(b, v)) {
            var w = PH();
            FCa(k.Gi, t.Gi, w.Gi);
            nH(w.Gi, w.latLng);
            w.depth = Math.max(k.depth, t.depth) + 1;
            f && (w.distance = (k.distance + t.distance) / 2);
            var y = void 0,
              z = v.xa - 1e-6;
            v = v.Ca + 1e-6;
            y = w.latLng;
            y[1] = vDa(z, v, y[1]);
            wDa(k.latLng, t.latLng, a);
            Math.max(
              Math.abs(w.latLng[0] - a[0]),
              Math.abs(w.latLng[1] - a[1])
            ) <= c
              ? d()
              : (p.push(t), p.push(w));
          } else d();
        }
      }
      return { path: g, g: h };
    },
    wDa = function (a, b, c) {
      c[0] = (a[0] + b[0]) / 2;
      c[1] = (a[1] + b[1]) / 2;
    },
    vDa = function (a, b, c) {
      for (; c < a; ) c += 360;
      for (; c > b; ) c -= 360;
      return c;
    },
    PH = function () {
      return { latLng: [0, 0], Gi: new jH(0) };
    },
    yDa = function (a) {
      return function (b, c) {
        if ("px" == b.unit) b = b.value / a;
        else {
          var d = _.Ae(c);
          b = d ? (b.value / 100) * c[d - 1] : 0;
        }
        return b;
      };
    },
    zDa = function (a, b, c, d) {
      --b;
      if (!(0 > b)) {
        var e = a.length,
          f = 0;
        for (d(0); f < b; ) {
          var g = 1 << e,
            h = e ? a[e - 1][f / g] : 0,
            k = f + g;
          k >= b && (k = b);
          e && c(f, k, h) ? --e : (d(k), (f = k), f & g || ++e);
        }
      }
    },
    ADa = function (a, b) {
      return function (c, d) {
        if (0 == c) return !0;
        c = a[c];
        d = a[d];
        for (var e = 0, f; (f = b[e]); ++e) {
          var g = f.offset;
          if ((f = _.u(f, "repeat"))) {
            if (Math.floor((c - g) / f) != Math.floor((d - g) / f)) return !0;
          } else if (c < g && g <= d) return !0;
        }
        return !1;
      };
    },
    BDa = function (a, b, c, d) {
      var e = a.Aa,
        f = a.xa,
        g = a.Ia,
        h = a.Ca;
      return function (k, l, m) {
        var p = d[2 * k],
          q = d[2 * k + 1];
        k = d[2 * l];
        l = d[2 * l + 1];
        var r = Math.min(q, l) - m,
          t = Math.max(p, k) + m,
          v = Math.max(q, l) + m;
        Math.min(p, k) - m <= g && e <= t && r <= h && f <= v
          ? m > b
            ? (m = !0)
            : ((r = c.fromLatLngToPoint(new _.bf(p, q, !0))),
              (t = c.fromLatLngToPoint(new _.bf(k, l, !0))),
              (r = c.fromPointToLatLng(
                new _.N((r.x + t.x) / 2, (r.y + t.y) / 2),
                !0
              )),
              (q = (q + l) / 2),
              (p = (p + k) / 2 - r.lat()),
              (k = q - r.lng()),
              (m = Math.sqrt(p * p + k * k) + m > b))
          : (m = !1);
        return m;
      };
    },
    CDa = function (a, b, c) {
      return function (d, e, f) {
        var g = d.path,
          h = d.g,
          k = BDa(a, b, c, g);
        d = k;
        if (h) {
          var l = ADa(h, f);
          d = function (q, r, t) {
            return k(q, r, t) || l(q, r);
          };
        }
        var m = [],
          p = h ? [] : null;
        zDa(e, g.length / 2, d, function (q) {
          m.push(g[2 * q], g[2 * q + 1]);
          h && p.push(h[q]);
        });
        return { path: m, g: p };
      };
    },
    EDa = function (a, b, c, d) {
      var e = a.g;
      if (!e) return null;
      a = a.path;
      for (var f = [], g = 0, h = a.length - 2; g < h; ) {
        var k = a[g],
          l = a[g + 1],
          m = e[g / 2],
          p = m - b;
        g += 2;
        var q = a[g],
          r = a[g + 1];
        if (!(DDa(k, l, d) & DDa(q, r, d))) {
          for (; _.Fe(k, q) && _.Fe(l, r) && g < h; )
            (g += 2), (q = a[g]), (r = a[g + 1]);
          var t = e[g / 2] - b,
            v = Math.atan2(q - k, l - r);
          0 == m && (p -= 1e-9);
          if (c)
            for (m = Math.floor(t / c) * c; m > p; ) {
              var w = (m - p) / (t - p);
              f.push(k + (q - k) * w, l + (r - l) * w, v);
              m -= c;
            }
          else
            0 > p &&
              0 <= t &&
              ((p = (0 - p) / (t - p)),
              f.push(k + (q - k) * p, l + (r - l) * p, v));
        }
      }
      return f;
    },
    DDa = function (a, b, c) {
      var d = 0;
      _.Fe(a, -16, 0.001) && (d |= 1);
      _.Fe(a, c.ia + 16, 0.001) && (d |= 2);
      _.Fe(b, -16, 0.001) && (d |= 4);
      _.Fe(b, c.ja + 16, 0.001) && (d |= 8);
      return d;
    },
    FDa = function (a, b, c, d) {
      this.g = d;
      this.C = b;
      var e = (this.F = 1 << b);
      b = _.Fs(this.g, { ra: a.x, ta: a.y, Ba: b }, 16 / d.size.ia);
      b = _.yh(b.min.g, b.min.h, b.max.g, b.max.h);
      this.o = c;
      var f = b;
      d = new _.Vg(f.Aa, f.xa);
      f = new _.Vg(f.Ia, f.Ca);
      b = _.el(d, c, !0);
      var g = _.el(f, c, !0);
      f = Math.min(b.lat(), g.lat());
      d = Math.max(b.lat(), g.lat());
      var h = Math.min(b.lng(), g.lng());
      g = Math.max(b.lng(), g.lng());
      b = (h + g) / 2;
      var k = _.Ee(b, -180, 180);
      h += k - b;
      g += k - b;
      b = _.yh(f, h, d, g);
      f = new _.bf(f, h, !0);
      h = new _.bf(d, g, !0);
      d = _.Ek(f, c);
      d = new _.N(d.g, d.h);
      f = _.Ek(h, c);
      f = new _.xh([d, new _.N(f.g, f.h)]);
      this.h = b;
      this.j = f;
      this.l = a;
      a = 0.5 / e;
      b = this.j;
      this.m = Math.min(
        DCa(c, a, new _.N(b.Aa, b.xa)),
        DCa(c, a, new _.N(b.Ia, b.Ca))
      );
      this.G = CDa(this.h, this.m, c);
      this.i = yDa(e);
    },
    HDa = function (a, b, c, d) {
      for (var e = [], f = [], g = 0, h = d.length; g < h; ++g) f.push([]);
      g = 0;
      for (h = b.length; g < h; ++g) {
        var k = b[g],
          l = k.h,
          m = GDa(a, d, l.g);
        k.g ? (l = a.G(l, k.g, m)) : (l = { path: _.db(l.path, 0), g: l.g });
        if (l.path.length) {
          c && (l = xDa(l, a.h, a.m));
          wCa(l.path, a.o);
          l = xCa(l, a.j);
          var p = l.path;
          k = a.g.size;
          if (p.length) {
            e.push(p);
            for (var q = 0; q < p.length; q += 2) {
              var r = _.wn(a.g, new _.Vg(p[q], p[q + 1]), a.C, function (t) {
                return t;
              });
              p[q] = (r.ra - a.l.x) * k.ia;
              p[q + 1] = (r.ta - a.l.y) * k.ja;
            }
            p = 0;
            for (q = void 0; (q = m[p]); ++p)
              (q = EDa(l, q.offset, _.u(q, "repeat"), k)) &&
                (f[p] = f[p].concat(q));
          }
        }
      }
      return { paths: e, xl: f };
    },
    GDa = function (a, b, c) {
      var d = [];
      if (c)
        for (var e = 0, f; (f = b[e]); ++e)
          d.push({
            offset: a.i(f.offset, c),
            repeat: a.i(_.u(f, "repeat"), c),
          });
      return d;
    },
    QH = function (a, b, c) {
      this.i = Math.min(2, _.Nm());
      this.l = b;
      this.h = a;
      this.g = c || _.Kn;
    },
    IDa = function (a, b, c, d, e) {
      this.h = c.size;
      this.F = d;
      this.C = a;
      this.o = e;
      this.m = b;
      this.i = this.g = null;
      this.j = {};
      this.l = 0;
    },
    LDa = function (a, b, c) {
      var d = JDa(a, b, c);
      a = KDa(d, c);
      return {
        canvas: d,
        context: a,
        rr: new _.lB(a),
        release: function () {
          d.width = d.height = 0;
        },
      };
    },
    JDa = function (a, b, c) {
      a = a.createElement("canvas");
      a.width = b.ia * c;
      a.height = b.ja * c;
      a.style.width = _.Zk(b.ia);
      a.style.height = _.Zk(b.ja);
      _.Km(a);
      return a;
    },
    KDa = function (a, b) {
      a = a.context = a.getContext("2d");
      if (!a) return null;
      a.scale(b, b);
      a.lineCap = a.lineJoin = "round";
      return a;
    },
    RH = function (a) {
      a.l ||
        (a.l = _.Yk(function () {
          a.l = 0;
          var b = MDa(a);
          if (b.length) {
            a.g || ((a.g = LDa(a.C, a.h, a.o)), _.Bm(a.g.canvas, _.Ej));
            var c = a.g.context;
            a: {
              var d = _.A(b);
              for (var e = d.next(); !e.done; e = d.next())
                if ((e = e.value.Jc) && e.Xg) {
                  d = e.Xg;
                  break a;
                }
              d = null;
            }
            if (c) {
              a.g.canvas.parentNode || a.m.appendChild(a.g.canvas);
              c.clearRect(0, 0, a.h.ia, a.h.ja);
              for (e = 0; e < b.length; ++e) {
                var f = b[e],
                  g = f.g,
                  h = g.h;
                if (_.Fe(1, h))
                  a.F(
                    c,
                    f.paths,
                    g.strokeColor,
                    g.strokeOpacity,
                    g.strokeWeight,
                    g.strokePosition,
                    g.fillColor,
                    g.fillOpacity
                  ),
                    NDa(f.xl, g.g, c, a.g.rr, 1);
                else {
                  a.i || (a.i = LDa(a.C, a.h, a.o));
                  var k = a.i.context;
                  k &&
                    (k.clearRect(0, 0, a.h.ia, a.h.ja),
                    a.F(
                      k,
                      f.paths,
                      g.strokeColor,
                      g.strokeOpacity / h,
                      g.strokeWeight,
                      g.strokePosition
                    ),
                    NDa(f.xl, g.g, k, a.i.rr, h),
                    (c.globalAlpha = h),
                    c.drawImage(a.i.canvas, 0, 0, a.h.ia, a.h.ja));
                }
              }
              d && d();
            } else d && d();
          } else a.g && a.g.canvas.parentNode && a.m.removeChild(a.g.canvas), ODa(a);
        }));
    },
    NDa = function (a, b, c, d, e) {
      for (var f = 0, g = a.length; f < g; ++f) {
        var h = b[f],
          k = c,
          l = d,
          m = a[f],
          p = h.an,
          q = h.scale,
          r = h.rotation,
          t = h.Lw,
          v = h.strokeColor,
          w = h.strokeOpacity / e,
          y = h.strokeWeight,
          z = h.fillColor;
        h = h.fillOpacity / e;
        k.beginPath();
        for (var J = 0, G = m.length; J < G; J += 3)
          l.Bc(p, m[J], m[J + 1], r + (t ? m[J + 2] : 0), q);
        h && ((k.fillStyle = z), (k.globalAlpha = h), _.u(k, "fill").call(k));
        y &&
          ((k.lineWidth = y),
          (k.strokeStyle = v),
          (k.globalAlpha = w),
          k.stroke());
      }
    },
    MDa = function (a) {
      var b = [];
      a = a.j;
      for (var c in a) b.push(a[c]);
      b.sort(function (d, e) {
        return d.zIndex - e.zIndex;
      });
      return b;
    },
    ODa = function (a) {
      a.g && (a.g.release(), (a.g = null));
      a.i && (a.i.release(), (a.i = null));
    },
    PDa = function (a, b, c) {
      function d(k, l) {
        k.beginPath();
        for (var m = 0, p; (p = l[m]); ++m)
          if (p.length) {
            k.moveTo(Math.round(p[0]), Math.round(p[1]));
            for (var q = 2, r = p.length; q < r; )
              k.lineTo(Math.round(p[q++]), Math.round(p[q++]));
          }
      }
      var e = c.size,
        f = a.createElement("canvas");
      f.width = b * e.ia;
      f.height = b * e.ja;
      var g = f.getContext("2d");
      g.lineCap = g.lineJoin = "round";
      g.scale(b, b);
      var h = [
        function (k, l, m, p, q) {
          k.lineWidth = q;
          k.strokeStyle = m;
          k.globalAlpha = p;
          k.stroke();
        },
        function (k, l, m, p, q) {
          k.lineWidth = 2 * q;
          k.strokeStyle = m;
          k.globalAlpha = p;
          k.save();
          k.clip();
          k.stroke();
          k.restore();
        },
        function (k, l, m, p, q) {
          g.lineWidth = 2 * q;
          g.strokeStyle = m;
          g.globalCompositeOperation = "source-over";
          g.clearRect(0, 0, e.ia, e.ja);
          d(g, l);
          g.stroke();
          g.globalCompositeOperation = "destination-out";
          _.u(g, "fill").call(g);
          k.globalAlpha = p;
          k.drawImage(f, 0, 0, e.ia, e.ja);
        },
      ];
      return function (k, l, m, p, q, r, t, v) {
        d(k, l);
        v && ((k.fillStyle = t), (k.globalAlpha = v), _.u(k, "fill").call(k));
        if (q) h[r](k, l, m, p, q);
      };
    },
    QDa = function (a, b) {
      this.i = a;
      this.h = b;
      this.g = null;
    },
    TDa = function (a, b, c, d) {
      var e = this;
      this.h = b;
      this.g = d;
      a.g = function (h) {
        return RDa(e, h);
      };
      a.onRemove = function (h) {
        delete h.Zm;
        e.h.remove(h.bounds);
        h = h.geometry;
        var k = h.kc;
        for (q in k) {
          var l = k[q],
            m = l.Jc,
            p = m.en;
          delete p.j[_.zf(l)];
          RH(p);
          delete m.kc[_.zf(l)];
        }
        h.kc = {};
        var q = h.g;
        _.dl(q.Gd ? "Op" : "Ol", "-v", q);
      };
      c.g = function (h) {
        return SDa(e, h);
      };
      c.onRemove = function (h) {
        e.g.remove(h.bounds);
        var k = h.kc,
          l;
        for (l in k) {
          var m = k[l],
            p = m.h;
          delete p.kc[_.zf(m)];
          m = p.g;
          _.dl(m.Gd ? "Op" : "Ol", "-v", m);
        }
        h.kc = {};
      };
      a = a.ad();
      for (var f in a) RDa(this, a[f]);
      c = c.ad();
      for (var g in c) SDa(this, c[g]);
    },
    RDa = function (a, b) {
      b.Zm = function () {
        var f = b.geometry.kc,
          g;
        for (g in f) {
          var h = f[g];
          h.g = b.style;
          h.zIndex = b.style.zIndex;
          RH(h.Jc.en);
        }
      };
      var c = b.geometry,
        d = c.bounds;
      d.poly = b;
      b.bounds = d;
      _.eB(a.h, d);
      a = a.g.search(d);
      d = 0;
      for (var e = a.length; d < e; ++d) UDa(b, a[d].Af);
      0 < a.length && ((c = c.g), _.cl(c.Gd ? "Op" : "Ol", "-v", c));
    },
    SDa = function (a, b) {
      var c = b.bounds;
      c.Af = b;
      _.eB(a.g, c);
      a = a.h.search(b.bounds);
      if (0 == a.length) b.Xg && _.Fg((0, _.Na)(b.Xg, b));
      else {
        c = 0;
        for (var d = a.length; c < d; ++c) {
          var e = a[c].poly;
          UDa(e, b);
          e = e.geometry.g;
          _.cl(e.Gd ? "Op" : "Ol", "-v", e);
        }
      }
    },
    UDa = function (a, b) {
      var c = a.geometry,
        d = HDa(b.Ex, c.h, c.geodesic, c.i);
      if (d.paths.length) {
        var e = {};
        e.paths = d.paths;
        e.xl = d.xl;
        e.g = a.style;
        e.zIndex = a.style.zIndex;
        e.Jc = b;
        e.h = c;
        a = _.zf(e);
        c.kc[a] = e;
        b.kc[a] = e;
        b = b.en;
        b.j[_.zf(e)] = e;
        RH(b);
      } else b.Xg && _.Fg((0, _.Na)(b.Xg, b));
    },
    VDa = function (a, b, c) {
      this.h = a;
      this.Qa = c;
      this.i = c.fromDivPixelToLatLng(b);
      var d = (this.j = []);
      a.get("latLngs").forEach(function (e) {
        d.push(_.db(e.getArray(), 0));
      });
    },
    WDa = function (a) {
      return _.Ge(a, function (b) {
        var c = {},
          d = b.path;
        if (50 <= d.length) {
          for (var e = [], f = d.length - 2, g, h = 2; h < f; h <<= 1) {
            for (
              var k = d[0],
                l = d[1],
                m = Math.ceil(f / (2 * h)),
                p = Array(m),
                q = 0,
                r = 0,
                t = d.length - 1 - h;
              r < t;

            ) {
              r += h;
              var v = d[r],
                w = d[r + 1];
              r += h;
              r > d.length - 2 && (r = d.length - 2);
              var y = d[r],
                z = d[r + 1],
                J = v - k,
                G = w - l;
              k = y - k;
              var K = z - l,
                R = J * k + G * K;
              l = k * k + K * K;
              R >= l
                ? ((v = y - v), (w = z - w), (w = v * v + w * w))
                : 0 >= R
                ? (w = J * J + G * G)
                : ((w = J * K - G * k), (w *= w), (w /= l + 1e-16));
              w = Math.sqrt(w);
              g && (w += Math.max(g[2 * q], g[2 * q + 1] || 0));
              p[q++] = w;
              k = y;
              l = z;
            }
            q < m && (p[q] = g ? g[2 * q] : 0);
            g = p;
            e.push(p);
          }
          c.g = e;
        }
        c.h = b;
        e = b = Infinity;
        g = f = -Infinity;
        h = 0;
        for (m = d.length; h < m; )
          (p = d[h++]),
            (b = Math.min(b, p)),
            (f = Math.max(f, p)),
            (p = d[h++]),
            (e = Math.min(e, p)),
            (g = Math.max(g, p));
        d = new _.xh();
        d.Aa = b;
        d.Ia = f;
        d.xa = e;
        d.Ca = g;
        c.bounds = d;
        return c;
      });
    },
    ZDa = function (a, b, c, d) {
      return _.Ge(a, function (e) {
        var f = e.path;
        e = e.g;
        var g = null;
        if (b) {
          g = c ? XDa(f) : YDa(f, d);
          for (
            var h = { 0: 0 }, k = 0, l = [0], m = 1, p = e.length;
            m < p;
            ++m
          ) {
            var q = e[m];
            q in h ? (k = h[q]) : ((k += g(m - 1)), (h[q] = k));
            l.push(k);
          }
          g = l;
        }
        return { path: f, g: g };
      });
    },
    YDa = function (a, b) {
      var c = _.db(a, 0);
      wCa(c, b);
      return function (d) {
        d *= 2;
        var e = c[d] - c[d + 2];
        d = c[d + 1] - c[d + 3];
        return Math.sqrt(e * e + d * d);
      };
    },
    XDa = function (a) {
      return function (b) {
        b *= 2;
        var c = new _.bf(a[b], a[b + 1]);
        b = new _.bf(a[b + 2], a[b + 3]);
        return _.ws(c, b, 1);
      };
    },
    cEa = function (a) {
      a.length && ((a = $Da(a, aEa)), (a = $Da(a, bEa)));
      return a;
    },
    $Da = function (a, b) {
      var c = [],
        d = new jH(0),
        e = new jH(0),
        f = new jH(0),
        g = Array(a.length);
      g[0] = a[0];
      g[1] = a[1];
      mH(a, d);
      for (var h = 2, k = 2; h < a.length; ) {
        c[0] = a[h];
        c[1] = a[h + 1];
        mH(c, f);
        b(d, f, e) && (nH(e, c), (g[k++] = c[0]), (g[k++] = c[1]));
        g[k++] = a[h++];
        g[k++] = a[h++];
        var l = d;
        d = f;
        f = l;
      }
      return g;
    },
    aEa = function (a, b, c) {
      if (0 < a.z == 0 < b.z) return !1;
      lH(a, b, SH);
      lH(SH, dEa, c);
      c.z = 0;
      if (1e-12 > kH(c, c)) return !1;
      0 > kH(c, a) + kH(c, b) && ((c.x = -c.x), (c.y = -c.y));
      return !0;
    },
    bEa = function (a, b, c) {
      lH(a, b, SH);
      lH(dEa, SH, TH);
      lH(SH, TH, c);
      if (1e-12 > kH(c, c) || 0 < kH(a, TH) == 0 < kH(b, TH)) return !1;
      0 > kH(c, a) + kH(c, b) && ((c.x = -c.x), (c.y = -c.y), (c.z = -c.z));
      return !0;
    },
    eEa = function (a, b, c) {
      if (!b) return null;
      var d = [];
      b.forEach(function (e) {
        var f = d.push;
        e = e.td;
        for (var g = e.length, h = Array(2 * g), k = 0, l = 0; k < g; ++k) {
          var m = e[k];
          h[l++] = m.lat();
          h[l++] = m.lng();
        }
        f.call(d, h);
      });
      a && _.Xa(d, vCa);
      if (c) for (a = 0, b = d.length; a < b; ++a) d[a] = cEa(d[a]);
      return d;
    },
    fEa = function (a) {
      return _.Ge(a, function (b) {
        if (b.length) {
          var c = b[1];
          for (var d = [0], e = 1, f = 1; e < b.length / 2; ++e, ++f) {
            var g = b[2 * e + 1];
            if (180 < Math.abs(c - g)) {
              var h = g < c ? 1 : -1,
                k = b[2 * e - 2],
                l = b[2 * e];
              b.splice(
                2 * e,
                0,
                l,
                g + 360 * h,
                l,
                g + 450 * h,
                90,
                g + 450 * h,
                90,
                c - 450 * h,
                k,
                c - 450 * h,
                k,
                c - 360 * h
              );
              d.push(f, f, f, f, f, f - 1);
              e += 6;
            }
            d.push(f);
            c = g;
          }
          c = d;
        } else c = [];
        return { path: b, g: c };
      });
    },
    gEa = function () {},
    bDa = function (a, b) {
      var c = a.get("icons"),
        d = !a.Gd && !!_.Ae(c),
        e = !0,
        f = [];
      d &&
        _.Xa(c, function (k) {
          var l = CCa(k.offset) || hEa;
          k = CCa(k.repeat) || iEa;
          f.push({ offset: l, repeat: k });
          e =
            e &&
            (0 == l.value || "%" == l.unit) &&
            (0 == k.value || "%" == k.unit);
        });
      c = a.get("geodesic");
      var g = eEa(a.Gd, a.get("latLngs"), c);
      g = fEa(g);
      var h = c && e;
      c && d && !h && (g = jEa(g));
      g = ZDa(g, d, h, b);
      b = WDa(g);
      if (1 == b.length) d = b[0].bounds;
      else
        for (d = new _.xh(), g = 0, h = b.length; g < h; ++g)
          _.$ka(d, b[g].bounds);
      return { bounds: d, g: a, geodesic: c, h: b, kc: {}, i: f };
    },
    jEa = function (a) {
      return _.Ge(a, function (b) {
        return xDa(b, _.Hj, 0.1);
      });
    },
    kEa = function () {
      var a = _.Lra();
      this.i = _.Rra;
      this.g = _.Qra;
      this.h = a;
    },
    aDa = function (a, b) {
      function c(l) {
        return _.He(b.get(l), f[l]);
      }
      var d = { Gd: b.Gd },
        e = d.Gd,
        f = e ? a.g : a.i;
      d.strokeColor = c("strokeColor");
      d.strokeOpacity = c("strokeOpacity");
      d.strokeWeight = c("strokeWeight");
      d.clickable = c("clickable");
      e
        ? ((d.strokePosition = c("strokePosition")),
          (d.fillColor = c("fillColor")),
          (d.fillOpacity = c("fillOpacity")))
        : (d.strokePosition = a.g.strokePosition);
      var g = b.get("zIndex") || 0;
      d.zIndex = 1e3 * g + (_.La(b) % 1e3);
      d.strokeWeight = Math.min(
        d.strokeWeight,
        0 == d.strokePosition ? 32 : 16
      );
      d.i = b.get("hitStrokeWeight") || lEa(d.strokeWeight, d.strokePosition);
      d.g = [];
      d.h = 1;
      if (!e) {
        e = b.get("icons") || [];
        var h = a.h,
          k = 0;
        _.Xa(e, function (l) {
          var m = h(
            l.icon || {},
            d.strokeColor,
            d.strokeOpacity,
            d.strokeWeight
          );
          m.Lw = !l.fixedRotation;
          d.g.push(m);
          k = Math.max(k, m.strokeOpacity);
          k = Math.max(k, m.fillOpacity);
        });
        _.Fe(0, k) ||
          ((_.Fe(0, d.strokeOpacity) || _.Fe(0, d.strokeWeight)) &&
            1 == d.g.length) ||
          (d.h = Math.max(k, d.strokeOpacity));
        _.Ae(e) && ((a = b.get("map")), _.O(a, "Os"), _.cl("Os", "-p", b));
      }
      return d;
    },
    lEa = function (a, b) {
      switch (b) {
        case 1:
          return 0;
        case 2:
          return 2 * a;
        default:
          return a;
      }
    },
    oEa = function (a) {
      var b = this;
      this.h = a;
      this.g = a.__gm;
      var c = new _.bh();
      new EH(this.g.l, c, new kEa(), new gEa()).bindTo("projection", a);
      var d = _.yh(-100, -200, 100, 200),
        e = new _.dB(d);
      d = new _.dB(d);
      this.F = new _.bh();
      new TDa(c, e, this.F, d);
      var f = _.Am(a.getDiv()),
        g = void 0,
        h = null;
      this.C = _.Lg();
      _.oB(a, this.C, "overlayLayer", 30);
      this.m = this.l = this.j = this.o = this.i = null;
      this.g.h.then(function (k) {
        b.m = k.cc;
        mEa(b, k.cc);
        k.ji.Mb(function (l) {
          if (l && g != l.rb) {
            h && h.unbindAll();
            g = l.rb;
            var m = new QDa(g, f);
            h = new QH(
              b.F,
              function () {
                return m.j.apply(m, _.na(_.Ba.apply(0, arguments)));
              },
              g
            );
            h.bindTo("projection", a);
            b.C.set(h.yd());
          }
        });
      });
      _.L.addListener(this.g.l, "insert", function (k) {
        return nEa(b, k);
      });
      _.L.addListener(this.g.l, "remove", function (k) {
        if (b.j && b.m) {
          zH(k);
          var l = b.j;
          delete k.editable_changed;
          lDa(k);
          _.L.trigger(l, "toolbar", { show: !1, poly: k });
          k.Jn && (_.L.removeListener(k.Jn), delete k.Jn);
          _.dl("Oe", "-p", k);
          k.set("capturing", !1);
          delete k.capturing_changed;
          k.Jk ||
            (k.Gd
              ? _.dl("Op", "-p", k)
              : (_.dl("Ol", "-p", k),
                (l = k.get("icons")),
                _.Ae(l) && _.dl("Os", "-p", k)));
        }
      });
    },
    mEa = function (a, b) {
      a.l = new OH(
        a.F,
        a.g,
        function (c) {
          return a.h.getProjection().fromPointToLatLng(c);
        },
        b.Md,
        a.C
      );
      a.g.j.register(a.l);
      a.j = pEa(a, b);
      _.qf("geometry").then(function (c) {
        a.i = c;
        a.o = new AH(
          function (d, e, f) {
            return d.get("geodesic")
              ? new YCa(
                  d,
                  e,
                  f,
                  a.i.computeHeading,
                  a.i.computeOffset,
                  a.i.computeOffsetOrigin
                )
              : new VDa(d, e, f);
          },
          a.h,
          b
        );
        xH(a.h, a.o);
        a.g.l.forEach(function (d) {
          return nEa(a, d);
        });
      });
    },
    pEa = function (a, b) {
      b = new NH(b);
      b.bindTo("panes", a.g);
      b.bindTo("projection", a.h);
      b.bindTo("zoom", a.g);
      b.bindTo("projectionCenterQ", a.g);
      b.bindTo("offset", a.g);
      _.L.bind(a.h, "click", b, b.Zh);
      return b;
    },
    nEa = function (a, b) {
      if (a.o && a.j && a.l && a.i && a.m) {
        yH(b, a.o);
        mDa(b, a.h, a.j, a.i.interpolate, a.m);
        ZCa(b, a.g, a.l, a.g.j);
        if (!b.Jk) {
          var c = b.Gd ? "Op" : "Ol";
          _.O(a.h, c);
          _.cl(c, "-p", b);
        }
        _.L.addListener(b, "click", function () {
          b.Gd ? b.Jk || _.cl("Op", "-i", b) : _.cl("Ol", "-i", b);
        });
      }
    },
    qEa = function (a, b, c) {
      if (!a || !b || !c) return null;
      var d = c.lat(),
        e = c.lng();
      c = b & 1 ? d : a.Bb.g;
      var f = b & 2 ? e : a.Ra.g;
      d = b & 4 ? d : a.Bb.h;
      var g = b & 8 ? e : a.Ra.h;
      if (c > d) {
        var h = c;
        c = d;
        d = h;
      }
      b & 10 &&
        !a.Ra.contains(e) &&
        ((h = _.Tf(e, a.Ra.g)), (a = _.Tf(a.Ra.h, e)), b & 2 ? h > a : a > h) &&
        ((b = f), (f = g), (g = b));
      return _.Xf(c, f, d, g);
    },
    rEa = function () {
      var a = new _.Ei({ clickable: !1, fillOpacity: 0 });
      a.bindTo("map", this);
      a.bindTo("strokeColor", this);
      a.bindTo("strokeOpacity", this);
      a.bindTo("strokeWeight", this);
      var b = new _.lA(
        ["bounds", "freeControlPoint", "freeVertexPosition"],
        "return",
        qEa
      );
      b.bindTo("bounds", this);
      b.bindTo("freeControlPoint", this);
      b.bindTo("freeVertexPosition", this);
      a.bindTo("bounds", b, "return");
      this.g = _.CB();
      this.g.bindTo("zIndex", this);
      a.bindTo("zIndex", this.g, "ghostZIndex");
    },
    UH = function (a, b, c) {
      this.C = a;
      this.m = b;
      this.i = this.l = null;
      this.h = new _.ph();
      _.L.bind(this.h, "set_at", this, this.Rx);
      this.j = new _.ph();
      _.L.bind(this.j, "set_at", this, this.Sx);
      this.g = !1;
      this.o = c;
    },
    yEa = function (a, b, c) {
      var d = c
        ? new oH(
            a.h,
            sEa,
            tEa,
            !1,
            b.overlayMouseTarget,
            a.m,
            a.get("map"),
            a.o
          )
        : new oH(
            a.j,
            uEa,
            vEa,
            !0,
            b.overlayMouseTarget,
            a.m,
            a.get("map"),
            a.o
          );
      d.bindTo("projection", a);
      d.bindTo("zoom", a);
      d.bindTo("projectionCenterQ", a);
      d.bindTo("panningEnabled", a);
      d.bindTo("mapPixelBounds", a);
      d.bindTo("color", a);
      d.bindTo("zIndex", a);
      d.bindTo("offset", a);
      var e = a.C,
        f = c ? wEa : xEa,
        g;
      _.L.addListener(d, "dragstart", function (h) {
        g = a.get("bounds");
        e.bindTo("freeVertexPosition", d);
        e.set("freeControlPoint", f[h]);
        e.set("map", a.get("map"));
      });
      _.L.addListener(d, "dragend", function (h, k, l) {
        e.set("map", null);
        _.L.trigger(a, "toolbar", {
          show: !0,
          g: l,
          action: function () {
            a.set("bounds", g);
          },
        });
      });
      _.L.forward(d, "dragstart", a);
      _.L.forward(d, "dragend", a);
      _.L.forward(d, "panbynow", a);
      return d;
    },
    VH = function (a) {
      a && (a.unbindAll(), a.release(), _.L.clearInstanceListeners(a));
    },
    zEa = function (a, b, c) {
      a.g ||
        ((a.g = !0),
        (b = qEa(a.get("bounds"), b, c)),
        a.set("bounds", b),
        (a.g = !1));
    },
    CEa = function (a, b, c) {
      function d() {
        a.get("editable")
          ? AEa(a, b, c)
          : (BEa(a), _.L.trigger(a, "toolbar", { show: !1 }));
      }
      a.editable_changed = d;
      d();
    },
    AEa = function (a, b, c) {
      if (!a.g) {
        var d = new _.FB(a, !0);
        a.ih = d;
        var e = new rEa();
        e.bindTo("strokeColor", d);
        e.bindTo("strokeOpacity", d, "ghostStrokeOpacity");
        e.bindTo("strokeWeight", d);
        e.bindTo("bounds", a);
        e.bindTo("zIndex", a);
        a.h = e;
        var f = b.__gm;
        a.de = iH(f);
        var g = _.cB(f, a),
          h = _.Bq() ? 9 : 0,
          k = new rH();
        c = new UH(
          e,
          function (l, m, p) {
            return new uH(l, a.de, h, m, g, k, p);
          },
          c
        );
        c.set("map", b);
        c.bindTo("bounds", a);
        c.bindTo("panes", f);
        c.bindTo("projection", b);
        c.bindTo("zoom", f);
        c.bindTo("projectionCenterQ", f);
        c.bindTo("panningEnabled", b, "draggable");
        c.bindTo("mapPixelBounds", f, "pixelBounds");
        c.bindTo("offset", f);
        c.bindTo("color", d, "strokeColor");
        c.bindTo("zIndex", a);
        c.bindTo("suppressGhostControlPoints", a);
        a.g = c;
        _.L.forward(c, "panbynow", f);
        _.L.forward(c, "toolbar", a);
      }
    },
    BEa = function (a) {
      var b = a.g;
      b &&
        (b.unbindAll(),
        b.set("map", null),
        _.L.clearInstanceListeners(b),
        delete a.g,
        a.de.unbindAll(),
        a.de.release(),
        delete a.de,
        a.h.unbindAll(),
        delete a.h,
        a.ih.release(),
        delete a.ih);
    },
    DEa = function (a, b, c) {
      this.l = a;
      this.Qa = c;
      a = a.get("bounds");
      this.j = eH(c, a.getSouthWest());
      this.i = eH(c, a.getNorthEast());
      this.h = eH(c, c.fromDivPixelToLatLng(b));
    },
    WH = function (a) {
      var b = this,
        c = (this.g = new _.Ci());
      c.ij = a;
      c.Jk = !0;
      c.bindTo("capturing", b);
      c.bindTo("cursor", b);
      c.bindTo("map", b);
      c.bindTo("strokeColor", b);
      c.bindTo("strokeOpacity", b);
      c.bindTo("strokeWeight", b);
      c.bindTo("strokePosition", b);
      c.bindTo("fillColor", b);
      c.bindTo("fillOpacity", b);
      c.bindTo("clickable", b);
      c.bindTo("zIndex", b);
      c.bindTo("suppressUndo", b);
      var d = (this.h = []);
      _.Xa(vH, function (e) {
        d.push(_.L.forward(c, e, b));
      });
      d.push(_.L.forward(b, "toolbar", c));
    },
    GEa = function (a) {
      var b = this;
      this.g = a;
      this.h = a.__gm;
      this.i = this.j = null;
      this.h.h.then(function (c) {
        c = c.cc;
        b.i = c;
        EEa(b, c);
      });
      this.h.C.g = function (c) {
        return FEa(b, c);
      };
      this.h.C.onRemove = function (c) {
        if (b.i) {
          var d = c.vq;
          d.unbindAll();
          d.set("map", null);
          d.release();
          delete c.vq;
          c.listeners && _.Xa(c.listeners, _.L.removeListener);
          delete c.listeners;
          zH(c);
          delete c.editable_changed;
          BEa(c);
          _.dl("Or", "-p", c);
        }
      };
    },
    EEa = function (a, b) {
      a.j = new AH(
        function (c, d, e) {
          return new DEa(c, d, e);
        },
        a.g,
        b
      );
      xH(a.g, a.j);
      a.h.C.forEach(function (c) {
        return FEa(a, c);
      });
    },
    FEa = function (a, b) {
      if (a.j && a.i) {
        var c = (b.vq = new WH(b));
        c.set("map", a.g);
        c.bindTo("bounds", b);
        c.bindTo("capturing", b);
        c.bindTo("cursor", b);
        c.bindTo("clickable", b);
        c.bindTo("fillColor", b);
        c.bindTo("fillOpacity", b);
        c.bindTo("strokeColor", b);
        c.bindTo("strokeOpacity", b);
        c.bindTo("strokeWeight", b);
        c.bindTo("strokePosition", b);
        c.bindTo("suppressUndo", b);
        c.bindTo("zIndex", b);
        var d = (b.listeners = []);
        _.Xa(vH, function (e) {
          d.push(_.L.forward(c, e, b));
        });
        d.push(_.L.forward(b, "toolbar", c));
        yH(b, a.j);
        CEa(b, a.g, a.i);
        _.O(a.g, "Or");
        _.cl("Or", "-p", b);
        d.push(
          _.L.addListener(b, "click", function () {
            _.cl("Or", "-i", b);
          })
        );
      }
    },
    XH = function () {},
    vH =
      "click dblclick mousedown mousemove mouseout mouseover mouseup rightclick contextmenu".split(
        " "
      ),
    BCa = {};
  jH.prototype.equals = function (a) {
    return this.x == a.x && this.y == a.y && this.z == a.z;
  };
  _.D(oH, _.M);
  oH.prototype.release = function () {
    _.Xa(this.G, _.L.removeListener);
    this.G.length = 0;
    _.Xa(this.h, (0, _.Na)(this.J, this));
    this.h.length = 0;
    _.L.clearInstanceListeners(this.j);
    _.$c(this.j);
  };
  oH.prototype.zIndex_changed = function () {
    var a = this.get("zIndex") || 0;
    this.m && --a;
    _.Hm(this.j, a);
  };
  oH.prototype.o = function (a, b) {
    var c = this,
      d = {};
    d.index = b;
    this.h.splice(b, 0, d);
    d.m = this.C[b % this.C.length];
    var e = this.K(this.j, this.F[b % this.F.length], this.m);
    e.bindTo("color", this);
    e.bindTo("panningEnabled", this);
    e.bindTo("mapPixelBounds", this);
    d.h = e;
    var f = [_.L.forward(e, "panbynow", this)];
    b = a && this.g ? _.Ek(a, this.g.getProjection()) : null;
    e.set("latLngPosition", a);
    d.l = !0;
    d.i = null;
    d.j = null;
    a = new _.Bs(
      this.i.Md,
      {
        Rh: function (g) {
          g ? e.set("position", new _.N(g.ia, g.ja)) : e.set("position", null);
        },
        Hi: function () {},
      },
      b,
      this.i,
      function () {
        if (c.g) {
          var g = d.g.getPosition();
          g &&
            ((g = _.el(g, c.g.getProjection())),
            (d.l = !1),
            d.h.set("latLngPosition", g),
            (d.l = !0));
        }
      }
    );
    this.i.Za(a);
    d.g = a;
    f.push(
      _.L.addListener(e, "latlngposition_changed", function () {
        if (d.l && c.g) {
          var g = d.h.get("latLngPosition");
          g
            ? d.g.setPosition(_.Ek(g, c.g.get("projection")))
            : d.g.setPosition(null);
        }
      })
    );
    f.push(
      _.L.addListener(e, "dragstart", function () {
        d.i = _.Cs(d.g);
        d.i && _.Ds(d.g, d.i);
      })
    );
    f.push(
      _.L.addListener(e, "dragend", function () {
        var g = d.g.getPosition();
        if (
          g &&
          c.g &&
          ((g = _.el(g, c.g.get("projection"))), (g = HCa(c, d, g))) &&
          ((g = _.Ek(g, c.g.get("projection"))),
          (g = _.Cs(d.g, g)),
          (g = ICa(d, g))) &&
          (g = d.g.getPosition(g))
        ) {
          var h = _.el(g, c.g.get("projection"));
          d.l = !1;
          d.h.set("latLngPosition", h);
          d.l = !0;
          d.g.setPosition(g);
        }
        d.i = null;
        d.j = null;
      })
    );
    f.push(
      _.L.addListener(e, "deltaclientposition_changed", function () {
        var g = d.h.get("deltaClientPosition");
        if (g && (d.i || d.j) && c.g) {
          var h = d.j || d.i;
          d.j = {
            clientX: h.clientX + g.clientX,
            clientY: h.clientY + g.clientY,
          };
          g = c.i.Oe(d.j);
          g = _.el(g, c.g.get("projection"));
          h = d.j;
          var k = HCa(c, d, g);
          k &&
            !k.equals(g) &&
            ((g = _.Ek(k, c.g.get("projection"))), (h = _.Cs(d.g, g)));
          (h = ICa(d, h)) && _.Ds(d.g, h);
        }
      })
    );
    f.push(
      _.L.addListener(e, "dragstart", function (g) {
        c.bindTo("freeVertexPosition", e, "latLngPosition");
        pH(c, d, "dragstart", g);
      })
    );
    f.push(
      _.L.addListener(e, "dragend", function (g) {
        c.L.setAt(d.index, e.get("latLngPosition"));
        pH(c, d, "dragend", g);
      })
    );
    _.Xa(vH, function (g) {
      f.push(
        _.L.addListener(e, g, function (h) {
          pH(c, d, g, h);
        })
      );
    });
    d.listeners = f;
  };
  oH.prototype.J = function (a) {
    a.h.unbindAll();
    a.h.release();
    a.g && this.i.xf(a.g);
    _.Xa(a.listeners, _.L.removeListener);
    a.listeners.length = 0;
  };
  _.D(qH, _.M);
  var JCa = ["pointer", "row-resize", "row-resize", "col-resize", "col-resize"],
    KCa = [0, 2, 2, 1, 1];
  _.n = qH.prototype;
  _.n.map_changed = function () {
    this.get("map") ||
      (this.l.set("map", null), MCa(this), _.L.clearInstanceListeners(this.g));
  };
  _.n.panes_changed = function () {
    MCa(this);
    this.j = LCa(this);
  };
  _.n.mn = function () {
    var a = this.g,
      b = this.get("center"),
      c = this.get("radius");
    if (b && _.Je(c)) {
      this.i = !0;
      var d = this.get("planetRadius"),
        e = _.Rc(c / d);
      var f = _.Qc(b.lat());
      if ((d = c / d)) {
        c = Math.cos(d);
        d = Math.sin(d);
        var g = Math.sin(f);
        f = Math.atan2(
          Math.sin(Math.acos(((1 - c) / d) * Math.tan(f))) * d * Math.cos(f),
          c - g * g
        );
      } else f = 0;
      f = _.Rc(f);
      a.setAt(0, b);
      c = b.lat() + e;
      90 > c ? a.setAt(1, new _.bf(c, b.lng())) : a.setAt(1, null);
      e = b.lat() - e;
      -90 < e ? a.setAt(2, new _.bf(e, b.lng())) : a.setAt(2, null);
      180 >= f
        ? ((e = b.lng() + f),
          (f = b.lng() - f),
          a.setAt(3, new _.bf(b.lat(), e)),
          a.setAt(4, new _.bf(b.lat(), f)))
        : (a.setAt(3, null), a.setAt(4, null));
      this.i = !1;
      this.h || _.L.trigger(this, "toolbar", { show: !1 });
    } else a.clear();
  };
  _.n.center_changed = qH.prototype.mn;
  _.n.radius_changed = qH.prototype.mn;
  _.n.planetRadius_changed = qH.prototype.mn;
  _.n.Tx = function (a) {
    if (!this.i) {
      var b = this.g.getAt(a);
      if (0 == a)
        _.at(
          this,
          function () {
            this.h = !0;
            this.set("center", b);
            this.h = !1;
          },
          0
        );
      else {
        var c = _.ws(this.get("center"), b, this.get("planetRadius"));
        _.at(
          this,
          function () {
            this.h = !0;
            this.set("radius", c);
            this.h = !1;
          },
          0
        );
      }
    }
  };
  rH.prototype.construct = function (a, b, c, d, e) {
    a = _.Cm("div", a, new _.N(b, b), new _.pg(c, c));
    a.style.borderWidth = _.Zk(d);
    a.style.borderStyle = "solid";
    a.style.borderRadius = _.Zk(Math.ceil(c / 2 + d));
    _.xt(a, e);
  };
  _.D(sH, _.M);
  sH.prototype.h = function (a, b, c, d, e) {
    return !e && d && a ? _.ws(d, a, c) : b;
  };
  _.D(uH, _.M);
  uH.prototype.release = function () {
    _.$c(this.g);
    _.Xa(this.pa, _.L.removeListener);
    this.pa.length = 0;
    this.l.remove();
    this.m.remove();
    this.i.unbindAll();
    this.i.release();
    this.j.set("active", !1);
  };
  uH.prototype.position_changed = function () {
    var a = this.get("position");
    if (a) {
      this.g.style.display = "block";
      var b = 5 + this.o;
      _.Bm(this.g, new _.N(a.x - b, a.y - b));
    } else this.g.style.display = "none";
  };
  uH.prototype.color_changed = function () {
    var a = this.get("color");
    this.g.firstChild.style.borderColor = a;
    tH(this);
  };
  var HEa = new _.bf(90, 0),
    IEa = new _.bf(-90, 0);
  RCa.prototype.g = function (a) {
    a = this.Qa.fromDivPixelToLatLng(a);
    var b = this.j(a, this.h, this.l);
    b ||
      (b =
        Math.abs(_.ws(a, HEa) - this.h) < Math.abs(_.ws(a, IEa) - this.h)
          ? HEa
          : IEa);
    this.i.set("center", b);
  };
  _.D(wH, _.M);
  wH.prototype.center_changed = function () {
    _.Vh(this.Ga);
  };
  wH.prototype.radius_changed = function () {
    _.Vh(this.Ga);
  };
  wH.prototype.planetRadius_changed = function () {
    _.Vh(this.Ga);
  };
  wH.prototype.release = function () {
    for (var a = this.g, b = 0, c = a.length; b < c; ++b)
      _.L.removeListener(a[b]);
    this.g = null;
    this.h.unbindAll();
    this.h = null;
  };
  _.D(AH, _.M);
  AH.prototype.release = function () {
    this.i.release();
    this.pa && _.Xa(this.pa, _.L.removeListener);
    this.pa = null;
  };
  var YH = new _.pg(30, 30),
    JEa = new _.N(YH.width / 2, YH.height / 2);
  _.n = AH.prototype;
  _.n.pl = function () {
    var a = this;
    if (!this.get("active")) {
      var b = this.get("panes"),
        c = this.get("projectionController"),
        d = this.get("poly");
      if (b !== this.l || c !== this.Qa || d !== this.g)
        (this.l = b),
          (this.Qa = c),
          (this.g = d),
          this.pa && _.Xa(this.pa, _.L.removeListener),
          (this.pa = null),
          this.l && this.Qa && this.g
            ? ((this.pa = [
                _.L.bind(this.g, "mousedown", this, this.iw),
                _.L.bind(this.g, "mouseup", this, this.jw),
                _.L.bind(this.g, "movestart", this, this.Rr),
                _.L.bind(this.g, "move", this, this.Sr),
                _.L.bind(this.g, "moveend", this, this.Qr),
              ]),
              this.pa.push(
                _.L.addListener(this.g, "editable_changed", function () {
                  if (a.get("storeEditable")) {
                    var e = a.g.get("editable");
                    a.o = e;
                    a.set("storeEditable", !1);
                    a.g.set("editable", !1);
                    a.set("storeEditable", !0);
                  }
                })
              ),
              this.bindTo("draggable", this.g))
            : (this.unbind("draggable"), this.set("draggable", !1));
    }
  };
  _.n.active_changed = AH.prototype.pl;
  _.n.panes_changed = AH.prototype.pl;
  _.n.poly_changed = AH.prototype.pl;
  _.n.projectionController_changed = AH.prototype.pl;
  _.n.Rr = function (a) {
    if (
      this.get("draggable") &&
      this.g &&
      (!a.domEvent || !_.uk(a.domEvent)) &&
      (a.stop(), !this.get("dragging") && a.latLng)
    ) {
      this.m = a;
      this.set("position", this.Qa.fromLatLngToDivPixel(a.latLng));
      var b = _.Ek(a.latLng, this.j.getProjection());
      (b = _.Cs(this.h, b)) && _.Ds(this.h, b);
      b = this.get("position");
      this.set("dragging", !0);
      this.set("waitingForQuiver", !1);
      this.C = this.F(this.g, b, this.Qa);
      BH(this, "dragstart", a);
      this.o = this.g.get("editable");
      this.g.set("editable", !1);
      this.set("storeEditable", !0);
    }
  };
  _.n.Sr = function (a) {
    this.get("dragging") &&
      ((this.m = a),
      a.latLng &&
        ((a = _.Ek(a.latLng, this.j.getProjection())),
        (a = _.Cs(this.h, a)) && _.Ds(this.h, a)));
  };
  _.n.Qr = function (a) {
    if (this.get("dragging")) {
      var b = this.h.getPosition();
      if (b) {
        var c = _.el(b, this.j.getProjection());
        c = this.Qa.fromLatLngToDivPixel(c);
        this.m = a;
        this.set("position", c);
        this.h.setPosition(b);
      }
      this.set("storeEditable", !1);
      this.g.set("editable", this.o);
      BH(this, "dragend", a);
      this.set("dragging", !1);
    }
  };
  _.n.position_changed = function () {
    var a = this.get("position");
    a ? _.qA(this.i, _.Wqa(a, YH, JEa)) : _.qA(this.i, null);
    this.get("dragging") && (this.C.g(a), BH(this, "drag", this.m));
  };
  _.n.Ar = function () {
    _.sA(this.i, 0 != this.get("panningEnabled") && this.get("dragging"));
  };
  _.n.dragging_changed = AH.prototype.Ar;
  _.n.panningEnabled_changed = AH.prototype.Ar;
  _.n.containerPixelBounds_changed = function () {
    _.rA(this.i, this.get("containerPixelBounds"));
  };
  _.n.iw = function () {
    this.get("dragging") || this.set("waitingForQuiver", !0);
  };
  _.n.jw = function () {
    this.set("waitingForQuiver", !1);
  };
  YCa.prototype.g = function (a) {
    var b = this;
    a = b.Qa.fromDivPixelToLatLng(a);
    var c = this.m(a, this.C, this.F);
    c
      ? 89 < Math.abs(c.lat()) &&
        (c = new _.bf(_.De(c.lat(), -89, 89), c.lng()))
      : (c = new _.bf(this.i.lat(), a.lng() - this.j));
    b.h.get("latLngs").forEach(function (d, e) {
      for (var f = 0, g = d.getLength(); f < g; ++f) {
        var h = b.o(c, b.l[e][f].distance, b.l[e][f].heading);
        d.setAt(f, h);
      }
    });
    this.i = c;
    this.j = a.lng() - c.lng();
  };
  _.D(CH, _.M);
  CH.prototype.h = function (a) {
    return "dragstart" != a && "drag" != a && "dragend" != a;
  };
  CH.prototype.i = function () {
    return this.get("active") ? this : null;
  };
  CH.prototype.handleEvent = function (a, b, c) {
    if ("mouseout" == a) this.set("cursor", "");
    else if ("mouseover" == a) {
      var d = this.get("draggableCursor");
      d && this.set("cursor", d);
    }
    _.L.trigger(c, a, new _.Tm(b.latLng, b.domEvent));
  };
  CH.prototype.zIndex = Infinity;
  _.D(EH, _.M);
  EH.prototype.projection_changed = function () {
    var a = this;
    a.o.forEach(function (b) {
      if (b.get("icons")) {
        var c = _.zf(b);
        a.g[c] = b;
        DH(b);
      }
    });
    fDa(a);
  };
  var dDa = { latLngs: 1, geodesic: 1, icons: 1 },
    eDa = {
      strokeColor: 1,
      strokeOpacity: 1,
      strokePosition: 1,
      strokeWeight: 1,
      fillColor: 1,
      fillOpacity: 1,
      hitStrokeWeight: 1,
      zIndex: 1,
      clickable: 1,
      icons: 1,
    };
  GH.prototype.getLength = function () {
    var a = this.g.getLength();
    1 < a && ++a;
    return a;
  };
  GH.prototype.getAt = function (a) {
    this.g.getLength() == a && 1 < a && (a = 0);
    return this.g.getAt(a);
  };
  _.D(HH, _.M);
  _.n = HH.prototype;
  _.n.release = function () {
    _.Xa(this.pa, _.L.removeListener);
  };
  _.n.Kw = function () {
    var a = this.get("projection"),
      b = this.i;
    if (a)
      for (
        var c = this.h, d = c.getLength(), e = this.get("geodesic"), f = 0;
        f < d - 1;
        ++f
      )
        b.setAt(f, IH(c.getAt(f), c.getAt(f + 1), e, a, this.g));
    else b.clear();
  };
  _.n.geodesic_changed = HH.prototype.projection_changed = HH.prototype.Kw;
  _.n.qw = function (a) {
    hDa(this, !1, a);
  };
  _.n.eq = function (a) {
    hDa(this, !0, a);
  };
  _.n.mw = function (a) {
    var b = this.get("projection");
    if (b) {
      var c = this.h,
        d = this.i,
        e = this.get("geodesic");
      a < c.getLength()
        ? (0 < a &&
            d.setAt(a - 1, IH(c.getAt(a - 1), c.getAt(a), e, b, this.g)),
          d.removeAt(a))
        : 0 < a && d.removeAt(a - 1);
    }
  };
  _.D(JH, _.Tm);
  _.D(KH, _.M);
  KH.prototype.map_changed = function () {
    this.get("map") || (this.l.set("map", null), jDa(this));
  };
  KH.prototype.panes_changed =
    KH.prototype.paths_changed =
    KH.prototype.suppressGhostControlPoints_changed =
      function () {
        var a = this;
        jDa(a);
        var b = a.get("paths"),
          c = a.get("panes");
        if (b && c) {
          var d = c.overlayMouseTarget;
          b.forEach(function (f) {
            a.h.push(LH(a, f, d));
            a.get("suppressGhostControlPoints") || a.g.push(MH(a, f, d));
          });
          var e = function () {
            _.L.trigger(a, "toolbar", { show: !1 });
          };
          e();
          c = a.m;
          c.push(
            _.L.addListener(b, "insert_at", function (f) {
              var g = a.get("suppressGhostControlPoints"),
                h = b.getAt(f);
              a.h.splice(f, 0, LH(a, h, d));
              g || a.g.splice(f, 0, MH(a, h, d));
              e();
            })
          );
          c.push(
            _.L.addListener(b, "remove_at", function (f) {
              var g = a.get("suppressGhostControlPoints");
              a.i(a.h[f]);
              a.h.splice(f, 1);
              g || (a.i(a.g[f]), a.g.splice(f, 1));
              e();
            })
          );
          c.push(
            _.L.addListener(b, "set_at", function (f) {
              var g = a.get("suppressGhostControlPoints");
              a.i(a.h[f]);
              var h = b.getAt(f);
              a.h[f] = LH(a, h, d);
              g || (a.i(a.g[f]), (a.g[f] = MH(a, h, d)));
              e();
            })
          );
        }
      };
  KH.prototype.i = function (a) {
    a.unbindAll();
    a.release();
    _.L.clearInstanceListeners(a);
    a.l && (a.l.release(), a.l.unbindAll());
  };
  _.D(NH, _.M);
  _.n = NH.prototype;
  _.n.panes_changed = function () {
    var a = this.g,
      b = this.get("panes");
    b ? b.floatPane.appendChild(a) : a.parentNode && _.$c(a);
  };
  _.n.Zh = function () {
    _.lt(this.g);
    this.l = null;
    sDa(this);
    this.i = null;
  };
  _.n.changed = NH.prototype.Zh;
  _.n.Tr = function (a) {
    a.show && a.poly
      ? a.poly.get("suppressUndo")
        ? this.Zh()
        : (a.g && this.j.setPosition(a.g), tDa(this, a.action, a.poly))
      : a.poly == this.i && this.Zh();
  };
  _.n.ol = function (a) {
    _.hA(this.h, oDa, a);
  };
  var nDa = _.Pm("undo_poly"),
    oDa = new _.pg(30, 27),
    rDa = new _.N(30, 0),
    qDa = new _.N(60, 0),
    pDa = new _.N(10, -11);
  OH.prototype.h = function (a, b) {
    if ("dragstart" != a && "drag" != a && "dragend" != a) return !0;
    a =
      (a = (b.ij || b).get("map")) &&
      0 != a.get("draggable") &&
      "none" != a.get("gestureHandling");
    return !!this.g || !a;
  };
  OH.prototype.i = function (a, b) {
    var c = this.m.get();
    if (!c) return null;
    c = c.rb.size;
    var d = _.nB(this.o, a.jb, KEa);
    if (!d) return null;
    var e = new _.N(d.pi.ra * c.ia, d.pi.ta * c.ja),
      f = new _.N(d.Ri.ra * c.ia, d.Ri.ta * c.ja),
      g = [],
      h = d.Jc.kc;
    for (k in h) g.push(h[k]);
    g.reverse();
    g.sort(function (v, w) {
      return w.zIndex - v.zIndex || 0;
    });
    var k = null;
    h = b ? 15 : 0;
    for (var l = 0, m = g.length; l < m; ++l) {
      var p = g[l],
        q = p.g;
      if (q.clickable) {
        var r = p.h.g,
          t = q.i / 2 + h;
        p = uDa(p.paths);
        if ((t = zCa(e.x, e.y, t, p))) {
          k = r;
          b = this.m.get();
          b = _.En(b && b.rb, {
            ra: (t[0] + f.x) / c.ia,
            ta: (t[1] + f.y) / c.ja,
            Ba: d.Ri.Ba,
          });
          a.jb = new _.N(b.g, b.h);
          a.latLng = this.C(a.jb);
          break;
        }
        if (q.Gd && !b && yCa(e.x, e.y, p)) {
          k = r;
          break;
        }
      }
    }
    return k;
  };
  OH.prototype.handleEvent = function (a, b, c) {
    !this.g ||
      ("mousedown" != a && "dragstart" != a && "drag" != a) ||
      (this.j = !0);
    this.g && !this.j && ((b.jb = this.g.jb), (b.latLng = this.g.latLng));
    var d = c.ij || c;
    !this.g &&
      "mousedown" == a &&
      d.get("draggable") &&
      ((this.g = b), c.set("capturing", !0));
    d = c;
    if (this.g) {
      if ((this.j && "dragend" == a) || (!this.j && "mouseup" == a))
        (this.j = !1), (this.g = null), c.set("capturing", !1);
      ("dragstart" != a && "drag" != a && "dragend" != a) ||
        !c.ij ||
        (d = c.ij);
      "dragstart" == a && (a = "movestart");
      "drag" == a && (a = "move");
      "dragend" == a && (a = "moveend");
    } else {
      if ("dragstart" == a || "dragend" == a) return;
      "drag" == a && (a = "mousemove");
    }
    "mouseout" == a
      ? this.l.set("cursor", "")
      : "mousemove" == a &&
        ((c = c.get && c.get("cursor")),
        void 0 === c && (c = "pointer"),
        this.l.set("cursor", c));
    _.L.trigger(d, a, new JH(b.latLng, b.domEvent));
  };
  var KEa = new _.N(0.5, 0.5);
  OH.prototype.zIndex = 30;
  FDa.prototype.getBounds = function () {
    return this.h;
  };
  _.B(QH, _.Ji);
  QH.prototype.yd = function () {
    return { rb: this.g, Jd: 2, Pd: this.j.bind(this) };
  };
  QH.prototype.j = function (a, b) {
    var c = this;
    b = void 0 === b ? {} : b;
    var d = document.createElement("div"),
      e = this.g.size;
    d.style.width = e.ia + "px";
    d.style.height = e.ja + "px";
    var f = new _.N(a.ra, a.ta);
    e = this.get("projection");
    var g = new FDa(f, a.Ba, e, this.g),
      h = g.getBounds(),
      k = this.l(this.i, d),
      l = !1,
      m;
    return {
      ib: function () {
        return d;
      },
      je: function () {
        return l;
      },
      loaded: new _.x.Promise(function (p) {
        m = {
          bounds: h,
          xb: f,
          Ea: d,
          en: k,
          kc: {},
          Xg: function () {
            l = !0;
            p();
          },
          Ex: g,
          zoom: a.Ba,
        };
        _.ch(c.h, m);
      }),
      release: function () {
        _.Em(d, "");
        k.release();
        c.h.remove(m);
        b.fd && b.fd();
      },
    };
  };
  IDa.prototype.release = function () {
    ODa(this);
  };
  QDa.prototype.j = function (a, b) {
    this.g = this.g || PDa(this.h, a, this.i);
    return new IDa(this.h, b, this.i, this.g, a);
  };
  VDa.prototype.g = function (a) {
    var b = this.h.get("latLngs"),
      c = this.Qa;
    a = c.fromDivPixelToLatLng(a);
    a = eH(c, a);
    var d = eH(c, this.i),
      e = new _.Vg(d.g - a.g, d.h - a.h);
    _.Xa(this.j, function (f, g) {
      var h = b.getAt(g);
      _.Xa(f, function (k, l) {
        k = eH(c, k);
        h.setAt(l, fH(c, new _.Vg(k.g - e.g, k.h - e.h)));
      });
    });
  };
  var dEa = new jH(1),
    SH = new jH(0),
    TH = new jH(0);
  var hEa = { value: 100, unit: "%" },
    iEa = { value: 0, unit: "px" };
  _.D(rEa, _.M);
  _.D(UH, _.M);
  var wEa = [12, 6, 9, 3],
    xEa = [1, 2, 4, 8],
    sEa = ["ne-resize", "nw-resize", "se-resize", "sw-resize"],
    uEa = ["row-resize", "col-resize"],
    tEa = [0],
    vEa = [2, 1];
  _.n = UH.prototype;
  _.n.map_changed = function () {
    this.get("map") ||
      (this.C.set("map", null),
      VH(this.l),
      this.get("suppressGhostControlPoints") || VH(this.i),
      _.L.clearInstanceListeners(this.h));
  };
  _.n.panes_changed = UH.prototype.suppressGhostControlPoints_changed =
    function () {
      VH(this.l);
      VH(this.i);
      this.i = null;
      var a = this.get("panes");
      a &&
        ((this.l = yEa(this, a, !0)),
        this.get("suppressGhostControlPoints") || (this.i = yEa(this, a, !1)));
    };
  _.n.bounds_changed = function () {
    var a = this.h,
      b = this.j,
      c = this.get("bounds");
    if (c) {
      this.g = !0;
      a.setAt(0, c.getNorthEast());
      a.setAt(1, _.wk(c));
      a.setAt(2, _.vk(c));
      a.setAt(3, c.getSouthWest());
      a = c.Bb.center();
      var d = c.Ra.center();
      b.setAt(0, new _.bf(c.Bb.g, d));
      b.setAt(1, new _.bf(a, c.Ra.g));
      b.setAt(2, new _.bf(c.Bb.h, d));
      b.setAt(3, new _.bf(a, c.Ra.h));
      this.g = !1;
      _.L.trigger(this, "toolbar", { show: !1 });
    } else a.clear(), b.clear();
  };
  _.n.Rx = function (a) {
    zEa(this, wEa[a], this.h.getAt(a));
  };
  _.n.Sx = function (a) {
    zEa(this, xEa[a], this.j.getAt(a));
  };
  DEa.prototype.g = function (a) {
    var b = this.Qa;
    a = b.fromDivPixelToLatLng(a);
    b = eH(b, a);
    a = new _.Vg(this.i.g - this.h.g + b.g, this.i.h - this.h.h + b.h);
    b = new _.Wf(
      fH(
        this.Qa,
        new _.Vg(this.j.g - this.h.g + b.g, this.j.h - this.h.h + b.h)
      ),
      fH(this.Qa, a)
    );
    this.l.set("bounds", b);
  };
  _.D(WH, _.M);
  WH.prototype.bounds_changed = function () {
    var a = this.g;
    if (a) {
      var b = this.get("bounds");
      if (b) {
        var c = b.getSouthWest(),
          d = b.getNorthEast();
        b = b.getCenter();
        a.setPaths([
          new _.bf(d.lat(), d.lng()),
          new _.bf(d.lat(), b.lng()),
          new _.bf(d.lat(), c.lng()),
          new _.bf(c.lat(), c.lng()),
          new _.bf(c.lat(), b.lng()),
          new _.bf(c.lat(), d.lng()),
        ]);
      } else a.setPaths([]);
    }
  };
  WH.prototype.release = function () {
    for (var a = this.h, b = 0, c = a.length; b < c; ++b)
      _.L.removeListener(a[b]);
    delete this.h;
    this.g.unbindAll();
    delete this.g;
  };
  XH.prototype.g = function (a) {
    var b = 0 != a.getVisible() ? a.getMap() : null;
    a.Td != b &&
      (a.Td && a.Td.__gm.m.remove(a),
      b && (b.__gm.m.g || new WCa(b), _.ch(b.__gm.m, a)),
      (a.Td = b));
  };
  XH.prototype.h = function (a) {
    var b = 0 != a.getVisible() ? a.getMap() : null;
    a.Td != b &&
      (a.Td && a.Td.__gm.l.remove(a),
      b && (b.__gm.l.g || new oEa(b), _.ch(b.__gm.l, a)),
      (a.Td = b));
  };
  XH.prototype.i = function (a) {
    var b = 0 != a.getVisible() ? a.getMap() : null;
    a.Td != b &&
      (a.Td && a.Td.__gm.C.remove(a),
      b && (b.__gm.C.g || new GEa(b), _.ch(b.__gm.C, a)),
      (a.Td = b));
  };
  _.rf("poly", new XH());
});












// 


// 


let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
       
      navigator.geolocation.getCurrentPosition(
        (position) => {

            console.log(position.coords.latitude,position.coords.longitude)
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}