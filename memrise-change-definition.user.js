// ==UserScript==
// @description Memrise Change Word Definition.
// @downloadURL https://github.com/letitend/memrise-change-definition/raw/master/memrise-change-definition.user.js
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// @match       https://www.memrise.com/course/*/garden/*
// @match       https://www.memrise.com/garden/review/*
// @name        Memrise Change Word Definition
// @namespace   https://github.com/letitend
// @updateURL   https://github.com/letitend/memrise-change-definition/raw/master/memrise-change-definition.user.js
// @version     0.0.1
// ==/UserScript==

var onLoad = function($) {
    var h = '<div id="addToList" class="btn-group pull-right" style="position:absolute;top:130px;right:0px;">';
    h += '  <p><button class="btn btn-icos-active" id="editbutton">';
    h += '    <span class="ico ico-edit"></span>';
    h += '    Change translation';
    h += '  </button></p>';
    h += '  <p><button class="btn btn-icos-active" id="delitebutton">';
    h += '    <span class="ico ico-edit"></span>';
    h += '    Delete translation';
    h += '  </button><p>';
    h += '</div>';
    unsafeWindow.$("#right-area").append(h);
    document.getElementById("editbutton").addEventListener('click', changeTranslation, true);
    document.getElementById("delitebutton").addEventListener('click', deleteTranslation, true);
    document.getElementById("boxes").addEventListener('DOMSubtreeModified', function() {
        var thing_id = unsafeWindow.MEMRISE.garden.box.box_dict.thing_id;
        var nova = GM_getValue("id" + thing_id, "");
        if (nova == "") {
            return;
        }
        var vpr = document.getElementsByClassName("qquestion qtext ");
        if (vpr.length) {
            vpr[0].innerHTML = nova;
        }
        try {
            unsafeWindow.$("div.row.column.secondary").find(".row-value")[0].innerHTML = nova;
        } catch (err) {}
    }, true);
};
window.onload = onLoad;

function changeTranslation() {
    var thing_id = unsafeWindow.MEMRISE.garden.box.box_dict.thing_id;
    var c = unsafeWindow.MEMRISE.garden.session_data.things[thing_id].columns;
    var newvalue = prompt("Please enter new translation for: " + c[2].val, GM_getValue("id" + thing_id, c[2].val));
    if (newvalue != null && newvalue != "") {
        GM_setValue("id" + thing_id, newvalue);
        try {
            unsafeWindow.$("div.row.column.secondary").find(".row-value")[0].innerHTML = newvalue;
        } catch (err) {}
        var vpr = document.getElementsByClassName("qquestion qtext ");
        if (vpr.length) {
            vpr[0].innerHTML = newvalue;
        }
    }
}

function deleteTranslation() {
    var thing_id = unsafeWindow.MEMRISE.garden.box.box_dict.thing_id;
    var c = unsafeWindow.MEMRISE.garden.session_data.things[thing_id].columns;
    GM_deleteValue("id" + thing_id);
    var newvalue = GM_getValue("id" + thing_id, c[2].val);
    if (newvalue != null && newvalue != "") {
        try {
            unsafeWindow.$("div.row.column.secondary").find(".row-value")[0].innerHTML = newvalue;
        } catch (err) {}
        var vpr = document.getElementsByClassName("qquestion qtext ");
        if (vpr.length) {
            vpr[0].innerHTML = newvalue;
        }
    }
}
