define([],function(){(function(){var protocols="(?:(?:http|https|rtsp|ftp):\\/\\/)";var credentials="(?:(?:[a-z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-f0-9]{2})){1,64}"
+"(?:\\:(?:[a-z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-f0-9]{2})){1,25})?"
+"\\@)";var hostnames="(?:[a-z0-9][a-z0-9\\-]{0,64}\\.)+";var unknownTLDs="(?:[a-z]{2,})";var XRegExp_hostnames="(?:[\\p{L}0-9][\\p{L}0-9\\-]{0,64}\\.)+";var XRegExp_unknownTLDs="(?:[\\p{L}]{2,})";var knownSubdomains="(?:(?:www|ftp)\\.)";var knownTLDs="(?:"
+"A[CDEFGILMNOQRSTUWXZ]|ACADEMY|ACCOUNTANTS|ACTOR|AERO|AGENCY|AIRFORCE|ARCHI|ARPA|ASIA|ASSOCIATES|AUDIO|AUTOS|AXA"
+"|B[ABDEFGHIJMNORSTVWYZ]|BAR|BARGAINS|BAYERN|BEER|BERLIN|BEST|BID|BIKE|BIZ|BLACK|BLACKFRIDAY|BLUE|BOUTIQUE|BUILD|BUILDERS|BUZZ"
+"|C[ACDFGHIKLMNORUVWXYZ]|CAB|CAMERA|CAMP|CAPITAL|CARDS|CARE|CAREER|CAREERS|CASH|CAT|CATERING|CENTER|CEO|CHEAP|CHRISTMAS|CHURCH|CITIC|CLAIMS|CLEANING|CLINIC|CLOTHING|CLUB|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMMUNITY|COMPANYCOMPUTER|CONDOS|CONSTRUCTION|CONSULTING|CONTRACTORS|COOKING|COOL|COOP|COUNTRY|CREDIT|CREDITCARD|CRUISES"
+"|D[EJKMOZ]|DANCE|DATING|DEMOCRAT|DENTAL|DESI|DIAMONDS|DIGITAL|DIRECTORY|DISCOUNT|DNP|DOMAINS"
+"|E[CEGRSTU]|EDU|EDUCATION|EMAIL|ENGINEERING|ENTERPRISES|EQUIPMENT|ESTATE|EUS|EVENTS|EXCHANGE|EXPERT|EXPOSED"
+"|F[IJKMOR]|FAIL|FARM|FEEDBACK|FINANCE|FINANCIAL|FISH|FISHING|FITNESS|FLIGHTS|FLORIST|FOO|FOUNDATION|FROGANS|FUND|FURNITURE|FUTBOL"
+"|G[ABDEFGHILMNPQRSTUWY]|GAL|GALLERY|GIFT|GLASS|GLOBO|GMO|GOP|GOV|GRAPHICS|GRATIS|GRIPE|GUIDE|GUITARS|GURU"
+"|H[KMNRTU]|HAUS|HIPHOP|HOLDINGS|HOLIDAY|HOMES|HORSE|HOUSE"
+"|I[DELMNOQRST]|IMMOBILIEN|INDUSTRIES|INFO|INK|INSTITUTE|INSURE|INT|INTERNATIONAL|INVESTMENTS"
+"|J[EMOP]|JETZT|JOBS|JUEGOS"
+"|K[EGHIMNPRWYZ]|KAUFEN|KIM|KITCHEN|KIWI|KOELN|KRED"
+"|L[ABCIKRSTUVY]|LAND|LEASE|LIFE|LIGHTING|LIMITED|LIMO|LINK|LOANS|LONDON|LUXE|LUXURY"
+"|M[ACDEGHKLMNOPQRSTUVWXYZ]|MAISON|MANAGEMENT|MANGO|MARKETING|MEDIA|MEET|MENU|MIAMI|MIL|MOBI|MODA|MOE|MONASH|MOSCOW|MOTORCYCLES|MUSEUM"
+"|N[ACEFGILOPRUZ]|NAGOYA|NAME|NET|NEUSTAR|NINJA|NYC"
+"|O[M]|OKINAWA|ONL|ORG"
+"|P[AEFGHKLMNRSTWY]|PARIS|PARTNERS|PARTS|PHOTO|PHOTOGRAPHY|PHOTOS|PICS|PICTURES|PINK|PLUMBING|POST|PRO|PRODUCTIONS|PROPERTIES|PUB"
+"|Q[A]|QPON|QUEBEC"
+"|R[EOSUW]|RECIPES|RED|REISE|REISEN|REN|RENTALS|REPAIR|REPORT|REST|REVIEWS|RICH|RIO|ROCKS|RODEO|RUHR|RYUKYU"
+"|S[ABCDEGHIJKLMNORTUVXYZ]|SAARLAND|SCHULE|SERVICES|SEXY|SHIKSHA|SHOES|SINGLES|SOCIAL|SOHU|SOLAR|SOLUTIONS|SOY|SUPPLIES|SUPPLY|SUPPORT|SURGERY|SYSTEMS"
+"|T[CDFGHJKLMNOPRTVWZ]|TATTOO|TAX|TECHNOLOGY|TEL|TIENDA|TIPS|TODAY|TOKYO|TOOLS|TOWN|TOYS|TRADE|TRAINING|TRAVEL"
+"|U[AGKSYZ]|UNIVERSITY|UNO"
+"|V[ACEGINU]|VACATIONS|VEGAS|VENTURES|VERSICHERUNG|VIAJES|VILLAS|VISION|VODKA|VOTE|VOTING|VOTO|VOYAGE"
+"|W[FS]|WANG|WATCH|WEBCAM|WED|WIEN|WIKI|WORKS|WTC|WTF"
+"|XXX|XYZ"
+"|Y[ET]|YACHTS|YOKOHAMA"
+"|Z[AMW]|ZONE"
+"|XN--(?:3BST00M|3DS443G|3E0B707E|45BRJ9C|55QW42G|55QX5D|6FRZ82G|6QQ986B3XL|80ADXHKS|80AO21A|80ASEHDB|80ASWG|90A3AC|C1AVG|CG4BKI|CLCHC0EA0B2G2A9GCD|CZR694B|CZRU2D|D1ACJ3B|FIQ228C5HS|FIQ64B|FIQS8S|FIQZ9S|FPCRJ9C3D|FZC2C9E2C|GECRJ9C|H2BRJ9C|I1B6B1A6A2E|IO0A7I|J1AMH|J6W193G|KPRW13D|KPRY57D|L1ACC|LGBBAT1AD8J|MGB9AWBF|MGBA3A4F16A|MGBAAM7A8H|MGBAB2BD|MGBAYH7GPA|MGBBH1A71E|MGBC0A9AZCG|MGBERP4A5D4AR|MGBX4CD0AB|NGBC5AZD|NQV7F|NQV7FS00EMA|O3CW4H|OGBPF8FL|P1AI|PGBS0DH|Q9JYB4C|RHQV96G|S9BRJ9C|SES554G|UNUP4Y|WGBH1C|WGBL6A|XKC2AL3HYE2A|XKC2DL3A5EE0H|YFRO4I67O|YGBI2AMMX|ZFR164B)"
+"|\u0627\u0644\u0627\u0631\u062F\u0646|\u4E2D\u570B|\u4E2D\u56FD|\u0627\u0645\u0627\u0631\u0627\u062A|\u9999\u6E2F|\u0627\u06CC\u0631\u0627\u0646|\u0DBD\u0D82\u0D9A\u0DCF|\u0B87\u0BB2\u0B99\u0BCD\u0B95\u0BC8|\u0645\u0635\u0631|\u0642\u0637\u0631|\u0420\u0424|\u0633\u0648\u0631\u064A\u0629|\u53F0\u7063|\u53F0\u6E7E"
+")";var ipv6="("
+"(([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))"
+"|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))"
+"|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))"
+"|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))"
+"|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))"
+"|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))"
+"|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))"
+"|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))"
+")(%.+)?";var ipv4="(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\."
+"(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\."
+"(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\."
+"(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])";var linkRegExpString="(?:"
+protocols
+credentials+"?"
+hostnames+unknownTLDs
+"|(?!"+protocols+")"
+credentials+"?"
+"(?:"
+hostnames+knownTLDs
+"|"+knownSubdomains+hostnames+unknownTLDs
+"|"+hostnames+unknownTLDs+"(?=\\/)"
+")"
+"|"+protocols+"?"
+credentials+"?"
+"(?:"
+ipv6
+"|"+ipv4
+")"
+")"
+"(?:\\:\\d{1,5})?"
+"(?:"
+"\\/(?:"
+"(?:[a-z0-9\\/\\@\\&\\#\\~\\*\\_\\-\\+])"
+"|(?:\\%[a-f0-9]{2})"
+"|(?:[\\;\\?\\:\\.\\!\\'\\(\\)\\,\\=]+(?=(?:[a-z0-9\\/\\@\\&\\#\\~\\*\\_\\-\\+])|(?:\\%[a-f0-9]{2})))"
+")*"
+"|\\b|\$"
+")";var linkRegExp=RegExp(linkRegExpString,'gi');var protocolRegExp=RegExp('^'+protocols,'i');function ensureProtocol(url){if(!url.match(protocolRegExp)){url="http://"+url;}
return url;}
var LinkParser={parse:function(text){var links=[];while(match=linkRegExp.exec(text)){var txt=match[0];var pos=match['index'];var len=txt.length;var url=ensureProtocol(text);links.push({'pos':pos,'text':txt,'len':len,'url':url});}
return links;}}
window.LinkParser=LinkParser;})();var cache={};function getEndpointInfo(apiClient){return apiClient.getJSON(apiClient.getUrl('System/Endpoint'));}
function isValidIpAddress(address){var links=LinkParser.parse(address);return links.length==1;}
function isLocalIpAddress(address){address=address.toLowerCase();if(address.indexOf('127.0.0.1')!=-1){return true;}
if(address.indexOf('localhost')!=-1){return true;}
return false;}
function getServerAddress(apiClient){var serverAddress=apiClient.serverAddress();if(isValidIpAddress(serverAddress)&&!isLocalIpAddress(serverAddress)){return Promise.resolve(serverAddress);}
var cachedValue=getCachedValue(serverAddress);if(cachedValue){return Promise.resolve(cachedValue);}
return apiClient.getJSON(apiClient.getUrl('System/Endpoint')).then(function(endpoint){if(endpoint.IsInNetwork){return apiClient.getPublicSystemInfo().then(function(info){addToCache(serverAddress,info.LocalAddress);return info.LocalAddress;});}else{addToCache(serverAddress,serverAddress);return serverAddress;}});}
function clearCache(){cache={};}
function addToCache(key,value){cache[key]={value:value,time:new Date().getTime()};}
function getCachedValue(key){var obj=cache[key];if(obj&&(new Date().getTime()-obj.time)<180000){return obj.value;}
return null;}
Events.on(ConnectionManager,'localusersignedin',clearCache);Events.on(ConnectionManager,'localusersignedout',clearCache);return{getServerAddress:getServerAddress};});