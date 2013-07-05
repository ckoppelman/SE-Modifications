hodReferencer |= {};

hodReferencer.ref.tanakh = {
	"link" : function (actualName, match, options) {
		var mes = actualName,
            page = match[2],
            side = match[3],
            flags = (options || '').toLowerCase(),
            url,
			
			mesechtos = {
                'Chulin': [31, 141],
                'Horayos': [28, 13],
                'Shekalim': [5, 22],
                'Bechoros': [32, 60],
                'Gitin': [19, 89],
                'Bava Kama': [21, 118],
                'Sanhedrin': [24, 112],
                'Nazir': [17, 65],
                'Bava Basra': [23, 175],
                'Sotah': [18, 48],
                'Yoma': [6, 87],
                'Meilah': [36, 21],
                'Shevuos': [26, 48],
                'Kerisus': [35, 27],
                'Zevachim': [29, 119],
                'Avoda Zarah': [27, 75],
                'Nidah': [37, 72],
                'Chagigah': [13, 26],
                'Yevamos': [14, 121],
                'Eruvin': [3, 104],
                'Moed Katan': [12],
                'Megilah': [11, 31],
                'Brachos': [1, 63],
                'Kiddushin': [20, 81],
                'Taanis': [10, 30],
                'Temurah': [34, 33],
                'Beitzah': [8, 39],
                'Erchin': [33, 33],
                'Kesuvos': [15, 111],
                'Nedarim': [16, 90],
                'Pesachim': [4, 120],
                'Bava Metzia': [22, 118],
                'Menachos': [30, 109],
                'Succah': [7, 55],
                'Shabbos': [2, 156],
                'Rosh Hashanah': [9, 34],
                'Makkos': [25, 23]
            };
		if (parseInt(page, 10) > mesechtos[mes][1] || page === '1' || page === '0') { //if mesechta doesn't have that page
            return false;
        }
        if (side === 'a') {//hebrewbooks is weird.
            url = 'http://hebrewbooks.org/shas.aspx?mesechta=' + mesechtos[mes][0] + '&daf=' + page;
        }
        else {
            url = 'http://hebrewbooks.org/shas.aspx?mesechta=' + mesechtos[mes][0] + '&daf=' + page + side;
        }
        if (flags.indexOf('t') !== -1) {//text version flag is set
            url += '&format=text';
        } else {
            url += '&format=pdf';
        }
		return url;
	},
    "name" : function (actualName, match, options) {
        var page = match[2],
            side = match[3] || '';
        return actualName + " " + page + side;
    },

	"regex" : reg = /([\w ]{2,}?)[;., :-](\d{1,3})([ab])/mi
    "captureIndexOfName" : 1,
	"spellings" : {
		'Brachos' : ['berachos', 'berachot', 'brachos', 'brachot', 'ber', 'bra', 'brcht', 'brchs', 'br'],
        'Shabbos' : ['shabbos', 'shabbat', 'shabbas', 'shabos', 'shabat', 'shbt', 'shbs', 'shab', 'sha'],
        'Eruvin' : ['eruvin', 'eiruvin', 'eru', 'eir', 'ervn', 'er'],
        'Pesachim' : ['pesachim', 'psachim', 'pesakhim', 'psakhim', 'pes', 'psa', 'pschm', 'ps'],
        'Shekalim' : ['shekalim', 'shekolim', 'shkalim', 'shkolim', 'shk', 'shek'],
        'Yoma' : ['yoma', 'yuma', 'yum', 'yom', 'ym'],
        'Succah' : ['succah', 'succa', 'sukkah', 'sukka', 'suka', 'sukah', 'sk', 'suk', 'suc', 'sc'],
        'Beitzah' : ['beitzah', 'beitza', 'betzah', 'betza', 'bei', 'bet', 'btz', 'be','btz'],
        'Rosh Hashanah' : ['rosh', 'hashana', 'ros', 'rsh', 'rh', 'ro', 'rsh'],
        'Taanis' : ['taanis', 'taanit', 'taanith', 'tanit', 'tanith', 'tanis', 'tan', 'tns','tn','taa','ta'],
        'Megilah' : ['megilah', 'megila', 'meg', 'mgl','mg'],
        'Moed Katan' : ['moedkatan', 'moe', 'md', 'mk'],
        'Chagigah' : ['chagigah', 'chagiga', 'cha', 'chag', 'chg'],
        'Yevamos' : ['yevamos', 'yevamot', 'yevamoth', 'yev', 'yvm', 'yvms', 'yvmt','yv'],
        'Kesuvos' : ['kesuvos', 'kesubos', 'kesubot', 'ketubot', 'ketuvot', 'ksuvos', 'ksubos', 'ket', 'kes', 'ksvs', 'ksvt', 'ktbt','ks','kt'],
        'Nedarim' : ['nedarim', 'ned', 'ndrm', 'ndr', 'ne'],
        'Nazir' : ['nazir', 'nozir', 'naz', 'noz', 'nzr', 'nz'],
        'Sotah' : ['sotah', 'sota', 'sot', 'so','st'],
        'Gitin' : ['gitin', 'gittin', 'git', 'gtn','gt'],
        'Kiddushin' : ['kiddushin', 'kidushin', 'kid', 'ki', 'kds', 'kdshn', 'kdsh','kd'],
        'Bava Kama' : ['bavakama', 'babakama', 'bavakamma', 'bk', 'bkama'],
        'Bava Metzia' : ['bavametzia', 'bavametziah', 'babametziah', 'babametzia', 'bm', 'bmetzia', 'bmetziah'],
        'Bava Basra' : ['bavabasra', 'bavabatra', 'bababatra', 'bavabatrah', 'bb', 'bbatra', 'bbasra', 'bbatrah', 'bbasrah'],
        'Sanhedrin' : ['sanhedrin', 'san', 'sa', 'sn', 'snh', 'snhd', 'snhdrn'],
        'Makkos' : ['makkos', 'makos', 'makkot', 'makot', 'ma', 'mak', 'mkt'],
        'Shevuos' : ['shevuos', 'shevuot', 'shavuot', 'shavuos', 'shv', 'shvt', 'shvs','shvuot','shvuos'],
        'Avoda Zarah' : ['avodazarah', 'avodazara', 'avodahzara', 'avodahzarah', 'avoda', 'avodah', 'az', 'avd', 'avo', 'avod','av'],
        'Horayos' : ['horayos', 'horaiot', 'horaios', 'horayot', 'horaot', 'ho', 'hor', 'hrs', 'hrt','hr'],
        'Zevachim' : ['zevachim', 'zevakhim', 'zev', 'zv', 'zvchm', 'zvkhm'],
        'Menachos' : ['menachos', 'menachot', 'menakhos', 'menakhot', 'men', 'mn', 'mncht', 'mnkht'],
        'Chulin' : ['chulin', 'chullin', 'khulin', 'khullin', 'chu', 'khu', 'chl', 'khl', 'chln', 'khln'],
        'Bechoros' : ['bechoros', 'bchoros', 'bechorot', 'bchorot', 'bec', 'bech', 'bek', 'bekh', 'bcrt', 'bchrt', 'bkhrt', 'bc', 'bch', 'bkh'],
        'Erchin' : ['erchin', 'erkhin', 'arachin', 'arakhin', 'ara', 'erc', 'erk'],
        'Temurah' : ['temurah', 'temura', 'tmurah', 'tmura', 'tem', 'tm', 'tmr'],
        'Kerisus' : ['kerisus', 'krisus', 'keritut', 'kritut', 'kerisos', 'krisos', 'keritot', 'kritot', 'kerithoth', 'krithoth', 'kr', 'ker', 'krt', 'krs'],
        'Meilah' : ['meilah', 'meila', 'mei', 'ml'],
        'Nidah' : ['nidah', 'nida', 'niddah', 'nidda', 'ni', 'nid']
	}
}