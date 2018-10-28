(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},8:function(e,t,a){e.exports=a(9)},9:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(2),s=a(4),l=a(3),i=a(5),o=a(0),c=a.n(o),u=a(7),m=a.n(u);a(14);function h(e){var t;return e.value<0?c.a.createElement("div",{className:"tile"},null):(t="tile tile-"+e.value.toString(),c.a.createElement("div",{className:t},e.value))}var f=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(n.a)(t,[{key:"renderTile",value:function(e){return c.a.createElement(h,{value:this.props.tiles[e]})}},{key:"render",value:function(){return c.a.createElement("div",{className:"game-board"},c.a.createElement("div",{className:"board-row"},this.renderTile(0),this.renderTile(1),this.renderTile(2),this.renderTile(3)),c.a.createElement("div",{className:"board-row"},this.renderTile(4),this.renderTile(5),this.renderTile(6),this.renderTile(7)),c.a.createElement("div",{className:"board-row"},this.renderTile(8),this.renderTile(9),this.renderTile(10),this.renderTile(11)),c.a.createElement("div",{className:"board-row"},this.renderTile(12),this.renderTile(13),this.renderTile(14),this.renderTile(15)))}}]),t}(c.a.Component),d=function(e){function t(e){var a;Object(r.a)(this,t),(a=Object(s.a)(this,Object(l.a)(t).call(this,e))).handleKeyPress=function(e){38===(e=e||window.event).keyCode?a.shift(1):40===e.keyCode?a.shift(2):37===e.keyCode?a.shift(0):39===e.keyCode&&a.shift(3)},a.state={history:[{tiles:Array(16).fill(-1),score:0}],score:0,best_score:0,stepNumber:0};for(var n=[];n.length<2;){var i=Math.floor(4*Math.random()*4);n.indexOf(i)>-1||(n[n.length]=i)}return a.state.history[0].tiles[n[0]]=2,a.state.history[0].tiles[n[1]]=2,a}return Object(i.a)(t,e),Object(n.a)(t,[{key:"reset_game",value:function(){for(var e=[];e.length<2;){var t=Math.floor(4*Math.random()*4);e.indexOf(t)>-1||(e[e.length]=t)}var a=Array(16).fill(-1);a[e[0]]=2,a[e[1]]=2,console.log(a),this.setState({history:[{tiles:a,score:0}],stepNumber:0,best_score:Math.max(this.state.best_score,this.state.score)})}},{key:"undo",value:function(){this.setState({stepNumber:Math.max(0,this.state.stepNumber-1)})}},{key:"shift",value:function(e){if(this.move_possible){var t=this.state.history.slice(0,this.state.stepNumber+1),a=t[t.length-1],r=a.tiles.slice(),n=!1,s=0;if(0===e)for(var l=0;l<4;l++){for(var i=4*l,o=i+1;o<4*(l+1);)r[o]>0&&r[o]===r[i]?(s+=r[o],r[i]=2*r[i],r[o]=-1,i=o,n=!0):r[o]>0&&(i=o),o++;for(var c=4*l;c<4*(l+1)&&r[c]>0;)c++;for(o=c;o<4*(l+1);)r[o]>0&&(r[c]=r[o],r[o]=-1,c++,n=!0),o++}else if(1===e)for(var u=0;u<4;u++){for(var m=u,h=m+4;h<r.length;)r[h]>0&&r[h]===r[m]?(s+=r[h],r[m]=2*r[m],r[h]=-1,m=h,n=!0):r[h]>0&&(m=h),h+=4;for(var f=u;f<r.length&&r[f]>0;)f+=4;for(h=f;h<r.length;)r[h]>0&&(r[f]=r[h],r[h]=-1,f+=4,n=!0),h+=4}else if(2===e)for(var d=0;d<4;d++){for(var v=r.length-d-1,E=v-4;E>=0;)r[E]>0&&r[E]===r[v]?(s+=r[E],r[v]=2*r[v],r[E]=-1,v=E,n=!0):r[E]>0&&(v=E),E-=4;for(var b=r.length-d-1;b>=0&&r[b]>0;)b-=4;for(E=b;E>=0;)r[E]>0&&(r[b]=r[E],r[E]=-1,b-=4,n=!0),E-=4}else if(3===e)for(var p=0;p<4;p++){for(var N=4*(p+1)-1,g=N-1;g>4*p-1;)r[g]>0&&r[g]===r[N]?(s+=r[g],r[N]=2*r[N],r[g]=-1,N=g,n=!0):r[g]>0&&(N=g),g--;for(var y=4*(p+1)-1;y>=4*p&&r[y]>0;)y--;for(g=y;g>=4*p;)r[g]>0&&(r[y]=r[g],r[g]=-1,y--,n=!0),g--}for(var k=[],w=0;w<r.length;w++)r[w]<0&&k.push(w);if(n||0!==k.length||this.setState({best_score:Math.max(this.state.score,this.state.best_score),score:0}),n){if(k)r[k[Math.floor(Math.random()*k.length)]]=2;this.setState({history:t.concat([{tiles:r,score:a.score+s}]),stepNumber:t.length})}}}},{key:"move_possible",value:function(e,t,a){for(var r=!1,n=0;n<t;n++)for(var s=n*t,l=0;l<a;l++){var i=s+l,o=i-a>0?i-a:null,c=i+a<e.length?i+a:null;r=r||null!==o||null!==c||null!==(l-1>0?i-1:null)||null!==(l+1<a?i+1:null)}return console.log(r),r}},{key:"render",value:function(){var e=this,t=this.state.best_score,a=this.state.history[this.state.stepNumber],r=a.score;return document.onkeydown=this.handleKeyPress,c.a.createElement("div",{className:"game",onKeyPress:this.handleKeyPress},c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"game-header"},c.a.createElement("p",{className:"title"},"2048"),c.a.createElement("div",{className:"game-info"},c.a.createElement("div",null,c.a.createElement("p",null,"Score"),c.a.createElement("p",null,c.a.createElement("strong",null,r))),c.a.createElement("div",null,c.a.createElement("p",null,"Best"),c.a.createElement("p",null,c.a.createElement("strong",null,t))),c.a.createElement("div",null,c.a.createElement("p",null,"Moves"),c.a.createElement("p",null,c.a.createElement("strong",null,this.state.stepNumber))))),c.a.createElement("div",{class:"aux-header"},c.a.createElement("p",{className:"subtitle"},"A take on 2048 in React."),c.a.createElement("button",{className:"resetGame",onClick:function(){return e.undo()}},"Undo"),c.a.createElement("button",{className:"resetGame",onClick:function(){return e.reset_game()}},"Reset"))),c.a.createElement(f,{tiles:a.tiles}),c.a.createElement("div",{className:"controls"},c.a.createElement("button",{className:"control",onClick:function(){return e.shift(0)}},c.a.createElement("i",{className:"fas fa-arrow-left"})),c.a.createElement("button",{className:"control",onClick:function(){return e.shift(1)}},c.a.createElement("i",{className:"fas fa-arrow-up"})),c.a.createElement("button",{className:"control",onClick:function(){return e.shift(2)}},c.a.createElement("i",{className:"fas fa-arrow-down"})),c.a.createElement("button",{className:"control",onClick:function(){return e.shift(3)}},c.a.createElement("i",{className:"fas fa-arrow-right"}))))}}]),t}(c.a.Component);m.a.render(c.a.createElement(d,null),document.getElementById("root"))}},[[8,2,1]]]);
//# sourceMappingURL=main.db979588.chunk.js.map