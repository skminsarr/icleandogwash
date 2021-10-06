
if (!gform) {
    document.addEventListener("gform_main_scripts_loaded", function() {
        gform.scriptsLoaded = !0
    }), window.addEventListener("DOMContentLoaded", function() {
        gform.domLoaded = !0
    });
    var gform = {
        domLoaded: !1,
        scriptsLoaded: !1,
        initializeOnLoaded: function(o) {
            gform.domLoaded && gform.scriptsLoaded ? o() : !gform.domLoaded && gform.scriptsLoaded ? window.addEventListener("DOMContentLoaded", o) : document.addEventListener("gform_main_scripts_loaded", o)
        },
        hooks: {
            action: {},
            filter: {}
        },
        addAction: function(o, n, r, t) {
            gform.addHook("action", o, n, r, t)
        },
        addFilter: function(o, n, r, t) {
            gform.addHook("filter", o, n, r, t)
        },
        doAction: function(o) {
            gform.doHook("action", o, arguments)
        },
        applyFilters: function(o) {
            return gform.doHook("filter", o, arguments)
        },
        removeAction: function(o, n) {
            gform.removeHook("action", o, n)
        },
        removeFilter: function(o, n, r) {
            gform.removeHook("filter", o, n, r)
        },
        addHook: function(o, n, r, t, i) {
            null == gform.hooks[o][n] && (gform.hooks[o][n] = []);
            var e = gform.hooks[o][n];
            null == i && (i = n + "_" + e.length), null == t && (t = 10), gform.hooks[o][n].push({
                tag: i,
                callable: r,
                priority: t
            })
        },
        doHook: function(o, n, r) {
            if (r = Array.prototype.slice.call(r, 1), null != gform.hooks[o][n]) {
                var t, i = gform.hooks[o][n];
                i.sort(function(o, n) {
                    return o.priority - n.priority
                });
                for (var e = 0; e < i.length; e++) "function" != typeof(t = i[e].callable) && (t = window[t]), "action" == o ? t.apply(null, r) : r[0] = t.apply(null, r)
            }
            if ("filter" == o) return r[0]
        },
        removeHook: function(o, n, r, t) {
            if (null != gform.hooks[o][n])
                for (var i = gform.hooks[o][n], e = i.length - 1; 0 <= e; e--) null != t && t != i[e].tag || null != r && r != i[e].priority || i.splice(e, 1)
        }
    }
}
