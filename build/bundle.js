module.exports=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=22)}([function(e,t){e.exports=require("auth0-extension-tools@1.3.1")},function(e,t,n){"use strict";e.exports=n(0).config()},function(e,t){e.exports=require("auth0-extension-express-tools@1.1.6")},function(e,t,n){"use strict";var o=n(33);o.emitErrs=!0;var i=new o.Logger({transports:[new o.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=i,e.exports.stream={write:function(e){i.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("express@4.12.4")},function(e,t){e.exports=require("lodash@3.10.1")},function(e,t,n){function o(e){if(null===e||void 0===e)throw new c.ArgumentError("Must provide an options object");if(null===e.domain||void 0===e.domain)throw new c.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new c.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.clientId||void 0===e.clientId)throw new c.ArgumentError("Must provide a valid clientId");if("string"!=typeof e.clientId||0===e.clientId.length)throw new c.ArgumentError("The provided clientId is invalid: "+e.clientId);if(null===e.clientSecret||void 0===e.clientSecret)throw new c.ArgumentError("Must provide a valid clientSecret");if("string"!=typeof e.clientSecret||0===e.clientSecret.length)throw new c.ArgumentError("The provided clientSecret is invalid: "+e.clientSecret);this.options=e,this.tokenCache=e.tokenCache||{getToken:function(){return i.resolve()},setToken:function(){return i.resolve()}}}const i=n(9),s=n(11),r=n(30),c=n(0);o.prototype.getAccessToken=function(){var e=this;return new i(function(t,n){s.post("https://"+e.options.domain+"/oauth/token").send({audience:"https://"+e.options.domain+"/api/v2/",client_id:e.options.clientId,client_secret:e.options.clientSecret,grant_type:"client_credentials"}).set("Accept","application/json").end(function(o,i){if(o&&401===o.status)return n(new c.ManagementApiError("unauthorized","Invalid credentials for "+e.options.clientId,o.status));if(o&&i&&i.body&&i.body.error)return n(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,o.status));if(o)return n(o);if(!i.ok||!i.body.access_token)return n(new c.ManagementApiError("unknown_error","Unknown error from Management API or no access_token was provided: "+(i.text||i.status)));const s=new Date;return t({token:i.body.access_token,expiresAt:s.setSeconds(s.getSeconds()+i.body.expires_in)})})})},o.prototype.getAccessTokenCached=function(){var e=this;return e.tokenCache.getToken().then(function(t){if(t&&t.token){const n=(new Date).valueOf();if(t.expiresAt-n>1e4)return t}return e.getAccessToken(e.options).then(function(t){return e.tokenCache.setToken(t).then(function(){return t})})})},o.prototype.getLogs=function(e){const t=this;return new i(function(n,o){t.getAccessTokenCached(t.options,t.storage).then(function(i){const a=r.stringify(e);s.get("https://"+t.options.domain+"/api/v2/logs?"+a).set("Authorization","Bearer "+i.token).set("Content-Type","application/json").end(function(e,i){if(e&&403===e.status){const s=function(){return o(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status))};t.tokenCache.setToken(null).then(s).catch(s)}return e&&i&&i.body&&i.body.error?o(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status)):e?o(e):i.ok?n({logs:i.body,limits:{limit:i.headers["x-ratelimit-limit"],remaining:i.headers["x-ratelimit-remaining"],reset:i.headers["x-ratelimit-reset"]}}):o(new c.ManagementApiError("unknown_error","Unknown error from Management API: "+(i.text||i.status)))})})})},e.exports=o},function(e,t){const n={success:"success",error:"error",warning:"warning"},o={s:{name:"Success Login",icon:"icon-budicon-448",severity:n.success,level:1},ssa:{name:"Success Silent Auth",icon:"icon-budicon-448",severity:n.success,level:1},fsa:{name:"Failed Silent Auth",icon:"icon-budicon-448",severity:n.error,level:3},seacft:{name:"Success Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},feacft:{name:"Failed Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},seccft:{name:"Success Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},feccft:{name:"Failed Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},sepft:{name:"Success Exchange",description:"Password for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},fepft:{name:"Failed Exchange",description:"Password for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},sertft:{name:"Success Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},fertft:{name:"Failed Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},seoobft:{name:"Success Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},feoobft:{name:"Failed Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},seotpft:{name:"Success Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},feotpft:{name:"Failed Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},sercft:{name:"Success Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",severity:n.success,level:1},fercft:{name:"Failed Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",severity:n.error,level:3},f:{name:"Failed Login",icon:"icon-budicon-448",severity:n.error,level:3},w:{name:"Warning",icon:"icon-budicon-354",severity:n.warning,level:2},depnote:{name:"Deprecation Notice",icon:"icon-budicon-354",severity:n.warning,level:2},du:{name:"Deleted User",icon:"icon-budicon-311",severity:n.error,level:3},fu:{name:"Failed Login (invalid email/username)",icon:"icon-budicon-311",severity:n.error,level:3},fp:{name:"Failed Login (wrong password)",icon:"icon-budicon-311",severity:n.error,level:3},fc:{name:"Failed by Connector",icon:"icon-budicon-313",severity:n.error,level:3},fco:{name:"Failed by CORS",icon:"icon-budicon-313",severity:n.error,level:3},con:{name:"Connector Online",icon:"icon-budicon-143",severity:n.success,level:1},coff:{name:"Connector Offline",icon:"icon-budicon-143",severity:n.error,level:3},fcpro:{name:"Failed Connector Provisioning",icon:"icon-budicon-143",severity:n.error,level:4},ss:{name:"Success Signup",icon:"icon-budicon-314",severity:n.success,level:1},fs:{name:"Failed Signup",icon:"icon-budicon-311",severity:n.error,level:3},cs:{name:"Code Sent",icon:"icon-budicon-243",severity:n.success,level:1},cls:{name:"Code/Link Sent",icon:"icon-budicon-781",severity:n.success,level:1},sv:{name:"Success Verification Email",icon:"icon-budicon-781",severity:n.success,level:1},fv:{name:"Failed Verification Email",icon:"icon-budicon-311",severity:n.error,level:3},scp:{name:"Success Change Password",icon:"icon-budicon-280",severity:n.success,level:1},fcp:{name:"Failed Change Password",icon:"icon-budicon-266",severity:n.error,level:3},scph:{name:"Success Post Change Password Hook",icon:"icon-budicon-280",severity:n.success,level:1},fcph:{name:"Failed Post Change Password Hook",icon:"icon-budicon-266",severity:n.error,level:3},sce:{name:"Success Change Email",icon:"icon-budicon-266",severity:n.success,level:1},fce:{name:"Failed Change Email",icon:"icon-budicon-266",severity:n.error,level:3},scu:{name:"Success Change Username",icon:"icon-budicon-266",severity:n.success,level:1},fcu:{name:"Failed Change Username",icon:"icon-budicon-266",severity:n.error,level:3},scpn:{name:"Success Change Phone Number",icon:"icon-budicon-266",severity:n.success,level:1},fcpn:{name:"Failed Change Phone Number",icon:"icon-budicon-266",severity:n.error,level:3},svr:{name:"Success Verification Email Request",icon:"icon-budicon-781",severity:n.success,level:1},fvr:{name:"Failed Verification Email Request",icon:"icon-budicon-311",severity:n.error,level:3},scpr:{name:"Success Change Password Request",icon:"icon-budicon-280",severity:n.success,level:1},fcpr:{name:"Failed Change Password Request",icon:"icon-budicon-311",severity:n.error,level:3},fn:{name:"Failed Sending Notification",icon:"icon-budicon-782",severity:n.error,level:3},sapi:{name:"API Operation",icon:"icon-budicon-546",severity:n.success,level:1,category:"api"},fapi:{name:"Failed API Operation",icon:"icon-budicon-546",severity:n.error,level:3,category:"api"},limit_wc:{name:"Blocked Account",icon:"icon-budicon-313",severity:n.error,level:4},limit_mu:{name:"Blocked IP Address",icon:"icon-budicon-313",severity:n.error,level:4},limit_ui:{name:"Too Many Calls to /userinfo",icon:"icon-budicon-313",severity:n.error,level:4},api_limit:{name:"Rate Limit On API",icon:"icon-budicon-313",severity:n.error,level:4},limit_delegation:{name:"Too Many Calls to /delegation",icon:"icon-budicon-313",severity:n.error,level:4},sdu:{name:"Successful User Deletion",icon:"icon-budicon-312",severity:n.success,level:1},fdu:{name:"Failed User Deletion",icon:"icon-budicon-311",severity:n.error,level:3},admin_update_launch:{name:"Auth0 Update Launched",icon:"icon-budicon-774",severity:n.success,level:1},sys_os_update_start:{name:"Auth0 OS Update Started",icon:"icon-budicon-661",severity:n.success,level:1},sys_os_update_end:{name:"Auth0 OS Update Ended",icon:"icon-budicon-661",severity:n.success,level:1},sys_update_start:{name:"Auth0 Update Started",icon:"icon-budicon-661",severity:n.success,level:1},sys_update_end:{name:"Auth0 Update Ended",icon:"icon-budicon-661",severity:n.success,level:1},slo:{name:"Success Logout",icon:"icon-budicon-449",severity:n.success,level:1},flo:{name:"Failed Logout",icon:"icon-budicon-449",severity:n.error,level:3},sd:{name:"Success Delegation",icon:"icon-budicon-456",severity:n.success,level:1},fd:{name:"Failed Delegation",icon:"icon-budicon-456",severity:n.error,level:3},gd_unenroll:{name:"Unenroll device account",icon:"icon-budicon-298",severity:n.success,level:1},gd_update_device_account:{name:"Update device account",icon:"icon-budicon-257",severity:n.success,level:1},gd_module_switch:{name:"Module switch",icon:"icon-budicon-329",severity:n.success,level:1},gd_tenant_update:{name:"Guardian tenant update",icon:"icon-budicon-170",severity:n.success,level:1},gd_start_auth:{name:"Second factor started",icon:"icon-budicon-285",severity:n.success,level:1},gd_start_enroll:{name:"Enroll started",icon:"icon-budicon-299",severity:n.success,level:1},gd_start_enroll_failed:{name:"MFA Enrollment start failed",icon:"icon-budicon-299",severity:n.error,level:3},gd_user_delete:{name:"User delete",icon:"icon-budicon-298",severity:n.success,level:1},gd_auth_succeed:{name:"OTP Auth suceed",icon:"icon-budicon-mfa-login-succeed",severity:n.success,level:1},gd_auth_failed:{name:"OTP Auth failed",icon:"icon-budicon-mfa-login-failed",severity:n.error,level:3},gd_send_pn:{name:"Push notification sent",icon:"icon-budicon-mfa-send-pn",severity:n.success,level:1},gd_send_pn_failure:{name:"Error sending MFA Push Notification",icon:"icon-budicon-mfa-send-pn",severity:n.error,level:3},gd_auth_rejected:{name:"OTP Auth rejected",icon:"icon-budicon-mfa-login-failed",severity:n.error,level:3},gd_recovery_succeed:{name:"Recovery succeed",icon:"icon-budicon-mfa-recovery-succeed",severity:n.success,level:1},gd_recovery_failed:{name:"Recovery failed",icon:"icon-budicon-mfa-recovery-failed",severity:n.error,level:3},gd_send_sms:{name:"SMS Sent",icon:"icon-budicon-799",severity:n.success,level:1},gd_send_sms_failure:{name:"Error sending MFA SMS",icon:"icon-budicon-799",severity:n.error,level:3},gd_otp_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",severity:n.warning,level:2},gd_recovery_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",severity:n.warning,level:2},gd_enrollment_complete:{name:"Guardian enrollment complete",icon:"icon-budicon-299",severity:n.success,level:1},fui:{name:"Users import",icon:"icon-budicon-299",severity:n.warning,level:2},sui:{name:"Users import",icon:"icon-budicon-299",severity:n.success,level:1},pwd_leak:{name:"Breached password",icon:"icon-budicon-313",severity:n.error,level:3},fcoa:{name:"Failed cross origin authentication",icon:"icon-budicon-448",severity:n.error,level:3},scoa:{name:"Success cross origin authentication",icon:"icon-budicon-448",severity:n.success,level:1},ublkdu:{name:"Account unblocked",icon:"icon-budicon-313",severity:n.success,level:1}};e.exports=o,e.exports.get=function(e){return o[e]&&o[e].name||"Unknown Log Type: "+e}},function(e,t,n){function o(e){if(null===e||void 0===e)throw new r.ArgumentError("Must provide an options object");s.call(this,{objectMode:!0}),this.client=new c(e),this.options=e,this.remaining=50,this.lastBatch=0,this.previousCheckpoint=e.checkpointId||null,this.lastCheckpoint=e.checkpointId||null,this.status={start:new Date,end:null,logsProcessed:0}}const i=n(32),s=n(31).Readable,r=n(0),c=n(6);i.inherits(o,s),o.prototype.getQuery=function(e){return e&&e.length?"type:"+e.join(" OR type:"):""},o.prototype.done=function(){this.status.end=new Date,this.push(null)},o.prototype.next=function(e){const t=this,n=t.options.types&&t.options.types.length?100:e;if(t.remaining<1)t.status.warning="Auth0 Management API rate limit reached.",t.done();else{const o=t.lastCheckpoint?{take:n,from:t.lastCheckpoint}:{per_page:n,page:0};o.q=t.getQuery(t.options.types),o.sort="date:1",t.client.getLogs(o).then(function(n){const o=n.logs;if(t.remaining=n.limits.remaining,o&&o.length){var i=o;t.options.types&&t.options.types.length&&(i=o.filter(function(e){return t.options.types.indexOf(e.type)>=0}).slice(0,e||100)),i.length?(t.lastCheckpoint=i[i.length-1]._id,t.lastBatch+=i.length,t.push({logs:i,limits:n.limits})):(t.lastCheckpoint=o[o.length-1]._id,t.lastBatch+=0,t.push({logs:[],limits:n.limits}))}else t.status.end=new Date,t.push(null);return o}).catch(function(e){t.emit("error",e)})}},o.prototype.batchSaved=function(){this.status.logsProcessed+=this.lastBatch,this.previousCheckpoint=this.lastCheckpoint,this.lastBatch=0},o.prototype._read=function(){},e.exports=o},function(e,t){e.exports=require("bluebird@3.4.6")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("superagent@1.2.0")},function(e,t,n){"use strict";(function(t){var o=n(10),i=n(29),s=n(4),r=n(24),c=n(0),a=n(2),l=n(20),u=n(21),d=n(18),p=n(3),f=n(1),g=n(17);e.exports=function(e,n){f.setProvider(e);var v=n?new c.WebtaskStorageContext(n,{force:1}):new c.FileStorageContext(o.join(t,"./data.json"),{mergeWrites:!0}),h=new s;h.use(i(":method :url :status :response-time ms - :res[content-length]",{stream:p.stream}));var m=function(e){return function(t,n,o){return t.webtaskContext&&t.webtaskContext.body?(t.body=t.webtaskContext.body,o()):e(t,n,o)}};return h.use(m(r.json())),h.use(m(r.urlencoded({extended:!1}))),h.use(a.routes.dashboardAdmins({secret:f("EXTENSION_SECRET"),audience:"urn:logs-to-mixpanel",domain:f("AUTH0_DOMAIN"),rta:f("AUTH0_RTA").replace("https://",""),baseUrl:f("PUBLIC_WT_URL")||f("WT_URL"),clientName:"Logs to Mixpanel",urlPrefix:"",sessionStorageKey:"logs-to-mixpanel:apiToken"})),h.use("/meta",u()),h.use("/.extensions",d()),h.use("/app",s.static(o.join(t,"../dist"))),h.use(g(v)),h.use("/",l(v)),h.use(a.middlewares.errorHandler(p.error.bind(p))),h}}).call(t,"/")},function(e,t,n){const o=n(15);e.exports.LogsProcessor=n(14),e.exports.LogsApiClient=n(6),e.exports.LogsApiStream=n(8),e.exports.logTypes=n(7),e.exports.reporters={SlackReporter:o}},function(e,t,n){function o(e,t){if(null===t||void 0===t)throw new s.ArgumentError("Must provide an options object");this.storage=new a(e),this.options=i.assign({},{batchSize:100,maxRetries:5,maxRunTimeSeconds:20},t)}const i=n(5),s=n(0),r=n(7),c=n(8),a=n(16);o.prototype.hasTimeLeft=function(e){const t=(new Date).getTime();return e+1e3*this.options.maxRunTimeSeconds>=t},o.prototype.getLogFilter=function(e){var t=e.logTypes||[];if(e.logLevel){const n=i.map(r,function(e,t){const n=e;return n.type=t,n});t=t.concat(i.map(i.filter(n,function(t){return t.level>=e.logLevel}),"type"))}return i.uniq(t)},o.prototype.getReport=function(e,t){const n=new Date(e).getTime(),o=t?new Date(t).getTime():(new Date).getTime();return this.storage.read().then(function(e){return i.filter(e.logs,function(e){const t=new Date(e.start).getTime(),i=new Date(e.end).getTime();return t>=n&&i<=o})}).then(function(e){const t={type:"report",processed:0,warnings:0,errors:0,checkpoint:""};return i.each(e,function(e){t.processed+=e.logsProcessed,t.checkpoint=e.checkpoint,e.error&&(t.errors+=1),e.warning&&(t.warnings+=1)}),t})},o.prototype.createStream=function(e){const t=this;return t.storage.getCheckpoint(e.startFrom).then(function(n){return e.logger&&e.logger.debug("Starting logs processor from checkpoint:",n),new c({checkpointId:n,types:t.getLogFilter(e),domain:e.domain,clientId:e.clientId,clientSecret:e.clientSecret,tokenCache:t.storage})})},o.prototype.run=function(e){const t=this;return new Promise(function(n,o){const i=(new Date).getTime();var s=0,r=0,c=[];const a=t.storage,l=t.options,u=l.batchSize,d=l.maxRetries,p=function(e,t,i){l.logger&&l.logger.debug("Processor failed:",e),t.error=e,a.done(t,i).then(function(){return n({status:t,checkpoint:i})}).catch(o)},f=function(e,t){if(l.logger&&l.logger.debug("Processor run complete. Logs processed:",e.logsProcessed),e.logsProcessed>0){return(new Date).getTime()-r>=6048e5&&(e.warning="Logs are outdated more than for week. Last processed log has date is "+new Date(r)),a.done(e,t).then(function(){return n({status:e,checkpoint:t})}).catch(o)}return n({status:e,checkpoint:t})},g=function(){var e=u;return e-=c.length,e>100&&(e=100),e},v=function(n,o,r){if(!t.hasTimeLeft(i))return p(n,o.status,o.previousCheckpoint);if(s<d)return s+=1,e(c,r);const a=[n,"Skipping logs from "+o.previousCheckpoint+" to "+o.lastCheckpoint+" after "+d+" retries."];return l.logger&&l.logger.error(a[0],a[1]),p(a,o.status,o.lastCheckpoint)};t.createStream(l).then(function(n){const o=g();l.logger&&l.logger.debug("Loading next batch of logs. Next limit:",o),n.next(o),n.on("data",function(o){const s=o.logs;if(c=c.concat(s),s&&s.length&&(r=new Date(s[s.length-1].date).getTime()),c.length<u&&t.hasTimeLeft(i))return n.next(g());const a=function(e){return e?v(e,n,a):(c=[],t.hasTimeLeft(i)?(n.batchSaved(),n.next(g())):n.done())};return e(c,a)}),n.on("end",function(){const t=function(e){return e?v(e,n,t):(n.batchSaved(),f(n.status,n.lastCheckpoint))};e(c,t)}),n.on("error",function(e){p(e,n.status,n.previousCheckpoint)})}).catch(o)})},e.exports=o},function(e,t,n){function o(e){this.options=e||{}}const i=n(9),s=n(11);o.prototype.send=function(e,t){if(!e||"object"!=typeof e)throw new Error("object status is required");const n=this.options,o=this.createMessage(this.options,e,t);return new i(function(e,t){return n.hook?s.post(n.hook).send(o).set("Accept","application/json").end(function(n){return n?t(n):e()}):e()})},o.prototype.createMessage=function(e,t,n){const o={username:e.username||"auth0-logger",icon_emoji:e.icon||":rocket:",attachments:[]},i=e.title||"Auth0 Logger",s="report"===t.type?i+" Daily Report":t.error?i+" Error":i+" Success",r=t.error||null,c={fallback:e.fallback||s,text:e.text||s,error_field:{title:"Error",value:JSON.stringify(r),short:!1}};"report"===t.type?c.fields=[{title:"Logs processed",value:t.processed,short:!0},{title:"Warnings",value:t.warnings,short:!0},{title:"Errors",value:t.errors,short:!0},{title:"Next checkpoint",value:t.checkpoint,short:!0}]:c.fields=[{title:"Start time",value:t.start,short:!0},{title:"End time",value:t.end,short:!0},{title:"Logs processed",value:t.logsProcessed,short:!0},{title:"Next checkpoint",value:n,short:!0}];const a=e.url?" (<"+e.url+"|Details>)":null,l=c.fields;return t.error&&l.push(c.error_field),o.attachments.push({color:t.error?"#d13f42":"#7cd197",fallback:c.fallback,text:c.fallback+(a||""),fields:l}),o},e.exports=o},function(e,t,n){function o(e,t){if(!e)throw new s("The storageContext is required");this.storageContext=e,this.options=i({},{limit:400},t)}const i=n(5).assign,s=n(0).ArgumentError;o.prototype.read=function(){return this.storageContext.read().then(function(e){const t=e||{};return t.logs=t.logs||[],t})},o.prototype.write=function(e){return this.storageContext.write(e)},o.prototype.getCheckpoint=function(e){const t=this;return t.read().then(function(n){return e&&e!==n.startFrom?(n.startFrom=e,n.checkpointId=e,t.write(n).then(function(){return n.checkpointId||e||null})):n.checkpointId})},o.prototype.getToken=function(){return this.read().then(function(e){return e.logs_access_token||null})},o.prototype.setToken=function(e){const t=this;return t.read().then(function(n){return n.logs_access_token=e,t.write(n)})},o.prototype.done=function(e,t){const n=this;return n.read().then(function(o){return Buffer.byteLength(JSON.stringify(o),"utf8")>=1024*n.options.limit&&o.logs&&o.logs.length&&o.logs.splice(0,5),e.checkpoint=t,o.logs.push(e),o.checkpointId=t,n.write(o)})},e.exports=o},function(e,t,n){"use strict";var o=n(28),i=n(27),s=n(13),r=n(1),c=n(3);e.exports=function(e){return function(t,n,a){var l=t.webtaskContext&&t.webtaskContext.body||t.body||{},u=t.webtaskContext&&t.webtaskContext.headers||{};if(!(l.schedule&&"active"===l.state||u.referer===r("AUTH0_MANAGE_URL")+"/"&&u["if-none-match"]))return a();var d=function(e){return e.map(function(e){return{name:e.name,message:e.message,stack:e.stack}})},p=i.init(r("MIXPANEL_TOKEN"),{key:r("MIXPANEL_KEY")}),f=function e(t,n){t&&t.length||n(),p.import_batch(t,function(o){if(o&&o.length>0){if(t.length>10){var i=t.splice(0,10);return p.import_batch(i,function(o){return o&&o.length>0?(c.error(o),n(d(o))):(c.info(i.length+" events successfully sent to mixpanel."),e(t,n))})}return c.error(o),n(d(o))}return c.info(t.length+" events successfully sent to mixpanel."),n()})},g=function(e,t){if(!e||!e.length)return t();c.info(e.length+" logs received.");var n=Date.now(),o=e.map(function(e){var t=s.logTypes.get(e.type);return e.time=n,e.distinct_id=e.user_id||e.user_name||e.client_id||e._id,{event:t,properties:e}});return f(o,t)},v=new s.reporters.SlackReporter({hook:r("SLACK_INCOMING_WEBHOOK_URL"),username:"auth0-logs-to-mixpanel",title:"Logs To Mixpanel"}),h={domain:r("AUTH0_DOMAIN"),clientId:r("AUTH0_CLIENT_ID"),clientSecret:r("AUTH0_CLIENT_SECRET"),batchSize:r("BATCH_SIZE"),startFrom:r("START_FROM"),logTypes:r("LOG_TYPES"),logLevel:r("LOG_LEVEL")};(!h.batchSize||h.batchSize>20)&&(h.batchSize=20),h.logTypes&&!Array.isArray(h.logTypes)&&(h.logTypes=h.logTypes.replace(/\s/g,"").split(","));var m=new s.LogsProcessor(e,h),y=function(t){var n=new Date,o=n.getTime(),i=o-864e5;m.getReport(i,o).then(function(e){return v.send(e,e.checkpoint)}).then(function(){return e.read()}).then(function(n){return n.lastReportDate=t,e.write(n)})},x=function(){e.read().then(function(e){var t=o().format("DD-MM-YYYY"),n=r("DAILY_REPORT_TIME")||16;e.lastReportDate!==t&&(new Date).getHours()>=n&&y(t)})};return m.run(g).then(function(e){e&&e.status&&e.status.error?v.send(e.status,e.checkpoint):!0!==r("SLACK_SEND_SUCCESS")&&"true"!==r("SLACK_SEND_SUCCESS")||v.send(e.status,e.checkpoint),x(),n.json(e)}).catch(function(e){v.send({error:e,logsProcessed:0},null),x(),a(e)})}}},function(e,t,n){"use strict";var o=n(4).Router,i=n(0),s=n(2).middlewares,r=n(1),c=n(3);e.exports=function(){var e=o(),t=s.validateHookToken(r("AUTH0_DOMAIN"),r("WT_URL"),r("EXTENSION_SECRET"));return e.use("/on-uninstall",t("/.extensions/on-uninstall")),e.delete("/on-uninstall",function(e,t){var n=r("AUTH0_CLIENT_ID"),o={domain:r("AUTH0_DOMAIN"),clientSecret:r("AUTH0_CLIENT_SECRET"),clientId:n};i.managementApi.getClient(o).then(function(e){return e.clients.delete({client_id:n})}).then(function(){c.debug("Deleted client "+n),t.sendStatus(204)}).catch(function(e){c.debug("Error deleting client: "+n),c.error(e),t.sendStatus(204)})}),e}},function(e,t,n){"use strict";(function(t){var o=(n(26),n(25)),i=(n(10),n(2).urlHelpers),s=n(1);e.exports=function(){var e='\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-logs-to-mixpanel/assets/auth0-logs-to-mixpanel.ui.<%= assets.version %>.css" /><% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-mixpanel/assets/auth0-logs-to-mixpanel.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-mixpanel/assets/auth0-logs-to-mixpanel.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';return function(t,n,r){if(0===t.url.indexOf("/api"))return r();var c={AUTH0_DOMAIN:s("AUTH0_DOMAIN"),AUTH0_CLIENT_ID:s("EXTENSION_CLIENT_ID"),AUTH0_MANAGE_URL:s("AUTH0_MANAGE_URL")||"https://manage.auth0.com",BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t),TITLE:s("TITLE")};return n.send(o.render(e,{config:c,assets:{customCss:s("CUSTOM_CSS"),version:"2.0.1"}}))}}}).call(t,"/")},function(e,t,n){"use strict";var o=n(5),i=n(4).Router,s=n(2).middlewares,r=n(1),c=n(19);e.exports=function(e){var t=i(),n=s.authenticateAdmins({credentialsRequired:!0,secret:r("EXTENSION_SECRET"),audience:"urn:logs-to-mixpanel",baseUrl:r("PUBLIC_WT_URL")||r("WT_URL"),onLoginSuccess:function(e,t,n){return n()}});return t.get("/",c()),t.get("/api/report",n,function(t,n,i){return e.read().then(function(e){var i=e&&e.logs?o.sortByOrder(e.logs,"start","desc"):[],s=t.query.filter&&"errors"===t.query.filter?o.filter(i,function(e){return!!e.error}):i,r=t.query.page&&parseInt(t.query.page,10)?parseInt(t.query.page,10)-1:0,c=t.query.per_page&&parseInt(t.query.per_page,10)||10,a=c*r;return n.json({logs:s.slice(a,a+c),total:s.length})}).catch(i)}),t}},function(e,t,n){"use strict";var o=n(4),i=n(23);e.exports=function(){var e=o.Router();return e.get("/",function(e,t){t.status(200).send(i)}),e}},function(e,t,n){"use strict";var o=n(2),i=n(12),s=n(1),r=n(3),c=o.createServer(function(e,t){return r.info("Starting Auth0 Logs to Mixpanel Extension - Version:","2.0.1"),i(e,t)});e.exports=function(e,t,n){s.setValue("PUBLIC_WT_URL",o.urlHelpers.getWebtaskUrl(t)),c(e,t,n)}},function(e,t){e.exports={title:"Auth0 Logs to Mixpanel",name:"auth0-logs-to-mixpanel",version:"2.0.1",author:"auth0",description:"This extension will take all of your Auth0 logs and export them to Mixpanel",type:"cron",category:"log_export",initialUrlPath:"/login",repository:"https://github.com/auth0/auth0-logs-to-mixpanel",keywords:["auth0","extension"],schedule:"0 */5 * * * *",auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:logs delete:clients"},secrets:{MIXPANEL_TOKEN:{description:"Mixpanel Token - this is your Mixpanel Token for your mixpanel project",required:!0},MIXPANEL_KEY:{description:"Mixpanel Key - this is your Mixpanel Key for your mixpanel project",required:!0,type:"password"},BATCH_SIZE:{description:"The amount of logs to be read on each execution. Maximum is 20.",default:20},START_FROM:{description:"Checkpoint ID of log to start from."},SLACK_INCOMING_WEBHOOK_URL:{description:"Slack Incoming Webhook URL used to report statistics and possible failures"},SLACK_SEND_SUCCESS:{description:"This setting will enable verbose notifications to Slack which are useful for troubleshooting",type:"select",allowMultiple:!1,default:"false",options:[{value:"false",text:"No"},{value:"true",text:"Yes"}]},LOG_LEVEL:{description:"This allows you to specify the log level of events that need to be sent",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"0",text:"Debug"},{value:"1",text:"Info"},{value:"2",text:"Warning"},{value:"3",text:"Error"},{value:"4",text:"Critical"}]},LOG_TYPES:{description:"If you only want to send events with a specific type (eg: failed logins)",type:"select",allowMultiple:!0,options:[{text:"",value:"-"},{text:"Success Login",value:"s"},{text:"Success Exchange",value:"seacft"},{text:"Success Exchange (Client Credentials)",value:"seccft"},{text:"Failed Exchange",value:"feacft"},{text:"Failed Exchange (Client Credentials)",value:"feccft"},{text:"Failed Login",value:"f"},{text:"Warnings During Login",value:"w"},{text:"Deleted User",value:"du"},{text:"Failed Login (invalid email/username)",value:"fu"},{text:"Failed Login (wrong password)",value:"fp"},{text:"Failed by Connector",value:"fc"},{text:"Failed by CORS",value:"fco"},{text:"Connector Online",value:"con"},{text:"Connector Offline",value:"coff"},{text:"Failed Connector Provisioning",value:"fcpro"},{text:"Success Signup",value:"ss"},{text:"Failed Signup",value:"fs"},{text:"Code Sent",value:"cs"},{text:"Code/Link Sent",value:"cls"},{text:"Success Verification Email",value:"sv"},{text:"Failed Verification Email",value:"fv"},{text:"Success Change Password",value:"scp"},{text:"Failed Change Password",value:"fcp"},{text:"Success Change Email",value:"sce"},{text:"Failed Change Email",value:"fce"},{text:"Success Change Username",value:"scu"},{text:"Failed Change Username",value:"fcu"},{text:"Success Change Phone Number",value:"scpn"},{text:"Failed Change Phone Number",value:"fcpn"},{text:"Success Verification Email Request",value:"svr"},{text:"Failed Verification Email Request",value:"fvr"},{text:"Success Change Password Request",value:"scpr"},{text:"Failed Change Password Request",value:"fcpr"},{text:"Failed Sending Notification",value:"fn"},{text:"API Operation",value:"sapi"},{text:"Failed API Operation",value:"fapi"},{text:"Blocked Account",value:"limit_wc"},{text:"Too Many Calls to /userinfo",value:"limit_ui"},{text:"Rate Limit On API",value:"api_limit"},{text:"Successful User Deletion",value:"sdu"},{text:"Failed User Deletion",value:"fdu"},{text:"Blocked Account",value:"limit_wc"},{text:"Blocked IP Address",value:"limit_mu"},{text:"Success Logout",value:"slo"},{text:"Failed Logout",value:"flo"},{text:"Success Delegation",value:"sd"},{text:"Failed Delegation",value:"fd"}]}}}},function(e,t){e.exports=require("body-parser@1.12.4")},function(e,t){e.exports=require("ejs@2.3.1")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("mixpanel@0.4.0")},function(e,t){e.exports=require("moment@2.10.3")},function(e,t){e.exports=require("morgan@1.5.3")},function(e,t){e.exports=require("querystring")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("winston@1.0.0")}]);