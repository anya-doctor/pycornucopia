/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function (a, b) {
        function cy(a) {
            return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }

        function cv(a) {
            if (!ck[a]) {
                var b = c.body
                    , d = f("<" + a + ">").appendTo(b)
                    , e = d.css("display");
                d.remove();
                if (e === "none" || e === "") {
                    cl || (cl = c.createElement("iframe"),
                        cl.frameBorder = cl.width = cl.height = 0),
                        b.appendChild(cl);
                    if (!cm || !cl.createElement)
                        cm = (cl.contentWindow || cl.contentDocument).document,
                            cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"),
                            cm.close();
                    d = cm.createElement(a),
                        cm.body.appendChild(d),
                        e = f.css(d, "display"),
                        b.removeChild(cl)
                }
                ck[a] = e
            }
            return ck[a]
        }

        function cu(a, b) {
            var c = {};
            f.each(cq.concat.apply([], cq.slice(0, b)), function () {
                c[this] = a
            });
            return c
        }

        function ct() {
            cr = b
        }

        function cs() {
            setTimeout(ct, 0);
            return cr = f.now()
        }

        function cj() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
            }
        }

        function ci() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        }

        function cc(a, c) {
            a.dataFilter && (c = a.dataFilter(c, a.dataType));
            var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
            for (g = 1; g < i; g++) {
                if (g === 1)
                    for (h in a.converters)
                        typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
                l = k,
                    k = d[g];
                if (k === "*")
                    k = l;
                else if (l !== "*" && l !== k) {
                    m = l + " " + k,
                        n = e[m] || e["* " + k];
                    if (!n) {
                        p = b;
                        for (o in e) {
                            j = o.split(" ");
                            if (j[0] === l || j[0] === "*") {
                                p = e[j[1] + " " + k];
                                if (p) {
                                    o = e[o],
                                        o === !0 ? n = p : p === !0 && (n = o);
                                    break
                                }
                            }
                        }
                    }
                    !n && !p && f.error("No conversion from " + m.replace(" ", " to ")),
                    n !== !0 && (c = n ? n(c) : p(o(c)))
                }
            }
            return c
        }

        function cb(a, c, d) {
            var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
            for (i in g)
                i in d && (c[g[i]] = d[i]);
            while (f[0] === "*")
                f.shift(),
                h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
            if (h)
                for (i in e)
                    if (e[i] && e[i].test(h)) {
                        f.unshift(i);
                        break
                    }
            if (f[0] in d)
                j = f[0];
            else {
                for (i in d) {
                    if (!f[0] || a.converters[i + " " + f[0]]) {
                        j = i;
                        break
                    }
                    k || (k = i)
                }
                j = j || k
            }
            if (j) {
                j !== f[0] && f.unshift(j);
                return d[j]
            }
        }

        function ca(a, b, c, d) {
            if (f.isArray(b))
                f.each(b, function (b, e) {
                    c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
                });
            else if (!c && b != null && typeof b == "object")
                for (var e in b)
                    ca(a + "[" + e + "]", b[e], c, d);
            else
                d(a, b)
        }

        function b_(a, c) {
            var d, e, g = f.ajaxSettings.flatOptions || {};
            for (d in c)
                c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
            e && f.extend(!0, a, e)
        }

        function b$(a, c, d, e, f, g) {
            f = f || c.dataTypes[0],
                g = g || {},
                g[f] = !0;
            var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
            for (; i < j && (k || !l); i++)
                l = h[i](c, d, e),
                typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l),
                    l = b$(a, c, d, e, l, g)));
            (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
            return l
        }

        function bZ(a) {
            return function (b, c) {
                typeof b != "string" && (c = b,
                    b = "*");
                if (f.isFunction(c)) {
                    var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                    for (; e < g; e++)
                        h = d[e],
                            j = /^\+/.test(h),
                        j && (h = h.substr(1) || "*"),
                            i = a[h] = a[h] || [],
                            i[j ? "unshift" : "push"](c)
                }
            }
        }

        function bC(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight
                , e = b === "width" ? bx : by
                , g = 0
                , h = e.length;
            if (d > 0) {
                if (c !== "border")
                    for (; g < h; g++)
                        c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0),
                            c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
                return d + "px"
            }
            d = bz(a, b, b);
            if (d < 0 || d == null)
                d = a.style[b] || 0;
            d = parseFloat(d) || 0;
            if (c)
                for (; g < h; g++)
                    d += parseFloat(f.css(a, "padding" + e[g])) || 0,
                    c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0),
                    c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
            return d + "px"
        }

        function bp(a, b) {
            b.src ? f.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")),
            b.parentNode && b.parentNode.removeChild(b)
        }

        function bo(a) {
            var b = c.createElement("div");
            bh.appendChild(b),
                b.innerHTML = a.outerHTML;
            return b.firstChild
        }

        function bn(a) {
            var b = (a.nodeName || "").toLowerCase();
            b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
        }

        function bm(a) {
            if (a.type === "checkbox" || a.type === "radio")
                a.defaultChecked = a.checked
        }

        function bl(a) {
            return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
        }

        function bk(a, b) {
            var c;
            if (b.nodeType === 1) {
                b.clearAttributes && b.clearAttributes(),
                b.mergeAttributes && b.mergeAttributes(a),
                    c = b.nodeName.toLowerCase();
                if (c === "object")
                    b.outerHTML = a.outerHTML;
                else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                    if (c === "option")
                        b.selected = a.defaultSelected;
                    else if (c === "input" || c === "textarea")
                        b.defaultValue = a.defaultValue
                } else
                    a.checked && (b.defaultChecked = b.checked = a.checked),
                    b.value !== a.value && (b.value = a.value);
                b.removeAttribute(f.expando)
            }
        }

        function bj(a, b) {
            if (b.nodeType === 1 && !!f.hasData(a)) {
                var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
                if (i) {
                    delete h.handle,
                        h.events = {};
                    for (c in i)
                        for (d = 0,
                                 e = i[c].length; d < e; d++)
                            f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
                }
                h.data && (h.data = f.extend({}, h.data))
            }
        }

        function bi(a, b) {
            return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function U(a) {
            var b = V.split("|")
                , c = a.createDocumentFragment();
            if (c.createElement)
                while (b.length)
                    c.createElement(b.pop());
            return c
        }

        function T(a, b, c) {
            b = b || 0;
            if (f.isFunction(b))
                return f.grep(a, function (a, d) {
                    var e = !!b.call(a, d, a);
                    return e === c
                });
            if (b.nodeType)
                return f.grep(a, function (a, d) {
                    return a === b === c
                });
            if (typeof b == "string") {
                var d = f.grep(a, function (a) {
                    return a.nodeType === 1
                });
                if (O.test(b))
                    return f.filter(b, d, !c);
                b = f.filter(b, d)
            }
            return f.grep(a, function (a, d) {
                return f.inArray(a, b) >= 0 === c
            })
        }

        function S(a) {
            return !a || !a.parentNode || a.parentNode.nodeType === 11
        }

        function K() {
            return !0
        }

        function J() {
            return !1
        }

        function n(a, b, c) {
            var d = b + "defer"
                , e = b + "queue"
                , g = b + "mark"
                , h = f._data(a, d);
            h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
                !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0),
                    h.fire())
            }, 0)
        }

        function m(a) {
            for (var b in a) {
                if (b === "data" && f.isEmptyObject(a[b]))
                    continue;
                if (b !== "toJSON")
                    return !1
            }
            return !0
        }

        function l(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(k, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                    } catch (g) {
                    }
                    f.data(a, c, d)
                } else
                    d = b
            }
            return d
        }

        function h(a) {
            var b = g[a] = {}, c, d;
            a = a.split(/\s+/);
            for (c = 0,
                     d = a.length; c < d; c++)
                b[a[c]] = !0;
            return b
        }

        var c = a.document
            , d = a.navigator
            , e = a.location
            , f = function () {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }

            var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a)
                        return this;
                    if (a.nodeType) {
                        this.context = this[0] = a,
                            this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c,
                            this[0] = c.body,
                            this.selector = a,
                            this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d,
                                    k = d ? d.ownerDocument || d : c,
                                    j = m.exec(a),
                                    j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])],
                                        e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]),
                                        a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2])
                                    return f.find(a);
                                this.length = 1,
                                    this[0] = h
                            }
                            this.context = c,
                                this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a))
                        return f.ready(a);
                    a.selector !== b && (this.selector = a.selector,
                        this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a),
                        d.prevObject = this,
                        d.context = this.context,
                        b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    e.bindReady(),
                        A.add(a);
                    return this
                },
                eq: function (a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            },
                e.fn.init.prototype = e.fn,
                e.extend = e.fn.extend = function () {
                    var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
                    typeof i == "boolean" && (l = i,
                        i = arguments[1] || {},
                        j = 2),
                    typeof i != "object" && !e.isFunction(i) && (i = {}),
                    k === j && (i = this,
                        --j);
                    for (; j < k; j++)
                        if ((a = arguments[j]) != null)
                            for (c in a) {
                                d = i[c],
                                    f = a[c];
                                if (i === f)
                                    continue;
                                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1,
                                    h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {},
                                    i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                            }
                    return i
                }
                ,
                e.extend({
                    noConflict: function (b) {
                        a.$ === e && (a.$ = g),
                        b && a.jQuery === e && (a.jQuery = f);
                        return e
                    },
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function (a) {
                        a ? e.readyWait++ : e.ready(!0)
                    },
                    ready: function (a) {
                        if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                            if (!c.body)
                                return setTimeout(e.ready, 1);
                            e.isReady = !0;
                            if (a !== !0 && --e.readyWait > 0)
                                return;
                            A.fireWith(c, [e]),
                            e.fn.trigger && e(c).trigger("ready").off("ready")
                        }
                    },
                    bindReady: function () {
                        if (!A) {
                            A = e.Callbacks("once memory");
                            if (c.readyState === "complete")
                                return setTimeout(e.ready, 1);
                            if (c.addEventListener)
                                c.addEventListener("DOMContentLoaded", B, !1),
                                    a.addEventListener("load", e.ready, !1);
                            else if (c.attachEvent) {
                                c.attachEvent("onreadystatechange", B),
                                    a.attachEvent("onload", e.ready);
                                var b = !1;
                                try {
                                    b = a.frameElement == null
                                } catch (d) {
                                }
                                c.documentElement.doScroll && b && J()
                            }
                        }
                    },
                    isFunction: function (a) {
                        return e.type(a) === "function"
                    },
                    isArray: Array.isArray || function (a) {
                        return e.type(a) === "array"
                    }
                    ,
                    isWindow: function (a) {
                        return a && typeof a == "object" && "setInterval" in a
                    },
                    isNumeric: function (a) {
                        return !isNaN(parseFloat(a)) && isFinite(a)
                    },
                    type: function (a) {
                        return a == null ? String(a) : I[C.call(a)] || "object"
                    },
                    isPlainObject: function (a) {
                        if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a))
                            return !1;
                        try {
                            if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf"))
                                return !1
                        } catch (c) {
                            return !1
                        }
                        var d;
                        for (d in a)
                            ;
                        return d === b || D.call(a, d)
                    },
                    isEmptyObject: function (a) {
                        for (var b in a)
                            return !1;
                        return !0
                    },
                    error: function (a) {
                        throw new Error(a)
                    },
                    parseJSON: function (b) {
                        if (typeof b != "string" || !b)
                            return null;
                        b = e.trim(b);
                        if (a.JSON && a.JSON.parse)
                            return a.JSON.parse(b);
                        if (n.test(b.replace(o, "@").replace(p, "]").replace(q, "")))
                            return (new Function("return " + b))();
                        e.error("Invalid JSON: " + b)
                    },
                    parseXML: function (c) {
                        var d, f;
                        try {
                            a.DOMParser ? (f = new DOMParser,
                                d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                                d.async = "false",
                                d.loadXML(c))
                        } catch (g) {
                            d = b
                        }
                        (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                        return d
                    },
                    noop: function () {
                    },
                    globalEval: function (b) {
                        b && j.test(b) && (a.execScript || function (b) {
                                a.eval.call(a, b)
                            }
                        )(b)
                    },
                    camelCase: function (a) {
                        return a.replace(w, "ms-").replace(v, x)
                    },
                    nodeName: function (a, b) {
                        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                    },
                    each: function (a, c, d) {
                        var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                        if (d) {
                            if (i) {
                                for (f in a)
                                    if (c.apply(a[f], d) === !1)
                                        break
                            } else
                                for (; g < h;)
                                    if (c.apply(a[g++], d) === !1)
                                        break
                        } else if (i) {
                            for (f in a)
                                if (c.call(a[f], f, a[f]) === !1)
                                    break
                        } else
                            for (; g < h;)
                                if (c.call(a[g], g, a[g++]) === !1)
                                    break;
                        return a
                    },
                    trim: G ? function (a) {
                        return a == null ? "" : G.call(a)
                    }
                        : function (a) {
                        return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                    }
                    ,
                    makeArray: function (a, b) {
                        var c = b || [];
                        if (a != null) {
                            var d = e.type(a);
                            a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                        }
                        return c
                    },
                    inArray: function (a, b, c) {
                        var d;
                        if (b) {
                            if (H)
                                return H.call(b, a, c);
                            d = b.length,
                                c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                            for (; c < d; c++)
                                if (c in b && b[c] === a)
                                    return c
                        }
                        return -1
                    },
                    merge: function (a, c) {
                        var d = a.length
                            , e = 0;
                        if (typeof c.length == "number")
                            for (var f = c.length; e < f; e++)
                                a[d++] = c[e];
                        else
                            while (c[e] !== b)
                                a[d++] = c[e++];
                        a.length = d;
                        return a
                    },
                    grep: function (a, b, c) {
                        var d = [], e;
                        c = !!c;
                        for (var f = 0, g = a.length; f < g; f++)
                            e = !!b(a[f], f),
                            c !== e && d.push(a[f]);
                        return d
                    },
                    map: function (a, c, d) {
                        var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                        if (k)
                            for (; i < j; i++)
                                f = c(a[i], i, d),
                                f != null && (h[h.length] = f);
                        else
                            for (g in a)
                                f = c(a[g], g, d),
                                f != null && (h[h.length] = f);
                        return h.concat.apply([], h)
                    },
                    guid: 1,
                    proxy: function (a, c) {
                        if (typeof c == "string") {
                            var d = a[c];
                            c = a,
                                a = d
                        }
                        if (!e.isFunction(a))
                            return b;
                        var f = F.call(arguments, 2)
                            , g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                        g.guid = a.guid = a.guid || g.guid || e.guid++;
                        return g
                    },
                    access: function (a, c, d, f, g, h) {
                        var i = a.length;
                        if (typeof c == "object") {
                            for (var j in c)
                                e.access(a, j, c[j], f, g, d);
                            return a
                        }
                        if (d !== b) {
                            f = !h && f && e.isFunction(d);
                            for (var k = 0; k < i; k++)
                                g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                            return a
                        }
                        return i ? g(a[0], c) : b
                    },
                    now: function () {
                        return (new Date).getTime()
                    },
                    uaMatch: function (a) {
                        a = a.toLowerCase();
                        var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                        return {
                            browser: b[1] || "",
                            version: b[2] || "0"
                        }
                    },
                    sub: function () {
                        function a(b, c) {
                            return new a.fn.init(b, c)
                        }

                        e.extend(!0, a, this),
                            a.superclass = this,
                            a.fn = a.prototype = this(),
                            a.fn.constructor = a,
                            a.sub = this.sub,
                            a.fn.init = function (d, f) {
                                f && f instanceof e && !(f instanceof a) && (f = a(f));
                                return e.fn.init.call(this, d, f, b)
                            }
                            ,
                            a.fn.init.prototype = a.fn;
                        var b = a(c);
                        return a
                    },
                    browser: {}
                }),
                e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                    I["[object " + b + "]"] = b.toLowerCase()
                }),
                z = e.uaMatch(y),
            z.browser && (e.browser[z.browser] = !0,
                e.browser.version = z.version),
            e.browser.webkit && (e.browser.safari = !0),
            j.test(" ") && (k = /^[\s\xA0]+/,
                l = /[\s\xA0]+$/),
                h = e(c),
                c.addEventListener ? B = function () {
                    c.removeEventListener("DOMContentLoaded", B, !1),
                        e.ready()
                }
                    : c.attachEvent && (B = function () {
                        c.readyState === "complete" && (c.detachEvent("onreadystatechange", B),
                            e.ready())
                    }
                );
            return e
        }()
            , g = {};
        f.Callbacks = function (a) {
            a = a ? g[a] || h(a) : {};
            var c = [], d = [], e, i, j, k, l, m = function (b) {
                var d, e, g, h, i;
                for (d = 0,
                         e = b.length; d < e; d++)
                    g = b[d],
                        h = f.type(g),
                        h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            }, n = function (b, f) {
                f = f || [],
                    e = !a.memory || [b, f],
                    i = !0,
                    l = j || 0,
                    j = 0,
                    k = c.length;
                for (; c && l < k; l++)
                    if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                i = !1,
                c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(),
                    o.fireWith(e[0], e[1])))
            }, o = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        m(arguments),
                            i ? k = c.length : e && e !== !0 && (j = a,
                                n(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments
                            , d = 0
                            , e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    i && f <= k && (k--,
                                    f <= l && l--),
                                        c.splice(f--, 1);
                                    if (a.unique)
                                        break
                                }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0
                            , d = c.length;
                        for (; b < d; b++)
                            if (a === c[b])
                                return !0
                    }
                    return !1
                },
                empty: function () {
                    c = [];
                    return this
                },
                disable: function () {
                    c = d = e = b;
                    return this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    d = b,
                    (!e || e === !0) && o.disable();
                    return this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                    return this
                },
                fire: function () {
                    o.fireWith(this, arguments);
                    return this
                },
                fired: function () {
                    return !!e
                }
            };
            return o
        }
        ;
        var i = [].slice;
        f.extend({
            Deferred: function (a) {
                var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                    resolve: b,
                    reject: c,
                    notify: d
                }, h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments),
                                        g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null)
                            a = h;
                        else
                            for (var b in h)
                                a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}), j;
                for (j in g)
                    i[j] = g[j].fire,
                        i[j + "With"] = g[j].fireWith;
                i.done(function () {
                    e = "resolved"
                }, c.disable, d.lock).fail(function () {
                    e = "rejected"
                }, b.disable, d.lock),
                a && a.call(i, i);
                return i
            },
            when: function (a) {
                function m(a) {
                    return function (b) {
                        e[a] = arguments.length > 1 ? i.call(arguments, 0) : b,
                            j.notifyWith(k, e)
                    }
                }

                function l(a) {
                    return function (c) {
                        b[a] = arguments.length > 1 ? i.call(arguments, 0) : c,
                        --g || j.resolveWith(j, b)
                    }
                }

                var b = i.call(arguments, 0)
                    , c = 0
                    , d = b.length
                    , e = Array(d)
                    , g = d
                    , h = d
                    , j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred()
                    , k = j.promise();
                if (d > 1) {
                    for (; c < d; c++)
                        b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                    g || j.resolveWith(j, b)
                } else
                    j !== a && j.resolveWith(j, d ? [a] : []);
                return k
            }
        }),
            f.support = function () {
                var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
                q.setAttribute("className", "t"),
                    q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
                    d = q.getElementsByTagName("*"),
                    e = q.getElementsByTagName("a")[0];
                if (!d || !d.length || !e)
                    return {};
                g = c.createElement("select"),
                    h = g.appendChild(c.createElement("option")),
                    i = q.getElementsByTagName("input")[0],
                    b = {
                        leadingWhitespace: q.firstChild.nodeType === 3,
                        tbody: !q.getElementsByTagName("tbody").length,
                        htmlSerialize: !!q.getElementsByTagName("link").length,
                        style: /top/.test(e.getAttribute("style")),
                        hrefNormalized: e.getAttribute("href") === "/a",
                        opacity: /^0.55/.test(e.style.opacity),
                        cssFloat: !!e.style.cssFloat,
                        checkOn: i.value === "on",
                        optSelected: h.selected,
                        getSetAttribute: q.className !== "t",
                        enctype: !!c.createElement("form").enctype,
                        html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                        submitBubbles: !0,
                        changeBubbles: !0,
                        focusinBubbles: !1,
                        deleteExpando: !0,
                        noCloneEvent: !0,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableMarginRight: !0
                    },
                    i.checked = !0,
                    b.noCloneChecked = i.cloneNode(!0).checked,
                    g.disabled = !0,
                    b.optDisabled = !h.disabled;
                try {
                    delete q.test
                } catch (s) {
                    b.deleteExpando = !1
                }
                !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
                    b.noCloneEvent = !1
                }),
                    q.cloneNode(!0).fireEvent("onclick")),
                    i = c.createElement("input"),
                    i.value = "t",
                    i.setAttribute("type", "radio"),
                    b.radioValue = i.value === "t",
                    i.setAttribute("checked", "checked"),
                    q.appendChild(i),
                    k = c.createDocumentFragment(),
                    k.appendChild(q.lastChild),
                    b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked,
                    b.appendChecked = i.checked,
                    k.removeChild(i),
                    k.appendChild(q),
                    q.innerHTML = "",
                a.getComputedStyle && (j = c.createElement("div"),
                    j.style.width = "0",
                    j.style.marginRight = "0",
                    q.style.width = "2px",
                    q.appendChild(j),
                    b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
                            marginRight: 0
                        }).marginRight, 10) || 0) === 0);
                if (q.attachEvent)
                    for (o in {
                        submit: 1,
                        change: 1,
                        focusin: 1
                    })
                        n = "on" + o,
                            p = n in q,
                        p || (q.setAttribute(n, "return;"),
                            p = typeof q[n] == "function"),
                            b[o + "Bubbles"] = p;
                k.removeChild(q),
                    k = g = h = j = q = i = null,
                    f(function () {
                        var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
                        !r || (j = 1,
                            k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
                            m = "visibility:hidden;border:0;",
                            n = "style='" + k + "border:5px solid #000;padding:0;'",
                            o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>",
                            a = c.createElement("div"),
                            a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px",
                            r.insertBefore(a, r.firstChild),
                            q = c.createElement("div"),
                            a.appendChild(q),
                            q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",
                            l = q.getElementsByTagName("td"),
                            p = l[0].offsetHeight === 0,
                            l[0].style.display = "",
                            l[1].style.display = "none",
                            b.reliableHiddenOffsets = p && l[0].offsetHeight === 0,
                            q.innerHTML = "",
                            q.style.width = q.style.paddingLeft = "1px",
                            f.boxModel = b.boxModel = q.offsetWidth === 2,
                        typeof q.style.zoom != "undefined" && (q.style.display = "inline",
                            q.style.zoom = 1,
                            b.inlineBlockNeedsLayout = q.offsetWidth === 2,
                            q.style.display = "",
                            q.innerHTML = "<div style='width:4px;'></div>",
                            b.shrinkWrapBlocks = q.offsetWidth !== 2),
                            q.style.cssText = k + m,
                            q.innerHTML = o,
                            d = q.firstChild,
                            e = d.firstChild,
                            h = d.nextSibling.firstChild.firstChild,
                            i = {
                                doesNotAddBorder: e.offsetTop !== 5,
                                doesAddBorderForTableAndCells: h.offsetTop === 5
                            },
                            e.style.position = "fixed",
                            e.style.top = "20px",
                            i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15,
                            e.style.position = e.style.top = "",
                            d.style.overflow = "hidden",
                            d.style.position = "relative",
                            i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5,
                            i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j,
                            r.removeChild(a),
                            q = a = null,
                            f.extend(b, i))
                    });
                return b
            }();
        var j = /^(?:\{.*\}|\[.*\])$/
            , k = /([A-Z])/g;
        f.extend({
            cache: {},
            uuid: 0,
            expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function (a) {
                a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
                return !!a && !m(a)
            },
            data: function (a, c, d, e) {
                if (!!f.acceptData(a)) {
                    var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
                    if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b)
                        return;
                    n || (l ? a[j] = n = ++f.uuid : n = j),
                    m[n] || (m[n] = {},
                    l || (m[n].toJSON = f.noop));
                    if (typeof c == "object" || typeof c == "function")
                        e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                    g = h = m[n],
                    e || (h.data || (h.data = {}),
                        h = h.data),
                    d !== b && (h[f.camelCase(c)] = d);
                    if (o && !h[c])
                        return g.events;
                    k ? (i = h[c],
                    i == null && (i = h[f.camelCase(c)])) : i = h;
                    return i
                }
            },
            removeData: function (a, b, c) {
                if (!!f.acceptData(a)) {
                    var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                    if (!j[k])
                        return;
                    if (b) {
                        d = c ? j[k] : j[k].data;
                        if (d) {
                            f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b),
                                b in d ? b = [b] : b = b.split(" ")));
                            for (e = 0,
                                     g = b.length; e < g; e++)
                                delete d[b[e]];
                            if (!(c ? m : f.isEmptyObject)(d))
                                return
                        }
                    }
                    if (!c) {
                        delete j[k].data;
                        if (!m(j[k]))
                            return
                    }
                    f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null,
                    i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
                }
            },
            _data: function (a, b, c) {
                return f.data(a, b, c, !0)
            },
            acceptData: function (a) {
                if (a.nodeName) {
                    var b = f.noData[a.nodeName.toLowerCase()];
                    if (b)
                        return b !== !0 && a.getAttribute("classid") === b
                }
                return !0
            }
        }),
            f.fn.extend({
                data: function (a, c) {
                    var d, e, g, h = null;
                    if (typeof a == "undefined") {
                        if (this.length) {
                            h = f.data(this[0]);
                            if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                                e = this[0].attributes;
                                for (var i = 0, j = e.length; i < j; i++)
                                    g = e[i].name,
                                    g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)),
                                        l(this[0], g, h[g]));
                                f._data(this[0], "parsedAttrs", !0)
                            }
                        }
                        return h
                    }
                    if (typeof a == "object")
                        return this.each(function () {
                            f.data(this, a)
                        });
                    d = a.split("."),
                        d[1] = d[1] ? "." + d[1] : "";
                    if (c === b) {
                        h = this.triggerHandler("getData" + d[1] + "!", [d[0]]),
                        h === b && this.length && (h = f.data(this[0], a),
                            h = l(this[0], a, h));
                        return h === b && d[1] ? this.data(d[0]) : h
                    }
                    return this.each(function () {
                        var b = f(this)
                            , e = [d[0], c];
                        b.triggerHandler("setData" + d[1] + "!", e),
                            f.data(this, a, c),
                            b.triggerHandler("changeData" + d[1] + "!", e)
                    })
                },
                removeData: function (a) {
                    return this.each(function () {
                        f.removeData(this, a)
                    })
                }
            }),
            f.extend({
                _mark: function (a, b) {
                    a && (b = (b || "fx") + "mark",
                        f._data(a, b, (f._data(a, b) || 0) + 1))
                },
                _unmark: function (a, b, c) {
                    a !== !0 && (c = b,
                        b = a,
                        a = !1);
                    if (b) {
                        c = c || "fx";
                        var d = c + "mark"
                            , e = a ? 0 : (f._data(b, d) || 1) - 1;
                        e ? f._data(b, d, e) : (f.removeData(b, d, !0),
                            n(b, c, "mark"))
                    }
                },
                queue: function (a, b, c) {
                    var d;
                    if (a) {
                        b = (b || "fx") + "queue",
                            d = f._data(a, b),
                        c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                        return d || []
                    }
                },
                dequeue: function (a, b) {
                    b = b || "fx";
                    var c = f.queue(a, b)
                        , d = c.shift()
                        , e = {};
                    d === "inprogress" && (d = c.shift()),
                    d && (b === "fx" && c.unshift("inprogress"),
                        f._data(a, b + ".run", e),
                        d.call(a, function () {
                            f.dequeue(a, b)
                        }, e)),
                    c.length || (f.removeData(a, b + "queue " + b + ".run", !0),
                        n(a, b, "queue"))
                }
            }),
            f.fn.extend({
                queue: function (a, c) {
                    typeof a != "string" && (c = a,
                        a = "fx");
                    if (c === b)
                        return f.queue(this[0], a);
                    return this.each(function () {
                        var b = f.queue(this, a, c);
                        a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
                    })
                },
                dequeue: function (a) {
                    return this.each(function () {
                        f.dequeue(this, a)
                    })
                },
                delay: function (a, b) {
                    a = f.fx ? f.fx.speeds[a] || a : a,
                        b = b || "fx";
                    return this.queue(b, function (b, c) {
                        var d = setTimeout(b, a);
                        c.stop = function () {
                            clearTimeout(d)
                        }
                    })
                },
                clearQueue: function (a) {
                    return this.queue(a || "fx", [])
                },
                promise: function (a, c) {
                    function m() {
                        --h || d.resolveWith(e, [e])
                    }

                    typeof a != "string" && (c = a,
                        a = b),
                        a = a || "fx";
                    var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
                    while (g--)
                        if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0))
                            h++,
                                l.add(m);
                    m();
                    return d.promise()
                }
            });
        var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
        f.fn.extend({
            attr: function (a, b) {
                return f.access(this, a, b, !0, f.attr)
            },
            removeAttr: function (a) {
                return this.each(function () {
                    f.removeAttr(this, a)
                })
            },
            prop: function (a, b) {
                return f.access(this, a, b, !0, f.prop)
            },
            removeProp: function (a) {
                a = f.propFix[a] || a;
                return this.each(function () {
                    try {
                        this[a] = b,
                            delete this[a]
                    } catch (c) {
                    }
                })
            },
            addClass: function (a) {
                var b, c, d, e, g, h, i;
                if (f.isFunction(a))
                    return this.each(function (b) {
                        f(this).addClass(a.call(this, b, this.className))
                    });
                if (a && typeof a == "string") {
                    b = a.split(p);
                    for (c = 0,
                             d = this.length; c < d; c++) {
                        e = this[c];
                        if (e.nodeType === 1)
                            if (!e.className && b.length === 1)
                                e.className = a;
                            else {
                                g = " " + e.className + " ";
                                for (h = 0,
                                         i = b.length; h < i; h++)
                                    ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                                e.className = f.trim(g)
                            }
                    }
                }
                return this
            },
            removeClass: function (a) {
                var c, d, e, g, h, i, j;
                if (f.isFunction(a))
                    return this.each(function (b) {
                        f(this).removeClass(a.call(this, b, this.className))
                    });
                if (a && typeof a == "string" || a === b) {
                    c = (a || "").split(p);
                    for (d = 0,
                             e = this.length; d < e; d++) {
                        g = this[d];
                        if (g.nodeType === 1 && g.className)
                            if (a) {
                                h = (" " + g.className + " ").replace(o, " ");
                                for (i = 0,
                                         j = c.length; i < j; i++)
                                    h = h.replace(" " + c[i] + " ", " ");
                                g.className = f.trim(h)
                            } else
                                g.className = ""
                    }
                }
                return this
            },
            toggleClass: function (a, b) {
                var c = typeof a
                    , d = typeof b == "boolean";
                if (f.isFunction(a))
                    return this.each(function (c) {
                        f(this).toggleClass(a.call(this, c, this.className, b), b)
                    });
                return this.each(function () {
                    if (c === "string") {
                        var e, g = 0, h = f(this), i = b, j = a.split(p);
                        while (e = j[g++])
                            i = d ? i : !h.hasClass(e),
                                h[i ? "addClass" : "removeClass"](e)
                    } else if (c === "undefined" || c === "boolean")
                        this.className && f._data(this, "__className__", this.className),
                            this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
                })
            },
            hasClass: function (a) {
                var b = " " + a + " "
                    , c = 0
                    , d = this.length;
                for (; c < d; c++)
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1)
                        return !0;
                return !1
            },
            val: function (a) {
                var c, d, e, g = this[0];
                {
                    if (!!arguments.length) {
                        e = f.isFunction(a);
                        return this.each(function (d) {
                            var g = f(this), h;
                            if (this.nodeType === 1) {
                                e ? h = a.call(this, d, g.val()) : h = a,
                                    h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                        return a == null ? "" : a + ""
                                    })),
                                    c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                                if (!c || !("set" in c) || c.set(this, h, "value") === b)
                                    this.value = h
                            }
                        })
                    }
                    if (g) {
                        c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                        if (c && "get" in c && (d = c.get(g, "value")) !== b)
                            return d;
                        d = g.value;
                        return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                    }
                }
            }
        }),
            f.extend({
                valHooks: {
                    option: {
                        get: function (a) {
                            var b = a.attributes.value;
                            return !b || b.specified ? a.value : a.text
                        }
                    },
                    select: {
                        get: function (a) {
                            var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                            if (g < 0)
                                return null;
                            c = j ? g : 0,
                                d = j ? g + 1 : i.length;
                            for (; c < d; c++) {
                                e = i[c];
                                if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                                    b = f(e).val();
                                    if (j)
                                        return b;
                                    h.push(b)
                                }
                            }
                            if (j && !h.length && i.length)
                                return f(i[g]).val();
                            return h
                        },
                        set: function (a, b) {
                            var c = f.makeArray(b);
                            f(a).find("option").each(function () {
                                this.selected = f.inArray(f(this).val(), c) >= 0
                            }),
                            c.length || (a.selectedIndex = -1);
                            return c
                        }
                    }
                },
                attrFn: {
                    val: !0,
                    css: !0,
                    html: !0,
                    text: !0,
                    data: !0,
                    width: !0,
                    height: !0,
                    offset: !0
                },
                attr: function (a, c, d, e) {
                    var g, h, i, j = a.nodeType;
                    if (!!a && j !== 3 && j !== 8 && j !== 2) {
                        if (e && c in f.attrFn)
                            return f(a)[c](d);
                        if (typeof a.getAttribute == "undefined")
                            return f.prop(a, c, d);
                        i = j !== 1 || !f.isXMLDoc(a),
                        i && (c = c.toLowerCase(),
                            h = f.attrHooks[c] || (u.test(c) ? x : w));
                        if (d !== b) {
                            if (d === null) {
                                f.removeAttr(a, c);
                                return
                            }
                            if (h && "set" in h && i && (g = h.set(a, d, c)) !== b)
                                return g;
                            a.setAttribute(c, "" + d);
                            return d
                        }
                        if (h && "get" in h && i && (g = h.get(a, c)) !== null)
                            return g;
                        g = a.getAttribute(c);
                        return g === null ? b : g
                    }
                },
                removeAttr: function (a, b) {
                    var c, d, e, g, h = 0;
                    if (b && a.nodeType === 1) {
                        d = b.toLowerCase().split(p),
                            g = d.length;
                        for (; h < g; h++)
                            e = d[h],
                            e && (c = f.propFix[e] || e,
                                f.attr(a, e, ""),
                                a.removeAttribute(v ? e : c),
                            u.test(e) && c in a && (a[c] = !1))
                    }
                },
                attrHooks: {
                    type: {
                        set: function (a, b) {
                            if (r.test(a.nodeName) && a.parentNode)
                                f.error("type property can't be changed");
                            else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                                var c = a.value;
                                a.setAttribute("type", b),
                                c && (a.value = c);
                                return b
                            }
                        }
                    },
                    value: {
                        get: function (a, b) {
                            if (w && f.nodeName(a, "button"))
                                return w.get(a, b);
                            return b in a ? a.value : null
                        },
                        set: function (a, b, c) {
                            if (w && f.nodeName(a, "button"))
                                return w.set(a, b, c);
                            a.value = b
                        }
                    }
                },
                propFix: {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                prop: function (a, c, d) {
                    var e, g, h, i = a.nodeType;
                    if (!!a && i !== 3 && i !== 8 && i !== 2) {
                        h = i !== 1 || !f.isXMLDoc(a),
                        h && (c = f.propFix[c] || c,
                            g = f.propHooks[c]);
                        return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
                    }
                },
                propHooks: {
                    tabIndex: {
                        get: function (a) {
                            var c = a.getAttributeNode("tabindex");
                            return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                        }
                    }
                }
            }),
            f.attrHooks.tabindex = f.propHooks.tabIndex,
            x = {
                get: function (a, c) {
                    var d, e = f.prop(a, c);
                    return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
                },
                set: function (a, b, c) {
                    var d;
                    b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c,
                    d in a && (a[d] = !0),
                        a.setAttribute(c, c.toLowerCase()));
                    return c
                }
            },
        v || (y = {
            name: !0,
            id: !0
        },
            w = f.valHooks.button = {
                get: function (a, c) {
                    var d;
                    d = a.getAttributeNode(c);
                    return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
                },
                set: function (a, b, d) {
                    var e = a.getAttributeNode(d);
                    e || (e = c.createAttribute(d),
                        a.setAttributeNode(e));
                    return e.nodeValue = b + ""
                }
            },
            f.attrHooks.tabindex.set = w.set,
            f.each(["width", "height"], function (a, b) {
                f.attrHooks[b] = f.extend(f.attrHooks[b], {
                    set: function (a, c) {
                        if (c === "") {
                            a.setAttribute(b, "auto");
                            return c
                        }
                    }
                })
            }),
            f.attrHooks.contenteditable = {
                get: w.get,
                set: function (a, b, c) {
                    b === "" && (b = "false"),
                        w.set(a, b, c)
                }
            }),
        f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
            f.attrHooks[c] = f.extend(f.attrHooks[c], {
                get: function (a) {
                    var d = a.getAttribute(c, 2);
                    return d === null ? b : d
                }
            })
        }),
        f.support.style || (f.attrHooks.style = {
            get: function (a) {
                return a.style.cssText.toLowerCase() || b
            },
            set: function (a, b) {
                return a.style.cssText = "" + b
            }
        }),
        f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
            get: function (a) {
                var b = a.parentNode;
                b && (b.selectedIndex,
                b.parentNode && b.parentNode.selectedIndex);
                return null
            }
        })),
        f.support.enctype || (f.propFix.enctype = "encoding"),
        f.support.checkOn || f.each(["radio", "checkbox"], function () {
            f.valHooks[this] = {
                get: function (a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        }),
            f.each(["radio", "checkbox"], function () {
                f.valHooks[this] = f.extend(f.valHooks[this], {
                    set: function (a, b) {
                        if (f.isArray(b))
                            return a.checked = f.inArray(f(a).val(), b) >= 0
                    }
                })
            });
        var z = /^(?:textarea|input|select)$/i
            , A = /^([^\.]*)?(?:\.(.+))?$/
            , B = /\bhover(\.\S+)?\b/
            , C = /^key/
            , D = /^(?:mouse|contextmenu)|click/
            , E = /^(?:focusinfocus|focusoutblur)$/
            , F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/
            , G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(),
                b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }
            , H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }
            , I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
        f.event = {
            add: function (a, c, d, e, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s;
                if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                    d.handler && (p = d,
                        d = p.handler),
                    d.guid || (d.guid = f.guid++),
                        j = h.events,
                    j || (h.events = j = {}),
                        i = h.handle,
                    i || (h.handle = i = function (a) {
                        return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                    }
                        ,
                        i.elem = a),
                        c = f.trim(I(c)).split(" ");
                    for (k = 0; k < c.length; k++) {
                        l = A.exec(c[k]) || [],
                            m = l[1],
                            n = (l[2] || "").split(".").sort(),
                            s = f.event.special[m] || {},
                            m = (g ? s.delegateType : s.bindType) || m,
                            s = f.event.special[m] || {},
                            o = f.extend({
                                type: m,
                                origType: l[1],
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: g,
                                quick: G(g),
                                namespace: n.join(".")
                            }, p),
                            r = j[m];
                        if (!r) {
                            r = j[m] = [],
                                r.delegateCount = 0;
                            if (!s.setup || s.setup.call(a, e, n, i) === !1)
                                a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                        }
                        s.add && (s.add.call(a, o),
                        o.handler.guid || (o.handler.guid = d.guid)),
                            g ? r.splice(r.delegateCount++, 0, o) : r.push(o),
                            f.event.global[m] = !0
                    }
                    a = null
                }
            },
            global: {},
            remove: function (a, b, c, d, e) {
                var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
                if (!!g && !!(o = g.events)) {
                    b = f.trim(I(b || "")).split(" ");
                    for (h = 0; h < b.length; h++) {
                        i = A.exec(b[h]) || [],
                            j = k = i[1],
                            l = i[2];
                        if (!j) {
                            for (j in o)
                                f.event.remove(a, j + b[h], c, d, !0);
                            continue
                        }
                        p = f.event.special[j] || {},
                            j = (d ? p.delegateType : p.bindType) || j,
                            r = o[j] || [],
                            m = r.length,
                            l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                        for (n = 0; n < r.length; n++)
                            s = r[n],
                            (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1),
                            s.selector && r.delegateCount--,
                            p.remove && p.remove.call(a, s));
                        r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle),
                            delete o[j])
                    }
                    f.isEmptyObject(o) && (q = g.handle,
                    q && (q.elem = null),
                        f.removeData(a, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function (c, d, e, g) {
                if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                    var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                    if (E.test(h + f.event.triggered))
                        return;
                    h.indexOf("!") >= 0 && (h = h.slice(0, -1),
                        k = !0),
                    h.indexOf(".") >= 0 && (i = h.split("."),
                        h = i.shift(),
                        i.sort());
                    if ((!e || f.event.customEvent[h]) && !f.event.global[h])
                        return;
                    c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h),
                        c.type = h,
                        c.isTrigger = !0,
                        c.exclusive = k,
                        c.namespace = i.join("."),
                        c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                        o = h.indexOf(":") < 0 ? "on" + h : "";
                    if (!e) {
                        j = f.cache;
                        for (l in j)
                            j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                        return
                    }
                    c.result = b,
                    c.target || (c.target = e),
                        d = d != null ? f.makeArray(d) : [],
                        d.unshift(c),
                        p = f.event.special[h] || {};
                    if (p.trigger && p.trigger.apply(e, d) === !1)
                        return;
                    r = [[e, p.bindType || h]];
                    if (!g && !p.noBubble && !f.isWindow(e)) {
                        s = p.delegateType || h,
                            m = E.test(s + h) ? e : e.parentNode,
                            n = null;
                        for (; m; m = m.parentNode)
                            r.push([m, s]),
                                n = m;
                        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                    }
                    for (l = 0; l < r.length && !c.isPropagationStopped(); l++)
                        m = r[l][0],
                            c.type = r[l][1],
                            q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"),
                        q && q.apply(m, d),
                            q = o && m[o],
                        q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                    c.type = h,
                    !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o],
                    n && (e[o] = null),
                        f.event.triggered = h,
                        e[h](),
                        f.event.triggered = b,
                    n && (e[o] = n));
                    return c.result
                }
            },
            dispatch: function (c) {
                c = f.event.fix(c || a.event);
                var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
                g[0] = c,
                    c.delegateTarget = this;
                if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                    m = f(this),
                        m.context = this.ownerDocument || this;
                    for (l = c.target; l != this; l = l.parentNode || this) {
                        o = {},
                            q = [],
                            m[0] = l;
                        for (j = 0; j < e; j++)
                            r = d[j],
                                s = r.selector,
                            o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)),
                            o[s] && q.push(r);
                        q.length && i.push({
                            elem: l,
                            matches: q
                        })
                    }
                }
                d.length > e && i.push({
                    elem: this,
                    matches: d.slice(e)
                });
                for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                    p = i[j],
                        c.currentTarget = p.elem;
                    for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                        r = p.matches[k];
                        if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace))
                            c.data = r.data,
                                c.handleObj = r,
                                n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g),
                            n !== b && (c.result = n,
                            n === !1 && (c.preventDefault(),
                                c.stopPropagation()))
                    }
                }
                return c.result
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (a, b) {
                    a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                    return a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, d) {
                    var e, f, g, h = d.button, i = d.fromElement;
                    a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c,
                        f = e.documentElement,
                        g = e.body,
                        a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0),
                        a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
                    !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i),
                    !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                    return a
                }
            },
            fix: function (a) {
                if (a[f.expando])
                    return a;
                var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
                a = f.Event(g);
                for (d = i.length; d;)
                    e = i[--d],
                        a[e] = g[e];
                a.target || (a.target = g.srcElement || c),
                a.target.nodeType === 3 && (a.target = a.target.parentNode),
                a.metaKey === b && (a.metaKey = a.ctrlKey);
                return h.filter ? h.filter(a, g) : a
            },
            special: {
                ready: {
                    setup: f.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function (a, b, c) {
                        f.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function (a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = f.extend(new f.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e),
                e.isDefaultPrevented() && c.preventDefault()
            }
        },
            f.event.handle = f.event.dispatch,
            f.removeEvent = c.removeEventListener ? function (a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            }
                : function (a, b, c) {
                a.detachEvent && a.detachEvent("on" + b, c)
            }
            ,
            f.Event = function (a, b) {
                if (!(this instanceof f.Event))
                    return new f.Event(a, b);
                a && a.type ? (this.originalEvent = a,
                    this.type = a.type,
                    this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a,
                b && f.extend(this, b),
                    this.timeStamp = a && a.timeStamp || f.now(),
                    this[f.expando] = !0
            }
            ,
            f.Event.prototype = {
                preventDefault: function () {
                    this.isDefaultPrevented = K;
                    var a = this.originalEvent;
                    !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function () {
                    this.isPropagationStopped = K;
                    var a = this.originalEvent;
                    !a || (a.stopPropagation && a.stopPropagation(),
                        a.cancelBubble = !0)
                },
                stopImmediatePropagation: function () {
                    this.isImmediatePropagationStopped = K,
                        this.stopPropagation()
                },
                isDefaultPrevented: J,
                isPropagationStopped: J,
                isImmediatePropagationStopped: J
            },
            f.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function (a, b) {
                f.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                        if (!d || d !== c && !f.contains(c, d))
                            a.type = e.origType,
                                h = e.handler.apply(this, arguments),
                                a.type = b;
                        return h
                    }
                }
            }),
        f.support.submitBubbles || (f.event.special.submit = {
            setup: function () {
                if (f.nodeName(this, "form"))
                    return !1;
                f.event.add(this, "click._submit keypress._submit", function (a) {
                    var c = a.target
                        , d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                        this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                    }),
                        d._submit_attached = !0)
                })
            },
            teardown: function () {
                if (f.nodeName(this, "form"))
                    return !1;
                f.event.remove(this, "._submit")
            }
        }),
        f.support.changeBubbles || (f.event.special.change = {
            setup: function () {
                if (z.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio")
                        f.event.add(this, "propertychange._change", function (a) {
                            a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }),
                            f.event.add(this, "click._change", function (a) {
                                this._just_changed && !a.isTrigger && (this._just_changed = !1,
                                    f.event.simulate("change", this, a, !0))
                            });
                    return !1
                }
                f.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                    }),
                        b._change_attached = !0)
                })
            },
            handle: function (a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox")
                    return a.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                f.event.remove(this, "._change");
                return z.test(this.nodeName)
            }
        }),
        f.support.focusinBubbles || f.each({
            focus: "focusin",
            blur: "focusout"
        }, function (a, b) {
            var d = 0
                , e = function (a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
            f.event.special[b] = {
                setup: function () {
                    d++ === 0 && c.addEventListener(a, e, !0)
                },
                teardown: function () {
                    --d === 0 && c.removeEventListener(a, e, !0)
                }
            }
        }),
            f.fn.extend({
                on: function (a, c, d, e, g) {
                    var h, i;
                    if (typeof a == "object") {
                        typeof c != "string" && (d = c,
                            c = b);
                        for (i in a)
                            this.on(i, c, d, a[i], g);
                        return this
                    }
                    d == null && e == null ? (e = c,
                        d = c = b) : e == null && (typeof c == "string" ? (e = d,
                        d = b) : (e = d,
                        d = c,
                        c = b));
                    if (e === !1)
                        e = J;
                    else if (!e)
                        return this;
                    g === 1 && (h = e,
                        e = function (a) {
                            f().off(a);
                            return h.apply(this, arguments)
                        }
                        ,
                        e.guid = h.guid || (h.guid = f.guid++));
                    return this.each(function () {
                        f.event.add(this, a, e, d, c)
                    })
                },
                one: function (a, b, c, d) {
                    return this.on.call(this, a, b, c, d, 1)
                },
                off: function (a, c, d) {
                    if (a && a.preventDefault && a.handleObj) {
                        var e = a.handleObj;
                        f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                        return this
                    }
                    if (typeof a == "object") {
                        for (var g in a)
                            this.off(g, c, a[g]);
                        return this
                    }
                    if (c === !1 || typeof c == "function")
                        d = c,
                            c = b;
                    d === !1 && (d = J);
                    return this.each(function () {
                        f.event.remove(this, a, d, c)
                    })
                },
                bind: function (a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function (a, b) {
                    return this.off(a, null, b)
                },
                live: function (a, b, c) {
                    f(this.context).on(a, this.selector, b, c);
                    return this
                },
                die: function (a, b) {
                    f(this.context).off(a, this.selector || "**", b);
                    return this
                },
                delegate: function (a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function (a, b, c) {
                    return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
                },
                trigger: function (a, b) {
                    return this.each(function () {
                        f.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function (a, b) {
                    if (this[0])
                        return f.event.trigger(a, b, this[0], !0)
                },
                toggle: function (a) {
                    var b = arguments
                        , c = a.guid || f.guid++
                        , d = 0
                        , e = function (c) {
                        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                        f._data(this, "lastToggle" + a.guid, e + 1),
                            c.preventDefault();
                        return b[e].apply(this, arguments) || !1
                    };
                    e.guid = c;
                    while (d < b.length)
                        b[d++].guid = c;
                    return this.click(e)
                },
                hover: function (a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                }
            }),
            f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
                f.fn[b] = function (a, c) {
                    c == null && (c = a,
                        a = null);
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
                    ,
                f.attrFn && (f.attrFn[b] = !0),
                C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks),
                D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
            }),
            function () {
                function x(a, b, c, e, f, g) {
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = e[h];
                        if (j) {
                            var k = !1;
                            j = j[a];
                            while (j) {
                                if (j[d] === c) {
                                    k = e[j.sizset];
                                    break
                                }
                                if (j.nodeType === 1) {
                                    g || (j[d] = c,
                                        j.sizset = h);
                                    if (typeof b != "string") {
                                        if (j === b) {
                                            k = !0;
                                            break
                                        }
                                    } else if (m.filter(b, [j]).length > 0) {
                                        k = j;
                                        break
                                    }
                                }
                                j = j[a]
                            }
                            e[h] = k
                        }
                    }
                }

                function w(a, b, c, e, f, g) {
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = e[h];
                        if (j) {
                            var k = !1;
                            j = j[a];
                            while (j) {
                                if (j[d] === c) {
                                    k = e[j.sizset];
                                    break
                                }
                                j.nodeType === 1 && !g && (j[d] = c,
                                    j.sizset = h);
                                if (j.nodeName.toLowerCase() === b) {
                                    k = j;
                                    break
                                }
                                j = j[a]
                            }
                            e[h] = k
                        }
                    }
                }

                var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
                    , d = "sizcache" + (Math.random() + "").replace(".", "")
                    , e = 0
                    , g = Object.prototype.toString
                    , h = !1
                    , i = !0
                    , j = /\\/g
                    , k = /\r\n/g
                    , l = /\W/;
                [0, 0].sort(function () {
                    i = !1;
                    return 0
                });
                var m = function (b, d, e, f) {
                    e = e || [],
                        d = d || c;
                    var h = d;
                    if (d.nodeType !== 1 && d.nodeType !== 9)
                        return [];
                    if (!b || typeof b != "string")
                        return e;
                    var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
                    do {
                        a.exec(""),
                            i = a.exec(x);
                        if (i) {
                            x = i[3],
                                w.push(i[1]);
                            if (i[2]) {
                                l = i[3];
                                break
                            }
                        }
                    } while (i);
                    if (w.length > 1 && p.exec(b))
                        if (w.length === 2 && o.relative[w[0]])
                            j = y(w[0] + w[1], d, f);
                        else {
                            j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                            while (w.length)
                                b = w.shift(),
                                o.relative[b] && (b += w.shift()),
                                    j = y(b, j, f)
                        }
                    else {
                        !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v),
                            d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                        if (d) {
                            n = f ? {
                                expr: w.pop(),
                                set: s(f)
                            } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v),
                                j = n.expr ? m.filter(n.expr, n.set) : n.set,
                                w.length > 0 ? k = s(j) : u = !1;
                            while (w.length)
                                q = w.pop(),
                                    r = q,
                                    o.relative[q] ? r = w.pop() : q = "",
                                r == null && (r = d),
                                    o.relative[q](k, r, v)
                        } else
                            k = w = []
                    }
                    k || (k = j),
                    k || m.error(q || b);
                    if (g.call(k) === "[object Array]")
                        if (!u)
                            e.push.apply(e, k);
                        else if (d && d.nodeType === 1)
                            for (t = 0; k[t] != null; t++)
                                k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
                        else
                            for (t = 0; k[t] != null; t++)
                                k[t] && k[t].nodeType === 1 && e.push(j[t]);
                    else
                        s(k, e);
                    l && (m(l, h, e, f),
                        m.uniqueSort(e));
                    return e
                };
                m.uniqueSort = function (a) {
                    if (u) {
                        h = i,
                            a.sort(u);
                        if (h)
                            for (var b = 1; b < a.length; b++)
                                a[b] === a[b - 1] && a.splice(b--, 1)
                    }
                    return a
                }
                    ,
                    m.matches = function (a, b) {
                        return m(a, null, null, b)
                    }
                    ,
                    m.matchesSelector = function (a, b) {
                        return m(b, null, null, [a]).length > 0
                    }
                    ,
                    m.find = function (a, b, c) {
                        var d, e, f, g, h, i;
                        if (!a)
                            return [];
                        for (e = 0,
                                 f = o.order.length; e < f; e++) {
                            h = o.order[e];
                            if (g = o.leftMatch[h].exec(a)) {
                                i = g[1],
                                    g.splice(1, 1);
                                if (i.substr(i.length - 1) !== "\\") {
                                    g[1] = (g[1] || "").replace(j, ""),
                                        d = o.find[h](g, b, c);
                                    if (d != null) {
                                        a = a.replace(o.match[h], "");
                                        break
                                    }
                                }
                            }
                        }
                        d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
                        return {
                            set: d,
                            expr: a
                        }
                    }
                    ,
                    m.filter = function (a, c, d, e) {
                        var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
                        while (a && c.length) {
                            for (h in o.filter)
                                if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                                    k = o.filter[h],
                                        l = f[1],
                                        g = !1,
                                        f.splice(1, 1);
                                    if (l.substr(l.length - 1) === "\\")
                                        continue;
                                    s === r && (r = []);
                                    if (o.preFilter[h]) {
                                        f = o.preFilter[h](f, s, d, r, e, t);
                                        if (!f)
                                            g = i = !0;
                                        else if (f === !0)
                                            continue
                                    }
                                    if (f)
                                        for (n = 0; (j = s[n]) != null; n++)
                                            j && (i = k(j, f, n, s),
                                                p = e ^ i,
                                                d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j),
                                                    g = !0));
                                    if (i !== b) {
                                        d || (s = r),
                                            a = a.replace(o.match[h], "");
                                        if (!g)
                                            return [];
                                        break
                                    }
                                }
                            if (a === q)
                                if (g == null)
                                    m.error(a);
                                else
                                    break;
                            q = a
                        }
                        return s
                    }
                    ,
                    m.error = function (a) {
                        throw new Error("Syntax error, unrecognized expression: " + a)
                    }
                ;
                var n = m.getText = function (a) {
                    var b, c, d = a.nodeType, e = "";
                    if (d) {
                        if (d === 1 || d === 9) {
                            if (typeof a.textContent == "string")
                                return a.textContent;
                            if (typeof a.innerText == "string")
                                return a.innerText.replace(k, "");
                            for (a = a.firstChild; a; a = a.nextSibling)
                                e += n(a)
                        } else if (d === 3 || d === 4)
                            return a.nodeValue
                    } else
                        for (b = 0; c = a[b]; b++)
                            c.nodeType !== 8 && (e += n(c));
                    return e
                }
                    , o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function (a) {
                            return a.getAttribute("href")
                        },
                        type: function (a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function (a, b) {
                            var c = typeof b == "string"
                                , d = c && !l.test(b)
                                , e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++)
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1)
                                        ;
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && m.filter(b, a, !0)
                        },
                        ">": function (a, b) {
                            var c, d = typeof b == "string", e = 0, f = a.length;
                            if (d && !l.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++)
                                    c = a[e],
                                    c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function (a, b, c) {
                            var d, f = e++, g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                                d = b,
                                g = w),
                                g("parentNode", b, f, a, d, c)
                        },
                        "~": function (a, b, c) {
                            var d, f = e++, g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                                d = b,
                                g = w),
                                g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function (a, b, c) {
                            if (typeof b.getElementById != "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function (a, b) {
                            if (typeof b.getElementsByName != "undefined") {
                                var c = []
                                    , d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++)
                                    d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function (a, b) {
                            if (typeof b.getElementsByTagName != "undefined")
                                return b.getElementsByTagName(a[1])
                        }
                    },
                    preFilter: {
                        CLASS: function (a, b, c, d, e, f) {
                            a = " " + a[1].replace(j, "") + " ";
                            if (f)
                                return a;
                            for (var g = 0, h; (h = b[g]) != null; g++)
                                h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function (a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function (a, b) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function (a) {
                            if (a[1] === "nth") {
                                a[2] || m.error(a[0]),
                                    a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0,
                                    a[3] = b[3] - 0
                            } else
                                a[2] && m.error(a[0]);
                            a[0] = e++;
                            return a
                        },
                        ATTR: function (a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            !f && o.attrMap[g] && (a[1] = o.attrMap[g]),
                                a[4] = (a[4] || a[5] || "").replace(j, ""),
                            a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function (b, c, d, e, f) {
                            if (b[1] === "not")
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))
                                    b[3] = m(b[3], null, null, c);
                                else {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                }
                            else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0]))
                                return !0;
                            return b
                        },
                        POS: function (a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function (a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function (a) {
                            return a.disabled === !0
                        },
                        checked: function (a) {
                            return a.checked === !0
                        },
                        selected: function (a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function (a) {
                            return !!a.firstChild
                        },
                        empty: function (a) {
                            return !a.firstChild
                        },
                        has: function (a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function (a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function (a) {
                            var b = a.getAttribute("type")
                                , c = a.type;
                            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                        },
                        radio: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                        },
                        checkbox: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                        },
                        file: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "file" === a.type
                        },
                        password: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "password" === a.type
                        },
                        submit: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "submit" === a.type
                        },
                        image: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "image" === a.type
                        },
                        reset: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "reset" === a.type
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && "button" === a.type || b === "button"
                        },
                        input: function (a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function (a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function (a, b) {
                            return b === 0
                        },
                        last: function (a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function (a, b) {
                            return b % 2 === 0
                        },
                        odd: function (a, b) {
                            return b % 2 === 1
                        },
                        lt: function (a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function (a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function (a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function (a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function (a, b, c, d) {
                            var e = b[1]
                                , f = o.filters[e];
                            if (f)
                                return f(a, c, b, d);
                            if (e === "contains")
                                return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++)
                                    if (g[h] === a)
                                        return !1;
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function (a, b) {
                            var c, e, f, g, h, i, j, k = b[1], l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    while (l = l.previousSibling)
                                        if (l.nodeType === 1)
                                            return !1;
                                    if (k === "first")
                                        return !0;
                                    l = a;
                                case "last":
                                    while (l = l.nextSibling)
                                        if (l.nodeType === 1)
                                            return !1;
                                    return !0;
                                case "nth":
                                    c = b[2],
                                        e = b[3];
                                    if (c === 1 && e === 0)
                                        return !0;
                                    f = b[0],
                                        g = a.parentNode;
                                    if (g && (g[d] !== f || !a.nodeIndex)) {
                                        i = 0;
                                        for (l = g.firstChild; l; l = l.nextSibling)
                                            l.nodeType === 1 && (l.nodeIndex = ++i);
                                        g[d] = f
                                    }
                                    j = a.nodeIndex - e;
                                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function (a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function (a, b) {
                            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function (a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function (a, b) {
                            var c = b[1]
                                , d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c)
                                , e = d + ""
                                , f = b[2]
                                , g = b[4];
                            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function (a, b, c, d) {
                            var e = b[2]
                                , f = o.setFilters[e];
                            if (f)
                                return f(a, c, b, d)
                        }
                    }
                }
                    , p = o.match.POS
                    , q = function (a, b) {
                    return "\\" + (b - 0 + 1)
                };
                for (var r in o.match)
                    o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),
                        o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
                var s = function (a, b) {
                    a = Array.prototype.slice.call(a, 0);
                    if (b) {
                        b.push.apply(b, a);
                        return b
                    }
                    return a
                };
                try {
                    Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
                } catch (t) {
                    s = function (a, b) {
                        var c = 0
                            , d = b || [];
                        if (g.call(a) === "[object Array]")
                            Array.prototype.push.apply(d, a);
                        else if (typeof a.length == "number")
                            for (var e = a.length; c < e; c++)
                                d.push(a[c]);
                        else
                            for (; a[c]; c++)
                                d.push(a[c]);
                        return d
                    }
                }
                var u, v;
                c.documentElement.compareDocumentPosition ? u = function (a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition)
                        return a.compareDocumentPosition ? -1 : 1;
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                }
                    : (u = function (a, b) {
                        if (a === b) {
                            h = !0;
                            return 0
                        }
                        if (a.sourceIndex && b.sourceIndex)
                            return a.sourceIndex - b.sourceIndex;
                        var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
                        if (g === i)
                            return v(a, b);
                        if (!g)
                            return -1;
                        if (!i)
                            return 1;
                        while (j)
                            e.unshift(j),
                                j = j.parentNode;
                        j = i;
                        while (j)
                            f.unshift(j),
                                j = j.parentNode;
                        c = e.length,
                            d = f.length;
                        for (var k = 0; k < c && k < d; k++)
                            if (e[k] !== f[k])
                                return v(e[k], f[k]);
                        return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
                    }
                        ,
                        v = function (a, b, c) {
                            if (a === b)
                                return c;
                            var d = a.nextSibling;
                            while (d) {
                                if (d === b)
                                    return -1;
                                d = d.nextSibling
                            }
                            return 1
                        }
                ),
                    function () {
                        var a = c.createElement("div")
                            , d = "script" + (new Date).getTime()
                            , e = c.documentElement;
                        a.innerHTML = "<a name='" + d + "'/>",
                            e.insertBefore(a, e.firstChild),
                        c.getElementById(d) && (o.find.ID = function (a, c, d) {
                                if (typeof c.getElementById != "undefined" && !d) {
                                    var e = c.getElementById(a[1]);
                                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                                }
                            }
                                ,
                                o.filter.ID = function (a, b) {
                                    var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                                    return a.nodeType === 1 && c && c.nodeValue === b
                                }
                        ),
                            e.removeChild(a),
                            e = a = null
                    }(),
                    function () {
                        var a = c.createElement("div");
                        a.appendChild(c.createComment("")),
                        a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                                var c = b.getElementsByTagName(a[1]);
                                if (a[1] === "*") {
                                    var d = [];
                                    for (var e = 0; c[e]; e++)
                                        c[e].nodeType === 1 && d.push(c[e]);
                                    c = d
                                }
                                return c
                            }
                        ),
                            a.innerHTML = "<a href='#'></a>",
                        a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                                return a.getAttribute("href", 2)
                            }
                        ),
                            a = null
                    }(),
                c.querySelectorAll && function () {
                    var a = m
                        , b = c.createElement("div")
                        , d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                        m = function (b, e, f, g) {
                            e = e || c;
                            if (!g && !m.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                    if (h[1])
                                        return s(e.getElementsByTagName(b), f);
                                    if (h[2] && o.find.CLASS && e.getElementsByClassName)
                                        return s(e.getElementsByClassName(h[2]), f)
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body)
                                        return s([e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode)
                                            return s([], f);
                                        if (i.id === h[3])
                                            return s([i], f)
                                    }
                                    try {
                                        return s(e.querySelectorAll(b), f)
                                    } catch (j) {
                                    }
                                } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                    var k = e
                                        , l = e.getAttribute("id")
                                        , n = l || d
                                        , p = e.parentNode
                                        , q = /^\s*[+~]/.test(b);
                                    l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n),
                                    q && p && (e = e.parentNode);
                                    try {
                                        if (!q || p)
                                            return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                    } catch (r) {
                                    } finally {
                                        l || k.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        }
                        ;
                        for (var e in a)
                            m[e] = a[e];
                        b = null
                    }
                }(),
                    function () {
                        var a = c.documentElement
                            , b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                        if (b) {
                            var d = !b.call(c.createElement("div"), "div")
                                , e = !1;
                            try {
                                b.call(c.documentElement, "[test!='']:sizzle")
                            } catch (f) {
                                e = !0
                            }
                            m.matchesSelector = function (a, c) {
                                c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                                if (!m.isXML(a))
                                    try {
                                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                            var f = b.call(a, c);
                                            if (f || !d || a.document && a.document.nodeType !== 11)
                                                return f
                                        }
                                    } catch (g) {
                                    }
                                return m(c, null, null, [a]).length > 0
                            }
                        }
                    }(),
                    function () {
                        var a = c.createElement("div");
                        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                        if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                            a.lastChild.className = "e";
                            if (a.getElementsByClassName("e").length === 1)
                                return;
                            o.order.splice(1, 0, "CLASS"),
                                o.find.CLASS = function (a, b, c) {
                                    if (typeof b.getElementsByClassName != "undefined" && !c)
                                        return b.getElementsByClassName(a[1])
                                }
                                ,
                                a = null
                        }
                    }(),
                    c.documentElement.contains ? m.contains = function (a, b) {
                        return a !== b && (a.contains ? a.contains(b) : !0)
                    }
                        : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
                        return !!(a.compareDocumentPosition(b) & 16)
                    }
                        : m.contains = function () {
                        return !1
                    }
                    ,
                    m.isXML = function (a) {
                        var b = (a ? a.ownerDocument || a : 0).documentElement;
                        return b ? b.nodeName !== "HTML" : !1
                    }
                ;
                var y = function (a, b, c) {
                    var d, e = [], f = "", g = b.nodeType ? [b] : b;
                    while (d = o.match.PSEUDO.exec(a))
                        f += d[0],
                            a = a.replace(o.match.PSEUDO, "");
                    a = o.relative[a] ? a + "*" : a;
                    for (var h = 0, i = g.length; h < i; h++)
                        m(a, g[h], e, c);
                    return m.filter(f, e)
                };
                m.attr = f.attr,
                    m.selectors.attrMap = {},
                    f.find = m,
                    f.expr = m.selectors,
                    f.expr[":"] = f.expr.filters,
                    f.unique = m.uniqueSort,
                    f.text = m.getText,
                    f.isXMLDoc = m.isXML,
                    f.contains = m.contains
            }();
        var L = /Until$/
            , M = /^(?:parents|prevUntil|prevAll)/
            , N = /,/
            , O = /^.[^:#\[\.,]*$/
            , P = Array.prototype.slice
            , Q = f.expr.match.POS
            , R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        f.fn.extend({
            find: function (a) {
                var b = this, c, d;
                if (typeof a != "string")
                    return f(a).filter(function () {
                        for (c = 0,
                                 d = b.length; c < d; c++)
                            if (f.contains(b[c], this))
                                return !0
                    });
                var e = this.pushStack("", "find", a), g, h, i;
                for (c = 0,
                         d = this.length; c < d; c++) {
                    g = e.length,
                        f.find(a, this[c], e);
                    if (c > 0)
                        for (h = g; h < e.length; h++)
                            for (i = 0; i < g; i++)
                                if (e[i] === e[h]) {
                                    e.splice(h--, 1);
                                    break
                                }
                }
                return e
            },
            has: function (a) {
                var b = f(a);
                return this.filter(function () {
                    for (var a = 0, c = b.length; a < c; a++)
                        if (f.contains(this, b[a]))
                            return !0
                })
            },
            not: function (a) {
                return this.pushStack(T(this, a, !1), "not", a)
            },
            filter: function (a) {
                return this.pushStack(T(this, a, !0), "filter", a)
            },
            is: function (a) {
                return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function (a, b) {
                var c = [], d, e, g = this[0];
                if (f.isArray(a)) {
                    var h = 1;
                    while (g && g.ownerDocument && g !== b) {
                        for (d = 0; d < a.length; d++)
                            f(g).is(a[d]) && c.push({
                                selector: a[d],
                                elem: g,
                                level: h
                            });
                        g = g.parentNode,
                            h++
                    }
                    return c
                }
                var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
                for (d = 0,
                         e = this.length; d < e; d++) {
                    g = this[d];
                    while (g) {
                        if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                            c.push(g);
                            break
                        }
                        g = g.parentNode;
                        if (!g || !g.ownerDocument || g === b || g.nodeType === 11)
                            break
                    }
                }
                c = c.length > 1 ? f.unique(c) : c;
                return this.pushStack(c, "closest", a)
            },
            index: function (a) {
                if (!a)
                    return this[0] && this[0].parentNode ? this.prevAll().length : -1;
                if (typeof a == "string")
                    return f.inArray(this[0], f(a));
                return f.inArray(a.jquery ? a[0] : a, this)
            },
            add: function (a, b) {
                var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a)
                    , d = f.merge(this.get(), c);
                return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
            },
            andSelf: function () {
                return this.add(this.prevObject)
            }
        }),
            f.each({
                parent: function (a) {
                    var b = a.parentNode;
                    return b && b.nodeType !== 11 ? b : null
                },
                parents: function (a) {
                    return f.dir(a, "parentNode")
                },
                parentsUntil: function (a, b, c) {
                    return f.dir(a, "parentNode", c)
                },
                next: function (a) {
                    return f.nth(a, 2, "nextSibling")
                },
                prev: function (a) {
                    return f.nth(a, 2, "previousSibling")
                },
                nextAll: function (a) {
                    return f.dir(a, "nextSibling")
                },
                prevAll: function (a) {
                    return f.dir(a, "previousSibling")
                },
                nextUntil: function (a, b, c) {
                    return f.dir(a, "nextSibling", c)
                },
                prevUntil: function (a, b, c) {
                    return f.dir(a, "previousSibling", c)
                },
                siblings: function (a) {
                    return f.sibling(a.parentNode.firstChild, a)
                },
                children: function (a) {
                    return f.sibling(a.firstChild)
                },
                contents: function (a) {
                    return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
                }
            }, function (a, b) {
                f.fn[a] = function (c, d) {
                    var e = f.map(this, b, c);
                    L.test(a) || (d = c),
                    d && typeof d == "string" && (e = f.filter(d, e)),
                        e = this.length > 1 && !R[a] ? f.unique(e) : e,
                    (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
                    return this.pushStack(e, a, P.call(arguments).join(","))
                }
            }),
            f.extend({
                filter: function (a, b, c) {
                    c && (a = ":not(" + a + ")");
                    return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
                },
                dir: function (a, c, d) {
                    var e = []
                        , g = a[c];
                    while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d)))
                        g.nodeType === 1 && e.push(g),
                            g = g[c];
                    return e
                },
                nth: function (a, b, c, d) {
                    b = b || 1;
                    var e = 0;
                    for (; a; a = a[c])
                        if (a.nodeType === 1 && ++e === b)
                            break;
                    return a
                },
                sibling: function (a, b) {
                    var c = [];
                    for (; a; a = a.nextSibling)
                        a.nodeType === 1 && a !== b && c.push(a);
                    return c
                }
            });
        var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
            , W = / jQuery\d+="(?:\d+|null)"/g
            , X = /^\s+/
            , Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
            , Z = /<([\w:]+)/
            , $ = /<tbody/i
            , _ = /<|&#?\w+;/
            , ba = /<(?:script|style)/i
            , bb = /<(?:script|object|embed|option|style)/i
            , bc = new RegExp("<(?:" + V + ")", "i")
            , bd = /checked\s*(?:[^=]|=\s*.checked.)/i
            , be = /\/(java|ecma)script/i
            , bf = /^\s*<!(?:\[CDATA\[|\-\-)/
            , bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }
            , bh = U(c);
        bg.optgroup = bg.option,
            bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead,
            bg.th = bg.td,
        f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]),
            f.fn.extend({
                text: function (a) {
                    if (f.isFunction(a))
                        return this.each(function (b) {
                            var c = f(this);
                            c.text(a.call(this, b, c.text()))
                        });
                    if (typeof a != "object" && a !== b)
                        return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
                    return f.text(this)
                },
                wrapAll: function (a) {
                    if (f.isFunction(a))
                        return this.each(function (b) {
                            f(this).wrapAll(a.call(this, b))
                        });
                    if (this[0]) {
                        var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]),
                            b.map(function () {
                                var a = this;
                                while (a.firstChild && a.firstChild.nodeType === 1)
                                    a = a.firstChild;
                                return a
                            }).append(this)
                    }
                    return this
                },
                wrapInner: function (a) {
                    if (f.isFunction(a))
                        return this.each(function (b) {
                            f(this).wrapInner(a.call(this, b))
                        });
                    return this.each(function () {
                        var b = f(this)
                            , c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function (a) {
                    var b = f.isFunction(a);
                    return this.each(function (c) {
                        f(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function () {
                    return this.parent().each(function () {
                        f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
                    }).end()
                },
                append: function () {
                    return this.domManip(arguments, !0, function (a) {
                        this.nodeType === 1 && this.appendChild(a)
                    })
                },
                prepend: function () {
                    return this.domManip(arguments, !0, function (a) {
                        this.nodeType === 1 && this.insertBefore(a, this.firstChild)
                    })
                },
                before: function () {
                    if (this[0] && this[0].parentNode)
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this)
                        });
                    if (arguments.length) {
                        var a = f.clean(arguments);
                        a.push.apply(a, this.toArray());
                        return this.pushStack(a, "before", arguments)
                    }
                },
                after: function () {
                    if (this[0] && this[0].parentNode)
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this.nextSibling)
                        });
                    if (arguments.length) {
                        var a = this.pushStack(this, "after", arguments);
                        a.push.apply(a, f.clean(arguments));
                        return a
                    }
                },
                remove: function (a, b) {
                    for (var c = 0, d; (d = this[c]) != null; c++)
                        if (!a || f.filter(a, [d]).length)
                            !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")),
                                f.cleanData([d])),
                            d.parentNode && d.parentNode.removeChild(d);
                    return this
                },
                empty: function () {
                    for (var a = 0, b; (b = this[a]) != null; a++) {
                        b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                        while (b.firstChild)
                            b.removeChild(b.firstChild)
                    }
                    return this
                },
                clone: function (a, b) {
                    a = a == null ? !1 : a,
                        b = b == null ? a : b;
                    return this.map(function () {
                        return f.clone(this, a, b)
                    })
                },
                html: function (a) {
                    if (a === b)
                        return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
                    if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(Y, "<$1></$2>");
                        try {
                            for (var c = 0, d = this.length; c < d; c++)
                                this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")),
                                    this[c].innerHTML = a)
                        } catch (e) {
                            this.empty().append(a)
                        }
                    } else
                        f.isFunction(a) ? this.each(function (b) {
                            var c = f(this);
                            c.html(a.call(this, b, c.html()))
                        }) : this.empty().append(a);
                    return this
                },
                replaceWith: function (a) {
                    if (this[0] && this[0].parentNode) {
                        if (f.isFunction(a))
                            return this.each(function (b) {
                                var c = f(this)
                                    , d = c.html();
                                c.replaceWith(a.call(this, b, d))
                            });
                        typeof a != "string" && (a = f(a).detach());
                        return this.each(function () {
                            var b = this.nextSibling
                                , c = this.parentNode;
                            f(this).remove(),
                                b ? f(b).before(a) : f(c).append(a)
                        })
                    }
                    return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
                },
                detach: function (a) {
                    return this.remove(a, !0)
                },
                domManip: function (a, c, d) {
                    var e, g, h, i, j = a[0], k = [];
                    if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j))
                        return this.each(function () {
                            f(this).domManip(a, c, d, !0)
                        });
                    if (f.isFunction(j))
                        return this.each(function (e) {
                            var g = f(this);
                            a[0] = j.call(this, e, c ? g.html() : b),
                                g.domManip(a, c, d)
                        });
                    if (this[0]) {
                        i = j && j.parentNode,
                            f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                                fragment: i
                            } : e = f.buildFragment(a, this, k),
                            h = e.fragment,
                            h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                        if (g) {
                            c = c && f.nodeName(g, "tr");
                            for (var l = 0, m = this.length, n = m - 1; l < m; l++)
                                d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                        }
                        k.length && f.each(k, bp)
                    }
                    return this
                }
            }),
            f.buildFragment = function (a, b, d) {
                var e, g, h, i, j = a[0];
                b && b[0] && (i = b[0].ownerDocument || b[0]),
                i.createDocumentFragment || (i = c),
                a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0,
                    h = f.fragments[j],
                h && h !== 1 && (e = h)),
                e || (e = i.createDocumentFragment(),
                    f.clean(a, i, e, d)),
                g && (f.fragments[j] = h ? e : 1);
                return {
                    fragment: e,
                    cacheable: g
                }
            }
            ,
            f.fragments = {},
            f.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (a, b) {
                f.fn[a] = function (c) {
                    var d = []
                        , e = f(c)
                        , g = this.length === 1 && this[0].parentNode;
                    if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                        e[b](this[0]);
                        return this
                    }
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = (h > 0 ? this.clone(!0) : this).get();
                        f(e[h])[b](j),
                            d = d.concat(j)
                    }
                    return this.pushStack(d, a, e.selector)
                }
            }),
            f.extend({
                clone: function (a, b, c) {
                    var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
                    if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                        bk(a, h),
                            d = bl(a),
                            e = bl(h);
                        for (g = 0; d[g]; ++g)
                            e[g] && bk(d[g], e[g])
                    }
                    if (b) {
                        bj(a, h);
                        if (c) {
                            d = bl(a),
                                e = bl(h);
                            for (g = 0; d[g]; ++g)
                                bj(d[g], e[g])
                        }
                    }
                    d = e = null;
                    return h
                },
                clean: function (a, b, d, e) {
                    var g;
                    b = b || c,
                    typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
                    var h = [], i;
                    for (var j = 0, k; (k = a[j]) != null; j++) {
                        typeof k == "number" && (k += "");
                        if (!k)
                            continue;
                        if (typeof k == "string")
                            if (!_.test(k))
                                k = b.createTextNode(k);
                            else {
                                k = k.replace(Y, "<$1></$2>");
                                var l = (Z.exec(k) || ["", ""])[1].toLowerCase()
                                    , m = bg[l] || bg._default
                                    , n = m[0]
                                    , o = b.createElement("div");
                                b === c ? bh.appendChild(o) : U(b).appendChild(o),
                                    o.innerHTML = m[1] + k + m[2];
                                while (n--)
                                    o = o.lastChild;
                                if (!f.support.tbody) {
                                    var p = $.test(k)
                                        , q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                                    for (i = q.length - 1; i >= 0; --i)
                                        f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                                }
                                !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild),
                                    k = o.childNodes
                            }
                        var r;
                        if (!f.support.appendChecked)
                            if (k[0] && typeof (r = k.length) == "number")
                                for (i = 0; i < r; i++)
                                    bn(k[i]);
                            else
                                bn(k);
                        k.nodeType ? h.push(k) : h = f.merge(h, k)
                    }
                    if (d) {
                        g = function (a) {
                            return !a.type || be.test(a.type)
                        }
                        ;
                        for (j = 0; h[j]; j++)
                            if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript"))
                                e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
                            else {
                                if (h[j].nodeType === 1) {
                                    var s = f.grep(h[j].getElementsByTagName("script"), g);
                                    h.splice.apply(h, [j + 1, 0].concat(s))
                                }
                                d.appendChild(h[j])
                            }
                    }
                    return h
                },
                cleanData: function (a) {
                    var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
                    for (var h = 0, i; (i = a[h]) != null; h++) {
                        if (i.nodeName && f.noData[i.nodeName.toLowerCase()])
                            continue;
                        c = i[f.expando];
                        if (c) {
                            b = d[c];
                            if (b && b.events) {
                                for (var j in b.events)
                                    e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                                b.handle && (b.handle.elem = null)
                            }
                            g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando),
                                delete d[c]
                        }
                    }
                }
            });
        var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, bx = ["Left", "Right"], by = ["Top", "Bottom"], bz, bA, bB;
        f.fn.css = function (a, c) {
            if (arguments.length === 2 && c === b)
                return this;
            return f.access(this, a, c, !0, function (a, c, d) {
                return d !== b ? f.style(a, c, d) : f.css(a, c)
            })
        }
            ,
            f.extend({
                cssHooks: {
                    opacity: {
                        get: function (a, b) {
                            if (b) {
                                var c = bz(a, "opacity", "opacity");
                                return c === "" ? "1" : c
                            }
                            return a.style.opacity
                        }
                    }
                },
                cssNumber: {
                    fillOpacity: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function (a, c, d, e) {
                    if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                        var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                        c = f.cssProps[i] || i;
                        if (d === b) {
                            if (k && "get" in k && (g = k.get(a, !1, e)) !== b)
                                return g;
                            return j[c]
                        }
                        h = typeof d,
                        h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)),
                            h = "number");
                        if (d == null || h === "number" && isNaN(d))
                            return;
                        h === "number" && !f.cssNumber[i] && (d += "px");
                        if (!k || !("set" in k) || (d = k.set(a, d)) !== b)
                            try {
                                j[c] = d
                            } catch (l) {
                            }
                    }
                },
                css: function (a, c, d) {
                    var e, g;
                    c = f.camelCase(c),
                        g = f.cssHooks[c],
                        c = f.cssProps[c] || c,
                    c === "cssFloat" && (c = "float");
                    if (g && "get" in g && (e = g.get(a, !0, d)) !== b)
                        return e;
                    if (bz)
                        return bz(a, c)
                },
                swap: function (a, b, c) {
                    var d = {};
                    for (var e in b)
                        d[e] = a.style[e],
                            a.style[e] = b[e];
                    c.call(a);
                    for (e in b)
                        a.style[e] = d[e]
                }
            }),
            f.curCSS = f.css,
            f.each(["height", "width"], function (a, b) {
                f.cssHooks[b] = {
                    get: function (a, c, d) {
                        var e;
                        if (c) {
                            if (a.offsetWidth !== 0)
                                return bC(a, b, d);
                            f.swap(a, bw, function () {
                                e = bC(a, b, d)
                            });
                            return e
                        }
                    },
                    set: function (a, b) {
                        if (!bt.test(b))
                            return b;
                        b = parseFloat(b);
                        if (b >= 0)
                            return b + "px"
                    }
                }
            }),
        f.support.opacity || (f.cssHooks.opacity = {
            get: function (a, b) {
                return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
            },
            set: function (a, b) {
                var c = a.style
                    , d = a.currentStyle
                    , e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : ""
                    , g = d && d.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                    c.removeAttribute("filter");
                    if (d && !d.filter)
                        return
                }
                c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
            }
        }),
            f(function () {
                f.support.reliableMarginRight || (f.cssHooks.marginRight = {
                    get: function (a, b) {
                        var c;
                        f.swap(a, {
                            display: "inline-block"
                        }, function () {
                            b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                        });
                        return c
                    }
                })
            }),
        c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
                var c, d, e;
                b = b.replace(bs, "-$1").toLowerCase(),
                (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b),
                c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
                return c
            }
        ),
        c.documentElement.currentStyle && (bB = function (a, b) {
                var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
                f === null && g && (e = g[b]) && (f = e),
                !bt.test(f) && bu.test(f) && (c = g.left,
                    d = a.runtimeStyle && a.runtimeStyle.left,
                d && (a.runtimeStyle.left = a.currentStyle.left),
                    g.left = b === "fontSize" ? "1em" : f || 0,
                    f = g.pixelLeft + "px",
                    g.left = c,
                d && (a.runtimeStyle.left = d));
                return f === "" ? "auto" : f
            }
        ),
            bz = bA || bB,
        f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
                var b = a.offsetWidth
                    , c = a.offsetHeight;
                return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
            }
                ,
                f.expr.filters.visible = function (a) {
                    return !f.expr.filters.hidden(a)
                }
        );
        var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = ["*/"] + ["*"];
        try {
            bV = e.href
        } catch (bY) {
            bV = c.createElement("a"),
                bV.href = "",
                bV = bV.href
        }
        bW = bR.exec(bV.toLowerCase()) || [],
            f.fn.extend({
                load: function (a, c, d) {
                    if (typeof a != "string" && bS)
                        return bS.apply(this, arguments);
                    if (!this.length)
                        return this;
                    var e = a.indexOf(" ");
                    if (e >= 0) {
                        var g = a.slice(e, a.length);
                        a = a.slice(0, e)
                    }
                    var h = "GET";
                    c && (f.isFunction(c) ? (d = c,
                        c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional),
                        h = "POST"));
                    var i = this;
                    f.ajax({
                        url: a,
                        type: h,
                        dataType: "html",
                        data: c,
                        complete: function (a, b, c) {
                            c = a.responseText,
                            a.isResolved() && (a.done(function (a) {
                                c = a
                            }),
                                i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)),
                            d && i.each(d, [c, b, a])
                        }
                    });
                    return this
                },
                serialize: function () {
                    return f.param(this.serializeArray())
                },
                serializeArray: function () {
                    return this.map(function () {
                        return this.elements ? f.makeArray(this.elements) : this
                    }).filter(function () {
                        return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
                    }).map(function (a, b) {
                        var c = f(this).val();
                        return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                            return {
                                name: b.name,
                                value: a.replace(bF, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(bF, "\r\n")
                        }
                    }).get()
                }
            }),
            f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
                f.fn[b] = function (a) {
                    return this.on(b, a)
                }
            }),
            f.each(["get", "post"], function (a, c) {
                f[c] = function (a, d, e, g) {
                    f.isFunction(d) && (g = g || e,
                        e = d,
                        d = b);
                    return f.ajax({
                        type: c,
                        url: a,
                        data: d,
                        success: e,
                        dataType: g
                    })
                }
            }),
            f.extend({
                getScript: function (a, c) {
                    return f.get(a, b, c, "script")
                },
                getJSON: function (a, b, c) {
                    return f.get(a, b, c, "json")
                },
                ajaxSetup: function (a, b) {
                    b ? b_(a, f.ajaxSettings) : (b = a,
                        a = f.ajaxSettings),
                        b_(a, b);
                    return a
                },
                ajaxSettings: {
                    url: bV,
                    isLocal: bJ.test(bW[1]),
                    global: !0,
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    processData: !0,
                    async: !0,
                    accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        text: "text/plain",
                        json: "application/json, text/javascript",
                        "*": bX
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText"
                    },
                    converters: {
                        "* text": a.String,
                        "text html": !0,
                        "text json": f.parseJSON,
                        "text xml": f.parseXML
                    },
                    flatOptions: {
                        context: !0,
                        url: !0
                    }
                },
                ajaxPrefilter: bZ(bT),
                ajaxTransport: bZ(bU),
                ajax: function (a, c) {
                    function w(a, c, l, m) {
                        if (s !== 2) {
                            s = 2,
                            q && clearTimeout(q),
                                p = b,
                                n = m || "",
                                v.readyState = a > 0 ? 4 : 0;
                            var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                            if (a >= 200 && a < 300 || a === 304) {
                                if (d.ifModified) {
                                    if (y = v.getResponseHeader("Last-Modified"))
                                        f.lastModified[k] = y;
                                    if (z = v.getResponseHeader("Etag"))
                                        f.etag[k] = z
                                }
                                if (a === 304)
                                    w = "notmodified",
                                        o = !0;
                                else
                                    try {
                                        r = cc(d, x),
                                            w = "success",
                                            o = !0
                                    } catch (A) {
                                        w = "parsererror",
                                            u = A
                                    }
                            } else {
                                u = w;
                                if (!w || a)
                                    w = "error",
                                    a < 0 && (a = 0)
                            }
                            v.status = a,
                                v.statusText = "" + (c || w),
                                o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]),
                                v.statusCode(j),
                                j = b,
                            t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]),
                                i.fireWith(e, [v, w]),
                            t && (g.trigger("ajaxComplete", [v, d]),
                            --f.active || f.event.trigger("ajaxStop"))
                        }
                    }

                    typeof a == "object" && (c = a,
                        a = b),
                        c = c || {};
                    var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                        readyState: 0,
                        setRequestHeader: function (a, b) {
                            if (!s) {
                                var c = a.toLowerCase();
                                a = m[c] = m[c] || a,
                                    l[a] = b
                            }
                            return this
                        },
                        getAllResponseHeaders: function () {
                            return s === 2 ? n : null
                        },
                        getResponseHeader: function (a) {
                            var c;
                            if (s === 2) {
                                if (!o) {
                                    o = {};
                                    while (c = bH.exec(n))
                                        o[c[1].toLowerCase()] = c[2]
                                }
                                c = o[a.toLowerCase()]
                            }
                            return c === b ? null : c
                        },
                        overrideMimeType: function (a) {
                            s || (d.mimeType = a);
                            return this
                        },
                        abort: function (a) {
                            a = a || "abort",
                            p && p.abort(a),
                                w(0, a);
                            return this
                        }
                    };
                    h.promise(v),
                        v.success = v.done,
                        v.error = v.fail,
                        v.complete = i.add,
                        v.statusCode = function (a) {
                            if (a) {
                                var b;
                                if (s < 2)
                                    for (b in a)
                                        j[b] = [j[b], a[b]];
                                else
                                    b = a[v.status],
                                        v.then(b, b)
                            }
                            return this
                        }
                        ,
                        d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"),
                        d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP),
                    d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()),
                        d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))),
                    d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)),
                        b$(bT, d, c, v);
                    if (s === 2)
                        return !1;
                    t = d.global,
                        d.type = d.type.toUpperCase(),
                        d.hasContent = !bK.test(d.type),
                    t && f.active++ === 0 && f.event.trigger("ajaxStart");
                    if (!d.hasContent) {
                        d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data,
                            delete d.data),
                            k = d.url;
                        if (d.cache === !1) {
                            var x = f.now()
                                , y = d.url.replace(bQ, "$1_=" + x);
                            d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                        }
                    }
                    (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType),
                    d.ifModified && (k = k || d.url,
                    f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]),
                    f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])),
                        v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
                    for (u in d.headers)
                        v.setRequestHeader(u, d.headers[u]);
                    if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                        v.abort();
                        return !1
                    }
                    for (u in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        v[u](d[u]);
                    p = b$(bU, d, c, v);
                    if (!p)
                        w(-1, "No Transport");
                    else {
                        v.readyState = 1,
                        t && g.trigger("ajaxSend", [v, d]),
                        d.async && d.timeout > 0 && (q = setTimeout(function () {
                            v.abort("timeout")
                        }, d.timeout));
                        try {
                            s = 1,
                                p.send(l, w)
                        } catch (z) {
                            if (s < 2)
                                w(-1, z);
                            else
                                throw z
                        }
                    }
                    return v
                },
                param: function (a, c) {
                    var d = []
                        , e = function (a, b) {
                        b = f.isFunction(b) ? b() : b,
                            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                    c === b && (c = f.ajaxSettings.traditional);
                    if (f.isArray(a) || a.jquery && !f.isPlainObject(a))
                        f.each(a, function () {
                            e(this.name, this.value)
                        });
                    else
                        for (var g in a)
                            ca(g, a[g], c, e);
                    return d.join("&").replace(bD, "+")
                }
            }),
            f.extend({
                active: 0,
                lastModified: {},
                etag: {}
            });
        var cd = f.now()
            , ce = /(\=)\?(&|$)|\?\?/i;
        f.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                return f.expando + "_" + cd++
            }
        }),
            f.ajaxPrefilter("json jsonp", function (b, c, d) {
                var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
                if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
                    var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
                    b.jsonp !== !1 && (j = j.replace(ce, l),
                    b.url === j && (e && (k = k.replace(ce, l)),
                    b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))),
                        b.url = j,
                        b.data = k,
                        a[h] = function (a) {
                            g = [a]
                        }
                        ,
                        d.always(function () {
                            a[h] = i,
                            g && f.isFunction(i) && a[h](g[0])
                        }),
                        b.converters["script json"] = function () {
                            g || f.error(h + " was not called");
                            return g[0]
                        }
                        ,
                        b.dataTypes[0] = "json";
                    return "script"
                }
            }),
            f.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /javascript|ecmascript/
                },
                converters: {
                    "text script": function (a) {
                        f.globalEval(a);
                        return a
                    }
                }
            }),
            f.ajaxPrefilter("script", function (a) {
                a.cache === b && (a.cache = !1),
                a.crossDomain && (a.type = "GET",
                    a.global = !1)
            }),
            f.ajaxTransport("script", function (a) {
                if (a.crossDomain) {
                    var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
                    return {
                        send: function (f, g) {
                            d = c.createElement("script"),
                                d.async = "async",
                            a.scriptCharset && (d.charset = a.scriptCharset),
                                d.src = a.url,
                                d.onload = d.onreadystatechange = function (a, c) {
                                    if (c || !d.readyState || /loaded|complete/.test(d.readyState))
                                        d.onload = d.onreadystatechange = null,
                                        e && d.parentNode && e.removeChild(d),
                                            d = b,
                                        c || g(200, "success")
                                }
                                ,
                                e.insertBefore(d, e.firstChild)
                        },
                        abort: function () {
                            d && d.onload(0, 1)
                        }
                    }
                }
            });
        var cf = a.ActiveXObject ? function () {
            for (var a in ch)
                ch[a](0, 1)
        }
            : !1, cg = 0, ch;
        f.ajaxSettings.xhr = a.ActiveXObject ? function () {
            return !this.isLocal && ci() || cj()
        }
            : ci,
            function (a) {
                f.extend(f.support, {
                    ajax: !!a,
                    cors: !!a && "withCredentials" in a
                })
            }(f.ajaxSettings.xhr()),
        f.support.ajax && f.ajaxTransport(function (c) {
            if (!c.crossDomain || f.support.cors) {
                var d;
                return {
                    send: function (e, g) {
                        var h = c.xhr(), i, j;
                        c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                        if (c.xhrFields)
                            for (j in c.xhrFields)
                                h[j] = c.xhrFields[j];
                        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType),
                        !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (j in e)
                                h.setRequestHeader(j, e[j])
                        } catch (k) {
                        }
                        h.send(c.hasContent && c.data || null),
                            d = function (a, e) {
                                var j, k, l, m, n;
                                try {
                                    if (d && (e || h.readyState === 4)) {
                                        d = b,
                                        i && (h.onreadystatechange = f.noop,
                                        cf && delete ch[i]);
                                        if (e)
                                            h.readyState !== 4 && h.abort();
                                        else {
                                            j = h.status,
                                                l = h.getAllResponseHeaders(),
                                                m = {},
                                                n = h.responseXML,
                                            n && n.documentElement && (m.xml = n),
                                                m.text = h.responseText;
                                            try {
                                                k = h.statusText
                                            } catch (o) {
                                                k = ""
                                            }
                                            !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                        }
                                    }
                                } catch (p) {
                                    e || g(-1, p)
                                }
                                m && g(j, k, m, l)
                            }
                            ,
                            !c.async || h.readyState === 4 ? d() : (i = ++cg,
                            cf && (ch || (ch = {},
                                f(a).unload(cf)),
                                ch[i] = d),
                                h.onreadystatechange = d)
                    },
                    abort: function () {
                        d && d(0, 1)
                    }
                }
            }
        });
        var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cr;
        f.fn.extend({
            show: function (a, b, c) {
                var d, e;
                if (a || a === 0)
                    return this.animate(cu("show", 3), a, b, c);
                for (var g = 0, h = this.length; g < h; g++)
                    d = this[g],
                    d.style && (e = d.style.display,
                    !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""),
                    e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
                for (g = 0; g < h; g++) {
                    d = this[g];
                    if (d.style) {
                        e = d.style.display;
                        if (e === "" || e === "none")
                            d.style.display = f._data(d, "olddisplay") || ""
                    }
                }
                return this
            },
            hide: function (a, b, c) {
                if (a || a === 0)
                    return this.animate(cu("hide", 3), a, b, c);
                var d, e, g = 0, h = this.length;
                for (; g < h; g++)
                    d = this[g],
                    d.style && (e = f.css(d, "display"),
                    e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
                for (g = 0; g < h; g++)
                    this[g].style && (this[g].style.display = "none");
                return this
            },
            _toggle: f.fn.toggle,
            toggle: function (a, b, c) {
                var d = typeof a == "boolean";
                f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                    var b = d ? a : f(this).is(":hidden");
                    f(this)[b ? "show" : "hide"]()
                }) : this.animate(cu("toggle", 3), a, b, c);
                return this
            },
            fadeTo: function (a, b, c, d) {
                return this.filter(":hidden").css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function (a, b, c, d) {
                function g() {
                    e.queue === !1 && f._mark(this);
                    var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
                    b.animatedProperties = {};
                    for (i in a) {
                        g = f.camelCase(i),
                        i !== g && (a[g] = a[i],
                            delete a[i]),
                            h = a[g],
                            f.isArray(h) ? (b.animatedProperties[g] = h[1],
                                h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                        if (h === "hide" && d || h === "show" && !d)
                            return b.complete.call(this);
                        c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY],
                        f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                    }
                    b.overflow != null && (this.style.overflow = "hidden");
                    for (i in a)
                        j = new f.fx(this, b, i),
                            h = a[i],
                            cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0),
                                o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"),
                                    j[o]()) : j[h]()) : (k = co.exec(h),
                                l = j.cur(),
                                k ? (m = parseFloat(k[2]),
                                    n = k[3] || (f.cssNumber[i] ? "" : "px"),
                                n !== "px" && (f.style(this, i, (m || 1) + n),
                                    l = (m || 1) / j.cur() * l,
                                    f.style(this, i, l + n)),
                                k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l),
                                    j.custom(l, m, n)) : j.custom(l, h, ""));
                    return !0
                }

                var e = f.speed(b, c, d);
                if (f.isEmptyObject(a))
                    return this.each(e.complete, [!1]);
                a = f.extend({}, a);
                return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
            },
            stop: function (a, c, d) {
                typeof a != "string" && (d = c,
                    c = a,
                    a = b),
                c && a !== !1 && this.queue(a || "fx", []);
                return this.each(function () {
                    function h(a, b, c) {
                        var e = b[c];
                        f.removeData(a, c, !0),
                            e.stop(d)
                    }

                    var b, c = !1, e = f.timers, g = f._data(this);
                    d || f._unmark(!0, this);
                    if (a == null)
                        for (b in g)
                            g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                    else
                        g[b = a + ".run"] && g[b].stop && h(this, g, b);
                    for (b = e.length; b--;)
                        e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(),
                            c = !0,
                            e.splice(b, 1));
                    (!d || !c) && f.dequeue(this, a)
                })
            }
        }),
            f.each({
                slideDown: cu("show", 1),
                slideUp: cu("hide", 1),
                slideToggle: cu("toggle", 1),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function (a, b) {
                f.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }),
            f.extend({
                speed: function (a, b, c) {
                    var d = a && typeof a == "object" ? f.extend({}, a) : {
                        complete: c || !c && b || f.isFunction(a) && a,
                        duration: a,
                        easing: c && b || b && !f.isFunction(b) && b
                    };
                    d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
                    if (d.queue == null || d.queue === !0)
                        d.queue = "fx";
                    d.old = d.complete,
                        d.complete = function (a) {
                            f.isFunction(d.old) && d.old.call(this),
                                d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
                        }
                    ;
                    return d
                },
                easing: {
                    linear: function (a, b, c, d) {
                        return c + d * a
                    },
                    swing: function (a, b, c, d) {
                        return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
                    }
                },
                timers: [],
                fx: function (a, b, c) {
                    this.options = b,
                        this.elem = a,
                        this.prop = c,
                        b.orig = b.orig || {}
                }
            }),
            f.fx.prototype = {
                update: function () {
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                        (f.fx.step[this.prop] || f.fx.step._default)(this)
                },
                cur: function () {
                    if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null))
                        return this.elem[this.prop];
                    var a, b = f.css(this.elem, this.prop);
                    return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
                },
                custom: function (a, c, d) {
                    function h(a) {
                        return e.step(a)
                    }

                    var e = this
                        , g = f.fx;
                    this.startTime = cr || cs(),
                        this.end = c,
                        this.now = this.start = a,
                        this.pos = this.state = 0,
                        this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"),
                        h.queue = this.options.queue,
                        h.elem = this.elem,
                        h.saveState = function () {
                            e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
                        }
                        ,
                    h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
                },
                show: function () {
                    var a = f._data(this.elem, "fxshow" + this.prop);
                    this.options.orig[this.prop] = a || f.style(this.elem, this.prop),
                        this.options.show = !0,
                        a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
                        f(this.elem).show()
                },
                hide: function () {
                    this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop),
                        this.options.hide = !0,
                        this.custom(this.cur(), 0)
                },
                step: function (a) {
                    var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
                    if (a || e >= i.duration + this.startTime) {
                        this.now = this.end,
                            this.pos = this.state = 1,
                            this.update(),
                            i.animatedProperties[this.prop] = !0;
                        for (b in i.animatedProperties)
                            i.animatedProperties[b] !== !0 && (g = !1);
                        if (g) {
                            i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                                h.style["overflow" + b] = i.overflow[a]
                            }),
                            i.hide && f(h).hide();
                            if (i.hide || i.show)
                                for (b in i.animatedProperties)
                                    f.style(h, b, i.orig[b]),
                                        f.removeData(h, "fxshow" + b, !0),
                                        f.removeData(h, "toggle" + b, !0);
                            d = i.complete,
                            d && (i.complete = !1,
                                d.call(h))
                        }
                        return !1
                    }
                    i.duration == Infinity ? this.now = e : (c = e - this.startTime,
                        this.state = c / i.duration,
                        this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration),
                        this.now = this.start + (this.end - this.start) * this.pos),
                        this.update();
                    return !0
                }
            },
            f.extend(f.fx, {
                tick: function () {
                    var a, b = f.timers, c = 0;
                    for (; c < b.length; c++)
                        a = b[c],
                        !a() && b[c] === a && b.splice(c--, 1);
                    b.length || f.fx.stop()
                },
                interval: 13,
                stop: function () {
                    clearInterval(cp),
                        cp = null
                },
                speeds: {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                step: {
                    opacity: function (a) {
                        f.style(a.elem, "opacity", a.now)
                    },
                    _default: function (a) {
                        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
                    }
                }
            }),
            f.each(["width", "height"], function (a, b) {
                f.fx.step[b] = function (a) {
                    f.style(a.elem, b, Math.max(0, a.now) + a.unit)
                }
            }),
        f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
                return f.grep(f.timers, function (b) {
                    return a === b.elem
                }).length
            }
        );
        var cw = /^t(?:able|d|h)$/i
            , cx = /^(?:body|html)$/i;
        "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
            var b = this[0], c;
            if (a)
                return this.each(function (b) {
                    f.offset.setOffset(this, a, b)
                });
            if (!b || !b.ownerDocument)
                return null;
            if (b === b.ownerDocument.body)
                return f.offset.bodyOffset(b);
            try {
                c = b.getBoundingClientRect()
            } catch (d) {
            }
            var e = b.ownerDocument
                , g = e.documentElement;
            if (!c || !f.contains(g, b))
                return c ? {
                    top: c.top,
                    left: c.left
                } : {
                    top: 0,
                    left: 0
                };
            var h = e.body
                , i = cy(e)
                , j = g.clientTop || h.clientTop || 0
                , k = g.clientLeft || h.clientLeft || 0
                , l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop
                , m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft
                , n = c.top + l - j
                , o = c.left + m - k;
            return {
                top: n,
                left: o
            }
        }
            : f.fn.offset = function (a) {
            var b = this[0];
            if (a)
                return this.each(function (b) {
                    f.offset.setOffset(this, a, b)
                });
            if (!b || !b.ownerDocument)
                return null;
            if (b === b.ownerDocument.body)
                return f.offset.bodyOffset(b);
            var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
            while ((b = b.parentNode) && b !== i && b !== h) {
                if (f.support.fixedPosition && k.position === "fixed")
                    break;
                c = j ? j.getComputedStyle(b, null) : b.currentStyle,
                    l -= b.scrollTop,
                    m -= b.scrollLeft,
                b === d && (l += b.offsetTop,
                    m += b.offsetLeft,
                f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0,
                    m += parseFloat(c.borderLeftWidth) || 0),
                    e = d,
                    d = b.offsetParent),
                f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0,
                    m += parseFloat(c.borderLeftWidth) || 0),
                    k = c
            }
            if (k.position === "relative" || k.position === "static")
                l += i.offsetTop,
                    m += i.offsetLeft;
            f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop),
                m += Math.max(h.scrollLeft, i.scrollLeft));
            return {
                top: l,
                left: m
            }
        }
            ,
            f.offset = {
                bodyOffset: function (a) {
                    var b = a.offsetTop
                        , c = a.offsetLeft;
                    f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0,
                        c += parseFloat(f.css(a, "marginLeft")) || 0);
                    return {
                        top: b,
                        left: c
                    }
                },
                setOffset: function (a, b, c) {
                    var d = f.css(a, "position");
                    d === "static" && (a.style.position = "relative");
                    var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
                    j ? (l = e.position(),
                        m = l.top,
                        n = l.left) : (m = parseFloat(h) || 0,
                        n = parseFloat(i) || 0),
                    f.isFunction(b) && (b = b.call(a, c, g)),
                    b.top != null && (k.top = b.top - g.top + m),
                    b.left != null && (k.left = b.left - g.left + n),
                        "using" in b ? b.using.call(a, k) : e.css(k)
                }
            },
            f.fn.extend({
                position: function () {
                    if (!this[0])
                        return null;
                    var a = this[0]
                        , b = this.offsetParent()
                        , c = this.offset()
                        , d = cx.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                    c.top -= parseFloat(f.css(a, "marginTop")) || 0,
                        c.left -= parseFloat(f.css(a, "marginLeft")) || 0,
                        d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0,
                        d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
                    return {
                        top: c.top - d.top,
                        left: c.left - d.left
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        var a = this.offsetParent || c.body;
                        while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static")
                            a = a.offsetParent;
                        return a
                    })
                }
            }),
            f.each(["Left", "Top"], function (a, c) {
                var d = "scroll" + c;
                f.fn[d] = function (c) {
                    var e, g;
                    if (c === b) {
                        e = this[0];
                        if (!e)
                            return null;
                        g = cy(e);
                        return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
                    }
                    return this.each(function () {
                        g = cy(this),
                            g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
                    })
                }
            }),
            f.each(["Height", "Width"], function (a, c) {
                var d = c.toLowerCase();
                f.fn["inner" + c] = function () {
                    var a = this[0];
                    return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
                }
                    ,
                    f.fn["outer" + c] = function (a) {
                        var b = this[0];
                        return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
                    }
                    ,
                    f.fn[d] = function (a) {
                        var e = this[0];
                        if (!e)
                            return a == null ? null : this;
                        if (f.isFunction(a))
                            return this.each(function (b) {
                                var c = f(this);
                                c[d](a.call(this, b, c[d]()))
                            });
                        if (f.isWindow(e)) {
                            var g = e.document.documentElement["client" + c]
                                , h = e.document.body;
                            return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
                        }
                        if (e.nodeType === 9)
                            return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
                        if (a === b) {
                            var i = f.css(e, d)
                                , j = parseFloat(i);
                            return f.isNumeric(j) ? j : i
                        }
                        return this.css(d, typeof a == "string" ? a : a + "px")
                    }
            }),
            a.jQuery = a.$ = f,
        typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
            return f
        })
    })(window);
(function (c) {
        c.keyMerger = function (g, f) {
            if (g == undefined || g == "") {
                return ""
            }
            var h = /{#([^#}]+)?#}/g
                , d = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
                , i = "var r=[];\n"
                , k = 0;
            var j = function (l, m) {
                m ? (i += l.match(d) ? l + "\n" : "r.push(" + unescape('"' + l.split("|").join("\\u") + '"') + ");\n") : (i += l != "" ? 'r.push("' + l.replace(/"/g, '\\"') + '");\n' : "");
                return j
            };
            while (match = h.exec(g)) {
                j(g.slice(k, match.index))(match[1], true);
                k = match.index + match[0].length
            }
            j(g.substr(k, g.length - k));
            i += 'return r.join("");';
            return new Function(i.replace(/[\r\t\n]/g, "")).apply(f)
        }
        ;
        String.prototype.keyComment = function () {
            if (Object.prototype.toString.call(this) == "[object String]") {
                return keyMerger(this)
            }
        }
        ;
        function b(g) {
            if (g.nodeType == 1) {
                if (g.hasChildNodes()) {
                    var h = g.childNodes;
                    for (var f = 0; f < h.length; f++) {
                        var d = h.item(f);
                        b(d)
                    }
                }
                if (g.tagName == "INPUT") {
                    g.value = g.value.toString().keyComment()
                }
            } else {
                if (g.nodeType == 3) {
                    g.nodeValue = g.nodeValue.toString().keyComment()
                }
            }
        }

        function a() {
            c.onload = function () {
                var d = document.documentElement;
                b(d)
            }
        }

        c.keyMdf = keyMerger;
        c.staticFile = a
    })(window);
/* jQuery v1.7.1 jquery.com | jquery.org/license */
(function (a, b) {
        function cy(a) {
            return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
        }

        function cv(a) {
            if (!ck[a]) {
                var b = c.body
                    , d = f("<" + a + ">").appendTo(b)
                    , e = d.css("display");
                d.remove();
                if (e === "none" || e === "") {
                    cl || (cl = c.createElement("iframe"),
                        cl.frameBorder = cl.width = cl.height = 0),
                        b.appendChild(cl);
                    if (!cm || !cl.createElement) {
                        cm = (cl.contentWindow || cl.contentDocument).document,
                            cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"),
                            cm.close()
                    }
                    d = cm.createElement(a),
                        cm.body.appendChild(d),
                        e = f.css(d, "display"),
                        b.removeChild(cl)
                }
                ck[a] = e
            }
            return ck[a]
        }

        function cu(a, b) {
            var c = {};
            f.each(cq.concat.apply([], cq.slice(0, b)), function () {
                c[this] = a
            });
            return c
        }

        function ct() {
            cr = b
        }

        function cs() {
            setTimeout(ct, 0);
            return cr = f.now()
        }

        function cj() {
            try {
                return new a.ActiveXObject("Microsoft.XMLHTTP")
            } catch (b) {
            }
        }

        function ci() {
            try {
                return new a.XMLHttpRequest
            } catch (b) {
            }
        }

        function cc(a, c) {
            a.dataFilter && (c = a.dataFilter(c, a.dataType));
            var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
            for (g = 1; g < i; g++) {
                if (g === 1) {
                    for (h in a.converters) {
                        typeof h == "string" && (e[h.toLowerCase()] = a.converters[h])
                    }
                }
                l = k,
                    k = d[g];
                if (k === "*") {
                    k = l
                } else {
                    if (l !== "*" && l !== k) {
                        m = l + " " + k,
                            n = e[m] || e["* " + k];
                        if (!n) {
                            p = b;
                            for (o in e) {
                                j = o.split(" ");
                                if (j[0] === l || j[0] === "*") {
                                    p = e[j[1] + " " + k];
                                    if (p) {
                                        o = e[o],
                                            o === !0 ? n = p : p === !0 && (n = o);
                                        break
                                    }
                                }
                            }
                        }
                        !n && !p && f.error("No conversion from " + m.replace(" ", " to ")),
                        n !== !0 && (c = n ? n(c) : p(o(c)))
                    }
                }
            }
            return c
        }

        function cb(a, c, d) {
            var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
            for (i in g) {
                i in d && (c[g[i]] = d[i])
            }
            while (f[0] === "*") {
                f.shift(),
                h === b && (h = a.mimeType || c.getResponseHeader("content-type"))
            }
            if (h) {
                for (i in e) {
                    if (e[i] && e[i].test(h)) {
                        f.unshift(i);
                        break
                    }
                }
            }
            if (f[0] in d) {
                j = f[0]
            } else {
                for (i in d) {
                    if (!f[0] || a.converters[i + " " + f[0]]) {
                        j = i;
                        break
                    }
                    k || (k = i)
                }
                j = j || k
            }
            if (j) {
                j !== f[0] && f.unshift(j);
                return d[j]
            }
        }

        function ca(a, b, c, d) {
            if (f.isArray(b)) {
                f.each(b, function (b, e) {
                    c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
                })
            } else {
                if (!c && b != null && typeof b == "object") {
                    for (var e in b) {
                        ca(a + "[" + e + "]", b[e], c, d)
                    }
                } else {
                    d(a, b)
                }
            }
        }

        function b_(a, c) {
            var d, e, g = f.ajaxSettings.flatOptions || {};
            for (d in c) {
                c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d])
            }
            e && f.extend(!0, a, e)
        }

        function b$(a, c, d, e, f, g) {
            f = f || c.dataTypes[0],
                g = g || {},
                g[f] = !0;
            var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
            for (; i < j && (k || !l); i++) {
                l = h[i](c, d, e),
                typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l),
                    l = b$(a, c, d, e, l, g)))
            }
            (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
            return l
        }

        function bZ(a) {
            return function (b, c) {
                typeof b != "string" && (c = b,
                    b = "*");
                if (f.isFunction(c)) {
                    var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                    for (; e < g; e++) {
                        h = d[e],
                            j = /^\+/.test(h),
                        j && (h = h.substr(1) || "*"),
                            i = a[h] = a[h] || [],
                            i[j ? "unshift" : "push"](c)
                    }
                }
            }
        }

        function bC(a, b, c) {
            var d = b === "width" ? a.offsetWidth : a.offsetHeight
                , e = b === "width" ? bx : by
                , g = 0
                , h = e.length;
            if (d > 0) {
                if (c !== "border") {
                    for (; g < h; g++) {
                        c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0),
                            c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0
                    }
                }
                return d + "px"
            }
            d = bz(a, b, b);
            if (d < 0 || d == null) {
                d = a.style[b] || 0
            }
            d = parseFloat(d) || 0;
            if (c) {
                for (; g < h; g++) {
                    d += parseFloat(f.css(a, "padding" + e[g])) || 0,
                    c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0),
                    c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0)
                }
            }
            return d + "px"
        }

        function bp(a, b) {
            b.src ? f.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")),
            b.parentNode && b.parentNode.removeChild(b)
        }

        function bo(a) {
            var b = c.createElement("div");
            bh.appendChild(b),
                b.innerHTML = a.outerHTML;
            return b.firstChild
        }

        function bn(a) {
            var b = (a.nodeName || "").toLowerCase();
            b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
        }

        function bm(a) {
            if (a.type === "checkbox" || a.type === "radio") {
                a.defaultChecked = a.checked
            }
        }

        function bl(a) {
            return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
        }

        function bk(a, b) {
            var c;
            if (b.nodeType === 1) {
                b.clearAttributes && b.clearAttributes(),
                b.mergeAttributes && b.mergeAttributes(a),
                    c = b.nodeName.toLowerCase();
                if (c === "object") {
                    b.outerHTML = a.outerHTML
                } else {
                    if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                        if (c === "option") {
                            b.selected = a.defaultSelected
                        } else {
                            if (c === "input" || c === "textarea") {
                                b.defaultValue = a.defaultValue
                            }
                        }
                    } else {
                        a.checked && (b.defaultChecked = b.checked = a.checked),
                        b.value !== a.value && (b.value = a.value)
                    }
                }
                b.removeAttribute(f.expando)
            }
        }

        function bj(a, b) {
            if (b.nodeType === 1 && !!f.hasData(a)) {
                var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
                if (i) {
                    delete h.handle,
                        h.events = {};
                    for (c in i) {
                        for (d = 0,
                                 e = i[c].length; d < e; d++) {
                            f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
                        }
                    }
                }
                h.data && (h.data = f.extend({}, h.data))
            }
        }

        function bi(a, b) {
            return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function U(a) {
            var b = V.split("|")
                , c = a.createDocumentFragment();
            if (c.createElement) {
                while (b.length) {
                    c.createElement(b.pop())
                }
            }
            return c
        }

        function T(a, b, c) {
            b = b || 0;
            if (f.isFunction(b)) {
                return f.grep(a, function (a, d) {
                    var e = !!b.call(a, d, a);
                    return e === c
                })
            }
            if (b.nodeType) {
                return f.grep(a, function (a, d) {
                    return a === b === c
                })
            }
            if (typeof b == "string") {
                var d = f.grep(a, function (a) {
                    return a.nodeType === 1
                });
                if (O.test(b)) {
                    return f.filter(b, d, !c)
                }
                b = f.filter(b, d)
            }
            return f.grep(a, function (a, d) {
                return f.inArray(a, b) >= 0 === c
            })
        }

        function S(a) {
            return !a || !a.parentNode || a.parentNode.nodeType === 11
        }

        function K() {
            return !0
        }

        function J() {
            return !1
        }

        function n(a, b, c) {
            var d = b + "defer"
                , e = b + "queue"
                , g = b + "mark"
                , h = f._data(a, d);
            h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
                !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0),
                    h.fire())
            }, 0)
        }

        function m(a) {
            for (var b in a) {
                if (b === "data" && f.isEmptyObject(a[b])) {
                    continue
                }
                if (b !== "toJSON") {
                    return !1
                }
            }
            return !0
        }

        function l(a, c, d) {
            if (d === b && a.nodeType === 1) {
                var e = "data-" + c.replace(k, "-$1").toLowerCase();
                d = a.getAttribute(e);
                if (typeof d == "string") {
                    try {
                        d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                    } catch (g) {
                    }
                    f.data(a, c, d)
                } else {
                    d = b
                }
            }
            return d
        }

        function h(a) {
            var b = g[a] = {}, c, d;
            a = a.split(/\s+/);
            for (c = 0,
                     d = a.length; c < d; c++) {
                b[a[c]] = !0
            }
            return b
        }

        var c = a.document
            , d = a.navigator
            , e = a.location
            , f = function () {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(J, 1);
                        return
                    }
                    e.ready()
                }
            }

            var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
            e.fn = e.prototype = {
                constructor: e,
                init: function (a, d, f) {
                    var g, h, j, k;
                    if (!a) {
                        return this
                    }
                    if (a.nodeType) {
                        this.context = this[0] = a,
                            this.length = 1;
                        return this
                    }
                    if (a === "body" && !d && c.body) {
                        this.context = c,
                            this[0] = c.body,
                            this.selector = a,
                            this.length = 1;
                        return this
                    }
                    if (typeof a == "string") {
                        a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                        if (g && (g[1] || !d)) {
                            if (g[1]) {
                                d = d instanceof e ? d[0] : d,
                                    k = d ? d.ownerDocument || d : c,
                                    j = m.exec(a),
                                    j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])],
                                        e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]),
                                        a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                                return e.merge(this, a)
                            }
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) {
                                    return f.find(a)
                                }
                                this.length = 1,
                                    this[0] = h
                            }
                            this.context = c,
                                this.selector = a;
                            return this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    if (e.isFunction(a)) {
                        return f.ready(a)
                    }
                    a.selector !== b && (this.selector = a.selector,
                        this.context = a.context);
                    return e.makeArray(a, this)
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return F.call(this, 0)
                },
                get: function (a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function (a, b, c) {
                    var d = this.constructor();
                    e.isArray(a) ? E.apply(d, a) : e.merge(d, a),
                        d.prevObject = this,
                        d.context = this.context,
                        b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                    return d
                },
                each: function (a, b) {
                    return e.each(this, a, b)
                },
                ready: function (a) {
                    e.bindReady(),
                        A.add(a);
                    return this
                },
                eq: function (a) {
                    a = +a;
                    return a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function (a) {
                    return this.pushStack(e.map(this, function (b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            },
                e.fn.init.prototype = e.fn,
                e.extend = e.fn.extend = function () {
                    var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
                    typeof i == "boolean" && (l = i,
                        i = arguments[1] || {},
                        j = 2),
                    typeof i != "object" && !e.isFunction(i) && (i = {}),
                    k === j && (i = this,
                        --j);
                    for (; j < k; j++) {
                        if ((a = arguments[j]) != null) {
                            for (c in a) {
                                d = i[c],
                                    f = a[c];
                                if (i === f) {
                                    continue
                                }
                                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1,
                                    h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {},
                                    i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                            }
                        }
                    }
                    return i
                }
                ,
                e.extend({
                    noConflict: function (b) {
                        a.$ === e && (a.$ = g),
                        b && a.jQuery === e && (a.jQuery = f);
                        return e
                    },
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function (a) {
                        a ? e.readyWait++ : e.ready(!0)
                    },
                    ready: function (a) {
                        if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                            if (!c.body) {
                                return setTimeout(e.ready, 1)
                            }
                            e.isReady = !0;
                            if (a !== !0 && --e.readyWait > 0) {
                                return
                            }
                            A.fireWith(c, [e]),
                            e.fn.trigger && e(c).trigger("ready").off("ready")
                        }
                    },
                    bindReady: function () {
                        if (!A) {
                            A = e.Callbacks("once memory");
                            if (c.readyState === "complete") {
                                return setTimeout(e.ready, 1)
                            }
                            if (c.addEventListener) {
                                c.addEventListener("DOMContentLoaded", B, !1),
                                    a.addEventListener("load", e.ready, !1)
                            } else {
                                if (c.attachEvent) {
                                    c.attachEvent("onreadystatechange", B),
                                        a.attachEvent("onload", e.ready);
                                    var b = !1;
                                    try {
                                        b = a.frameElement == null
                                    } catch (d) {
                                    }
                                    c.documentElement.doScroll && b && J()
                                }
                            }
                        }
                    },
                    isFunction: function (a) {
                        return e.type(a) === "function"
                    },
                    isArray: Array.isArray || function (a) {
                        return e.type(a) === "array"
                    }
                    ,
                    isWindow: function (a) {
                        return a && typeof a == "object" && "setInterval" in a
                    },
                    isNumeric: function (a) {
                        return !isNaN(parseFloat(a)) && isFinite(a)
                    },
                    type: function (a) {
                        return a == null ? String(a) : I[C.call(a)] || "object"
                    },
                    isPlainObject: function (a) {
                        if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) {
                            return !1
                        }
                        try {
                            if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) {
                                return !1
                            }
                        } catch (c) {
                            return !1
                        }
                        var d;
                        for (d in a) {
                        }
                        return d === b || D.call(a, d)
                    },
                    isEmptyObject: function (a) {
                        for (var b in a) {
                            return !1
                        }
                        return !0
                    },
                    error: function (a) {
                        throw new Error(a)
                    },
                    parseJSON: function (b) {
                        if (typeof b != "string" || !b) {
                            return null
                        }
                        b = e.trim(b);
                        if (a.JSON && a.JSON.parse) {
                            return a.JSON.parse(b)
                        }
                        if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) {
                            return (new Function("return " + b))()
                        }
                        e.error("Invalid JSON: " + b)
                    },
                    parseXML: function (c) {
                        var d, f;
                        try {
                            a.DOMParser ? (f = new DOMParser,
                                d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                                d.async = "false",
                                d.loadXML(c))
                        } catch (g) {
                            d = b
                        }
                        (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                        return d
                    },
                    noop: function () {
                    },
                    globalEval: function (b) {
                        b && j.test(b) && (a.execScript || function (b) {
                                a.eval.call(a, b)
                            }
                        )(b)
                    },
                    camelCase: function (a) {
                        return a.replace(w, "ms-").replace(v, x)
                    },
                    nodeName: function (a, b) {
                        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                    },
                    each: function (a, c, d) {
                        var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                        if (d) {
                            if (i) {
                                for (f in a) {
                                    if (c.apply(a[f], d) === !1) {
                                        break
                                    }
                                }
                            } else {
                                for (; g < h;) {
                                    if (c.apply(a[g++], d) === !1) {
                                        break
                                    }
                                }
                            }
                        } else {
                            if (i) {
                                for (f in a) {
                                    if (c.call(a[f], f, a[f]) === !1) {
                                        break
                                    }
                                }
                            } else {
                                for (; g < h;) {
                                    if (c.call(a[g], g, a[g++]) === !1) {
                                        break
                                    }
                                }
                            }
                        }
                        return a
                    },
                    trim: G ? function (a) {
                        return a == null ? "" : G.call(a)
                    }
                        : function (a) {
                        return a == null ? "" : (a + "").replace(k, "").replace(l, "")
                    }
                    ,
                    makeArray: function (a, b) {
                        var c = b || [];
                        if (a != null) {
                            var d = e.type(a);
                            a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                        }
                        return c
                    },
                    inArray: function (a, b, c) {
                        var d;
                        if (b) {
                            if (H) {
                                return H.call(b, a, c)
                            }
                            d = b.length,
                                c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                            for (; c < d; c++) {
                                if (c in b && b[c] === a) {
                                    return c
                                }
                            }
                        }
                        return -1
                    },
                    merge: function (a, c) {
                        var d = a.length
                            , e = 0;
                        if (typeof c.length == "number") {
                            for (var f = c.length; e < f; e++) {
                                a[d++] = c[e]
                            }
                        } else {
                            while (c[e] !== b) {
                                a[d++] = c[e++]
                            }
                        }
                        a.length = d;
                        return a
                    },
                    grep: function (a, b, c) {
                        var d = [], e;
                        c = !!c;
                        for (var f = 0, g = a.length; f < g; f++) {
                            e = !!b(a[f], f),
                            c !== e && d.push(a[f])
                        }
                        return d
                    },
                    map: function (a, c, d) {
                        var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                        if (k) {
                            for (; i < j; i++) {
                                f = c(a[i], i, d),
                                f != null && (h[h.length] = f)
                            }
                        } else {
                            for (g in a) {
                                f = c(a[g], g, d),
                                f != null && (h[h.length] = f)
                            }
                        }
                        return h.concat.apply([], h)
                    },
                    guid: 1,
                    proxy: function (a, c) {
                        if (typeof c == "string") {
                            var d = a[c];
                            c = a,
                                a = d
                        }
                        if (!e.isFunction(a)) {
                            return b
                        }
                        var f = F.call(arguments, 2)
                            , g = function () {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                        g.guid = a.guid = a.guid || g.guid || e.guid++;
                        return g
                    },
                    access: function (a, c, d, f, g, h) {
                        var i = a.length;
                        if (typeof c == "object") {
                            for (var j in c) {
                                e.access(a, j, c[j], f, g, d)
                            }
                            return a
                        }
                        if (d !== b) {
                            f = !h && f && e.isFunction(d);
                            for (var k = 0; k < i; k++) {
                                g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h)
                            }
                            return a
                        }
                        return i ? g(a[0], c) : b
                    },
                    now: function () {
                        return (new Date).getTime()
                    },
                    uaMatch: function (a) {
                        a = a.toLowerCase();
                        var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                        return {
                            browser: b[1] || "",
                            version: b[2] || "0"
                        }
                    },
                    sub: function () {
                        function a(b, c) {
                            return new a.fn.init(b, c)
                        }

                        e.extend(!0, a, this),
                            a.superclass = this,
                            a.fn = a.prototype = this(),
                            a.fn.constructor = a,
                            a.sub = this.sub,
                            a.fn.init = function (d, f) {
                                f && f instanceof e && !(f instanceof a) && (f = a(f));
                                return e.fn.init.call(this, d, f, b)
                            }
                            ,
                            a.fn.init.prototype = a.fn;
                        var b = a(c);
                        return a
                    },
                    browser: {}
                }),
                e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
                    I["[object " + b + "]"] = b.toLowerCase()
                }),
                z = e.uaMatch(y),
            z.browser && (e.browser[z.browser] = !0,
                e.browser.version = z.version),
            e.browser.webkit && (e.browser.safari = !0),
            j.test(" ") && (k = /^[\s\xA0]+/,
                l = /[\s\xA0]+$/),
                h = e(c),
                c.addEventListener ? B = function () {
                    c.removeEventListener("DOMContentLoaded", B, !1),
                        e.ready()
                }
                    : c.attachEvent && (B = function () {
                        c.readyState === "complete" && (c.detachEvent("onreadystatechange", B),
                            e.ready())
                    }
                );
            return e
        }()
            , g = {};
        f.Callbacks = function (a) {
            a = a ? g[a] || h(a) : {};
            var c = [], d = [], e, i, j, k, l, m = function (b) {
                var d, e, g, h, i;
                for (d = 0,
                         e = b.length; d < e; d++) {
                    g = b[d],
                        h = f.type(g),
                        h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
                }
            }, n = function (b, f) {
                f = f || [],
                    e = !a.memory || [b, f],
                    i = !0,
                    l = j || 0,
                    j = 0,
                    k = c.length;
                for (; c && l < k; l++) {
                    if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                }
                i = !1,
                c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(),
                    o.fireWith(e[0], e[1])))
            }, o = {
                add: function () {
                    if (c) {
                        var a = c.length;
                        m(arguments),
                            i ? k = c.length : e && e !== !0 && (j = a,
                                n(e[0], e[1]))
                    }
                    return this
                },
                remove: function () {
                    if (c) {
                        var b = arguments
                            , d = 0
                            , e = b.length;
                        for (; d < e; d++) {
                            for (var f = 0; f < c.length; f++) {
                                if (b[d] === c[f]) {
                                    i && f <= k && (k--,
                                    f <= l && l--),
                                        c.splice(f--, 1);
                                    if (a.unique) {
                                        break
                                    }
                                }
                            }
                        }
                    }
                    return this
                },
                has: function (a) {
                    if (c) {
                        var b = 0
                            , d = c.length;
                        for (; b < d; b++) {
                            if (a === c[b]) {
                                return !0
                            }
                        }
                    }
                    return !1
                },
                empty: function () {
                    c = [];
                    return this
                },
                disable: function () {
                    c = d = e = b;
                    return this
                },
                disabled: function () {
                    return !c
                },
                lock: function () {
                    d = b,
                    (!e || e === !0) && o.disable();
                    return this
                },
                locked: function () {
                    return !d
                },
                fireWith: function (b, c) {
                    d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                    return this
                },
                fire: function () {
                    o.fireWith(this, arguments);
                    return this
                },
                fired: function () {
                    return !!e
                }
            };
            return o
        }
        ;
        var i = [].slice;
        f.extend({
            Deferred: function (a) {
                var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                    resolve: b,
                    reject: c,
                    notify: d
                }, h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function () {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    },
                    always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    },
                    pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments),
                                        g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function (a) {
                        if (a == null) {
                            a = h
                        } else {
                            for (var b in h) {
                                a[b] = h[b]
                            }
                        }
                        return a
                    }
                }, i = h.promise({}), j;
                for (j in g) {
                    i[j] = g[j].fire,
                        i[j + "With"] = g[j].fireWith
                }
                i.done(function () {
                    e = "resolved"
                }, c.disable, d.lock).fail(function () {
                    e = "rejected"
                }, b.disable, d.lock),
                a && a.call(i, i);
                return i
            },
            when: function (a) {
                function m(a) {
                    return function (b) {
                        e[a] = arguments.length > 1 ? i.call(arguments, 0) : b,
                            j.notifyWith(k, e)
                    }
                }

                function l(a) {
                    return function (c) {
                        b[a] = arguments.length > 1 ? i.call(arguments, 0) : c,
                        --g || j.resolveWith(j, b)
                    }
                }

                var b = i.call(arguments, 0)
                    , c = 0
                    , d = b.length
                    , e = Array(d)
                    , g = d
                    , h = d
                    , j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred()
                    , k = j.promise();
                if (d > 1) {
                    for (; c < d; c++) {
                        b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g
                    }
                    g || j.resolveWith(j, b)
                } else {
                    j !== a && j.resolveWith(j, d ? [a] : [])
                }
                return k
            }
        }),
            f.support = function () {
                var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
                q.setAttribute("className", "t"),
                    q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
                    d = q.getElementsByTagName("*"),
                    e = q.getElementsByTagName("a")[0];
                if (!d || !d.length || !e) {
                    return {}
                }
                g = c.createElement("select"),
                    h = g.appendChild(c.createElement("option")),
                    i = q.getElementsByTagName("input")[0],
                    b = {
                        leadingWhitespace: q.firstChild.nodeType === 3,
                        tbody: !q.getElementsByTagName("tbody").length,
                        htmlSerialize: !!q.getElementsByTagName("link").length,
                        style: /top/.test(e.getAttribute("style")),
                        hrefNormalized: e.getAttribute("href") === "/a",
                        opacity: /^0.55/.test(e.style.opacity),
                        cssFloat: !!e.style.cssFloat,
                        checkOn: i.value === "on",
                        optSelected: h.selected,
                        getSetAttribute: q.className !== "t",
                        enctype: !!c.createElement("form").enctype,
                        html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                        submitBubbles: !0,
                        changeBubbles: !0,
                        focusinBubbles: !1,
                        deleteExpando: !0,
                        noCloneEvent: !0,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableMarginRight: !0
                    },
                    i.checked = !0,
                    b.noCloneChecked = i.cloneNode(!0).checked,
                    g.disabled = !0,
                    b.optDisabled = !h.disabled;
                try {
                    delete q.test
                } catch (s) {
                    b.deleteExpando = !1
                }
                !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
                    b.noCloneEvent = !1
                }),
                    q.cloneNode(!0).fireEvent("onclick")),
                    i = c.createElement("input"),
                    i.value = "t",
                    i.setAttribute("type", "radio"),
                    b.radioValue = i.value === "t",
                    i.setAttribute("checked", "checked"),
                    q.appendChild(i),
                    k = c.createDocumentFragment(),
                    k.appendChild(q.lastChild),
                    b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked,
                    b.appendChecked = i.checked,
                    k.removeChild(i),
                    k.appendChild(q),
                    q.innerHTML = "",
                a.getComputedStyle && (j = c.createElement("div"),
                    j.style.width = "0",
                    j.style.marginRight = "0",
                    q.style.width = "2px",
                    q.appendChild(j),
                    b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
                            marginRight: 0
                        }).marginRight, 10) || 0) === 0);
                if (q.attachEvent) {
                    for (o in {
                        submit: 1,
                        change: 1,
                        focusin: 1
                    }) {
                        n = "on" + o,
                            p = n in q,
                        p || (q.setAttribute(n, "return;"),
                            p = typeof q[n] == "function"),
                            b[o + "Bubbles"] = p
                    }
                }
                k.removeChild(q),
                    k = g = h = j = q = i = null,
                    f(function () {
                        var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
                        !r || (j = 1,
                            k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
                            m = "visibility:hidden;border:0;",
                            n = "style='" + k + "border:5px solid #000;padding:0;'",
                            o = "<div " + n + "><div></div></div><table " + n + " cellpadding='0' cellspacing='0'><tr><td></td></tr></table>",
                            a = c.createElement("div"),
                            a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px",
                            r.insertBefore(a, r.firstChild),
                            q = c.createElement("div"),
                            a.appendChild(q),
                            q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",
                            l = q.getElementsByTagName("td"),
                            p = l[0].offsetHeight === 0,
                            l[0].style.display = "",
                            l[1].style.display = "none",
                            b.reliableHiddenOffsets = p && l[0].offsetHeight === 0,
                            q.innerHTML = "",
                            q.style.width = q.style.paddingLeft = "1px",
                            f.boxModel = b.boxModel = q.offsetWidth === 2,
                        typeof q.style.zoom != "undefined" && (q.style.display = "inline",
                            q.style.zoom = 1,
                            b.inlineBlockNeedsLayout = q.offsetWidth === 2,
                            q.style.display = "",
                            q.innerHTML = "<div style='width:4px;'></div>",
                            b.shrinkWrapBlocks = q.offsetWidth !== 2),
                            q.style.cssText = k + m,
                            q.innerHTML = o,
                            d = q.firstChild,
                            e = d.firstChild,
                            h = d.nextSibling.firstChild.firstChild,
                            i = {
                                doesNotAddBorder: e.offsetTop !== 5,
                                doesAddBorderForTableAndCells: h.offsetTop === 5
                            },
                            e.style.position = "fixed",
                            e.style.top = "20px",
                            i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15,
                            e.style.position = e.style.top = "",
                            d.style.overflow = "hidden",
                            d.style.position = "relative",
                            i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5,
                            i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j,
                            r.removeChild(a),
                            q = a = null,
                            f.extend(b, i))
                    });
                return b
            }();
        var j = /^(?:\{.*\}|\[.*\])$/
            , k = /([A-Z])/g;
        f.extend({
            cache: {},
            uuid: 0,
            expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: !0
            },
            hasData: function (a) {
                a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
                return !!a && !m(a)
            },
            data: function (a, c, d, e) {
                if (!!f.acceptData(a)) {
                    var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
                    if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) {
                        return
                    }
                    n || (l ? a[j] = n = ++f.uuid : n = j),
                    m[n] || (m[n] = {},
                    l || (m[n].toJSON = f.noop));
                    if (typeof c == "object" || typeof c == "function") {
                        e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c)
                    }
                    g = h = m[n],
                    e || (h.data || (h.data = {}),
                        h = h.data),
                    d !== b && (h[f.camelCase(c)] = d);
                    if (o && !h[c]) {
                        return g.events
                    }
                    k ? (i = h[c],
                    i == null && (i = h[f.camelCase(c)])) : i = h;
                    return i
                }
            },
            removeData: function (a, b, c) {
                if (!!f.acceptData(a)) {
                    var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                    if (!j[k]) {
                        return
                    }
                    if (b) {
                        d = c ? j[k] : j[k].data;
                        if (d) {
                            f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b),
                                b in d ? b = [b] : b = b.split(" ")));
                            for (e = 0,
                                     g = b.length; e < g; e++) {
                                delete d[b[e]]
                            }
                            if (!(c ? m : f.isEmptyObject)(d)) {
                                return
                            }
                        }
                    }
                    if (!c) {
                        delete j[k].data;
                        if (!m(j[k])) {
                            return
                        }
                    }
                    f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null,
                    i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
                }
            },
            _data: function (a, b, c) {
                return f.data(a, b, c, !0)
            },
            acceptData: function (a) {
                if (a.nodeName) {
                    var b = f.noData[a.nodeName.toLowerCase()];
                    if (b) {
                        return b !== !0 && a.getAttribute("classid") === b
                    }
                }
                return !0
            }
        }),
            f.fn.extend({
                data: function (a, c) {
                    var d, e, g, h = null;
                    if (typeof a == "undefined") {
                        if (this.length) {
                            h = f.data(this[0]);
                            if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                                e = this[0].attributes;
                                for (var i = 0, j = e.length; i < j; i++) {
                                    g = e[i].name,
                                    g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)),
                                        l(this[0], g, h[g]))
                                }
                                f._data(this[0], "parsedAttrs", !0)
                            }
                        }
                        return h
                    }
                    if (typeof a == "object") {
                        return this.each(function () {
                            f.data(this, a)
                        })
                    }
                    d = a.split("."),
                        d[1] = d[1] ? "." + d[1] : "";
                    if (c === b) {
                        h = this.triggerHandler("getData" + d[1] + "!", [d[0]]),
                        h === b && this.length && (h = f.data(this[0], a),
                            h = l(this[0], a, h));
                        return h === b && d[1] ? this.data(d[0]) : h
                    }
                    return this.each(function () {
                        var b = f(this)
                            , e = [d[0], c];
                        b.triggerHandler("setData" + d[1] + "!", e),
                            f.data(this, a, c),
                            b.triggerHandler("changeData" + d[1] + "!", e)
                    })
                },
                removeData: function (a) {
                    return this.each(function () {
                        f.removeData(this, a)
                    })
                }
            }),
            f.extend({
                _mark: function (a, b) {
                    a && (b = (b || "fx") + "mark",
                        f._data(a, b, (f._data(a, b) || 0) + 1))
                },
                _unmark: function (a, b, c) {
                    a !== !0 && (c = b,
                        b = a,
                        a = !1);
                    if (b) {
                        c = c || "fx";
                        var d = c + "mark"
                            , e = a ? 0 : (f._data(b, d) || 1) - 1;
                        e ? f._data(b, d, e) : (f.removeData(b, d, !0),
                            n(b, c, "mark"))
                    }
                },
                queue: function (a, b, c) {
                    var d;
                    if (a) {
                        b = (b || "fx") + "queue",
                            d = f._data(a, b),
                        c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                        return d || []
                    }
                },
                dequeue: function (a, b) {
                    b = b || "fx";
                    var c = f.queue(a, b)
                        , d = c.shift()
                        , e = {};
                    d === "inprogress" && (d = c.shift()),
                    d && (b === "fx" && c.unshift("inprogress"),
                        f._data(a, b + ".run", e),
                        d.call(a, function () {
                            f.dequeue(a, b)
                        }, e)),
                    c.length || (f.removeData(a, b + "queue " + b + ".run", !0),
                        n(a, b, "queue"))
                }
            }),
            f.fn.extend({
                queue: function (a, c) {
                    typeof a != "string" && (c = a,
                        a = "fx");
                    if (c === b) {
                        return f.queue(this[0], a)
                    }
                    return this.each(function () {
                        var b = f.queue(this, a, c);
                        a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
                    })
                },
                dequeue: function (a) {
                    return this.each(function () {
                        f.dequeue(this, a)
                    })
                },
                delay: function (a, b) {
                    a = f.fx ? f.fx.speeds[a] || a : a,
                        b = b || "fx";
                    return this.queue(b, function (b, c) {
                        var d = setTimeout(b, a);
                        c.stop = function () {
                            clearTimeout(d)
                        }
                    })
                },
                clearQueue: function (a) {
                    return this.queue(a || "fx", [])
                },
                promise: function (a, c) {
                    function m() {
                        --h || d.resolveWith(e, [e])
                    }

                    typeof a != "string" && (c = a,
                        a = b),
                        a = a || "fx";
                    var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
                    while (g--) {
                        if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) {
                            h++,
                                l.add(m)
                        }
                    }
                    m();
                    return d.promise()
                }
            });
        var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
        f.fn.extend({
            attr: function (a, b) {
                return f.access(this, a, b, !0, f.attr)
            },
            removeAttr: function (a) {
                return this.each(function () {
                    f.removeAttr(this, a)
                })
            },
            prop: function (a, b) {
                return f.access(this, a, b, !0, f.prop)
            },
            removeProp: function (a) {
                a = f.propFix[a] || a;
                return this.each(function () {
                    try {
                        this[a] = b,
                            delete this[a]
                    } catch (c) {
                    }
                })
            },
            addClass: function (a) {
                var b, c, d, e, g, h, i;
                if (f.isFunction(a)) {
                    return this.each(function (b) {
                        f(this).addClass(a.call(this, b, this.className))
                    })
                }
                if (a && typeof a == "string") {
                    b = a.split(p);
                    for (c = 0,
                             d = this.length; c < d; c++) {
                        e = this[c];
                        if (e.nodeType === 1) {
                            if (!e.className && b.length === 1) {
                                e.className = a
                            } else {
                                g = " " + e.className + " ";
                                for (h = 0,
                                         i = b.length; h < i; h++) {
                                    ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ")
                                }
                                e.className = f.trim(g)
                            }
                        }
                    }
                }
                return this
            },
            removeClass: function (a) {
                var c, d, e, g, h, i, j;
                if (f.isFunction(a)) {
                    return this.each(function (b) {
                        f(this).removeClass(a.call(this, b, this.className))
                    })
                }
                if (a && typeof a == "string" || a === b) {
                    c = (a || "").split(p);
                    for (d = 0,
                             e = this.length; d < e; d++) {
                        g = this[d];
                        if (g.nodeType === 1 && g.className) {
                            if (a) {
                                h = (" " + g.className + " ").replace(o, " ");
                                for (i = 0,
                                         j = c.length; i < j; i++) {
                                    h = h.replace(" " + c[i] + " ", " ")
                                }
                                g.className = f.trim(h)
                            } else {
                                g.className = ""
                            }
                        }
                    }
                }
                return this
            },
            toggleClass: function (a, b) {
                var c = typeof a
                    , d = typeof b == "boolean";
                if (f.isFunction(a)) {
                    return this.each(function (c) {
                        f(this).toggleClass(a.call(this, c, this.className, b), b)
                    })
                }
                return this.each(function () {
                    if (c === "string") {
                        var e, g = 0, h = f(this), i = b, j = a.split(p);
                        while (e = j[g++]) {
                            i = d ? i : !h.hasClass(e),
                                h[i ? "addClass" : "removeClass"](e)
                        }
                    } else {
                        if (c === "undefined" || c === "boolean") {
                            this.className && f._data(this, "__className__", this.className),
                                this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
                        }
                    }
                })
            },
            hasClass: function (a) {
                var b = " " + a + " "
                    , c = 0
                    , d = this.length;
                for (; c < d; c++) {
                    if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) {
                        return !0
                    }
                }
                return !1
            },
            val: function (a) {
                var c, d, e, g = this[0];
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a,
                                h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                    return a == null ? "" : a + ""
                                })),
                                c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) {
                                this.value = h
                            }
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) {
                        return d
                    }
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }),
            f.extend({
                valHooks: {
                    option: {
                        get: function (a) {
                            var b = a.attributes.value;
                            return !b || b.specified ? a.value : a.text
                        }
                    },
                    select: {
                        get: function (a) {
                            var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                            if (g < 0) {
                                return null
                            }
                            c = j ? g : 0,
                                d = j ? g + 1 : i.length;
                            for (; c < d; c++) {
                                e = i[c];
                                if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                                    b = f(e).val();
                                    if (j) {
                                        return b
                                    }
                                    h.push(b)
                                }
                            }
                            if (j && !h.length && i.length) {
                                return f(i[g]).val()
                            }
                            return h
                        },
                        set: function (a, b) {
                            var c = f.makeArray(b);
                            f(a).find("option").each(function () {
                                this.selected = f.inArray(f(this).val(), c) >= 0
                            }),
                            c.length || (a.selectedIndex = -1);
                            return c
                        }
                    }
                },
                attrFn: {
                    val: !0,
                    css: !0,
                    html: !0,
                    text: !0,
                    data: !0,
                    width: !0,
                    height: !0,
                    offset: !0
                },
                attr: function (a, c, d, e) {
                    var g, h, i, j = a.nodeType;
                    if (!!a && j !== 3 && j !== 8 && j !== 2) {
                        if (e && c in f.attrFn) {
                            return f(a)[c](d)
                        }
                        if (typeof a.getAttribute == "undefined") {
                            return f.prop(a, c, d)
                        }
                        i = j !== 1 || !f.isXMLDoc(a),
                        i && (c = c.toLowerCase(),
                            h = f.attrHooks[c] || (u.test(c) ? x : w));
                        if (d !== b) {
                            if (d === null) {
                                f.removeAttr(a, c);
                                return
                            }
                            if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) {
                                return g
                            }
                            a.setAttribute(c, "" + d);
                            return d
                        }
                        if (h && "get" in h && i && (g = h.get(a, c)) !== null) {
                            return g
                        }
                        g = a.getAttribute(c);
                        return g === null ? b : g
                    }
                },
                removeAttr: function (a, b) {
                    var c, d, e, g, h = 0;
                    if (b && a.nodeType === 1) {
                        d = b.toLowerCase().split(p),
                            g = d.length;
                        for (; h < g; h++) {
                            e = d[h],
                            e && (c = f.propFix[e] || e,
                                f.attr(a, e, ""),
                                a.removeAttribute(v ? e : c),
                            u.test(e) && c in a && (a[c] = !1))
                        }
                    }
                },
                attrHooks: {
                    type: {
                        set: function (a, b) {
                            if (r.test(a.nodeName) && a.parentNode) {
                                f.error("type property can't be changed")
                            } else {
                                if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                                    var c = a.value;
                                    a.setAttribute("type", b),
                                    c && (a.value = c);
                                    return b
                                }
                            }
                        }
                    },
                    value: {
                        get: function (a, b) {
                            if (w && f.nodeName(a, "button")) {
                                return w.get(a, b)
                            }
                            return b in a ? a.value : null
                        },
                        set: function (a, b, c) {
                            if (w && f.nodeName(a, "button")) {
                                return w.set(a, b, c)
                            }
                            a.value = b
                        }
                    }
                },
                propFix: {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                prop: function (a, c, d) {
                    var e, g, h, i = a.nodeType;
                    if (!!a && i !== 3 && i !== 8 && i !== 2) {
                        h = i !== 1 || !f.isXMLDoc(a),
                        h && (c = f.propFix[c] || c,
                            g = f.propHooks[c]);
                        return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
                    }
                },
                propHooks: {
                    tabIndex: {
                        get: function (a) {
                            var c = a.getAttributeNode("tabindex");
                            return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                        }
                    }
                }
            }),
            f.attrHooks.tabindex = f.propHooks.tabIndex,
            x = {
                get: function (a, c) {
                    var d, e = f.prop(a, c);
                    return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
                },
                set: function (a, b, c) {
                    var d;
                    b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c,
                    d in a && (a[d] = !0),
                        a.setAttribute(c, c.toLowerCase()));
                    return c
                }
            },
        v || (y = {
            name: !0,
            id: !0
        },
            w = f.valHooks.button = {
                get: function (a, c) {
                    var d;
                    d = a.getAttributeNode(c);
                    return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
                },
                set: function (a, b, d) {
                    var e = a.getAttributeNode(d);
                    e || (e = c.createAttribute(d),
                        a.setAttributeNode(e));
                    return e.nodeValue = b + ""
                }
            },
            f.attrHooks.tabindex.set = w.set,
            f.each(["width", "height"], function (a, b) {
                f.attrHooks[b] = f.extend(f.attrHooks[b], {
                    set: function (a, c) {
                        if (c === "") {
                            a.setAttribute(b, "auto");
                            return c
                        }
                    }
                })
            }),
            f.attrHooks.contenteditable = {
                get: w.get,
                set: function (a, b, c) {
                    b === "" && (b = "false"),
                        w.set(a, b, c)
                }
            }),
        f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
            f.attrHooks[c] = f.extend(f.attrHooks[c], {
                get: function (a) {
                    var d = a.getAttribute(c, 2);
                    return d === null ? b : d
                }
            })
        }),
        f.support.style || (f.attrHooks.style = {
            get: function (a) {
                return a.style.cssText.toLowerCase() || b
            },
            set: function (a, b) {
                return a.style.cssText = "" + b
            }
        }),
        f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
            get: function (a) {
                var b = a.parentNode;
                b && (b.selectedIndex,
                b.parentNode && b.parentNode.selectedIndex);
                return null
            }
        })),
        f.support.enctype || (f.propFix.enctype = "encoding"),
        f.support.checkOn || f.each(["radio", "checkbox"], function () {
            f.valHooks[this] = {
                get: function (a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
            }
        }),
            f.each(["radio", "checkbox"], function () {
                f.valHooks[this] = f.extend(f.valHooks[this], {
                    set: function (a, b) {
                        if (f.isArray(b)) {
                            return a.checked = f.inArray(f(a).val(), b) >= 0
                        }
                    }
                })
            });
        var z = /^(?:textarea|input|select)$/i
            , A = /^([^\.]*)?(?:\.(.+))?$/
            , B = /\bhover(\.\S+)?\b/
            , C = /^key/
            , D = /^(?:mouse|contextmenu)|click/
            , E = /^(?:focusinfocus|focusoutblur)$/
            , F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/
            , G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(),
                b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }
            , H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }
            , I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
        f.event = {
            add: function (a, c, d, e, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s;
                if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                    d.handler && (p = d,
                        d = p.handler),
                    d.guid || (d.guid = f.guid++),
                        j = h.events,
                    j || (h.events = j = {}),
                        i = h.handle,
                    i || (h.handle = i = function (a) {
                        return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                    }
                        ,
                        i.elem = a),
                        c = f.trim(I(c)).split(" ");
                    for (k = 0; k < c.length; k++) {
                        l = A.exec(c[k]) || [],
                            m = l[1],
                            n = (l[2] || "").split(".").sort(),
                            s = f.event.special[m] || {},
                            m = (g ? s.delegateType : s.bindType) || m,
                            s = f.event.special[m] || {},
                            o = f.extend({
                                type: m,
                                origType: l[1],
                                data: e,
                                handler: d,
                                guid: d.guid,
                                selector: g,
                                quick: G(g),
                                namespace: n.join(".")
                            }, p),
                            r = j[m];
                        if (!r) {
                            r = j[m] = [],
                                r.delegateCount = 0;
                            if (!s.setup || s.setup.call(a, e, n, i) === !1) {
                                a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                            }
                        }
                        s.add && (s.add.call(a, o),
                        o.handler.guid || (o.handler.guid = d.guid)),
                            g ? r.splice(r.delegateCount++, 0, o) : r.push(o),
                            f.event.global[m] = !0
                    }
                    a = null
                }
            },
            global: {},
            remove: function (a, b, c, d, e) {
                var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
                if (!!g && !!(o = g.events)) {
                    b = f.trim(I(b || "")).split(" ");
                    for (h = 0; h < b.length; h++) {
                        i = A.exec(b[h]) || [],
                            j = k = i[1],
                            l = i[2];
                        if (!j) {
                            for (j in o) {
                                f.event.remove(a, j + b[h], c, d, !0)
                            }
                            continue
                        }
                        p = f.event.special[j] || {},
                            j = (d ? p.delegateType : p.bindType) || j,
                            r = o[j] || [],
                            m = r.length,
                            l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                        for (n = 0; n < r.length; n++) {
                            s = r[n],
                            (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1),
                            s.selector && r.delegateCount--,
                            p.remove && p.remove.call(a, s))
                        }
                        r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle),
                            delete o[j])
                    }
                    f.isEmptyObject(o) && (q = g.handle,
                    q && (q.elem = null),
                        f.removeData(a, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function (c, d, e, g) {
                if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                    var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                    if (E.test(h + f.event.triggered)) {
                        return
                    }
                    h.indexOf("!") >= 0 && (h = h.slice(0, -1),
                        k = !0),
                    h.indexOf(".") >= 0 && (i = h.split("."),
                        h = i.shift(),
                        i.sort());
                    if ((!e || f.event.customEvent[h]) && !f.event.global[h]) {
                        return
                    }
                    c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h),
                        c.type = h,
                        c.isTrigger = !0,
                        c.exclusive = k,
                        c.namespace = i.join("."),
                        c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                        o = h.indexOf(":") < 0 ? "on" + h : "";
                    if (!e) {
                        j = f.cache;
                        for (l in j) {
                            j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0)
                        }
                        return
                    }
                    c.result = b,
                    c.target || (c.target = e),
                        d = d != null ? f.makeArray(d) : [],
                        d.unshift(c),
                        p = f.event.special[h] || {};
                    if (p.trigger && p.trigger.apply(e, d) === !1) {
                        return
                    }
                    r = [[e, p.bindType || h]];
                    if (!g && !p.noBubble && !f.isWindow(e)) {
                        s = p.delegateType || h,
                            m = E.test(s + h) ? e : e.parentNode,
                            n = null;
                        for (; m; m = m.parentNode) {
                            r.push([m, s]),
                                n = m
                        }
                        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                    }
                    for (l = 0; l < r.length && !c.isPropagationStopped(); l++) {
                        m = r[l][0],
                            c.type = r[l][1],
                            q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"),
                        q && q.apply(m, d),
                            q = o && m[o],
                        q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault()
                    }
                    c.type = h,
                    !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o],
                    n && (e[o] = null),
                        f.event.triggered = h,
                        e[h](),
                        f.event.triggered = b,
                    n && (e[o] = n));
                    return c.result
                }
            },
            dispatch: function (c) {
                c = f.event.fix(c || a.event);
                var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
                g[0] = c,
                    c.delegateTarget = this;
                if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                    m = f(this),
                        m.context = this.ownerDocument || this;
                    for (l = c.target; l != this; l = l.parentNode || this) {
                        o = {},
                            q = [],
                            m[0] = l;
                        for (j = 0; j < e; j++) {
                            r = d[j],
                                s = r.selector,
                            o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)),
                            o[s] && q.push(r)
                        }
                        q.length && i.push({
                            elem: l,
                            matches: q
                        })
                    }
                }
                d.length > e && i.push({
                    elem: this,
                    matches: d.slice(e)
                });
                for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                    p = i[j],
                        c.currentTarget = p.elem;
                    for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                        r = p.matches[k];
                        if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) {
                            c.data = r.data,
                                c.handleObj = r,
                                n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g),
                            n !== b && (c.result = n,
                            n === !1 && (c.preventDefault(),
                                c.stopPropagation()))
                        }
                    }
                }
                return c.result
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (a, b) {
                    a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                    return a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (a, d) {
                    var e, f, g, h = d.button, i = d.fromElement;
                    a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c,
                        f = e.documentElement,
                        g = e.body,
                        a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0),
                        a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
                    !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i),
                    !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                    return a
                }
            },
            fix: function (a) {
                if (a[f.expando]) {
                    return a
                }
                var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
                a = f.Event(g);
                for (d = i.length; d;) {
                    e = i[--d],
                        a[e] = g[e]
                }
                a.target || (a.target = g.srcElement || c),
                a.target.nodeType === 3 && (a.target = a.target.parentNode),
                a.metaKey === b && (a.metaKey = a.ctrlKey);
                return h.filter ? h.filter(a, g) : a
            },
            special: {
                ready: {
                    setup: f.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function (a, b, c) {
                        f.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function (a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function (a, b, c, d) {
                var e = f.extend(new f.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e),
                e.isDefaultPrevented() && c.preventDefault()
            }
        },
            f.event.handle = f.event.dispatch,
            f.removeEvent = c.removeEventListener ? function (a, b, c) {
                a.removeEventListener && a.removeEventListener(b, c, !1)
            }
                : function (a, b, c) {
                a.detachEvent && a.detachEvent("on" + b, c)
            }
            ,
            f.Event = function (a, b) {
                if (!(this instanceof f.Event)) {
                    return new f.Event(a, b)
                }
                a && a.type ? (this.originalEvent = a,
                    this.type = a.type,
                    this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a,
                b && f.extend(this, b),
                    this.timeStamp = a && a.timeStamp || f.now(),
                    this[f.expando] = !0
            }
            ,
            f.Event.prototype = {
                preventDefault: function () {
                    this.isDefaultPrevented = K;
                    var a = this.originalEvent;
                    !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                },
                stopPropagation: function () {
                    this.isPropagationStopped = K;
                    var a = this.originalEvent;
                    !a || (a.stopPropagation && a.stopPropagation(),
                        a.cancelBubble = !0)
                },
                stopImmediatePropagation: function () {
                    this.isImmediatePropagationStopped = K,
                        this.stopPropagation()
                },
                isDefaultPrevented: J,
                isPropagationStopped: J,
                isImmediatePropagationStopped: J
            },
            f.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function (a, b) {
                f.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                        if (!d || d !== c && !f.contains(c, d)) {
                            a.type = e.origType,
                                h = e.handler.apply(this, arguments),
                                a.type = b
                        }
                        return h
                    }
                }
            }),
        f.support.submitBubbles || (f.event.special.submit = {
            setup: function () {
                if (f.nodeName(this, "form")) {
                    return !1
                }
                f.event.add(this, "click._submit keypress._submit", function (a) {
                    var c = a.target
                        , d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                        this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                    }),
                        d._submit_attached = !0)
                })
            },
            teardown: function () {
                if (f.nodeName(this, "form")) {
                    return !1
                }
                f.event.remove(this, "._submit")
            }
        }),
        f.support.changeBubbles || (f.event.special.change = {
            setup: function () {
                if (z.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        f.event.add(this, "propertychange._change", function (a) {
                            a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }),
                            f.event.add(this, "click._change", function (a) {
                                this._just_changed && !a.isTrigger && (this._just_changed = !1,
                                    f.event.simulate("change", this, a, !0))
                            })
                    }
                    return !1
                }
                f.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                    }),
                        b._change_attached = !0)
                })
            },
            handle: function (a) {
                var b = a.target;
                if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
                    return a.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function () {
                f.event.remove(this, "._change");
                return z.test(this.nodeName)
            }
        }),
        f.support.focusinBubbles || f.each({
            focus: "focusin",
            blur: "focusout"
        }, function (a, b) {
            var d = 0
                , e = function (a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
            f.event.special[b] = {
                setup: function () {
                    d++ === 0 && c.addEventListener(a, e, !0)
                },
                teardown: function () {
                    --d === 0 && c.removeEventListener(a, e, !0)
                }
            }
        }),
            f.fn.extend({
                on: function (a, c, d, e, g) {
                    var h, i;
                    if (typeof a == "object") {
                        typeof c != "string" && (d = c,
                            c = b);
                        for (i in a) {
                            this.on(i, c, d, a[i], g)
                        }
                        return this
                    }
                    d == null && e == null ? (e = c,
                        d = c = b) : e == null && (typeof c == "string" ? (e = d,
                        d = b) : (e = d,
                        d = c,
                        c = b));
                    if (e === !1) {
                        e = J
                    } else {
                        if (!e) {
                            return this
                        }
                    }
                    g === 1 && (h = e,
                        e = function (a) {
                            f().off(a);
                            return h.apply(this, arguments)
                        }
                        ,
                        e.guid = h.guid || (h.guid = f.guid++));
                    return this.each(function () {
                        f.event.add(this, a, e, d, c)
                    })
                },
                one: function (a, b, c, d) {
                    return this.on.call(this, a, b, c, d, 1)
                },
                off: function (a, c, d) {
                    if (a && a.preventDefault && a.handleObj) {
                        var e = a.handleObj;
                        f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                        return this
                    }
                    if (typeof a == "object") {
                        for (var g in a) {
                            this.off(g, c, a[g])
                        }
                        return this
                    }
                    if (c === !1 || typeof c == "function") {
                        d = c,
                            c = b
                    }
                    d === !1 && (d = J);
                    return this.each(function () {
                        f.event.remove(this, a, d, c)
                    })
                },
                bind: function (a, b, c) {
                    return this.on(a, null, b, c)
                },
                unbind: function (a, b) {
                    return this.off(a, null, b)
                },
                live: function (a, b, c) {
                    f(this.context).on(a, this.selector, b, c);
                    return this
                },
                die: function (a, b) {
                    f(this.context).off(a, this.selector || "**", b);
                    return this
                },
                delegate: function (a, b, c, d) {
                    return this.on(b, a, c, d)
                },
                undelegate: function (a, b, c) {
                    return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
                },
                trigger: function (a, b) {
                    return this.each(function () {
                        f.event.trigger(a, b, this)
                    })
                },
                triggerHandler: function (a, b) {
                    if (this[0]) {
                        return f.event.trigger(a, b, this[0], !0)
                    }
                },
                toggle: function (a) {
                    var b = arguments
                        , c = a.guid || f.guid++
                        , d = 0
                        , e = function (c) {
                        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                        f._data(this, "lastToggle" + a.guid, e + 1),
                            c.preventDefault();
                        return b[e].apply(this, arguments) || !1
                    };
                    e.guid = c;
                    while (d < b.length) {
                        b[d++].guid = c
                    }
                    return this.click(e)
                },
                hover: function (a, b) {
                    return this.mouseenter(a).mouseleave(b || a)
                }
            }),
            f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
                f.fn[b] = function (a, c) {
                    c == null && (c = a,
                        a = null);
                    return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
                }
                    ,
                f.attrFn && (f.attrFn[b] = !0),
                C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks),
                D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
            }),
            function () {
                function x(a, b, c, e, f, g) {
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = e[h];
                        if (j) {
                            var k = !1;
                            j = j[a];
                            while (j) {
                                if (j[d] === c) {
                                    k = e[j.sizset];
                                    break
                                }
                                if (j.nodeType === 1) {
                                    g || (j[d] = c,
                                        j.sizset = h);
                                    if (typeof b != "string") {
                                        if (j === b) {
                                            k = !0;
                                            break
                                        }
                                    } else {
                                        if (m.filter(b, [j]).length > 0) {
                                            k = j;
                                            break
                                        }
                                    }
                                }
                                j = j[a]
                            }
                            e[h] = k
                        }
                    }
                }

                function w(a, b, c, e, f, g) {
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = e[h];
                        if (j) {
                            var k = !1;
                            j = j[a];
                            while (j) {
                                if (j[d] === c) {
                                    k = e[j.sizset];
                                    break
                                }
                                j.nodeType === 1 && !g && (j[d] = c,
                                    j.sizset = h);
                                if (j.nodeName.toLowerCase() === b) {
                                    k = j;
                                    break
                                }
                                j = j[a]
                            }
                            e[h] = k
                        }
                    }
                }

                var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g
                    , d = "sizcache" + (Math.random() + "").replace(".", "")
                    , e = 0
                    , g = Object.prototype.toString
                    , h = !1
                    , i = !0
                    , j = /\\/g
                    , k = /\r\n/g
                    , l = /\W/;
                [0, 0].sort(function () {
                    i = !1;
                    return 0
                });
                var m = function (b, d, e, f) {
                    e = e || [],
                        d = d || c;
                    var h = d;
                    if (d.nodeType !== 1 && d.nodeType !== 9) {
                        return []
                    }
                    if (!b || typeof b != "string") {
                        return e
                    }
                    var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
                    do {
                        a.exec(""),
                            i = a.exec(x);
                        if (i) {
                            x = i[3],
                                w.push(i[1]);
                            if (i[2]) {
                                l = i[3];
                                break
                            }
                        }
                    } while (i);
                    if (w.length > 1 && p.exec(b)) {
                        if (w.length === 2 && o.relative[w[0]]) {
                            j = y(w[0] + w[1], d, f)
                        } else {
                            j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                            while (w.length) {
                                b = w.shift(),
                                o.relative[b] && (b += w.shift()),
                                    j = y(b, j, f)
                            }
                        }
                    } else {
                        !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v),
                            d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                        if (d) {
                            n = f ? {
                                expr: w.pop(),
                                set: s(f)
                            } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v),
                                j = n.expr ? m.filter(n.expr, n.set) : n.set,
                                w.length > 0 ? k = s(j) : u = !1;
                            while (w.length) {
                                q = w.pop(),
                                    r = q,
                                    o.relative[q] ? r = w.pop() : q = "",
                                r == null && (r = d),
                                    o.relative[q](k, r, v)
                            }
                        } else {
                            k = w = []
                        }
                    }
                    k || (k = j),
                    k || m.error(q || b);
                    if (g.call(k) === "[object Array]") {
                        if (!u) {
                            e.push.apply(e, k)
                        } else {
                            if (d && d.nodeType === 1) {
                                for (t = 0; k[t] != null; t++) {
                                    k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t])
                                }
                            } else {
                                for (t = 0; k[t] != null; t++) {
                                    k[t] && k[t].nodeType === 1 && e.push(j[t])
                                }
                            }
                        }
                    } else {
                        s(k, e)
                    }
                    l && (m(l, h, e, f),
                        m.uniqueSort(e));
                    return e
                };
                m.uniqueSort = function (a) {
                    if (u) {
                        h = i,
                            a.sort(u);
                        if (h) {
                            for (var b = 1; b < a.length; b++) {
                                a[b] === a[b - 1] && a.splice(b--, 1)
                            }
                        }
                    }
                    return a
                }
                    ,
                    m.matches = function (a, b) {
                        return m(a, null, null, b)
                    }
                    ,
                    m.matchesSelector = function (a, b) {
                        return m(b, null, null, [a]).length > 0
                    }
                    ,
                    m.find = function (a, b, c) {
                        var d, e, f, g, h, i;
                        if (!a) {
                            return []
                        }
                        for (e = 0,
                                 f = o.order.length; e < f; e++) {
                            h = o.order[e];
                            if (g = o.leftMatch[h].exec(a)) {
                                i = g[1],
                                    g.splice(1, 1);
                                if (i.substr(i.length - 1) !== "\\") {
                                    g[1] = (g[1] || "").replace(j, ""),
                                        d = o.find[h](g, b, c);
                                    if (d != null) {
                                        a = a.replace(o.match[h], "");
                                        break
                                    }
                                }
                            }
                        }
                        d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
                        return {
                            set: d,
                            expr: a
                        }
                    }
                    ,
                    m.filter = function (a, c, d, e) {
                        var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
                        while (a && c.length) {
                            for (h in o.filter) {
                                if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                                    k = o.filter[h],
                                        l = f[1],
                                        g = !1,
                                        f.splice(1, 1);
                                    if (l.substr(l.length - 1) === "\\") {
                                        continue
                                    }
                                    s === r && (r = []);
                                    if (o.preFilter[h]) {
                                        f = o.preFilter[h](f, s, d, r, e, t);
                                        if (!f) {
                                            g = i = !0
                                        } else {
                                            if (f === !0) {
                                                continue
                                            }
                                        }
                                    }
                                    if (f) {
                                        for (n = 0; (j = s[n]) != null; n++) {
                                            j && (i = k(j, f, n, s),
                                                p = e ^ i,
                                                d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j),
                                                    g = !0))
                                        }
                                    }
                                    if (i !== b) {
                                        d || (s = r),
                                            a = a.replace(o.match[h], "");
                                        if (!g) {
                                            return []
                                        }
                                        break
                                    }
                                }
                            }
                            if (a === q) {
                                if (g == null) {
                                    m.error(a)
                                } else {
                                    break
                                }
                            }
                            q = a
                        }
                        return s
                    }
                    ,
                    m.error = function (a) {
                        throw new Error("Syntax error, unrecognized expression: " + a)
                    }
                ;
                var n = m.getText = function (a) {
                    var b, c, d = a.nodeType, e = "";
                    if (d) {
                        if (d === 1 || d === 9) {
                            if (typeof a.textContent == "string") {
                                return a.textContent
                            }
                            if (typeof a.innerText == "string") {
                                return a.innerText.replace(k, "")
                            }
                            for (a = a.firstChild; a; a = a.nextSibling) {
                                e += n(a)
                            }
                        } else {
                            if (d === 3 || d === 4) {
                                return a.nodeValue
                            }
                        }
                    } else {
                        for (b = 0; c = a[b]; b++) {
                            c.nodeType !== 8 && (e += n(c))
                        }
                    }
                    return e
                }
                    , o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function (a) {
                            return a.getAttribute("href")
                        },
                        type: function (a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function (a, b) {
                            var c = typeof b == "string"
                                , d = c && !l.test(b)
                                , e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var f = 0, g = a.length, h; f < g; f++) {
                                if (h = a[f]) {
                                    while ((h = h.previousSibling) && h.nodeType !== 1) {
                                    }
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            }
                            e && m.filter(b, a, !0)
                        },
                        ">": function (a, b) {
                            var c, d = typeof b == "string", e = 0, f = a.length;
                            if (d && !l.test(b)) {
                                b = b.toLowerCase();
                                for (; e < f; e++) {
                                    c = a[e];
                                    if (c) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                                }
                            } else {
                                for (; e < f; e++) {
                                    c = a[e],
                                    c && (a[e] = d ? c.parentNode : c.parentNode === b)
                                }
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function (a, b, c) {
                            var d, f = e++, g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                                d = b,
                                g = w),
                                g("parentNode", b, f, a, d, c)
                        },
                        "~": function (a, b, c) {
                            var d, f = e++, g = x;
                            typeof b == "string" && !l.test(b) && (b = b.toLowerCase(),
                                d = b,
                                g = w),
                                g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function (a, b, c) {
                            if (typeof b.getElementById != "undefined" && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function (a, b) {
                            if (typeof b.getElementsByName != "undefined") {
                                var c = []
                                    , d = b.getElementsByName(a[1]);
                                for (var e = 0, f = d.length; e < f; e++) {
                                    d[e].getAttribute("name") === a[1] && c.push(d[e])
                                }
                                return c.length === 0 ? null : c
                            }
                        },
                        TAG: function (a, b) {
                            if (typeof b.getElementsByTagName != "undefined") {
                                return b.getElementsByTagName(a[1])
                            }
                        }
                    },
                    preFilter: {
                        CLASS: function (a, b, c, d, e, f) {
                            a = " " + a[1].replace(j, "") + " ";
                            if (f) {
                                return a
                            }
                            for (var g = 0, h; (h = b[g]) != null; g++) {
                                h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1))
                            }
                            return !1
                        },
                        ID: function (a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function (a, b) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function (a) {
                            if (a[1] === "nth") {
                                a[2] || m.error(a[0]),
                                    a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0,
                                    a[3] = b[3] - 0
                            } else {
                                a[2] && m.error(a[0])
                            }
                            a[0] = e++;
                            return a
                        },
                        ATTR: function (a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            !f && o.attrMap[g] && (a[1] = o.attrMap[g]),
                                a[4] = (a[4] || a[5] || "").replace(j, ""),
                            a[2] === "~=" && (a[4] = " " + a[4] + " ");
                            return a
                        },
                        PSEUDO: function (b, c, d, e, f) {
                            if (b[1] === "not") {
                                if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) {
                                    b[3] = m(b[3], null, null, c)
                                } else {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    d || e.push.apply(e, g);
                                    return !1
                                }
                            } else {
                                if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) {
                                    return !0
                                }
                            }
                            return b
                        },
                        POS: function (a) {
                            a.unshift(!0);
                            return a
                        }
                    },
                    filters: {
                        enabled: function (a) {
                            return a.disabled === !1 && a.type !== "hidden"
                        },
                        disabled: function (a) {
                            return a.disabled === !0
                        },
                        checked: function (a) {
                            return a.checked === !0
                        },
                        selected: function (a) {
                            a.parentNode && a.parentNode.selectedIndex;
                            return a.selected === !0
                        },
                        parent: function (a) {
                            return !!a.firstChild
                        },
                        empty: function (a) {
                            return !a.firstChild
                        },
                        has: function (a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function (a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function (a) {
                            var b = a.getAttribute("type")
                                , c = a.type;
                            return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                        },
                        radio: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                        },
                        checkbox: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                        },
                        file: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "file" === a.type
                        },
                        password: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "password" === a.type
                        },
                        submit: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "submit" === a.type
                        },
                        image: function (a) {
                            return a.nodeName.toLowerCase() === "input" && "image" === a.type
                        },
                        reset: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (b === "input" || b === "button") && "reset" === a.type
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return b === "input" && "button" === a.type || b === "button"
                        },
                        input: function (a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function (a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function (a, b) {
                            return b === 0
                        },
                        last: function (a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function (a, b) {
                            return b % 2 === 0
                        },
                        odd: function (a, b) {
                            return b % 2 === 1
                        },
                        lt: function (a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function (a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function (a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function (a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function (a, b, c, d) {
                            var e = b[1]
                                , f = o.filters[e];
                            if (f) {
                                return f(a, c, b, d)
                            }
                            if (e === "contains") {
                                return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0
                            }
                            if (e === "not") {
                                var g = b[3];
                                for (var h = 0, i = g.length; h < i; h++) {
                                    if (g[h] === a) {
                                        return !1
                                    }
                                }
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function (a, b) {
                            var c, e, f, g, h, i, j, k = b[1], l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    while (l = l.previousSibling) {
                                        if (l.nodeType === 1) {
                                            return !1
                                        }
                                    }
                                    if (k === "first") {
                                        return !0
                                    }
                                    l = a;
                                case "last":
                                    while (l = l.nextSibling) {
                                        if (l.nodeType === 1) {
                                            return !1
                                        }
                                    }
                                    return !0;
                                case "nth":
                                    c = b[2],
                                        e = b[3];
                                    if (c === 1 && e === 0) {
                                        return !0
                                    }
                                    f = b[0],
                                        g = a.parentNode;
                                    if (g && (g[d] !== f || !a.nodeIndex)) {
                                        i = 0;
                                        for (l = g.firstChild; l; l = l.nextSibling) {
                                            l.nodeType === 1 && (l.nodeIndex = ++i)
                                        }
                                        g[d] = f
                                    }
                                    j = a.nodeIndex - e;
                                    return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function (a, b) {
                            return a.nodeType === 1 && a.getAttribute("id") === b
                        },
                        TAG: function (a, b) {
                            return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function (a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function (a, b) {
                            var c = b[1]
                                , d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c)
                                , e = d + ""
                                , f = b[2]
                                , g = b[4];
                            return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function (a, b, c, d) {
                            var e = b[2]
                                , f = o.setFilters[e];
                            if (f) {
                                return f(a, c, b, d)
                            }
                        }
                    }
                }
                    , p = o.match.POS
                    , q = function (a, b) {
                    return "\\" + (b - 0 + 1)
                };
                for (var r in o.match) {
                    o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),
                        o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q))
                }
                var s = function (a, b) {
                    a = Array.prototype.slice.call(a, 0);
                    if (b) {
                        b.push.apply(b, a);
                        return b
                    }
                    return a
                };
                try {
                    Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
                } catch (t) {
                    s = function (a, b) {
                        var c = 0
                            , d = b || [];
                        if (g.call(a) === "[object Array]") {
                            Array.prototype.push.apply(d, a)
                        } else {
                            if (typeof a.length == "number") {
                                for (var e = a.length; c < e; c++) {
                                    d.push(a[c])
                                }
                            } else {
                                for (; a[c]; c++) {
                                    d.push(a[c])
                                }
                            }
                        }
                        return d
                    }
                }
                var u, v;
                c.documentElement.compareDocumentPosition ? u = function (a, b) {
                    if (a === b) {
                        h = !0;
                        return 0
                    }
                    if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                        return a.compareDocumentPosition ? -1 : 1
                    }
                    return a.compareDocumentPosition(b) & 4 ? -1 : 1
                }
                    : (u = function (a, b) {
                        if (a === b) {
                            h = !0;
                            return 0
                        }
                        if (a.sourceIndex && b.sourceIndex) {
                            return a.sourceIndex - b.sourceIndex
                        }
                        var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
                        if (g === i) {
                            return v(a, b)
                        }
                        if (!g) {
                            return -1
                        }
                        if (!i) {
                            return 1
                        }
                        while (j) {
                            e.unshift(j),
                                j = j.parentNode
                        }
                        j = i;
                        while (j) {
                            f.unshift(j),
                                j = j.parentNode
                        }
                        c = e.length,
                            d = f.length;
                        for (var k = 0; k < c && k < d; k++) {
                            if (e[k] !== f[k]) {
                                return v(e[k], f[k])
                            }
                        }
                        return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
                    }
                        ,
                        v = function (a, b, c) {
                            if (a === b) {
                                return c
                            }
                            var d = a.nextSibling;
                            while (d) {
                                if (d === b) {
                                    return -1
                                }
                                d = d.nextSibling
                            }
                            return 1
                        }
                ),
                    function () {
                        var a = c.createElement("div")
                            , d = "script" + (new Date).getTime()
                            , e = c.documentElement;
                        a.innerHTML = "<a name='" + d + "'/>",
                            e.insertBefore(a, e.firstChild),
                        c.getElementById(d) && (o.find.ID = function (a, c, d) {
                                if (typeof c.getElementById != "undefined" && !d) {
                                    var e = c.getElementById(a[1]);
                                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                                }
                            }
                                ,
                                o.filter.ID = function (a, b) {
                                    var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                                    return a.nodeType === 1 && c && c.nodeValue === b
                                }
                        ),
                            e.removeChild(a),
                            e = a = null
                    }(),
                    function () {
                        var a = c.createElement("div");
                        a.appendChild(c.createComment("")),
                        a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                                var c = b.getElementsByTagName(a[1]);
                                if (a[1] === "*") {
                                    var d = [];
                                    for (var e = 0; c[e]; e++) {
                                        c[e].nodeType === 1 && d.push(c[e])
                                    }
                                    c = d
                                }
                                return c
                            }
                        ),
                            a.innerHTML = "<a href='#'></a>",
                        a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                                return a.getAttribute("href", 2)
                            }
                        ),
                            a = null
                    }(),
                c.querySelectorAll && function () {
                    var a = m
                        , b = c.createElement("div")
                        , d = "__sizzle__";
                    b.innerHTML = "<p class='TEST'></p>";
                    if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                        m = function (b, e, f, g) {
                            e = e || c;
                            if (!g && !m.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                                    if (h[1]) {
                                        return s(e.getElementsByTagName(b), f)
                                    }
                                    if (h[2] && o.find.CLASS && e.getElementsByClassName) {
                                        return s(e.getElementsByClassName(h[2]), f)
                                    }
                                }
                                if (e.nodeType === 9) {
                                    if (b === "body" && e.body) {
                                        return s([e.body], f)
                                    }
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) {
                                            return s([], f)
                                        }
                                        if (i.id === h[3]) {
                                            return s([i], f)
                                        }
                                    }
                                    try {
                                        return s(e.querySelectorAll(b), f)
                                    } catch (j) {
                                    }
                                } else {
                                    if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                                        var k = e
                                            , l = e.getAttribute("id")
                                            , n = l || d
                                            , p = e.parentNode
                                            , q = /^\s*[+~]/.test(b);
                                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n),
                                        q && p && (e = e.parentNode);
                                        try {
                                            if (!q || p) {
                                                return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                            }
                                        } catch (r) {
                                        } finally {
                                            l || k.removeAttribute("id")
                                        }
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        }
                        ;
                        for (var e in a) {
                            m[e] = a[e]
                        }
                        b = null
                    }
                }(),
                    function () {
                        var a = c.documentElement
                            , b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                        if (b) {
                            var d = !b.call(c.createElement("div"), "div")
                                , e = !1;
                            try {
                                b.call(c.documentElement, "[test!='']:sizzle")
                            } catch (f) {
                                e = !0
                            }
                            m.matchesSelector = function (a, c) {
                                c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                                if (!m.isXML(a)) {
                                    try {
                                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                            var f = b.call(a, c);
                                            if (f || !d || a.document && a.document.nodeType !== 11) {
                                                return f
                                            }
                                        }
                                    } catch (g) {
                                    }
                                }
                                return m(c, null, null, [a]).length > 0
                            }
                        }
                    }(),
                    function () {
                        var a = c.createElement("div");
                        a.innerHTML = "<div class='test e'></div><div class='test'></div>";
                        if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                            a.lastChild.className = "e";
                            if (a.getElementsByClassName("e").length === 1) {
                                return
                            }
                            o.order.splice(1, 0, "CLASS"),
                                o.find.CLASS = function (a, b, c) {
                                    if (typeof b.getElementsByClassName != "undefined" && !c) {
                                        return b.getElementsByClassName(a[1])
                                    }
                                }
                                ,
                                a = null
                        }
                    }(),
                    c.documentElement.contains ? m.contains = function (a, b) {
                        return a !== b && (a.contains ? a.contains(b) : !0)
                    }
                        : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
                        return !!(a.compareDocumentPosition(b) & 16)
                    }
                        : m.contains = function () {
                        return !1
                    }
                    ,
                    m.isXML = function (a) {
                        var b = (a ? a.ownerDocument || a : 0).documentElement;
                        return b ? b.nodeName !== "HTML" : !1
                    }
                ;
                var y = function (a, b, c) {
                    var d, e = [], f = "", g = b.nodeType ? [b] : b;
                    while (d = o.match.PSEUDO.exec(a)) {
                        f += d[0],
                            a = a.replace(o.match.PSEUDO, "")
                    }
                    a = o.relative[a] ? a + "*" : a;
                    for (var h = 0, i = g.length; h < i; h++) {
                        m(a, g[h], e, c)
                    }
                    return m.filter(f, e)
                };
                m.attr = f.attr,
                    m.selectors.attrMap = {},
                    f.find = m,
                    f.expr = m.selectors,
                    f.expr[":"] = f.expr.filters,
                    f.unique = m.uniqueSort,
                    f.text = m.getText,
                    f.isXMLDoc = m.isXML,
                    f.contains = m.contains
            }();
        var L = /Until$/
            , M = /^(?:parents|prevUntil|prevAll)/
            , N = /,/
            , O = /^.[^:#\[\.,]*$/
            , P = Array.prototype.slice
            , Q = f.expr.match.POS
            , R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        f.fn.extend({
            find: function (a) {
                var b = this, c, d;
                if (typeof a != "string") {
                    return f(a).filter(function () {
                        for (c = 0,
                                 d = b.length; c < d; c++) {
                            if (f.contains(b[c], this)) {
                                return !0
                            }
                        }
                    })
                }
                var e = this.pushStack("", "find", a), g, h, i;
                for (c = 0,
                         d = this.length; c < d; c++) {
                    g = e.length,
                        f.find(a, this[c], e);
                    if (c > 0) {
                        for (h = g; h < e.length; h++) {
                            for (i = 0; i < g; i++) {
                                if (e[i] === e[h]) {
                                    e.splice(h--, 1);
                                    break
                                }
                            }
                        }
                    }
                }
                return e
            },
            has: function (a) {
                var b = f(a);
                return this.filter(function () {
                    for (var a = 0, c = b.length; a < c; a++) {
                        if (f.contains(this, b[a])) {
                            return !0
                        }
                    }
                })
            },
            not: function (a) {
                return this.pushStack(T(this, a, !1), "not", a)
            },
            filter: function (a) {
                return this.pushStack(T(this, a, !0), "filter", a)
            },
            is: function (a) {
                return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
            },
            closest: function (a, b) {
                var c = [], d, e, g = this[0];
                if (f.isArray(a)) {
                    var h = 1;
                    while (g && g.ownerDocument && g !== b) {
                        for (d = 0; d < a.length; d++) {
                            f(g).is(a[d]) && c.push({
                                selector: a[d],
                                elem: g,
                                level: h
                            })
                        }
                        g = g.parentNode,
                            h++
                    }
                    return c
                }
                var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
                for (d = 0,
                         e = this.length; d < e; d++) {
                    g = this[d];
                    while (g) {
                        if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                            c.push(g);
                            break
                        }
                        g = g.parentNode;
                        if (!g || !g.ownerDocument || g === b || g.nodeType === 11) {
                            break
                        }
                    }
                }
                c = c.length > 1 ? f.unique(c) : c;
                return this.pushStack(c, "closest", a)
            },
            index: function (a) {
                if (!a) {
                    return this[0] && this[0].parentNode ? this.prevAll().length : -1
                }
                if (typeof a == "string") {
                    return f.inArray(this[0], f(a))
                }
                return f.inArray(a.jquery ? a[0] : a, this)
            },
            add: function (a, b) {
                var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a)
                    , d = f.merge(this.get(), c);
                return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
            },
            andSelf: function () {
                return this.add(this.prevObject)
            }
        }),
            f.each({
                parent: function (a) {
                    var b = a.parentNode;
                    return b && b.nodeType !== 11 ? b : null
                },
                parents: function (a) {
                    return f.dir(a, "parentNode")
                },
                parentsUntil: function (a, b, c) {
                    return f.dir(a, "parentNode", c)
                },
                next: function (a) {
                    return f.nth(a, 2, "nextSibling")
                },
                prev: function (a) {
                    return f.nth(a, 2, "previousSibling")
                },
                nextAll: function (a) {
                    return f.dir(a, "nextSibling")
                },
                prevAll: function (a) {
                    return f.dir(a, "previousSibling")
                },
                nextUntil: function (a, b, c) {
                    return f.dir(a, "nextSibling", c)
                },
                prevUntil: function (a, b, c) {
                    return f.dir(a, "previousSibling", c)
                },
                siblings: function (a) {
                    return f.sibling(a.parentNode.firstChild, a)
                },
                children: function (a) {
                    return f.sibling(a.firstChild)
                },
                contents: function (a) {
                    return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
                }
            }, function (a, b) {
                f.fn[a] = function (c, d) {
                    var e = f.map(this, b, c);
                    L.test(a) || (d = c),
                    d && typeof d == "string" && (e = f.filter(d, e)),
                        e = this.length > 1 && !R[a] ? f.unique(e) : e,
                    (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
                    return this.pushStack(e, a, P.call(arguments).join(","))
                }
            }),
            f.extend({
                filter: function (a, b, c) {
                    c && (a = ":not(" + a + ")");
                    return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
                },
                dir: function (a, c, d) {
                    var e = []
                        , g = a[c];
                    while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) {
                        g.nodeType === 1 && e.push(g),
                            g = g[c]
                    }
                    return e
                },
                nth: function (a, b, c, d) {
                    b = b || 1;
                    var e = 0;
                    for (; a; a = a[c]) {
                        if (a.nodeType === 1 && ++e === b) {
                            break
                        }
                    }
                    return a
                },
                sibling: function (a, b) {
                    var c = [];
                    for (; a; a = a.nextSibling) {
                        a.nodeType === 1 && a !== b && c.push(a)
                    }
                    return c
                }
            });
        var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
            , W = / jQuery\d+="(?:\d+|null)"/g
            , X = /^\s+/
            , Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
            , Z = /<([\w:]+)/
            , $ = /<tbody/i
            , _ = /<|&#?\w+;/
            , ba = /<(?:script|style)/i
            , bb = /<(?:script|object|embed|option|style)/i
            , bc = new RegExp("<(?:" + V + ")", "i")
            , bd = /checked\s*(?:[^=]|=\s*.checked.)/i
            , be = /\/(java|ecma)script/i
            , bf = /^\s*<!(?:\[CDATA\[|\-\-)/
            , bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }
            , bh = U(c);
        bg.optgroup = bg.option,
            bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead,
            bg.th = bg.td,
        f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]),
            f.fn.extend({
                text: function (a) {
                    if (f.isFunction(a)) {
                        return this.each(function (b) {
                            var c = f(this);
                            c.text(a.call(this, b, c.text()))
                        })
                    }
                    if (typeof a != "object" && a !== b) {
                        return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
                    }
                    return f.text(this)
                },
                wrapAll: function (a) {
                    if (f.isFunction(a)) {
                        return this.each(function (b) {
                            f(this).wrapAll(a.call(this, b))
                        })
                    }
                    if (this[0]) {
                        var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && b.insertBefore(this[0]),
                            b.map(function () {
                                var a = this;
                                while (a.firstChild && a.firstChild.nodeType === 1) {
                                    a = a.firstChild
                                }
                                return a
                            }).append(this)
                    }
                    return this
                },
                wrapInner: function (a) {
                    if (f.isFunction(a)) {
                        return this.each(function (b) {
                            f(this).wrapInner(a.call(this, b))
                        })
                    }
                    return this.each(function () {
                        var b = f(this)
                            , c = b.contents();
                        c.length ? c.wrapAll(a) : b.append(a)
                    })
                },
                wrap: function (a) {
                    var b = f.isFunction(a);
                    return this.each(function (c) {
                        f(this).wrapAll(b ? a.call(this, c) : a)
                    })
                },
                unwrap: function () {
                    return this.parent().each(function () {
                        f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
                    }).end()
                },
                append: function () {
                    return this.domManip(arguments, !0, function (a) {
                        this.nodeType === 1 && this.appendChild(a)
                    })
                },
                prepend: function () {
                    return this.domManip(arguments, !0, function (a) {
                        this.nodeType === 1 && this.insertBefore(a, this.firstChild)
                    })
                },
                before: function () {
                    if (this[0] && this[0].parentNode) {
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this)
                        })
                    }
                    if (arguments.length) {
                        var a = f.clean(arguments);
                        a.push.apply(a, this.toArray());
                        return this.pushStack(a, "before", arguments)
                    }
                },
                after: function () {
                    if (this[0] && this[0].parentNode) {
                        return this.domManip(arguments, !1, function (a) {
                            this.parentNode.insertBefore(a, this.nextSibling)
                        })
                    }
                    if (arguments.length) {
                        var a = this.pushStack(this, "after", arguments);
                        a.push.apply(a, f.clean(arguments));
                        return a
                    }
                },
                remove: function (a, b) {
                    for (var c = 0, d; (d = this[c]) != null; c++) {
                        if (!a || f.filter(a, [d]).length) {
                            !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")),
                                f.cleanData([d])),
                            d.parentNode && d.parentNode.removeChild(d)
                        }
                    }
                    return this
                },
                empty: function () {
                    for (var a = 0, b; (b = this[a]) != null; a++) {
                        b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                        while (b.firstChild) {
                            b.removeChild(b.firstChild)
                        }
                    }
                    return this
                },
                clone: function (a, b) {
                    a = a == null ? !1 : a,
                        b = b == null ? a : b;
                    return this.map(function () {
                        return f.clone(this, a, b)
                    })
                },
                html: function (a) {
                    if (a === b) {
                        return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null
                    }
                    if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(Y, "<$1></$2>");
                        try {
                            for (var c = 0, d = this.length; c < d; c++) {
                                this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")),
                                    this[c].innerHTML = a)
                            }
                        } catch (e) {
                            this.empty().append(a)
                        }
                    } else {
                        f.isFunction(a) ? this.each(function (b) {
                            var c = f(this);
                            c.html(a.call(this, b, c.html()))
                        }) : this.empty().append(a)
                    }
                    return this
                },
                replaceWith: function (a) {
                    if (this[0] && this[0].parentNode) {
                        if (f.isFunction(a)) {
                            return this.each(function (b) {
                                var c = f(this)
                                    , d = c.html();
                                c.replaceWith(a.call(this, b, d))
                            })
                        }
                        typeof a != "string" && (a = f(a).detach());
                        return this.each(function () {
                            var b = this.nextSibling
                                , c = this.parentNode;
                            f(this).remove(),
                                b ? f(b).before(a) : f(c).append(a)
                        })
                    }
                    return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
                },
                detach: function (a) {
                    return this.remove(a, !0)
                },
                domManip: function (a, c, d) {
                    var e, g, h, i, j = a[0], k = [];
                    if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) {
                        return this.each(function () {
                            f(this).domManip(a, c, d, !0)
                        })
                    }
                    if (f.isFunction(j)) {
                        return this.each(function (e) {
                            var g = f(this);
                            a[0] = j.call(this, e, c ? g.html() : b),
                                g.domManip(a, c, d)
                        })
                    }
                    if (this[0]) {
                        i = j && j.parentNode,
                            f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                                fragment: i
                            } : e = f.buildFragment(a, this, k),
                            h = e.fragment,
                            h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                        if (g) {
                            c = c && f.nodeName(g, "tr");
                            for (var l = 0, m = this.length, n = m - 1; l < m; l++) {
                                d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                            }
                        }
                        k.length && f.each(k, bp)
                    }
                    return this
                }
            }),
            f.buildFragment = function (a, b, d) {
                var e, g, h, i, j = a[0];
                b && b[0] && (i = b[0].ownerDocument || b[0]),
                i.createDocumentFragment || (i = c),
                a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0,
                    h = f.fragments[j],
                h && h !== 1 && (e = h)),
                e || (e = i.createDocumentFragment(),
                    f.clean(a, i, e, d)),
                g && (f.fragments[j] = h ? e : 1);
                return {
                    fragment: e,
                    cacheable: g
                }
            }
            ,
            f.fragments = {},
            f.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (a, b) {
                f.fn[a] = function (c) {
                    var d = []
                        , e = f(c)
                        , g = this.length === 1 && this[0].parentNode;
                    if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                        e[b](this[0]);
                        return this
                    }
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = (h > 0 ? this.clone(!0) : this).get();
                        f(e[h])[b](j),
                            d = d.concat(j)
                    }
                    return this.pushStack(d, a, e.selector)
                }
            }),
            f.extend({
                clone: function (a, b, c) {
                    var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
                    if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                        bk(a, h),
                            d = bl(a),
                            e = bl(h);
                        for (g = 0; d[g]; ++g) {
                            e[g] && bk(d[g], e[g])
                        }
                    }
                    if (b) {
                        bj(a, h);
                        if (c) {
                            d = bl(a),
                                e = bl(h);
                            for (g = 0; d[g]; ++g) {
                                bj(d[g], e[g])
                            }
                        }
                    }
                    d = e = null;
                    return h
                },
                clean: function (a, b, d, e) {
                    var g;
                    b = b || c,
                    typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
                    var h = [], i;
                    for (var j = 0, k; (k = a[j]) != null; j++) {
                        typeof k == "number" && (k += "");
                        if (!k) {
                            continue
                        }
                        if (typeof k == "string") {
                            if (!_.test(k)) {
                                k = b.createTextNode(k)
                            } else {
                                k = k.replace(Y, "<$1></$2>");
                                var l = (Z.exec(k) || ["", ""])[1].toLowerCase()
                                    , m = bg[l] || bg._default
                                    , n = m[0]
                                    , o = b.createElement("div");
                                b === c ? bh.appendChild(o) : U(b).appendChild(o),
                                    o.innerHTML = m[1] + k + m[2];
                                while (n--) {
                                    o = o.lastChild
                                }
                                if (!f.support.tbody) {
                                    var p = $.test(k)
                                        , q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                                    for (i = q.length - 1; i >= 0; --i) {
                                        f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                                    }
                                }
                                !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild),
                                    k = o.childNodes
                            }
                        }
                        var r;
                        if (!f.support.appendChecked) {
                            if (k[0] && typeof (r = k.length) == "number") {
                                for (i = 0; i < r; i++) {
                                    bn(k[i])
                                }
                            } else {
                                bn(k)
                            }
                        }
                        k.nodeType ? h.push(k) : h = f.merge(h, k)
                    }
                    if (d) {
                        g = function (a) {
                            return !a.type || be.test(a.type)
                        }
                        ;
                        for (j = 0; h[j]; j++) {
                            if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) {
                                e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j])
                            } else {
                                if (h[j].nodeType === 1) {
                                    var s = f.grep(h[j].getElementsByTagName("script"), g);
                                    h.splice.apply(h, [j + 1, 0].concat(s))
                                }
                                d.appendChild(h[j])
                            }
                        }
                    }
                    return h
                },
                cleanData: function (a) {
                    var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
                    for (var h = 0, i; (i = a[h]) != null; h++) {
                        if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) {
                            continue
                        }
                        c = i[f.expando];
                        if (c) {
                            b = d[c];
                            if (b && b.events) {
                                for (var j in b.events) {
                                    e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle)
                                }
                                b.handle && (b.handle.elem = null)
                            }
                            g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando),
                                delete d[c]
                        }
                    }
                }
            });
        var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, bx = ["Left", "Right"], by = ["Top", "Bottom"], bz, bA, bB;
        f.fn.css = function (a, c) {
            if (arguments.length === 2 && c === b) {
                return this
            }
            return f.access(this, a, c, !0, function (a, c, d) {
                return d !== b ? f.style(a, c, d) : f.css(a, c)
            })
        }
            ,
            f.extend({
                cssHooks: {
                    opacity: {
                        get: function (a, b) {
                            if (b) {
                                var c = bz(a, "opacity", "opacity");
                                return c === "" ? "1" : c
                            }
                            return a.style.opacity
                        }
                    }
                },
                cssNumber: {
                    fillOpacity: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function (a, c, d, e) {
                    if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                        var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                        c = f.cssProps[i] || i;
                        if (d === b) {
                            if (k && "get" in k && (g = k.get(a, !1, e)) !== b) {
                                return g
                            }
                            return j[c]
                        }
                        h = typeof d,
                        h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)),
                            h = "number");
                        if (d == null || h === "number" && isNaN(d)) {
                            return
                        }
                        h === "number" && !f.cssNumber[i] && (d += "px");
                        if (!k || !("set" in k) || (d = k.set(a, d)) !== b) {
                            try {
                                j[c] = d
                            } catch (l) {
                            }
                        }
                    }
                },
                css: function (a, c, d) {
                    var e, g;
                    c = f.camelCase(c),
                        g = f.cssHooks[c],
                        c = f.cssProps[c] || c,
                    c === "cssFloat" && (c = "float");
                    if (g && "get" in g && (e = g.get(a, !0, d)) !== b) {
                        return e
                    }
                    if (bz) {
                        return bz(a, c)
                    }
                },
                swap: function (a, b, c) {
                    var d = {};
                    for (var e in b) {
                        d[e] = a.style[e],
                            a.style[e] = b[e]
                    }
                    c.call(a);
                    for (e in b) {
                        a.style[e] = d[e]
                    }
                }
            }),
            f.curCSS = f.css,
            f.each(["height", "width"], function (a, b) {
                f.cssHooks[b] = {
                    get: function (a, c, d) {
                        var e;
                        if (c) {
                            if (a.offsetWidth !== 0) {
                                return bC(a, b, d)
                            }
                            f.swap(a, bw, function () {
                                e = bC(a, b, d)
                            });
                            return e
                        }
                    },
                    set: function (a, b) {
                        if (!bt.test(b)) {
                            return b
                        }
                        b = parseFloat(b);
                        if (b >= 0) {
                            return b + "px"
                        }
                    }
                }
            }),
        f.support.opacity || (f.cssHooks.opacity = {
            get: function (a, b) {
                return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
            },
            set: function (a, b) {
                var c = a.style
                    , d = a.currentStyle
                    , e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : ""
                    , g = d && d.filter || c.filter || "";
                c.zoom = 1;
                if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                    c.removeAttribute("filter");
                    if (d && !d.filter) {
                        return
                    }
                }
                c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
            }
        }),
            f(function () {
                f.support.reliableMarginRight || (f.cssHooks.marginRight = {
                    get: function (a, b) {
                        var c;
                        f.swap(a, {
                            display: "inline-block"
                        }, function () {
                            b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                        });
                        return c
                    }
                })
            }),
        c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
                var c, d, e;
                b = b.replace(bs, "-$1").toLowerCase(),
                (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b),
                c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
                return c
            }
        ),
        c.documentElement.currentStyle && (bB = function (a, b) {
                var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
                f === null && g && (e = g[b]) && (f = e),
                !bt.test(f) && bu.test(f) && (c = g.left,
                    d = a.runtimeStyle && a.runtimeStyle.left,
                d && (a.runtimeStyle.left = a.currentStyle.left),
                    g.left = b === "fontSize" ? "1em" : f || 0,
                    f = g.pixelLeft + "px",
                    g.left = c,
                d && (a.runtimeStyle.left = d));
                return f === "" ? "auto" : f
            }
        ),
            bz = bA || bB,
        f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
                var b = a.offsetWidth
                    , c = a.offsetHeight;
                return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
            }
                ,
                f.expr.filters.visible = function (a) {
                    return !f.expr.filters.hidden(a)
                }
        );
        var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = ["*/"] + ["*"];
        try {
            bV = e.href
        } catch (bY) {
            bV = c.createElement("a"),
                bV.href = "",
                bV = bV.href
        }
        bW = bR.exec(bV.toLowerCase()) || [],
            f.fn.extend({
                load: function (a, c, d) {
                    if (typeof a != "string" && bS) {
                        return bS.apply(this, arguments)
                    }
                    if (!this.length) {
                        return this
                    }
                    var e = a.indexOf(" ");
                    if (e >= 0) {
                        var g = a.slice(e, a.length);
                        a = a.slice(0, e)
                    }
                    var h = "GET";
                    c && (f.isFunction(c) ? (d = c,
                        c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional),
                        h = "POST"));
                    var i = this;
                    f.ajax({
                        url: a,
                        type: h,
                        dataType: "html",
                        data: c,
                        complete: function (a, b, c) {
                            c = a.responseText,
                            a.isResolved() && (a.done(function (a) {
                                c = a
                            }),
                                i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)),
                            d && i.each(d, [c, b, a])
                        }
                    });
                    return this
                },
                serialize: function () {
                    return f.param(this.serializeArray())
                },
                serializeArray: function () {
                    return this.map(function () {
                        return this.elements ? f.makeArray(this.elements) : this
                    }).filter(function () {
                        return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
                    }).map(function (a, b) {
                        var c = f(this).val();
                        return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                            return {
                                name: b.name,
                                value: a.replace(bF, "\r\n")
                            }
                        }) : {
                            name: b.name,
                            value: c.replace(bF, "\r\n")
                        }
                    }).get()
                }
            }),
            f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
                f.fn[b] = function (a) {
                    return this.on(b, a)
                }
            }),
            f.each(["get", "post"], function (a, c) {
                f[c] = function (a, d, e, g) {
                    f.isFunction(d) && (g = g || e,
                        e = d,
                        d = b);
                    return f.ajax({
                        type: c,
                        url: a,
                        data: d,
                        success: e,
                        dataType: g
                    })
                }
            }),
            f.extend({
                getScript: function (a, c) {
                    return f.get(a, b, c, "script")
                },
                getJSON: function (a, b, c) {
                    return f.get(a, b, c, "json")
                },
                ajaxSetup: function (a, b) {
                    b ? b_(a, f.ajaxSettings) : (b = a,
                        a = f.ajaxSettings),
                        b_(a, b);
                    return a
                },
                ajaxSettings: {
                    url: bV,
                    isLocal: bJ.test(bW[1]),
                    global: !0,
                    type: "GET",
                    contentType: "application/x-www-form-urlencoded",
                    processData: !0,
                    async: !0,
                    accepts: {
                        xml: "application/xml, text/xml",
                        html: "text/html",
                        text: "text/plain",
                        json: "application/json, text/javascript",
                        "*": bX
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText"
                    },
                    converters: {
                        "* text": a.String,
                        "text html": !0,
                        "text json": f.parseJSON,
                        "text xml": f.parseXML
                    },
                    flatOptions: {
                        context: !0,
                        url: !0
                    }
                },
                ajaxPrefilter: bZ(bT),
                ajaxTransport: bZ(bU),
                ajax: function (a, c) {
                    function w(a, c, l, m) {
                        if (s !== 2) {
                            s = 2,
                            q && clearTimeout(q),
                                p = b,
                                n = m || "",
                                v.readyState = a > 0 ? 4 : 0;
                            var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                            if (a >= 200 && a < 300 || a === 304) {
                                if (d.ifModified) {
                                    if (y = v.getResponseHeader("Last-Modified")) {
                                        f.lastModified[k] = y
                                    }
                                    if (z = v.getResponseHeader("Etag")) {
                                        f.etag[k] = z
                                    }
                                }
                                if (a === 304) {
                                    w = "notmodified",
                                        o = !0
                                } else {
                                    try {
                                        r = cc(d, x),
                                            w = "success",
                                            o = !0
                                    } catch (A) {
                                        w = "parsererror",
                                            u = A
                                    }
                                }
                            } else {
                                u = w;
                                if (!w || a) {
                                    w = "error",
                                    a < 0 && (a = 0)
                                }
                            }
                            v.status = a,
                                v.statusText = "" + (c || w),
                                o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]),
                                v.statusCode(j),
                                j = b,
                            t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]),
                                i.fireWith(e, [v, w]),
                            t && (g.trigger("ajaxComplete", [v, d]),
                            --f.active || f.event.trigger("ajaxStop"))
                        }
                    }

                    typeof a == "object" && (c = a,
                        a = b),
                        c = c || {};
                    var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                        readyState: 0,
                        setRequestHeader: function (a, b) {
                            if (!s) {
                                var c = a.toLowerCase();
                                a = m[c] = m[c] || a,
                                    l[a] = b
                            }
                            return this
                        },
                        getAllResponseHeaders: function () {
                            return s === 2 ? n : null
                        },
                        getResponseHeader: function (a) {
                            var c;
                            if (s === 2) {
                                if (!o) {
                                    o = {};
                                    while (c = bH.exec(n)) {
                                        o[c[1].toLowerCase()] = c[2]
                                    }
                                }
                                c = o[a.toLowerCase()]
                            }
                            return c === b ? null : c
                        },
                        overrideMimeType: function (a) {
                            s || (d.mimeType = a);
                            return this
                        },
                        abort: function (a) {
                            a = a || "abort",
                            p && p.abort(a),
                                w(0, a);
                            return this
                        }
                    };
                    h.promise(v),
                        v.success = v.done,
                        v.error = v.fail,
                        v.complete = i.add,
                        v.statusCode = function (a) {
                            if (a) {
                                var b;
                                if (s < 2) {
                                    for (b in a) {
                                        j[b] = [j[b], a[b]]
                                    }
                                } else {
                                    b = a[v.status],
                                        v.then(b, b)
                                }
                            }
                            return this
                        }
                        ,
                        d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"),
                        d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP),
                    d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()),
                        d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))),
                    d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)),
                        b$(bT, d, c, v);
                    if (s === 2) {
                        return !1
                    }
                    t = d.global,
                        d.type = d.type.toUpperCase(),
                        d.hasContent = !bK.test(d.type),
                    t && f.active++ === 0 && f.event.trigger("ajaxStart");
                    if (!d.hasContent) {
                        d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data,
                            delete d.data),
                            k = d.url;
                        if (d.cache === !1) {
                            var x = f.now()
                                , y = d.url.replace(bQ, "$1_=" + x);
                            d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                        }
                    }
                    (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType),
                    d.ifModified && (k = k || d.url,
                    f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]),
                    f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])),
                        v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
                    for (u in d.headers) {
                        v.setRequestHeader(u, d.headers[u])
                    }
                    if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                        v.abort();
                        return !1
                    }
                    for (u in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) {
                        v[u](d[u])
                    }
                    p = b$(bU, d, c, v);
                    if (!p) {
                        w(-1, "No Transport")
                    } else {
                        v.readyState = 1,
                        t && g.trigger("ajaxSend", [v, d]),
                        d.async && d.timeout > 0 && (q = setTimeout(function () {
                            v.abort("timeout")
                        }, d.timeout));
                        try {
                            s = 1,
                                p.send(l, w)
                        } catch (z) {
                            if (s < 2) {
                                w(-1, z)
                            } else {
                                throw z
                            }
                        }
                    }
                    return v
                },
                param: function (a, c) {
                    var d = []
                        , e = function (a, b) {
                        b = f.isFunction(b) ? b() : b,
                            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                    };
                    c === b && (c = f.ajaxSettings.traditional);
                    if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) {
                        f.each(a, function () {
                            e(this.name, this.value)
                        })
                    } else {
                        for (var g in a) {
                            ca(g, a[g], c, e)
                        }
                    }
                    return d.join("&").replace(bD, "+")
                }
            }),
            f.extend({
                active: 0,
                lastModified: {},
                etag: {}
            });
        var cd = f.now()
            , ce = /(\=)\?(&|$)|\?\?/i;
        f.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                return f.expando + "_" + cd++
            }
        }),
            f.ajaxPrefilter("json jsonp", function (b, c, d) {
                var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
                if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
                    var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
                    b.jsonp !== !1 && (j = j.replace(ce, l),
                    b.url === j && (e && (k = k.replace(ce, l)),
                    b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))),
                        b.url = j,
                        b.data = k,
                        a[h] = function (a) {
                            g = [a]
                        }
                        ,
                        d.always(function () {
                            a[h] = i,
                            g && f.isFunction(i) && a[h](g[0])
                        }),
                        b.converters["script json"] = function () {
                            g || f.error(h + " was not called");
                            return g[0]
                        }
                        ,
                        b.dataTypes[0] = "json";
                    return "script"
                }
            }),
            f.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /javascript|ecmascript/
                },
                converters: {
                    "text script": function (a) {
                        f.globalEval(a);
                        return a
                    }
                }
            }),
            f.ajaxPrefilter("script", function (a) {
                a.cache === b && (a.cache = !1),
                a.crossDomain && (a.type = "GET",
                    a.global = !1)
            }),
            f.ajaxTransport("script", function (a) {
                if (a.crossDomain) {
                    var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
                    return {
                        send: function (f, g) {
                            d = c.createElement("script"),
                                d.async = "async",
                            a.scriptCharset && (d.charset = a.scriptCharset),
                                d.src = a.url,
                                d.onload = d.onreadystatechange = function (a, c) {
                                    if (c || !d.readyState || /loaded|complete/.test(d.readyState)) {
                                        d.onload = d.onreadystatechange = null,
                                        e && d.parentNode && e.removeChild(d),
                                            d = b,
                                        c || g(200, "success")
                                    }
                                }
                                ,
                                e.insertBefore(d, e.firstChild)
                        },
                        abort: function () {
                            d && d.onload(0, 1)
                        }
                    }
                }
            });
        var cf = a.ActiveXObject ? function () {
            for (var a in ch) {
                ch[a](0, 1)
            }
        }
            : !1, cg = 0, ch;
        f.ajaxSettings.xhr = a.ActiveXObject ? function () {
            return !this.isLocal && ci() || cj()
        }
            : ci,
            function (a) {
                f.extend(f.support, {
                    ajax: !!a,
                    cors: !!a && "withCredentials" in a
                })
            }(f.ajaxSettings.xhr()),
        f.support.ajax && f.ajaxTransport(function (c) {
            if (!c.crossDomain || f.support.cors) {
                var d;
                return {
                    send: function (e, g) {
                        var h = c.xhr(), i, j;
                        c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                        if (c.xhrFields) {
                            for (j in c.xhrFields) {
                                h[j] = c.xhrFields[j]
                            }
                        }
                        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType),
                        !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (j in e) {
                                h.setRequestHeader(j, e[j])
                            }
                        } catch (k) {
                        }
                        h.send(c.hasContent && c.data || null),
                            d = function (a, e) {
                                var j, k, l, m, n;
                                try {
                                    if (d && (e || h.readyState === 4)) {
                                        d = b,
                                        i && (h.onreadystatechange = f.noop,
                                        cf && delete ch[i]);
                                        if (e) {
                                            h.readyState !== 4 && h.abort()
                                        } else {
                                            j = h.status,
                                                l = h.getAllResponseHeaders(),
                                                m = {},
                                                n = h.responseXML,
                                            n && n.documentElement && (m.xml = n),
                                                m.text = h.responseText;
                                            try {
                                                k = h.statusText
                                            } catch (o) {
                                                k = ""
                                            }
                                            !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                        }
                                    }
                                } catch (p) {
                                    e || g(-1, p)
                                }
                                m && g(j, k, m, l)
                            }
                            ,
                            !c.async || h.readyState === 4 ? d() : (i = ++cg,
                            cf && (ch || (ch = {},
                                f(a).unload(cf)),
                                ch[i] = d),
                                h.onreadystatechange = d)
                    },
                    abort: function () {
                        d && d(0, 1)
                    }
                }
            }
        });
        var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], cr;
        f.fn.extend({
            show: function (a, b, c) {
                var d, e;
                if (a || a === 0) {
                    return this.animate(cu("show", 3), a, b, c)
                }
                for (var g = 0, h = this.length; g < h; g++) {
                    d = this[g],
                    d.style && (e = d.style.display,
                    !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""),
                    e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)))
                }
                for (g = 0; g < h; g++) {
                    d = this[g];
                    if (d.style) {
                        e = d.style.display;
                        if (e === "" || e === "none") {
                            d.style.display = f._data(d, "olddisplay") || ""
                        }
                    }
                }
                return this
            },
            hide: function (a, b, c) {
                if (a || a === 0) {
                    return this.animate(cu("hide", 3), a, b, c)
                }
                var d, e, g = 0, h = this.length;
                for (; g < h; g++) {
                    d = this[g],
                    d.style && (e = f.css(d, "display"),
                    e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e))
                }
                for (g = 0; g < h; g++) {
                    this[g].style && (this[g].style.display = "none")
                }
                return this
            },
            _toggle: f.fn.toggle,
            toggle: function (a, b, c) {
                var d = typeof a == "boolean";
                f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                    var b = d ? a : f(this).is(":hidden");
                    f(this)[b ? "show" : "hide"]()
                }) : this.animate(cu("toggle", 3), a, b, c);
                return this
            },
            fadeTo: function (a, b, c, d) {
                return this.filter(":hidden").css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function (a, b, c, d) {
                function g() {
                    e.queue === !1 && f._mark(this);
                    var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
                    b.animatedProperties = {};
                    for (i in a) {
                        g = f.camelCase(i),
                        i !== g && (a[g] = a[i],
                            delete a[i]),
                            h = a[g],
                            f.isArray(h) ? (b.animatedProperties[g] = h[1],
                                h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                        if (h === "hide" && d || h === "show" && !d) {
                            return b.complete.call(this)
                        }
                        c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY],
                        f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                    }
                    b.overflow != null && (this.style.overflow = "hidden");
                    for (i in a) {
                        j = new f.fx(this, b, i),
                            h = a[i],
                            cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0),
                                o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"),
                                    j[o]()) : j[h]()) : (k = co.exec(h),
                                l = j.cur(),
                                k ? (m = parseFloat(k[2]),
                                    n = k[3] || (f.cssNumber[i] ? "" : "px"),
                                n !== "px" && (f.style(this, i, (m || 1) + n),
                                    l = (m || 1) / j.cur() * l,
                                    f.style(this, i, l + n)),
                                k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l),
                                    j.custom(l, m, n)) : j.custom(l, h, ""))
                    }
                    return !0
                }

                var e = f.speed(b, c, d);
                if (f.isEmptyObject(a)) {
                    return this.each(e.complete, [!1])
                }
                a = f.extend({}, a);
                return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
            },
            stop: function (a, c, d) {
                typeof a != "string" && (d = c,
                    c = a,
                    a = b),
                c && a !== !1 && this.queue(a || "fx", []);
                return this.each(function () {
                    function h(a, b, c) {
                        var e = b[c];
                        f.removeData(a, c, !0),
                            e.stop(d)
                    }

                    var b, c = !1, e = f.timers, g = f._data(this);
                    d || f._unmark(!0, this);
                    if (a == null) {
                        for (b in g) {
                            g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b)
                        }
                    } else {
                        g[b = a + ".run"] && g[b].stop && h(this, g, b)
                    }
                    for (b = e.length; b--;) {
                        e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(),
                            c = !0,
                            e.splice(b, 1))
                    }
                    (!d || !c) && f.dequeue(this, a)
                })
            }
        }),
            f.each({
                slideDown: cu("show", 1),
                slideUp: cu("hide", 1),
                slideToggle: cu("toggle", 1),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function (a, b) {
                f.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }),
            f.extend({
                speed: function (a, b, c) {
                    var d = a && typeof a == "object" ? f.extend({}, a) : {
                        complete: c || !c && b || f.isFunction(a) && a,
                        duration: a,
                        easing: c && b || b && !f.isFunction(b) && b
                    };
                    d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
                    if (d.queue == null || d.queue === !0) {
                        d.queue = "fx"
                    }
                    d.old = d.complete,
                        d.complete = function (a) {
                            f.isFunction(d.old) && d.old.call(this),
                                d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
                        }
                    ;
                    return d
                },
                easing: {
                    linear: function (a, b, c, d) {
                        return c + d * a
                    },
                    swing: function (a, b, c, d) {
                        return (-Math.cos(a * Math.PI) / 2 + 0.5) * d + c
                    }
                },
                timers: [],
                fx: function (a, b, c) {
                    this.options = b,
                        this.elem = a,
                        this.prop = c,
                        b.orig = b.orig || {}
                }
            }),
            f.fx.prototype = {
                update: function () {
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                        (f.fx.step[this.prop] || f.fx.step._default)(this)
                },
                cur: function () {
                    if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                        return this.elem[this.prop]
                    }
                    var a, b = f.css(this.elem, this.prop);
                    return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
                },
                custom: function (a, c, d) {
                    function h(a) {
                        return e.step(a)
                    }

                    var e = this
                        , g = f.fx;
                    this.startTime = cr || cs(),
                        this.end = c,
                        this.now = this.start = a,
                        this.pos = this.state = 0,
                        this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"),
                        h.queue = this.options.queue,
                        h.elem = this.elem,
                        h.saveState = function () {
                            e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
                        }
                        ,
                    h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
                },
                show: function () {
                    var a = f._data(this.elem, "fxshow" + this.prop);
                    this.options.orig[this.prop] = a || f.style(this.elem, this.prop),
                        this.options.show = !0,
                        a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
                        f(this.elem).show()
                },
                hide: function () {
                    this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop),
                        this.options.hide = !0,
                        this.custom(this.cur(), 0)
                },
                step: function (a) {
                    var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
                    if (a || e >= i.duration + this.startTime) {
                        this.now = this.end,
                            this.pos = this.state = 1,
                            this.update(),
                            i.animatedProperties[this.prop] = !0;
                        for (b in i.animatedProperties) {
                            i.animatedProperties[b] !== !0 && (g = !1)
                        }
                        if (g) {
                            i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                                h.style["overflow" + b] = i.overflow[a]
                            }),
                            i.hide && f(h).hide();
                            if (i.hide || i.show) {
                                for (b in i.animatedProperties) {
                                    f.style(h, b, i.orig[b]),
                                        f.removeData(h, "fxshow" + b, !0),
                                        f.removeData(h, "toggle" + b, !0)
                                }
                            }
                            d = i.complete,
                            d && (i.complete = !1,
                                d.call(h))
                        }
                        return !1
                    }
                    i.duration == Infinity ? this.now = e : (c = e - this.startTime,
                        this.state = c / i.duration,
                        this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration),
                        this.now = this.start + (this.end - this.start) * this.pos),
                        this.update();
                    return !0
                }
            },
            f.extend(f.fx, {
                tick: function () {
                    var a, b = f.timers, c = 0;
                    for (; c < b.length; c++) {
                        a = b[c],
                        !a() && b[c] === a && b.splice(c--, 1)
                    }
                    b.length || f.fx.stop()
                },
                interval: 13,
                stop: function () {
                    clearInterval(cp),
                        cp = null
                },
                speeds: {
                    slow: 600,
                    fast: 200,
                    _default: 400
                },
                step: {
                    opacity: function (a) {
                        f.style(a.elem, "opacity", a.now)
                    },
                    _default: function (a) {
                        a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
                    }
                }
            }),
            f.each(["width", "height"], function (a, b) {
                f.fx.step[b] = function (a) {
                    f.style(a.elem, b, Math.max(0, a.now) + a.unit)
                }
            }),
        f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
                return f.grep(f.timers, function (b) {
                    return a === b.elem
                }).length
            }
        );
        var cw = /^t(?:able|d|h)$/i
            , cx = /^(?:body|html)$/i;
        "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
            var b = this[0], c;
            if (a) {
                return this.each(function (b) {
                    f.offset.setOffset(this, a, b)
                })
            }
            if (!b || !b.ownerDocument) {
                return null
            }
            if (b === b.ownerDocument.body) {
                return f.offset.bodyOffset(b)
            }
            try {
                c = b.getBoundingClientRect()
            } catch (d) {
            }
            var e = b.ownerDocument
                , g = e.documentElement;
            if (!c || !f.contains(g, b)) {
                return c ? {
                    top: c.top,
                    left: c.left
                } : {
                    top: 0,
                    left: 0
                }
            }
            var h = e.body
                , i = cy(e)
                , j = g.clientTop || h.clientTop || 0
                , k = g.clientLeft || h.clientLeft || 0
                , l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop
                , m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft
                , n = c.top + l - j
                , o = c.left + m - k;
            return {
                top: n,
                left: o
            }
        }
            : f.fn.offset = function (a) {
            var b = this[0];
            if (a) {
                return this.each(function (b) {
                    f.offset.setOffset(this, a, b)
                })
            }
            if (!b || !b.ownerDocument) {
                return null
            }
            if (b === b.ownerDocument.body) {
                return f.offset.bodyOffset(b)
            }
            var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
            while ((b = b.parentNode) && b !== i && b !== h) {
                if (f.support.fixedPosition && k.position === "fixed") {
                    break
                }
                c = j ? j.getComputedStyle(b, null) : b.currentStyle,
                    l -= b.scrollTop,
                    m -= b.scrollLeft,
                b === d && (l += b.offsetTop,
                    m += b.offsetLeft,
                f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0,
                    m += parseFloat(c.borderLeftWidth) || 0),
                    e = d,
                    d = b.offsetParent),
                f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0,
                    m += parseFloat(c.borderLeftWidth) || 0),
                    k = c
            }
            if (k.position === "relative" || k.position === "static") {
                l += i.offsetTop,
                    m += i.offsetLeft
            }
            f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop),
                m += Math.max(h.scrollLeft, i.scrollLeft));
            return {
                top: l,
                left: m
            }
        }
            ,
            f.offset = {
                bodyOffset: function (a) {
                    var b = a.offsetTop
                        , c = a.offsetLeft;
                    f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0,
                        c += parseFloat(f.css(a, "marginLeft")) || 0);
                    return {
                        top: b,
                        left: c
                    }
                },
                setOffset: function (a, b, c) {
                    var d = f.css(a, "position");
                    d === "static" && (a.style.position = "relative");
                    var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
                    j ? (l = e.position(),
                        m = l.top,
                        n = l.left) : (m = parseFloat(h) || 0,
                        n = parseFloat(i) || 0),
                    f.isFunction(b) && (b = b.call(a, c, g)),
                    b.top != null && (k.top = b.top - g.top + m),
                    b.left != null && (k.left = b.left - g.left + n),
                        "using" in b ? b.using.call(a, k) : e.css(k)
                }
            },
            f.fn.extend({
                position: function () {
                    if (!this[0]) {
                        return null
                    }
                    var a = this[0]
                        , b = this.offsetParent()
                        , c = this.offset()
                        , d = cx.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                    c.top -= parseFloat(f.css(a, "marginTop")) || 0,
                        c.left -= parseFloat(f.css(a, "marginLeft")) || 0,
                        d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0,
                        d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
                    return {
                        top: c.top - d.top,
                        left: c.left - d.left
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        var a = this.offsetParent || c.body;
                        while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") {
                            a = a.offsetParent
                        }
                        return a
                    })
                }
            }),
            f.each(["Left", "Top"], function (a, c) {
                var d = "scroll" + c;
                f.fn[d] = function (c) {
                    var e, g;
                    if (c === b) {
                        e = this[0];
                        if (!e) {
                            return null
                        }
                        g = cy(e);
                        return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
                    }
                    return this.each(function () {
                        g = cy(this),
                            g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
                    })
                }
            }),
            f.each(["Height", "Width"], function (a, c) {
                var d = c.toLowerCase();
                f.fn["inner" + c] = function () {
                    var a = this[0];
                    return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
                }
                    ,
                    f.fn["outer" + c] = function (a) {
                        var b = this[0];
                        return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
                    }
                    ,
                    f.fn[d] = function (a) {
                        var e = this[0];
                        if (!e) {
                            return a == null ? null : this
                        }
                        if (f.isFunction(a)) {
                            return this.each(function (b) {
                                var c = f(this);
                                c[d](a.call(this, b, c[d]()))
                            })
                        }
                        if (f.isWindow(e)) {
                            var g = e.document.documentElement["client" + c]
                                , h = e.document.body;
                            return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
                        }
                        if (e.nodeType === 9) {
                            return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c])
                        }
                        if (a === b) {
                            var i = f.css(e, d)
                                , j = parseFloat(i);
                            return f.isNumeric(j) ? j : i
                        }
                        return this.css(d, typeof a == "string" ? a : a + "px")
                    }
            }),
            a.jQuery = a.$ = f,
        typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
            return f
        })
    })(window);
var G = {
    PopOpenList: [],
    PupExpandList: [],
    RequestQueue: {},
    RequestTimmer: 0,
    AutoNumber: 0,
    LoadingCss: "g-loading-on",
    GlobalLoading: "<div id='GlobalLoading' pclass='g-loading' style='display:none;bottom:1px;right:1px'></div>",
    GlobalLoadingCounter: 0,
    ResultSplitChar: "êêê",
    Channel: ["marquee"],
    errlog: "",
    cache: {
        htmlCache: {},
        jsonCache: {}
    }
};
var P = {};
$.CL = {};
$.UT = {};
P.Mod = {};
P.Utl = {};
P.Set = {};
$.ajaxSetup({
    cache: false,
    global: false,
    beforeSend: function (a) {
        a.setRequestHeader("ajax", "true")
    }
});
if (document.uniqueID && !window.XMLHttpRequest) {
    try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch (e) {
    }
}
$(window).bind("resize", function (b, f) {
    var a, c;
    if (G.PopOpenList[0] && G.PopOpenList.length) {
        for (a = 0; a < G.PopOpenList.length; a++) {
            c = $("#" + G.PopOpenList[a]).data("Dialog");
            if (c) {
                c.refreshPos()
            }
        }
    }
    if (G.errlog) {
        G.errlog.setCenter();
        G.errlog.window.offset({
            top: 0
        })
    }
});
(function () {
    var a;
    window.onresize = function () {
        if (!a) {
            a = setTimeout(function () {
                a = 0;
                $(window).triggerHandler("sizeChange", {
                    clientHeight: document.documentElement.clientHeight,
                    clientWidth: document.documentElement.clientWidth
                })
            }, 1000)
        }
    }
}());
Number.prototype.toFixed = function (j) {
    var h = this + "";
    if (!j) {
        j = 0
    }
    if (h.indexOf(".") == -1) {
        h += "."
    }
    h += new Array(j + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (j + 1) + "})?)\\d*$").test(h)) {
        var h = "0" + RegExp.$2
            , g = RegExp.$1
            , d = RegExp.$3.length
            , c = true;
        if (d == j + 2) {
            d = h.match(/\d/g);
            if (parseInt(d[d.length - 1]) > 4) {
                for (var f = d.length - 2; f >= 0; f--) {
                    d[f] = parseInt(d[f]) + 1;
                    if (d[f] == 10) {
                        d[f] = 0;
                        c = f != 1
                    } else {
                        break
                    }
                }
            }
            h = d.join("").replace(new RegExp("(\\d+)(\\d{" + j + "})\\d$"), "$1.$2")
        }
        if (c) {
            h = h.substr(1)
        }
        return (g + h).replace(/\.$/, "")
    }
    return this
}
;
$(document).ready(function () {
    $(document.body).bind("mousedown", function (b) {
        var a, c;
        for (a in G.PupExpandList) {
            c = G.PupExpandList[a];
            if (!$.UT.InContainer(b.target, c.dom[0])) {
                c.close()
            } else {
                return true
            }
        }
        G.PupExpandList = []
    })
});
$.CL.Request = function (a) {
    this.cnet = "ajax";
    this.module = "index";
    this.action = "init";
    this.url = "";
    this.post = null;
    this.get = null;
    this.successCallback = $.UT.DefaultSuccessCallback;
    this.errorCallback = $.UT.DefaultErrorCallback;
    this.cache = false;
    this.timeout = 35000;
    this.timeoutTimer = 0;
    this.timeBegin = 0;
    this.iframe = null;
    this.iform = null;
    this.net = null;
    this.netForm = null;
    this.button = null;
    this.merge = {};
    this.mergeKey = "";
    this.globlLoadingObj = null;
    if (a) {
        $.extend(this, a)
    }
}
;
$.CL.Request.prototype = {
    resultCall: function (b) {
        var c, a = [];
        if (this.timeoutTimer) {
            clearInterval(this.timeoutTimer)
        }
        if (b.state == 1) {
            if (this.mergeKey === "") {
                this.successCallback(b.data, b.attach)
            } else {
                this.successCallback(b.data, b.attach, this.mergeKey)
            }
            a = [this.successCallback];
            for (c in this.merge) {
                var d = this.merge[c].successCallback;
                if ($.inArray(d, a) == -1) {
                    a.push(d);
                    d(b.data[c], b.attach)
                }
            }
        } else {
            if (b.data == "") {
                b.data = {
                    requestUrl: this.url
                }
            }
            this.errorCallback(b.errors, b.data, b.state);
            a = [this.errorCallback];
            for (c in this.merge) {
                var d = this.merge[c].errorCallback;
                if ($.inArray(d, a) == -1) {
                    a.push(d);
                    d(b.errors, b.data, b.state)
                }
            }
        }
    },
    abort: function (a) {
        if (this.timeoutTimer) {
            clearInterval(this.timeoutTimer)
        }
        if (a) {
            this.successCallback = function (b) {
            }
            ;
            this.errorCallback = function (b) {
            }
        }
        if (this.net) {
            if (this.net.abort) {
                this.net.abort()
            } else {
                this.net.src = "about:blank";
                $(this.net).triggerHandler("abort")
            }
        }
    }
};
$.CL.Result = function (a) {
    this.state = 0;
    this.data = "";
    this.errors = null;
    this.attach = [];
    this.source = a;
    if (a) {
        this.decode(a)
    }
}
;
$.CL.Result.prototype = {
    setErrors: function (d, c) {
        var b, a;
        this.state = 0;
        this.data = "";
        this.errors = {};
        for (b in d) {
            a = d[b];
            if (a.nid != "") {
                a.eid = P.Set.ErrorMapping[a.nid][a.eid];
                a.nid = ""
            }
            this.errors[a.eid] = a
        }
    },
    decode: function (m) {
        var a = G.ResultSplitChar;
        var f = m.split(a);
        var g = f.length - 1, b;
        if (g > 1) {
            b = $.UT.JsonDecode(f[g]);
            f.splice(g, 1)
        }
        var p = $.UT.JsonDecode(f[0]);
        f.shift();
        if (!p || !p.hasOwnProperty("state") || !p.hasOwnProperty("data")) {
            this.setErrors([{
                nid: "framework",
                eid: "resultDecodeError",
                file: "$.CL.Result",
                line: 0,
                note: ""
            }]);
            return false
        }
        p.state = Number(p.state);
        if (p.state != 1 && p.state != 3) {
            var n = [];
            var c;
            for (c in p.errors) {
                var l = p.errors[c];
                if (l.nid) {
                    l.eid = P.Set.ErrorMapping[l.nid][l.eid]
                }
                n.push(l)
            }
        }
        if (p.state == 3) {
            var k = p.data.requestUrl;
            if (!k) {
                k = ""
            }
            $.log_error(f[0] + "||" + p.data.requestUrl + "||");
            var j = document.getElementById("state3");
            if (!j) {
                var j = document.createElement("div");
                j.id = "state3";
                document.body.appendChild(j);
                j.innerHTML = new Function(f[0])()
            }
            return false
        }
        this.state = p.state;
        this.data = p.data;
        this.data.cookies = $.UT.Cookie();
        this.errors = n;
        this.attach = f;
        if (b && b.hasOwnProperty("tail")) {
            var h = b.tail;
            $.UT.EndDataFun(h)
        }
    }
};
$.CL.Dialog = function (g, c) {
    var b, f, h = this, d;
    g = $(g);
    if (!g[0]) {
        return false
    }
    if (g.data("Dialog")) {
        return false
    }
    this.dom = g;
    this.options = {
        mask: true,
        cssClass: "",
        title: "Dialog",
        offset: {
            left: 0,
            top: 0,
            right: null,
            bottom: null
        },
        region: document.body,
        resize: false,
        normalWidth: 0,
        normalHeight: 0,
        button: null,
        bodyDom: document.body,
        loadingM: null,
        maskRender: '<div class="g-dialog-mask"><!--[if lte IE 6.5]><iframe style="position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;filter:mask();"></iframe><![endif]--></div>',
        windowRender: '<div class="g-dialog-win elem-dialog"><div class="pop-border"><div dom="head" class="pop-hd"><h4 dom="title"></h4><a href="javascript:void(0)" dom="headico" class="headico"></a><a href="javascript:void(0)" dom="close" class="close"></a><a href="javascript:void(0)" dom="toggleSize" class="maxsize"></a></div><div class="pop-bd"><div dom="container" class="pop-container"></div></div><div class="pop-ft"></div></div></div>',
        color: null
    };
    $.extend(this.options, c);
    this.options.cssClass = g.attr("pclass") || this.options.cssClass;
    this.options.title = g.attr("ptitle") || this.options.title;
    this.options.normalWidth = g.attr("normal-width") || this.options.normalWidth;
    this.options.normalHeight = g.attr("normal-height") || this.options.normalHeight;
    g.css("display", "block");
    if (this.options.mask) {
        var a = $(".g-dialog-mask:hidden");
        var h = this;
        a.each(function (j, k) {
            if (!$(k).attr("name")) {
                h.mask = $(k);
                return false
            }
        });
        if (!this.mask) {
            this.mask = $(this.options.maskRender).appendTo(document.body)
        }
        if (this.options.color) {
            this.mask.css({
                background: "#000",
                opacity: 0.5
            })
        }
        if (this.options.loadingM) {
            this.mask.attr("name", this.options.loadingM)
        }
        this.mask.addClass(this.options.cssClass)
    }
    this.window = $(this.options.windowRender).appendTo(this.options.bodyDom);
    this.window.css("display", "none");
    d = $.UT.DomSelector($("*", this.window));
    this.container = $(d.container);
    this.container.append(g);
    this.head = $(d.head);
    this.title = $(d.title);
    this.body = g;
    this.toggleSizeBtn = $(d.toggleSize);
    this.toggleSize = 0;
    this.closeBtn = $(d.close);
    this.openData = null;
    this.region = null;
    this.title.html(this.options.title.toString().keyComment());
    this.window.addClass(this.options.cssClass);
    this.setResizeAble(this.options.resize, this.options.normalWidth, this.options.normalHeight);
    this.closeBtn.click(function (i) {
        h.close();
        return false
    });
    this.toggleSizeBtn.click(function (i) {
        h.toggleSize();
        return false
    });
    g.data("Dialog", this)
}
;
$.CL.Dialog.prototype = {
    setResizeAble: function (a, c, b) {
        this.options.resize = a;
        this.options.normalWidth = Number(c);
        this.options.normalHeight = Number(b);
        if (a) {
            this.toggleSizeBtn.show();
            this.container[0].style.width = this.options.normalWidth + "px";
            this.container[0].style.height = this.options.normalHeight + "px"
        } else {
            this.toggleSizeBtn.hide()
        }
    },
    setCssClass: function (a) {
        if (a) {
            this.window.removeClass(this.options.cssClass);
            this.mask.removeClass(this.options.cssClass);
            this.options.cssClass = a;
            this.window.addClass(a);
            this.mask.addClass(a);
            this.windowPos = {
                paddingWidth: this.window.width() - this.container.width(),
                paddingHeight: this.window.height() - this.container.height()
            }
        }
    },
    getContent: function () {
        var a = (this.body.data("ModuleLoader")) ? this.body.data("ModuleLoader") : null;
        if (a && a.module) {
            return a.module.dom
        } else {
            return this.body
        }
    },
    setNormalSize: function () {
        this.window.removeClass("maxsize");
        this.window.addClass("normalsize");
        this.toggleSize = 0;
        if (this.options.normalWidth) {
            this.container[0].style.width = this.options.normalWidth + "px"
        }
        if (this.options.normalHeight) {
            this.container[0].style.height = this.options.normalHeight + "px"
        }
        if (!this.options.button) {
            this.setCenter()
        } else {
            if (this.options.button != "invalid") {
                this.setFollow()
            } else {
                if (this.options.offset.right != null) {
                    this.setCustomPos()
                } else {
                    this.setFixed()
                }
            }
        }
    },
    setMaxSize: function () {
        this.window.removeClass("normalsize");
        this.window.addClass("maxsize");
        this.toggleSize = 1;
        this.window[0].style.left = 0;
        this.window[0].style.top = 0;
        this.container[0].style.width = document.documentElement.clientWidth - this.windowPos.paddingWidth + "px";
        this.container[0].style.height = document.documentElement.clientHeight - this.windowPos.paddingHeight + "px"
    },
    toggleSize: function () {
        if (this.toggleSize) {
            this.setNormalSize()
        } else {
            setMaxSize()
        }
    },
    open: function (h, q, d, b, l, g, f) {
        var n, c, i, m, a, k, j, p;
        if (d) {
            d = d.toString().keyComment()
        }
        if (this.isOpen() && !l) {
            return true
        }
        if (q === undefined) {
            q = this.options.mask
        }
        if (h !== undefined) {
            h = $(h);
            if (h[0]) {
                this.options.button = h
            } else {
                this.options.button = "invalid"
            }
        }
        if (b) {
            this.options.offset = b
        }
        this.openData = d;
        k = parseInt((+new Date()).toString().substring(4), 10);
        k++;
        if (this.mask) {
            if (q) {
                this.mask[0].style.zIndex = k;
                this.mask[0].style.display = "block"
            } else {
                this.mask[0].style.display = "none"
            }
        }
        this.window[0].style.zIndex = k + 10;
        this.toggleSize = 0;
        this.refreshPos();
        if (g) {
            this.draggable()
        }
        this.window.show();
        G.PopOpenList.push(this.body[0].id);
        this.getContent().triggerHandler("open", d, this)
    },
    _setMaskSize: function () {
        if (this.options.mask) {
            var a = (document.body.offsetHeight < document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
            this.mask[0].style.height = a + "px"
        }
    },
    setTitle: function (a) {
        if (a) {
            this.options.title = a;
            this.title.html(a.toString().keyComment())
        }
    },
    setCenter: function () {
        this.window[0].style.position = "absolute";
        var a = "left"
            , b = "top";
        if (this.window[0].style.right != "") {
            a = "right";
            b = "bottom"
        }
        this.window[0].style[a] = (document.documentElement.clientWidth - this.window.width()) / 2 + "px";
        this.window[0].style[b] = (document.documentElement.clientHeight - this.window.height()) / 2 + document.documentElement.scrollTop + "px"
    },
    setCustomPos: function () {
        this.window[0].style.position = "absolute";
        var a = "left"
            , b = "top"
            , c = "right"
            , d = "bottom";
        if (this.options.offset.right != null) {
            a = "right";
            b = "bottom";
            c = "left",
                d = "top"
        }
        this.window[0].style[a] = this.options.offset[a] + "px";
        this.window[0].style[b] = this.options.offset[b] + "px";
        this.window[0].style[c] = "";
        this.window[0].style[d] = ""
    },
    _countRegion: function () {
        if (this.options.region) {
            if (this.options.region.left) {
                this.region = this.options.region
            } else {
                this.region = $(this.options.region);
                var f = this.region.offset();
                if (this.options.bodyDom != document.body) {
                    var d = $(this.options.bodyDom).offset();
                    var c = this.options.bodyDom.scrollTop;
                    var b = $(this.window[0]).width();
                    var a = $(this.options.bodyDom).width();
                    f.left = f.left - d.left;
                    if ((f.left + b) > (a - 22)) {
                        f.left = a - b - 22
                    }
                    f.top = f.top - d.top;
                    f.top = f.top + c
                }
                this.region = {
                    left: f.left,
                    top: f.top,
                    right: f.left,
                    bottom: f.top + this.region.height()
                }
            }
        } else {
            this.region = null
        }
    },
    setFixed: function () {
        this.window[0].style.position = "absolute";
        this.window[0].style.left = this.body[0].style.left;
        this.window[0].style.right = this.body[0].style.right;
        this.window[0].style.top = this.body[0].style.top;
        this.window[0].style.bottom = this.body[0].style.bottom
    },
    setFollow: function () {
        if (this.region) {
            this.window[0].style.position = "absolute";
            var c = this.options.button.offset();
            if (this.options.bodyDom != document.body) {
                var b = $(this.options.bodyDom).offset();
                var a = this.options.bodyDom.scrollTop;
                c.left = c.left - b.left;
                c.top = c.top - b.top;
                c.top = c.top + a
            }
            c.top = c.top + this.options.button.height();
            c.left = c.left + this.options.offset.left;
            c.top = c.top + this.options.offset.top;
            if (c.left < this.region.left) {
                c.left = this.region.left
            }
            if (c.left > this.region.right) {
                c.left = this.region.right
            }
            if (c.top < this.region.top) {
                c.top = this.region.top
            }
            if (c.top > this.region.bottom) {
                c.top = this.region.bottom
            }
            this.window[0].style.left = c.left + "px";
            this.window[0].style.top = c.top + "px"
        }
    },
    refreshPos: function () {
        this._countRegion();
        if (this.toggleSize) {
            this.setMaxSize()
        } else {
            this.setNormalSize()
        }
        this._setMaskSize()
    },
    close: function () {
        if (this.mask) {
            this.mask.hide()
        }
        this.window.hide();
        this.openData = null;
        var a = $.inArray(this.body[0].id, G.PopOpenList);
        if (a > -1) {
            G.PopOpenList.splice(a, 1)
        }
        this.getContent().triggerHandler("close")
    },
    isOpen: function () {
        return this.window.css("display") != "none"
    },
    draggable: function () {
        var a = this.window.Widget("Drag");
        a.setHandler(this.head)
    }
};
$.CL.Drag = function (b, a) {
    var c = this;
    this.dom = $(b);
    this.options = {
        allowBubbling: false
    };
    this.isMouseDown = false;
    this.currentElement = null;
    this.dropCallbacks = {};
    this.dragCallbacks = {};
    this.bubblings = {};
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.lastElemTop = 0;
    this.lastElemLeft = 0;
    this.dragStatus = {};
    this.holdingHandler = false;
    this.win = $(window);
    $.extend(this.options, a);
    this.dsddrag(c.dom, c.options.allowBubbling);
    this.mouseupcallback = function (d) {
        if (c.isMouseDown && c.dragStatus[c.currentElement.id] != "false") {
            c.isMouseDown = false;
            c.holdingHandler = false;
            if (c.dropCallbacks[c.currentElement.id] != undefined) {
                c.dropCallbacks[c.currentElement.id](d, c.currentElement)
            }
            if (c.currentElement.releaseCapture) {
                $(c.currentElement).unbind("losecapture", c.mouseupcallback);
                c.currentElement.releaseCapture()
            } else {
                c.win.unbind("blur", c.mouseupcallback)
            }
            $(document).unbind("mousemove", c.mousemovecallback);
            $(document).unbind("mouseup", c.mouseupcallback);
            return false
        }
    }
    ;
    this.mousemovecallback = function (d) {
        if (c.isMouseDown && c.dragStatus[c.currentElement.id] != "false") {
            c.updatePosition(d, c.currentElement);
            if (c.dragCallbacks[c.currentElement.id] != undefined) {
                c.dragCallbacks[c.currentElement.id](d, c.currentElement)
            }
            c.dom.triggerHandler("drag", c);
            return false
        }
    }
}
;
$.CL.Drag.prototype = {
    dsddrag: function (b, a) {
        var c = this;
        return b.each(function () {
            if (undefined == b[0].id || !b[0].id.length) {
                b[0].id = "dsddrag" + (new Date().getTime())
            }
            c.bubblings[b[0].id] = a ? true : false;
            c.dragStatus[b[0].id] = "on";
            b.css("cursor", "move");
            b.mousedown(function (d) {
                if ((c.dragStatus[b[0].id] == "off") || (c.dragStatus[b[0].id] == "handler" && !c.holdingHandler)) {
                    return c.bubblings[b[0].id]
                }
                b.css("position", "absolute");
                c.isMouseDown = true;
                c.currentElement = b[0];
                if (c.currentElement.setCapture) {
                    $(c.currentElement).bind("losecapture", c.mouseupcallback);
                    c.currentElement.setCapture()
                } else {
                    c.win.blur(c.mouseupcallback)
                }
                $(document).mousemove(c.mousemovecallback);
                $(document).mouseup(c.mouseupcallback);
                var f = c.getMousePosition(d);
                c.lastMouseX = f.x;
                c.lastMouseY = f.y;
                c.lastElemTop = b[0].offsetTop;
                c.lastElemLeft = b[0].offsetLeft;
                c.updatePosition(d, c.currentElement);
                return c.bubblings[b[0].id]
            })
        })
    },
    getMousePosition: function (b) {
        var a = 0
            , c = 0;
        if (!b) {
            var b = window.event
        }
        if (b.pageX || b.pageY) {
            a = b.pageX;
            c = b.pageY
        } else {
            if (b.clientX || b.clientY) {
                a = b.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                c = b.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        }
        return {
            x: a,
            y: c
        }
    },
    updatePosition: function (c, f) {
        if (window.getSelection) {
            window.getSelection().removeAllRanges()
        } else {
            document.selection.empty()
        }
        var f = $(f)
            , a = this.win.width() + this.win.scrollLeft() - f.width()
            , h = this.win.height() + this.win.scrollTop() - f.height();
        var g = this.getMousePosition(c);
        var d = this.lastElemLeft + g.x - this.lastMouseX;
        var b = this.lastElemTop + g.y - this.lastMouseY;
        if (d > a) {
            d = a
        }
        if (d < 0) {
            d = 0
        }
        if (b < 0) {
            b = 0
        }
        if (b > h) {
            b = h
        }
        f.css({
            top: b,
            left: d
        })
    },
    ondrag: function (b) {
        var a = this;
        return this.dom.each(function () {
            a.dragCallbacks[dom[0].id] = b
        })
    },
    ondrop: function (b) {
        var a = this;
        return this.dom.each(function () {
            a.dropCallbacks[dom[0].id] = b
        })
    },
    dragOff: function () {
        var a = this;
        return a.dom.each(function () {
            a.dragStatus[dom[0].id] = "off"
        })
    },
    dragOn: function () {
        return this.each(function () {
            _this.dragStatus[dom[0].id] = "on"
        })
    },
    setHandler: function (a) {
        var b = this;
        a = (typeof a == "string") ? $("#" + a) : a;
        return this.dom.each(function () {
            var c = b.dom;
            b.bubblings[b.dom[0].id] = true;
            c.css("cursor", "");
            b.dragStatus[c[0].id] = "handler";
            a.css("cursor", "move");
            a.mousedown(function (d) {
                b.holdingHandler = true;
                c.trigger("mousedown", d)
            })
        })
    }
};
$.CL.Module = function (a) {
    this.dom = a
}
;
$.CL.ModuleLoader = function (a) {
    a = $(a);
    if (!a[0]) {
        return false
    }
    if ($.data(a[0], "ModuleLoader")) {
        return false
    }
    this.dom = a;
    this.moduleID = "";
    this.module = null;
    this.htmlSource = {};
    this.jsonSource = {};
    this.unified = {};
    this.romances = {};
    this.htmlCacheUpdated = {};
    this.jsonCacheUpdated = {};
    this.htmlRequest = null;
    this.jsonRequest = null;
    this.cacheType = {};
    this.historys = [];
    this.domclone = null;
    $.data(a[0], "ModuleLoader", this)
}
;
$.CL.ModuleLoader.prototype = {
    clearJsonCache: function (a) {
        G.cache.jsonCache[a] = null;
        this.jsonCacheUpdated[a] = true
    },
    clearHtmlCache: function (a) {
        G.cache.htmlCache[a] = null;
        this.htmlCacheUpdated[a] = true
    },
    changeModule: function (b, a, f, g, d, c) {
        this.isGoback = false;
        this._requestModule(b, a, f, g, d, c)
    },
    goBack: function (h, a, d, g, c, b) {
        this.isGoback = true;
        var f;
        if ((typeof h) == "number") {
            f = this.historys[h]
        } else {
            if ((typeof h) == "string") {
                if (jQuery.inArray(h, this.historys) != -1) {
                    f = h
                }
            }
        }
        if (f) {
            this._requestModule(f, a, d, g, c, b);
            this.historys.unshift(f);
            this.historys.length = 20
        }
    },
    _requestModule: function (h, d, f, c, k, g) {
        var a = this, b;
        if (this.htmlRequest) {
            this.htmlRequest.abort(true);
            this.htmlRequest = null
        }
        if (this.jsonRequest) {
            this.jsonRequest.abort(true);
            this.jsonRequest = null
        }
        if (this.moduleID != h) {
            this.htmlCacheUpdated[h] = true
        }
        if (!h) {
            this._uninstall();
            return true
        }
        this.unified[h] = k;
        this.romances[h] = g;
        if (!G.cache.htmlCache[h]) {
            this.cacheType[h] = c || this.cacheType[h] || "dom";
            if (d instanceof $.CL.Request) {
                var j = d.successCallback;
                var i = d.errorCallback;
                d.successCallback = function (r, n, q) {
                    a.htmlRequest = null;
                    if (q) {
                        var m, l;
                        for (var p in r) {
                            m = n[r[p]];
                            m = keyMdf(m);
                            l = $(m);
                            if (l.attr("tmp")) {
                                G.cache.htmlCache[p] = m
                            } else {
                                if (a.cacheType[h] != "code") {
                                    G.cache.htmlCache[p] = l[0]
                                } else {
                                    G.cache.htmlCache[p] = m
                                }
                            }
                        }
                    } else {
                        r = n[r];
                        r = keyMdf(r);
                        if (a.romances[h]) {
                            G.cache.htmlCache[h] = r
                        } else {
                            if (a.cacheType[h] != "code") {
                                G.cache.htmlCache[h] = $(r)[0]
                            } else {
                                G.cache.htmlCache[h] = r
                            }
                        }
                    }
                    a.htmlCacheUpdated[h] = true;
                    a._doChange(h);
                    if (j && j != $.UT.DefaultSuccessCallback) {
                        j(r, n)
                    }
                }
                ;
                d.errorCallback = function (n, m, l) {
                    a.htmlRequest = null;
                    if (i && i != $.UT.DefaultErrorCallback) {
                        i(n, m, l)
                    } else {
                        $.UT.DefaultErrorCallback(n, m, l)
                    }
                }
            }
            this.htmlSource[h] = d || this.htmlSource[h] || '<div id="' + h + '">new module</div>';
            c = this.cacheType[h];
            d = this.htmlSource[h];
            if (d instanceof $.CL.Request) {
                this.htmlRequest = $.UT.GetActionData(d)
            } else {
                if (c == "code") {
                    if (d.nodeName) {
                        b = document.createElement("div");
                        b.appendChild(d);
                        G.cache.htmlCache[h] = b.innerHTML
                    } else {
                        G.cache.htmlCache[h] = d
                    }
                } else {
                    G.cache.htmlCache[h] = ((d.nodeName) ? d : $(d)[0])
                }
                this.htmlCacheUpdated[h] = true
            }
        }
        if (!G.cache.jsonCache[h]) {
            if (f instanceof $.CL.Request) {
                var j = f.successCallback;
                var i = f.errorCallback;
                f.successCallback = function (m, l) {
                    a.jsonRequest = null;
                    G.cache.jsonCache[h] = m;
                    a.jsonCacheUpdated[h] = true;
                    a._doChange(h);
                    if (j && j != $.UT.DefaultSuccessCallback) {
                        j(m, l)
                    }
                }
                ;
                f.errorCallback = function (n, m, l) {
                    a.jsonRequest = null;
                    if (i && i != $.UT.DefaultErrorCallback) {
                        G.cache.jsonCache[h] = m;
                        a.jsonCacheUpdated[h] = true;
                        a._doChange(h);
                        i(n, m, l)
                    } else {
                        $.UT.DefaultErrorCallback(n, m, l)
                    }
                }
            }
            this.jsonSource[h] = f || this.jsonSource[h] || {};
            f = this.jsonSource[h];
            if (f instanceof $.CL.Request) {
                this.jsonRequest = $.UT.GetActionData(f)
            } else {
                G.cache.jsonCache[h] = f;
                this.jsonCacheUpdated[h] = true
            }
        }
        this._doChange(h)
    },
    isLoading: function () {
        if (this.htmlRequest || this.jsonRequest) {
            return true
        } else {
            return false
        }
    },
    _doChange: function (c) {
        if (this.unified[c]) {
            if (this.htmlRequest || this.jsonRequest) {
                return false
            }
        } else {
            if (this.htmlRequest) {
                return false
            }
        }
        var b = G.cache.htmlCache[c]
            , a = G.cache.jsonCache[c];
        if (b && this.htmlCacheUpdated[c]) {
            if (this.romances[c]) {
                this._autoRomances(c)
            } else {
                this._installHtmlCache(c)
            }
        }
        var d = this;
        setTimeout(function () {
            if (a && d.jsonCacheUpdated[c]) {
                if (d.romances[c]) {
                    d._autoRomances(c)
                } else {
                    d._installJsonCache(c)
                }
            }
            if (!d.jsonCacheUpdated[c] && !d.htmlCacheUpdated[c]) {
            }
        }, 0);
        d.dom.triggerHandler("changeModule", c)
    },
    _installHtmlCache: function (d) {
        var c, b, a, g = this;
        c = G.cache.htmlCache[d];
        if (this.isGoback) {
            this.isGoback = false
        } else {
            this.historys.unshift(d);
            this.historys.length = 20
        }
        if (c) {
            this._uninstall();
            if (c.nodeName) {
                this.dom[0].appendChild(c);
                b = c
            } else {
                this.dom[0].innerHTML = c;
                b = this.dom.children()[0]
            }
            var f = null;
            if (f) {
                setTimeout(function () {
                    a = $.data(b, "Module");
                    if (!a) {
                        a = $(b).Module();
                        a.parentLoader = g
                    } else {
                        if (a.rebind) {
                            a.rebind()
                        }
                    }
                    g.module = a;
                    g.moduleID = d;
                    g.htmlCacheUpdated[d] = false
                }, 0)
            } else {
                a = $.data(b, "Module");
                if (!a) {
                    a = $(b).Module();
                    a.parentLoader = this
                } else {
                    if (a.rebind) {
                        a.rebind()
                    }
                }
                this.module = a;
                this.moduleID = d;
                this.htmlCacheUpdated[d] = false
            }
        }
    },
    _installJsonCache: function (c) {
        var b, a;
        a = G.cache.jsonCache[c];
        if (a && this.module.setData) {
            this.module.setData(a)
        }
        G.cache.jsonCache[c] = null;
        this.jsonCacheUpdated[c] = false
    },
    _autoRomances: function (f) {
        var c, b;
        b = G.cache.jsonCache[f];
        c = G.cache.htmlCache[f];
        var a = $(c)[0].getAttribute("tmp");
        if (a && a == f) {
            if (!b) {
                return false
            }
            var d = template.compile(c);
            var g = d(b);
            this._installRomances(f, g);
            G.cache.jsonCache[f] = null;
            this.jsonCacheUpdated[f] = false
        } else {
            this._installRomances(f, c, true)
        }
        b = null;
        c = null
    },
    _installRomances: function (f, d, a) {
        var c, b, h = this;
        if (this.isGoback) {
            this.isGoback = false
        } else {
            this.historys.unshift(f);
            this.historys.length = 20
        }
        if (d) {
            this._uninstall();
            if (d.nodeName) {
                this.dom[0].appendChild(d);
                c = d
            } else {
                this.dom[0].innerHTML = d;
                c = this.dom.children()[0]
            }
            var g = null;
            if (g) {
                setTimeout(function () {
                    b = $.data(c, "Module");
                    if (!b) {
                        b = $(c).Module();
                        b.bdata = $("[bdata]", c);
                        b.parentLoader = h;
                        h.addEvent(b)
                    }
                    h.module = b;
                    h.moduleID = f;
                    h.htmlCacheUpdated[f] = false
                }, 0)
            } else {
                b = $.data(c, "Module");
                if (!b) {
                    b = $(c).Module();
                    b.bdata = $("[bdata]", c);
                    b.parentLoader = this;
                    h.addEvent(b)
                } else {
                    if (b.rebind) {
                        b.rebind()
                    }
                }
                this.module = b;
                this.moduleID = f;
                this.htmlCacheUpdated[f] = false
            }
            if (a) {
                this.romancesData(f)
            }
            if (G.cache.jsonCache[f]) {
                this.module.data = G.cache.jsonCache[f];
                G.cache.jsonCache[f] = null;
                this.jsonCacheUpdated[f] = false
            }
        }
    },
    romancesData: function (d) {
        var c = this.module.dom, b, g = this;
        b = G.cache.jsonCache[d];
        if (!b) {
            return false
        }
        var a = this.module.bdata;
        var f = this.module.data || {};
        a.each(function (m, n) {
            var j = n.getAttribute("bdata").split(",");
            var h = j[3] ? new Function("return" + j[3])() : null;
            if (b[j[0]]) {
                if ($.isArray(b[j[0]]) && b[j[0]].length > 0) {
                    if (!h.rules) {
                        return false
                    }
                    g.module[h.rules](n, b[j[0]])
                }
                if (typeof b[j[0]] == "object" && !$.isArray(b[j[0]])) {
                    var l = b[j[0]][j[3]];
                    var p = f[j[0]];
                    if (l && l.split("_")[0] == "status") {
                    }
                    if ($.isArray(l)) {
                    }
                    if (typeof l == "string") {
                        if (!p || (p && l != p[j[3]])) {
                        }
                    }
                }
                if (typeof b[j[0]] == "string" && b[j[0]] != f[j[0]]) {
                    if (h && h.rules) {
                        g.module[h.rules](n, b[j[0]])
                    } else {
                        switch (n.nodeName) {
                            case "INPUT":
                                n.value = b[j[0]];
                                break;
                            case "BUTTON":
                                break;
                            case "SELECT":
                                break;
                            default:
                                n.innerHTML = b[j[0]]
                        }
                    }
                }
                if (j[0].split("_")[0] == "status" && b[j[0]] != f[j[0]]) {
                    $(n).triggerHandler(j[0], b[j[0]])
                }
            }
            h = null;
            delete h
        });
        b = null;
        a = null;
        delete b;
        delete a
    },
    addEvent: function (c) {
        var d = c.dom;
        var b = c.bdata;
        c.events = "";
        var a = [];
        b.each(function (h, j) {
            var g = j.getAttribute("bdata").split(",");
            if (g[1]) {
                var k = g[1].split(" ")
                    , f = k.length
                    , h = 0;
                for (; h < f; h++) {
                    if (c.events.indexOf(k[h]) == -1) {
                        c.events += " " + k[h]
                    }
                }
                a.push(j)
            }
        });
        $(d).delegate(a, c.events, function (h, i) {
            var f = h.target.getAttribute("bdata"), g;
            if (f) {
                g = f.split(",")
            }
            if (f && f.indexOf(h.type) != -1) {
                c[g[2]](h, i)
            }
            return false
        });
        d = null;
        b = null;
        a = [];
        delete a;
        delete b
    },
    delEvent: function (a) {
        if (a) {
            var b = a.dom;
            $(b).undelegate(a.bdata, a.events);
            a.events = ""
        }
        b = null
    },
    _uninstall: function (a) {
        var b = this.module
            , c = this.moduleID;
        if (b) {
            if (b.unbind) {
                b.unbind()
            }
            if (!this.romances[c]) {
                if (this.cacheType[c] != "code") {
                    G.cache.htmlCache[c] = this.dom[0].removeChild(this.dom[0].firstChild)
                } else {
                    G.cache.htmlCache[c] = this.dom[0].innerHTML;
                    this.dom[0].innerHTML = ""
                }
            } else {
                if (!this.dom.children().attr("tmp")) {
                    G.cache.htmlCache[c] = this.dom[0].removeChild(this.dom[0].firstChild)
                } else {
                    this.delEvent(b);
                    this.dom[0].innerHTML = ""
                }
            }
        } else {
            this.dom[0].innerHTML = ""
        }
        this.module = "";
        this.moduleID = ""
    }
};
$.CL.Validator = function (i, f) {
    i = $(i);
    if (!i[0]) {
        return false
    }
    if ($.data(i[0], "Validator")) {
        if (f) {
            $.extend(this.options, f)
        }
        return false
    }
    this.dom = i;
    this.options = {
        rules: {},
        singleRule: true,
        onblur: false,
        callBack: {
            initErrors: function (j, k) {
            },
            itemError: function (j) {
            },
            formError: function (j) {
            }
        },
        methods: {}
    };
    var b = f.methods;
    delete f.methods;
    $.extend(this.options, f);
    $.extend(this.options.methods, this.defaultMethods, b);
    this.els = $.UT.DomSelector($("input, select, textarea", i), "vname");
    var g = this;
    var d;
    var h = function (j) {
        g.verify(j.target.getAttribute("vname"))
    };
    var c = function (j) {
        g.prompt(j.target.getAttribute("vname"))
    };
    for (d in this.options.rules) {
        this.options.callBack.initErrors(d, this.els[d], this.options.rules[d]);
        var a = this.options.rules[d].events || {};
        if (this.options.onblur || a.onblur) {
            $(this.els[d]).bind("blur", h);
            $(this.els[d]).bind("focus", c)
        }
    }
    $.data(this.dom[0], "Validator", this)
}
;
$.CL.Validator.prototype = {
    formUtil: {
        CheckAble: function (a, c) {
            var b = c[a];
            return (b.type == "radio" || b.type == "checkbox")
        },
        GetLength: function (b) {
            if (b[0].nodeName == "SELECT") {
                return $("option:selected", b[0]).length
            } else {
                if (b[0].type == "text" || b[0].type == "password" || b[0].nodeName == "TEXTAREA") {
                    var a = b[0].value.length;
                    if (b[0].value.match(/[\u4E00-\u9FA5]/g)) {
                        a += b[0].value.match(/[\u4E00-\u9FA5]/g).length
                    }
                    return a
                } else {
                    return $("input:checked", b).length
                }
            }
        }
    },
    defaultMethods: {
        required: function (b, c, a) {
            return $.CL.Validator.prototype.formUtil.GetLength(b) > 0
        },
        minLength: function (b, c, a) {
            return $.CL.Validator.prototype.formUtil.GetLength(b) >= c
        },
        maxLength: function (b, c, a) {
            return $.CL.Validator.prototype.formUtil.GetLength(b) <= c
        },
        rangeLength: function (b, d, a) {
            var c = $.CL.Validator.prototype.formUtil.GetLength(b);
            return (c >= d[0] && c <= d[1])
        },
        min: function (b, c, a) {
            return Number($(b).val()) >= c
        },
        max: function (b, c, a) {
            return Number($(b).val()) <= c
        },
        range: function (b, d, a) {
            var c = Number($(b).val());
            return (c >= d[0] && c <= d[1])
        },
        equalTo: function (b, f, a) {
            var c = $(b).val();
            var d = $(a.els[f]).val();
            return (c == d)
        },
        notEqualTo: function (b, f, a) {
            var c = $(b).val();
            var d = $(a.els[f]).val();
            return (c != d)
        },
        attribute: function (b, d, a) {
            var c = $(b).attr(d[0]);
            return (c == d[1])
        },
        regExp: function (b, d, a) {
            var c = $(b).val();
            return new RegExp(d).test(c)
        },
        regExpTxt: function (b, d, a) {
            var c = $(b).val();
            return !new RegExp(d).test(c)
        },
        weibo_length: function (b, d, a) {
            var c = $.trim($("#" + d[0]).val());
            return c.length <= d[1] && c != d[2] && c.length != 0
        },
        lessThan: function (b, f, a) {
            var c = Number($(b).val());
            var d = Number($(a.els[f]).val());
            return (c <= d)
        },
        moreThan: function (b, f, a) {
            var c = Number($(b).val());
            var d = Number($(a.els[f]).val());
            return (c >= d)
        },
        isDate: function (b, d, a) {
            var c = $(b).val();
            return !/Invalid|NaN/.test(new Date(c))
        },
        isEmail: function (b, d, a) {
            var c = $(b).val();
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(c)
        },
        isHttp: function (b, d, a) {
            var c = $(b).val();
            return /^http:\/\/[\w\./]+\w\/$/i.test(c)
        },
        isNumber: function (b, d, a) {
            var c = $(b).val();
            return /^[0-9.]+$/i.test(c)
        },
        oddInput: function (c, f, b) {
            var d = $(c).val();
            var a = (d > f[0] && d < f[1]);
            var g = /^[1-9]\d{0,3}(\.\d{1,2})?$/.test(d);
            return a && g
        },
        lessThanSum: function (c, h, b) {
            var f = Number($(c).val())
                , a = Number($(b.els[h[0]]).val())
                , g = Number($(b.els[h[1]]).val())
                , d = f + a;
            return d <= g
        },
        changeNumber: function (b, c, a) {
            return true
        }
    },
    validateFields: function (a) {
        var d = this.options.rules[a];
        var g;
        var c;
        for (c in d) {
            var f = this.options.methods[c];
            var b = d[c];
            if (!f(this.els[a], b, this)) {
                if (!g) {
                    g = {}
                }
                g[c] = b;
                if (this.options.singleRule) {
                    break
                }
            }
        }
        if (g) {
            return g
        } else {
            return true
        }
    },
    verifyForm: function () {
        var c;
        var a;
        for (a in this.options.rules) {
            var b = this.validateFields(a);
            if (b !== true) {
                if (!c) {
                    c = {}
                }
                c[a] = b;
                if (this.options.singleRule) {
                    break
                }
            }
        }
        if (c) {
            return c
        } else {
            return true
        }
    },
    verify: function (b) {
        var a;
        if (b) {
            a = this.validateFields(b);
            this.options.callBack.itemError(b, a)
        } else {
            a = this.verifyForm();
            this.options.callBack.formError(a)
        }
        return a
    },
    prompt: function (a) {
        this.options.callBack.itemPrompt(a)
    }
};
$.CL.SimpleValidator = function (b, a) {
    this.validatorTooltips = {};
    this.validatorStatus = {};
    this.els = {};
    this.rules = {};
    this.vdtMsgDom = {};
    this.options = a || $.UT.JsonDecode(decodeURIComponent(b.attr("validate")));
    this.options.layout = this.options.layout || $("#layout");
    var c = this;
    this.options.errorMessages = this.options.errorMessages || {};
    this.options.callBack = {
        initErrors: function (d, f, k) {
            if (!f) {
                return false
            }
            c.el = f[0];
            c.els[d] = $(f[0]);
            var j = c.el.getAttribute("vmessage");
            j = j || "请输入有效数据";
            c.validatorStatus[d] = $('<span class="g-vd-status"></span>').insertAfter(c.el);
            c.rules[d] = k;
            if (k.changeNumber) {
                var i = new P.Utl.changeNumber(c.els[d].val())
                    , g = i.pri_ary()
                    , h = j;
                j = j + '</br><span style="color:red">' + g + "</span>&nbsp;";
                c.els[d].bind("keyup", function (m) {
                    this.value = parseInt(this.value, 10).toString() != "NaN" ? parseInt(this.value, 10) : "";
                    if (c.vdtMsgDom[d]) {
                        var n = new P.Utl.changeNumber(this.value)
                            , l = n.pri_ary();
                        c.validatorTooltips[d] = h + '</br><span style="color:red">' + l + "</span>&nbsp;";
                        c.vdtMsgDom[d].children("p").html(c.validatorTooltips[d].toString().keyComment());
                        c.rePosition()
                    }
                })
            }
            c.validatorTooltips[d] = j
        },
        itemPrompt: function (d) {
            c.showPrompt(d)
        },
        formError: function (d) {
            var h, g;
            for (h in c.validatorTooltips) {
                if (d.hasOwnProperty(h)) {
                    var j = [];
                    var f = c.options.errorMessages[h];
                    if (f) {
                        for (var i in d[h]) {
                            if (f[i]) {
                                j.push(f[i])
                            }
                        }
                    } else {
                        j.push(c.validatorTooltips[h])
                    }
                    c.createVdt(h, j.join("；"), 2)
                } else {
                    c.removeVdt(h)
                }
            }
            return false
        },
        itemError: function (g, d) {
            if (d === true) {
                c.removeVdt(g);
                c.showIco(g, true)
            } else {
                var i = [];
                var f = c.options.errorMessages[g];
                if (f) {
                    for (var h in d) {
                        if (f[h]) {
                            i.push(f[h])
                        }
                    }
                } else {
                    i.push(c.validatorTooltips[g])
                }
                c.createVdt(g, i.join("；"), 2)
            }
            return false
        }
    };
    this.validator = new $.CL.Validator(b, this.options);
    b.bind("click", function (f) {
        var d = f.target.nodeName;
        if (d != "INPUT" && d != "SELECT" && d != "TEXTAREA" && d != "A" && d != "BUTTON") {
            c.hideTips()
        }
    });
    $(window).bind("scroll", function (d) {
        c.hideTips()
    });
    $(window).bind("resize", function (d) {
        c.rePosition()
    });
    c.options.layout.bind("scroll", function (d) {
        c.hideTips()
    })
}
;
$.CL.SimpleValidator.prototype = {
    verifyForm: function () {
        return this.validator.verify()
    },
    showPrompt: function (a) {
        if (a) {
            this.createVdt(a, this.validatorTooltips[a], 0, true)
        } else {
            for (a in this.validatorTooltips) {
                this.createVdt(a, this.validatorTooltips[a], 0, true)
            }
        }
    },
    hideTips: function (a) {
        if (a) {
            this.removeVdt(a)
        } else {
            for (a in this.validatorTooltips) {
                this.removeVdt(a)
            }
        }
    },
    hideIco: function (a) {
        if (a) {
            this.validatorStatus[a][0].className = "g-vd-status"
        } else {
            for (a in this.validatorTooltips) {
                this.validatorStatus[a][0].className = "g-vd-status"
            }
        }
    },
    showIco: function (a, b) {
        if (b) {
            this.validatorStatus[a][0].className = "g-vd-status g-vd-s-pass"
        } else {
            this.validatorStatus[a][0].className = "g-vd-status g-vd-s-error"
        }
    },
    createVdt: function (a, d, b, c) {
        this.removeVdt(a);
        this.vdtMsgDom[a] = $('<span class="g-vd-tooltip vdtId=' + a + '"><p>' + d.toString().keyComment() + "</p><i></i></span>").clone().appendTo(document.body);
        if (c) {
            this.vdtMsgDom[a][0].className = "g-vd-tooltip g-vd-prompt"
        } else {
            this.vdtMsgDom[a][0].className = "g-vd-tooltip g-vd-error"
        }
        this.autoPosition(a);
        switch (b) {
            case 0:
                this.hideIco(a);
                break;
            case 1:
                this.showIco(a, true);
                break;
            case 2:
                this.showIco(a, false);
                break
        }
    },
    removeVdt: function (a, b) {
        if (this.vdtMsgDom[a]) {
            this.vdtMsgDom[a].remove();
            this.vdtMsgDom[a] = null
        }
    },
    autoPosition: function (c) {
        var b = $(window).width();
        var g = $(document).scrollLeft();
        if (c) {
            var d = this.vdtMsgDom[c];
            var f = this.els[c];
            if (d) {
                if (f.length > 0 && (f.offset().left + d.width()) >= (b + g)) {
                    var a = (b + g - f.offset().left - 5);
                    if (a < f.width()) {
                        d[0].style.width = f.width() + "px"
                    } else {
                        d[0].style.width = a + "px"
                    }
                }
                d[0].style.zIndex = parseInt((+new Date()).toString().substring(4), 10) + 10;
                d[0].style.top = (f.offset().top - d.height()) + "px";
                d[0].style.left = f.offset().left + "px"
            } else {
            }
        }
    },
    rePosition: function (a) {
        if (a) {
            this.autoPosition(a)
        } else {
            for (a in this.validatorTooltips) {
                if (this.vdtMsgDom[a]) {
                    this.autoPosition(a)
                }
            }
        }
    }
};
$.UT.DefValue = function (a) {
    if (a.attr("dvalue")) {
        a.bind("focus", function (b) {
            if ($.trim(b.target.value) == b.target.getAttribute("dvalue")) {
                b.target.value = ""
            }
        });
        a.bind("blur", function (b) {
            if ($.trim(b.target.value) == "") {
                b.target.value = b.target.getAttribute("dvalue")
            }
        });
        a.val(a.attr("dvalue"))
    }
}
;
$.UT.GetActionData = function (b) {
    if (b.button) {
        b.button = $(b.button);
        if (b.button.hasClass(G.LoadingCss)) {
            return false
        } else {
            b.button.addClass(G.LoadingCss)
        }
    }
    var d = P.Set.ActionMapping[b.module][b.action], c, a;
    if (d.url) {
        b.url = d.url
    }
    if (d.hasOwnProperty("mergeKey")) {
        b.mergeKey = d.mergeKey
    }
    if (typeof (b.post) == "function") {
        b.post = b.post()
    }
    if (typeof (b.get) == "function") {
        b.get = b.get()
    }
    if (typeof (b.post) == "string") {
        b.post = $.UT.UnParam(b.post)
    }
    if (typeof (b.get) == "string") {
        b.get = $.UT.UnParam(b.get)
    }
    if (d.post) {
        b.post = d.post(b.post)
    }
    if (d.get) {
        b.get = d.get(b.get)
    }
    c = new $.CL.Request(b);
    c.cnet = c.cnet.toLowerCase();
    c.method = ((c.post) ? "post" : "get");
    if (G.RequestQueue[c.url]) {
        if (c.mergeKey) {
            G.RequestQueue[b.url].merge[c.mergeKey] = c;
            c = G.RequestQueue[b.url]
        } else {
            return false
        }
    } else {
        G.RequestQueue[c.url] = c
    }
    if (!G.RequestTimmer) {
        G.RequestTimmer = setTimeout(function () {
            var f;
            G.RequestTimmer = 0;
            for (f in G.RequestQueue) {
                $.UT.GetRemoteData(G.RequestQueue[f])
            }
            G.RequestQueue = {}
        }, 1)
    }
    return c
}
;
$.UT.GetRemoteData = function (h) {
    var g, f, d, c, b, j, a = h.module + ":" + h.action;
    if (h.globalLoading) {
        $.UT.GlobalLoading(true, h.globalLoadingMask, h.globlLoadingObj, a)
    }
    j = h.mergeKey;
    for (b in h.merge) {
        j += "," + h.merge[b].mergeKey;
        $.extend(h.get, h.merge[b].get);
        $.extend(h.post, h.merge[b].post);
        h.iframe = h.iframe || h.merge[b].iframe;
        h.iform = h.iform || h.merge[b].iform
    }
    h.url = h.url + ((h.url.indexOf("?") > -1) ? "&" : "?") + ((h.get) ? $.param(h.get) + "&" : "") + ((j !== "") ? "___=" + j + "&" : "");
    if (!h.cache) {
        if (h.action !== "get_html") {
            h.url = h.url + "&_=" + new Date().getTime()
        } else {
            h.url = h.url + "version_=" + P.Set.version
        }
    }
    h.url = h.url + "__" + h.cnet;
    h.net = $.ajax({
        type: h.method,
        url: h.url,
        data: h.post,
        timeout: h.timeout,
        cache: true,
        success: function (l, m) {
            var i, k;
            if (h.button) {
                h.button.removeClass(G.LoadingCss)
            }
            if (h.globalLoading) {
                $.UT.GlobalLoading(false, a)
            }
            i = new $.CL.Result(l);
            k = P.Set.ActionMapping[h.module][h.action];
            if (i.state && k.result) {
                i.data = k.result(i.data)
            }
            if (!i.state && k.error) {
                i.data = k.error(i.data)
            }
            h.resultCall(i)
        },
        error: function (m, p, n) {
            var i, l, k;
            if (h.button) {
                h.button.removeClass(G.LoadingCss)
            }
            if (h.globalLoading) {
                $.UT.GlobalLoading(false, a)
            }
            i = new $.CL.Result();
            i.setErrors([{
                nid: "framework",
                eid: p,
                file: "mdf-full.js",
                line: 0,
                note: ""
            }]);
            l = P.Set.ActionMapping[h.module][h.action];
            if (i.state && l.result) {
                i.data = l.result(i.data)
            }
            if (!i.state && l.error) {
                i.data = l.error(i.data)
            }
            h.resultCall(i)
        }
    })
}
;
$.UT.AutoNumber = function () {
    G.AutoNumber++;
    return G.AutoNumber
}
;
$.UT.CreateRequest = function (a) {
    return new $.CL.Request(a)
}
;
$.fn.Widget = function (b, c) {
    if (!this[0]) {
        return null
    }
    var a = $.data(this[0], b);
    if (a) {
        return a
    } else {
        a = new $.CL[b](this, c);
        $.data(this[0], b, a);
        a.dom = this;
        return a
    }
}
;
$.fn.Module = function (b, c) {
    if (!this[0] || !this[0].id) {
        return null
    }
    var a = $.data(this[0], "Module");
    if (a) {
        return a
    } else {
        var d;
        if (typeof b == "string") {
            d = P.Mod[b]
        } else {
            if (typeof b == "function") {
                d = b
            } else {
                d = P.Mod[this[0].id] || P.Mod[this.attr("module")]
            }
        }
        d = d || $.CL.Module;
        a = new d(this, c);
        $.data(this[0], "Module", a);
        a.dom = this;
        return a
    }
}
;
$.UT.DomSelector = function (g, a) {
    var c = {}, f, d, b;
    a = a || "dom";
    for (d = 0,
             b = g.length; d < b; d++) {
        f = g[d].getAttribute(a);
        if (f) {
            if (c[f]) {
                c[f].push(g[d])
            } else {
                c[f] = [g[d]]
            }
        }
    }
    return c
}
;
$.UT.InContainer = function (c, a) {
    var b = c;
    while (b != document.body) {
        if (b == a) {
            return true
        } else {
            b = b.parentNode
        }
    }
    return false
}
;
$.UT.MappingKey = function (b, a) {
    var d = typeof b, f, c;
    if (d == "object") {
        if (Array == b.constructor) {
            f = []
        } else {
            f = {}
        }
        for (c in b) {
            if (a[c]) {
                f[a[c]] = $.UT.MappingKey(b[c], a)
            } else {
                f[c] = $.UT.MappingKey(b[c], a)
            }
        }
    } else {
        f = b
    }
    return f
}
;
$.UT.GetModuleContent = function (c) {
    var b, a;
    b = /<div([\s\S]*?)>([\s\S]*)<\/div>/i;
    a = b.exec(c);
    return a[2]
}
;
$.UT.Param = function (a) {
    return decodeURIComponent($.param(a))
}
;
$.UT.UnParam = function (c) {
    c = decodeURIComponent(c);
    var b = {};
    var a = false;
    c.replace(/([^?=&]+)=([^&#]*)/g, function (d, f, g) {
        a = true;
        b[f] = g
    });
    return (a) ? b : null
}
;
$.UT.JsonDecode = function (b, a) {
    try {
        var d = new Function("return" + b)()
    } catch (c) {
        return null
    }
    return d
}
;
$.UT.Alert = function (g) {
    if (!g) {
        return false
    }
    var a = {};
    a.text = "";
    a.booLean = true;
    a.title = "用户提示";
    a.width = "400";
    a.determineCallback = null;
    a.cancelCallback = null;
    a.validate = null;
    a.buttonBL = true;
    a.closeBL = true;
    a.openCallback = null;
    a.dom = null;
    a.close = true;
    a.cFunction = null;
    a.mask = true;
    a.offset = null;
    a.CustomPos = undefined;
    a.drag = true;
    a.height = null;
    a.color = null;
    a.region = document.body;
    a.button = null;
    a.bodyDom = document.body;
    if (g.title) {
        g.title = g.title.toString().keyComment()
    }
    $.extend(a, g);
    var h = a.height ? a.height + "px" : "auto";
    var f = $('<div id="popLoader" class="pop_loader" ><div class="requestData" style="height:' + h + '">' + a.text.toString().keyComment() + '</div><div class="btn-line"><div class="inner"><span  autofocus="autofocus" class="yellow-btn btn_m elem_btn" name="determine" tabindex="1">确 定</span><span  class="white-btn btn_m elem_btn" name="cancel" tabindex="2">取消</span></div></div></div>');
    var d = f.Widget("Dialog", {
        mask: a.mask,
        region: a.region,
        button: a.button,
        bodyDom: a.bodyDom,
        color: a.color
    });
    f.attr("id", +new Date());
    var j = $("span[name=determine]", f)
        , i = $("span[name=cancel]", f)
        , b = $(".requestData", f);
    if (!a.booLean) {
        i.hide()
    } else {
        i.show()
    }
    f.bind("open close", function (l, k) {
        switch (l.type) {
            case "open":
                if (a.openCallback != null) {
                    a.openCallback(k)
                }
                j.focus().select();
                break;
            case "close":
                if (a.cancelCallback != null) {
                    a.cancelCallback()
                }
                c ? c.hideTips() : "";
                j.unbind("keydown click");
                d.window.empty();
                d.window.remove();
                if (a.color) {
                    d.mask.remove()
                }
                f.unbind();
                j.unbind();
                i.unbind();
                $.each(d, function (m, p) {
                    d.i = null;
                    delete d.i
                });
                $.each(a, function (m, p) {
                    a.i = null;
                    delete a.i
                });
                $.each(g, function (m, p) {
                    g.i = null;
                    delete g.i
                });
                a = g = null;
                d = null;
                b = null;
                j = null;
                i = null;
                f = null;
                c = null;
                k = null;
                delete f;
                delete g;
                delete a;
                delete d;
                delete j;
                delete b;
                delete i;
                delete c;
                delete k;
                l = null;
                delete l;
                P.Set.alerterror = null
        }
    });
    d.setTitle(a.title);
    d.open(a.CustomPos, undefined, null, a.offset, null, a.drag);
    a.close ? d.closeBtn.show() : d.closeBtn.hide();
    d.container[0].style.width = a.width + "px";
    if (a.height) {
        b.height(a.height)
    }
    if (a.offset) {
        d.setCustomPos()
    } else {
        d.setCenter()
    }
    d.determine = j;
    d.cancel = i;
    d.determine.focus().select();
    if (a.validate) {
        a.validate.layout = $("body");
        var c = b.children().Widget("SimpleValidator", a.validate)
    }
    j.bind("keydown click", function (l) {
        if (l.keyCode == 13 && l.type == "keydown" || l.type == "click") {
            if (a.determineCallback) {
                if (a.validate != null) {
                    var k = c.verifyForm();
                    if (k == true) {
                        a.determineCallback();
                        if (a.buttonBL == true) {
                            d.close()
                        }
                    } else {
                        if (typeof a.cFunction === "function") {
                            a.cFunction()
                        }
                    }
                } else {
                    a.determineCallback();
                    if (a.buttonBL == true) {
                        d.close()
                    }
                }
            } else {
                d.close()
            }
        }
        if (l.keyCode == 9) {
            i.focus()
        }
        return false
    });
    i.bind("click keydown", function (k) {
        if (k.keyCode == 13 && k.type == "keydown" || k.type == "click") {
            if (a.closeBL == true) {
                d.close()
            }
        }
        if (k.keyCode == 9) {
            j.focus()
        }
        return false
    });
    d.window.bind("drag", function (l, k) {
        c ? c.hideTips() : ""
    });
    try {
        return d
    } finally {
    }
}
;
$.UT.DefaultSuccessCallback = function (b, a) {
    $.UT.Alert({
        text: "数据接收成功，未解析（解折失败）或返回state状态问题！",
        booLean: false
    })
}
;
$.UT.DefaultErrorCallback = function (k, d, b, j, l, m) {
    if (!k) {
        return false
    }
    var n = "", f, h, c, g, a = 0;
    for (f in k) {
        h = k[f];
        g = h.eid;
        c = P.Set.ErrorMapping[g];
        n += c;
        if ((g + "").slice(0, 1) == "E") {
            return false
        } else {
            if (h.note) {
                n += h.note + "<br />"
            }
            a = 0
        }
    }
    if (!l) {
        booLean = false
    }
    if (m == null) {
        m = true
    } else {
        m = m
    }
    if (a == 1 && P.Set.alerterror) {
        return false
    }
    P.Set.alerterror = $.UT.Alert({
        text: n,
        booLean: booLean,
        close: m,
        determineCallback: j,
        cancelCallback: l
    })
}
;
$.UT.NetErrorCallback = function (k, d, b, j, l, m) {
    if (!k) {
        return false
    }
    var n = "", f, h, c, g, a = 0;
    for (f in k) {
        h = k[f];
        g = h.eid;
        c = P.Set.ErrorMapping[g];
        n += c;
        if ((g + "").slice(0, 1) == "E") {
            return false;
            if (h.note) {
                n += h.note
            }
            n += "(错误码：" + g + ")";
            a = 1;
            $.log_error(n + "||" + d.requestUrl + "||");
            if (!G.errlog) {
                G.errlog = $("<span>" + n.keyComment() + "</span>").Widget("Dialog", {
                    region: document.body,
                    windowRender: '<div id="erralert" style="margin:0px auto;"><span dom="container" style="float:left;height:20px;line-height:20px;border:1px solid #dddd99; background:#ffffbf;padding:0 5px;"></span><a href="javascript:void(0)" dom="close" style="float:left;width:35px;height:20px;line-height:20px;border:1px solid #dddd99; background:#ffffbf;text-align:center;color:#CD8939;font-weight:600;font-size:14px;">X</a></div>'
                })
            }
            G.errlog.open("absolute", false, n);
            G.errlog.setCenter();
            G.errlog.window.offset({
                top: 0
            });
            clearTimeout(G.errlog.ttt);
            G.errlog.ttt = setTimeout(function () {
                G.errlog.close();
                clearTimeout(G.errlog.ttt)
            }, 3000);
            return false
        } else {
            if (h.note) {
                n += h.note + "<br />"
            }
            a = 0
        }
    }
    if (!l) {
        booLean = false
    }
    if (m == null) {
        m = true
    } else {
        m = m
    }
    if (a == 1 && P.Set.alerterror) {
        return false
    }
    P.Set.alerterror = $.UT.Alert({
        text: n,
        booLean: booLean,
        close: m,
        determineCallback: j,
        cancelCallback: l
    })
}
;
$.UT.FormatString = function (d, f, c) {
    if (!c) {
        c = ["{", "}"]
    }
    var b = new RegExp("\\" + c[0] + "([^\\" + c[0] + "\\" + c[1] + "]*)\\" + c[1], "g");
    var a = function (g, h) {
        return g.replace(b, function (j, i) {
            var k = h[i];
            return (k !== undefined) ? k : j
        })
    };
    if (b.test(d)) {
        d = a(d, f)
    }
    return d
}
;
$.UT.GlobalLoading = function (b, a, d, c) {
    d = d || null;
    var f = '<span class="loading"></span><span>数据加载中...</span>', g;
    if (!(G.GlobalLoading instanceof $.CL.Dialog)) {
        G.GlobalLoading = $(G.GlobalLoading).Widget("Dialog", {
            loadingM: "loading"
        })
    }
    if (!G.GlobalLoading.mActions) {
        G.GlobalLoading.mActions = {}
    }
    if (d && d.data) {
        f = d.data;
        g = d.offset
    }
    if (b) {
        G.GlobalLoadingCounter++
    } else {
        G.GlobalLoadingCounter--
    }
    if (b) {
        G.GlobalLoading.container.html(f.toString().keyComment());
        G.GlobalLoading.mActions[c] = setTimeout(function () {
            G.GlobalLoading.open("absolute", a, f, g, false, false, true);
            if (d && d.data) {
                G.GlobalLoading.setCenter()
            }
        }, 2000)
    } else {
        clearTimeout(G.GlobalLoading.mActions[a]);
        G.GlobalLoading.close()
    }
}
;
$.UT.Cookie = function (b, k, p) {
    if (typeof k != "undefined") {
        p = p || {};
        if (k === null) {
            k = "";
            p = $.extend({}, p);
            p.expires = -1
        }
        var d = "";
        if (p.expires && (typeof p.expires == "number" || p.expires.toUTCString)) {
            var f;
            if (typeof p.expires == "number") {
                f = new Date();
                f.setTime(f.getTime() + (p.expires * 24 * 60 * 60 * 1000))
            } else {
                f = p.expires
            }
            d = "; expires=" + f.toUTCString()
        }
        var n = p.path ? "; path=" + (p.path) : "";
        var g = p.domain ? "; domain=" + (p.domain) : "";
        var a = p.secure ? "; secure" : "";
        document.cookie = [b, "=", encodeURIComponent(k), d, n, g, a].join("")
    } else {
        var m = {};
        if (document.cookie && document.cookie != "") {
            var l = document.cookie.split(";");
            var h;
            for (h = 0; h < l.length; h++) {
                var c = jQuery.trim(l[h]);
                var j = c.split("=");
                if (j[1] !== "deleted") {
                    m[j[0]] = decodeURIComponent(j[1])
                }
            }
            if (!b) {
                try {
                    return m
                } finally {
                    m = null
                }
            } else {
                try {
                    return m[b]
                } finally {
                    m = null
                }
            }
        }
    }
}
;
$.UT.Templetes = function (d) {
    var a = $.UT.DomSelector($("div,tbody", d), "templete");
    var c = $.UT.DomSelector($("textarea", d), "templete");
    for (var b in a) {
        if (c[b]) {
            $(a[b]).setTemplate(c[b][0].value)
        }
    }
    try {
        return a
    } finally {
        a = null
    }
}
;
$.UT.EndDataFun = function (d) {
    var c = "";
    for (var b in d) {
        var g = b.toString();
        var a = d[b].toString();
        c += "<p><b>" + g + ":</b><span>" + a + "</span></p>"
    }
    var f = $.UT.Alert({
        text: c,
        booLean: false
    });
    window.setTimeout(function () {
        f.closeBtn.click();
        delete f
    }, 12000)
}
;
$.UT.Butian = function (h, a, c, b) {
    h = h.toString();
    a = (typeof a == "number") ? a : 0;
    c = (typeof c == "string") ? c : " ";
    b = (/left|right|both/i).test(b) ? b : "right";
    var f = function (k, i) {
        var j = "";
        while (j.length < i) {
            j += k
        }
        return j.substr(0, i)
    };
    var g = a - h.length;
    if (g > 0) {
        switch (b) {
            case "left":
                h = "" + f(c, g) + h;
                break;
            case "both":
                var d = f(c, Math.ceil(g / 2));
                h = (d + h + d).substr(1, a);
                break;
            default:
                h = "" + h + f(c, g)
        }
    }
    try {
        return h
    } finally {
        h = null
    }
}
;
$.UT.FormatString = function (d, f, c) {
    if (!c) {
        c = ["{", "}"]
    }
    var b = new RegExp("\\" + c[0] + "([^\\" + c[0] + "\\" + c[1] + "]*)\\" + c[1], "g");
    var a = function (g, h) {
        return g.replace(b, function (j, i) {
            var k = h[i];
            return (k !== undefined) ? k : j
        })
    };
    if (b.test(d)) {
        d = a(d, f)
    }
    return d
}
;
$.CL.EventD = function (a) {
    this.eName = [];
    this.efun = null;
    if (a) {
        $.extend(this, a)
    }
}
;
$.CL.EventD.prototype = {
    entrances: function () {
    },
    exports: function () {
    }
};
P.Utl.publicChengeModule = function (k, j, b, i, h, q, l, p, a) {
    if (!k) {
        return false
    }
    var f = {
        FError: $.UT.DefaultErrorCallback,
        BError: $.UT.DefaultErrorCallback,
        button: null
    };
    p = p || false;
    $.extend(f, a);
    b = b || "";
    j = j || "";
    if (typeof k == "string") {
        k = document.getElementById(k)
    }
    var m = $(k).Widget("ModuleLoader");
    var g = ""
        , d = ""
        , n = {
        cnet: j,
        module: b,
        button: f.button,
        globalLoading: true,
        globalLoadingMask: false,
        action: null,
        errorCallback: f.FError
    };
    if (i) {
        n.action = i;
        g = $.UT.CreateRequest(n);
        if (l) {
            P.Set.ActionMapping[b][i].post = l
        }
    }
    if (h) {
        n.action = h;
        n.errorCallback = f.BError;
        if (typeof q == "function") {
            P.Set.ActionMapping[b][h].post = q
        }
        if (typeof q == "object") {
            n.post = q
        }
        d = $.UT.CreateRequest(n)
    }
    var c = null;
    if (p) {
        m.clearHtmlCache(b)
    }
    m.clearJsonCache(b);
    m.changeModule(b, g, d, c, null, f.romances)
}
;
$.UT.publicGetAction = function (c, g, p, h, j, d, b, f) {
    var n = h || "get_json";
    var m = P.Set.ActionMapping[c][n].post, a = {}, i, l, k;
    if (m) {
        P.Set.ActionMapping[c][n].post = null
    }
    d = !(d == null) ? d : false;
    b = !(b == null) ? b : false;
    f = f || null;
    i = i || null;
    if (f) {
        if (f.data) {
            a.data = f.data;
            a.offset = f.offset || null
        } else {
            a = null
        }
        i = f.button ? f.button : null;
        l = f.timeOut || undefined;
        k = f.getBiao || null
    }
    $.UT.GetActionData({
        module: c,
        action: n,
        post: g,
        get: k || null,
        button: i,
        timeout: l,
        globalLoading: d,
        globalLoadingMask: b,
        globlLoadingObj: a,
        successCallback: p || function (r) {
            var q = $("#" + c).Module();
            if (r && q) {
                q.setData(r)
            }
        }
        ,
        errorCallback: j || function (w, v, t) {
            $.UT.DefaultErrorCallback(w, v, t);
            if (v.requestUrl) {
                delete v.requestUrl
            }
            var q = $("#" + c).Module();
            var r = jQuery.isEmptyObject(v);
            if ((r == false) && q) {
                q.setData(v)
            }
        }
    });
    g = null
}
;
(function () {
        $("body").bind("click", function (b) {
            var a = b.target;
            if (a.id == "logout") {
                $.UT.Alert({
                    text: "你确定要退出吗?",
                    determineCallback: function () {
                        var d = "/" + location.pathname.split("/")[1] + "/";
                        var c = P.Utl.severTime().hours > 22 || P.Utl.severTime().hours < 3 ? "ssc" : "klc";
                        $.UT.Cookie("sysinfo", c + "|0|b|uc|beishu100", {
                            path: d
                        });
                        window.location.href = a.getAttribute("href")
                    }
                });
                return false
            }
        })
    })();
$.UT.PagerRender = function (c, d, a, b) {
    $(c).val(parseInt(a, 10) || 1);
    $(d).html(parseInt(b, 10) || 1)
}
;
$.UT.Pager = function (f) {
    if ($(f.dom).attr("pager")) {
        return
    } else {
        $(f.dom).attr("pager", true)
    }
    var c = parseInt($("#total_page", f.dom).html(), 10), a;
    var d = $("#current_page", f.dom)
        , b = {
        first: function (g) {
            if (g == 1) {
                return false
            }
            return 1
        },
        previous: function (g) {
            if (g == 1) {
                return false
            }
            g = (g <= 1 ? 1 : g - 1);
            return g
        },
        next: function (g) {
            if (g == c) {
                return false
            }
            g = (g >= c ? c : g + 1);
            return g
        },
        last: function (g) {
            if (g == c) {
                return false
            }
            return c
        },
        num: function (g) {
            g = parseInt(g, 10);
            if (g > c || !/^[1-9][0-9]*$/.test(g)) {
                alert("您输入的数字只能在 1 ～ " + c + "之间的正整数，请重新输入");
                d.val(d.attr("or"));
                return false
            } else {
                d.val(g);
                d.attr("or", g);
                return true
            }
        }
    };
    $(f.dom).bind("click", function (k) {
        var h = k.target;
        if (h.tagName === "A") {
            c = parseInt($("#total_page", f.dom).html(), 10);
            var g = parseInt(d.val(), 10);
            if (isNaN(g)) {
                return
            }
            try {
                var j = b[h.getAttribute("id")](g)
            } catch (i) {
                return false
            }
            if (j != false) {
                d.val(j);
                f.callBack({
                    pager: d.val(),
                    otype: h.getAttribute("id")
                })
            }
        }
    });
    d.bind("focus", function (g) {
        var h = parseInt(d.val(), 10);
        c = parseInt($("#total_page", f.dom).html(), 10);
        if (!isNaN(h) && 0 < h && h <= c) {
            d.attr("or", d.val())
        }
    });
    d.bind("keypress", function (g) {
        if (g.keyCode == 13 && g.type == "keypress") {
            c = parseInt($("#total_page", f.dom).html(), 10);
            if (isNaN(c) || c <= 1) {
                d.val(d.attr("or"));
                return
            }
            a = d.val();
            if (b.num(a)) {
                f.callBack({
                    pager: d.val()
                })
            }
        }
    })
}
;
$.UT.HoverList = function (a) {
    $(a.el, a.container).bind("mouseenter mouseleave", function (b) {
        var d = a.newClass ? a.newClass : "bc";
        b.type == "mouseenter" ? $(this).addClass(d) : $(this).removeClass(d)
    })
}
;
$.UT.defaultVaule = function (c, b) {
    var a = c
        , d = c[0];
    b = b + "";
    if (d.nodeName == "INPUT") {
        if (d.type == "radio") {
            a.removeAttr("checked");
            a.attr("defaultChecked", false);
            var g = $("[value=" + user[u] + "]", a);
            g.attr("checked", true);
            g.attr("defaultChecked", true)
        }
        if (d.type == "text") {
            a.attr("defaultValue", user[u]);
            a.val(user[u])
        }
    }
    if (d.nodeName == "SELECT") {
        var f = $("option", a);
        f.removeAttr("selected");
        f.attr("defaultSelected", false);
        $("option[value=" + user[u] + "]", a).attr("defaultSelected", true);
        a.val(user[u])
    }
    if (d.nodeName = "TEXTAREA") {
        a.attr("defaultValue", user[u]);
        a.val(user[u])
    }
}
;
P.Utl.tab = function (d) {
    var a = $("li", d.dom)
        , b = 0;
    if (d.f >= 0) {
        a[d.f].className = "on"
    }
    a.bind("click", {
        opt: d
    }, function (f) {
        var c = $(f.target);
        if (c.attr("class") != "on") {
            c.siblings(".on").removeClass("on");
            c.addClass("on")
        }
        if (d.callBack) {
            f.data.opt.callBack({
                index: a.index(c)
            })
        }
    })
}
;
P.Utl.changeColor = function (b) {
    if (!b) {
        return false
    }
    b[0].style.color = "green";
    var a = function () {
        b[0].style.color = "#f00"
    };
    setTimeout(a, 3000)
}
;
P.Utl.isValueChange = function (f, a) {
    var c = $("#" + f);
    var d = ""
        , b = c.data("valuelist");
    inputs = $("input", c),
        selects = $("select", c),
        textareas = $("textarea", c);
    inputs.each(function () {
        switch (this.type) {
            case "text":
            case "hidden":
                d += $.trim(this.value) + "#";
                break;
            case "radio":
            case "checkbox":
                d += (this.checked == true ? "true" : "false") + "#";
                break
        }
    });
    selects.each(function (g, h) {
        d += this.value + "#"
    });
    textareas.each(function () {
        d += $.trim(this.value) + "#"
    });
    if (a) {
        c.data("valuelist", d)
    }
    if (b) {
        if (d != b) {
            return true
        }
        if (!a) {
            $.UT.Alert({
                text: "请完成数据的修改，再提交！谢谢",
                booLean: false
            });
            return false
        }
    }
}
;
P.Utl.memuMask = function (a) {
    if (!G.menuMask) {
        G.menuMask = document.createElement("div")
    }
    var b = $(a);
    G.menuMask.style.cssText = "*filter:alpha(opacity=0);*background:white;position:absolute;width:" + b.width() + "px;height:" + b.height() + "px;top:" + b.offset().top + "px;left:" + b.offset().left + "px;z-index:100";
    document.body.appendChild(G.menuMask);
    setTimeout(function () {
        G.menuMask.style.cssText = "display:none"
    }, 500)
}
;
P.Utl.CountDown = function (h, f, g) {
    if (!f) {
        f = 0
    }
    if (f == 0) {
        return
    }
    var c = $("body").attr("CountDown")
        , b = arguments.callee
        , d = $(h)
        , i = d.attr("id");
    d.attr("nc", f);
    c = c ? c : "";
    if (c.indexOf("&" + i + "&") == -1) {
        a(h);
        return
    }
    function a(n) {
        var q = $(n), j = q.attr("id"), l, p = $("body").attr("CountDown");
        p = p ? p : "";
        if (p.indexOf("&" + j + "&") == -1) {
            p = p + "&" + j + "&";
            $("body").attr("CountDown", p)
        }
        if (!q[0]) {
            $("body").removeAttr("CountDown");
            return false
        }
        l = parseInt(q.attr("nc"), 10);
        l--;
        var t = l;
        if (l < 0 || isNaN(l)) {
            l = 0
        }
        var r = parseInt((l / 3600), 10)
            , m = parseInt(((l % 3600) / 60), 10)
            , k = parseInt((l % 60), 10);
        r = r < 10 ? "0" + r : r;
        m = m < 10 ? "0" + m : m;
        k = k < 10 ? "0" + k : k;
        r = r == "00" ? "" : r + ":";
        q.html(r + m + ":" + k);
        q.attr("nc", l);
        if (l == 0) {
            p = p.replace("&" + j + "&", "");
            $("body").attr("CountDown", p);
            if (g && t >= 0) {
                $(g).trigger("CountDownStop", [j])
            }
            return false
        }
        P.Utl[j] = setTimeout(function () {
            if (P.Utl[j]) {
                clearTimeout(P.Utl[j])
            }
            a(n);
            P.Utl[j] = null
        }, 1000)
    }
}
;
$.CL.AutoRefresh = function (b, a) {
    this.id = this.id || b[0].id || "AutoRefresh";
    this.dom = b;
    this.interval = null;
    $.extend(this, this.defaultObjs, a)
}
;
$.CL.AutoRefresh.prototype = {
    defaultObjs: {
        stopping: 1,
        timenow: 0,
        Time: 10,
        urlId: "",
        data: null,
        action: "get_json",
        stopTimes: 0,
        keepOn: true,
        callback: $.UT.DefaultSuccessCallback,
        errbackfun: function (j, d, b) {
            if (!j) {
                return false
            }
            var k = "", f, h, c, g, a = 0;
            for (f in j) {
                h = j[f];
                g = h.eid;
                c = P.Set.ErrorMapping[g];
                k += c;
                if ((g + "").slice(0, 1) == "E") {
                    if (h.note) {
                        k += h.note
                    }
                    k += "(错误码：" + g + ")<br />";
                    a = 1;
                    $.log_error(k + "||" + d.requestUrl + "||")
                }
            }
        }
    },
    show: function (a, b) {
        var c = this;
        if (b) {
            c.data = {};
            $.extend(c.data, b)
        }
        a = a == undefined ? this.Time : a;
        if (a != 0) {
            c.Time = a - 1;
            c.intervalfun(c.Time)
        }
        c.stopping = 1;
        c.timenow = a;
        this.dom.triggerHandler("show", b, this)
    },
    hide: function () {
        if (this.interval) {
            clearTimeout(this.interval)
        }
        this.interval = null;
        this.stopping = 0
    },
    stop: function () {
        var a = this;
        if (a.stopTimes > 5 && a.keepOn === false) {
            a.stopTimes = 0;
            $.UT.Alert({
                text: "系统忙，请稍后重试！",
                booLean: false
            })
        } else {
            if (!a.stp) {
                a.stp = setTimeout(function () {
                    a.show(a.timenow);
                    delete a.stp
                }, 30000)
            }
            a.stopTimes++
        }
        a.hide()
    },
    intervalfun: function (a) {
        var b = this;
        b.timeValue = a;
        if (b.interval != null) {
            clearTimeout(b.interval);
            b.interval = null
        }
        if (!document.getElementById(b.urlId)) {
            b.hide()
        }
        b.interval = setTimeout(function () {
            var c = $.UT.Cookie("sysinfo") || ""
                , f = c.split("|")
                , d = f[0]
                , g = typeof P.Set.level;
            if (d != P.Set.systype && g == "undefined" && b.id != "guendanRefresh") {
                if (location.href.indexOf("indexf") == -1) {
                    window.location.reload()
                }
            }
            if (b.dom[0].tagName == "INPUT") {
                b.dom[0].value = b.timeValue
            } else {
                b.dom[0].innerHTML = b.timeValue
            }
            if (b.stopping == 1) {
                if (b.timeValue == 0) {
                    $.UT.GetActionData({
                        module: b.urlId,
                        action: b.action,
                        post: b.data,
                        cnet: "autorefresh",
                        successCallback: b.callback,
                        errorCallback: b.errbackfun
                    });
                    b.intervalfun(b.Time)
                } else {
                    b.intervalfun(b.timeValue);
                    b.timeValue--
                }
            } else {
                clearTimeout(b.interval)
            }
        }, 1000)
    }
};
(function () {
        P.Utl.one = function (f) {
            var g = +new Date();
            var h = f.target.id
                , b = /^(klc_sys|ssc_sys|pk10_sys|nc_sys|ks_sys|kb_sys)$/;
            if (b.test(h)) {
                var c = $("#side_left").data("Module");
                if (c && c.alertOrder) {
                    var d = "你确定取消{#|6ce8|5355#},切换系统吗？";
                    $.UT.Alert({
                        text: d,
                        determineCallback: function () {
                            G.RequestQueue = {};
                            a(f);
                            c.alertOrder.close();
                            c.alertOrder = null;
                            if (c.alertOrderK) {
                                c.alertOrderK.close();
                                c.alertOrderK = null
                            }
                        },
                        cancelCallback: function () {
                            if (c.alertOrder) {
                                c.alertOrder.determine.focus().select()
                            }
                        }
                    })
                } else {
                    G.RequestQueue = {};
                    a(f);
                    if (c && c.alertOrderK) {
                        c.alertOrderK.close();
                        c.alertOrderK = null
                    }
                }
            }
            return false
        }
        ;
        function a(g) {
            var b = g.target.id;
            $("#select_sys a.switch-on").removeClass("switch-on");
            $(g.target).addClass("switch-on");
            var j = "/" + window.location.pathname.split("/")[1] + "/"
                , d = $.UT.Cookie("sysinfo") || ""
                , h = d.split("|");
            var f = P.Set.navNumber, c;
            $("div.elem_groupFilter").hide().find(".on").removeClass("on");
            var k = b.split("_")[0];
            P.Set.systype = k;
            h[0] = k;
            $("#elem_" + k).show();
            $.UT.Cookie("sysinfo", h.join("|"), {
                path: j
            });
            $("#select_sys").triggerHandler("changesys", P.Set.systype);
            var i = setTimeout(function () {
                P.Set.navNumber = P.Set["navNumber_" + k];
                $(".main-nav span").removeClass("on");
                P.Utl.setLayout(P.Set.navNumber["3d_color"], null, P.Set.systype);
                i = null
            }, 0)
        }
    })();
(function () {
        var a = function (d, c) {
            if (c) {
                return d.replace(/"/g, "ahrrncj2012")
            } else {
                return d.replace(/ahrrncj2012/g, '"')
            }
        }
            , b = function (g, f, j) {
            var i = {
                text: "<table class='t1 dataArea struct_table_center more_announcement w100'><tr><th style='width:110px'>时间</th><th>公告详情</th></tr><tbody class='more_ann_box'><tr><td colspan='2'></td></tr></tbody></table><div id='comment'></div>",
                title: "历史公告",
                booLean: false,
                width: 750,
                height: 300
            };
            var d = {}, h, k = $(".more_ann_box").length;
            i.color = typeof g === "string" ? g : null;
            if (typeof g === "string") {
                i.height = 0;
                if (P.Set.noticeBox == 0) {
                    return
                }
            } else {
                d.action = "more"
            }
            if (k == 0) {
                h = $.UT.Alert(i)
            }
            if (!f) {
                $.UT.publicGetAction("header", d, function (q) {
                    var v = q.announcement, m = v.length || 0, t = "", r;
                    if (m && m > 0) {
                        for (var n = 0; n < m; n++) {
                            r = v[n];
                            t += "<tr><td>" + r[0] + "</td><td style='text-align:left;text-indent:2em;'> " + a(r[1], 0) + "</td></tr>"
                        }
                        $(".more_ann_box").html(t.toString().keyComment());
                        $.UT.HoverList({
                            container: ".more_announcement",
                            el: "tr"
                        })
                    }
                }, "more_announcement")
            } else {
                var l = "<tr><td>" + f + "</td><td style='text-align:left;text-indent:2em;'> " + a(j, 0) + "</td></tr>";
                $(".more_ann_box").html(l.toString().keyComment())
            }
            var c = function (n) {
                var p = n.keyCode
                    , m = arguments.callee;
                if (p == 13 && h) {
                    h.close();
                    if (document.removeEventListener) {
                        document.removeEventListener("keypress", m, false)
                    }
                    if (document.detachEvent) {
                        document.detachEvent("onkeypress", m)
                    }
                }
            };
            if (k == 0) {
                if (document.addEventListener) {
                    document.addEventListener("keypress", c, false)
                }
                if (document.attachEvent) {
                    document.attachEvent("onkeypress", c)
                }
                if (h.determine && h.determine.focus) {
                    h.determine.focus()
                }
            }
            return h
        };
        P.Utl.announcement = b
    })();
P.Utl.playmp3 = function (a, b, l, m) {
    var f = document.domain;
    b = b || null;
    l = l || false;
    m = m || 3000;
    if (!a) {
        return false
    }
    if (b) {
        var k = "/wav/" + b;
        var h = '<div id="player" style="display:none"><!--[if lte IE 8]><bgsound src="' + k + '.mp3"  autostart=true loop=1 /> <![endif]--><audio autoplay><source src="' + k + '.mp3"><source src="' + k + '.ogg"></audio></div>';
        if ($("#player")[0]) {
            var j = $("#player").children("bgsound")
                , g = $("#player").children("audio");
            if (j[0]) {
                var c = false;
                j.each(function (n, p) {
                    var q = $(p).attr("src");
                    if (q == k + ".mp3") {
                        $(p).attr("src", k + ".mp3");
                        c = true;
                        return
                    }
                });
                if (!c) {
                    var i = '<bgsound src="' + k + '.mp3"  autostart=true loop=1 />';
                    $("#player").append(i.toString().keyComment())
                }
            } else {
                if (g[0]) {
                    var c = false;
                    g.each(function (p, q) {
                        var n = q.currentSrc;
                        if (n == k + ".mp3" || n == k + ".ogg") {
                            if (q.play) {
                                q.play();
                                c = true;
                                return
                            }
                        }
                    });
                    if (!c) {
                        var i = '<audio autoplay><source src="' + k + '.mp3"><source src="' + k + '.ogg"></audio>';
                        $("#player").append(i.toString().keyComment())
                    }
                }
            }
        } else {
            $("body").append(h.toString().keyComment())
        }
    }
    if (!l) {
        var d = $.UT.Alert({
            mask: false,
            width: "300",
            text: a,
            booLean: false,
            offset: {
                right: 0,
                bottom: 0
            },
            drag: false,
            CustomPos: "custom"
        });
        window.setTimeout(function () {
            d.closeBtn.click();
            delete d
        }, 10000)
    }
}
;
P.Utl.severTime = function () {
    var b = P.Set.tt
        , p = {}
        , w = 86400000;
    var l = new Date(Number(b));
    if (l.getHours() < 5) {
        l = new Date(l - w)
    }
    var g = l.getDay();
    var q = l.getDate();
    var c = l.getMonth();
    var j = l.getFullYear();

    function m(d) {
        var z = d.getFullYear();
        var B = d.getMonth() + 1;
        var A = d.getDate();
        if (B < 10) {
            B = "0" + B
        }
        if (A < 10) {
            A = "0" + A
        }
        return (z + "-" + B + "-" + A)
    }

    function x(A) {
        var d = new Date(j, A, 1);
        var z = new Date(j, A + 1, 1);
        var B = (z - d) / (1000 * 60 * 60 * 24);
        return B
    }

    function y() {
        var d;
        if (g == 0) {
            d = new Date(j, c, q - g - 6)
        } else {
            d = new Date(j, c, q - g + 1)
        }
        return m(d)
    }

    function f() {
        var d;
        if (g == 0) {
            d = new Date(j, c, q + (6 - g) - 6)
        } else {
            d = new Date(j, c, q + (6 - g) + 1)
        }
        return m(d)
    }

    function n() {
        var d;
        if (g == 0) {
            d = new Date(j, c, q - g - 13)
        } else {
            d = new Date(j, c, q - g - 6)
        }
        return m(d)
    }

    function t() {
        var d;
        if (g == 0) {
            d = new Date(j, c, (q - 13) + (6 - g))
        } else {
            d = new Date(j, c, (q - 6) + (6 - g))
        }
        return m(d)
    }

    function v() {
        var d = new Date(j, c, 1);
        return m(d)
    }

    function a() {
        var d = new Date(j, c, x(c));
        return m(d)
    }

    p.day = m(l);
    var r = new Date(l - w);
    p.b_day = m(r);
    var i = new Date(Number(+l + w));
    p.n_day = m(i);
    p.week_b = y();
    p.week_e = f();
    p.b_week_b = n();
    p.b_week_e = t();
    p.month_b = v();
    p.month_e = a();
    var k = new Date(j, c - 1, 1);
    p.b_month_b = m(k);
    var h = new Date(j, c - 1, x(c - 1));
    p.b_month_e = m(h);
    p.hours = l.getHours();
    return p
}
;
function letterformat(b, a) {
    if (a) {
        return b.replace(/"/g, "ahrrncj2012")
    } else {
        return b.replace(/ahrrncj2012/g, '"')
    }
}
document.body.oncontextmenu = function () {
    return false
}
;
P.Utl.winSetData = function (c) {
    if (!c) {
        return false
    }
    var a = document.getElementById("win")
        , b = "";
    if (c.win && a) {
        P.Set.win = c.win;
        a.className = "red";
        a.innerHTML = P.Set.win
    }
}
;
P.Utl.nCLBindData = function (c) {
    var j = c.betnotice;
    if (j) {
        var h = j.resultnum;
        if (h.length > 0) {
            var b = $("#resultnum").children();
            $(h).each(function (d) {
                $(b[d]).removeClass();
                if (h[d]) {
                    $(b[d]).addClass("number num" + parseInt(h[d], 10))
                }
            })
        } else {
            var b = $("#resultnum").children();
            b.each(function (d) {
                this.className = ""
            })
        }
    }
    if (c.changlong && c.changlong.length > 0) {
        var m = ""
            , n = c.changlong
            , f = 0
            , g = [];
        if (P.Set.systype == "ks") {
            var g = [], a;
            var l = c.changlong;
            for (var f = 0; f < l.length; f++) {
                switch (l[f][5]) {
                    case "大":
                        a = "red";
                        break;
                    case "通吃":
                        a = "greener";
                        break;
                    default:
                        a = " "
                }
                g[f] = ["<tr>", '<td class="align-c  tdqs">', l[f][0], "</td>", '<td class="tdball"><span class="number num', l[f][1], '"></span></td>', '<td class="tdball"><span class="number num', l[f][2], '"></span></td>', '<td class="tdball"><span class="number num', l[f][3], '"></span></td>', '<td class="align-c tdnum ">', l[f][4], "</td>", '<td class="align-c tdbig ' + a + ' ">', l[f][5], "</td>", "</tr>"].join("")
            }
        } else {
            for (; f < n.length; f++) {
                var k = n[f][1] ? '<span class="part">-</span>' + n[f][1] : "";
                m = '<tr><td class="cl_1 inner_text">' + n[f][0] + k + '</td><td class="align-c red" style="width:33%;">' + n[f][2] + "</td></tr>";
                g.push(m)
            }
        }
        $("#changlong").html(g.join("").toString().keyComment())
    } else {
        $("#changlong").html('<tr><td class="align-c">暂无数据</td></tr>')
    }
}
;
var _change = {
    ary0: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    ary1: ["", "十", "百", "千"],
    ary2: ["", "万", "亿", "兆"],
    init: function (a) {
        this.name = a
    },
    strrev: function () {
        if (!this.name || (/^0|\D/.test(this.name) && parseInt(this.name, 10) != 0)) {
            return false
        }
        var b = [];
        for (var a = this.name.length; a >= 0; a--) {
            b.push(this.name.charAt(a))
        }
        return b.join("")
    },
    pri_ary: function () {
        var h = this;
        var d = this.strrev();
        if (!d) {
            return ""
        }
        if (Number(d) == 0) {
            return this.ary0[0]
        }
        var f = "";
        var a = "";
        var b = -1;
        var g = "";
        for (var c = 0; c < d.length; c++) {
            if (c % 4 == 0) {
                b++;
                a = this.ary2[b] + a;
                if (c >= 8 && a.charAt(1) == this.ary2[b - 1]) {
                    a = a.replace(a.charAt(1), "")
                }
                f = ""
            }
            if (d.charAt(c) == "0") {
                switch (c % 4) {
                    case 0:
                        break;
                    case 1:
                    case 2:
                    case 3:
                        if (d.charAt(c - 1) != "0") {
                            f = "零"
                        }
                        break
                }
                a = f + a;
                f = ""
            } else {
                a = !parseInt(d.charAt(c)) ? "" : this.ary0[parseInt(d.charAt(c))] + this.ary1[c % 4] + a
            }
        }
        if (a.indexOf("零") == 0) {
            a = a.substr(1)
        }
        return a
    }
};
P.Utl.changeNumber = function () {
    this.init.apply(this, arguments)
}
;
P.Utl.changeNumber.prototype = _change;
window.onunload = function () {
    for (var a in G.cache.htmlCache) {
        $(G.cache.htmlCache[a]).remove();
        G.cache.htmlCache[a] = ""
    }
    G.cache = null
}
;
(function () {
        var a = sysInfo();
        P.Set = {
            Errors: "",
            ErrorMapping: "",
            LanguageMapping: {},
            Domain: document.domain,
            DomainOK: "",
            RemoteService: "",
            ActionMapping: {},
            UserLoginUrl: "",
            moduleNav: parseInt(document.body.getAttribute("navNum"), 10) || 9,
            firstLogin: parseInt(document.body.getAttribute("firstLogin"), 10) || 0,
            reE: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
            version: a.version,
            sID: a.sID,
            ac: a.ac,
            pw: a.pw,
            tt: a.tt,
            pa: a.pa,
            ip: a.ip,
            tk: a.tk,
            cid: a.cid,
            cn: a.cn,
            rs: a.rs,
            ui: a.ui,
            noticeBox: a.noticeBox,
            win: a.win,
            navNum: parseInt(document.body.getAttribute("navNum"), 10),
            number: 0,
            beishu: a.beishu,
            log4jsonoff: a.log4jsonoff,
            lines: a.lines,
            pwvalidatorType: parseInt(a.pwvalidatorType, 10) || 0,
            s_password: "",
            s_passwordMsg: "",
            marquee: a.marquee,
            keyCodeReg: /0x|\/\*|\*\/|--|\bor\b|\band\b|\bselect\b|\bdrop\b|\balter\b|\binsert\b|\bupdate\b|\bdelete\b|\breplace\b|\btruncate\b|\bload_file\b|\boutfile\b|\bexec\b|\bshow\b|\bdesc\b|\bcast\b|\bunion\b/,
            keyerrMsg: "请不要输入：0x、*、*、-- 等特殊符号或关键字!",
            systype: a.systype
        };
        a = null
    })();
(function () {
    var b = location.href.split("//")[1];
    P.Set.Domain = b.split("/")[0];
    P.Set.DomainOK = 1;
    try {
        if (!document.toSource) {
            document.domain = P.Set.Domain
        }
    } catch (a) {
        P.Set.DomainOK = 0
    }
}());
P.Set.RemoteService = "http://" + P.Set.Domain + "/";
P.Set.UserLoginUrl = "http://" + P.Set.Domain + "/";
(function () {
        var a = "/" + location.pathname.split("/")[1] + "/"
            , b = $.UT.Cookie("sysinfo");
        if (!b || b == 0) {
            $.UT.Cookie("sysinfo", P.Set.systype + "|0|b|uc|beishu100", {
                path: a
            })
        }
    })();
P.Utl.submit = function (H, g, B) {
    var v = $("#side_left").data("Module")
        , n = P.Set.systype;
    if (!g) {
        return false
    }
    var K = {};
    var f = [];
    var y = $(".common");
    var h = $(".kuaijie");
    var x = B ? document.getElementById(B) : null;
    var q = x ? x.parentNode : null;
    var d = $(".elem_amount_input"), m;
    if (d[0] && d[0].value) {
        m = d[0].value
    } else {
        if (d[1] && d[1].value) {
            m = d[1].value
        }
    }
    var t = $(".onBg[number]", h);
    switch (g) {
        case "ball":
            if (h[0] && h.css("display") != "none") {
                if (t[0]) {
                    if (m == "" || m == undefined || !(m.match(/^0|\D/) == null) || /^0|\D/.test(m) || parseInt(m, 10) <= 0) {
                        $.UT.Alert({
                            booLean: false,
                            text: "您输入类型不正确或没有输入实际金额！"
                        });
                        $(".elem_amount_input").val("");
                        return false
                    }
                    if (P.Set.beishu == 1) {
                        m = P.Utl.beishuValue(m)
                    }
                    t.each(function (a, c) {
                        var Q = {};
                        Q.num = c.getAttribute("number");
                        Q.odds = c.innerHTML;
                        Q.am = m;
                        Q.playType = c.getAttribute("playType");
                        if (P.Set.systype == "ssc") {
                            var b = $(c).prev().html();
                            Q.con = b.toLowerCase().indexOf("span") > -1 ? Q.num : b
                        }
                        f.push(Q);
                        K.note = f
                    })
                } else {
                    $.UT.Alert({
                        booLean: false,
                        text: "您未选择号码！"
                    });
                    $(".amount-input").val("");
                    return false
                }
            } else {
                if (y[0] && y.css("display") != "none") {
                    var N = $(".amount-input", H);
                    var I = $("td.amount", H), m;
                    I.each(function (Q, S) {
                        m = $(S).children("input").val();
                        var U = {};
                        if (m != "" && m != undefined) {
                            if (m.match(/^0|\D/) == null && parseInt(m, 10) > 0) {
                                var c = $(S).prev("td");
                                U.num = c[0].getAttribute("number");
                                U.odds = c[0].innerHTML;
                                if (P.Set.beishu == 1) {
                                    m = P.Utl.beishuValue(m)
                                }
                                U.am = m;
                                U.playType = $(c[0]).attr("playType");
                                if (P.Set.systype == "ssc") {
                                    var b = $("input", S).length, T = $(S).prev(), R;
                                    if (b == 0) {
                                        R = T.html()
                                    } else {
                                        R = T.prev().html()
                                    }
                                    U.con = R.toLowerCase().indexOf("span") > -1 ? U.num : R
                                }
                                f.push(U);
                                K.note = f
                            } else {
                                $.UT.Alert({
                                    booLean: false,
                                    text: "您输入类型不正确或没有输入实际金额！"
                                });
                                f = null;
                                $(".amount-input").val("");
                                return false
                            }
                        }
                    });
                    $(".amount-input").val("");
                    if (f == null) {
                        return
                    }
                }
            }
            break;
        case "evenCode":
        case "evenCode_nc":
            var l = $("#" + g).Module();
            var z = l.numList;
            var w = l.numCache;
            var p = l.playType;
            var r = l.odds;
            if (m != "" && m != undefined) {
                if (m.match(/^0|\D/) == null && parseInt(m, 10) > 0) {
                    if (P.Set.beishu == 1) {
                        m = P.Utl.beishuValue(m)
                    }
                    if (z[0]) {
                        $.each(z, function (a, Q) {
                            var b = ""
                                , c = {};
                            if (Q instanceof Array) {
                                $(Q).each(function (i) {
                                    (i == Q.length - 1) ? b += Q[i] : b += Q[i] + ","
                                })
                            } else {
                                b = Q
                            }
                            c.playType = p;
                            c.odds = r;
                            c.num = b;
                            c.am = m;
                            f.push(c)
                        });
                        K.note = f;
                        K.numCache = {};
                        K.numCache.num = w;
                        K.numCache.odds = r;
                        K.numCache.playType = p;
                        $(".huiseBg").removeClass("huiseBg")
                    } else {
                        if (g == "evenCode") {
                            var A = {
                                "061": "2",
                                "062": "2",
                                "063": "2",
                                "064": "3",
                                "065": "3",
                                "066": "3",
                                "067": "4",
                                "068": "5"
                            }
                        } else {
                            if (g == "evenCode_nc") {
                                var A = {
                                    "060": "1",
                                    "061": "1",
                                    "062": "2",
                                    "063": "2",
                                    "064": "",
                                    "065": "3",
                                    "066": "3",
                                    "067": "",
                                    "068": "4",
                                    "069": "5",
                                    "074": "3"
                                }
                            }
                        }
                        if (A[p]) {
                            $.UT.Alert({
                                booLean: false,
                                text: "你选择的球号数量不够，此玩法最少选择" + A[p] + "个球号！"
                            })
                        } else {
                            var M = w[0]
                                , L = w[1]
                                , J = w[2];
                            if (M instanceof Array) {
                                if (p == "064") {
                                    if (M.length == 0 || J.length == 0) {
                                        $.UT.Alert({
                                            booLean: false,
                                            text: "前位（后位）最少必须选择1个号码！"
                                        })
                                    }
                                    if (M.length == 1 && J.length == 1 && M[0] == J[0]) {
                                        $.UT.Alert({
                                            booLean: false,
                                            text: "选择的号码不能构成有效{#|6ce8|5355#}，请重新选择！"
                                        })
                                    }
                                }
                                if (p == "067") {
                                    if (M.length == 0 || L.length == 0 || J.length == 0) {
                                        $.UT.Alert({
                                            booLean: false,
                                            text: "前位（中位，后位）最少必须选择1个号码！"
                                        })
                                    }
                                    if (M.length == 1 && L.length == 1 && J.length == 1 && M[0] == J[0] && M[0] == L[0]) {
                                        $.UT.Alert({
                                            booLean: false,
                                            text: "选择的号码不能构成有效{#|6ce8|5355#}，请重新选择！"
                                        })
                                    }
                                }
                            } else {
                                $.UT.Alert({
                                    booLean: false,
                                    text: "请选择号码！"
                                })
                            }
                        }
                        delete f;
                        delete K;
                        $(".amount-input").val("");
                        return false
                    }
                } else {
                    $.UT.Alert({
                        booLean: false,
                        text: "您输入类型不正确或没有输入实际金额！"
                    });
                    f = null;
                    $("input:text").val("");
                    return false
                }
            }
            break
    }
    if (f != null && f.length == 0) {
        $.UT.Alert({
            booLean: false,
            text: "您输入类型不正确或没有输入实际金额！"
        });
        f = null;
        $(".amount-input").val("");
        return false
    }
    H = null;
    delete H;
    if (f) {
        for (var F = 0; F < f.length; F++) {
            if (n == "klc") {
                var E = P.Set.category[f[F].playType]
            } else {
                if (n == "pk10") {
                    var E = P.Set.category_pk10[f[F].playType]
                } else {
                    if (n == "ssc") {
                        var E = P.Set.category_sc[f[F].playType]
                    } else {
                        if (n == "nc") {
                            var E = P.Set.category_nc[f[F].playType]
                        } else {
                            if (n == "ks") {
                                var E = P.Set.category_ks[f[F].playType]
                            } else {
                                if (n == "kb") {
                                    var E = P.Set.category_kb[f[F].playType]
                                }
                            }
                        }
                    }
                }
            }
            var D = parseInt(f[F].am, 10)
                , r = f[F].odds;
            if (r == "") {
                $.UT.Alert({
                    booLean: false,
                    text: "{#|8d54|7387#}不能为空"
                });
                return false
            }
            if (P.Set.limit[P.Set.systype]) {
                var O = ""
                    , j = "";
                try {
                    O = P.Set.limit[P.Set.systype][E][0],
                        j = P.Set.limit[P.Set.systype][E][1]
                } catch (k) {
                }
                if (!(j >= D && D >= O)) {
                    var C = D >= j ? "你输入的金额超出{#|5355|6ce8#}最高(" + parseInt(j, 10) + ")的限制！" : "你输入的金额低于{#|5355|6ce8#}最低(" + parseInt(O, 10) + ")的限制！";
                    $.UT.Alert({
                        booLean: false,
                        text: C
                    });
                    $(".amount-input").val("");
                    if (g == "evenCode_nc" || g == "evenCode") {
                        $("td[class='onBg']").children().prop("checked", false);
                        if ($("#evenCode").length > 0) {
                            $("#evenCode").Module().reset()
                        }
                        if ($("#evenCode_nc").length > 0) {
                            $("#evenCode_nc").Module().reset()
                        }
                    }
                    $(".onBg").removeClass("onBg");
                    $(".elem_selected").hide();
                    P.Set.number = 0;
                    return false
                }
            }
        }
    }
    if ($("#evenCode").length > 0) {
        $("#evenCode").Module().reset()
    }
    if ($("#evenCode_nc").length > 0) {
        $("#evenCode_nc").Module().reset()
    }
    $(".onBg").removeClass("onBg");
    $(".amount-input").val("");
    $(".bulk-amount-times").hide();
    if (g != "ball") {
        $(".touzhuArea  input:checked").removeAttr("checked")
    }
    P.Set.number = 0;
    P.Utl.yesheMoney.yuse_value();
    try {
        return K
    } finally {
        K = null
    }
}
;
P.Utl.submit_sc = function (q, y) {
    var g = $("#side_left").data("Module");
    if (!y) {
        return false
    }
    var a = []
        , t = {};
    var f = $("tr.onBg", q);
    var w = $(".amount-input", q);
    var h = $("#bulk-amount-input");
    var v = $(".kuaijiexiaju");
    var d = $(".amount", q);
    var b = $("#elem_type_div  a.on").attr("nav");
    if (y.id == "submit" || y.id == "submit_top") {
        if (b == "general") {
            var r = $("span.amount", q);
            r.each(function (B, C) {
                var A = $(C).children().val();
                var E = {};
                if (A != "" && A != undefined) {
                    if (A.match(/^0|\D/) == null && parseInt(A, 10) > 0) {
                        if (P.Set.beishu == 1) {
                            A = P.Utl.beishuValue(A)
                        }
                        var z = $(C).prev();
                        if (!z[0] || !z[0].getAttribute("number")) {
                            z = $(C).parent()
                        }
                        if (!z[0].getAttribute("number")) {
                            z = $(z).prev("td")
                        }
                        var D = $(z).prev();
                        E.con = D.attr("title");
                        E.num = z[0].getAttribute("number");
                        if ($(z[0]).children("span")[0]) {
                            E.odds = $(z[0]).children("span")[0].innerHTML
                        } else {
                            E.odds = z[0].innerHTML
                        }
                        E.am = A;
                        E.playType = $(z[0]).attr("playType");
                        a.push(E);
                        t.note = a
                    } else {
                        $.UT.Alert({
                            booLean: false,
                            text: "您输入类型不正确或没有输入实际金额！"
                        });
                        $(".amount-input").val("");
                        a = null;
                        return false
                    }
                }
            });
            if (a == null) {
                return
            }
        } else {
            if (b == "odds") {
                if (f[0]) {
                    var j = v.children("input:text").val()
                        , k = h.children("input:text").val();
                    var d = y.id == "submit" ? (k != "" ? k : j) : (j != "" ? j : k);
                    if (d == "" || !(d.match(/^0|\D/) == null) || /^0|\D/.test(d) || parseInt(d, 10) <= 0) {
                        $.UT.Alert({
                            booLean: false,
                            text: "您输入类型不正确或没有输入实际金额！"
                        });
                        $(".elem_amount_input").val("");
                        return false
                    }
                    if (P.Set.beishu == 1) {
                        d = P.Utl.beishuValue(d)
                    }
                    f.each(function (A, B) {
                        var C = {};
                        var z = $(B).children();
                        C.con = z[0].getAttribute("title");
                        C.num = z[1].getAttribute("number");
                        if (z[1].nodeName == "TD") {
                            C.odds = $(z[1]).children("span")[0].innerHTML
                        } else {
                            C.odds = z[1].innerHTML
                        }
                        C.am = d;
                        C.playType = $(z[1]).attr("playType");
                        a.push(C);
                        t.note = a
                    })
                } else {
                    $.UT.Alert({
                        booLean: false,
                        text: "您未选择号码！"
                    });
                    $(".amount-input").val("");
                    return false
                }
            }
        }
        if (a != null && a.length == 0) {
            $.UT.Alert({
                booLean: false,
                text: "您输入类型不正确或没有输入实际金额！"
            });
            a = null;
            $(".amount-input").val("");
            return false
        }
        if (a) {
            for (var p = 0; p < a.length; p++) {
                var n = P.Set.category_sc[a[p].playType]
                    , m = parseInt(a[p].am, 10);
                if (P.Set.limit[P.Set.systype]) {
                    var x = P.Set.limit[P.Set.systype][n][0]
                        , c = P.Set.limit[P.Set.systype][n][1];
                    if (!(c >= m && m >= x)) {
                        var l = m >= c ? "你输入的金额超出{#|5355|6ce8#}最高(" + parseInt(c, 10) + ")的限制！" : "你输入的金额低于{#|5355|6ce8#}最低(" + parseInt(x, 10) + ")的限制！";
                        $.UT.Alert({
                            booLean: false,
                            text: l
                        });
                        $(".amount-input").val("");
                        $(".onBg").removeClass("onBg");
                        $(".elem_selected").hide();
                        P.Set.number = 0;
                        return false
                    }
                }
            }
        }
        f.removeClass("onBg");
        $("#elem_selected").hide();
        $(".amount-input").val("");
        P.Set.number = 0;
        P.Utl.yesheMoney.yuse_value();
        try {
            return t
        } finally {
            t = null
        }
    }
    q = null;
    y = null;
    delete q;
    delete y;
    f.removeClass("onBg");
    $(".amount-input").val("");
    $("#elem_selected").hide();
    P.Set.number = 0;
    return false
}
;
P.Utl.beishuValue = function (d) {
    var b = $("#beishu"), a, f = "1", c;
    if (b) {
        a = b.attr("checked");
        f = $(".beisx:checked").val();
        if (a == "checked" || a == true) {
            c = d == "" ? "" : d + f.slice(1)
        } else {
            c = d
        }
    }
    return c
}
;
P.Utl.keydBeishu = function (a, f) {
    return;
    var c = $("#beishu"), b, h = "1";
    if (c) {
        b = c.attr("checked");
        h = $(".beisx:checked").val();
        if (b == "checked" || b == true) {
            var d = a.value, g;
            g = d == "" ? "" : d + h.slice(1);
            $(".elem_amount_input").val(g);
            a.value = g
        }
    }
}
;
P.Utl.keydown_sc = function (i, h, g, d, c, b) {
    var f;
    i = i;
    var a = function (l) {
        var j = l.target;
        if (l.keyCode == 13 && l.type == "keydown") {
            if (b) {
                i = b
            }
            if (l.target.nodeName.toLowerCase() != "input") {
                return
            } else {
                if (l.target.type == "radio" || l.target.type == "checkbox") {
                    return
                }
            }
            P.Utl.keydBeishu(j);
            if (j.parentNode.id == "bulk-amount-input") {
                f = d.call(this, i, h)
            } else {
                f = d.call(this, i, g)
            }
            if (c) {
                f = c.call(this, f)
            }
            var k = $("#side_left").data("Module");
            if (f) {
                k.bindSubObj(f, 1)
            }
            $(j).blur();
            P.Set.number = 0;
            return false
        }
    };
    $(i).bind("keydown." + i[0].id, a)
}
;
P.Utl.keydown = function (h, c, f, d, b) {
    var g;
    var h = h;
    var a = function (l) {
        if (l.keyCode == 13 && l.type == "keydown") {
            if (b) {
                h = b
            }
            if (l.target.nodeName.toLowerCase() != "input") {
                return
            } else {
                if (l.target.type == "radio" || l.target.type == "checkbox") {
                    return
                }
            }
            var i = l.target
                , j = i.id;
            P.Utl.keydBeishu(i);
            g = f.call(this, h, c, j);
            if (d) {
                g = d.call(this, g)
            }
            var k = $("#side_left").data("Module");
            if (g) {
                k.bindSubObj(g)
            }
            $(i).blur();
            P.Set.number = 0;
            return false
        }
    };
    $(h).bind("keydown." + h[0].id, a)
}
;
P.Utl.radio = function (b) {
    var a = function (d) {
        if (d.target.nodeName == "INPUT") {
            var c = $(b.dom + " :checked").attr("id");
            b.callBack({
                radio: c
            })
        }
    };
    $(b.dom).bind("click", a)
}
;
P.Utl.minNav = function (f) {
    var d = $(".bq-title");
    var a = function (h) {
        $(h).addClass("kon").siblings().removeClass("kon");
        $(".kon input").attr("checked", true);
        var g = $("#evenCode").Module() || $("#evenCode_nc").Module();
        if (g) {
            g.numCache = [];
            g.playType = $(".kon input").attr("playType");
            g.uAction = 0
        } else {
            $(".touzhuArea tbody td").removeClass("huiseBg")
        }
        $(".elem_selected").hide();
        d.children().removeClass("kon");
        var i = $(".kon span").html();
        $(".onBg").removeClass("onBg");
        if (g) {
            if (f == "evenCode_nc") {
                g.pageShow(g.playType)
            }
        }
        if (i == "-" || i == "") {
            g.guanpan()
        } else {
            $(".elem_amount_input,.touzhuArea input").removeAttr("checked");
            g.guanpan(true)
        }
    };
    var c = function (l) {
        var i = l.target;
        var j = $("span", $(i)).html();
        if (j == "-") {
        }
        P.Utl.memuMask(".ballqueue-module");
        if (f == "evenCode" || f == "evenCode_nc") {
            var k = $("#side_left").data("Module");
            if (k && $("#confirmOrder").css("display") != "none") {
                $.UT.Alert({
                    text: "您是否要切换玩法吗？",
                    determineCallback: function () {
                        a(i);
                        $("#confirmOrder").css("display", "none");
                        $("#leftUser").css("display", "")
                    }
                });
                return
            } else {
                a(i)
            }
        } else {
            $(i).addClass("kon").siblings().removeClass("kon");
            var h = i.getAttribute("cat");
            var n = {}
                , g = $("#firstball");
            n.cat = h;
            n.ball = !g ? "" : g.attr("cat");
            n.play = !g ? "" : g.attr("play");
            $.UT.publicGetAction(f, n, function (m) {
                var p = $("#" + f).Module();
                p.setData(m)
            })
        }
        if (i.nodeName == "INPUT" || i.nodeName == "LABEL") {
            if (l.stopPropagation) {
                l.stopPropagation()
            } else {
                l.cancelBubble = true
            }
        }
    };
    var b = function (j) {
        var h = $("#side_left").data("Module");
        var g = j.target;
        var i = g.parentNode;
        if (h && $("#confirmOrder").css("display") != "none") {
            $.UT.Alert({
                text: "您是否要切换玩法吗？",
                determineCallback: function () {
                    a(i);
                    $("#confirmOrder").css("display", "none");
                    $("#leftUser").css("display", "")
                }
            });
            return false
        } else {
            a(i)
        }
        if (g.nodeName == "INPUT" || g.nodeName == "LABEL") {
            if (j.stopPropagation) {
                j.stopPropagation()
            } else {
                j.cancelBubble = true
            }
        }
    };
    d.bind("click", c);
    $(".bq-title input,.bq-title label,.bq-title span").bind("click", b)
}
;
P.Utl.checked = function (h) {
    var m = $("#bulk-amount-input", h)
        , l = $("#bulk-amount-input-top", h)
        , v = $(".common", h)
        , g = $(".kuaijie", h)
        , x = $(".elem_type")
        , p = $(".shuoming", h)
        , d = $("#kuaijiexiaju_box", h)
        , n = $(".elem_selected", h)
        , a = $("#selectedAmount")
        , f = $("#side_left").data("Module");
    var t = function (H) {
        var A = $(h).Module()
            , y = A.drawStatus
            , C = A.user_status;
        if (y == 1 && C == 1) {
            var z = H.target, I = z.nodeName.toLowerCase(), B;
            B = I == "td" ? z : z.parentNode;
            if (B.innerHTML != "" && B.innerHTML != "&nbsp;") {
                var F = B.cellIndex
                    , k = B.className
                    , E = k.indexOf("onBg")
                    , D = k.indexOf("huiseBg");
                if (D == -1) {
                    var c = $(B)
                        , b = F % 2 == 0 ? c.next() : c.prev()
                        , J = b.html();
                    if (J != "" && J != "&nbsp;") {
                        if (E == -1) {
                            c.addClass("onBg");
                            b.addClass("onBg");
                            P.Set.number++
                        } else {
                            c.removeClass("onBg");
                            b.removeClass("onBg");
                            P.Set.number--
                        }
                        if (P.Set.number != 0) {
                            n.show();
                            a.html(P.Set.number.toString().keyComment())
                        } else {
                            n.hide();
                            P.Set.number = 0
                        }
                    }
                }
            }
        }
    };
    var w = function (j) {
        var b = j.target
            , k = b.getAttribute("nav");
        if (!k) {
            return
        }
        if (f && f.alertOrderK) {
            f.alertOrderK.close();
            f.alertOrderK = null
        }
        if (f && f.alertOrder) {
            var i = "你确定取消{#|6ce8|5355#},切换{#|6295|6ce8#}类型吗？";
            $.UT.Alert({
                text: i,
                determineCallback: function () {
                    c();
                    return false
                },
                cancelCallback: function () {
                    if (f.alertOrder) {
                        f.alertOrder.determine.focus().select()
                    }
                }
            })
        } else {
            c();
            P.Set.number = 0
        }
        function c() {
            $(".on", x).removeClass("on");
            $(b).addClass("on");
            if (k == "odds") {
                v.hide();
                g.show();
                m.show();
                l.show();
                n.hide()
            }
            if (k == "general") {
                v.show();
                g.hide();
                m.hide();
                l.hide();
                $(".amount-input").val("");
                $(".onBg", h).removeClass("onBg");
                n.hide()
            }
            if (f) {
                if (f.alertOrder) {
                    f.alertOrder.close();
                    f.alertOrder = null
                }
            }
        }

        document.body.setAttribute("nav2", k)
    };
    x.bind("click", w);
    $(".touzhuArea td,.bettable td", g).bind("mousedown", t);
    if (P.Set.beishu == 1) {
        var q = function (b) {
            var c = $(".beisx:checked")[0].id;
            $.UT.beishu_cookie({
                rad: c
            })
        };
        $(".beisx", h).bind("click", q)
    }
    $.UT.HoverList_tzxc({
        container: ".kuaijie .t1"
    });
    $.UT.HoverList_tzxc({
        container: ".common .t1",
        type: 3
    });
    $(".bq-title", h).hover(function () {
        $(this).addClass("bq-title-over")
    }, function () {
        $(this).removeClass("bq-title-over")
    });
    var r = function (i) {
        var c = $("#kuaijiexiaju_input");
        var b = c.val();
        if (this.value == "") {
            this.value = b
        }
    };
    $(".common input:text", h).bind("click", r);
    $(".shuoming_alert", h).bind("click", function (b) {
        $.UT.Alert({
            title: "快捷说明",
            text: "填入预设金额后，只需鼠标点击要下注项目对应的输入框，系统将自动输入预设金额来方便快速下注。"
        })
    });
    $("#kuaijiexiaju_input").bind("blur", function (i) {
        var c = i.target.value
            , b = i.target;
        if ((c != "") && !(c.match(/\D/) == null && parseInt(c, 10) > 0)) {
            b.value = "";
            b.focus();
            return false
        }
    })
}
;
P.Utl.bei = function (b) {
    var a = function () {
        var d = $("#beishu", b)
            , f = d.attr("checked");
        if (f == "checked") {
            $("[name=beishu]").removeAttr("disabled");
            $.UT.beishu_cookie({
                cek: "c"
            })
        } else {
            $("[name=beishu]").attr("disabled", "disabled");
            $.UT.beishu_cookie({
                cek: "uc"
            })
        }
    };
    $("#beishu", b).bind("click", a)
}
;
$.UT.beishu = function () {
    var i = $.UT.Cookie("sysinfo");
    var d = i ? i.split("|") : []
        , h = d[3] || "uc"
        , b = d[4] || "beishu100"
        , g = $("#" + b)
        , f = $("#beishu");
    if (b && g[0]) {
        g[0].checked = true
    } else {
        $("#beishu100").attr("checked", "checked")
    }
    if (f.length > 0) {
        if (h == "c") {
            f[0].checked = true;
            $("[name=beishu]").removeAttr("disabled")
        } else {
            if (h == "uc") {
                f[0].checked = false;
                $("[name=beishu]").attr("disabled", "disabled")
            }
        }
    }
}
;
$.UT.beishu_cookie = function (h) {
    var j = $.UT.Cookie("sysinfo");
    var d = j ? j.split("|") : []
        , f = d[3] || "uc"
        , b = d[4] || "beishu100"
        , g = "/" + location.pathname.split("/")[1] + "/";
    b = h.rad ? h.rad : b;
    f = h.cek ? h.cek : f;
    d[3] = f;
    d[4] = b;
    j = d.join("|");
    if (!h.del) {
        $.UT.Cookie("sysinfo", j, {
            path: g
        })
    } else {
        var i = new Date();
        i.setTime(i.getTime() - 1);
        document.cookie = "sysinfo=" + j + "path=" + g + ";expires=" + i.toGMTString()
    }
}
;
$.UT.HoverList_tzxc = function (b) {
    var a = function (j) {
        var p = j.target
            , q = p.nodeName.toLowerCase();
        if (q != "td") {
            return
        }
        var l = b.newClass ? b.newClass : "bc", n = b.type || 2, h = p.cellIndex, d = $(p), f, g, m;
        if (n == 2) {
            f = h % 2 == 0 ? d.next() : d.prev()
        } else {
            if (n == 3) {
                g = h % 3;
                if (g == 0) {
                    f = d.next();
                    m = f.next()
                } else {
                    if (g == 1) {
                        f = d.next();
                        m = d.prev()
                    } else {
                        f = d.prev();
                        m = f.prev()
                    }
                }
            }
        }
        switch (j.type) {
            case "mouseover":
                d.addClass(l);
                f.addClass(l);
                if (m) {
                    m.addClass(l)
                }
                break;
            case "mouseout":
                d.removeClass(l);
                f.removeClass(l);
                if (m) {
                    m.removeClass(l)
                }
                break
        }
    };
    $(b.container).bind("mouseover mouseout", a)
}
;
P.Utl.orderMit = function (c) {
    var i, f, d = {
        note: []
    }, b = {}, k = P.Set.systype, a = c.attr("id");
    if (k == "ssc" && a == "integrate_sc") {
        i = $("#twoGall_Num", c);
        f = $("td[number] span:first-child", i);
        f = f.add($("td[number]", i).prev());
        f.hover(function (l) {
            if ($(".amount:visible", i).length != 0) {
                j(l)
            }
        }, function (l) {
            if ($(".amount:visible", i).length != 0) {
                h(l)
            }
        })
    } else {
        i = $(".common", c);
        f = $("[number]", i);
        f = f.add(f.prev());
        f.hover(function (l) {
            j(l)
        }, function (l) {
            h(l)
        })
    }
    function j(m) {
        var l = $(m.target);
        if (l.html() != "-" && l.html() != "") {
            l.css({
                cursor: "pointer",
                "text-decoration": "underline"
            })
        }
    }

    function h(m) {
        var l = $(m.target);
        if (l.html() != "-" && l.html() != "") {
            l.css({
                cursor: "text",
                "text-decoration": "none"
            })
        }
    }

    f.bind("click", function (l) {
        if (k == "ssc") {
            if ($(".touzhuArea .amount:visible").length != 0) {
                g(l)
            }
        } else {
            g(l)
        }
    });
    function g(J) {
        _this = $("#side_left").Module();
        if (_this == null) {
            return false
        }
        var L = $(J.target), I;
        if (L[0].nodeName != "TD") {
            L = L.parent("td")
        }
        if (!L.attr("number")) {
            L = L.next("[number]")
        }
        if (k == "ssc" && a == "integrate_sc") {
            I = L.children("span").first();
            b.con = L.prev().attr("title")
        } else {
            I = L;
            var q = L.prev().html().toLowerCase();
            b.con = q.indexOf("span") > -1 ? L.attr("number") : q
        }
        _this.params = {};
        _this.params.v = "";
        _this.params.t = "";
        b.num = L.attr("number"),
            b.playType = L.attr("playtype"),
            b.odds = I.html(),
            b.am;
        var A = "";
        var B = L.prev();
        var r = B.offset();
        var H = "290";
        var n = $("#layout").width();
        var C = document.getElementById("layout").scrollTop;
        var E = $("#layout").offset();
        r.left = r.left - E.left;
        if ((r.left + Number(H)) > (n - 22)) {
            r.left = n - Number(H) - 30
        }
        r.top = r.top - E.top;
        r.top = r.top + C;
        r.top = r.top + B.height();
        var l = {
            "1": "",
            "100": "百倍",
            "1000": "千倍",
            "10000": "万倍"
        };
        var y = $("#beishu", c), K, z = "1", x = "";
        if (y) {
            K = y.attr("checked");
            if (K == "checked" || K == true) {
                z = $(".beisx:checked").val();
                x = '&nbsp;X&nbsp;<strong><font color="red">' + l[z] + "</font></strong>"
            }
        }
        $(".beisx,#beishu").bind("change", function (m) {
            K = y.attr("checked");
            if (K == "checked" || K == true) {
                z = $(".beisx:checked").val();
                x = '&nbsp;X&nbsp;<strong><font color="red" id="bsshow">' + l[z] + "</font></strong>";
                if (_this.alertOrderK) {
                    $("#bsshow").html(x.toString().keyComment())
                }
            } else {
                $("#bsshow").html("");
                z = "1"
            }
        });
        var F = $(c).Module()
            , D = F.drawStatus
            , w = F.user_status;
        if (w == "2") {
            return false
        }
        if (b.odds != "-" && b.odds != "") {
            var v;
            if (k == "klc") {
                v = P.Set.playType[b.playType] + "&nbsp;&nbsp;" + P.Set.playBall[b.num]
            } else {
                if (k == "pk10") {
                    v = P.Utl.number_pk10(b.playType, b.num).join(" ")
                } else {
                    if (k == "ssc") {
                        var t = (b.con + "").toLowerCase().indexOf("span") > -1 ? b.num : b.con;
                        v = P.Set.playType_sc[b.playType] + "&nbsp;&nbsp;" + t
                    } else {
                        if (k == "nc") {
                            v = P.Set.playType_nc[b.playType] + "&nbsp;&nbsp;" + P.Set.playBall_nc[b.num]
                        } else {
                            if (k == "ks") {
                                v = P.Set.number_ks(b.playType, b.num)
                            } else {
                                if (k == "kb") {
                                    v = P.Set.number_kb(b.playType, b.num)
                                }
                            }
                        }
                    }
                }
            }
            A += '<p align="center"><span><strong><font color="blue">' + v + '&nbsp;&nbsp;</font></strong></span><span>@&nbsp;</span><span><strong><font color="red">' + b.odds + '</font></strong></span><span>&nbsp;X&nbsp;</span><span><input id="kuashuorder" maxlength="9" style="width:60px" type="text" /></span><span id="bsshow">' + x + "</span></p>";
            if (_this.alertOrderK) {
                _this.alertOrderK.options.region = B;
                _this.alertOrderK.dom.children()[0].innerHTML = A.toString().keyComment();
                $("#kuashuorder").focus().select();
                _this.alertOrderK.refreshPos();
                $("#kuashuorder").bind("keydown", function (m) {
                    if (m.keyCode == 13 && m.type == "keydown") {
                        _this.alertOrderK.determine.click()
                    }
                })
            } else {
                _this.alertOrderK = $.UT.Alert({
                    text: A,
                    title: "快速{#|4e0b|6ce8#}",
                    width: H,
                    mask: false,
                    close: true,
                    buttonBL: false,
                    offset: r,
                    region: B,
                    button: B,
                    drag: false,
                    bodyDom: document.getElementById("layout"),
                    determineCallback: function () {
                        _this.alertOrderK.cancel.attr("unable", "1");
                        var p = document.getElementById("kuashuorder").value;
                        if (p.match(/^0|\D/) == null && parseInt(p, 10) > 0) {
                            b.am = (p * Number(z)).toString()
                        } else {
                            $.UT.Alert({
                                booLean: false,
                                text: "您输入类型不正确或没有输入实际金额！",
                                determineCallback: function () {
                                    _this.alertOrderK.cancel.attr("unable", "0")
                                }
                            });
                            return false
                        }
                        _this.params.t = b.playType + "|" + b.num + "|" + b.odds + "|" + b.am + ";";
                        _this.params.v = _this.version_number;
                        d.note = [];
                        d.note.push(b);
                        var m;
                        switch (k) {
                            case "klc":
                                m = "post_submit";
                                break;
                            case "ssc":
                                m = "post_submit_sc";
                                break;
                            case "pk10":
                                m = "post_submit_pk10";
                                break;
                            case "nc":
                                m = "post_submit_nc";
                                break;
                            case "ks":
                                m = "post_submit_ks";
                                break;
                            case "kb":
                                m = "post_submit_kb";
                                break
                        }
                        $.UT.publicGetAction(_this.dom[0].id, _this.params, function (M) {
                            _this.setData(M);
                            P.Utl.bet_callback({
                                data: M,
                                state: 1,
                                cachedata: d
                            });
                            _this.alertOrderK.close();
                            _this.alertOrderK = null;
                            d.note ? d.note = [] : ""
                        }, m, function (O, N, M) {
                            _this.setData(N);
                            if (M == 0) {
                                P.Utl.bet_callback({
                                    data: N,
                                    state: 0,
                                    errors: O,
                                    cachedata: d
                                });
                                _this.alertOrderK.close();
                                _this.alertOrderK = null
                            } else {
                                if (M == 2) {
                                    P.Utl.bet_callback({
                                        data: N,
                                        state: 2,
                                        errors: O,
                                        cachedata: d
                                    });
                                    _this.alertOrderK.close();
                                    _this.alertOrderK = null
                                } else {
                                    return false
                                }
                            }
                            if (_this.alertOrderK) {
                                _this.alertOrderK.cancel.attr("unable", "0")
                            }
                        }, true, true, {
                            data: '<span class="loading"></span><span class="L_H32">{#|6ce8|5355#}处理中，请不要刷新页面...</span>',
                            button: _this.alertOrderK.determine,
                            timeOut: 35000
                        })
                    }
                });
                $("#kuashuorder").focus().select();
                $("#kuashuorder").bind("keydown", function (m) {
                    if (m.keyCode == 13 && m.type == "keydown") {
                        _this.alertOrderK.determine.click()
                    }
                });
                _this.alertOrderK.cancel.bind("keydown click", function (m) {
                    if (m.keyCode == 13 && m.type == "keydown" || m.type == "click") {
                        var p = _this.alertOrderK.cancel.attr("unable") || 0;
                        if (p == 0) {
                            _this.params = null;
                            _this.alertOrderK = null
                        } else {
                            return false
                        }
                    }
                });
                _this.alertOrderK.closeBtn.bind("click", function (m) {
                    _this.alertOrderK = null;
                    _this.params = null
                })
            }
        }
    }
}
;
P.Utl.bet_callback = function (j) {
    if (d !== undefined) {
        return
    }
    var d = j.state
        , z = j.data
        , g = j.errors
        , b = j.posttype || 0
        , p = j.cachedata;
    var r, l, n, c = 0;
    switch (d) {
        case 0:
            l = q();
            b == 0 ? y(0, 0, l) : y(0, 1, l);
            break;
        case 1:
            h();
            b == 0 ? y(1) : y(1, 1);
            break;
        case 2:
            l = q();
            r = h();
            n = b == 0 ? a() : a(1);
            n == 1 ? y(2, r, l) : y(3, r, l);
            break;
        case 4:
            h();
            b == 0 ? y(4) : y(4, 1);
            break
    }
    if (c > 0) {
        P.Utl.bet_callback_show("show")
    } else {
        P.Utl.bet_callback_show("hide")
    }
    var m = "", v, q, f, w, g = j.errors;
    if (g) {
        for (v in g) {
            q = g[v],
                nt = q.note + "";
            if ((nt && nt.indexOf("|") == -1) || nt == "") {
                w = q.eid + "";
                if (w == "E102") {
                    f = P.Set.ErrorMapping.errors[w]
                } else {
                    f = P.Set.ErrorMapping[w]
                }
                m += f;
                if ((w + "").slice(0, 1) == "E") {
                    if (q.note) {
                        m += q.note
                    }
                    m += "(错误码：" + w + ")";
                    altsys = 1;
                    $.log_error(m + "||" + z.requestUrl + "||");
                    if (!G.errlog) {
                        G.errlog = $("<span>" + m.keyComment() + "</span>").Widget("Dialog", {
                            region: document.body,
                            windowRender: '<div id="erralert" style="margin:0px auto;"><span dom="container" style="float:left;height:20px;line-height:20px;border:1px solid #dddd99; background:#ffffbf;padding:0 5px;"></span><a href="javascript:void(0)" dom="close" style="float:left;width:35px;height:20px;line-height:20px;border:1px solid #dddd99; background:#ffffbf;text-align:center;color:#CD8939;font-weight:600;font-size:14px;">X</a></div>'
                        })
                    }
                    G.errlog.open("absolute", false, m);
                    G.errlog.setCenter();
                    G.errlog.window.offset({
                        top: 0
                    });
                    clearTimeout(G.errlog.ttt);
                    G.errlog.ttt = setTimeout(function () {
                        G.errlog.close();
                        clearTimeout(G.errlog.ttt)
                    }, 3000);
                    return false
                } else {
                    if (q.note) {
                        m += q.note + "<br />"
                    }
                    altsys = 0
                }
            }
        }
        if (m != "") {
            $.UT.Alert({
                text: m,
                booLean: false
            })
        }
    }
    function h() {
        if (p) {
            if (!p.numCache) {
                if (z) {
                    if (z.user && z.user.suc_orders) {
                        var L = z.user.suc_orders, J, O = "", I, B;
                        if (L) {
                            J = L.length;
                            if (J > 0) {
                                for (var C = 0; C < J; C++) {
                                    I = L[C],
                                        B = I[1].split("|");
                                    O += "<tr><td colspan='3'><p>{#|6ce8|5355#}号：<span class='greener'>" + I[0] + "</span></p><p class='text-i-em3'><span class='bluer'>" + B[0] + "</span>&nbsp; @ &nbsp;<b class='red'>" + B[1] + "</b></p><p>{#|4e0b|6ce8#}额：<span class='black'>" + I[2] + "</span></p><p>可赢额：<span class='black'>" + I[3] + "</span></p></td></tr>"
                                }
                                $("#s-list").html(O.toString().keyComment());
                                $(".suc_t_amount").html(z.user.suc_t_amount.toString().keyComment());
                                $(".suc_zhus").html(z.user.suc_zhus.toString().keyComment() + "笔");
                                c++;
                                return 1
                            }
                            return 2
                        }
                    }
                }
            } else {
                if (z) {
                    if (z.user && z.user.suc_orders) {
                        var A = z.user.suc_orders, K;
                        if (A && A[0]) {
                            var I = A[0], B = I[1].split("|"), H = p.note, J = H.length, F = "", E = H[0].am, M = p.numCache.num, k = "", N;
                            for (var C = 0; C < J; C++) {
                                N = H[C];
                                var D = N.num;
                                k += "<tr><td>" + (C + 1) + "</td><td>" + D + "</td><td>" + E + "</td></tr>"
                            }
                            if (M[0] instanceof Array) {
                                M = "前位：" + M[0] + "<br/>后位：" + M[2]
                            } else {
                                M = M.join(", ")
                            }
                            F += "<tr><td colspan='3'><p>{#|6ce8|5355#}号：<span class='greener'>" + I[0] + "</span></p><p class='text-i-em3'><span class='bluer'>" + B[0].split(" ")[0] + "</span>&nbsp; @ &nbsp;<b class='red'>" + B[1] + "</b></p><p class='text-i-em3'><span class='black'>复式[" + J + "组]</span></p><p class='text-i-em3' style='text-indent:0'><span class='black'>" + M + "</span></p><p>分组：<span class='black' style='padding-left:1em'>" + E + "x" + J + "组</span></p><p>{#|4e0b|6ce8#}额：<span class='black'>" + I[2] + "</span></p><p>可赢额：<span class='black'>" + I[3] + "</span></p></td></tr><tr><th class='db-bg' >ID</th><th class='db-bg'>号码组合</th><th class='db-bg'>{#|4e0b|6ce8#}额</th></tr>" + k;
                            $("#s-list").html(F.toString().keyComment());
                            $(".suc_t_amount").html(z.user.suc_t_amount.toString().keyComment());
                            $(".suc_zhus").html(z.user.suc_zhus.toString().keyComment() + "笔");
                            c++;
                            return 1
                        }
                    }
                }
            }
        }
    }

    function x(B, A) {
        var k = B.length, D, C = {};
        if (k > 0) {
            for (var t = 0; t < k; t++) {
                C = B[t];
                D = C.playType + C.num;
                if (D == A) {
                    return C
                }
            }
        }
    }

    function q() {
        if (!p.numCache) {
            if (g) {
                var Q = g.length;
                if (Q > 0) {
                    var J, U = 1, M, I = "", D = 0, S, R, B = p.note, F = {}, K, T;
                    B = B instanceof Array ? B : p;
                    for (var O = 0; O < Q; O++) {
                        J = g[O],
                            U = J.note;
                        if (U && U.indexOf("|") > -1) {
                            M = U.split("|");
                            if (M.length > 0) {
                                R = M[3] || "";
                                F = x(B, R) || {};
                                K = F.am || 0;
                                T = (parseInt(K, 10) * (parseFloat(M[1]) - 1)).toFixed(2);
                                I += "<dl><dt><span class='bluer'>" + M[0] + "</span>&nbsp; @ &nbsp;<b class='red'>" + M[1] + "</b></dt><dt>{#|4e0b|6ce8#}额：<span class='black'>" + K + "</span></dt><dt>可赢额：<span class='black'>" + T + "</span></dt><dd class='red' style='text-indent:0px'>" + M[2] + "</dd></dl>"
                            }
                            D++
                        }
                    }
                    $("#f-list").html(I.toString().keyComment());
                    if (D > 0) {
                        c++;
                        return 1
                    }
                }
                return 0
            }
        } else {
            if (g) {
                var Q = g.length, B = p.note, H = B.length, A = "", K = B[0].am, N = "", E = parseInt(K, 10) * H, T;
                if (p.numCache.num.length > 1) {
                    var C = [];
                    for (var L = 0; L < p.numCache.num.length; L++) {
                        if (p.numCache.num[L].length > 0) {
                            C.push(p.numCache.num[L])
                        }
                    }
                    N = C.join(", ")
                } else {
                    N = p.numCache.num.join(", ")
                }
                if (Q > 0) {
                    var J, U = 1, M, I = "", D = 0, S;
                    J = g[0],
                        U = J.note;
                    if (U && U.indexOf("|") > -1) {
                        M = U.split("|");
                        if (M.length > 0) {
                            T = (parseInt(K, 10) * (parseFloat(M[1]) - 1)).toFixed(2);
                            I += "<dl><dt><span class='bluer'>" + M[0].split(" ")[0] + "</span>&nbsp; @ &nbsp;<b class='red'>" + M[1] + "</b></dt><dt>" + N + "</dt><dt>{#|4e0b|6ce8#}额：<span class='black'>" + K + "</span></dt><dt>可赢额：<span class='black'>" + T + "</span></dt><dd class='red'>" + M[2] + "</dd></dl>"
                        }
                        $("#f-list").html(I.toString().keyComment());
                        c++;
                        return 1
                    }
                }
                return 0
            }
        }
    }

    function a(D) {
        if (z.user.orders) {
            var A = [], J = "", E, B = z.user.orders, K = [], F = P.Set.systype;
            if (B) {
                if (p.numCache) {
                    var H = p.numCache.playType, C = p.note, k = "", I = C[0].odds, T = p.numCache.num, O, L, N = parseInt(C[0].am, 10), S = 0;
                    if (T[0] instanceof Array) {
                        O = "前位：" + T[0] + "<br/>后位：" + T[2];
                        L = T[0] + "@" + T[2]
                    } else {
                        O = T.join(", ");
                        L = T.join(",")
                    }
                    if (B[H]) {
                        S = (parseInt(N, 10) * (parseFloat(B[H]) - 1)).toFixed(2);
                        if (F == "klc") {
                            A.push([P.Set.playType[H] + "&nbsp;" + O, B[H], I, N, S])
                        } else {
                            A.push([P.Set.playType_nc[H] + "&nbsp;" + O, B[H], I, N, S])
                        }
                        K.push([H, L, B[H], N * C.length]);
                        p.numCache.odds = B[H];
                        for (var Q = 0, R = C.length; Q < R; Q++) {
                            p.note[Q].odds = B[H]
                        }
                    }
                } else {
                    if (p.note) {
                        $.each(p.note, function (W, X) {
                            var U = X.playType + X.num
                                , V = 0;
                            if (B[U]) {
                                V = (parseInt(X.am, 10) * (parseFloat(B[U]) - 1)).toFixed(2);
                                if (P.Set.systype == "klc") {
                                    A.push([P.Set.playType[X.playType] + "&nbsp;" + P.Set.playBall[X.num], B[U], X.odds, X.am, V])
                                } else {
                                    if (P.Set.systype == "pk10") {
                                        var t = P.Utl.number_pk10(X.playType, X.num);
                                        A.push([t[0] + "&nbsp;" + t[1], B[U], X.odds, X.am, V])
                                    } else {
                                        if (P.Set.systype == "nc") {
                                            A.push([P.Set.playType_nc[X.playType] + "&nbsp;" + P.Set.playBall_nc[X.num], B[U], X.odds, X.am, V])
                                        } else {
                                            if (P.Set.systype == "ssc") {
                                                A.push([P.Set.playType_sc[X.playType] + "&nbsp;" + P.Utl.number_sc(X.playType, X.num)[1], B[U], X.odds, X.am, V])
                                            } else {
                                                if (P.Set.systype == "ks") {
                                                    var Y = P.Set.number_ks(X.playType, X.num);
                                                    A.push([Y, B[U], X.odds, X.am, V])
                                                } else {
                                                    if (P.Set.systype == "kb") {
                                                        var Z = P.Set.number_kb(X.playType, X.num);
                                                        A.push([Z, B[U], X.odds, X.am, V])
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                K.push([X.playType, X.num, B[U], X.am]);
                                p.note[W].odds = B[U]
                            }
                        })
                    } else {
                        $.each(p, function (V, W) {
                            var t = W.playType + W.num
                                , U = 0;
                            if (B[t]) {
                                U = (parseInt(W.am, 10) * (parseFloat(B[t]) - 1)).toFixed(2);
                                A.push([P.Set.playType_sc[W.playType] + "&nbsp;" + W.con, B[t], W.odds, W.am, U]);
                                K.push([W.playType, W.num, B[t], W.am]);
                                p[V].odds = B[t]
                            }
                        })
                    }
                }
                if (A.length > 0) {
                    for (var Q = 0, M = A.length; Q < M; Q++) {
                        E = A[Q];
                        J += "<div class='f-o-c-m'><dl><dt><span class='bluer'>" + E[0] + "</span>&nbsp; @ &nbsp;<b class='red'>" + E[1] + "</b></dt><dd class='red'>{#|8d54|7387#}不一致,</dd><dd class='red'>最新{#|8d54|7387#}:" + E[1] + "</dd><dd class='red'>旧{#|8d54|7387#}:" + E[2] + "</dd><dd class='red'>{#|4e0b|6ce8#}额:" + E[3] + "</dd><dd class='red'>可赢额:" + E[4] + "</dd><dd class='red'>" + E[0] + "&nbsp;{#|4e0b|6ce8#}失败</dd></dl><p class='center mrg20'><a href='javascript:void(0)' class='btn_m elem_btn l-c-b del-this-model' > 取消</a>&nbsp;&nbsp;<a href='javascript:void(0)' class='btn_m elem_btn l-c-b-t2 ft000 bet-again' name='" + Q + "' >确定{#|4e0b|6ce8#}</a></p></div>"
                    }
                    if (!D) {
                        $(".failure-odd-change").html(J.toString().keyComment())
                    } else {
                        $(".failure-odd-change").append(J.toString().keyComment())
                    }
                    $(".del-this-model").bind("click", function () {
                        var V = this.parentNode.parentNode;
                        if (V && V.className == "f-o-c-m") {
                            $(V).remove();
                            var U = $(".f-o-c-m").length
                                , t = $(".success").css("display")
                                , i = $(".failure").css("display");
                            if (U == 0) {
                                $(".failure-odd-change").hide()
                            }
                            if (U == 0 && t == "none" && i == "none") {
                                P.Utl.bet_callback_show("hide")
                            }
                        }
                    });
                    $(".bet-again").bind("click", function () {
                        var X = "side_left"
                            , aa = $(this).attr("name")
                            , Z = {}
                            , Y = $("#side_left").Module()
                            , t = this;
                        Z.v = Y.version_number;
                        if (K && K[aa]) {
                            var V = K[aa];
                            Z.t = V.join("|");
                            var W = P.Set.systype, U;
                            switch (W) {
                                case "klc":
                                    U = "post_submit";
                                    break;
                                case "ssc":
                                    U = "post_submit_sc";
                                    break;
                                case "pk10":
                                    U = "post_submit_pk10";
                                    break;
                                case "nc":
                                    U = "post_submit_nc";
                                    break;
                                case "ks":
                                    U = "post_submit_ks";
                                    break;
                                case "kb":
                                    U = "post_submit_kb";
                                    break
                            }
                            $.UT.publicGetAction(X, Z, function (i) {
                                var ab = t.parentNode.parentNode;
                                if (ab && ab.className == "f-o-c-m") {
                                    $(ab).remove()
                                }
                                Y.setData(i);
                                P.Utl.bet_callback({
                                    data: i,
                                    state: 4,
                                    cachedata: p,
                                    posttype: 1
                                })
                            }, U, function (ad, ab, i) {
                                Y.setData(ab);
                                var ac = t.parentNode.parentNode;
                                if (ac && ac.className == "f-o-c-m") {
                                    $(ac).remove()
                                }
                                if (i == 0) {
                                    P.Utl.bet_callback({
                                        data: ab,
                                        state: 0,
                                        errors: ad,
                                        cachedata: p,
                                        posttype: 1
                                    })
                                } else {
                                    if (i == 2) {
                                        P.Utl.bet_callback({
                                            data: ab,
                                            state: 2,
                                            errors: ad,
                                            cachedata: p,
                                            posttype: 1
                                        })
                                    }
                                }
                            })
                        }
                    });
                    c++;
                    return 1
                } else {
                    return 2
                }
            }
        }
    }

    function y(A, t, C) {
        var D = $("#newOrder")
            , B = $(".failure")
            , k = $(".failure-odd-change")
            , E = $(".success");
        D.hide();
        B.hide();
        k.hide();
        E.hide();
        switch (A) {
            case 1:
                E.show();
                if (t) {
                }
                break;
            case 0:
                if (C == 1) {
                    B.show()
                }
                if (t == 1) {
                    k.show()
                }
                break;
            case 2:
                C == 1 ? B.show() : B.hide();
                k.show();
                t == 1 ? E.show() : E.hide();
                break;
            case 3:
                C == 1 ? B.show() : B.hide();
                k.hide();
                t == 1 ? E.show() : E.hide();
                break;
            case 4:
                E.show();
                var i = $(".failure-odd-change").html();
                if (i != "") {
                    k.show()
                }
                break
        }
    }
}
;
P.Utl.bet_callback_show = function (a) {
    if (a == "hide") {
        $("#successinfo").hide();
        $("#newOrder").show();
        $("#left_times_title").hide();
        $("#accountInfoback .hide-successinfo").removeClass("t1").hide()
    }
    if (a == "show") {
        $("#successinfo").show();
        $("#newOrder").hide();
        $("#left_times_title").show();
        $("#accountInfoback .hide-successinfo").addClass("t1").show()
    }
}
;
P.Utl.countBack = function (c, a) {
    var b = function (g, k) {
        if (!k) {
            return
        }
        var d = $("#" + c).Module()
            , j = -1
            , i = document.getElementById(c);
        if (d && i) {
            j = d.drawStatus;
            if (k == "timeclose" && j != 1) {
                return
            }
            if (k == "timeopen" && j == 1) {
                return
            }
            var h = {};
            if (d[a] && d[a].data) {
                h = d[a].data
            }
            var f = function () {
                $.UT.publicGetAction(c, h, function (m) {
                    var l = m.drawStatus;
                    if (l == j || l == 0) {
                        $("#" + c).trigger("CountDownStop", [k])
                    } else {
                        d.setData(m)
                    }
                }, "get_json", function () {
                })
            };
            setTimeout(f, Math.floor(Math.random() * 3000 + 1000))
        }
    };
    $("#" + c).bind("CountDownStop", b)
}
;
P.Utl.yiban2kuaijie = function (b) {
    var a = $("body").attr("nav2") || "odds"
        , b = b || "rightLoader";
    (function (i) {
            var j = $("#" + b + " .common")
                , d = $("#" + b + " .kuaijie")
                , g = $("#" + b + " .shuoming")
                , f = $("#" + b + " #kuaijiexiaju_box");
            P.Set.number = 0;
            g.hide();
            f.removeAttr("checked");
            if (i == "odds") {
                j.hide();
                d.show()
            } else {
                if (i == "general") {
                    j.show();
                    d.hide();
                    var h = document.getElementById("selectedAmount");
                    if (h) {
                        h.parentNode.style.display = "none"
                    }
                    $("#" + b + " .onBg").removeClass("onBg")
                }
            }
            $("#elem_type_div a.on").removeClass("on");
            $("#elem_type_div a[nav=" + i + "]").addClass("on")
        })(a)
}
;
P.Utl.changeSubNav = function (d) {
    P.Utl.yesheMoney.remember();
    P.Utl.memuMask("#integrate-nav");
    $("#winbox .b18tishi").hide();
    var f = $("#rightLoader");
    switch (d) {
        case "bothSides":
            P.Utl.publicChengeModule(f, "ajax", "bothSides", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break;
        case "ball1":
        case "ball2":
        case "ball3":
        case "ball4":
        case "ball5":
        case "ball6":
        case "ball7":
        case "ball8":
            var b = $("#ballNO").Module();
            if (b) {
                b.rebind()
            }
            var h = ["--", "00", "01", "02", "03", "04", "05", "06", "07"][d.slice(-1)]
                , c = ["--", "一", "二", "三", "四", "五", "六", "七", "八"][d.slice(-1)];
            P.Utl.publicChengeModule(f, "ajax", "ballNO", "get_html", "get_json", {
                play: d,
                ball: h,
                cat: h
            });
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("第" + c.toString().keyComment() + "球");
            var g = ["000", "000", "001", "002", "003", "004", "005", "006", "007"][d.slice(-1)];
            $("td[playType]", "#ballNO").attr("playType", g);
            if (b && b.rfresh) {
                b.rfresh.data.ball = h;
                b.rfresh.data.cat = h;
                b.rfresh.data.play = d
            }
            if (parseInt(d.slice(-1)) < 5) {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO").show()
            } else {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO").hide()
            }
            break;
        case "sumDT":
            P.Utl.publicChengeModule(f, "ajax", "sumDT", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break;
        case "evenCode":
            P.Utl.publicChengeModule(f, "ajax", "evenCode", "get_html", "get_json", {
                play: d,
                ball: ""
            });
            break;
        case "bothSides_pk10":
            P.Utl.publicChengeModule(f, "ajax", "bothSides_pk10", "get_html", "get_json", {
                play: d,
                cat: "15"
            });
            break;
        case "ballNO15":
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("1 ~ 5");
            P.Utl.publicChengeModule(f, "ajax", "ballNO15", "get_html", "get_json", {
                play: d
            });
            break;
        case "ballNO60":
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("6 ~ 10");
            P.Utl.publicChengeModule(f, "ajax", "ballNO60", "get_html", "get_json", {
                play: d
            });
            break;
        case "sumDT_pk10":
            P.Utl.publicChengeModule(f, "ajax", "sumDT_pk10", "get_html", "get_json", {
                play: d,
                cat: "15"
            });
            break;
        case "ball_sc_1":
        case "ball_sc_2":
        case "ball_sc_3":
        case "ball_sc_4":
        case "ball_sc_5":
            var b = d.split("_")[2];
            P.Utl.publicChengeModule(f, "ajax", "ballNO_sc", "get_html", "get_json", {
                playtype: b
            });
            var a = $("#ballNO_sc").Module();
            if (a) {
                a.changeNav(d);
                a.rebind()
            }
            break;
        case "bothSides_ssc":
            P.Utl.publicChengeModule(f, "ajax", "bothSides_ssc", "get_html", "get_json", {
                number: 3,
                playtype: 1
            });
            var a = $("#bothSides_ssc").Module();
            if (a) {
                a.rebind()
            }
            break;
        case "bothSides_nc":
            P.Utl.publicChengeModule(f, "ajax", "bothSides_nc", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break;
        case "ball_nc_1":
        case "ball_nc_2":
        case "ball_nc_3":
        case "ball_nc_4":
        case "ball_nc_5":
        case "ball_nc_6":
        case "ball_nc_7":
        case "ball_nc_8":
            var b = $("#ballNO_nc").Module();
            if (b) {
                b.rebind()
            }
            var h = ["--", "00", "01", "02", "03", "04", "05", "06", "07"][d.slice(-1)]
                , c = ["--", "一", "二", "三", "四", "五", "六", "七", "八"][d.slice(-1)];
            P.Utl.publicChengeModule(f, "ajax", "ballNO_nc", "get_html", "get_json", {
                play: d,
                ball: h,
                cat: h
            });
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("第" + c.toString().keyComment() + "球");
            var g = ["000", "000", "001", "002", "003", "004", "005", "006", "007"][d.slice(-1)];
            $("td[playType]", "#ballNO_nc").attr("playType", g);
            if (b && b.rfresh) {
                b.rfresh.data.ball = h;
                b.rfresh.data.cat = h;
                b.rfresh.data.play = d
            }
            if (parseInt(d.slice(-1)) < 5) {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO_nc").show()
            } else {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO_nc").hide()
            }
            break;
        case "sumDT_nc":
            P.Utl.publicChengeModule(f, "ajax", "sumDT_nc", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break;
        case "evenCode_nc":
            P.Utl.publicChengeModule(f, "ajax", "evenCode_nc", "get_html", "get_json", {
                play: d,
                ball: ""
            });
            break;
        case "bothSides_ks":
            P.Utl.publicChengeModule(f, "ajax", "bothSides_ks", "get_html", "get_json", {
                play: "pageOne",
                ball: "",
                cat: ""
            });
            break;
        case "bothSides_kb":
            P.Utl.publicChengeModule(f, "ajax", "bothSides_kb", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break;
        case "sumDT_kb":
            P.Utl.publicChengeModule(f, "ajax", "sumDT_kb", "get_html", "get_json", {
                play: d,
                ball: "",
                cat: "13"
            });
            break
    }
}
;
P.Utl.navChange_page = function (b) {
    b = b || "rightLoader";
    P.Set.number = 0;
    $("#" + b + " input:text").val("");
    $("#" + b + " .onBg").removeClass("onBg");
    $("#" + b + " .elem_selected").hide();
    if (P.Set.beishu == 1) {
        $.UT.beishu()
    }
    P.Utl.winSetData(P.Set);
    P.Utl.bet_callback_show("hide");
    if (b == "integrate_sc") {
        var a = $("#" + b).data("Module");
        if (a) {
            a.changeNav()
        }
        $("#qiansan_t").show();
        $("#zhongsan_t").hide();
        $("#housan_t").hide();
        $("#ssc_qzh th").first().addClass("kon").siblings().removeClass("kon")
    } else {
        if (b != "evenCode") {
            P.Utl.yiban2kuaijie(b)
        }
    }
    P.Utl.yesheMoney.write()
}
;
P.Utl.getPasswords = function () {
    var a = function () {
        $.UT.publicGetAction("change_password", {}, function (c) {
            var b = "<div class='passwordContain'>" + c.list + "</div>";
            $.UT.Alert({
                title: "常用密码",
                text: b,
                booLean: false,
                width: 500,
                height: 300
            })
        }, "getPasswords")
    };
    $("#getPasswords").bind("click", a)
}
;
P.Utl.yesheMoney = {
    cache: {
        yiban: {},
        kuaijie: {}
    },
    set: function (a, c) {
        var b;
        if (a.length > 0) {
            a = a[0];
            b = $("input:text", a.parentNode).val();
            this.cache[c].checked = a.checked ? 1 : undefined;
            if (!/^\d+$/.test(b)) {
                b = ""
            }
            this.cache[c].value = a.checked ? b : ""
        }
    },
    yuse_value: function () {
        this.remember();
        if (this.cache.yiban.checked != 1) {
            $("#kuaijiexiaju_input").val("")
        }
        if (this.cache.kuaijie.checked != 1) {
            $(".elem_amount_input_quick").val("")
        }
    },
    remember: function () {
        var a = $("#yushe_yb"), c = $("#yushe_kj"), b;
        this.set(a, "yiban");
        this.set(c, "kuaijie")
    },
    output: function (f, a) {
        var b = this.cache[f == "#yushe_yb" ? "yiban" : "kuaijie"]
            , d = $(f);
        if (b.checked == 1) {
            d.attr("checked", "checked")
        } else {
            d.removeAttr("checked")
        }
        if (d.length > 0 && a) {
            a()
        }
    },
    write: function () {
        var b = this.cache.yiban.value
            , a = this.cache.kuaijie.value;
        this.output("#yushe_yb", function () {
            $("#kuaijiexiaju_input").val(b)
        });
        this.output("#yushe_kj", function () {
            $(".elem_amount_input_quick").val(a)
        })
    }
};
P.Utl.timsList = [];
P.Utl.lineTestOut = null;
P.Utl.lineTest = function () {
    var f = new Date - 0
        , c = [];
    var b = "time=";
    var a = P.Utl.timsList.length;
    if (a > 0) {
        for (var d = 0; d < a; d++) {
            b += P.Utl.timsList.shift().join("|") + ";"
        }
    }
    $.ajax({
        type: "GET",
        url: "/speed.html?_" + f,
        data: b,
        cache: false,
        timeout: 30000,
        success: function (g) {
            c.push(location.host);
            c.push(new Date() - f);
            P.Utl.timsList.push(c)
        },
        error: function (g) {
            c.push(location.host);
            c.push(-1);
            P.Utl.timsList.push(c)
        }
    });
    if (P.Utl.lineTestOut != null) {
        clearTimeout(P.Utl.lineTestOut);
        P.Utl.lineTestOut = null
    }
    P.Utl.lineTestOut = setTimeout(function () {
        clearTimeout(P.Utl.lineTestOut);
        P.Utl.lineTestOut = null;
        P.Utl.lineTest()
    }, 300000)
}
;
P.Set.LanguageMapping = {
    global: {},
    welcome: {}
};
P.Set.ErrorMapping = {
    framework: {
        parsererror: "E100",
        crossDomain: "E101",
        timeout: "E102",
        abort: "E103",
        resultDecodeError: "E104",
        error: "E105"
    },
    errors: {
        E102: "网络故障，本次处理异常，请到{#|4e0b|6ce8#}明细中确认{#|6ce8|5355#}！."
    },
    E100: "网络异常.",
    E101: "网络异常.",
    E102: "请求超时，网络异常或服务器繁忙",
    E103: "网络异常.",
    E104: "返回信息格式错误.",
    E105: "服务器异常",
    "1001": "账号或密码有误",
    "1002": "账号停用，请联系管理员",
    "1003": "你没有权限访问这个页面，请联系管理员",
    "1004": "您已经在其它地方登录",
    "1010": "密码更新失败",
    "1011": "请输入旧密码",
    "1012": "新密码不能与旧密码相同",
    "1013": "旧密码不正确",
    "1014": "修改密码成功",
    "1015": "两次输入的密码不能相同",
    "1016": "为了账号安全，密码不能和账号相同",
    "1017": "修改密码异常，请稍后重试.",
    "1018": "密碼長度為8-12位，必須包含大小寫字母和數字.",
    "1019": "不能使用常用密码作为密码",
    "1020": "密碼長度為8-12位，必須包含大小寫字母和數字.",
    "1021": "密碼連續兩位不得重複.",
    "1100": "{#|4e0b|6ce8#}成功",
    "1022": "账号长度为6-12位，必须包含英文字母和数字，且第一位不能是下划线.",
    "1023": "首次登入必須修改自定義帳號",
    "1024": "自定义帐号不可为原帐号加一个英文字母和数字",
    "1025": "自定义帐号不可为原帐号加上两位重複字元或连续字元",
    "1201": "該賬號已存在.",
    "1101": "{#|4e0b|6ce8#}参数不正确，请重新提交",
    "1102": "系统繁忙",
    "1103": "会员状态异常",
    "1104": "后台未{#|5f00|76d8#},不可以{#|4e0b|6ce8#}",
    "1105": "后台玩法{#|505c|62bc#}",
    "1106": "{#|8d54|7387#}不一致",
    "1107": "{#|4fe1|7528|4f59|989d#}不足",
    "1108": "低于{#|5355|6ce8#}最低",
    "1109": "高于{#|5355|6ce8#}最高",
    "1110": "高于{#|5355|9879#}最高",
    "1111": "{#|4e0b|6ce8#}失败",
    "1112": "{#|4e0b|6ce8#}金额超过{#|4fe1|7528|4f59|989d#}",
    "1113": "球号{#|505c|62bc#}",
    "1114": "不能查看今天之后的数据",
    "1115": "当前未{#|5f00|76d8#},不存在可查看的{#|6ce8|5355#}",
    "9999": "",
    "2000": "保存成功",
    "2001": "保存失败",
    "2200": " ",
    "3000": "您已经在其它地方登录或登录已超时",
    "4000": "开始时间不能大于结束时间，并且不能超过30天",
    "4001": "只能查看30天内的{#|5f00|5956#}结果"
};
P.Set.playType = {
    "000": "第一球 ",
    "001": "第二球 ",
    "002": "第三球 ",
    "003": "第四球 ",
    "004": "第五球 ",
    "005": "第六球 ",
    "006": "第七球 ",
    "007": "第八球 ",
    "008": "第一球 ",
    "009": "第二球 ",
    "010": "第三球 ",
    "011": "第四球 ",
    "012": "第五球 ",
    "013": "第六球 ",
    "014": "第七球 ",
    "015": "第八球 ",
    "016": "第一球 ",
    "017": "第二球 ",
    "018": "第三球 ",
    "019": "第四球 ",
    "020": "第五球 ",
    "021": "第六球 ",
    "022": "第七球 ",
    "023": "第八球 ",
    "024": "第一球 ",
    "025": "第二球 ",
    "026": "第三球 ",
    "027": "第四球 ",
    "028": "第五球 ",
    "029": "第六球 ",
    "030": "第七球 ",
    "031": "第八球 ",
    "032": "第一球 ",
    "033": "第二球 ",
    "034": "第三球 ",
    "035": "第四球 ",
    "036": "第五球 ",
    "037": "第六球 ",
    "038": "第七球 ",
    "039": "第八球 ",
    "040": "",
    "041": "",
    "042": "",
    "043": "第一球 ",
    "044": "第二球 ",
    "045": "第三球 ",
    "046": "第四球 ",
    "047": "第五球 ",
    "048": "第六球 ",
    "049": "第七球 ",
    "050": "第八球 ",
    "051": "第一球 ",
    "052": "第二球 ",
    "053": "第三球 ",
    "054": "第四球 ",
    "055": "第五球 ",
    "056": "第六球 ",
    "057": "第七球 ",
    "058": "第八球 ",
    "059": "第一球",
    "060": "第一球",
    "061": "{#|4efb|9009#}二 ",
    "062": "{#|9009|4e8c|8fde#}直 ",
    "063": "{#|9009|4e8c|8fde#}组 ",
    "064": "{#|4efb|9009#}三 ",
    "065": "{#|9009|4e09#}前直 ",
    "066": "{#|9009|4e09|524d|7ec4#} ",
    "067": "{#|4efb|9009#}四 ",
    "068": "{#|4efb|9009#}五 ",
    "069": "第二球",
    "070": "第二球",
    "071": "第三球",
    "072": "第三球",
    "073": "第四球",
    "074": "第四球",
    "075": "{#|6b63|7801#}"
};
P.Set.category = {
    "000": "00",
    "001": "01",
    "002": "02",
    "003": "03",
    "004": "04",
    "005": "05",
    "006": "06",
    "007": "07",
    "008": "08",
    "009": "08",
    "010": "08",
    "011": "08",
    "012": "08",
    "013": "08",
    "014": "08",
    "015": "08",
    "016": "09",
    "017": "09",
    "018": "09",
    "019": "09",
    "020": "09",
    "021": "09",
    "022": "09",
    "023": "09",
    "024": "10",
    "025": "10",
    "026": "10",
    "027": "10",
    "028": "10",
    "029": "10",
    "030": "10",
    "031": "10",
    "032": "11",
    "033": "11",
    "034": "11",
    "035": "11",
    "036": "11",
    "037": "11",
    "038": "11",
    "039": "11",
    "040": "12",
    "041": "13",
    "042": "14",
    "043": "15",
    "044": "15",
    "045": "15",
    "046": "15",
    "047": "15",
    "048": "15",
    "049": "15",
    "050": "15",
    "051": "16",
    "052": "16",
    "053": "16",
    "054": "16",
    "055": "16",
    "056": "16",
    "057": "16",
    "058": "16",
    "059": "17",
    "060": "17",
    "061": "18",
    "062": "19",
    "063": "20",
    "064": "21",
    "065": "22",
    "066": "23",
    "067": "24",
    "068": "25",
    "069": "17",
    "070": "17",
    "071": "17",
    "072": "17",
    "073": "17",
    "074": "17",
    "075": "29"
};
P.Set.playBall = {
    "01": "01",
    "02": "02",
    "03": "03",
    "04": "04",
    "05": "05",
    "06": "06",
    "07": "07",
    "08": "08",
    "09": "09",
    "10": "10",
    "11": "11",
    "12": "12",
    "13": "13",
    "14": "14",
    "15": "15",
    "16": "16",
    "17": "17",
    "18": "18",
    "19": "19",
    "20": "20",
    "21": "{#|5355#}",
    "22": "{#|53cc#}",
    "23": "大",
    "24": "小",
    "25": "{#|5c3e|5927#}",
    "26": "{#|5c3e|5c0f#}",
    "27": "{#|5408|6570#} {#|5355#}",
    "28": "{#|5408|6570#} {#|53cc#}",
    "29": "{#|603b|548c#} {#|5355#}",
    "30": "{#|603b|548c#} {#|53cc#}",
    "31": "{#|603b|548c#} 大",
    "32": "{#|603b|548c#} 小",
    "33": "{#|603b|548c#} {#|5c3e|5927#}",
    "34": "{#|603b|548c#}  {#|5c3e|5c0f#}",
    "35": "中",
    "36": "发",
    "37": "白",
    "38": "东",
    "39": "南",
    "40": "西",
    "41": "北",
    "42": "龙",
    "43": "虎"
};
P.Set.playType_sc = {
    "000": "第一球 ",
    "001": "第二球 ",
    "002": "第三球 ",
    "003": "第四球 ",
    "004": "第五球 ",
    "005": "第一球 ",
    "006": "第二球 ",
    "007": "第三球 ",
    "008": "第四球 ",
    "009": "第五球 ",
    "010": "",
    "011": "",
    "012": "",
    "013": "",
    "014": " 前三 ",
    "015": " 中三 ",
    "016": "后三 ",
    "017": " 前三 ",
    "018": " 中三 ",
    "019": "后三 ",
    "020": "前三 ",
    "021": "中三 ",
    "022": "后三 ",
    "023": "前三 ",
    "024": "中三 ",
    "025": "后三 ",
    "026": "前三 ",
    "027": "中三 ",
    "028": "后三 "
};
P.Set.category_sc = {
    "000": "00",
    "001": "00",
    "002": "00",
    "003": "00",
    "004": "00",
    "005": "01",
    "006": "01",
    "007": "01",
    "008": "01",
    "009": "01",
    "010": "01",
    "011": "02",
    "012": "02",
    "013": "03",
    "014": "04",
    "015": "04",
    "016": "04",
    "017": "05",
    "018": "05",
    "019": "05",
    "020": "06",
    "021": "06",
    "022": "06",
    "023": "07",
    "024": "07",
    "025": "07",
    "026": "08",
    "027": "08",
    "028": "08"
};
P.Set.Playtype_pk10 = {
    "000": "冠军",
    "001": "亚军",
    "002": "第三名",
    "003": "第四名",
    "004": "第五名",
    "005": "第六名",
    "006": "第七名",
    "007": "第八名",
    "008": "第九名",
    "009": "第十名",
    "010": "冠军",
    "011": "亚军",
    "012": "第三名",
    "013": "第四名",
    "014": "第五名",
    "015": "第六名",
    "016": "第七名",
    "017": "第八名",
    "018": "第九名",
    "019": "第十名",
    "020": "冠军",
    "021": "亚军",
    "022": "第三名",
    "023": "第四名",
    "024": "第五名",
    "025": "第六名",
    "026": "第七名",
    "027": "第八名",
    "028": "第九名",
    "029": "第十名",
    "030": "冠军",
    "031": "亚军",
    "032": "第三名",
    "033": "第四名",
    "034": "第五名",
    "035": "冠亚{#|5927|5c0f#}",
    "036": "{#|51a0|4e9a|5355|53cc#}",
    "037": "冠亚和"
};
P.Set.category_pk10 = {
    "000": "00",
    "001": "01",
    "002": "02",
    "003": "03",
    "004": "04",
    "005": "05",
    "006": "06",
    "007": "07",
    "008": "08",
    "009": "09",
    "010": "10",
    "011": "10",
    "012": "10",
    "013": "10",
    "014": "10",
    "015": "10",
    "016": "10",
    "017": "10",
    "018": "10",
    "019": "10",
    "020": "11",
    "021": "11",
    "022": "11",
    "023": "11",
    "024": "11",
    "025": "11",
    "026": "11",
    "027": "11",
    "028": "11",
    "029": "11",
    "030": "12",
    "031": "12",
    "032": "12",
    "033": "12",
    "034": "12",
    "035": "13",
    "036": "14",
    "037": "15"
};
P.Set.category_nc = {
    "000": "00",
    "001": "01",
    "002": "02",
    "003": "03",
    "004": "04",
    "005": "05",
    "006": "06",
    "007": "07",
    "008": "08",
    "009": "08",
    "010": "08",
    "011": "08",
    "012": "08",
    "013": "08",
    "014": "08",
    "015": "08",
    "016": "09",
    "017": "09",
    "018": "09",
    "019": "09",
    "020": "09",
    "021": "09",
    "022": "09",
    "023": "09",
    "024": "10",
    "025": "10",
    "026": "10",
    "027": "10",
    "028": "10",
    "029": "10",
    "030": "10",
    "031": "10",
    "032": "11",
    "033": "11",
    "034": "11",
    "035": "11",
    "036": "11",
    "037": "11",
    "038": "11",
    "039": "11",
    "040": "12",
    "041": "13",
    "042": "14",
    "043": "15",
    "044": "15",
    "045": "15",
    "046": "15",
    "047": "15",
    "048": "15",
    "049": "15",
    "050": "15",
    "051": "16",
    "052": "16",
    "053": "16",
    "054": "16",
    "055": "16",
    "056": "16",
    "057": "16",
    "058": "16",
    "059": "17",
    "060": "18",
    "061": "19",
    "062": "20",
    "063": "21",
    "064": "22",
    "065": "23",
    "066": "24",
    "067": "25",
    "068": "26",
    "069": "27",
    "070": "17",
    "071": "17",
    "072": "17",
    "073": "29",
    "074": "30"
};
P.Set.playBall_nc = {
    "01": "01",
    "02": "02",
    "03": "03",
    "04": "04",
    "05": "05",
    "06": "06",
    "07": "07",
    "08": "08",
    "09": "09",
    "10": "10",
    "11": "11",
    "12": "12",
    "13": "13",
    "14": "14",
    "15": "15",
    "16": "16",
    "17": "17",
    "18": "18",
    "19": "19",
    "20": "20",
    "21": "{#|5355#}",
    "22": "{#|53cc#}",
    "23": "大",
    "24": "小",
    "25": "{#|5c3e|5927#}",
    "26": "{#|5c3e|5c0f#}",
    "27": "{#|5408|6570#} {#|5355#}",
    "28": "{#|5408|6570#} {#|53cc#}",
    "29": "{#|603b|548c#} {#|5355#}",
    "30": "{#|603b|548c#} {#|53cc#}",
    "31": "{#|603b|548c#} 大",
    "32": "{#|603b|548c#} 小",
    "33": "{#|603b|548c#} {#|5c3e|5927#}",
    "34": "{#|603b|548c#}  {#|5c3e|5c0f#}",
    "35": "中",
    "36": "发",
    "37": "白",
    "38": "东",
    "39": "南",
    "40": "西",
    "41": "北",
    "42": "龙",
    "43": "虎"
};
P.Set.playType_nc = {
    "000": "第一球 ",
    "001": "第二球 ",
    "002": "第三球 ",
    "003": "第四球 ",
    "004": "第五球 ",
    "005": "第六球 ",
    "006": "第七球 ",
    "007": "第八球 ",
    "008": "第一球 ",
    "009": "第二球 ",
    "010": "第三球 ",
    "011": "第四球 ",
    "012": "第五球 ",
    "013": "第六球 ",
    "014": "第七球 ",
    "015": "第八球 ",
    "016": "第一球 ",
    "017": "第二球 ",
    "018": "第三球 ",
    "019": "第四球 ",
    "020": "第五球 ",
    "021": "第六球 ",
    "022": "第七球 ",
    "023": "第八球 ",
    "024": "第一球 ",
    "025": "第二球 ",
    "026": "第三球 ",
    "027": "第四球 ",
    "028": "第五球 ",
    "029": "第六球 ",
    "030": "第七球 ",
    "031": "第八球 ",
    "032": "第一球 ",
    "033": "第二球 ",
    "034": "第三球 ",
    "035": "第四球 ",
    "036": "第五球 ",
    "037": "第六球 ",
    "038": "第七球 ",
    "039": "第八球 ",
    "040": "",
    "041": "",
    "042": "",
    "043": "第一球 ",
    "044": "第二球 ",
    "045": "第三球 ",
    "046": "第四球 ",
    "047": "第五球 ",
    "048": "第六球 ",
    "049": "第七球 ",
    "050": "第八球 ",
    "051": "第一球 ",
    "052": "第二球 ",
    "053": "第三球 ",
    "054": "第四球 ",
    "055": "第五球 ",
    "056": "第六球 ",
    "057": "第七球 ",
    "058": "第八球 ",
    "059": "第一球",
    "060": "果蔬{#|5355#}选",
    "061": "动物{#|5355#}选",
    "062": "{#|4efb|9009#}二",
    "063": "{#|9009|4e8c|8fde#}组",
    "064": "{#|9009|4e8c|8fde#}直",
    "065": "{#|4efb|9009#}三",
    "066": "三全中",
    "067": "三连中",
    "068": "{#|4efb|9009#}四",
    "069": "{#|4efb|9009#}五",
    "070": "第二球",
    "071": "第三球",
    "072": "第四球",
    "073": "{#|6b63|7801#}",
    "074": "{#|9009|4e09|524d|7ec4#}"
};
P.Set.category_ks = {
    "000": "00",
    "001": "01",
    "002": "02",
    "003": "03",
    "004": "04",
    "005": "05",
    "006": "06"
};
P.Utl.number_pk10 = function (b, a) {
    var d = P.Set.Playtype_pk10[b]
        , c = parseInt(b, 10);
    if (c <= 9 || c == 37) {
        return [d, a]
    }
    if (c <= 19 || c == 35) {
        d = c == 35 ? "{#|4e24|9762#}" : d;
        return a == 1 ? [d, c == 35 ? "冠亚小" : "小"] : [d, c == 35 ? "冠亚大" : "大"]
    }
    if (c <= 29 || c == 36) {
        d = c == 36 ? "{#|4e24|9762#}" : d;
        return a == 1 ? [d, c == 36 ? "冠亚{#|53cc#}" : "{#|53cc#}"] : [d, c == 36 ? "冠亚{#|5355#}" : "{#|5355#}"]
    }
    if (c <= 34) {
        return a == 1 ? [d, "虎"] : [d, "龙"]
    }
}
;
P.Utl.number_sc = function (g, h) {
    var r = ["第一球", "第二球", "第三球", "第四球", "第五球"], f = parseInt(g, 10), m = ["{#|5355#}", "{#|53cc#}", "大", "小"], i = ["龙", "虎", "和"], q, n, l, k, j;
    if (f <= 4) {
        return [r[f], h, "{#|5355|7801#}"]
    }
    if (f <= 9) {
        return [r[f - 5], m[h], "{#|4e24|9762#}"]
    }
    if (f <= 13) {
        q = f == 10 ? "总" + m[h] : i[f - 11];
        n = f == 10 ? "{#|4e24|9762#}" : "{#|9f99|864e#}";
        return ["{#|603b|548c#}-{#|9f99|864e#}和", q, n]
    }
    if (f > 13) {
        var l = parseInt(P.Set.category_sc[g], 10) - 4
            , k = ["{#|8c79|5b50#}", "{#|987a|5b50#}", "{#|5bf9|5b50#}", "{#|534a|987a#}", "{#|6742|516d#}"][l]
            , j = P.Set.playType_sc[g];
        return [j, k, j]
    }
}
;
P.Set.number_ks = function (c, b) {
    var g = "";
    var f = [111, 222, 333, 444, 555, 666];
    var h = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    var d = [12, 13, 14, 15, 16, 23, 24, 25, 26, 34, 35, 36, 45, 46, 56];
    var a = [11, 22, 33, 44, 55, 66];
    b = parseInt(b, 10);
    switch (c) {
        case "000":
            if (b == "1") {
                g = "大"
            } else {
                g = "小"
            }
            break;
        case "001":
            g = "{#|4e09|519b#}（" + b + "）";
            break;
        case "002":
            g = "{#|56f4|9ab0#}（" + f[--b] + "）";
            break;
        case "003":
            g = "{#|5168|9ab0#}";
            break;
        case "004":
            g = h[--b] + "点";
            break;
        case "005":
            g = "{#|957f|724c#}（" + d[--b] + "）";
            break;
        case "006":
            g = "{#|77ed|724c#}（" + a[--b] + "）";
            break
    }
    return g
}
;
P.Set.category_kb = {
    "000": "00",
    "001": "01",
    "002": "01",
    "003": "02",
    "004": "02",
    "005": "03",
    "006": "04",
    "007": "04",
    "008": "04",
    "009": "04",
    "010": "05",
    "011": "05",
    "012": "05",
    "013": "06",
    "014": "06",
    "015": "06",
    "016": "07"
};
P.Set.playType_kb = {
    "000": "{#|6b63|7801#}",
    "001": "{#|603b|548c#} 大",
    "002": "{#|603b|548c#} 小",
    "003": "{#|603b|548c#} {#|5355#}",
    "004": "{#|603b|548c#} {#|53cc#}",
    "005": "{#|603b|548c#} 810",
    "006": "{#|603b|5927#} {#|5355#}",
    "007": "{#|603b|5927#} {#|53cc#}",
    "008": "{#|603b|5c0f#} {#|5355#}",
    "009": "{#|603b|5c0f#} {#|53cc#}",
    "010": "前(多)",
    "011": "后(多)",
    "012": "{#|524d|540e#}(和)",
    "013": "{#|5355#}(多)",
    "014": "{#|53cc#}(多)",
    "015": "{#|5355|53cc#}(和)",
    "016": "{#|4e94|884c#}"
};
P.Set.number_kb = function (c, f) {
    var b = P.Set.playType_kb[c];
    switch (c) {
        case "000":
            return b + " " + f;
            break;
        case "001":
        case "002":
        case "003":
        case "004":
        case "005":
        case "006":
        case "007":
        case "008":
        case "009":
        case "010":
        case "011":
        case "012":
        case "013":
        case "014":
        case "015":
            return b;
            break;
        case "016":
            var d = parseInt(f, 10) - 1
                , a = ["金", "{#|6728#}", "{#|6c34#}", "{#|706b#}", "{#|571f#}"];
            return b + " " + a[d];
            break
    }
}
;
P.Set.ActionMapping = {
    change_skin: {
        get_json: {
            url: "klc/Other/ChangeSkin"
        }
    },
    change_password: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/change_password.html"
        },
        get_json: {
            url: "klc/Account/ReSetPassword"
        },
        get_json_ssc: {
            url: "ssc/Account/ReSetPassword"
        },
        getPasswords: {
            url: "klc/Account/ReSetPassword&getGenerallyPassword=1"
        }
    },
    protocol: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/protocol.html"
        }
    },
    side_left: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/new_single_injection.html"
        },
        get_json: {
            url: "klc/order/leftInfo/"
        },
        post_submit: {
            url: "klc/order/leftInfo/?post_submit"
        },
        get_json_sc: {
            url: "ssc/order/leftInfo/"
        },
        post_submit_sc: {
            url: "ssc/order/leftInfo/?post_submit"
        },
        get_json_pk10: {
            url: "pk/order/leftInfo/"
        },
        post_submit_pk10: {
            url: "pk/order/leftInfo/?post_submit"
        },
        get_json_nc: {
            url: "nc/order/leftInfo/"
        },
        post_submit_nc: {
            url: "nc/order/leftInfo/?post_submit"
        },
        get_json_ks: {
            url: "ks/order/leftInfo/"
        },
        post_submit_ks: {
            url: "ks/order/leftInfo/?post_submit"
        },
        get_json_kb: {
            url: "kb/order/leftInfo/"
        },
        post_submit_kb: {
            url: "kb/order/leftInfo/?post_submit"
        }
    },
    sub_nav: {
        get_json: {
            url: "klc/order/betnotice/"
        },
        get_json_sc: {
            url: "ssc/order/betnotice/"
        },
        get_json_pk10: {
            url: "pk/order/betnotice/"
        },
        get_json_nc: {
            url: "nc/order/betnotice/"
        },
        get_json_ks: {
            url: "ks/order/betnotice/"
        },
        get_json_kb: {
            url: "kb/order/betnotice/"
        }
    },
    integrate: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/bet.html",
            mergeKey: "integrate"
        },
        get_json: {
            url: "klc/order/list/"
        }
    },
    bothSides: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/bet.html",
            mergeKey: "bothSides"
        },
        get_json: {
            url: "klc/order/list/"
        }
    },
    ballNO: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/bet.html",
            mergeKey: "ballNO"
        },
        get_json: {
            url: "klc/order/list/"
        }
    },
    sumDT: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/bet.html",
            mergeKey: "sumDT"
        },
        get_json: {
            url: "klc/order/list/"
        }
    },
    evenCode: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/bet.html",
            mergeKey: "evenCode"
        },
        get_json: {
            url: "klc/order/list/"
        }
    },
    bothSides_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/bet.html",
            mergeKey: "bothSides_nc"
        },
        get_json: {
            url: "nc/order/list/"
        }
    },
    ballNO_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/bet.html",
            mergeKey: "ballNO_nc"
        },
        get_json: {
            url: "nc/order/list/"
        }
    },
    sumDT_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/bet.html",
            mergeKey: "sumDT_nc"
        },
        get_json: {
            url: "nc/order/list/"
        }
    },
    evenCode_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/bet.html",
            mergeKey: "evenCode_nc"
        },
        get_json: {
            url: "nc/order/list/"
        }
    },
    bothSides_kb: {
        get_html: {
            url: "/webssc/htmlfront_new/kb/bet.html",
            mergeKey: "bothSides_kb"
        },
        get_json: {
            url: "kb/order/list/"
        }
    },
    sumDT_kb: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/bet.html",
            mergeKey: "sumDT_kb"
        },
        get_json: {
            url: "kb/order/list/"
        }
    },
    header: {
        get_json_ssc: {
            url: "ssc/header/index"
        },
        get_json_klc: {
            url: "klc/header/index"
        },
        get_json_pk10: {
            url: "pk/header/index"
        },
        get_json_nc: {
            url: "nc/header/index"
        },
        get_json_ks: {
            url: "ks/header/index"
        },
        get_json_kb: {
            url: "kb/header/index"
        },
        log_out: {
            url: "php/klc/logout.php"
        },
        more_announcement: {
            url: "klc/Notice/index"
        },
        more_announcement_c: {
            url: "klc/sysConfig/marqueeupdate"
        },
        get_ball: {
            url: "klc/order/betnotice/"
        },
        get_ball_sc: {
            url: "ssc/order/betnotice/"
        },
        get_ball_pk10: {
            url: "pk/order/betnotice/"
        },
        get_ball_nc: {
            url: "nc/order/betnotice/"
        },
        get_ball_ks: {
            url: "ks/order/betnotice/"
        },
        get_ball_kb: {
            url: "kb/order/betnotice/"
        }
    },
    status: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/status.html"
        },
        get_json: {
            url: "klc/order/status"
        },
        lianma: {
            url: "klc/order/OrderDetail/"
        },
        lianma_nc: {
            url: "klc/order/OrderDetail/"
        }
    },
    history: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/history.html"
        },
        get_json: {
            url: "klc/history/index/"
        },
        get_play: {
            url: "klc/history/ListPlay/"
        },
        get_number: {
            url: "klc/history/number/"
        },
        get_all: {
            url: "klc/history/detail/"
        },
        lianma: {
            url: "klc/history/OrderDetail/"
        }
    },
    detailh: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/detailh.html"
        },
        get_json: {
            url: "klc/history/detail/"
        },
        get_number: {
            url: "klc/history/number/"
        },
        lianma: {
            url: "klc/history/OrderDetail/"
        }
    },
    result_klc: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/result.html",
            mergeKey: "result_klc"
        },
        get_json: {
            url: "klc/result/index"
        }
    },
    ball_klc: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/result.html",
            mergeKey: "ball_klc"
        },
        get_json: {
            url: "klc/result/DateResult/"
        }
    },
    infop: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/infop.html"
        },
        get_json_klc: {
            url: "klc/userInfo/index"
        },
        get_json_ssc: {
            url: "ssc/userInfo/index"
        },
        get_json_pk10: {
            url: "pk/userInfo/Index"
        },
        get_json_nc: {
            url: "nc/userInfo/Index"
        },
        get_json_ks: {
            url: "ks/userInfo/Index"
        },
        get_json_kb: {
            url: "kb/userInfo/Index"
        }
    },
    rule: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/rule.html"
        }
    },
    betNotice_sc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/bet.html",
            mergeKey: "betNotice"
        },
        get_json: {
            url: "ssc/order/betnotice/"
        }
    },
    integrateType_sc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/bet.html",
            mergeKey: "integrateType"
        }
    },
    integrate_sc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/bet.html",
            mergeKey: "integrate"
        },
        get_json: {
            url: "ssc/order/list/"
        }
    },
    ballNO_sc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/bet.html",
            mergeKey: "ballNO_sc"
        },
        get_json: {
            url: "ssc/order/list/"
        }
    },
    bothSides_ssc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/bet.html",
            mergeKey: "bothSides_ssc"
        },
        get_json: {
            url: "ssc/order/list/"
        }
    },
    result_ssc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/result.html",
            mergeKey: "result_ssc"
        },
        get_json: {
            url: "ssc/result/index"
        }
    },
    ball_ssc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/result.html",
            mergeKey: "ball_ssc"
        },
        get_json: {
            url: "ssc/result/DateResult/"
        }
    },
    rule_ssc: {
        get_html: {
            url: "/webssc/htmlfront_new/ssc/rule.html"
        }
    },
    integrate_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/bet.html",
            mergeKey: "integrate_pk10"
        },
        get_json: {
            url: "php/pk10/play.php"
        }
    },
    bothSides_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/bet.html",
            mergeKey: "bothSides_pk10"
        },
        get_json: {
            url: "pk/order/list"
        }
    },
    ballNO15: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/bet.html",
            mergeKey: "ballNO15"
        },
        get_json: {
            url: "pk/order/list"
        }
    },
    ballNO60: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/bet.html",
            mergeKey: "ballNO60"
        },
        get_json: {
            url: "pk/order/list"
        }
    },
    sumDT_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/bet.html",
            mergeKey: "sumDT"
        },
        get_json: {
            url: "pk/order/list"
        }
    },
    result_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/result.html",
            mergeKey: "result_pk10"
        },
        get_json: {
            url: "pk/result/index"
        }
    },
    ball_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/result.html",
            mergeKey: "ball_pk10"
        },
        get_json: {
            url: "pk/result/DateResult/"
        }
    },
    rule_pk10: {
        get_html: {
            url: "/webssc/htmlfront_new/pk10/rule.html"
        }
    },
    rule_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/rule.html"
        }
    },
    rule_ks: {
        get_html: {
            url: "/webssc/htmlfront_new/ks/rule.html"
        }
    },
    rule_kb: {
        get_html: {
            url: "/webssc/htmlfront_new/kb/rule.html"
        }
    },
    result_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/result.html",
            mergeKey: "result_nc"
        },
        get_json: {
            url: "nc/result/index"
        }
    },
    ball_nc: {
        get_html: {
            url: "/webssc/htmlfront_new/nc/result.html",
            mergeKey: "ball_nc"
        },
        get_json: {
            url: "nc/result/DateResult/"
        }
    },
    result_ks: {
        get_html: {
            url: "/webssc/htmlfront_new/ks/result.html",
            mergeKey: "result_ks"
        },
        get_json: {
            url: "ks/result/index"
        }
    },
    ball_ks: {
        get_html: {
            url: "/webssc/htmlfront_new/ks/result.html",
            mergeKey: "ball_ks"
        },
        get_json: {
            url: "ks/result/DateResult/"
        }
    },
    result_kb: {
        get_html: {
            url: "/webssc/htmlfront_new/kb/result.html",
            mergeKey: "result_kb"
        },
        get_json: {
            url: "kb/result/index"
        }
    },
    bothSides_ks: {
        get_html: {
            url: "/webssc/htmlfront_new/ks/bet.html",
            mergeKey: "bothSides_ks"
        },
        get_json: {
            url: "ks/order/list"
        }
    },
    lineSelect: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/lineselect.html"
        }
    },
    pre_htmlcache: {
        get_html: {
            url: "/webssc/htmlfront_new/klc/all.html",
            mergeKey: "pre_htmlcache"
        }
    }
};
P.Set.navNumber_klc = {
    "3d_color": 1,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 7,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.navNumber_ssc = {
    "3d_color": 10,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 13,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.navNumber_pk10 = {
    "3d_color": 14,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 17,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.navNumber_nc = {
    "3d_color": 18,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 21,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.navNumber_ks = {
    "3d_color": 22,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 25,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.navNumber_kb = {
    "3d_color": 26,
    status: 3,
    history: 4,
    result: 5,
    infop: 6,
    rule: 29,
    changePassword: 8,
    lineSelect: 30,
    protocol: 9
};
P.Set.limit = {
    klc: "",
    ssc: "",
    pk10: "",
    nc: "",
    ks: "",
    kb: ""
};
P.Set.sysName = {
    klc: "{#|5e7f|4e1c|5feb|4e50|5341|5206#}",
    ssc: "{#|91cd|5e86|65f6|65f6|5f69#}",
    pk10: "{#|5317|4eac|8d5b|8f66#}(PK10)",
    nc: "{#|5e78|8fd0|519c|573a#}",
    ks: "江苏{#|9ab0|5b9d#}",
    kb: "{#|5feb|38#}({#|53cc#}盘)"
};
(function () {
        var b = $(".switch-on", "#select_sys")
            , a = b[0].id;
        P.Set.navNumber = P.Set["navNumber" + a.split("_")[1]]
    })();
$.fn.dateBox = function (j) {
    var c, k = this, r, y, B, l, w, m;
    var g, p, h, z, n, v, f;
    if (j) {
        var a = j.onClose || function (t) {
                return false
            }
    }
    var i = '<dl class="boxDay" style="display:none"><dt><a class="l" href="#">&lt;&lt;</a><a class="r" href="#">&gt;&gt;</a><b><span name="reyear"></span>年<span name="remouth"></span>月</b></dt><dd class="hd"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></dd><dd name="content" class="bd"></dd></dl>';
    var x = $(i).appendTo("body");

    function d(H, C) {
        $("[name='content']", x).empty();
        $("[name='reyear']", x).text(H);
        $("[name='remouth']", x).text(C);
        var I = new Date(), D = "", t, K = 0;

        function E(M, L) {
            this.year = M;
            this.mouth = L;
            this.maxDay = function () {
                return (new Date(this.year, this.mouth, 0)).getDate()
            }
            ;
            this.minDay = function () {
                return (new Date(new Date(this.year, this.mouth, 0).setDate(1))).getDay()
            }
        }

        var J = new E(H, C);
        for (t = 0; t <= (J.maxDay() + J.minDay() - 1); t++) {
            if (t >= J.minDay()) {
                K = K + 1;
                var F;
                if (K == f && H == n && C == v) {
                    F = "on"
                } else {
                    F = ""
                }
                if (K == I.getUTCDate() && H == I.getUTCFullYear() && C == (I.getUTCMonth() + 1)) {
                    D += '<a name="' + K + '" href="#" class="now ' + F + '">' + K + "</a>"
                } else {
                    D += '<a name="' + K + '" href="#" class="' + F + '">' + K + "</a>"
                }
            } else {
                D += '<a href="#" class="def"></a>'
            }
        }
        $("[name='content']", x).append(D);
        x.data("dateYears", (H + "-" + C + "-"))
    }

    x.click(function (C) {
        var t = C.target;
        if (t.tagName == "A" && Number(t.name) > 0) {
            $('[name="content"] a[name]', x).removeClass("on");
            $(t).addClass("on");
            if (t.name.length == 1) {
                t.name = "0" + t.name
            }
            z = x.data("dateYears") + t.name;
            $(k).val(z);
            x.bind("hidden", q);
            clearTimeout(l);
            l = setTimeout(function () {
                clearTimeout(l);
                l = null;
                x.triggerHandler("hidden")
            }, 0);
            if (typeof a == "function") {
                a(z)
            }
            $(k).triggerHandler("change");
            return false
        }
        if (t.className == "l") {
            clearTimeout(l);
            l = null;
            p = $("[name='reyear']", x).text();
            h = Number($("[name='remouth']", x).text()) - 1;
            if (h === 0) {
                h = 12;
                p = Number(p) - 1
            }
            if (h.toString().length == 1) {
                h = "0" + h
            }
            d(p, h)
        }
        if (t.className == "r") {
            clearTimeout(l);
            l = null;
            p = $("[name='reyear']", x).text();
            h = Number($("[name='remouth']", x).text()) + 1;
            if (h === 13) {
                h = 1;
                p = Number(p) + 1
            }
            if (h.toString().length == 1) {
                h = "0" + h
            }
            d(p, h)
        }
        m = 1;
        return false
    });
    x.mouseover(function () {
        w = 1;
        clearTimeout(l);
        l = null
    }).mouseout(function () {
        w = 0;
        clearTimeout(l);
        l = setTimeout(function () {
            clearTimeout(l);
            l = null;
            x.triggerHandler("hidden")
        }, 1000)
    });
    function A(C, t) {
        g = t.value.split(/\D+/);
        n = g[0];
        v = g[1];
        f = g[2];
        d(n, v);
        c = $(t).offset();
        x.css({
            left: c.left,
            top: c.top + 20
        }).fadeIn("fast");
        b()
    }

    x.bind("show", A);
    function q() {
        x.fadeOut("fast");
        m = 0;
        $("select").css("visibility", "visible")
    }

    function b() {
        var F = document.getElementsByTagName("select"), C = F.length, E = x[0].getBoundingClientRect(), t, H;
        for (var D = 0; D < C; D++) {
            t = F[D];
            H = t.getBoundingClientRect();
            if (!(E.left >= H.right || E.top >= H.bottom || E.bottom <= H.top || E.right <= H.left)) {
                t.style.visibility = "hidden"
            }
        }
    }

    $(k).focus(function () {
        k = this;
        x.unbind("hidden", q);
        x.triggerHandler("show", [k])
    }).blur(function () {
        x.bind("hidden", q);
        clearTimeout(l);
        if (w) {
            return
        }
        l = setTimeout(function () {
            clearTimeout(l);
            l = null;
            x.triggerHandler("hidden")
        }, 0)
    })
}
;
var template = function (b, a) {
    return template[typeof a === "object" ? "render" : "compile"].apply(template, arguments)
};
(function (a, c) {
        a.version = "2.0.0";
        a.openTag = "<%";
        a.closeTag = "%>";
        a.isEscape = true;
        a.isCompress = false;
        a.parser = null;
        a.render = function (j, i) {
            var h = g(j);
            if (h === undefined) {
                return d({
                    id: j,
                    name: "Render Error",
                    message: "No Template"
                })
            }
            return h(i)
        }
        ;
        a.compile = function (p, l) {
            var n = arguments;
            var i = n[2];
            var k = "anonymous";
            if (typeof l !== "string") {
                i = n[1];
                l = n[0];
                p = k
            }
            try {
                var h = b(l, i)
            } catch (m) {
                m.id = p || l;
                m.name = "Syntax Error";
                return d(m)
            }
            function j(q) {
                try {
                    return new h(q) + ""
                } catch (r) {
                    if (!i) {
                        return a.compile(p, l, true)(q)
                    }
                    r.id = p || l;
                    r.name = "Render Error";
                    r.source = l;
                    return d(r)
                }
            }

            j.prototype = h.prototype;
            j.toString = function () {
                return h.toString()
            }
            ;
            if (p !== k) {
                f[p] = j
            }
            return j
        }
        ;
        a.helper = function (h, i) {
            a.prototype[h] = i
        }
        ;
        a.onerror = function (i) {
            var h = "[template]:\n" + i.id + "\n\n[name]:\n" + i.name;
            if (i.message) {
                h += "\n\n[message]:\n" + i.message
            }
            if (i.line) {
                h += "\n\n[line]:\n" + i.line;
                h += "\n\n[source]:\n" + i.source.split(/\n/)[i.line - 1].replace(/^[\s\t]+/, "")
            }
            if (i.temp) {
                h += "\n\n[temp]:\n" + i.temp
            }
            if (c.console) {
                console.error(h)
            }
        }
        ;
        var f = {};
        var g = function (k) {
            var h = f[k];
            if (h === undefined && "document" in c) {
                var i = document.getElementById(k);
                if (i) {
                    var j = i.value || i.innerHTML;
                    return a.compile(k, j.replace(/^\s*|\s*$/g, ""))
                }
            } else {
                if (f.hasOwnProperty(k)) {
                    return h
                }
            }
        };
        var d = function (i) {
            a.onerror(i);
            function h() {
                return h + ""
            }

            h.toString = function () {
                return "{Template Error}"
            }
            ;
            return h
        };
        var b = (function () {
                a.prototype = {
                    $render: a.render,
                    $escape: function (m) {
                        return typeof m === "string" ? m.replace(/&(?![\w#]+;)|[<>"']/g, function (n) {
                            return {
                                "<": "&#60;",
                                ">": "&#62;",
                                '"': "&#34;",
                                "'": "&#39;",
                                "&": "&#38;"
                            }[n]
                        }) : m
                    },
                    $string: function (m) {
                        if (typeof m === "string" || typeof m === "number") {
                            return m
                        } else {
                            if (typeof m === "function") {
                                return m()
                            } else {
                                return ""
                            }
                        }
                    }
                };
                var h = Array.prototype.forEach || function (q, n) {
                            var m = this.length >>> 0;
                            for (var p = 0; p < m; p++) {
                                if (p in this) {
                                    q.call(n, this[p], p, this)
                                }
                            }
                        }
                    ;
                var k = function (n, m) {
                    h.call(n, m)
                };
                var l = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined";
                var i = new RegExp(["/\\*(.|\n)*?\\*/|//[^\n]*\n|//[^\n]*$", "'[^']*'|\"[^\"]*\"", "\\.[s\t\n]*[\\$\\w]+", "\\b" + l.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g");
                var j = function (m) {
                    m = m.replace(i, ",").replace(/[^\w\$]+/g, ",").replace(/^,|^\d+|,\d+|,$/g, "");
                    return m ? m.split(",") : []
                };
                return function (E, H) {
                    var C = a.openTag;
                    var x = a.closeTag;
                    var r = a.parser;
                    var n = E;
                    var q = "";
                    var z = 1;
                    var D = {
                        $data: true,
                        $helpers: true,
                        $out: true,
                        $line: true
                    };
                    var F = a.prototype;
                    var B = {};
                    var w = "var $helpers=this," + (H ? "$line=0," : "");
                    var K = "".trim;
                    var M = K ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"];
                    var v = K ? "if(content!==undefined){$out+=content;return content}" : "$out.push(content);";
                    var t = "function(content){" + v + "}";
                    var m = "function(id,data){if(data===undefined){data=$data}var content=$helpers.$render(id,data);" + v + "}";
                    k(n.split(C), function (R, Q) {
                        R = R.split(x);
                        var O = R[0];
                        var N = R[1];
                        if (R.length === 1) {
                            q += y(O)
                        } else {
                            q += I(O);
                            if (N) {
                                q += y(N)
                            }
                        }
                    });
                    n = q;
                    if (H) {
                        n = "try{" + n + "}catch(e){e.line=$line;throw e}"
                    }
                    n = "'use strict';" + w + M[0] + n + "return new String(" + M[3] + ")";
                    try {
                        var L = new Function("$data", n);
                        L.prototype = B;
                        return L
                    } catch (J) {
                        J.temp = "function anonymous($data) {" + n + "}";
                        throw J
                    }
                    function y(N) {
                        z += N.split(/\n/).length - 1;
                        if (a.isCompress) {
                            N = N.replace(/[\n\r\t\s]+/g, " ")
                        }
                        N = N.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
                        N = M[1] + "'" + N + "'" + M[2];
                        return N + "\n"
                    }

                    function I(Q) {
                        var R = z;
                        if (r) {
                            Q = r(Q)
                        } else {
                            if (H) {
                                Q = Q.replace(/\n/g, function () {
                                    z++;
                                    return "$line=" + z + ";"
                                })
                            }
                        }
                        if (Q.indexOf("=") === 0) {
                            var O = Q.indexOf("==") !== 0;
                            Q = Q.replace(/^=*|[\s;]*$/g, "");
                            if (O && a.isEscape) {
                                var N = Q.replace(/\s*\([^\)]+\)/, "");
                                if (!F.hasOwnProperty(N) && !/^(include|print)$/.test(N)) {
                                    Q = "$escape($string(" + Q + "))"
                                }
                            } else {
                                Q = "$string(" + Q + ")"
                            }
                            Q = M[1] + Q + M[2]
                        }
                        if (H) {
                            Q = "$line=" + R + ";" + Q
                        }
                        A(Q);
                        return Q + "\n"
                    }

                    function A(N) {
                        N = j(N);
                        k(N, function (O) {
                            if (!D.hasOwnProperty(O)) {
                                p(O);
                                D[O] = true
                            }
                        })
                    }

                    function p(N) {
                        var O;
                        if (N === "print") {
                            O = t
                        } else {
                            if (N === "include") {
                                B["$render"] = F["$render"];
                                O = m
                            } else {
                                O = "$data." + N;
                                if (F.hasOwnProperty(N)) {
                                    B[N] = F[N];
                                    if (N.indexOf("$") === 0) {
                                        O = "$helpers." + N
                                    } else {
                                        O = O + "===undefined?$helpers." + N + ":" + O
                                    }
                                }
                            }
                        }
                        w += N + "=" + O + ","
                    }
                }
            })()
    })(template, this);
if (typeof define === "function") {
    define(function (b, a, c) {
        c.exports = template
    })
} else {
    if (typeof exports !== "undefined") {
        module.exports = template
    }
}
P.Mod.integrate_sc = function (c, f) {
    var g = this;
    this.num = f || "";
    this.dom = c;
    this.table = $("#twoGall_Num", c);
    this.tr = $(".bettable tr", c);
    P.Utl.navChange_page(c[0].id);
    this.id = c[0].id;
    $(".elem_amount_input", c).bind("keyup", function () {
        var k = this.value;
        $(".elem_amount_input").val(k)
    });
    if (!P.Set.beishu) {
        $(".elem_multiple").css("visibility", "hidden")
    } else {
        P.Utl.bei(c)
    }
    this.autoRefreshspan = $("#autoRefreshspan1", c);
    c.bind("resultnum", function (k) {
        if (g.rfresh) {
            g.rfresh.intervalfun(0)
        }
    });
    $(".shuoming_alert", c).bind("click", function (k) {
        $.UT.Alert({
            title: "快捷说明",
            text: "填入预设金额后，只需鼠标点击要下注项目对应的输入框，系统将自动输入预设金额来方便快速下注。"
        })
    });
    var j = function (n) {
        var w = n.target, q;
        var r = w.parentNode
            , m = w.nodeName == "TD" ? $(r) : $(r.parentNode);
        var t = $(".amount-input", m)
            , q = document.getElementById("elem_selected");
        if (w.nodeName != "INPUT") {
            if (g.drawStatus == "1") {
                if (g.user_status == "1") {
                    if (m.length > 0 && (w.className + "").indexOf("elem_btn") == -1) {
                        if ((t.length > 0 && t[0].style.display != "none") || m.hasClass("huiseBg")) {
                            return false
                        }
                        if (m.hasClass("onBg")) {
                            m.removeClass("onBg");
                            P.Set.number--
                        } else {
                            m.addClass("onBg");
                            P.Set.number++
                        }
                        if (P.Set.number > 0) {
                            q.style.display = "block";
                            $("#selectedAmount").html(P.Set.number.toString().keyComment())
                        } else {
                            q.style.display = "none";
                            P.Set.number = 0
                        }
                    }
                    if (w.id == "submit" || w.id == "reset" || w.id == "submit_top" || w.id == "reset_top") {
                        var v = P.Utl.submit_sc(g.table, w);
                        if (v) {
                            var l = $("#side_left").data("Module");
                            l.bindSubObj(v)
                        }
                    }
                } else {
                    var k = $(w).parents(".ballqueue-module").length || $(w).parents(".ballno-tab").length;
                    $("span[name='determine']").focus();
                    if ($(".requestData").text() != "") {
                        return false
                    }
                    if (k == 0) {
                        $.UT.Alert({
                            booLean: false,
                            text: "账号被{#|505c|62bc#}（或者账号处于{#|505c|62bc#}状态），请联系管理员！"
                        })
                    }
                }
            } else {
            }
        }
        w = null;
        m = null;
        t = null
    };
    $(".bettable td", c).bind("mousedown", j);
    $(".elem_btn", c).bind("click", j);
    $("input", g.table).bind("blur", function (m) {
        var l = m.target.value
            , k = m.target;
        if ((l != "") && !(l.match(/\D/) == null && parseInt(l, 10) > 0)) {
            k.value = "";
            k.focus();
            return false
        }
    });
    var b = document.getElementById("submit");
    var a = document.getElementById("submit_top");
    if (b && a) {
        P.Utl.keydown_sc(c, b, a, P.Utl.submit_sc)
    }
    var i = {
        urlId: this.id,
        data: {
            action: "ajax"
        },
        action: "get_json",
        callback: function (k) {
            g.setData(k)
        }
    };
    if (this.autoRefreshspan) {
        this.rfresh = this.autoRefreshspan.Widget("AutoRefresh", i)
    }
    $.UT.HoverList({
        container: $(".bettable"),
        el: "tr"
    });
    g.playtype = "1";
    $(".times-tab .bq-title", "#ballqueue").bind("click", function () {
        $(".times-tab .bq-title").removeClass("kon");
        $(this).addClass("kon");
        g.playtype = this.getAttribute("playtype");
        $(".result-tab .bq-title").removeClass("kon");
        var k = $(".result-tab .bq-title")[0];
        k.innerHTML = this.innerHTML;
        $(k).addClass("kon");
        var l = {
            playtype: g.playtype
        };
        $.UT.publicGetAction(g.id, l, function (m) {
            g.rfresh.data.playtype = g.playtype;
            g.rfresh.data.number = 0;
            g.setData(m)
        })
    });
    $(".result-tab .bq-title", "#ballqueue").bind("click", function () {
        P.Utl.memuMask(".result-tab");
        $(".result-tab .bq-title").removeClass("kon");
        $(this).addClass("kon");
        g.number = this.getAttribute("number");
        var k = {
            playtype: g.playtype,
            number: g.number
        };
        $.UT.publicGetAction(g.id, k, function (l) {
            g.rfresh.data.playtype = g.playtype;
            g.rfresh.data.number = g.number;
            g.setData(l)
        })
    });
    $("#ssc_qzh").bind("click", function (l) {
        var k = l.target;
        $("#ssc_qzh .kon").removeClass("kon");
        $("#qiansan_t,#zhongsan_t,#housan_t").hide();
        switch (k.id) {
            case "111":
                $("#qiansan_t").show();
                $(k).addClass("kon");
                break;
            case "222":
                $("#zhongsan_t").show();
                $(k).addClass("kon");
                break;
            case "333":
                $("#housan_t").show();
                $(k).addClass("kon");
                break
        }
    });
    var d = function (q) {
        var n = q.target;
        var l = n.getAttribute("nav");
        var m = $("#side_left").data("Module");
        if (l) {
            if (m && m.alertOrderK) {
                m.alertOrderK.close();
                m.alertOrderK = null
            }
            if (m && m.alertOrder) {
                var p = "你确定取消{#|6ce8|5355#},切换{#|6295|6ce8#}类型吗？";
                $.UT.Alert({
                    text: p,
                    determineCallback: function () {
                        k(n, l);
                        return false
                    },
                    cancelCallback: function () {
                        if (m.alertOrder) {
                            m.alertOrder.determine.focus().select()
                        }
                    }
                })
            } else {
                k(n, l)
            }
        }
        return false;
        function k(t, r) {
            g.changeNav(r, t);
            if (m) {
                if (m.alertOrder) {
                    m.alertOrder.close();
                    m.alertOrder = null
                }
            }
        }
    };
    $("#elem_type_div").bind("click", d);
    this.tdPlayType = $("td[playType]");
    P.Utl.orderMit(c);
    this.changeNav();
    var h = function (m) {
        var l = $("#kuaijiexiaju_input");
        var k = l.val();
        if (this.value == "") {
            this.value = k
        }
    };
    $("#kuaijiexiaju_input").bind("blur", function (m) {
        var l = m.target.value
            , k = m.target;
        if ((l != "") && !(l.match(/\D/) == null && parseInt(l, 10) > 0)) {
            k.value = "";
            k.focus();
            return false
        }
    });
    $("input:text", c).bind("click", h);
    $("#shuoming_alert", c).bind("click", function (k) {
        $.UT.Alert({
            title: "快捷说明",
            text: "填入快捷金额后，只需鼠标点击要下注项目对应的输入框，系统将自动输入预设金额来方便快速下注。"
        })
    })
}
;
P.Mod.integrate_sc.prototype.moduleFirstLogin = function () {
    var a = this.dom;
    P.Utl.countBack(this.id, "rfresh");
    $(".beisx", a).bind("click", function () {
        var b = $(".beisx:checked")[0].id;
        $.UT.beishu_cookie({
            rad: b
        })
    });
    $(".bq-title").hover(function () {
        $(this).addClass("red")
    }, function () {
        $(this).removeClass("red")
    });
    P.Mod.sub_navklc.call(this, a, "_sc", 10000)
}
;
P.Mod.integrate_sc.prototype.setData = function (c) {
    var d = +new Date();
    if (!c) {
        $.UT.Alert({
            text: "获取{#|8d54|7387#}失败"
        });
        return false
    }
    if (this.moduleFirstLogin) {
        this.moduleFirstLogin();
        this.moduleFirstLogin = null
    }
    this.drawStatus = c.drawStatus;
    this.user_status = c.user_status;
    if (c && this.drawStatus == "1") {
        if (c.integrate) {
            var b = 0;
            this.tdPlayType.each(function (k, n) {
                var f = n.parentNode
                    , h = f.className
                    , l = h.indexOf("huiseBg");
                var m = $("span", n).first();
                var g = n.getAttribute("playType") + n.getAttribute("number");
                var p = c.integrate[g]
                    , j = m[0].innerHTML;
                if (c.integrate[g] || c.integrate[g] == 0) {
                    if (c.integrate[g] == "-") {
                        f.className = h.replace("onBg", "");
                        if (l == -1) {
                            f.className = h + "  huiseBg"
                        }
                        $("input", n)[0].disabled = true;
                        m[0].innerHTML = "-"
                    } else {
                        if (l > -1) {
                            f.className = h.replace("huiseBg", "")
                        }
                        $("input", n)[0].disabled = false;
                        if (j != p || p == 0) {
                            if (j == "" || j == "-") {
                                m[0].style.color = "#f00"
                            } else {
                                if (p != "0" || j != "0") {
                                    P.Utl.changeColor(m)
                                }
                            }
                            m[0].innerHTML = p
                        }
                        b++
                    }
                }
            });
            if (b == 0) {
                $("#integrate_sc input.elem_amount_input").attr("disabled", "disabled")
            } else {
                var a = $("#integrate_sc input.elem_amount_input,#kuaijiexiaju_input");
                if (a.attr("disabled")) {
                    a.removeAttr("disabled")
                }
            }
        } else {
            this.tdPlayType.each(function (f, h) {
                var g = $("span", h).first();
                g.each(function (j, k) {
                    k.innerHTML = ""
                })
            })
        }
    } else {
        $("td[playType] span").not(".amount").html("");
        this.tr.addClass("huiseBg").removeClass("onBg");
        $(".elem_selected").hide();
        $("#selectNote").hide();
        $("input:text", this.dom).attr("disabled", "disabled").filter(".amount-input").val("");
        $(".bet-table span", this.dom).not($(".amount")).html("");
        P.Set.number = 0
    }
    P.Mod.bindsub_navdata(c, this);
    if (c.ballqueue_times && c.ballqueue_times.length > 0) {
        $("#ballqueue_times td").each(function (f) {
            var g = parseInt(c.ballqueue_times[f], 10);
            this.innerHTML = g > 3 ? "<span class='red fontweight'>" + g + "</span>" : g
        })
    }
    c = null
}
;
P.Mod.integrate_sc.prototype.changeNav = function (b, a) {
    var g = this;
    var h = $(".onBg", g.table);
    var j = $(".amount-input", g.tr);
    P.Set.number = 0;
    var k = $("#twoGall_Num .common")
        , d = $("#twoGall_Num .elem_amount input")
        , c = $(".kuaijie");
    b = b ? b : ($("body").attr("nav2") || "odds");
    $("#elem_type_div .on").removeClass("on");
    var f = $(".shuoming", g.dom)
        , i = $(".kuaijiexiaju", this.dom);
    f.hide();
    switch (b) {
        case "odds":
            j.hide();
            d.show();
            c.show();
            k.hide();
            $("#elem_type_div a").first().addClass("on");
            i.hide();
            break;
        case "general":
            i.show();
            j.show();
            d.hide();
            h.removeClass("onBg");
            $("#elem_selected").hide();
            c.hide();
            k.show();
            $("#elem_type_div a").last().addClass("on");
            break
    }
    $("body").attr("nav2", b)
}
;
P.Mod.integrate_sc.prototype.unbind = function () {
    var a = this;
    a.playtype = 1;
    a.number = 0;
    delete a.rfresh.data.playtype;
    delete a.rfresh.data.number;
    this.rfresh.hide();
    $("body").trigger("cpschanel", ["win", "del"]);
    $(".ballqueue-module .bq-title", "#ballqueue").removeClass("kon").eq(0).addClass("kon");
    $(".result-tab .bq-title", "#ballqueue").eq(0).addClass("kon").text("第一球");
    if (this.getResult) {
        this.getResult.hide()
    }
    $("#timeclose,#timeopen").html("")
}
;
P.Mod.ballNO_sc = function (a) {
    var b = this;
    this.playtype = 1;
    P.Mod.moduleklc.call(this, a, "sub_nav");
    this.commonTd = $("#common_div td[number]", a);
    this.kuaijieTd = $("#kuaijie_div td[number]", a);
    $(".result-tab .bq-title", "#ballqueue").bind("click", function () {
        P.Utl.memuMask(".result-tab");
        $(".result-tab .bq-title", "#ballqueue").removeClass("kon");
        $(this).addClass("kon");
        b.number = this.getAttribute("number");
        var c = {
            playtype: b.playtype,
            number: b.number
        };
        $.UT.publicGetAction(b.id, c, function (d) {
            b.rfresh.data.playtype = b.playtype;
            b.rfresh.data.number = b.number;
            b.setData(d)
        })
    })
}
;
P.Mod.ballNO_sc.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.ballNO_sc.prototype.setData = function (b) {
    var d = this.dom
        , a = $("input:text", d)
        , f = this;
    if (this.moduleFirstLogin) {
        this.moduleFirstLogin();
        this.moduleFirstLogin = null
    }
    this.drawStatus = b.drawStatus;
    this.user_status = b.user_status;
    P.Mod.bindsub_navdata(b, this);
    var c = b.ballqueue_times;
    if (c && c.length > 0) {
        $("#ballqueue_times td").each(function (g) {
            var h = parseInt(c[g], 10);
            this.innerHTML = h > 3 ? "<span class='red fontweight'>" + h + "</span>" : h
        })
    }
    if (b.drawStatus != "1") {
        a.attr("disabled", "disabled").filter(".amount-input").val("");
        this.commonTd.addClass("huiseBg").html("").prev().addClass("huiseBg");
        this.commonTd.next().addClass("huiseBg");
        this.kuaijieTd.addClass("huiseBg").html("").removeClass("onBg").prev().addClass("huiseBg").removeClass("onBg");
        P.Set.number = 0;
        return false
    }
    a.removeAttr("disabled");
    if (b.integrate) {
        this.commonTd.each(function (m, t) {
            var j = $(t)
                , n = t.cellIndex
                , r = t.parentNode
                , k = t.innerHTML;
            var q = r.cells[n - 1]
                , h = r.cells[n + 1];
            var g = t.getAttribute("playType") + t.getAttribute("number");
            var p = j.parent("tr")
                , v = b.integrate[g];
            if (v || v == 0) {
                var l = $("input", j.next());
                if (v == "-") {
                    if (t.className.indexOf("huiseBg") == -1) {
                        t.className = t.className + "  huiseBg";
                        h.className = h.className + "  huiseBg";
                        q.className = q.className + "  huiseBg"
                    }
                    t.innerHTML = "-";
                    l.attr("disabled", "disabled")
                } else {
                    if (t.className.indexOf("huiseBg") > -1) {
                        h.className = h.className.replace("huiseBg", "");
                        t.className = t.className.replace("huiseBg", "");
                        q.className = q.className.replace("huiseBg", "");
                        l.removeAttr("disabled");
                        f.user_status == "2" ? l.attr("disabled", "disabled") : l.removeAttr("disabled")
                    }
                    if (k != v || v == 0) {
                        if (k == "" || k == "-") {
                            t.style.color = "#f00"
                        } else {
                            if (v != "0" || k != "0") {
                                P.Utl.changeColor(j, v)
                            }
                        }
                        t.innerHTML = v
                    }
                }
            }
        });
        this.kuaijieTd.each(function (k, p) {
            var h = $(p)
                , l = p.cellIndex
                , n = p.parentNode;
            var g = h.attr("playType") + h.attr("number")
                , q = b.integrate[g]
                , m = n.cells[l - 1]
                , j = p.innerHTML;
            if (q || q == 0) {
                if (q == "-") {
                    if (p.className.indexOf("huiseBg") == -1) {
                        p.className = p.className.replace("onBg", "") + "  huiseBg";
                        m.className = m.className.replace("onBg", "") + "  huiseBg"
                    }
                    p.innerHTML = "-"
                } else {
                    if (p.className.indexOf("huiseBg") > -1) {
                        p.className = p.className.replace("huiseBg", "");
                        m.className = m.className.replace("huiseBg", "")
                    }
                    if (j != q || q == 0) {
                        if (j === "" || j == "-") {
                            p.style.color = "#f00"
                        } else {
                            if (q != "0" || j != "0") {
                                P.Utl.changeColor(h, q)
                            }
                        }
                        p.innerHTML = q
                    }
                }
            }
        })
    } else {
        $("td[playType]", d).each(function (g, h) {
            h.innerHTML = ""
        })
    }
    b = null
}
;
P.Mod.ballNO_sc.prototype.BindData = function (a) {
    P.Mod.sBindDataklc.call(this, a, "#ballNO_sc", 5, 590, 450)
}
;
P.Mod.ballNO_sc.prototype.rebind = function () {
    this.commonTd.removeData().html("");
    this.kuaijieTd.removeData().html("")
}
;
P.Mod.ballNO_sc.prototype.unbind = function () {
    var a = this;
    a.playtype = 1;
    a.number = 0;
    delete a.rfresh.data.playtype;
    delete a.rfresh.data.number;
    P.Mod.klcunbind(this)
}
;
P.Mod.ballNO_sc.prototype.changeNav = function (b) {
    var c = (b + "").split("_")[2]
        , a = ["", "一", "二", "三", "四", "五"][c];
    $(".ball_sc").hide();
    $("." + b).show();
    $(".paihang .kon", "#ballqueue").removeClass("kon");
    $(".paihang-ball").html("第" + a + "球").addClass("kon");
    this.rfresh.data.number = 0;
    this.rfresh.data.playtype = c;
    this.playtype = c
}
;
P.Mod.bothSides_ssc = function (a) {
    var b = this;
    P.Mod.moduleklc.call(this, a, "sub_nav");
    this.commonTd = $("#common_div td[number]", a);
    this.kuaijieTd = $("#kuaijie_div td[number]", a);
    $(".result-tab .bq-title", "#ballqueue").bind("click", function () {
        P.Utl.memuMask(".result-tab");
        $(".result-tab .bq-title", "#ballqueue").removeClass("kon");
        $(this).addClass("kon");
        b.number = this.getAttribute("number");
        var c = {
            playtype: 1,
            number: b.number
        };
        $.UT.publicGetAction(b.id, c, function (d) {
            b.rfresh.data.number = b.number;
            b.setData(d)
        })
    })
}
;
P.Mod.bothSides_ssc.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides_ssc.prototype.setData = function (a) {
    P.Mod.ballNO_sc.prototype.setData.call(this, a)
}
;
P.Mod.bothSides_ssc.prototype.BindData = function (a) {
    P.Mod.sBindDataklc.call(this, a, "#bothSides_ssc", 5, 590, 450)
}
;
P.Mod.bothSides_ssc.prototype.rebind = function () {
    this.commonTd.removeData().html("");
    this.kuaijieTd.removeData().html("");
    $("#ballqueue  .kon").removeClass("kon");
    $("#ballqueue .bq-title").first().addClass("kon")
}
;
P.Mod.bothSides_ssc.prototype.unbind = function () {
    var a = this;
    a.playtype = 1;
    a.number = 0;
    delete a.rfresh.data.playtype;
    delete a.rfresh.data.number;
    P.Mod.klcunbind(this)
}
;
P.Mod.side_left = function (d) {
    this.dom = d;
    this.id = d[0].id;
    $("#classic_img", d).one("click", function (f) {
        window.location.href = window.location.href.split("&")[0] + "&version=2"
    });
    $.UT.HoverList({
        container: "#newOrder tbody",
        el: "tr",
        className: "bc"
    });
    var b = function (i) {
        var g, f = i.target, h = P.Set.systype;
        if (f.id == "rushBtn") {
            var j = "get_json";
            switch (h) {
                case "pk10":
                    j = "get_json_pk10";
                    break;
                case "ssc":
                    j = "get_json_sc";
                    break;
                case "nc":
                    j = "get_json_nc";
                    break;
                case "ks":
                    j = "get_json_ks";
                    break;
                case "kb":
                    j = "get_json_kb";
                    break
            }
            $.UT.publicGetAction("side_left", {
                act: "hand"
            }, function (k) {
                P.Mod.side_left.prototype.setData(k)
            }, j)
        }
    };
    var c = function () {
        P.Utl.bet_callback_show("hide")
    };
    var a = function () {
        $("#f-list").html("");
        $(".failure").hide();
        var g = $(".failure-odd-change").css("display")
            , f = $(".success").css("display");
        if (g == "none" && f == "none") {
            P.Utl.bet_callback_show("hide")
        }
    };
    $(".del-failure-info").bind("click", a);
    $(d).bind("click", function (g) {
        var f = g.target
            , i = f.className
            , h = f.id;
        switch (h) {
            case "sideLeftBack":
                c();
                break;
            default:
                b(g)
        }
    });
    P.Utl.bet_callback_show("hide")
}
;
P.Mod.side_left.prototype.setData = function (f) {
    $("#marqueeBox").html(P.Set.marquee);
    var g, d, b, c, a;
    if (f.user) {
        this.bindAccountInfo(f.user);
        g = f.user.new_orders;
        b = f.user.version_number;
        c = f.user.game_limit;
        a = f.user.odds_refresh
    }
    if (g) {
        this.bindNewOrder(g)
    }
    if (b) {
        this.version_number = b
    }
    if (c) {
        P.Set.limit[P.Set.systype] = c
    }
    if (a) {
        this.odds_refresh = a
    }
    P.Utl.winSetData(P.Set);
    f = null;
    delete f
}
;
P.Mod.side_left.prototype.bindAccountInfo = function (a) {
    var b = $("td", "#accountInfo");
    b.each(function (c) {
        if (a[b[c].id] != null) {
            $(b[c]).children("em").html(a[b[c].id].toString().keyComment())
        }
    })
}
;
P.Mod.side_left.prototype.bindNewOrder = function (a) {
    var b = $("tbody", "#newOrder");
    var c = "";
    if (a.length == 0) {
        b.empty();
        a = null;
        return
    }
    $(a).each(function (f, g) {
        var d = "bg_white ";
        if (f % 2 == 0) {
            d = "bg_light_blue "
        }
        c += '<tr class="' + d + '"><td>' + g[0] + '</td><td class="red">&nbsp;' + g[1] + "&nbsp;</td><td>" + g[2] + "</td><td>&nbsp;" + g[3] + "</td></tr>"
    });
    b.html(c.toString().keyComment());
    a = null
}
;
P.Mod.side_left.prototype.bindorderList = function (b) {
    var m = 0
        , f = 0
        , k = ""
        , d = b.length;
    this.param.t = "";
    for (var h = 0; h < d; h++) {
        m++;
        var g = b[h];
        switch (P.Set.systype) {
            case "klc":
                var c = P.Set.playType[g.playType];
                var j = P.Set.playBall[g.num] ? P.Set.playBall[g.num] : g.num;
                k += "<tr><td>" + c + " " + j + '</td><td class="red">';
                break;
            case "ssc":
                var c = P.Set.playType_sc[g.playType]
                    , a = g.con ? g.con : P.Utl.number_sc(g.playType, b[h].num)[1];
                k += "<tr><td>" + c + " " + a + '</td><td class="red">';
                this.note = b;
                break;
            case "pk10":
                var c = P.Utl.number_pk10(g.playType, g.num).join(" ");
                k += "<tr><td>" + c + '</td><td class="red">';
                break;
            case "nc":
                var c = P.Set.playType_nc[g.playType];
                var j = P.Set.playBall_nc[g.num] ? P.Set.playBall_nc[g.num] : g.num;
                k += "<tr><td>" + c + " " + j + '</td><td class="red">';
                break;
            case "ks":
                var c = P.Set.number_ks(g.playType, g.num);
                k += "<tr><td>" + c + '</td><td class="red">';
                break;
            case "kb":
                var c = P.Set.number_kb(g.playType, g.num);
                k += "<tr><td>" + c + '</td><td class="red">';
                break
        }
        k += g.odds + "</td><td>";
        k += g.am + "</td></tr>";
        f += parseInt(g.am, 10);
        this.param.t += g.playType + "|" + g.num + "|" + g.odds + "|" + g.am + ";"
    }
    $("#orderList").html(k.toString().keyComment());
    $("#groupNum").html(m.toString().toString().keyComment());
    $("#totalAmount").html(f.toString().toString().keyComment());
    b = null
}
;
P.Mod.side_left.prototype.bindnumCache = function (h) {
    var k = this
        , f = h.numCache
        , c = h.note
        , j = ""
        , g = 0;
    k.param.t = "";
    if (f) {
        var b = f.num[0] instanceof Array, a;
        a = b ? f.num.join("@").replace(/@{2}/g, "@") : f.num;
        k.param.t = f.playType + "|" + a + "|" + f.odds + "|";
        var l, b;
        switch (P.Set.systype) {
            case "klc":
                l = P.Set.playType[f.playType];
                break;
            case "nc":
                l = P.Set.playType_nc[f.playType];
                break
        }
        if (!b) {
            j += "<tr><td>" + l + " " + f.num.toString() + '</td><td class="red">'
        } else {
            if (f.playType == "064") {
                j += "<tr><td>" + l + "&emsp;前位" + f.num[0] + "&emsp;后位" + f.num[2] + "</td><td>"
            } else {
                j += "<tr><td>" + l + "&emsp;前位" + f.num[0] + "&emsp;中位" + f.num[1] + "&emsp;后位" + f.num[2] + "</td><td>"
            }
        }
        j += f.odds + "</td><td>";
        j += c[0].am + "</td></tr>";
        for (var d = 0; d < c.length; d++) {
            g += parseInt(c[d].am, 10)
        }
        k.param.t += g.toString()
    }
    $("#orderList").html(j.toString().keyComment());
    $("#groupNum").html(c.length);
    $("#totalAmount").html(g.toString().toString().keyComment());
    o = null
}
;
P.Mod.side_left.prototype.bindSubObj = function (g, b) {
    var i = this, d = P.Set.systype, a;
    i.kobj = g;
    i.param = {};
    if (!g) {
        return false
    }
    switch (d) {
        case "klc":
            if (g.numCache) {
                i.bindnumCache(g)
            } else {
                if (g.note) {
                    i.bindorderList(g.note)
                } else {
                    return false
                }
            }
            a = "post_submit";
            break;
        case "ssc":
            var f = g.note ? g.note : g;
            b = b || 0;
            i.bindorderList(f);
            i.note = {};
            a = "post_submit_sc";
            break;
        case "pk10":
            if (g.note) {
                i.bindorderList(g.note)
            } else {
                return false
            }
            a = "post_submit_pk10";
            break;
        case "nc":
            if (g.numCache) {
                i.bindnumCache(g)
            } else {
                if (g.note) {
                    i.bindorderList(g.note)
                } else {
                    return false
                }
            }
            a = "post_submit_nc";
            break;
        case "ks":
            if (g.numCache) {
                i.bindnumCache(g)
            } else {
                if (g.note) {
                    i.bindorderList(g.note)
                } else {
                    return false
                }
            }
            a = "post_submit_ks";
            break;
        case "kb":
            if (g.numCache) {
                i.bindnumCache(g)
            } else {
                if (g.note) {
                    i.bindorderList(g.note)
                } else {
                    return false
                }
            }
            a = "post_submit_kb";
            break
    }
    var h = $("#confirmOrder");
    if (i.alertOrder) {
        i.alertOrder.dom.children()[0].innerHTML = h.html();
        i.alertOrder.determine.focus().select()
    } else {
        i.alertOrder = $.UT.Alert({
            text: h.html(),
            title: "{#|4e0b|6ce8#}明细（请确认{#|6ce8|5355#}）",
            mask: false,
            close: false,
            buttonBL: false,
            closeBL: false,
            determineCallback: function () {
                i.param.v = i.version_number;
                i.alertOrder.cancel.attr("unable", "1");
                $.UT.publicGetAction(i.dom[0].id, i.param, function (j) {
                    i.setData(j);
                    P.Utl.bet_callback({
                        data: j,
                        state: 1,
                        cachedata: i.kobj
                    });
                    i.alertOrder.close();
                    i.alertOrder = null
                }, a, function (l, k, j) {
                    i.setData(k);
                    if (j == 0) {
                        P.Utl.bet_callback({
                            data: k,
                            state: 0,
                            errors: l,
                            cachedata: i.kobj
                        });
                        i.alertOrder.close();
                        i.alertOrder = null
                    } else {
                        if (j == 2) {
                            P.Utl.bet_callback({
                                data: k,
                                state: 2,
                                errors: l,
                                cachedata: i.kobj
                            });
                            i.alertOrder.close();
                            i.alertOrder = null
                        } else {
                            return false
                        }
                    }
                    if (i.alertOrder) {
                        i.alertOrder.cancel.attr("unable", "0")
                    }
                }, true, true, {
                    data: '<span class="loading"></span><span class="L_H32">{#|6ce8|5355#}处理中，请不要刷新页面...</span>',
                    button: i.alertOrder.determine,
                    timeOut: 35000
                })
            }
        });
        if (g.numCache) {
            $(".orderListBox table").css("table-layout", "auto")
        } else {
            $(".orderListBox table").css("table-layout", "fixed")
        }
        var c = function (k) {
            if ((k.keyCode == 13 && k.type == "keydown") || k.type == "click") {
                var l = i.alertOrder.cancel.attr("unable") || 0;
                if (l == 0) {
                    var j = "你确定取消{#|6ce8|5355#}吗？";
                    $.UT.Alert({
                        text: j,
                        determineCallback: function () {
                            i.alertOrder.close();
                            g = null;
                            i.param = null;
                            i.alertOrder = null
                        },
                        cancelCallback: function () {
                            if (i.alertOrder) {
                                i.alertOrder.determine.focus().select()
                            }
                        }
                    })
                } else {
                    return false
                }
            }
        };
        i.alertOrder.cancel.bind("keydown click", c)
    }
}
;
P.Mod.bothSides = function (a) {
    P.Utl.navChange_page(a[0].id);
    P.Mod.moduleklc.call(this, a, "sub_nav")
}
;
P.Mod.bothSides.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $("#firstball .bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.bothSides.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.bothSides.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.ballNO = function (a) {
    P.Mod.moduleklc.call(this, a, "sub_nav")
}
;
P.Mod.ballNO.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.ballNO.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $("#common_div td[number]").removeData().html("");
    $("#kuaijie_div td[number]").removeData().html("");
    $("#ballNO .bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.ballNO.prototype.setData = function (m) {
    var c = document.getElementById(this.id);
    if (!c) {
        return
    }
    if (this.moduleFirstLogin) {
        this.moduleFirstLogin();
        this.moduleFirstLogin = null
    }
    var f = $("#integrate-nav  a.on").attr("subnav");
    if (f != m.play) {
        return
    }
    if (m.drawStatus !== this.drawStatus) {
        this.drawStatus = m.drawStatus;
        if (m.drawStatus === "1") {
            this.kgPan("open")
        } else {
            $("#selectNote").hide()
        }
    }
    this.user_status = m.user_status;
    P.Mod.bindsub_navdata(m, this);
    if (m.play) {
        this.rfresh.data.play = m.play;
        var a = parseInt(m.play.slice(-1)) - 1;
        if (a < 4) {
            $("#longhu_ball").show()
        } else {
            $("#longhu_ball").hide()
        }
        var t = ["第一球", "第二球", "第三球", "第四球", "第五球", "第六球", "第七球", "第八球", "第九球"][a];
        $("#firstball").attr({
            cat: "0" + a,
            play: m.play
        }).html(t);
        this.rfresh.data.ball = "0" + a;
        this.rfresh.data.cat = $(".kon").attr("cat")
    }
    var r = this.tdcache
        , q = m.user_status;
    if (this.drawStatus == 1) {
        if (m.integrate) {
            var j = m.integrate;
            $.each(j, function (B, k) {
                var D = B.slice(3, 5)
                    , z = $(r["c" + D]);
                if (z && z[0] && z[0].cellIndex) {
                    var x = z[0]
                        , E = x.cellIndex
                } else {
                    return
                }
                var F = x.parentNode
                    , C = F.cells[E + 1]
                    , y = F.cells[E - 1];
                if (z) {
                    var A = C.getElementsByTagName("input")[0];
                    if (k == "-") {
                        z.removeData();
                        z.addClass("huiseBg").html(k).css("color", "red");
                        $(x).addClass("huiseBg");
                        $(y).addClass("huiseBg");
                        C.className = "amount huiseBg";
                        A.setAttribute("disabled", "disabled");
                        A.value = ""
                    } else {
                        if (z.hasClass("huiseBg")) {
                            z.removeClass("huiseBg");
                            $(y).removeClass("huiseBg");
                            C.className = "amount"
                        }
                        if (q == "2") {
                            A.setAttribute("disabled", "disabled")
                        } else {
                            if (A.getAttribute("disabled")) {
                                A.removeAttribute("disabled")
                            }
                        }
                        if (x.innerHTML != k || k == 0) {
                            if (x.innerHTML == "" || x.innerHTML == "-") {
                                x.style.color = "#f00"
                            } else {
                                if (k != "0" || x.innerHTML != "0") {
                                    P.Utl.changeColor(z, k)
                                }
                            }
                            x.innerHTML = k
                        }
                    }
                    z[0].setAttribute("playType", B.slice(0, 3))
                }
                var w = $(r["k" + D]);
                var v = w.prev();
                if (w) {
                    if (k == "-") {
                        w.removeData().html(k).addClass("huiseBg").css("color", "red");
                        v.addClass("huiseBg")
                    } else {
                        if (w.hasClass("huiseBg")) {
                            w.removeClass("huiseBg");
                            v.removeClass("huiseBg")
                        }
                        if (q == "2") {
                            w.removeClass("onBg");
                            v.removeClass("onBg")
                        }
                        var H = w[0];
                        if (H.innerHTML != k || k == 0) {
                            if (H.innerHTML == "" || H.innerHTML == "-") {
                                H.style.color = "#f00"
                            } else {
                                if (k != "0" || H.innerHTML != "0") {
                                    P.Utl.changeColor(w, k)
                                }
                            }
                            H.innerHTML = k
                        }
                    }
                    w[0].setAttribute("playType", B.slice(0, 3))
                }
            })
        } else {
            $("td[number]").html("")
        }
    } else {
        this.kgPan("close")
    }
    if (m.rate && m.rate.length > 0) {
        var g = $("#rate")[0];
        if (g) {
            var n = g.rows.length
                , d = g.rows[n - 2]
                , b = g.rows[n - 1]
                , h = d.cells.length
                , p = m.rate;
            for (var l = 0; l < h; l++) {
                if (p[l]) {
                    d.cells[l + 1].innerHTML = parseInt(p[l][0], 10) > 3 ? "<span class='red fontweight'>" + p[l][0] + "</span>" : p[l][0];
                    b.cells[l + 1].innerHTML = parseInt(p[l][1], 10) > 3 ? "<span class='red fontweight'>" + p[l][1] + "</span>" : p[l][1]
                }
            }
        }
    }
    this.autoRefreshspan.show();
    m = null
}
;
P.Mod.ballNO.prototype.kgPan = function (a) {
    var b = $("input:text")
        , d = $(".touzhuArea td")
        , c = $("td[number]");
    if (a == "open") {
        d.removeClass("huiseBg");
        b.removeAttr("disabled")
    } else {
        if (a == "close") {
            c.html("").removeData();
            d.addClass("huiseBg");
            $("#kuaijie_div td.onBg").removeClass("onBg");
            b.attr("disabled", "disabled");
            b.filter(".amount-input").val("");
            $(".bulk-amount-times").hide();
            P.Set.number = 0
        }
    }
}
;
P.Mod.ballNO.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.sumDT = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav")
}
;
P.Mod.sumDT.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.sumDT.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.sumDT.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.sumDT.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.evenCode = function (f) {
    this.dom = f;
    var g = this;
    this.table = $(".touzhuArea", f);
    this.id = f[0].id;
    this.checkbox = $(".touzhuArea input");
    if (!P.Set.beishu) {
        $(".elem_multiple").css("visibility", "hidden")
    } else {
        P.Utl.bei(f)
    }
    var c = {
        urlId: g.id,
        data: {
            action: "ajax",
            play: "evenCode"
        },
        action: "get_json",
        callback: function (h) {
            g.setData(h)
        }
    };
    f.bind("resultnum", function (h) {
        if (g.rfresh) {
            g.rfresh.intervalfun(0)
        }
    });
    this.autoRefreshspan = $("#autoRefreshspan1", g.dom);
    if (!this.rfresh) {
        g.rfresh = this.autoRefreshspan.Widget("AutoRefresh", c)
    }
    var a = document.getElementById("submit");
    if (a) {
        P.Utl.keydown(g.dom, this.id, P.Utl.submit)
    }
    P.Utl.minNav(this.id);
    P.Utl.checked(f);
    var d = function (j) {
        var h = this.cellIndex
            , i = h % 2 == 0 ? $("input", $(this).next())[0] : $("input", $(this))[0];
        i.click()
    };
    $("td", g.table).bind("click", d);
    P.Utl.countBack(g.id, "rfresh");
    var b = function (l) {
        if (g.blur != null) {
            g.blur.focus();
            g.blur = null
        }
        var h = l.target;
        if (g.drawStatus == "1") {
            if (g.user_status == "1") {
                var k = $(".kon span").html();
                if (k == "-") {
                    return
                }
                if (h.id == "submit") {
                    var i = P.Utl.submit(g.dom, "evenCode");
                    if (i) {
                        var j = $("#side_left").data("Module");
                        j.bindSubObj(i)
                    }
                }
                if (h.id == "reset") {
                    g.reset()
                }
            } else {
                $("input[type='checkbox']", g.dom).removeAttr("checked");
                $("span[name='determine']").focus();
                if ($(".requestData").text() != "") {
                    return false
                }
                $.UT.Alert({
                    booLean: false,
                    text: "账号被{#|505c|62bc#}（或者账号处于{#|505c|62bc#}状态），请联系管理员！"
                })
            }
        }
    };
    $("input[type='checkbox']", g.dom).bind("click", b);
    $(".elem_amount", g.dom).bind("click", b);
    g.numCache = [];
    g.playType = "061";
    g.odds = "";
    P.Mod.sub_navklc.call(this, f, "");
    this.rebind()
}
;
P.Mod.evenCode.prototype.rebind = function () {
    var b = this;
    b.reset();
    this.autoRefreshspan.show();
    var a = function (h) {
        b.uAction = 1;
        if (b.user_status == "2") {
            return
        }
        if (this.checked == true) {
            if (b.numCache.length == 10) {
                return
            }
            var g = this.getAttribute("number");
            b.numCache.push(g);
            var f = $(this.parentNode);
            f.prev().addClass("onBg");
            f.addClass("onBg")
        } else {
            var g = this.getAttribute("number");
            var c = $.inArray(g, b.numCache);
            if (c != -1) {
                b.numCache.splice(c, 1);
                $("[checked=false]:checkbox").removeAttr("disabled");
                var f = $(this.parentNode);
                f.prev().removeClass("onBg");
                f.removeClass("onBg")
            }
        }
        if (b.numCache.length == 10) {
            $("input:not(:checked)", b.table).attr("disabled", "disabled")
        } else {
            $("input:not(:checked)", b.table).removeAttr("disabled")
        }
        b.playType = $(".kon input").attr("playType");
        b.odds = $(".kon span").html();
        var d = parseInt($("td.kon").attr("name"));
        b.numCache.sort(function (j, i) {
            return j > i
        });
        b.numList = P.Utl.refreshNum({
            max: d,
            arrrom: b.numCache
        });
        $("#selectedlist").html(b.numCache.join("&nbsp;"));
        $("#selectedAmount").html(b.numList.length);
        $(".elem_selected").show();
        if (h.stopPropagation) {
            h.stopPropagation()
        } else {
            h.cancelBubble = true
        }
    };
    $("input", b.table).bind("click", a);
    $.UT.HoverList_tzxc({
        container: ".touzhuArea",
        newClass: "bcd"
    })
}
;
P.Mod.evenCode.prototype.setData = function (c) {
    var b = document.getElementById(this.id);
    if (!b) {
        return
    }
    if (c.integrate) {
        var d = c.integrate;
        $.each(d, function (g, k) {
            var j = $("span[odds=" + g.slice(0, 3) + "]");
            if (j && j[0]) {
                var h = j[0];
                if (k != h.innerHTML || k == 0) {
                    if (h.innerHTML === "" || h.innerHTML == "-") {
                        h.style.color = "#f00"
                    } else {
                        if (k != "0" || h.innerHTML != "0") {
                            P.Utl.changeColor(j, k)
                        }
                    }
                    h.innerHTML = k
                }
            }
        })
    }
    if (c.ballNumLimit) {
        this.ballNumLimit = parseInt(c.ballNumLimit)
    }
    this.drawStatus = c.drawStatus;
    this.user_status = c.user_status;
    this.td = $(".touzhuArea tbody td");
    P.Mod.bindsub_navdata(c, this);
    if (this.drawStatus == 1) {
        var f = $("td.kon span").html();
        if (f == "-") {
            this.reset();
            this.guanpan()
        } else {
            this.guanpan(true)
        }
    } else {
        this.guanpan();
        $(".bq-title span").html("")
    }
    var a = $(".elem_amount_input").prop("disabled");
    if (this.user_status != 2 && a) {
        $(".elem_amount_input").removeAttr("disabled")
    }
}
;
P.Mod.evenCode.prototype.unbind = function () {
    this.rfresh.hide();
    this.playType = "061";
    this.odds = null;
    $("input", this.table).unbind();
    this.uAction = 0;
    $(".bq-title").first().addClass("kon").siblings().removeClass("kon");
    $(".kon input").attr("checked", true);
    var a = function () {
        var b = $("input", $(this.parentNode).next())[0];
        b.click()
    };
    $(".number", this.table).bind("click", a);
    if (this.getResult) {
        this.getResult.hide()
    }
}
;
P.Mod.evenCode.prototype.reset = function (a) {
    $("input", this.table).removeAttr("disabled").removeAttr("checked");
    $(".elem_selected").hide();
    this.numCache = [];
    this.numList = [];
    $(".huiseBg").removeClass("huiseBg");
    $(".onBg").removeClass("onBg")
}
;
P.Mod.evenCode.prototype.guanpan = function (a) {
    var d = $("input:radio", this.dom)
        , b = $(".touzhuArea input:checkbox", this.dom)
        , c = $("input:text", this.dom);
    if (a) {
        if (this.user_status == "2") {
            c.attr("disabled", "disabled")
        } else {
            if (this.uAction == 0) {
                c.removeAttr("disabled").css({
                    background: "#fff"
                });
                b.removeAttr("checked").removeAttr("disabled")
            }
        }
        $(".huiseBg").removeClass("huiseBg")
    } else {
        this.numCache = [];
        this.numList = [];
        $(".touzhuArea tbody td").css({
            cursor: "default"
        }).addClass("huiseBg");
        c.attr({
            disabled: "disabled"
        }).css({
            background: "#eee"
        });
        b.removeAttr("checked").attr({
            disabled: "disabled"
        });
        $(".kon input").attr("checked", "true");
        $(".onBg").removeClass("onBg");
        this.uAction = 0;
        $(".elem_selected").hide()
    }
}
;
P.Utl.refreshNum = function (m) {
    var r = m.arrrom;
    var y = m.max || 2;
    var d = [];
    var A = r.length || 0;
    var h = m.type;
    if (y == 1) {
        return r
    }
    if (!h) {
        for (var z = 0; z <= A; z++) {
            for (var t = z + 1; t < A; t++) {
                if (y == 2) {
                    if (r[z] != r[t]) {
                        d.push([r[z], r[t]])
                    }
                }
                if (y >= 3) {
                    for (var q = t + 1; q < A; q++) {
                        if (y == 3) {
                            if (r[z] != r[t] && r[z] != r[q] && r[t] != r[q]) {
                                d.push([r[z], r[t], r[q]])
                            }
                        }
                        if (y >= 4) {
                            for (var p = q + 1; p < A; p++) {
                                if (y == 4) {
                                    d.push([r[z], r[t], r[q], r[p]])
                                }
                                if (y == 5) {
                                    for (var n = p + 1; n < A; n++) {
                                        d.push([r[z], r[t], r[q], r[p], r[n]])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        var D = r[0]
            , C = r[1]
            , B = r[2];
        if (h == "064") {
            if (D.length == 0 || B.length == 0) {
                return []
            }
            for (var z = 0, w = D.length; z < w; z++) {
                for (var x = 0, l = B.length; x < l; x++) {
                    if (D[z] != B[x]) {
                        d.push([D[z], B[x]])
                    }
                }
            }
        }
        if (h == "067") {
            if (D.length == 0 || B.length == 0 || C.length == 0) {
                return []
            }
            for (var z = 0, w = D.length; z < w; z++) {
                for (var x = 0, f = C.length; x < f; x++) {
                    for (var v = 0, g = B.length; v < g; v++) {
                        if (D[z] != C[x] && D[z] != B[v] && C[x] != B[v]) {
                            d.push([D[z], C[x], B[v]])
                        }
                    }
                }
            }
        }
    }
    try {
        return d
    } finally {
        d = null
    }
}
;
P.Mod.moduleklc = function (q, g) {
    var l = this;
    this.dom = q;
    this.id = q[0].id;
    this.table = $(".touzhuArea", l.dom);
    var v = function (A) {
        var i = A.target;
        if (l.drawStatus == "1") {
            if (l.user_status == "1") {
                if (i.id == "submit" || i.id == "reset") {
                    if (A.type == "onkeypress") {
                        return
                    }
                }
                if (i.id == "submit" || i.id == "submit_top") {
                    var x = P.Utl.submit(l.table, "ball", i.id);
                    if (x) {
                        var y = $("#side_left").data("Module");
                        y.bindSubObj(x)
                    }
                }
                if (i.id == "reset" || i.id == "reset_top") {
                    $(".onBg").removeClass("onBg");
                    $(".amount-input").val("");
                    $(".elem_selected").hide();
                    P.Set.number = 0
                }
            } else {
                var z = $(i).parents(".paihang").length || $(i).parents(".changlongbox").length;
                $("span[name='determine']").focus();
                if ($(".requestData").text() != "") {
                    return false
                }
                if (z == 0) {
                    $.UT.Alert({
                        booLean: false,
                        text: "账号被{#|505c|62bc#}（或者账号处于{#|505c|62bc#}状态），请联系管理员！"
                    })
                }
            }
        }
    };
    q.bind("click keypress", v);
    var r = ""
        , f = "13"
        , m = "";
    this.autoRefreshspan = $("#autoRefreshspan1", l.dom);
    switch (this.id) {
        case "bothSides_pk10":
            r = "bothSides_pk10";
            f = "15";
            break;
        case "bothSides_ks":
            r = "pageOne";
            break;
        case "ballNO15":
            r = "ballNO15";
            break;
        case "ballNO60":
            r = "ballNO60";
            break;
        case "sumDT_pk10":
            f = "15";
            r = "sumDT_pk10";
            break;
        case "bothSides":
            r = "bothSides";
            break;
        case "ballNO":
            r = "ball1";
            m = "00";
            f = "00";
            var b = $("#common_div td[number]")
                , w = $("#kuaijie_div td[number]");
            this.tdcache = {};
            for (var n = 0, p = b.length; n < p; n++) {
                var a = b[n];
                this.tdcache["c" + a.getAttribute("number")] = a
            }
            for (var n = 0, p = w.length; n < p; n++) {
                var c = w[n];
                this.tdcache["k" + c.getAttribute("number")] = c
            }
            var j = $("#elem_klc .on").attr("subnav");
            var d = ["--", "一", "二", "三", "四", "五", "六", "七", "八"][j.slice(-1)];
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("第" + d + "球");
            var k = ["000", "000", "001", "002", "003", "004", "005", "006", "007"][j.slice(-1)];
            $("td[playType]", "#ballNO").attr("playType", k);
            if (parseInt(j.slice(-1)) < 5) {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO").show()
            } else {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO").hide()
            }
            break;
        case "sumDT":
            r = "sumDT";
            break;
        case "bothSides_nc":
            r = "bothSides_nc";
            break;
        case "ballNO_nc":
            r = "ball_nc_1";
            m = "00";
            f = "00";
            var b = $("#common_div td[number]")
                , w = $("#kuaijie_div td[number]");
            this.tdcache = {};
            for (var n = 0, p = b.length; n < p; n++) {
                var a = b[n];
                this.tdcache["c" + a.getAttribute("number")] = a
            }
            for (var n = 0, p = w.length; n < p; n++) {
                var c = w[n];
                this.tdcache["k" + c.getAttribute("number")] = c
            }
            var j = $("#elem_nc .on").attr("subnav");
            var d = ["--", "一", "二", "三", "四", "五", "六", "七", "八"][j.slice(-1)];
            $("#winbox .b18tishi").show();
            $("#winbox .b18tishi_img").html("第" + d + "球");
            var k = ["000", "000", "001", "002", "003", "004", "005", "006", "007"][j.slice(-1)];
            $("td[playType]", "#ballNO_nc").attr("playType", k);
            if (parseInt(j.slice(-1)) < 5) {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO_nc").show()
            } else {
                $("#1-4longhu,#1-4longhu_kj", "#ballNO_nc").hide()
            }
            break;
        case "sumDT_nc":
            r = "sumDT_nc";
            break;
        case "sumDT_kb":
            r = "sumDT_kb";
            break;
        case "bothSides_kb":
            r = "bothSides_kb";
            break
    }
    var h;
    switch (this.id) {
        case "ballNO_sc":
            h = {
                number: 0,
                playtype: 1
            };
            break;
        case "bothSides_ssc":
            h = {
                number: 3,
                playtype: 1
            };
            break;
        default:
            h = {
                action: "ajax",
                play: r,
                ball: m,
                cat: f
            }
    }
    var t = {
        urlId: l.id,
        data: h,
        action: "get_json",
        callback: function (i) {
            l.setData(i)
        }
    };
    l.rfresh = this.autoRefreshspan.Widget("AutoRefresh", t);
    l.rfresh.show()
}
;
P.Mod.moduleFirstLogin = function () {
    var b = this.dom;
    P.Utl.checked(this.dom);
    P.Utl.orderMit(this.dom);
    P.Utl.countBack(this.id, "rfresh");
    this.submitBtn = document.getElementById("submit");
    if (this.submitBtn) {
        P.Utl.keydown(this.dom, "ball", P.Utl.submit)
    }
    $(".elem_amount_input", b).bind("keyup", function () {
        var f = this.value;
        $(".elem_amount_input").val(f)
    });
    if (!P.Set.beishu) {
        $("div.elem_multiple", b).css("visibility", "hidden")
    } else {
        P.Utl.bei(b)
    }
    if (this.id != "ballNO_sc") {
        P.Utl.minNav(this.id)
    }
    if (this.id != "ballNO" && this.id != "ballNO_sc" && this.id != "ballNO_nc") {
        this.commonTd = $("#common_div td[number]", b);
        this.kuaijieTd = $("#kuaijie_div td[number]", b)
    }
    var d = function (h) {
        var g = h.target.value
            , f = h.target;
        if ((g != "") && !(g.match(/\D/) == null && parseInt(g, 10) > 0)) {
            f.value = "";
            f.focus();
            return false
        }
    };
    $("input", this.table).bind("blur", d);
    var a = P.Set.systype;
    switch (a) {
        case "klc":
            P.Mod.sub_navklc.call(this, b, "");
            break;
        case "ssc":
            P.Mod.sub_navklc.call(this, b, "_sc", 10000);
            break;
        case "pk10":
            P.Mod.sub_navklc.call(this, b, "_pk10", 10000);
            break;
        case "nc":
            P.Mod.sub_navklc.call(this, b, "_nc");
            break;
        case "ks":
            P.Mod.sub_navklc.call(this, b, "_ks");
            break;
        case "kb":
            P.Mod.sub_navklc.call(this, b, "_kb");
            break
    }
    var c = this;
    b.bind("resultnum", function (f) {
        if (c.rfresh) {
            c.rfresh.intervalfun(0)
        }
    })
}
;
P.Mod.klcsetData = function (g, f) {
    var c = +new Date();
    var d = g.dom
        , k = d[0].id;
    var b = document.getElementById(k);
    if (!b) {
        return
    }
    if (g.moduleFirstLogin) {
        g.moduleFirstLogin();
        g.moduleFirstLogin = null
    }
    g.autoRefreshspan.show();
    g.rfresh.data.cat = $(".kon").attr("cat");
    g.user_status = f.user_status;
    P.Mod.bindsub_navdata(f, g);
    if (f.drawStatus !== g.drawStatus) {
        g.drawStatus = f.drawStatus;
        var j = $("input.elem_amount_input", d);
        if (f.drawStatus == "1") {
            j.removeAttr("disabled");
            $(".huiseBg", d).removeClass("huiseBg");
            $("input:text", d).removeAttr("disabled")
        } else {
            $(".bulk-amount-times", d).hide();
            j.attr("disabled", "disabled");
            $("td[number]", d).html("");
            $(".onBg", d).removeClass("onBg");
            $("#selectNote").hide()
        }
    }
    if (g.drawStatus == "1") {
        if (f.integrate) {
            var h = document;
            g.commonTd.each(function (q, w) {
                var m = $(w)
                    , r = w.cellIndex
                    , v = w.parentNode;
                var t = v.cells[r - 1]
                    , l = v.cells[r + 1];
                var a = w.getAttribute("playType") + w.getAttribute("number");
                var x = f.integrate[a];
                var p = $("input", l)
                    , n = w.innerHTML;
                if (x || x == 0) {
                    if (x == "-") {
                        if (w.className.indexOf("huiseBg") == -1) {
                            w.className = w.className + "  huiseBg";
                            l.className = l.className + "  huiseBg";
                            t.className = t.className + "  huiseBg"
                        }
                        w.innerHTML = "-";
                        p.attr("disabled", "disabled")
                    } else {
                        if (w.className.indexOf("huiseBg") > -1) {
                            l.className = l.className.replace("huiseBg", "");
                            w.className = w.className.replace("huiseBg", "");
                            t.className = t.className.replace("huiseBg", "");
                            p.removeAttr("disabled");
                            g.user_status == "2" ? p.attr("disabled", "disabled") : p.removeAttr("disabled")
                        }
                        if (n != x || x == 0) {
                            if (n == "" || n == "-") {
                                w.style.color = "#f00"
                            } else {
                                if (x != "0" || n != "0") {
                                    P.Utl.changeColor(m, x)
                                }
                            }
                            w.innerHTML = x
                        }
                    }
                }
            });
            g.kuaijieTd.each(function (n, t) {
                var l = $(t)
                    , p = t.cellIndex
                    , r = t.parentNode;
                var q = r.cells[p - 1];
                var a = t.getAttribute("playType") + t.getAttribute("number")
                    , v = f.integrate[a]
                    , m = t.innerHTML;
                if (v || v == 0) {
                    if (v == "-") {
                        if (t.className.indexOf("huiseBg") == -1) {
                            t.className = t.className.replace("onBg", "") + "  huiseBg";
                            q.className = q.className.replace("onBg", "") + "  huiseBg"
                        }
                        t.innerHTML = "-"
                    } else {
                        if (t.className.indexOf("huiseBg") > -1) {
                            t.className = t.className.replace("huiseBg", "");
                            q.className = q.className.replace("huiseBg", "")
                        }
                        if (m != v || v == 0) {
                            if (m == "" || m == "-") {
                                t.style.color = "#f00"
                            } else {
                                if (v != "0" || m != "0") {
                                    P.Utl.changeColor(l, v)
                                }
                            }
                            t.innerHTML = v
                        }
                    }
                }
            })
        } else {
            $("td[number]", d).html("")
        }
        $("#kuaijiexiaju_input").removeAttr("disabled")
    } else {
        $(".touzhuArea td", d).addClass("huiseBg");
        $(".touzhuArea input:text", d).attr("disabled", "disabled").val("");
        $("td[number]", d).html("");
        $(".onBg", d).removeClass("onBg");
        $(".bulk-amount-times", d).hide();
        $("#kuaijiexiaju_input").attr("disabled", "disabled");
        P.Set.number = 0
    }
    f = null;
    delete f;
    s = null;
    delete s;
    for (var i in g) {
        g.a = null;
        delete g.a
    }
    g = null;
    delete g
}
;
P.Mod.bindsub_navdata = function (k, t) {
    k.linktype = 1;
    if (k.betnotice) {
        k.bigDrawStatus = k.bigDrawStatus || "2";
        switch (k.sys) {
            case "klc":
                P.Mod.sBindDataklc.call(t, k, "#bothSides,#ballNO,#sumDT,#evenCode", 8, 540, 420);
                break;
            case "pk10":
                P.Mod.sBindDataklc.call(t, k, "#bothSides_pk10,#ballNO15,#ballNO60,#sumDT_pk10", 10, 290, 170);
                break;
            case "ssc":
                P.Mod.sBindDataklc.call(t, k, "#integrate_sc", 5, 590, 450);
                break;
            case "nc":
                P.Mod.sBindDataklc.call(t, k, "#bothSides_nc,#ballNO_nc,#sumDT_nc,#evenCode_nc", 8, 540, 420);
                break;
            case "ks":
                P.Mod.sBindDataklc.call(t, k, "#bothSides_ks", 3, 590, 450);
                break;
            case "kb":
                P.Mod.sBindDataklc.call(t, k, "#bothSides_kb,#sumDT_kb", 20, 540, 420);
                break
        }
    }
    t.side_left = t.side_left || $("#side_left").Module();
    if (t.side_left) {
        var h = $("#account");
        var q = $("span", h);
        if (t.user_status == "2") {
            if (!q[0]) {
                h.append("<span class='red'>({#|505c|62bc#})</span>".keyComment())
            }
        } else {
            q.remove()
        }
        if (t.side_left.odds_refresh) {
            t.rfresh.show(t.side_left.odds_refresh)
        } else {
            t.rfresh.show(12)
        }
    } else {
        t.rfresh.show(10)
    }
    if (k.ballqueue_result && k.ballqueue_result.length > 0) {
        var f = $(".ballqueue_result td")
            , j = f.length
            , g = j - 1;
        for (; g > -1; g--) {
            var m = f[g];
            var r = k.ballqueue_result[j - g - 1];
            if (r && r.length > 0) {
                var p = r[0]
                    , n = parseInt(r[1], 10)
                    , l = (new Array(n + 1)).join("<p>" + p + "</p>");
                m.innerHTML = (l || p)
            } else {
                m.innerHTML = ""
            }
            g % 2 == 0 ? m.className = "line-gradient" : m.className = ""
        }
    }
}
;
P.Mod.klcunbind = function (a) {
    a.rfresh.hide();
    if (a.getResult) {
        a.getResult.hide()
    }
}
;
P.Mod.klcrebind = function (a) {
    a.autoRefreshspan.show()
}
;
P.Mod.sub_navklc = function (c, a, b) {
    var d = this;
    this.typeint = 0;
    this.oldtimes = "";
    this.dom = c;
    $("#timesold", c).bind("CountDownStop", function (k, l, h, g) {
        var j = {
            urlId: "header",
            action: "get_ball" + a,
            callback: function (n) {
                if (n) {
                    var m = true;
                    if (a == "" && P.Set.systype == "klc") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 8, 540, 420)
                    }
                    if (a == "_pk10" && P.Set.systype == "pk10") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 10, 290, 170)
                    }
                    if (a == "_sc" && P.Set.systype == "ssc") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 5, 590, 450)
                    }
                    if (a == "_nc" && P.Set.systype == "nc") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 8, 540, 420)
                    }
                    if (a == "_ks" && P.Set.systype == "ks") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 3, 540, 420)
                    }
                    if (a == "_kb" && P.Set.systype == "kb") {
                        m = false;
                        P.Mod.sBindDataklc.call(d, n, "#" + d.id, 20, 540, 420)
                    }
                    if (m) {
                        if (d.getResult) {
                            d.getResult.hide()
                        }
                    }
                }
            }
        }
            , i = h || (b ? b : 60000)
            , f = g || Math.floor(Math.random() * 3 + 1);
        if (!d.getResult) {
            d.getResult = $("#resultwheel").Widget("AutoRefresh", j)
        }
        setTimeout(function () {
            d.getResult.show(f)
        }, i)
    })
}
;
P.Mod.sBindDataklc = function (i, k, p, v, r) {
    if (i.sys != P.Set.systype) {
        return false
    }
    var n = i.betnotice
        , q = "";
    $("body").attr("timesold", n.timesold);
    $("#timesold").html(n.timesold ? n.timesold : "");
    $("#timesnow").html(n.timesnow ? n.timesnow : "");
    if (n && n.timesnow) {
        $("#timesnow").html(n.timesnow);
        $("#timesnow_string").show()
    } else {
        $("#timesnow").html("");
        $("#timesnow_string").hide()
    }
    $("#left_times_title h3").html(n.timesnow + "&nbsp;期");
    this.bigDrawStatus = i.bigDrawStatus || this.bigDrawStatus;
    if (this.bigDrawStatus === "1") {
        q = "#timesold"
    } else {
        if (this.getResult) {
            this.getResult.hide()
        }
    }
    if (n.timeclose == n.timeopen && n.timeopen == 0) {
        P.Utl.CountDown("#timeclose", 1);
        P.Utl.CountDown("#timeopen", 1)
    } else {
        P.Utl.CountDown("#timeclose", n.timeclose, k);
        P.Utl.CountDown("#timeopen", n.timeopen, q + "," + k)
    }
    if (n.timesold && this.typeint != 1 && this.oldtimes != n.timesold) {
        if (this.oldtimes != "") {
            this.typeint = 1
        }
        this.oldtimes = n.timesold
    }
    var m = n.resultnum;
    var h = $("#resultnum span"), j, l = this.num || 0;
    if (m.join().replace(/,/g, "") && m.length == p) {
        $(m).each(function (d, t) {
            if (!isNaN(parseInt(m[d], 10))) {
                if (h[d]) {
                    h[d].className = "number num" + parseInt(m[d], 10)
                }
            }
        });
        j = h.filter(".number").length;
        if (j == m.length) {
            if (n.hasOwnProperty("status") && n.status == 1 && !i.linktype) {
                if (this.getResult) {
                    this.getResult.hide()
                }
            }
            if (this.typeint == 1) {
                this.typeint = 0;
                var b = n.timesold + "期{#|5f00|5956#}球号提示";
                P.Utl.playmp3(b, "kaijiang", true, 800);
                this.dom.triggerHandler("resultnum")
            }
        }
        this.num = j
    } else {
        h.removeClass();
        this.num = 0
    }
    if (n.status == 0 && i.drawStatus == 1 && i.bigDrawStatus == 1) {
        var g = parseInt(n.timesnow.slice(-3), 10)
            , f = v
            , c = r;
        if ((1 < g && g < 23 && p == 5) || (97 < g && g < 120 && p == 5)) {
            f = 290;
            c = 150
        }
        var w = n.timeopen - f
            , a = Math.floor(Math.random() * 3 + 1);
        if (w <= 0) {
            w = 1
        } else {
            w = w * 1000
        }
        if (n.timeopen < c) {
            if (this.getResult) {
                this.getResult.hide()
            }
        } else {
            $("#timesold").trigger("CountDownStop", ["", w, a])
        }
    }
    P.Utl.winSetData(i);
    P.Utl.nCLBindData({
        changlong: i.changlong
    });
    $("body").trigger("cpschanel", ["win", "add", P.Utl.winSetData]);
    if (n.kb_sysName) {
        $("#kb_sysName").html(n.kb_sysName)
    }
    n = null;
    m = null;
    h = null;
    delete n;
    delete h;
    delete m
}
;
P.Mod.history = function (a) {
    var b = this;
    b.dom = a;
    b.pager = {
        history: {},
        num: {}
    };
    b.step = 0;
    b.play = {
        ssc: "{#|91cd|5e86|65f6|65f6|5f69#}",
        klc: "{#|5e7f|4e1c|5feb|4e50|5341|5206#}",
        pk10: "{#|5317|4eac|8d5b|8f66#}",
        nc: "{#|5e78|8fd0|519c|573a#}",
        ks: "江苏{#|9ab0|5b9d#}（快3）",
        kb: "{#|5feb|4e50#}8（{#|53cc#}盘）"
    };
    this.action = "get_json";
    b.con = {};
    a.bind("click", function (d) {
        var c = d.target;
        if (c.getAttribute("order")) {
            b.fushi({
                play: c.innerHTML,
                money: c.getAttribute("money"),
                orderId: c.getAttribute("order"),
                combs: c.getAttribute("combs"),
                comb: c.getAttribute("comb"),
                date: c.getAttribute("date"),
                platform: c.getAttribute("platform"),
                num: c.getAttribute("num"),
                status: c.getAttribute("status")
            })
        }
    });
    $.UT.Pager({
        dom: "#history_pager",
        callBack: function (c) {
            b.PagecallBack(c)
        }
    });
    a.delegate("tbody tr", "mouseenter mouseleave", function (d) {
        var c = d.target;
        if (d.type === "mouseenter") {
            this.className = "bc"
        }
        if (d.type === "mouseleave") {
            this.className = ""
        }
    })
}
;
P.Mod.history.prototype.fushi = function (c) {
    if (this.al) {
        return
    }
    var d = this
        , a = $("#play_detail").val()
        , b = "";
    d.al = $.UT.Alert({
        title: "玩法明细",
        text: a.replace("{play}", c.play).replace("{combs}", c.combs).replace("{money}", c.money).replace("{detail}", b),
        booLean: false,
        width: "659",
        cancelCallback: function () {
            delete d.al
        }
    });
    $.UT.publicGetAction("history", {
        platform: c.platform,
        orderId: c.orderId,
        date: c.date,
        num: c.num,
        status: c.status
    }, function (h) {
        if (d.al) {
            var f = h.length;
            for (var j = 0; j < f; j++) {
                var g = ""
                    , i = "";
                if (!(j % 6)) {
                    g = 'style="border-left:1px solid #CDCDCD"'
                }
                if (h[j].length === 5 && h[j][h[j].length - 1] === "1") {
                    i = 'class="huise"'
                }
                b += "<div " + g + " " + i + "><em>" + h[j][0] + "</em><br/>" + h[j][1] + "<br />(" + h[j][2] + ")<br/><span>" + h[j][3] + "</span></div>"
            }
            $(".play-detail").html(b)
        }
    }, "lianma", $.UT.NetErrorCallback)
}
;
P.Mod.history.prototype.callBack = function (b) {
    var c, a = b, d = this;
    if (!a.pager) {
        a.pager = 1
    }
    d.con.platform = d.con.platform || "all";
    d.con.pager = a.pager;
    d.con.status = a.status;
    P.Utl.publicChengeModule(this.dom[0].id, "ajax", "history", "get_html", this.action, d.con, null, null, {
        romances: true,
        BError: $.UT.NetErrorCallback
    })
}
;
P.Mod.history.prototype.PagecallBack = function (b) {
    var d, a = b, h = this;
    if (!a.pager) {
        a.pager = 1
    }
    var c = $("#history_pager");
    var g = $("#d_all").attr("times") || "";
    var f = "get_json";
    if (c) {
        f = c.attr("ajax_json")
    }
    h.con.date = $("#date").attr("post_date");
    h.con.number = g;
    h.con.platform = c.attr("platform") || "all";
    h.con.pager = a.pager;
    h.con.status = $("#reback").attr("status");
    P.Utl.publicChengeModule(this.dom[0].id, "ajax", "history", "get_html", f, h.con, null, null, {
        romances: true,
        BError: $.UT.NetErrorCallback
    })
}
;
P.Mod.history.prototype.firstCallBack = function (b) {
    var c = this
        , a = b.target;
    if (a.getAttribute("h_date")) {
        c.con = {
            date: a.getAttribute("h_date"),
            platform: "all",
            pager: 1,
            status: a.getAttribute("status") || 1
        };
        this.action = "get_play";
        P.Mod.history.step = 1;
        c.pager.history = {
            current: $("#current").val(),
            total: $("#total_page").html()
        }
    }
    P.Utl.publicChengeModule(this.dom[0].id, "ajax", "history", "get_html", this.action, c.con, null, null, {
        romances: true,
        BError: $.UT.NetErrorCallback
    })
}
;
P.Mod.history.prototype.daycallBack = function (c) {
    var b = c.target;
    var d = this;
    var a = b.getAttribute("date");
    d.con = {
        date: b.getAttribute("date"),
        platform: b.getAttribute("platform") || d.platform,
        pager: 1,
        status: b.getAttribute("status")
    };
    if (c.target.getAttribute("number")) {
        d.con.number = b.getAttribute("number");
        d.pager.num = {
            current: $("#current").val(),
            total: $("#total_page").html()
        }
    }
    P.Mod.history.step = 4;
    this.action = "get_all";
    P.Utl.publicChengeModule(this.dom[0].id, "ajax", "history", "get_html", this.action, d.con, null, null, {
        romances: true,
        BError: $.UT.NetErrorCallback
    });
    if (!b.getAttribute("number")) {
        P.Mod.history.step = 3
    }
}
;
P.Mod.history.prototype.CountcallBack = function (b) {
    var c = this
        , a = b.target;
    P.Mod.history.step = 3;
    c.con = {
        date: a.getAttribute("date"),
        platform: a.getAttribute("platform"),
        pager: 1,
        status: a.getAttribute("status")
    };
    this.action = "get_number";
    P.Utl.publicChengeModule(this.dom[0].id, "ajax", "history", "get_html", this.action, c.con, null, null, {
        BError: $.UT.NetErrorCallback,
        romances: true
    })
}
;
P.Mod.history.prototype.reback = function () {
    var b = this, a;
    if (P.Mod.history.step != 0) {
        a = P.Mod.history.step - 1
    } else {
        a = 0
    }
    if (document.getElementById("date")) {
        b.con.date = $("#date").attr("cdate")
    }
    if (document.getElementById("play_type")) {
        b.con.platform = $("#play_type").attr("platform")
    }
    b.con.status = $("#reback").attr("status");
    switch (a) {
        case 0:
        case 1:
            this.action = "get_json";
            P.Mod.history.step = 1;
            b.callBack(b.con);
            break;
        case 2:
            this.action = "get_play";
            P.Mod.history.step = 2;
            b.callBack(b.con);
            break;
        case 3:
            this.action = "get_number";
            P.Mod.history.step = 3;
            b.callBack(b.con);
            break
    }
}
;
P.Mod.status = function (a) {
    this.dom = a;
    this.pager = 1;
    this.st = "2";
    var b = this;
    P.Utl.radio({
        dom: "#radio_se",
        callBack: this.callBack
    });
    $.UT.Pager({
        dom: "#status_pager",
        callBack: this.callBack
    });
    $(a).bind("click change", function (d) {
        var c = d.target;
        if (d.type == "click") {
            if (c.getAttribute("order")) {
                b.fushi({
                    play: c.innerHTML,
                    money: c.getAttribute("money"),
                    orderId: c.getAttribute("order"),
                    combs: c.getAttribute("combs"),
                    comb: c.getAttribute("comb"),
                    sys: c.getAttribute("sys")
                })
            }
        }
        if (d.type == "change" && c.id == "selectPlay") {
            b.callBack({})
        }
    });
    $("#status").delegate("tbody tr", "mouseenter mouseleave", function (d) {
        var c = d.target;
        if (d.type === "mouseenter") {
            this.className = "bc"
        }
        if (d.type === "mouseleave") {
            this.className = ""
        }
    });
    $("#select_sys").bind("changesys", function () {
        var c = P.Set.systype;
        switch (c) {
            case "nc":
                $("#selectPlay").show().html($("#selectPlay_nc").val());
                break;
            case "klc":
                $("#selectPlay").show().html($("#selectPlay_klc").val());
                break;
            case "pk10":
            case "ssc":
                $("#selectPlay").hide();
                break
        }
    })
}
;
P.Mod.status.prototype.fushi = function (f) {
    if (this.al) {
        return
    }
    var c = $(".play-title").text();
    if (c != "") {
        return false
    }
    var g = this
        , b = $("#play_detail").val()
        , d = "";
    g.al = $.UT.Alert({
        title: "玩法明细",
        text: b.replace("{play}", f.play).replace("{combs}", f.combs).replace("{money}", f.money).replace("{detail}", d),
        booLean: false,
        width: "659",
        height: 431,
        cancelCallback: function () {
            delete g.al
        }
    });
    var a = P.Set.systype == "klc" ? "lianma" : "lianma_nc";
    $.UT.publicGetAction("status", {
        orderId: f.orderId,
        platform: f.sys
    }, function (j) {
        if (g.al) {
            var h = j.length;
            for (var k = 0; k < h; k++) {
                var i = "";
                if (!(k % 6)) {
                    i = 'style="border-left:1px solid #CDCDCD"'
                }
                d += "<div " + i + "><em>" + j[k][0] + "</em><br/>" + j[k][1] + "<br />(" + j[k][2] + ")<br/><span>" + j[k][3] + "</span></div>"
            }
            $(".play-detail").html(d.toString().keyComment())
        }
    }, "lianma")
}
;
P.Mod.status.prototype.callBack = function (b) {
    var d = $("#status").data("Module"), c, a = {};
    a.st = d.st = b.radio ? {
        su: "2",
        lo: "0"
    }[b.radio] : d.st;
    d.flag = b.index = b.index >= 0 ? b.index : d.flag;
    if (!b.pager) {
        b.pager = "1"
    }
    a.gameId = $("#selectPlay").val();
    a.platform = P.Set.systype;
    if (a.platform != "klc" && a.platform != "nc") {
        a.gameId = "allplay"
    }
    d.pager = a.pager = b.pager;
    P.Utl.publicChengeModule(d.dom, "ajax", "status", "get_html", "get_json", a, null, null, {
        romances: true
    })
}
;
P.Mod.status.prototype.setData = function (a) {
}
;
P.Mod.status.prototype.unbind = function () {
    $("#selectPlay").show().html($("#selectPlay_klc").val())
}
;
P.Mod.infop = function (a) {
    $.UT.HoverList({
        container: a,
        el: "td"
    })
}
;
P.Mod.result_klc = function (a) {
    this.dom = a;
    var b = this;
    $("#ball_btn", a).bind("click", function (d) {
        $("#rusult_md_cs").hide();
        var f = ""
            , c = $("#rusult_md_cs").val();
        f = "ball_" + c;
        if (!b.dialog) {
            b.dialog = $("#ball_loader").Widget("Dialog", {
                mask: false
            })
        } else {
            b.dialog.close();
            $("#rusult_md_cs").hide()
        }
        P.Utl.publicChengeModule("ball_loader");
        P.Utl.publicChengeModule("ball_loader", "ajax", f, "get_html", "get_json");
        $()
    });
    $.UT.Pager({
        dom: ".pager",
        callBack: this.callBack
    });
    $("#dateName", a).dateBox({
        onClose: function (c) {
            $("#dateName").val(c);
            if (!jQuery.trim($("#dateName").val())) {
                $.UT.Alert({
                    text: "请填写正确的日期格式",
                    booLean: false
                });
                return
            }
            b.callBack({
                date: c
            })
        }
    });
    a.delegate("tbody tr", "mouseenter mouseleave", function (d) {
        var c = d.target;
        if (d.type === "mouseenter") {
            this.className = "bc"
        }
        if (d.type === "mouseleave") {
            this.className = ""
        }
    });
    $("#rusult_md_cs").bind("change", function () {
        var c = this.value
            , d = "rightLoader";
        P.Utl.publicChengeModule(d, "ajax", "result_" + c, "get_html", "get_json", null, null, null, {
            romances: true
        })
    })
}
;
P.Mod.result_klc.prototype = {
    callBack: function (g) {
        var i = ""
            , c = $("#rusult_md_cs").val();
        i = "result_" + c;
        var j = $("#" + i).data("Module")
            , f = g;
        if (!P.Set.reE.test(f.date)) {
            $.UT.Alert({
                text: "请填写有效的日期格式",
                booLean: false
            });
            return
        }
        var h = P.Set.tt
            , a = f.date.split("-")
            , b = +new Date(a[0], a[1] - 1, a[2]);
        if (b > h) {
            $.UT.Alert({
                text: "输入时间不能超过今天!",
                booLean: false
            });
            return
        }
        P.Utl.publicChengeModule("rightLoader", "ajax", i, "get_html", "get_json", f, null, null, {
            romances: true
        })
    },
    unbind: function () {
        $("#dateName", this.dom).val("");
        $("#result_tb", this.dom).empty();
        if (this.dialog) {
            this.dialog.close()
        }
        $("#rusult_md_cs").val("klc")
    }
};
P.Mod.ball_klc = function (b) {
    var a = ""
        , c = b[0].id;
    this.id = c;
    a = "_" + c.split("_")[1];
    this.result = $("#result" + a).data("Module");
    this.dialog = this.result.dialog;
    this.pager = 1;
    this.dom = b;
    this.rebind();
    this.closeStatus = 1
}
;
P.Mod.ball_klc.prototype = {
    setData: function (c) {
        var l = c.result
            , g = this
            , i = ""
            , k = c.resultpk || []
            , b = this.id;
        i = "_" + b.split("_")[1];
        if (b == "ball_pk10") {
            $("#min").data("startDate", c.startDate);
            $("#min").data("endDate", c.endDate);
            $("#ball_list_pk10 ul").hide();
            this.id == "min" ? $(".pk1to5").show() : $(".pk6to10").show()
        }
        $("#start_date" + i).val(c.startDate);
        $("#end_date" + i).val(c.endDate);
        g.limitDate = parseInt(c.limitDate);
        var j = parseInt(c.pager.total, 10)
            , h = parseInt(c.pager.current, 10);
        var d = document.createDocumentFragment();
        for (var a = 0; a < l.length; a++) {
            d.appendChild(g.createT(l[a], "pk1to5"))
        }
        for (var a = 0; a < k.length; a++) {
            d.appendChild(g.createT(k[a], "pk6to10"))
        }
        $("#ball_list" + i).append(d);
        this.dialog.open();
        if (j == h) {
            $("#get_more" + i).hide()
        }
        if (b == "ball_pk10") {
            $("#ball_list_pk10 ul").hide();
            this.type == "min" ? $(".pk1to5").show() : $(".pk6to10").show()
        }
    },
    callBack: function (d) {
        var g = this
            , j = ""
            , a = this.id;
        j = "_" + a.split("_")[1];
        var h = $("#start_date" + j).val()
            , f = $("#end_date" + j).val()
            , i = false;
        var b = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
            , m = P.Set.reE;
        if (!m.test(h) || !m.test(f)) {
            $.UT.Alert({
                text: "请填写有效的日期格式",
                booLean: false
            });
            return
        }
        if (!b.test(h) || !b.test(f)) {
            $.UT.Alert({
                text: "请填写正确的 开始日期格式",
                booLean: false
            });
            return false
        }
        var l = new Date(h.replace(/-/g, "/"));
        var k = new Date(f.replace(/-/g, "/"));
        if (Date.parse(k) - Date.parse(l) < 0) {
            $.UT.Alert({
                text: "开始日期不能大于结束日期",
                booLean: false
            });
            return false
        }
        if (Date.parse(k) - Date.parse(l) > g.limitDate * 24 * 3600 * 1000) {
            $.UT.Alert({
                text: "开始日期与结束日期的间隔不能超过" + g.limitDate + "天",
                booLean: false
            });
            return false
        }
        if (d.pager) {
            g.pager += d.pager
        }
        if (d.search) {
            g.pager = 1;
            document.getElementById("ball_list" + j).innerHTML = "";
            g.type = "min"
        }
        G.GlobalLoading.open("", "", "", {
            top: 100,
            left: 100
        });
        var c = {
            startDate: h,
            endDate: f,
            pager: g.pager
        };
        $.UT.GetActionData({
            module: g.dom[0].id,
            action: "get_json",
            post: c,
            globalLoading: true,
            globalLoadingMask: false,
            globalLoadingDom: g.dom[0],
            successCallback: function (n) {
                if (!g.closeStatus) {
                    g.setData(n)
                }
                if (j == "_pk10") {
                    P.Mod.ball_pk10.prototype.unbind()
                }
                document.getElementById("ball_list" + j).scrollTop = "10000000"
            }
        })
    },
    createT: function (f) {
        var a = document.createElement("ul")
            , b = document.createElement("li")
            , d = document.createElement("li");
        b.innerHTML = f[0].toString().keyComment();
        d.innerHTML = f[1].replace("20", '<i class="red">20</i>').replace("19", '<i class="red">19</i>').toString().keyComment();
        b.className = "ball-1";
        d.className = "ball-2";
        a.appendChild(b);
        a.appendChild(d);
        for (var h = 2; h < 22; h++) {
            var g = document.createElement("li");
            if (typeof f[h] === "string") {
                g.innerHTML = "<span class='number num" + parseInt(f[h].toString().keyComment(), 10) + "'></span>"
            } else {
                g.innerHTML = f[h].toString().keyComment()
            }
            a.appendChild(g)
        }
        try {
            return a
        } finally {
            a = null
        }
    },
    rebind: function () {
        var d = this;
        var b = ""
            , c = this.dom[0].id;
        b = "_" + c.split("_")[1];
        var a = this.dom;
        a.bind("open", function (i, h) {
            var g = $(i.currentTarget).parents(".g-dialog-win");
            var f = parseInt(g.css("top"), 10);
            $("#get_more" + b).show();
            if (!f || f < 0) {
                g.css("top", "20px")
            }
            d.closeStatus = 0
        });
        a.bind("close", function (g, f) {
            d.pager = 1;
            $(a).unbind();
            $(a).removeData("Module");
            $("#ball_list" + b).html("");
            $("#rusult_md_cs").show();
            d.closeStatus = 1
        });
        a.bind("click", function (g) {
            var f = g.target;
            if (g.type == "click") {
                if (f.id == "get_more" + b) {
                    d.callBack({
                        pager: 1
                    })
                }
                if (f.id == "cancel" + b) {
                    d.dialog.close()
                }
                if (f.id == "s_ball" + b) {
                    $("#get_more" + b).show();
                    d.callBack({
                        search: true
                    })
                }
                if (f.id == "start_date" + b || f.id == "end_date" + b) {
                    setTimeout(function () {
                        $(".boxDay").css("zIndex", 9999999999)
                    }, 200)
                }
            }
        });
        $("#start_date" + b + ",#end_date" + b, a).dateBox({
            onClose: function (f) {
                if (!P.Set.reE.test(f)) {
                    $.UT.Alert({
                        text: "请填写有效的日期格式",
                        booLean: false
                    });
                    return
                }
            }
        });
        $("input:text", a).removeAttr("disabled").css({
            background: "white",
            border: "1px solid #BBBCC0"
        })
    }
};
P.Mod.result_ssc = function (a) {
    P.Mod.result_klc.call(this, a)
}
;
P.Mod.result_ssc.prototype = {
    callBack: function (a) {
        P.Mod.result_klc.prototype.callBack.call(this, a)
    },
    unbind: function () {
        var a = this;
        $("#dateName", a.dom).val("");
        $("#result_tb", a.dom).empty();
        if (a.dialog) {
            a.dialog.close()
        }
        $("#rusult_md_cs").val("ssc")
    }
};
P.Mod.ball_ssc = function (a) {
    P.Mod.ball_klc.call(this, a)
}
;
P.Mod.ball_ssc.prototype = {
    setData: function (a) {
        P.Mod.ball_klc.prototype.setData.call(this, a)
    },
    callBack: function (a) {
        P.Mod.ball_klc.prototype.callBack.call(this, a)
    },
    createT: function (j, g) {
        var l = document.createElement("ul")
            , a = document.createElement("li")
            , k = document.createElement("li");
        l.className = g ? g : "";
        a.innerHTML = j[0].toString().keyComment();
        k.innerHTML = j[1].toString().keyComment();
        a.className = "ball-1";
        k.className = "ball-2";
        l.appendChild(a);
        l.appendChild(k);
        var b = $("#rusult_md_cs").val();
        var i = b == "ks" ? 5 : 7;
        for (var m = 2; m < i; m++) {
            var f = document.createElement("li"), h;
            if (b == "ks") {
                h = new Array(7)
            } else {
                h = new Array(11)
            }
            var p = h.join("<span></span>$").split("$")
                , d = b == "ssc" ? j[m] : parseInt(j[m], 10) - 1;
            if (b == "ks") {
                p[d] = "<span class='number num" + parseInt(j[m], 10) + "'></span>"
            } else {
                p[d] = "<span class='bc'>" + j[m] + "</span>"
            }
            f.innerHTML = p.join("").toString().keyComment();
            l.appendChild(f)
        }
        try {
            return l
        } finally {
            l = null
        }
    },
    rebind: function () {
        P.Mod.ball_klc.prototype.rebind.call(this)
    }
};
P.Mod.result_pk10 = function (a) {
    P.Mod.result_klc.call(this, a)
}
;
P.Mod.result_pk10.prototype = {
    callBack: function (a) {
        P.Mod.result_klc.prototype.callBack.call(this, a)
    },
    unbind: function () {
        $("#dateName", this.dom).val("");
        $("#result_tb", this.dom).empty();
        if (this.dialog) {
            this.dialog.close()
        }
        $("#rusult_md_cs").val("pk10")
    }
};
P.Mod.ball_pk10 = function (a) {
    P.Mod.ball_klc.call(this, a);
    var b = this;
    this.type = "min";
    $(".pk-ball").bind("click", function () {
        $(".pk-ball").removeClass("ball-on");
        $(this).addClass("ball-on");
        b.type = this.id;
        b.startDate = $("#min").data("startDate");
        b.endDate = $("#min").data("endDate");
        var c = this.id == "min" ? "<th class='ball-1'>期数</th><th class='ball-2'>日期</th><th>冠军</th><th>亚军</th><th>第三名</th><th>第四名</th><th>第五名</th>" : "<th class='ball-1'>期数</th><th class='ball-2'>日期</th><th>第六名</th><th>第七名</th><th>第八名</th><th>第九名</th><th>第十名</th>";
        $(".pk-b").html(c.toString().keyComment());
        $("#ball_list_pk10 ul").hide();
        this.id == "min" ? $(".pk1to5").show() : $(".pk6to10").show()
    })
}
;
P.Mod.ball_pk10.prototype = {
    setData: function (a) {
        P.Mod.ball_klc.prototype.setData.call(this, a)
    },
    callBack: function (a) {
        P.Mod.ball_klc.prototype.callBack.call(this, a)
    },
    createT: function (a, b) {
        return P.Mod.ball_ssc.prototype.createT.call(this, a, b)
    },
    unbind: function () {
        $(".pk-ball").removeClass("ball-on").eq(0).addClass("ball-on");
        $(".pk-b").html("<th class='ball-1'>期数</th><th class='ball-2'>日期</th><th>冠军</th><th>亚军</th><th>第三名</th><th>第四名</th><th>第五名</th>")
    },
    rebind: function () {
        P.Mod.ball_klc.prototype.rebind.call(this)
    }
};
P.Mod.result_nc = function (a) {
    P.Mod.result_klc.call(this, a)
}
;
P.Mod.result_nc.prototype = {
    callBack: function (a) {
        P.Mod.result_klc.prototype.callBack.call(this, a)
    },
    unbind: function () {
        $("#dateName", this.dom).val("");
        $("#result_tb", this.dom).empty();
        if (this.dialog) {
            this.dialog.close()
        }
        $("#rusult_md_cs").val("nc")
    }
};
P.Mod.ball_nc = function (a) {
    P.Mod.ball_klc.call(this, a)
}
;
P.Mod.ball_nc.prototype = {
    setData: function (a) {
        P.Mod.ball_klc.prototype.setData.call(this, a)
    },
    callBack: function (a) {
        P.Mod.ball_klc.prototype.callBack.call(this, a)
    },
    createT: function (g, d) {
        var j = document.createElement("ul")
            , a = document.createElement("li")
            , h = document.createElement("li");
        a.innerHTML = g[0].toString().keyComment();
        if (g[1]) {
            var l = g[1].split(",");
            var k = l.length;
            var n = "";
            for (var f = 0; f < k; f++) {
                n += "<span class='snumber snum" + parseInt(l[f], 10) + "'></span>"
            }
            h.innerHTML = n.toString().keyComment()
        }
        a.className = "ball-1";
        h.className = "ball-2";
        j.appendChild(a);
        j.appendChild(h);
        for (var m = 2; m < 22; m++) {
            var b = document.createElement("li");
            if (typeof g[m] === "string") {
                b.innerHTML = "<span class='snumber snum" + parseInt(g[m].toString().keyComment(), 10) + "'></span>"
            } else {
                b.innerHTML = g[m].toString().keyComment()
            }
            j.appendChild(b)
        }
        try {
            return j
        } finally {
            j = null
        }
    },
    rebind: function () {
        P.Mod.ball_klc.prototype.rebind.call(this)
    }
};
P.Mod.result_ks = function (a) {
    P.Mod.result_klc.call(this, a)
}
;
P.Mod.result_ks.prototype = {
    callBack: function (a) {
        P.Mod.result_klc.prototype.callBack.call(this, a)
    },
    unbind: function () {
        $("#dateName", this.dom).val("");
        $("#result_tb", this.dom).empty();
        if (this.dialog) {
            this.dialog.close()
        }
        $("#rusult_md_cs").val("ks")
    }
};
P.Mod.ball_ks = function (a) {
    P.Mod.ball_klc.call(this, a)
}
;
P.Mod.ball_ks.prototype = {
    setData: function (a) {
        P.Mod.ball_klc.prototype.setData.call(this, a)
    },
    callBack: function (a) {
        P.Mod.ball_klc.prototype.callBack.call(this, a)
    },
    createT: function (a, b) {
        return P.Mod.ball_ssc.prototype.createT.call(this, a, b)
    },
    rebind: function () {
        P.Mod.ball_klc.prototype.rebind.call(this)
    }
};
P.Mod.result_kb = function (a) {
    P.Mod.result_klc.call(this, a)
}
;
P.Mod.result_kb.prototype = {
    callBack: function (a) {
        P.Mod.result_klc.prototype.callBack.call(this, a)
    },
    unbind: function () {
        $("#dateName", this.dom).val("");
        $("#result_tb", this.dom).empty();
        if (this.dialog) {
            this.dialog.close()
        }
        $("#rusult_md_cs").val("kb")
    }
};
P.Mod.change_password = function (f) {
    var g = f[0].id;
    $("#s_password").html(P.Set.s_passwordMsg);
    var d = {
        rules: {
            voldpassword: {
                required: 1,
                regExp: /^[0-9a-zA-Z]{6,16}$/
            },
            vnewpassword: {
                required: 1,
                regExp: (/^(?![^a-z]+$)(?![^A-Z]+$)(?!\D+$)[a-zA-Z0-9]{8,12}$/),
                notEqualTo: "voldpassword"
            },
            vrenewpassword: {
                required: 1,
                regExp: (/^(?![^a-z]+$)(?![^A-Z]+$)(?!\D+$)[a-zA-Z0-9]{8,12}$/),
                equalTo: "vnewpassword"
            }
        },
        onblur: false,
        errorMessages: {
            voldpassword: {
                required: "请输入原始密码！",
                regExp: "密碼長度為8-12位，必須包含大小寫字母和數字."
            },
            vnewpassword: {
                required: "请输入新密码！",
                regExp: "密碼長度為8-12位，必須包含大小寫字母和數字.",
                notEqualTo: "新密码不能和原始密码相同！"
            },
            vrenewpassword: {
                required: "请输入确认新密码！",
                regExp: "密碼長度為8-12位，必須包含大小寫字母和數字.",
                equalTo: "新密码与确认密码须一致！"
            }
        }
    };
    if (P.Set.pwvalidatorType == 0) {
        $("#newpwnotice").hide();
        d.rules.vnewpassword.regExp = d.rules.voldpassword.regExp;
        d.rules.vrenewpassword.regExp = d.rules.voldpassword.regExp;
        d.errorMessages.vnewpassword.regExp = d.errorMessages.voldpassword.regExp;
        d.errorMessages.vrenewpassword.regExp = d.errorMessages.voldpassword.regExp
    }
    var a = f.Widget("SimpleValidator", d);
    if (P.Set.pwvalidatorType != 0) {
        a.options.rules.voldpassword.regExpTxt = P.Set.keyCodeReg;
        a.options.rules.vnewpassword.regExpTxt = P.Set.keyCodeReg;
        a.options.rules.vrenewpassword.regExpTxt = P.Set.keyCodeReg;
        a.options.errorMessages.voldpassword.regExpTxt = P.Set.keyerrMsg;
        a.options.errorMessages.vnewpassword.regExpTxt = P.Set.keyerrMsg;
        a.options.errorMessages.vrenewpassword.regExpTxt = P.Set.keyerrMsg
    }
    $("#oldpassword").focus();
    var b = function (j) {
        var h = a.verifyForm();
        if (h == true) {
            var i = {};
            i.oldpassword = $("#oldpassword").val();
            i.newpassword = $("#newpassword").val();
            i.renewpassword = $("#renewpassword").val();
            i.login_name = $("#login_name").val();
            if (P.Set.pwvalidatorType != 0) {
                if (P.Set.s_password.search(i.newpassword) != -1 || P.Set.s_password.search(i.renewpassword) != -1) {
                    $.UT.Alert({
                        booLean: false,
                        text: P.Set.s_passwordMsg
                    });
                    return
                }
            }
            $.UT.publicGetAction(g, i, null, null, function (l, m, k) {
                if (k == 2) {
                    $.UT.DefaultErrorCallback(l, m, k, function () {
                        if (P.Set.firstLogin) {
                            switch (P.Set.systype) {
                                case "ssc":
                                    P.Set.moduleNav = 10;
                                    P.Set.navNumber = P.Set.navNumber_ssc;
                                    break;
                                case "klc":
                                    P.Set.moduleNav = 1;
                                    P.Set.navNumber = P.Set.navNumber_klc;
                                    break;
                                case "pk10":
                                    P.Set.moduleNav = 14;
                                    P.Set.navNumber = P.Set.navNumber_pk10;
                                    break;
                                case "nc":
                                    P.Set.moduleNav = 18;
                                    P.Set.navNumber = P.Set.navNumber_nc;
                                    break;
                                case "ks":
                                    P.Set.moduleNav = 22;
                                    P.Set.navNumber = P.Set.navNumber_ks;
                                    break;
                                case "kb":
                                    P.Set.moduleNav = 26;
                                    P.Set.navNumber = P.Set.navNumber_kb;
                                    break
                            }
                            P.Utl.setLayout(P.Set.moduleNav);
                            $("html").css("padding", "60px 0px 0px 240px");
                            $("#header").show();
                            var n = location.pathname;
                            var p = "/" + n.split("/")[1] + "/"
                                , r = $.UT.Cookie("sysinfo") || ""
                                , q = r.split("|");
                            q[1] = 1;
                            $.UT.Cookie("sysinfo", q.join("|"), {
                                path: p
                            });
                            if (m.pa) {
                                P.Set.pa = m.pa
                            }
                            if (m.ui) {
                                P.Set.ui = m.ui
                            }
                            if (m.pw) {
                                P.Set.pw = m.pw
                            }
                        }
                        $(".floor").show();
                        P.Set.firstLogin = 0
                    }, null, false);
                    $("#change_password .amount-input").val("")
                } else {
                    $.UT.DefaultErrorCallback(l, m, k)
                }
            })
        } else {
            return false
        }
    };
    var c;
    if (P.Set.firstLogin === 1) {
        $("html").css("padding", "0px");
        $("#reset", f).html("取消");
        c = function () {
            var h = $("#logout").attr("href");
            window.location.href = h;
            return false
        }
    } else {
        $("#reset", f).html("重置");
        c = function () {
            $("#oldpassword").val("");
            $("#newpassword").val("");
            $("#renewpassword").val("");
            $(".g-vd-s-error").removeClass("g-vd-s-error")
        }
    }
    $(f).bind("keypress", function (h) {
        if (13 === h.keyCode && h.target.id !== "reset") {
            $("#submit").click()
        }
    });
    $(f).bind("click", function (i) {
        var h = i.target
            , j = h.id;
        if (j == "reset") {
            c()
        }
        if (j == "submit") {
            b(i)
        }
    });
    P.Utl.getPasswords()
}
;
P.Mod.change_password.prototype.unbind = function () {
    $("#change_password input").val("");
    $("#header a[nav=changePassword]").closest("span").removeClass("on")
}
;
P.Mod.protocol = function (f) {
    var b = $("#header").data("Module").alertbox;
    $("html").css("padding", "0px");
    var d = function (k) {
        if (k.type === "click" || k.keyCode == 13) {
            var g = location.pathname
                , h = "/" + g.split("/")[1] + "/"
                , j = $.UT.Cookie("sysinfo") || ""
                , i = j.split("|");
            if (P.Set.firstLogin == 0) {
                $("html").css("padding", "60px 0px 0px 240px");
                $("#header").show();
                i[1] = 1;
                $.UT.Cookie("sysinfo", i.join("|"), {
                    path: h
                });
                switch (P.Set.systype) {
                    case "ssc":
                        P.Set.moduleNav = 10;
                        P.Set.navNumber = P.Set.navNumber_ssc;
                        break;
                    case "klc":
                        P.Set.moduleNav = 1;
                        P.Set.navNumber = P.Set.navNumber_klc;
                        break;
                    case "pk10":
                        P.Set.moduleNav = 14;
                        P.Set.navNumber = P.Set.navNumber_pk10;
                        break;
                    case "nc":
                        P.Set.moduleNav = 18;
                        P.Set.navNumber = P.Set.navNumber_nc;
                        break;
                    case "ks":
                        P.Set.moduleNav = 22;
                        P.Set.navNumber = P.Set.navNumber_ks;
                        break;
                    case "kb":
                        P.Set.moduleNav = 26;
                        P.Set.navNumber = P.Set.navNumber_kb;
                        break
                }
            } else {
                i[1] = 2;
                $.UT.Cookie("sysinfo", i.join("|"), {
                    path: h
                });
                P.Set.moduleNav = parseInt(document.body.getAttribute("navNum"), 10);
                if (P.Set.firstLogin == 2) {
                    $.UT.Alert({
                        booLean: false,
                        text: "您长时间没修改密码，为安全起见，请设定新密码！"
                    })
                }
            }
        }
        P.Utl.setLayout(P.Set.moduleNav);
        return false
    };
    if (!b) {
        $("#agree").focus()
    }
    function c() {
        if (b) {
            b.close()
        }
        $("#agree").focus()
    }

    $(document).bind("keydown", c);
    function a(g) {
        if (g.keyCode == 13) {
            $("#agree").click()
        }
    }

    $("#agree").one("keydown", a).one("click", d)
}
;
P.Mod.lineSelect = function (d) {
    var f = this;
    if (document.getElementById("lineSelectBox").style.display == "block") {
        return false
    }
    if (P.Set.lines) {
        var a = P.Set.lines
            , b = "";
        if (a.length > 0) {
            for (var c = 0; c < a.length; c++) {
                b += '<tr><td  width="20%" height="28"><div class="t blueness">线路' + (c + 1) + ':&nbsp;</div></td><td><div class="form"><span style="color:#000;border:1px solid #ccc;width:160px;text-align:left;line-height: 15px;height:15px;float: left;margin-right: 10px;" class="timebox">反应时间:</span><input type="button" line="' + a[c] + '" value="选择"  style="float:left;width:40px" class="yellow-btn btn_m elem_btn" /></div></td></tr>'
            }
            $("#lines", "#lineSelectBox").html(b.toString().keyComment())
        } else {
            $("#lines", "#lineSelectBox").html("")
        }
    }
    setTimeout(function () {
        f.cacheImg();
        f.test(0)
    }, 0);
    $("#lineSelectBox").bind("click", function (i) {
        var g = $(i.target);
        if (g[0].nodeName == "INPUT") {
            var h = g.attr("line") + "?" + $.UT.Param($.UT.Cookie()) + "&navNum=" + P.Set.navNum + "&portty=" + P.Set.porttype;
            window.location.href = h
        }
        if (g[0].id == "lineTestSudu" && !g.attr("disabled")) {
            f.cacheImg();
            f.test(0)
        }
    });
    this.li,
        this.st,
        this.count = 0,
        this.btn = document.getElementById("lineTestSudu"),
        this.speed = document.getElementById("speed");
    this.cache = [],
        this.timeout = null;
    P.Mod.lineSelect.prototype.getLoad = function (k, q) {
        var i = new Date().getTime()
            , m = parseInt(q, 10)
            , g = k.cache[m]
            , h = g.number ? i - k.cache[m].time : i - k.cache[m].time
            , p = 0;
        k.cache[m].loadTime.push(h);
        k.cache[m].number += 1;
        if (k.cache[m].stop) {
            return
        }
        if (k.cache[m].number < 2) {
            setTimeout(function () {
                k.test(m)
            }, 500)
        } else {
            for (var n = 0; n < 2; n++) {
                p += g.loadTime[n]
            }
            var l = (p / 2).toFixed(2)
                , j = document.getElementById(m + "m");
            if (l > 50) {
                j.style.color = "red"
            } else {
                j.style.color = "green"
            }
            j.innerHTML = l + "毫秒";
            P.Utl.timsList.push([P.Set.lines[m].split("//")[1].split("/")[0], l]);
            k.count -= 1;
            k.cache[m].number = 0;
            k.cache[m].loadTime.length = 0;
            k.cache[m].stop = true;
            setTimeout(function () {
                k.test(m + 1)
            }, 500)
        }
    }
}
;
P.Mod.lineSelect.prototype.cacheImg = function () {
    var f = this;
    this.li = $(".form", "#lineSelectBox");
    var f = this;
    var d = "";
    for (var b = 0; b < this.li.length; b++) {
        var a = {};
        d = b + "";
        a.img = document.createElement("img");
        a.url = $("input", this.li[b]).attr("line").split("/").slice(0, 3).join("/") + "/speed.gif?";
        a.time = 0;
        a.number = 0;
        a.img.onerror = function (g) {
            f.getError(g, f)
        }
        ;
        a.img.onload = function (c) {
            f.getLoad(f, this.id)
        }
        ;
        a.img.id = d;
        a.loadTime = [];
        a.stop = false;
        this.cache[b] = a
    }
}
;
P.Mod.lineSelect.prototype.clear = function (b) {
    clearTimeout(this.timeout);
    this.li = $(".form", "#lineSelectBox");
    this.timeout = null;
    if (!b) {
        for (var a = this.li.length - 1; a >= 0; a--) {
            if ($("font", this.li[a]).length) {
                $("font", this.li[a])[0].innerHTML = ""
            }
        }
    }
}
;
P.Mod.lineSelect.prototype.test = function (d) {
    this.clear(d);
    var b = this;
    this.li = $(".form", "#lineSelectBox");
    this.btn.setAttribute("disabled", "disabled");
    $(this.btn).removeClass("yellow-btn btn_m elem_btn");
    var a = "";
    if (this.cache.length > 0 && this.cache[d]) {
        if ($(".timebox font", this.li[d]).length > 0) {
            $(".timebox font", this.li[d])[0].innerHTML = "测速中";
            $(".timebox font", this.li[d])[0].id = d + "m"
        } else {
            $(".timebox", this.li[d]).append('<font id="' + d + 'm">测速中</font>');
            this.speed.appendChild(this.cache[d].img)
        }
        this.cache[d].img.src = this.cache[d].url + (Math.random() + "").replace("0.", "");
        this.cache[d].time = new Date().getTime();
        this.cache[d].stop = false;
        this.timeout = setTimeout(function () {
            b.getError.call(b.cache[d].img, d, b)
        }, 5000)
    } else {
        this.btn.removeAttribute("disabled");
        $(this.btn).addClass("yellow-btn btn_m elem_btn")
    }
}
;
P.Mod.lineSelect.prototype.getError = function (d, b) {
    var a = this.id;
    if (typeof d === "number") {
        a = d
    }
    a = parseInt(a, 10);
    if (document.getElementById(b.id + "m")) {
        if (!b.cache[parseInt(a, 10)].stop) {
            b.cache[parseInt(a, 10)].number = 0;
            b.cache[parseInt(a, 10)].stop = true;
            if (document.getElementById(a + "m").innerHTML != "超时" || document.getElementById(a + "m").innerHTML == "测速中") {
                document.getElementById(a + "m").innerHTML = "无法连接";
                P.Utl.timsList.push([P.Set.lines[a].split("//")[1].split("/")[0], -1])
            }
        }
        setTimeout(function () {
            test(a + 1)
        }, 500)
    }
}
;
P.Mod.bothSides_pk10 = function (a) {
    P.Utl.navChange_page(a[0].id);
    P.Mod.moduleklc.call(this, a, "sub_nav_pk10")
}
;
P.Mod.bothSides_pk10.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.bothSides_pk10.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides_pk10.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.bothSides_pk10.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.sub_nav_pk10 = function (a) {
    P.Mod.sub_navklc.call(this, a, "_pk10", 10000)
}
;
P.Mod.sub_nav_pk10.prototype.BindData = function (a) {
    P.Mod.sBindDataklc.call(this, a, "#bothSides_pk10,#ballNO15,#ballNO60,#sumDT_pk10", 10, 290, 170)
}
;
P.Mod.sub_nav_pk10.prototype.unbind = function () {
    P.Mod.sub_nav.prototype.unbind.call(this)
}
;
P.Mod.sumDT_pk10 = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav_pk10")
}
;
P.Mod.sumDT_pk10.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.sumDT_pk10.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.sumDT_pk10.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.sumDT_pk10.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.ballNO15 = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav_pk10")
}
;
P.Mod.ballNO15.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.ballNO15.prototype.rebind = function () {
    P.Mod.klcrebind(this)
}
;
P.Mod.ballNO15.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.ballNO15.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.ballNO60 = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav_pk10")
}
;
P.Mod.ballNO60.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.ballNO60.prototype.rebind = function () {
    P.Mod.klcrebind(this)
}
;
P.Mod.ballNO60.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.ballNO60.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.bothSides_nc = function (a) {
    P.Utl.navChange_page(a[0].id);
    P.Mod.moduleklc.call(this, a, "sub_nav")
}
;
P.Mod.bothSides_nc.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides_nc.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.bothSides_nc.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.bothSides_nc.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.ballNO_nc = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav")
}
;
P.Mod.ballNO_nc.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $("td[number]").removeData().html("");
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.ballNO_nc.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.ballNO_nc.prototype.setData = function (p) {
    var m = +new Date();
    var r = this;
    var d = document.getElementById(r.id);
    if (!d) {
        return
    }
    if (this.moduleFirstLogin) {
        this.moduleFirstLogin();
        this.moduleFirstLogin = null
    }
    var g = $(".elem_groupFilter .on").attr("subnav");
    if (g != p.play) {
        return
    }
    if (p.drawStatus !== r.drawStatus) {
        r.drawStatus = p.drawStatus;
        if (p.drawStatus === "1") {
            r.kgPan("open")
        } else {
            $("#selectNote").hide()
        }
    }
    r.user_status = p.user_status;
    r.side_left = $("#side_left").data("Module");
    P.Mod.bindsub_navdata(p, r);
    if (p.play) {
        r.rfresh.data.play = p.play;
        var b = parseInt(p.play.slice(-1)) - 1;
        var x = ["第一球", "第二球", "第三球", "第四球", "第五球", "第六球", "第七球", "第八球", "第九球"][b];
        if (b < 4) {
            $("#longhu_ball").show()
        } else {
            $("#longhu_ball").hide()
        }
        var v = document.getElementById("firstball");
        if (v) {
            v.setAttribute("cat", "0" + b);
            v.setAttribute("play", p.play);
            v.innerHTML = x.toString().keyComment()
        }
        r.rfresh.data.ball = "0" + b;
        r.rfresh.data.cat = $(".kon").attr("cat")
    }
    r.tr = $(".touzhuArea tbody tr");
    if (r.drawStatus == 1) {
        if (p.integrate) {
            var l = p.integrate;
            $.each(l, function (D, a) {
                var F = D.slice(3, 5)
                    , B = $(r.tdcache["c" + F]);
                if (B && B[0] && B[0].cellIndex) {
                    var z = B[0]
                        , H = z.cellIndex
                } else {
                    return
                }
                var I = z.parentNode
                    , E = I.cells[H + 1]
                    , A = I.cells[H - 1];
                if (B) {
                    var C = E.getElementsByTagName("input")[0];
                    if (a == "-") {
                        B.removeData();
                        B.addClass("huiseBg");
                        B[0].innerHTML = a;
                        B[0].style.color = "red";
                        $(z).addClass("huiseBg");
                        $(A).addClass("huiseBg");
                        E.className = "amount huiseBg";
                        C.setAttribute("disabled", "disabled");
                        C.value = ""
                    } else {
                        if (B.hasClass("huiseBg")) {
                            B[0].className = B[0].className.replace("huiseBg", "");
                            $(A).removeClass("huiseBg");
                            E.className = "amount"
                        }
                        if (r.user_status == "2") {
                            C.setAttribute("disabled", "disabled")
                        } else {
                            if (C.getAttribute("disabled")) {
                                C.removeAttribute("disabled")
                            }
                        }
                        if (z.innerHTML != a || a == 0) {
                            if (z.innerHTML == "" || z.innerHTML == "-") {
                                z.style.color = "#f00"
                            } else {
                                if (a != "0" || z.innerHTML != "0") {
                                    P.Utl.changeColor(B, a)
                                }
                            }
                            z.innerHTML = a
                        }
                    }
                    B[0].setAttribute("playType", D.slice(0, 3))
                }
                var y = $(r.tdcache["k" + F]);
                var k = y.prev();
                if (y) {
                    if (a == "-") {
                        y.removeData().addClass("huiseBg");
                        y[0].innerHTML = a;
                        y[0].style.color = "red";
                        k.addClass("huiseBg")
                    } else {
                        if (y.hasClass("huiseBg")) {
                            y[0].className = y[0].className.replace("huiseBg", "");
                            k[0].className = k[0].className.replace("huiseBg", "")
                        }
                        if (r.user_status == "2") {
                            y[0].className = y[0].className.replace("onBg", "");
                            k[0].className = k[0].className.replace("onBg", "")
                        }
                        var z = y[0];
                        if (z.innerHTML != a || a == 0) {
                            if (z.innerHTML == "" || z.innerHTML == "-") {
                                z.style.color = "#f00"
                            } else {
                                if (a != "0" || z.innerHTML != "0") {
                                    P.Utl.changeColor(y, a)
                                }
                            }
                            z.innerHTML = a
                        }
                    }
                    y[0].setAttribute("playType", D.slice(0, 3))
                }
            })
        } else {
            $("td[number]").html("")
        }
    } else {
        r.kgPan("close")
    }
    if (p.rate && p.rate.length > 0) {
        var h = $("#rate")[0];
        if (h) {
            var q = h.rows.length
                , f = h.rows[q - 2]
                , c = h.rows[q - 1]
                , j = f.cells.length
                , t = p.rate;
            for (var n = 0; n < j; n++) {
                if (t[n]) {
                    f.cells[n + 1].innerHTML = parseInt(t[n][0], 10) > 3 ? "<span class='red fontweight'>" + t[n][0] + "</span>" : t[n][0];
                    c.cells[n + 1].innerHTML = parseInt(t[n][1], 10) > 3 ? "<span class='red fontweight'>" + t[n][1] + "</span>" : t[n][1]
                }
            }
        }
    }
    this.autoRefreshspan.show();
    p = null;
    delete p;
    for (var w in r) {
        r.a = null;
        delete r.a
    }
    r = null;
    delete r
}
;
P.Mod.ballNO_nc.prototype.kgPan = function (a) {
    var b = $("input:text")
        , d = $(".touzhuArea td")
        , c = $("td[number]");
    if (a == "open") {
        d.removeClass("huiseBg");
        b.removeAttr("disabled")
    } else {
        if (a == "close") {
            c.html("").removeData();
            d.addClass("huiseBg");
            $(".kuaijie td").removeClass("onBg");
            b.attr("disabled", "disabled").filter(".amount-input").val("");
            $(".bulk-amount-times").hide();
            P.Set.number = 0
        }
    }
}
;
P.Mod.ballNO_nc.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.sumDT_nc = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav")
}
;
P.Mod.sumDT_nc.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.sumDT_nc.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.sumDT_nc.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.sumDT_nc.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.evenCode_nc = function (d) {
    this.dom = d;
    var f = this;
    this.table = $(".touzhuArea", f.dom);
    this.id = d[0].id;
    this.checkbox = $(".touzhuArea input");
    this.sub_nav = $("#sub_nav").data("Module");
    if (!P.Set.beishu) {
        $(".elem_multiple").css("visibility", "hidden")
    } else {
        P.Utl.bei(d)
    }
    var b = {
        urlId: f.id,
        data: {
            action: "ajax",
            play: "evenCode_nc"
        },
        action: "get_json",
        callback: function (g) {
            f.setData(g)
        }
    };
    d.bind("resultnum", function (g) {
        if (f.rfresh) {
            f.rfresh.intervalfun(0)
        }
    });
    this.autoRefreshspan = $("#autoRefreshspan1", f.dom);
    if (!this.rfresh) {
        f.rfresh = this.autoRefreshspan.Widget("AutoRefresh", b)
    }
    this.submitBtn = document.getElementById("submit");
    if (f.submitBtn) {
        P.Utl.keydown(f.dom, this.id, P.Utl.submit)
    }
    P.Utl.minNav(this.id);
    P.Utl.checked(d);
    var c = function (i) {
        var g = this.cellIndex
            , h = g % 2 == 0 ? $("input", $(this).next())[0] : $("input", $(this))[0];
        h.click()
    };
    $("td", f.table).bind("click", c);
    P.Utl.countBack(f.id, "rfresh");
    var a = function (k) {
        if (f.blur != null) {
            f.blur.focus();
            f.blur = null
        }
        var g = k.target;
        if (f.drawStatus == "1") {
            if (f.user_status == "1") {
                var j = $(".kon span").html();
                if (j == "-") {
                    return
                }
                if (g.id == "submit") {
                    var h = P.Utl.submit(f.dom, f.id);
                    if (h) {
                        var i = $("#side_left").data("Module");
                        i.bindSubObj(h)
                    }
                }
                if (g.id == "reset") {
                    f.reset()
                }
            } else {
                $("input[type='checkbox']", f.dom).removeAttr("checked");
                $("span[name='determine']").focus();
                if ($(".requestData").text() != "") {
                    return false
                }
                $.UT.Alert({
                    booLean: false,
                    text: "账号被{#|505c|62bc#}（或者账号处于{#|505c|62bc#}状态），请联系管理员！"
                })
            }
        }
    };
    $("input[type='checkbox']", f.dom).bind("click", a);
    $(".elem_amount", f.dom).bind("click", a);
    f.numCache = [];
    f.playType = "062";
    f.odds = "";
    P.Mod.sub_navklc.call(this, d, "");
    this.rebind();
    f.td = $(".touzhuArea tbody td")
}
;
P.Mod.evenCode_nc.prototype.rebind = function () {
    var b = this;
    b.reset();
    this.autoRefreshspan.show();
    var a = function (n) {
        b.uAction = 1;
        if (b.user_status == "2") {
            $("input[type='checkbox']", b.dom).removeAttr("checked");
            $("span[name='determine']").focus();
            if ($(".requestData").text() != "") {
                return false
            }
            $.UT.Alert({
                booLean: false,
                text: "账号被{#|505c|62bc#}（或者账号处于{#|505c|62bc#}状态），请联系管理员！"
            });
            return
        }
        var q = n.data;
        b.playType = $(".kon input").attr("playType");
        b.odds = $(".kon span").html();
        var c = false;
        if (b.playType != "064" && b.playType != "067") {
            c = true
        }
        if (c) {
            if (this.checked == true) {
                if (b.numCache.length == 10) {
                    return
                }
                var d = this.getAttribute("number");
                b.numCache.push(d);
                var f = $(this.parentNode);
                f.prev().addClass("onBg");
                f.addClass("onBg")
            } else {
                var d = this.getAttribute("number");
                var m = $.inArray(d, b.numCache);
                if (m != -1) {
                    b.numCache.splice(m, 1);
                    $(".touzhuArea [checked=false]:checkbox").removeAttr("disabled");
                    var f = $(this.parentNode);
                    f.prev().removeClass("onBg");
                    f.removeClass("onBg")
                }
            }
            if (b.numCache.length == 10) {
                $(".touzhuArea input:not(:checked)").attr("disabled", "disabled")
            } else {
                $(".touzhuArea input:not(:checked)").removeAttr("disabled");
                if (b.playType == "060") {
                    $(".animal").attr("disabled", "disabled")
                } else {
                    if (b.playType == "061") {
                        $("input:not(:checked)", ".touzhuArea").attr("disabled", "disabled");
                        $(".animal").removeAttr("disabled")
                    }
                }
            }
            var j = parseInt($("td.kon").attr("name"));
            b.numCache.sort(function (p, i) {
                return p > i
            });
            var h = {
                max: j,
                arrrom: b.numCache
            };
            $("#selectedlist").html(b.numCache.join("&nbsp;").toString().keyComment());
            $(".elem_selected").show();
            $(".elem_selected_1").hide();
            $(".elem_selected_2").hide()
        } else {
            var k = b.numCache[0] instanceof Array
                , l = 0
                , g = ".lianma_f";
            if (k == false) {
                b.numCache = [[], [], []]
            }
            switch (n.data) {
                case "zhong":
                    l = 1;
                    g = ".lianma_zh";
                    break;
                case "hou":
                    l = 2;
                    g = ".lianma_h";
                    break
            }
            if (this.checked == true) {
                if (b.numCache[l].length == 10) {
                    return
                }
                var d = this.getAttribute("number");
                b.numCache[l].push(d);
                var f = $(this.parentNode);
                f.prev().addClass("onBg");
                f.addClass("onBg")
            } else {
                var d = this.getAttribute("number");
                var m = $.inArray(d, b.numCache[l]);
                if (m != -1) {
                    b.numCache[l].splice(m, 1);
                    $("[checked=false]:checkbox", g).removeAttr("disabled");
                    var f = $(this.parentNode);
                    f.prev().removeClass("onBg");
                    f.removeClass("onBg")
                }
            }
            if (b.numCache[l].length == 10) {
                $("input:not(:checked)", g).attr("disabled", "disabled")
            } else {
                $("input:not(:checked)", g).removeAttr("disabled")
            }
            var j = parseInt($("td.kon").attr("name"));
            b.numCache[l].sort(function (p, i) {
                return p > i
            });
            var h = {
                max: j,
                arrrom: b.numCache,
                type: b.playType
            };
            if (b.playType == "064") {
                $(".elem_selected_1").show();
                $("#selectedlist_m1").html(b.numCache[0].join("&nbsp;").toString().keyComment());
                $("#selectedlist_m2").html(b.numCache[2].join("&nbsp;").toString().keyComment())
            } else {
                $(".elem_selected_2").show();
                $("#selectedlist_n1").html(b.numCache[0].join("&nbsp;").toString().keyComment());
                $("#selectedlist_n2").html(b.numCache[1].join("&nbsp;").toString().keyComment());
                $("#selectedlist_n3").html(b.numCache[2].join("&nbsp;").toString().keyComment())
            }
        }
        b.numList = P.Utl.refreshNum(h);
        $(".selectedAmount").html(b.numList.length);
        if (n.stopPropagation) {
            n.stopPropagation()
        } else {
            n.cancelBubble = true
        }
    };
    $(".lianma_f input").bind("click", a);
    $(".lianma_zh input").bind("click", "zhong", a);
    $(".lianma_h input").bind("click", "hou", a);
    $.UT.HoverList_tzxc({
        container: ".touzhuArea",
        newClass: "bcd"
    });
    this.pageShow("062")
}
;
P.Mod.evenCode_nc.prototype.setData = function (f) {
    var i = this;
    var d = document.getElementById(this.id);
    if (!d) {
        return
    }
    i.side_left = $("#side_left").data("Module");
    if (f.integrate) {
        var g = f.integrate;
        $.each(g, function (a, l) {
            var k = $("span[odds=" + a.slice(0, 3) + "]");
            if (k && k[0]) {
                var j = k[0];
                if (l != j.innerHTML || l == 0) {
                    if (j.innerHTML == "" || j.innerHTML == "-") {
                        j.style.color = "#f00"
                    } else {
                        if (l != "0" || j.innerHTML != "0") {
                            P.Utl.changeColor(k, l)
                        }
                    }
                    j.innerHTML = l
                }
            }
        })
    }
    if (f.ballNumLimit) {
        i.ballNumLimit = parseInt(f.ballNumLimit)
    }
    i.drawStatus = f.drawStatus;
    i.user_status = f.user_status;
    P.Mod.bindsub_navdata(f, i);
    if (i.drawStatus == 1) {
        var h = $("td.kon span").html();
        if (h == "-") {
            i.reset();
            i.guanpan()
        } else {
            i.guanpan(true)
        }
    } else {
        i.guanpan();
        $(".bq-title span").html("")
    }
    var b = $(".elem_amount_input").prop("disabled");
    if (i.user_status != 2 && b) {
        $(".elem_amount_input").removeAttr("disabled")
    }
    for (var c in i) {
        i.a = null;
        delete i.a
    }
    i = null;
    delete i
}
;
P.Mod.evenCode_nc.prototype.unbind = function () {
    var b = this;
    b.rfresh.hide();
    b.playType = "062";
    b.odds = null;
    $("input", b.table).unbind();
    b.uAction = 0;
    $(".bq-title").eq(0).addClass("kon").siblings().removeClass("kon");
    $(".kon input").attr("checked", true);
    var a = function () {
        var c = $("input", $(this.parentNode).next())[0];
        c.click()
    };
    $(".number", b.table).bind("click", a);
    if (this.getResult) {
        this.getResult.hide()
    }
    P.Utl.yesheMoney.remember()
}
;
P.Mod.evenCode_nc.prototype.reset = function (a) {
    var c = this
        , b = $(".touzhuArea  input:checkbox", c.dom);
    $(".elem_selected").hide();
    c.numCache = [];
    c.numList = [];
    $(".huiseBg").removeClass("huiseBg");
    $(".onBg").removeClass("onBg");
    b.removeAttr("checked").removeAttr("disabled");
    if (this.playType == "060") {
        $(".animal").attr("disabled", "disabled")
    }
    if (this.playType == "061") {
        b.attr("disabled", "disabled");
        $(".animal").removeAttr("disabled")
    }
}
;
P.Mod.evenCode_nc.prototype.guanpan = function (a) {
    var f = this
        , d = $("input:radio", f.dom)
        , b = $(".touzhuArea input:checkbox", f.dom)
        , c = $("input:text", f.dom);
    if (a) {
        if (f.user_status == "2") {
            c.attr("disabled", "disabled")
        } else {
            if (f.uAction == 0) {
                c.removeAttr("disabled").css({
                    background: "#fff"
                });
                b.removeAttr("checked").removeAttr("disabled");
                if (this.playType == "060") {
                    $(".animal").attr("disabled", "disabled")
                }
                if (this.playType == "061") {
                    b.attr("disabled", "disabled");
                    $(".animal").removeAttr("disabled")
                }
            }
        }
        $(".huiseBg").removeClass("huiseBg")
    } else {
        f.numCache = [];
        f.numList = [];
        f.td.css({
            cursor: "default"
        }).addClass("huiseBg");
        c.attr({
            disabled: "disabled"
        }).css({
            background: "#eee"
        });
        b.removeAttr("checked").attr({
            disabled: "disabled"
        });
        $(".kon input").attr("checked", "true");
        $(".onBg").removeClass("onBg");
        f.uAction = 0;
        $(".elem_selected").hide()
    }
}
;
P.Mod.evenCode_nc.prototype.pageShow = function (a) {
    if (a == "064") {
        $(".lianma_q").show();
        $(".lianma_zh").hide();
        $(".lianma_h").show();
        return
    }
    if (a == "067") {
        $(".lianma_q").show();
        $(".lianma_zh").show();
        $(".lianma_h").show();
        return
    }
    $(".lianma_q").hide();
    $(".lianma_zh").hide();
    $(".lianma_h").hide();
    $("input:checkbox", ".touzhuArea").removeAttr("disabled");
    if (a == "060") {
        $(".animal").attr("disabled", "disabled");
        return
    } else {
        if (a == "061") {
            $("input:checkbox", ".touzhuArea").attr("disabled", "disabled");
            $(".animal").removeAttr("disabled");
            return
        } else {
            if (a == "062") {
                return
            } else {
                $(".animal").removeAttr("disabled")
            }
        }
    }
}
;
$.extend({
    logjs: null,
    log4js_cfg: {
        css_path: "/webssc/js/plugins/log4js.css",
        js_path: "/webssc/js/plugins/",
        ajax_path: "klc/frontendlog/",
        ajax_timer: 300 * 1000,
        log4js_type: 4,
        log4js_level: "error"
    },
    log_debug: function (a) {
        $.log4js(a, "debug")
    },
    log_info: function (a) {
        $.log4js(a, "info")
    },
    log_error: function (a) {
        $.log4js(a, "error")
    },
    log4js: function (b, c) {
        if (!$.log4js_cfg.log4js_type) {
            return
        }
        c = c ? c : "info";
        var a = self == top ? $.logjs : parent.$.logjs;
        if (a == null) {
            return
        }
        switch (c) {
            case "trace":
                a.trace(b);
                break;
            case "debug":
                a.debug(b);
                break;
            case "info":
                a.info(b);
                break;
            case "warn":
                a.warn(b);
                break;
            case "error":
                a.error(b);
                break;
            case "fatal":
                a.fatal(b);
                break;
            default:
                a.info(b);
                break
        }
    },
    initLog4js: function () {
        $.log4js_cfg.ajax_path = "klc/frontendlog/?=ajax",
            timeHander = setTimeout(function () {
                timeHander = null;
                $._initLog4js()
            }, 10000)
    },
    _initLog4js: function () {
        if (!$.log4js_cfg.log4js_type) {
            return
        }
        var a = null;
        switch ($.log4js_cfg.log4js_type) {
            case 1:
                a = "log4javascript_uncompressed.js";
                break;
            case 2:
                a = "log4javascript_lite.js";
                break;
            case 3:
                a = "log4javascript.js";
                break;
            case 4:
                a = "log4javascript_ajax_min.js";
                break
        }
        var b = function () {
            cssfile = document.createElement("link");
            cssfile.setAttribute("rel", "stylesheet");
            cssfile.setAttribute("type", "text/css");
            cssfile.setAttribute("href", $.log4js_cfg.css_path)
        };
        if ($.log4js_cfg.log4js_type != 4) {
            b()
        }
        $.ajax({
            type: "GET",
            url: $.log4js_cfg.js_path + a + "?" + P.Set.version,
            dataType: "script",
            success: function (f) {
                var c = null;
                var g = log4javascript.Level[$.log4js_cfg.log4js_level.toUpperCase()];
                switch ($.log4js_cfg.log4js_type) {
                    case 1:
                        $.logjs = log4javascript.getLogger("main");
                        $.logjs.setLevel(g);
                        c = new log4javascript.InPageAppender();
                        $.logjs.addAppender(c);
                        break;
                    case 2:
                        $.logjs = log4javascript.getDefaultLogger();
                        $.logjs.setLevel(g);
                        break;
                    case 3:
                        $.logjs = log4javascript.getLogger("main");
                        $.logjs.setLevel(g);
                        c = new log4javascript.PopUpAppender();
                        var d = new log4javascript.PatternLayout("%d{HH:mm:ss-SSS} %-5p - %m%n");
                        c.setLayout(d);
                        $.logjs.addAppender(c);
                        break;
                    case 4:
                        $.logjs = log4javascript.getLogger();
                        $.logjs.setLevel(g);
                        c = new log4javascript.AjaxAppender($.log4js_cfg.ajax_path);
                        c.setWaitForResponse(true);
                        c.setBatchSize(10);
                        c.setLayout(new log4javascript.JsonLayout());
                        c.setTimed(true);
                        c.setTimerInterval($.log4js_cfg.ajax_timer);
                        $.logjs.addAppender(c);
                        break
                }
            }
        })
    }
});
P.Mod.bothSides_ks = function (a) {
    P.Utl.navChange_page(a[0].id);
    P.Mod.moduleklc.call(this, a, "sub_nav_ks")
}
;
P.Mod.bothSides_ks.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.bothSides_ks.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides_ks.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.bothSides_ks.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.sub_nav_ks = function (a) {
    P.Mod.sub_navklc.call(this, a, "_ks", 10000)
}
;
P.Mod.sub_nav_ks.prototype.BindData = function (a) {
    P.Mod.sBindDataklc.call(this, a, "#bothSides_ks", 3, 540, 420)
}
;
P.Mod.sub_nav_ks.prototype.unbind = function () {
    P.Mod.sub_nav.prototype.unbind.call(this)
}
;
P.Mod.bothSides_kb = function (a) {
    P.Utl.navChange_page(a[0].id);
    P.Mod.moduleklc.call(this, a, "sub_nav_kb")
}
;
P.Mod.bothSides_kb.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.bothSides_kb.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.bothSides_kb.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.bothSides_kb.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.sub_nav_kb = function (a) {
    P.Mod.sub_navklc.call(this, a, "_kb", 10000)
}
;
P.Mod.sub_nav_kb.prototype.BindData = function (a) {
    P.Mod.sBindDataklc.call(this, a, "#bothSides_kb", 20, 540, 420)
}
;
P.Mod.sub_nav_kb.prototype.unbind = function () {
    P.Mod.sub_nav.prototype.unbind.call(this)
}
;
P.Mod.sumDT_kb = function (a) {
    this.moduleklc = P.Mod.moduleklc;
    this.moduleklc(a, "sub_nav_kb")
}
;
P.Mod.sumDT_kb.prototype.rebind = function () {
    P.Mod.klcrebind(this);
    $(".bq-title").removeClass("kon").first().addClass("kon")
}
;
P.Mod.sumDT_kb.prototype.moduleFirstLogin = function () {
    P.Mod.moduleFirstLogin.call(this)
}
;
P.Mod.sumDT_kb.prototype.setData = function (a) {
    P.Mod.klcsetData(this, a)
}
;
P.Mod.sumDT_kb.prototype.unbind = function () {
    P.Mod.klcunbind(this)
}
;
P.Mod.header = function (n) {
    var m = this;
    this.dom = n;
    this.consolealert = [];
    var g = P.Utl.setLayout;
    var k = function (A) {
        var p = A.target
            , B = p.getAttribute("nav")
            , x = p.parentNode;
        $("#integrate-nav .on").removeClass("on");
        var y = $("#side_left").data("Module");
        if (B) {
            if (y && y.alertOrderK) {
                y.alertOrderK.close();
                y.alertOrderK = null
            }
            if (y && y.alertOrder) {
                var z = "你确定取消{#|6ce8|5355#},切换模块吗？";
                $.UT.Alert({
                    text: z,
                    determineCallback: function () {
                        m.changeNav(B, x);
                        y.alertOrder.close();
                        y.alertOrder = null;
                        return false
                    },
                    cancelCallback: function () {
                        if (y.alertOrder) {
                            y.alertOrder.determine.focus().select()
                        }
                    }
                })
            } else {
                m.changeNav(B, x)
            }
        }
        return false
    };
    var q = $.UT.Cookie("sysinfo") || "", l = q.split("|"), t = l[1] || -1, a = P.Utl.severTime().hours, h, b = "get_json_klc";
    h = l[0] || "klc";
    P.Set.systype = h;
    n.css("display", "none");
    var w = "/" + window.location.pathname.split("/")[1] + "/";
    var v = $(".switch");
    $(".switch-on").removeClass("switch-on");
    var i = 0;
    switch (P.Set.systype) {
        case "klc":
            i = 0;
            break;
        case "ssc":
            i = 1;
            break;
        case "pk10":
            i = 2;
            break;
        case "nc":
            i = 3;
            break;
        case "ks":
            i = 4;
            break;
        case "kb":
            i = 5;
            break
    }
    v[i].className = "switch-on switch nav_longstring";
    $(".elem_groupFilter").css("display", "none").find(".on").removeClass("on");
    $("#integrate-nav ." + h).show();
    if (P.Set.navNum == 1 || P.Set.navNum == 10 || P.Set.navNum == 14 || P.Set.navNum == 18 || P.Set.navNum == 22 || P.Set.navNum == 26 || P.Set.navNum == 0) {
        $(".main-nav span").removeClass("on");
        $("#integrate-nav ." + h).find("a").first().addClass("on")
    }
    b = "get_json_" + P.Set.systype;
    if (t == "1") {
        n.show();
        P.Set.systype = h;
        var c;
        P.Set.navNumber = P.Set["navNumber_" + h];
        switch (P.Set.systype) {
            case "klc":
                c = 1;
                break;
            case "ssc":
                c = 10;
                break;
            case "pk10":
                c = 14;
                break;
            case "nc":
                c = 18;
                break;
            case "ks":
                c = 22;
                break;
            case "kb":
                c = 26;
                break
        }
        if (P.Set.navNum) {
            g(P.Set.navNum)
        } else {
            g(c)
        }
        l[0] = h;
        l[1] = 1;
        $.UT.Cookie("sysinfo", l.join("|"), {
            path: w
        })
    } else {
        if (t == "2") {
            g(P.Set.moduleNav)
        } else {
            g(9);
            this.alertbox = P.Utl.announcement("#333")
        }
    }
    var j = {
        urlId: m.dom[0].id,
        action: b,
        keepOn: true,
        data: {
            key: G.Channel
        },
        callback: function (p) {
            m.setData(p)
        }
    };
    this.marqueeRefresh = $("#marqueeRefresh", n).Widget("AutoRefresh", j);
    if (this.t) {
        this.marqueeRefresh.show(this.t)
    } else {
        this.marqueeRefresh.show(5)
    }
    var f = function (y, A, z, x) {
        if (z == "add") {
            if (jQuery.inArray(A, G.Channel) == -1) {
                G.Channel.push(A);
                $("body").bind("cpsdata." + A, function (B, C) {
                    x(C)
                })
            }
        }
        if (z == "del") {
            if (jQuery.inArray(A, G.Channel) != -1) {
                $("body").unbind("cpsdata." + A);
                var p = G.Channel.join("|") + "|";
                A = A + "|";
                p = p.replace(A, "");
                G.Channel = p.split("|");
                if (p.charAt(p.length - 1) == "|") {
                    G.Channel.pop()
                }
            }
        }
        j.data.key = G.Channel
    };
    $("body").bind("cpschanel", f);
    $("#select_sys").bind("changesys", function () {
        m.marqueeRefresh.action = "get_json_" + P.Set.systype
    });
    function r(C) {
        var D = +new Date();
        var p = C.target
            , z = P.Set.systype
            , y = p.getAttribute("subnav");
        if (y) {
            if (p.nodeName == "A") {
                function x() {
                    $(p).addClass("on").siblings().removeClass("on");
                    $("div.main-nav span").removeClass("on");
                    var E;
                    switch (z) {
                        case "klc":
                            E = 1;
                            break;
                        case "ssc":
                            E = 10;
                            break;
                        case "pk10":
                            E = 14;
                            break;
                        case "nc":
                            E = 18;
                            break;
                        case "ks":
                            E = 22;
                            break;
                        case "kb":
                            E = 26;
                            break
                    }
                    g(E, y)
                }

                var B = $("#side_left").data("Module");
                if (B && B.alertOrderK) {
                    B.alertOrderK.close();
                    B.alertOrderK = null
                }
                if (B && B.alertOrder) {
                    var A = "你确定取消{#|6ce8|5355#},切换玩法吗？";
                    $.UT.Alert({
                        text: A,
                        determineCallback: function () {
                            x();
                            B.alertOrder.close();
                            B.alertOrder = null;
                            return false
                        },
                        cancelCallback: function () {
                            if (B.alertOrder) {
                                B.alertOrder.determine.focus().select()
                            }
                        }
                    })
                } else {
                    x()
                }
            }
        }
    }

    var d = function (p) {
        $.UT.Alert({
            text: "你确定要退出吗?",
            determineCallback: function () {
                window.location.href = $("#logout").attr("href")
            }
        })
    };
    $("body").bind("click", function (y) {
        var p = y.target
            , x = p.getAttribute("subnav")
            , B = p.id;
        if (x) {
            $("#conRight").css("background", "#ebeced");
            r(y);
            return
        }
        var z = p.getAttribute("nav");
        if (z && P.Set.navNumber[z]) {
            $("#conRight").css("background", "#fff");
            k(y);
            return
        }
        var A = p.getAttribute("skinclass");
        if (A) {
            skinChange(y);
            return
        }
        switch (B) {
            case "moreNotice":
                P.Utl.announcement(y);
                break;
            case "disagree":
                d();
                break;
            default:
                P.Utl.one(y)
        }
    });
    P.Utl.lineTest()
}
;
P.Mod.header.prototype.setData = function (b) {
    if (!b) {
        return
    }
    for (var c = 0; c < G.Channel.length; c++) {
        $("body").trigger("cpsdata." + G.Channel[c], [b])
    }
    if (b.marquee) {
        P.Set.marquee = letterformat(b.marquee, 0).toString().keyComment();
        $("#marqueeBox").html(letterformat(b.marquee, 0).toString().keyComment());
        if (b.noticetime) {
            P.Utl.announcement({}, b.noticetime, b.marquee)
        }
    }
    if (b.marqueeTime) {
        this.t = parseInt(b.marqueeTime);
        if (isNaN(this.t)) {
            return
        }
        this.marqueeRefresh.show(this.t)
    }
    if (b.tt) {
        P.Set.tt = b.tt
    }
    if (b.tk) {
        P.Set.tk = b.tk
    }
    var a = $("#side_left").data("Module");
    if (b.user && a) {
        a.setData(b)
    }
    if (b.user && b.user.new_orders && a) {
        a.bindNewOrder(b.user.new_orders)
    }
    if (b.lines) {
        P.Set.lines = b.lines
    }
}
;
P.Mod.header.prototype.changeNav = function (c, a) {
    var b;
    G.RequestQueue = {};
    if (P.Set.navNumber[c]) {
        b = P.Utl.setLayout(P.Set.navNumber[c]);
        if (b != 0) {
            $(a).addClass("on").siblings().removeClass("on")
        }
    }
}
;
(function () {
        P.Utl.publicChengeModule("main");
        P.Utl.publicChengeModule("rightLoader");
        P.Utl.publicChengeModule("leftLoader");
        $("#rightLoader").bind("changeModule", function (b, a) {
            $("#leftLoader").show();
            $("#conLeft").show();
            $("#conRight").show();
            $("#layoutright").show();
            $("#rightLoader").show();
            $("#mainlayout")[0].style.display = "none";
            $("#main")[0].style.display = "none";
            P.Utl.publicChengeModule("main")
        });
        $("#main").bind("changeModule", function (b, a) {
            $("#conRight")[0].style.display = "none";
            $("#conLeft")[0].style.display = "none";
            $("#mainlayout").show();
            $("#main").show();
            $("#leftLoader")[0].style.display = "none";
            $("#layoutright")[0].style.display = "none";
            $("#rightLoader")[0].style.display = "none";
            P.Utl.publicChengeModule("rightLoader");
            P.Utl.publicChengeModule("leftLoader")
        })
    })();
P.Utl.setLayout = function (k, m, l) {
    var p = +new Date();
    var j = $("#side_left").Module();
    var d = 0
        , g = P.Set.systype
        , c = "leftLoader"
        , r = "rightLoader";
    if (P.Set.enterPWD) {
        $("span.g-vd-error").removeClass("g-vd-error");
        $("span.g-vd-s-error").removeClass("g-vd-s-error");
        $("span.g-vd-s-pass").removeClass("g-vd-s-pass");
        delete P.Set.enterPWD
    }
    if (k == 8) {
        P.Set.enterPWD = 1
    }
    if (k == 1 || k == 10 || k == 14 || k == 18 || k == 22 || k == 26) {
        $("#conRight").css("background", "#ebeced")
    }
    if (k != 9) {
        var v = "get_json";
        switch (g) {
            case "klc":
                break;
            case "ssc":
                v = "get_json_sc";
                break;
            case "pk10":
            case "nc":
            case "ks":
            case "kb":
                v = "get_json_" + g;
                break
        }
        if (!j) {
            P.Utl.publicChengeModule(c, "ajax", "side_left", "get_html", v)
        } else {
            if (j && v) {
                var f = {
                    act: "hand"
                };
                if (l) {
                    f.sys = P.Set.systype
                }
                $.UT.publicGetAction("side_left", f, function (x) {
                    j.setData(x)
                }, v)
            }
        }
    }
    switch (k) {
        case 1:
            if (m) {
                P.Utl.changeSubNav(m, this);
                switch (m) {
                    case "bothSides":
                        var n = "bothSides";
                        break;
                    case "sumDT":
                        var n = "sumDT";
                        break;
                    default:
                        var n = "ballNO"
                }
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "bothSides", "get_html", "get_json", {
                    play: "bothSides",
                    ball: "",
                    cat: "13"
                });
                $("#integrate-nav  .klc").find("a").first().addClass("on");
                var n = "bothSides"
            }
            var h = setTimeout(function () {
                P.Utl.navChange_page(n);
                h = null
            }, 0);
            break;
        case 3:
            P.Utl.publicChengeModule(r, "ajax", "status", "get_html", "get_json", {
                st: "2",
                gameId: "allplay",
                pager: 1,
                platform: g
            }, null, null, {
                romances: true
            });
            var i = $("#status").Module();
            if (i) {
                i.unbind()
            }
            break;
        case 4:
            P.Utl.publicChengeModule(r, "ajax", "history", "get_html", "get_json", null, null, null, {
                romances: true
            });
            break;
        case 5:
            P.Utl.publicChengeModule(r, "ajax", "result_" + P.Set.systype, "get_html", "get_json", null, null, null, {
                romances: true
            });
            break;
        case 6:
            P.Utl.publicChengeModule(r, "ajax", "infop", "get_html", "get_json_" + g, null, null, null, {
                romances: true
            });
            break;
        case 7:
            P.Utl.publicChengeModule(r, "ajax", "rule", "get_html");
            break;
        case 8:
            P.Utl.publicChengeModule(P.Set.firstLogin ? $("#main") : r, "ajax", "change_password", "get_html");
            break;
        case 9:
            P.Utl.publicChengeModule($("#main"), "ajax", "protocol", "get_html");
            break;
        case 10:
            if (m && m != "integrate_sc") {
                P.Utl.changeSubNav(m, this);
                var b = setTimeout(function () {
                    var x = "";
                    if (m == "bothSides_ssc") {
                        x = "bothSides_ssc"
                    } else {
                        x = m ? "ballNO_sc" : "integrate_sc"
                    }
                    P.Utl.navChange_page(x);
                    b = null
                }, 0)
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "integrate_sc", "get_html", "get_json");
                $("#integrate-nav .ssc").find("a").first().addClass("on");
                var q = setTimeout(function () {
                    P.Utl.navChange_page("integrate_sc");
                    q = null
                }, 0)
            }
            break;
        case 13:
            P.Utl.publicChengeModule(r, "ajax", "rule_ssc", "get_html");
            break;
        case 14:
            if (m) {
                P.Utl.changeSubNav(m, this)
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "bothSides_pk10", "get_html", "get_json", {
                    play: "bothSides_pk10",
                    cat: "15"
                });
                $("#integrate-nav  .pk10").find("a").first().addClass("on")
            }
            var a = setTimeout(function () {
                P.Utl.navChange_page(m || "bothSides_pk10");
                a = null
            }, 0);
            break;
        case 17:
            P.Utl.publicChengeModule(r, "ajax", "rule_pk10", "get_html");
            break;
        case 18:
            if (m) {
                P.Utl.changeSubNav(m, this);
                switch (m) {
                    case "bothSides_nc":
                        var n = "bothSides_nc";
                        break;
                    case "sumDT_nc":
                        var n = "sumDT_nc";
                        break;
                    default:
                        var n = "ballNO_nc"
                }
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "bothSides_nc", "get_html", "get_json", {
                    play: "bothSides_nc",
                    ball: "",
                    cat: "13"
                });
                $("#integrate-nav  .nc").find("a").first().addClass("on");
                var n = "bothSides_nc"
            }
            var t = setTimeout(function () {
                P.Utl.navChange_page(n);
                t = null
            }, 0);
            break;
        case 21:
            P.Utl.publicChengeModule(r, "ajax", "rule_nc", "get_html");
            break;
        case 22:
            if (m) {
                P.Utl.changeSubNav(m, this);
                switch (m) {
                    case "bothSides_ks":
                        var n = "bothSides_ks";
                        break;
                    default:
                        var n = "bothSides_ks"
                }
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "bothSides_ks", "get_html", "get_json", {
                    play: "pageOne",
                    ball: "",
                    cat: "13"
                });
                $("#integrate-nav  .ks").find("a").first().addClass("on");
                var n = "bothSides_ks"
            }
            var h = setTimeout(function () {
                P.Utl.navChange_page(n);
                h = null
            }, 0);
            break;
        case 23:
            P.Utl.publicChengeModule(r, "ajax", "result_ks", "get_html", "get_json", null, null, null, {
                romances: true
            });
            break;
        case 25:
            P.Utl.publicChengeModule(r, "ajax", "rule_ks", "get_html");
            break;
        case 26:
            if (m) {
                P.Utl.changeSubNav(m, this);
                var n = m
            } else {
                P.Utl.yesheMoney.remember();
                P.Utl.publicChengeModule(r, "ajax", "bothSides_kb", "get_html", "get_json", {
                    play: "bothSides_kb",
                    ball: "",
                    cat: "13"
                });
                $("#integrate-nav  .kb").find("a").first().addClass("on");
                var n = "bothSides_kb"
            }
            var t = setTimeout(function () {
                P.Utl.navChange_page(n);
                t = null
            }, 0);
            break;
        case 29:
            P.Utl.publicChengeModule(r, "ajax", "rule_kb", "get_html");
            break;
        case 30:
            P.Utl.publicChengeModule(r, "ajax", "lineSelect", "get_html");
            break
    }
    P.Set.navNum = k;
    d = k;
    var w = setTimeout(function () {
        if (!$("#htmlcachelayout")[0]) {
            $("body").append('<div id="htmlcachelayout" style="display:none"></div>');
            P.Utl.publicChengeModule($("#htmlcachelayout")[0], "ajax", "pre_htmlcache", "get_html", null, null, null, null, {
                FError: function () {
                }
            })
        }
        w = null
    }, 500);
    try {
        return d
    } finally {
        d = null
    }
}
;
(function () {
        $("#header").Module();
        try {
            if (P.Set.log4jsonoff === 1) {
                $.initLog4js()
            }
        } catch (a) {
        }
    })();
