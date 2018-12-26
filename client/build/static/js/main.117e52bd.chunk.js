(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{232:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(63),c=a.n(o),s=a(5),i=a.n(s),u=a(12),l=a(64),m=a(65),h=a(69),d=a(66),p=a(70),f=a(11),v=(a(78),a(67)),b=a.n(v),g=function(e){var t=e.app,a=function(e){var a=e.trim().toLowerCase();return 0===a.length?[]:t.state.countries.filter(function(e){return e.toLowerCase().includes(a)})},n=t.state,o=n.value,c=n.suggestions,s={placeholder:"Type a country",value:o,onChange:function(e,a){var n=a.newValue;t.setState({value:n})}},l=function(){var e=Object(u.a)(i.a.mark(function e(a){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.setState({capita:!t.state.capita});case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("div",{className:"textBox"},r.a.createElement(b.a,{suggestions:c,onSuggestionsFetchRequested:function(e){var n=e.value;t.setState({suggestions:a(n)})},onSuggestionsClearRequested:function(){t.setState({suggestions:[]})},getSuggestionValue:function(e){return e},renderSuggestion:function(e){return r.a.createElement("div",null,e)},inputProps:s}),r.a.createElement("button",{className:"searchButton",onClick:t.onSearch},r.a.createElement("i",{className:"fas fa-search fa-3x"}))),r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",className:"checkBox",onClick:l}),r.a.createElement("span",{className:"capita"},"Per Capita")))},E=a(39),w=function(e){var t=e.app,a=0===t.state.data.length?"hide data":"data",n=0;return 0===t.state.length?r.a.createElement("div",null):r.a.createElement("div",{className:a},r.a.createElement(E.b,{className:"line",data:function(){return 0===t.state.data.length?[]:{labels:t.state.data.filter(function(e){return null!==e.emissions}).map(function(e){return e.year}),datasets:[{label:"Emissions ".concat(t.state.capita?"(t) per capita":"(kt)"," of ").concat(t.state.data[0].country),fill:!1,lineTension:.1,backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:t.state.data.filter(function(e){return null!==e.emissions}).map(function(e){return t.state.capita?(1e3*e.emissions/e.population).toFixed(2):e.emissions})}]}},width:5,height:2,options:{maintainAspectRatio:!0}}),r.a.createElement(E.a,{data:function(){if(0===t.state.data.length)return[];var e=t.state.cumulativeCountry,a=t.state.cumulative;a.map(function(e){return e.Country}).includes(e[0].Country)||(a=a.concat(e));var n={labels:a.map(function(e){return e.Country}),datasets:[{label:"Comparison of cumulative emissions (gt) from ".concat(e[0].Min," to ").concat(e[0].Max),fill:!1,backgroundColor:"rgba(255,99,132,0.2)",borderColor:"rgba(255,99,132,1)",borderWidth:1,hoverBackgroundColor:"rgba(255,99,132,0.4)",hoverBorderColor:"rgba(255,99,132,1)",data:a.map(function(e){return e.Emission})}]};return t.state.capita&&n.datasets.push({label:"Comparison of cumulative emissions (t) per capita from ".concat(e[0].Min," to ").concat(e[0].Max),fill:!1,backgroundColor:"rgba(153,50,204,0.2)",borderColor:"rgba(153,50,204,1)",borderWidth:1,hoverBackgroundColor:"rgba(153,50,204,0.4)",hoverBorderColor:"rgba(153,50,204,1)",data:a.map(function(e){return e.Capita})}),n}}),r.a.createElement("table",{className:"dataTable"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Year"),r.a.createElement("th",null,"Emissions (kt)"),r.a.createElement("th",null,"Per capita (t)"),r.a.createElement("th",null,"% of world"))),r.a.createElement("tbody",null,t.state.data.filter(function(e){return null!==e.emissions}).map(function(e){return r.a.createElement("tr",{key:n++},r.a.createElement("th",null,e.year),r.a.createElement("th",null,e.emissions.toLocaleString()),r.a.createElement("th",null,(1e3*e.emissions/e.population).toFixed(2)),r.a.createElement("th",null,(100*e.emissions/t.state.world.find(function(t){return t.year===e.year}).emissions).toFixed(2),"%"))}))))},y=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e,a))).onSearch=n.onSearch.bind(Object(f.a)(Object(f.a)(n))),n.fetchJSON=n.fetchJSON.bind(Object(f.a)(Object(f.a)(n))),n.state={codeMap:new Map,countries:[],value:"",suggestions:[],capita:!1,data:[],world:[],cumulative:[],cumulativeCountry:[]},n}return Object(p.a)(t,e),Object(m.a)(t,[{key:"fetchJSON",value:function(){var e=Object(u.a)(i.a.mark(function e(t){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("api/v1/"+t);case 2:return a=e.sent,e.next=5,a.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(u.a)(i.a.mark(function e(){var t,a,n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchJSON("countries");case 2:return t=e.sent,t=new Map(t),e.next=6,this.fetchJSON("years");case 6:return e.sent,e.next=9,this.fetchJSON("countries/wld");case 9:return a=e.sent,e.next=12,this.fetchJSON("countries/cumulative");case 12:return n=e.sent,e.next=15,this.setState({codeMap:t,countries:Array.from(t.keys()),world:a,cumulative:n.slice(0,10)});case 15:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"onSearch",value:function(){var e=Object(u.a)(i.a.mark(function e(){var t,a,n,r,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state,a=t.value,!t.countries.includes(a)){e.next=12;break}return n=this.state.codeMap.get(a),e.next=5,this.fetchJSON("countries/".concat(n));case 5:return r=e.sent,e.next=8,this.fetchJSON("countries/cumulative/".concat(n));case 8:o=e.sent,this.setState({data:r,cumulativeCountry:o}),e.next=13;break;case 12:console.log("Must search with valid country.");case 13:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"CO\xb2-EMISSIONS"),r.a.createElement(g,{app:this}),r.a.createElement(w,{app:this}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},71:function(e,t,a){e.exports=a(232)},78:function(e,t,a){}},[[71,2,1]]]);
//# sourceMappingURL=main.117e52bd.chunk.js.map